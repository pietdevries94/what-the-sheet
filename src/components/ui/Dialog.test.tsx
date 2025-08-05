import { beforeEach, describe, expect, it } from "vitest";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { Dialog } from "./Dialog";

describe("Dialog", () => {
	beforeEach(() => {
		cleanup();
	});

	it("renders trigger element", () => {
		const triggerText = "Open Test Dialog";

		render(
			<Dialog title="Test Dialog" trigger={<button>{triggerText}</button>}>
				<p>Dialog content</p>
			</Dialog>,
		);

		expect(screen.getByText(triggerText)).toBeDefined();
	});

	it("opens dialog when trigger is clicked", () => {
		const triggerText = "Click to Open";
		const dialogTitle = "Test Dialog Title";
		const dialogContent = "Dialog test content";

		render(
			<Dialog title={dialogTitle} trigger={<button>{triggerText}</button>}>
				<p>{dialogContent}</p>
			</Dialog>,
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
			<Dialog
				title="Children Test Dialog"
				trigger={<button>{triggerText}</button>}
			>
				<div>
					<input placeholder="Test input field" />
					<button>Test action button</button>
				</div>
			</Dialog>,
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
			<Dialog title={customTitle} trigger={<button>Show Title</button>}>
				<p>Content here</p>
			</Dialog>,
		);

		// Open the dialog
		fireEvent.click(screen.getByText("Show Title"));

		// Check title is displayed correctly
		expect(screen.getByText(customTitle)).toBeDefined();
	});

	it("has proper styling classes applied", () => {
		render(
			<Dialog title="Styled Dialog Test" trigger={<button>Style Test</button>}>
				<p>Styled content</p>
			</Dialog>,
		);

		// Open the dialog
		fireEvent.click(screen.getByText("Style Test"));

		// Check that dialog content has expected styling classes
		const dialogContent = screen
			.getByText("Styled Dialog Test")
			.closest('[class*="fixed"]');
		expect(dialogContent).toBeDefined();
		expect(dialogContent?.className).toContain("fixed");
		expect(dialogContent?.className).toContain("top-1/2");
		expect(dialogContent?.className).toContain("left-1/2");

		// Check that the inner div has expected styling
		const innerDiv = screen
			.getByText("Styled content")
			.closest('[class*="bg-amber-50"]');
		expect(innerDiv).toBeDefined();
		expect(innerDiv?.className).toContain("bg-amber-50");
		expect(innerDiv?.className).toContain("font-handwritten");
		expect(innerDiv?.className).toContain("border-amber-100");
	});
});
