import { useContext } from "react";
import { useStore } from "@livestore/react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type React from "react";
import { statAndModifier$ } from "@/livestore/queries";

const StatBlock: React.FC<{ stat: string; label: string }> = ({
	stat,
	label,
}) => {
	const id = useContext(CharacterSheetContext);

	const { store } = useStore();
	const { value, modifier } = store.useQuery(statAndModifier$(id, stat));

	return (
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
					absolute bottom-0 flex h-5 w-6 items-center justify-center rounded-md
					border border-stone-400 bg-background text-center text-sm leading-none
					text-stone-500
				`}
			>
				{value}
			</div>
		</div>
	);
};

export const MainStats: React.FC = () => (
	<div className="flex flex-col gap-2">
		<StatBlock label="Con" stat="constitution" />
		<StatBlock label="Dex" stat="dexterity" />
		<StatBlock label="Int" stat="intelligence" />
		<StatBlock label="Cha" stat="charisma" />
		<StatBlock label="Wis" stat="wisdom" />
		<StatBlock label="Str" stat="strength" />
	</div>
);
