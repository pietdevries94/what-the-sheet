import { useStore } from "@livestore/react";
import React, { useContext } from "react";
import { TrashIcon } from "lucide-react";
import { CharacterSheetContext } from "./CharacterSheetContext";
import type { DndStat } from "@/dndTypes";
import { events } from "@/livestore/schema";
import {
	GeneralDialog,
	GeneralDialogClose,
} from "@/components/ui/GeneralDialog";
import { useStatAdjustmentsForStat } from "@/hooks/characterSheet/useStatAdjustmentsForStat";

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

	const statAdjustments = useStatAdjustmentsForStat(characterSheetId, stat);

	return (
		<GeneralDialog
			title={stat.charAt(0).toUpperCase() + stat.slice(1)}
			trigger={children}
		>
			<ul className="mb-4">
				{statAdjustments.map((adj, idx) => (
					<li key={idx} className="flex items-center gap-2 py-1">
						<span>{adj.value}</span>
						<span className="text-gray-600">{adj.description}</span>
						<button
							type="button"
							className={`
								ml-auto rounded-sm bg-red-500 p-1 text-white
								hover:bg-red-600
							`}
							onClick={() => {
								// TODO: implement delete handler
							}}
						>
							<TrashIcon size={16} />
						</button>
					</li>
				))}
			</ul>
			<input
				type="number"
				value={statAdjustment}
				onChange={(e) => setStatAdjustment(Number(e.target.value))}
				placeholder="Enter stat adjustment"
			/>
			<button
				type="button"
				className={`
					mt-2 rounded-sm bg-amber-500 px-4 py-2 text-white
					hover:bg-amber-600
				`}
				onClick={() => {
					statAdjustmentCreated();
					setStatAdjustment(0);
				}}
			>
				Create Stat Adjustment
			</button>
			<GeneralDialogClose />
		</GeneralDialog>
	);
};
