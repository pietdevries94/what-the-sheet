import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStatsAndModifiers } from "./useStatsAndModifiers";
import { createStoreWrapper } from "@/test-utils/store";
import { tables } from "@/livestore/schema";

describe("useStatsAndModifiers", () => {
	it("retrieves the correct stat and modifier", async ({ onTestFinished }) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const { result } = renderHook(
			() => useStatsAndModifiers(characterSheetId),
			{ wrapper },
		);

		expect(result.current.constitution.value).toBe(0);
		expect(result.current.constitution.modifier).toBe(-5);
	});

	it("filters and sums only the requested stat when multiple stats have adjustments", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { store, wrapper } = await createStoreWrapper(onTestFinished);

		// Insert test data for multiple stats
		store.sqliteDbWrapper.execute(
			tables.statAdjustments.insert({
				characterSheetId,
				stat: "constitution",
				value: 8,
			}),
		);
		store.sqliteDbWrapper.execute(
			tables.statAdjustments.insert({
				characterSheetId,
				stat: "constitution",
				value: 7,
			}),
		);
		store.sqliteDbWrapper.execute(
			tables.statAdjustments.insert({
				characterSheetId,
				stat: "strength",
				value: 16,
			}),
		);
		store.sqliteDbWrapper.execute(
			tables.statAdjustments.insert({
				characterSheetId,
				stat: "dexterity",
				value: 14,
			}),
		);

		const { result } = renderHook(
			() => useStatsAndModifiers(characterSheetId),
			{ wrapper },
		);

		expect(result.current.constitution.value).toBe(15);
		expect(result.current.constitution.modifier).toBe(2);

		expect(result.current.strength.value).toBe(16);
		expect(result.current.strength.modifier).toBe(3);

		expect(result.current.dexterity.value).toBe(14);
		expect(result.current.dexterity.modifier).toBe(2);
		expect(result.current.constitution.value).toBe(15);
		expect(result.current.constitution.modifier).toBe(2);

		expect(result.current.strength.value).toBe(16);
		expect(result.current.strength.modifier).toBe(3);

		expect(result.current.dexterity.value).toBe(14);
		expect(result.current.dexterity.modifier).toBe(2);
	});
});
