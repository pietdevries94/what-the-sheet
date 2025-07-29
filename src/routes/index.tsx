import { createFileRoute } from "@tanstack/react-router";
import { CharacterSheet } from "@/components/CharacterSheet";

export const Route = createFileRoute("/")({
	component: App,
});

function App() {
	return (
		<>
			<CharacterSheet id="1" />
		</>
	);
}
