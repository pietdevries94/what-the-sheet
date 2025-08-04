import { useContext } from "react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type React from "react";
import { useStatsAndModifiers } from "@/hooks/characterSheet/useStatsAndModifiers";

const StatBlock: React.FC<{
	value: number;
	modifier: number;
	label: string;
}> = ({ value, modifier, label }) => (
	<div className="relative flex flex-col items-center justify-center py-2">
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
				border-stone-400 text-lg text-stone-600
			`}
		>
			{modifier && modifier >= 0 ? "+" : ""}
			{modifier}
		</span>
		<div
			className={`
				absolute bottom-0 flex h-5 w-6 items-center justify-center rounded-md border
				border-stone-400 bg-background text-center text-sm leading-none
				text-stone-500
			`}
		>
			{value}
		</div>
	</div>
);
export const MainStats: React.FC = () => {
	const characterSheetId = useContext(CharacterSheetContext);
	const stats = useStatsAndModifiers(characterSheetId);
	return (
		<div className="flex flex-col gap-2">
			<StatBlock label="Con" {...stats["constitution"]} />
			<StatBlock label="Dex" {...stats["dexterity"]} />
			<StatBlock label="Int" {...stats["intelligence"]} />
			<StatBlock label="Cha" {...stats["charisma"]} />
			<StatBlock label="Wis" {...stats["wisdom"]} />
			<StatBlock label="Str" {...stats["strength"]} />
		</div>
	);
};
