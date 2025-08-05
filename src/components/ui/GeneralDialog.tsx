import { Dialog } from "radix-ui";
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
	<Dialog.Root>
		<Dialog.Trigger asChild={true}>{trigger}</Dialog.Trigger>
		<Dialog.Portal>
			<Dialog.Content
				className={`
					fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-120 -translate-1/2
					focus:outline-none
				`}
			>
				<div
					className={`
						relative size-full border border-amber-100 bg-amber-50 p-3
						font-handwritten
						before:absolute before:top-2 before:-left-2 before:-z-1 before:size-full
						before:bg-amber-800/10 before:blur-sm
					`}
				>
					<Dialog.Title className="mb-2 text-lg font-bold">
						{title}
					</Dialog.Title>
					{children}
				</div>
			</Dialog.Content>
		</Dialog.Portal>
	</Dialog.Root>
);

export const GeneralDialogClose: React.FC = () => (
	<Dialog.Close asChild={true}>
		<button
			className={`
				absolute top-2 right-2 size-6 rounded-full p-1 text-lg leading-0
				text-stone-700
				hover:bg-amber-100
			`}
			aria-label="Close"
		>
			<span className="sr-only">Close</span>
			&times;
		</button>
	</Dialog.Close>
);
