import { useStore } from "@livestore/react";
import { useContext } from "react";
import { CharacterSheetContext } from "@/components/CharacterSheet/CharacterSheetContext";
import { statAndModifier$ } from "@/livestore/queries";

export const useStatAndModifier = (stat: string) => {
	const id = useContext(CharacterSheetContext);
	const { store } = useStore();
	const { value, modifier } = store.useQuery(statAndModifier$(id, stat));
	return { value, modifier };
};
