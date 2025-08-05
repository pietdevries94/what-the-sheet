import { useStore } from "@livestore/react";
import { Dialog as RadixDialog } from "radix-ui";
import React, { useContext } from "react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type { DndStat } from "@/dndTypes";
import { events } from "@/livestore/schema";
import { Dialog } from "@/components/ui/Dialog";

export const MainStatDialog: React.FC<{
	children: React.ReactNode;
	stat: DndStat;
}> = ({ children, stat }) => {
	const { store } = useStore();
	const characterSheetId = useContext(CharacterSheetContext);

	const [statAdjustment, setStatAdjustment] = React.useState<number>(0);

	const statAdjustmentCreated = () => {
		if (statAdjustment === 0) return;
		store.commit(
			events.statAdjustmentCreated({
				characterSheetId,
				stat,
				value: statAdjustment,
			}),
		);
	};

	return (
		<Dialog
			title={stat.charAt(0).toUpperCase() + stat.slice(1)}
			trigger={children}
		>
			<input
				type="number"
				value={statAdjustment}
				onChange={(e) => setStatAdjustment(Number(e.target.value))}
				placeholder="Enter stat adjustment"
			/>
			<button
				type="button"
				onClick={() => {
					statAdjustmentCreated();
					setStatAdjustment(0);
				}}
			>
				Create Stat Adjustment
			</button>
			<RadixDialog.Close>Close</RadixDialog.Close>
		</Dialog>
	);
};
