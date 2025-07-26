import { createFileRoute } from "@tanstack/react-router";
import { MainSection } from "@/components/MainSection";
import { Header } from "@/components/Header";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<div className="text-center">
			<Header />
			<MainSection />
		</div>
	);
}
