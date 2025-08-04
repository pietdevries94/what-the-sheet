import { describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStatAndModifier } from "./useStatAndModifier";
import { createStoreWrapper } from "@/test-utils";

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
});
