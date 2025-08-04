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
				<Dialog.Overlay className={`fixed inset-0 bg-stone-600/20`} />
				<Dialog.Content
					className={`
						fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-1/2
						rounded-md bg-white p-[25px] shadow-(--shadow-6)
						focus:outline-none
					`}
				>
					<Dialog.Title>Wow, so cool</Dialog.Title>
					<Dialog.Description>This is a description</Dialog.Description>
					<input
						type="number"
						value={statAdjustment}
						onChange={(e) => setStatAdjustment(Number(e.target.value))}
						className="w-full rounded-md border border-stone-300 p-2"
						placeholder="Enter stat adjustment"
					/>
					<button
						type="button"
						onClick={() => {
							statAdjustmentCreated();
							setStatAdjustment(0);
						}}
						className={`
							mt-4 rounded-md bg-blue-500 px-4 py-2 text-white
							hover:bg-blue-600
						`}
					>
						Create Stat Adjustment
					</button>
					<Dialog.Close>Close</Dialog.Close>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
