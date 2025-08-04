import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MainStats } from "./MainStats";
import { CharacterSheetContext } from "./CharacterSheetContext";
import { createStoreWrapper } from "@/test-utils/store";
import { tables } from "@/livestore/schema";

describe("MainStats", () => {
	it("renders all stat blocks with default values", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { wrapper } = await createStoreWrapper(onTestFinished);

		const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
			children,
		}) => (
			<CharacterSheetContext.Provider value={characterSheetId}>
				{wrapper({ children })}
			</CharacterSheetContext.Provider>
		);

		render(<MainStats />, { wrapper: TestWrapper });

		// Check that all 6 stat labels are rendered
		expect(screen.getByText("Con")).toBeDefined();
		expect(screen.getByText("Dex")).toBeDefined();
		expect(screen.getByText("Int")).toBeDefined();
		expect(screen.getByText("Cha")).toBeDefined();
		expect(screen.getByText("Wis")).toBeDefined();
		expect(screen.getByText("Str")).toBeDefined();

		// Check that all default modifiers are -5 (for value 0)
		const modifiers = screen.getAllByText("-5");
		expect(modifiers).toHaveLength(6);

		// Check that all default values are 0
		const values = screen.getAllByText("0");
		expect(values).toHaveLength(6);
	});

	it("displays correct stat values and modifiers with test data", async ({
		onTestFinished,
	}) => {
		const characterSheetId = "test-character-sheet";

		const { store, wrapper } = await createStoreWrapper(onTestFinished);

		// Insert test data for different stats
		store.sqliteDbWrapper.execute(
			tables.statAdjustments.insert({
				characterSheetId,
				stat: "constitution",
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
		store.sqliteDbWrapper.execute(
			tables.statAdjustments.insert({
				characterSheetId,
				stat: "strength",
				value: 8,
			}),
		);

		const TestWrapper: React.FC<{ children: React.ReactNode }> = ({
			children,
		}) => (
			<CharacterSheetContext.Provider value={characterSheetId}>
				{wrapper({ children })}
			</CharacterSheetContext.Provider>
		);

		render(<MainStats />, { wrapper: TestWrapper });

		// Check specific stat values and modifiers
		expect(screen.getByText("16")).toBeDefined(); // Constitution value
		expect(screen.getByText("+3")).toBeDefined(); // Constitution modifier

		expect(screen.getByText("14")).toBeDefined(); // Dexterity value
		expect(screen.getByText("+2")).toBeDefined(); // Dexterity modifier

		expect(screen.getByText("8")).toBeDefined(); // Strength value
		expect(screen.getByText("-1")).toBeDefined(); // Strength modifier
	});
});
