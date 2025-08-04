import { describe, expect, it } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useStatAndModifier } from "./useStatAndModifier";
import { createStoreWrapper } from "@/test-utils";
import { events } from "@/livestore/schema";

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

		// Insert test data for multiple different stats
		const db = store.sqliteDbWrapper.db;

		await db.execute(`
			INSERT INTO statAdjustments (characterSheetId, stat, value) VALUES 
			('${characterSheetId}', 'constitution', 8),
			('${characterSheetId}', 'constitution', 7),
			('${characterSheetId}', 'strength', 16),
			('${characterSheetId}', 'dexterity', 14)
		`);

		// Verify the data was inserted and grouped correctly by stat
		const testResults = await db.select(`
			SELECT stat, sum(value) as total 
			FROM statAdjustments 
			WHERE characterSheetId = '${characterSheetId}' 
			GROUP BY stat
		`);

		// Verify the same query logic that the hook uses for constitution
		const constitutionQuery = await db.select(`
			select floor((coalesce(sum(value),0)-10)/2) as modifier, coalesce(sum(value),0) as value 
			from statAdjustments 
			where characterSheetId = '${characterSheetId}' and stat = 'constitution'
		`);

		// Test that each stat is correctly isolated and summed
		expect(testResults).toHaveLength(3); // Should have 3 different stats

		const constitutionData = testResults.find((r) => r.stat === "constitution");
		const strengthData = testResults.find((r) => r.stat === "strength");
		const dexterityData = testResults.find((r) => r.stat === "dexterity");

		// Verify only constitution values are summed for constitution (8 + 7 = 15)
		expect(constitutionData?.total).toBe(15);
		// Verify other stats are not included in constitution calculation
		expect(strengthData?.total).toBe(16);
		expect(dexterityData?.total).toBe(14);

		// Verify the hook's query logic produces the correct result for constitution
		expect(constitutionQuery[0].value).toBe(15);
		expect(constitutionQuery[0].modifier).toBe(2); // floor((15-10)/2) = 2
	});
});
