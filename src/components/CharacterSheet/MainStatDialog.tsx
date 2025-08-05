import { useStore } from "@livestore/react";
import { Dialog } from "radix-ui";
import React, { useContext } from "react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type { DndStat } from "@/dndTypes";
import { events } from "@/livestore/schema";

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
		<Dialog.Root>
			<Dialog.Trigger asChild={true}>{children}</Dialog.Trigger>
			<Dialog.Portal>
				<Dialog.Content
					className={`
						fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-1/2
						focus:outline-none
					`}
				>
					<div
						className={`
							relative size-full border border-amber-100 bg-amber-50 p-[25px]
							before:absolute before:top-2 before:-left-2 before:-z-1 before:size-full
							before:bg-amber-800/10 before:blur-sm
						`}
					>
						<Dialog.Title>
							{stat.charAt(0).toUpperCase() + stat.slice(1)}
						</Dialog.Title>
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
						<Dialog.Close>Close</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
