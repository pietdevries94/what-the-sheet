import { useStore } from "@livestore/react";
import type { DndStat } from "@/dndTypes";
import { statAndModifier$ } from "@/livestore/queries";

export const useStatAndModifier = (characterSheetId: string, stat: DndStat) => {
	const { store } = useStore();
	const { value, modifier } = store.useQuery(
		statAndModifier$(characterSheetId, stat),
	);
	return { value, modifier };
};
