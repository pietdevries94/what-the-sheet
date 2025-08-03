import { useStore } from "@livestore/react";
import { useContext } from "react";
import type { DndStat } from "@/dndTypes";
import { CharacterSheetContext } from "@/components/CharacterSheet/CharacterSheetContext";
import { statAndModifier$ } from "@/livestore/queries";

export const useStatAndModifier = (stat: DndStat) => {
	const id = useContext(CharacterSheetContext);
	const { store } = useStore();
	const { value, modifier } = store.useQuery(statAndModifier$(id, stat));
	return { value, modifier };
};
