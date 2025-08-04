import { useStore } from "@livestore/react";
import type { DndStat } from "@/dndTypes";
import { statsAndModifiers$ } from "@/livestore/queries";

export const useStatsAndModifiers = (characterSheetId: string) => {
	const { store } = useStore();
	const entries = store.useQuery(statsAndModifiers$(characterSheetId));

	return entries.reduce(
		(acc, entry) => {
			acc[entry.stat as DndStat] = {
				value: entry.value,
				modifier: entry.modifier,
			};
			return acc;
		},
		{
			constitution: { value: 0, modifier: -5 },
			dexterity: { value: 0, modifier: -5 },
			intelligence: { value: 0, modifier: -5 },
			charisma: { value: 0, modifier: -5 },
			wisdom: { value: 0, modifier: -5 },
			strength: { value: 0, modifier: -5 },
		} as Record<DndStat, { value: number; modifier: number }>,
	) satisfies Readonly<Record<DndStat, { value: number; modifier: number }>>;
};
