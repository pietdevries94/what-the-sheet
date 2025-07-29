import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRoute({
	component: () => (
		<>
			<main className="min-h-screen p-6 bg-background text-foreground inset-shadow-[0_0_16px_8px] inset-shadow-amber-800/10 font-serif">
				<Outlet />
			</main>
			<TanStackRouterDevtools />
		</>
	),
});
