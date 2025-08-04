import { Dialog } from "radix-ui";
import type React from "react";

export const MainStatDialog: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
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
					<Dialog.Close />
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
};
