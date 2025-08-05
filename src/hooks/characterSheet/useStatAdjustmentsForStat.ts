import { useStore } from "@livestore/react";
import type { DndStat } from "@/dndTypes";
import { statAdjustmentsForStat$ } from "@/livestore/queries";

export const useStatAdjustmentsForStat = (
	characterSheetId: string,
	stat: DndStat,
) => {
	const { store } = useStore();
	return store.useQuery(statAdjustmentsForStat$(characterSheetId, stat));
};
