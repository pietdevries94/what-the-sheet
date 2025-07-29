import { PowerSyncContext } from "@powersync/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { powerSyncDb } from "./db";

type Props = {
	children?: React.ReactNode;
};
export const PowerSyncProvider: React.FC<Props> = ({ children }) => {
	const powerSync = React.useMemo(() => powerSyncDb, []);
	const queryClient = React.useMemo(() => new QueryClient(), []);

	return (
		<PowerSyncContext.Provider value={powerSync}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</PowerSyncContext.Provider>
	);
};
