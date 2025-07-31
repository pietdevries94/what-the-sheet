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
		<div className="flex flex-col items-center justify-center relative py-2">
			<div className="flex items-center justify-center text-sm tracking-wide text-stone-500 absolute top-0 border-stone-400 leading-none bg-background h-5 text-center w-9 rounded-md border">
				{label}
			</div>
			<span className="flex items-center justify-center w-12 h-14 rounded-md border border-stone-400 text-lg text-stone-600">
				{modifier && modifier >= 0 ? "+" : ""}
				{modifier ?? ""}
			</span>
			<div className="flex items-center justify-center text-sm text-stone-500 absolute bottom-0 bg-background border-stone-400 leading-none h-5 w-6 text-center rounded-md border">
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
