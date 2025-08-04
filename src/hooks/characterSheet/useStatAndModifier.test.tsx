import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStatAndModifier } from "./useStatAndModifier";
import { createStoreWrapper } from "@/test-utils/store";
import { tables } from "@/livestore/schema";

describe("useStatAndModifier", () => {
	it("retrieves the correct stat and modifier", async ({ onTestFinished }) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const { result } = renderHook(
			() => useStatAndModifier(characterSheetId, "constitution"),
			{ wrapper },
		);

		expect(result.current.value).toBe(0);
		expect(result.current.modifier).toBe(-5);
	});

	it("filters and sums only the requested stat when multiple stats have adjustments", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { store, wrapper } = await createStoreWrapper(onTestFinished);

		// Insert test data for multiple different stats using schema
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

		// Test the hook for constitution - should sum only constitution values (8 + 7 = 15)
		const { result: constitutionResult } = renderHook(
			() => useStatAndModifier(characterSheetId, "constitution"),
			{ wrapper },
		);

		// Test the hook for strength - should only include strength value (16)
		const { result: strengthResult } = renderHook(
			() => useStatAndModifier(characterSheetId, "strength"),
			{ wrapper },
		);

		// Test the hook for dexterity - should only include dexterity value (14)
		const { result: dexterityResult } = renderHook(
			() => useStatAndModifier(characterSheetId, "dexterity"),
			{ wrapper },
		);

		expect(constitutionResult.current.value).toBe(15);
		expect(constitutionResult.current.modifier).toBe(2);

		expect(strengthResult.current.value).toBe(16);
		expect(strengthResult.current.modifier).toBe(3);

		expect(dexterityResult.current.value).toBe(14);
		expect(dexterityResult.current.modifier).toBe(2);
	});
});
