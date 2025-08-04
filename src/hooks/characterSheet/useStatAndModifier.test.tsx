import { makeAdapter } from "@livestore/adapter-node";
import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { LiveStoreContext } from "@livestore/react";
import { createStorePromise } from "@livestore/livestore";
import { useStatAndModifier } from "./useStatAndModifier";
import type React from "react";
import { schema } from "@/livestore/schema";

describe("useStatAndModifier", () => {
	it("retrieves the correct stat and modifier", async () => {
		const characterSheetId = "test-character-sheet";

		// TODO: dynamically create a sub folder for the base directory and clean it up after the test
		const adapter = makeAdapter({
			storage: { type: "fs", baseDirectory: "tmp" },
		});

		const store = await createStorePromise({
			adapter,
			schema,
			storeId: "test",
		});

		const wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
			// @ts-expect-error I put a node store in a React context, which is not the intended use case, but it works for testing
			<LiveStoreContext.Provider value={{ stage: "running", store }}>
				{children}
			</LiveStoreContext.Provider>
		);

		const { result } = renderHook(
			() => useStatAndModifier(characterSheetId, "constitution"),
			{ wrapper },
		);

		expect(result.current.value).toBe(0);
		expect(result.current.modifier).toBe(-5);
	});
});
