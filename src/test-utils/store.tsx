import { makeAdapter } from "@livestore/adapter-node";
import { LiveStoreContext } from "@livestore/react";
import { createStorePromise } from "@livestore/livestore";
import type React from "react";
import { schema } from "@/livestore/schema";

/**
 * Test helper that creates a store and wrapper for testing hooks that depend on LiveStore
 * @returns An object containing the store and wrapper component
 */
export const createStoreWrapper = async () => {
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

	return { store, wrapper };
};
