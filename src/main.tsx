import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { makePersistedAdapter } from "@livestore/adapter-web";
import LiveStoreSharedWorker from "@livestore/adapter-web/shared-worker?sharedworker";
import { LiveStoreProvider } from "@livestore/react";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

import "./styles.css";
import reportWebVitals from "./reportWebVitals.ts";
import LiveStoreWorker from "./livestore.worker?worker";
import { schema } from "./livestore/schema.ts";
import { unstable_batchedUpdates as batchUpdates } from "react-dom";

// Create a new router instance
const router = createRouter({
	routeTree,
	context: {},
	defaultPreload: "intent",
	scrollRestoration: true,
	defaultStructuralSharing: true,
	defaultPreloadStaleTime: 0,
	basepath: "/what-the-sheet",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// Create the livestore adapter
const adapter = makePersistedAdapter({
	storage: { type: "opfs" },
	worker: LiveStoreWorker,
	sharedWorker: LiveStoreSharedWorker,
});

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<LiveStoreProvider
				schema={schema}
				adapter={adapter}
				renderLoading={(_) => <div>Loading LiveStore ({_.stage})...</div>}
				batchUpdates={batchUpdates}
				storeId="test-store"
			>
				<RouterProvider router={router} />
			</LiveStoreProvider>
		</StrictMode>,
	);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
