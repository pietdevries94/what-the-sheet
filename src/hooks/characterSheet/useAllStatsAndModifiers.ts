import { useStore } from "@livestore/react";
import { useMemo } from "react";
import type { DndStat } from "@/dndTypes";
import { dndStats } from "@/dndTypes";
import { allStatsAndModifiers$ } from "@/livestore/queries";

export type StatAndModifier = {
	value: number;
	modifier: number;
};

export type AllStatsAndModifiers = Record<DndStat, StatAndModifier>;

export const useAllStatsAndModifiers = (
	characterSheetId: string,
): AllStatsAndModifiers => {
	const { store } = useStore();
	const statsData = store.useQuery(allStatsAndModifiers$(characterSheetId));

	return useMemo(() => {
		// Create a map with default values for all stats
		const result = dndStats.reduce((acc, stat) => {
			acc[stat] = { value: 0, modifier: -5 };
			return acc;
		}, {} as AllStatsAndModifiers);

		// Override with actual data where available
		for (const statData of statsData) {
			if (dndStats.includes(statData.stat as DndStat)) {
				result[statData.stat as DndStat] = {
					value: statData.value,
					modifier: statData.modifier,
				};
			}
		}

		return result;
	}, [statsData]);
};
