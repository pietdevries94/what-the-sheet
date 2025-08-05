import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { GeneralDialog } from "./GeneralDialog";

describe("GeneralDialog", () => {
	beforeEach(() => {
		cleanup();
	});

	it("renders trigger element", () => {
		const triggerText = "Open Test Dialog";

		render(
			<GeneralDialog
				title="Test Dialog"
				trigger={<button>{triggerText}</button>}
			>
				<p>Dialog content</p>
			</GeneralDialog>,
		);

		expect(screen.getByText(triggerText)).toBeDefined();
	});

	it("opens dialog when trigger is clicked", () => {
		const triggerText = "Click to Open";
		const dialogTitle = "Test Dialog Title";
		const dialogContent = "Dialog test content";

		render(
			<GeneralDialog
				title={dialogTitle}
				trigger={<button>{triggerText}</button>}
			>
				<p>{dialogContent}</p>
			</GeneralDialog>,
		);

		// Initially, dialog content should not be visible
		expect(screen.queryByText(dialogTitle)).toBeNull();
		expect(screen.queryByText(dialogContent)).toBeNull();

		// Click the trigger button
		fireEvent.click(screen.getByText(triggerText));

		// Dialog should now be open with title and content visible
		expect(screen.getByText(dialogTitle)).toBeDefined();
		expect(screen.getByText(dialogContent)).toBeDefined();
	});

	it("renders children content when dialog is open", () => {
		const triggerText = "Show Children";

		render(
			<GeneralDialog
				title="Children Test Dialog"
				trigger={<button>{triggerText}</button>}
			>
				<div>
					<input placeholder="Test input field" />
					<button>Test action button</button>
				</div>
			</GeneralDialog>,
		);

		// Open the dialog
		fireEvent.click(screen.getByText(triggerText));

		// Check that children content is rendered
		expect(screen.getByPlaceholderText("Test input field")).toBeDefined();
		expect(screen.getByText("Test action button")).toBeDefined();
	});

	it("displays the correct title", () => {
		const customTitle = "My Custom Dialog Title";

		render(
			<GeneralDialog title={customTitle} trigger={<button>Show Title</button>}>
				<p>Content here</p>
			</GeneralDialog>,
		);

		// Open the dialog
		fireEvent.click(screen.getByText("Show Title"));

		// Check title is displayed correctly
		expect(screen.getByText(customTitle)).toBeDefined();
	});
});
