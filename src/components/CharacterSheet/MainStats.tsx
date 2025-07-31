import { useContext } from "react";
import { useStore } from "@livestore/react";
import { queryDb } from "@livestore/livestore";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type React from "react";
import { tables } from "@/livestore/schema";

const characterSheet$ = (id: string) =>
	queryDb(
		tables.characterSheets
			.select(
				"constitution",
				"dexterity",
				"intelligence",
				"charisma",
				"wisdom",
				"strength",
			)
			.where({
				id,
			})
			.first(),
	);

const StatBlock: React.FC<{ label: string; value: number | null }> = ({
	label,
	value,
}) => {
	const modifier = value ? Math.floor((value - 10) / 2) : undefined;
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
				{modifier ?? ""}
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

export const MainStats: React.FC = () => {
	const id = useContext(CharacterSheetContext);

	const { store } = useStore();

	const characterSheet = store.useQuery(characterSheet$(id));

	return (
		<div className="flex flex-col gap-2">
			<StatBlock label="Con" value={characterSheet.constitution} />
			<StatBlock label="Dex" value={characterSheet.dexterity} />
			<StatBlock label="Int" value={characterSheet.intelligence} />
			<StatBlock label="Cha" value={characterSheet.charisma} />
			<StatBlock label="Wis" value={characterSheet.wisdom} />
			<StatBlock label="Str" value={characterSheet.strength} />
		</div>
	);
};
