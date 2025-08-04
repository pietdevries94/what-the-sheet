import { promises as fs } from "node:fs";
import { join } from "node:path";
import { makeAdapter } from "@livestore/adapter-node";
import { LiveStoreContext } from "@livestore/react";
import { createStorePromise } from "@livestore/livestore";
import type React from "react";
import { schema } from "@/livestore/schema";

/**
 * Test helper that creates a store and wrapper for testing hooks that depend on LiveStore
 * @param onTestFinished - Vitest's onTestFinished callback for cleanup registration
 * @returns An object containing the store and wrapper component
 */
export const createStoreWrapper = async (
	onTestFinished: (fn: () => void | Promise<void>) => void,
) => {
	// Create a unique temporary directory for this test
	const testId = `test-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
	const tempDir = join("tmp", testId);

	// Create the temporary directory (recursive option handles parent directories)
	await fs.mkdir(tempDir, { recursive: true });

	const adapter = makeAdapter({
		storage: { type: "fs", baseDirectory: tempDir },
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

	// Register cleanup function with vitest's onTestFinished
	onTestFinished(async () => {
		try {
			await fs.rm(tempDir, { recursive: true, force: true });
		} catch (error) {
			// Ignore cleanup errors - directory might not exist or be already cleaned up
			console.warn(`Failed to cleanup test directory ${tempDir}:`, error);
		}
	});

	return { store, wrapper };
};
