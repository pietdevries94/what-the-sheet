import { useQuery } from "@powersync/tanstack-react-query";
import { MainStats } from "./MainStats";
import { SavingThrows } from "./SavingThrows";
import { Skills } from "./Skills";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type React from "react";
import { db } from "@/powersync/db";

type Props = {
	id: string;
};
export const CharacterSheet: React.FC<Props> = ({ id }) => {
	const { data, isLoading } = useQuery({
		queryKey: ["characterSheet", id],
		query: db.selectFrom("characterSheets").select(["id"]).where("id", "=", id),
	});

	if (isLoading) {
		return <div>Loading character sheet...</div>;
	}

	// Ensure the character sheet exists
	if (!data || data.length === 0) {
		db.insertInto("characterSheets")
			.values({ id })
			.execute()
			.catch((error) => {
				console.error("Failed to create character sheet:", error);
			});
		return <div>Character sheet not found, creating a new one...</div>;
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
