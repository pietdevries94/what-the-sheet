import { afterEach, describe, expect, it } from "vitest";
import { renderHook } from "@testing-library/react";
import { useStatAndModifier } from "./useStatAndModifier";
import { createStoreWrapper } from "@/test-utils";

describe("useStatAndModifier", () => {
	let cleanup: (() => Promise<void>) | undefined;

	afterEach(async () => {
		if (cleanup) {
			await cleanup();
			cleanup = undefined;
		}
	});

	it("retrieves the correct stat and modifier", async () => {
		const characterSheetId = "test-character-sheet";

		const { wrapper, cleanup: testCleanup } = await createStoreWrapper();
		cleanup = testCleanup;

		const { result } = renderHook(
			() => useStatAndModifier(characterSheetId, "constitution"),
			{ wrapper },
		);

		expect(result.current.value).toBe(0);
		expect(result.current.modifier).toBe(-5);
	});
});
