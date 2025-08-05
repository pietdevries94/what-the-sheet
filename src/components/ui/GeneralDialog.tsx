import { Dialog as RadixDialog } from "radix-ui";
import React from "react";

export interface GeneralDialogProps {
	children: React.ReactNode;
	title: string;
	trigger: React.ReactNode;
}

export const GeneralDialog: React.FC<GeneralDialogProps> = ({
	children,
	title,
	trigger,
}) => (
	<RadixDialog.Root>
		<RadixDialog.Trigger asChild={true}>{trigger}</RadixDialog.Trigger>
		<RadixDialog.Portal>
			<RadixDialog.Content
				className={`
					fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[500px] -translate-1/2
					focus:outline-none
				`}
			>
				<div
					className={`
						relative size-full border border-amber-100 bg-amber-50 p-[25px]
						font-handwritten
						before:absolute before:top-2 before:-left-2 before:-z-1 before:size-full
						before:bg-amber-800/10 before:blur-sm
					`}
				>
					<RadixDialog.Title>{title}</RadixDialog.Title>
					{children}
				</div>
			</RadixDialog.Content>
		</RadixDialog.Portal>
	</RadixDialog.Root>
);
