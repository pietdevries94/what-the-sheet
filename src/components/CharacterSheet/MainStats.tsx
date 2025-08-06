import React, { useContext } from "react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import { MainStatDialog } from "./MainStatDialog";
import type { DndStat } from "@/dndTypes";
import { useStatsAndModifiers } from "@/hooks/characterSheet/useStatsAndModifiers";

function useGlow(value: unknown): boolean {
	const [glow, setGlow] = React.useState(false);
	const [prevValue, setPrevValue] = React.useState(value);
	if (prevValue !== value) {
		setPrevValue(value);
		setTimeout(() => setGlow(true), 0);
		setTimeout(() => setGlow(false), 1000);
	}
	return glow;
}

const StatBlock: React.FC<{
	stat: DndStat;
	value: number;
	modifier: number;
	label: string;
}> = ({ value, modifier, label, stat }) => {
	const glowValue = useGlow(value);
	const glowModifier = useGlow(modifier);
	return (
		<div
			className="relative flex flex-col items-center justify-center py-2"
			data-testid={`stat-block-${stat}`}
		>
			<div
				className={`
					absolute top-0 flex h-5 w-9 items-center justify-center rounded-md border
					border-stone-400 bg-background text-center text-sm leading-none
					tracking-wide text-stone-500
				`}
			>
				{label}
			</div>
			<span
				className={`
					flex h-14 w-12 items-center justify-center rounded-md border
					border-stone-400 text-lg transition-colors
					${glowModifier ? "text-sky-500" : `text-stone-600`}
				`}
			>
				{modifier && modifier >= 0 ? "+" : ""}
				{modifier}
			</span>
			<MainStatDialog stat={stat}>
				<button
					type="button"
					className={`
						absolute bottom-0 flex h-5 w-6 items-center justify-center rounded-md
						border border-stone-400 bg-background text-center text-sm leading-none
						${glowValue ? "text-sky-500" : `text-stone-500`}
						hover:bg-stone-100
					`}
				>
					{value}
				</button>
			</MainStatDialog>
		</div>
	);
};

export const MainStats: React.FC = () => {
	const characterSheetId = useContext(CharacterSheetContext);
	const stats = useStatsAndModifiers(characterSheetId);
	return (
		<div className="flex flex-col gap-2">
			<StatBlock label="Con" stat="constitution" {...stats["constitution"]} />
			<StatBlock label="Dex" stat="dexterity" {...stats["dexterity"]} />
			<StatBlock label="Int" stat="intelligence" {...stats["intelligence"]} />
			<StatBlock label="Cha" stat="charisma" {...stats["charisma"]} />
			<StatBlock label="Wis" stat="wisdom" {...stats["wisdom"]} />
			<StatBlock label="Str" stat="strength" {...stats["strength"]} />
		</div>
	);
};
