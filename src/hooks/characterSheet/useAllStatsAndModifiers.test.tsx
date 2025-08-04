import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useAllStatsAndModifiers } from "./useAllStatsAndModifiers";
import { createStoreWrapper } from "@/test-utils";
import { dndStats } from "@/dndTypes";

describe("useAllStatsAndModifiers", () => {
	it("retrieves all stats with default values when no adjustments exist", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const { result } = renderHook(
			() => useAllStatsAndModifiers(characterSheetId),
			{ wrapper },
		);

		// All stats should have default values (0 value, -5 modifier)
		for (const stat of dndStats) {
			expect(result.current[stat]).toEqual({
				value: 0,
				modifier: -5,
			});
		}

		// Verify the shape of the returned object
		expect(Object.keys(result.current)).toHaveLength(6);
		expect(Object.keys(result.current)).toEqual(
			expect.arrayContaining(dndStats),
		);
	});

	it("retrieves all stats as a map with correct types", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const { result } = renderHook(
			() => useAllStatsAndModifiers(characterSheetId),
			{ wrapper },
		);

		const statsMap = result.current;

		// Verify each stat has the correct structure
		expect(statsMap.strength).toEqual(
			expect.objectContaining({
				value: expect.any(Number),
				modifier: expect.any(Number),
			}),
		);
		expect(statsMap.dexterity).toEqual(
			expect.objectContaining({
				value: expect.any(Number),
				modifier: expect.any(Number),
			}),
		);
		expect(statsMap.constitution).toEqual(
			expect.objectContaining({
				value: expect.any(Number),
				modifier: expect.any(Number),
			}),
		);
		expect(statsMap.intelligence).toEqual(
			expect.objectContaining({
				value: expect.any(Number),
				modifier: expect.any(Number),
			}),
		);
		expect(statsMap.wisdom).toEqual(
			expect.objectContaining({
				value: expect.any(Number),
				modifier: expect.any(Number),
			}),
		);
		expect(statsMap.charisma).toEqual(
			expect.objectContaining({
				value: expect.any(Number),
				modifier: expect.any(Number),
			}),
		);
	});

	it("calculates modifiers correctly using D&D formula", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const { result } = renderHook(
			() => useAllStatsAndModifiers(characterSheetId),
			{ wrapper },
		);

		const statsMap = result.current;

		// Test that default stats (0 value) produce -5 modifier: floor((0-10)/2) = floor(-5) = -5
		expect(statsMap.strength.modifier).toBe(-5);
		expect(statsMap.dexterity.modifier).toBe(-5);

		// The modifier calculation is: floor((value - 10) / 2)
		// For value 0: floor((0 - 10) / 2) = floor(-5) = -5
		for (const stat of dndStats) {
			const expectedModifier = Math.floor((statsMap[stat].value - 10) / 2);
			expect(statsMap[stat].modifier).toBe(expectedModifier);
		}
	});

	it("returns stats in a predictable order", async ({ onTestFinished }) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const { result } = renderHook(
			() => useAllStatsAndModifiers(characterSheetId),
			{ wrapper },
		);

		const statsMap = result.current;
		const keys = Object.keys(statsMap);

		// Should contain all 6 D&D stats
		expect(keys).toHaveLength(6);
		expect(keys).toEqual(expect.arrayContaining(dndStats));
	});
});
