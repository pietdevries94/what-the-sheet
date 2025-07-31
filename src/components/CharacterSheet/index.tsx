import { queryDb } from "@livestore/livestore";
import { useStore } from "@livestore/react";
import { MainStats } from "./MainStats";
import { SavingThrows } from "./SavingThrows";
import { Skills } from "./Skills";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type React from "react";
import { events, tables } from "@/livestore/schema";

const characterSheetExists$ = (id: string) =>
	queryDb(
		tables.characterSheets
			.where({
				id,
			})
			.count(),
	);

type Props = {
	id: string;
};
export const CharacterSheet: React.FC<Props> = ({ id }) => {
	if (!id) {
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<p className="text-lg text-gray-500">No character sheet selected</p>
			</div>
		);
	}

	const { store } = useStore();
	const characterSheetExists = store.useQuery(characterSheetExists$(id));

	// Ensure the character sheet exists
	if (!characterSheetExists) {
		store.commit(events["characterSheetCreated"]({ id }));
		return (
			<div className="flex h-full flex-col items-center justify-center">
				<p className="text-lg text-gray-500">Creating character sheet...</p>
			</div>
		);
	}

	return (
		<CharacterSheetContext.Provider value={id}>
			<div className="flex flex-row">
				<MainStats />
				<SavingThrows />
				<Skills />
			</div>
		</CharacterSheetContext.Provider>
	);
};
