import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { useRecentlyChanged } from "./useRecentlyChanged";

describe("useRecentlyChanged", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.runOnlyPendingTimers();
		vi.useRealTimers();
	});

	it("returns false initially", () => {
		const { result } = renderHook(() => useRecentlyChanged("initial"));
		expect(result.current).toBe(false);
	});

	it("returns true immediately after value change", () => {
		let value = "initial";
		const { result, rerender } = renderHook(() => useRecentlyChanged(value));

		expect(result.current).toBe(false);

		// Change the value
		value = "changed";
		rerender();

		// Advance timers to trigger the immediate setState
		act(() => {
			vi.advanceTimersByTime(1);
		});

		expect(result.current).toBe(true);
	});

	it("returns false after default duration (1000ms)", () => {
		let value = "initial";
		const { result, rerender } = renderHook(() => useRecentlyChanged(value));

		// Change the value
		value = "changed";
		rerender();

		// Advance time by more than default duration
		act(() => {
			vi.advanceTimersByTime(1100);
		});

		expect(result.current).toBe(false);
	});

	it("returns false after custom duration", () => {
		let value = "initial";
		const customDuration = 2000;
		const { result, rerender } = renderHook(() =>
			useRecentlyChanged(value, customDuration),
		);

		// Change the value
		value = "changed";
		rerender();

		// Advance time by more than custom duration
		act(() => {
			vi.advanceTimersByTime(2100);
		});

		expect(result.current).toBe(false);
	});

	it("works with different value types", () => {
		// Test with numbers
		const { result: numResult } = renderHook(() => useRecentlyChanged(42));
		expect(numResult.current).toBe(false);

		// Test with objects
		const { result: objResult } = renderHook(() =>
			useRecentlyChanged({ id: 1 }),
		);
		expect(objResult.current).toBe(false);

		// Test with booleans
		const { result: boolResult } = renderHook(() => useRecentlyChanged(true));
		expect(boolResult.current).toBe(false);
	});

	it("cleans up timeouts on unmount", () => {
		const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");
		let value = "initial";
		const { unmount, rerender } = renderHook(() => useRecentlyChanged(value));

		// Change value to create a timeout
		value = "changed";
		rerender();

		// Unmount should clean up
		unmount();

		// We expect clearTimeout to be called during cleanup
		expect(clearTimeoutSpy).toHaveBeenCalled();
		clearTimeoutSpy.mockRestore();
	});

	it("does not change flag when value remains the same", () => {
		const value = "constant";
		const { result, rerender } = renderHook(() => useRecentlyChanged(value));

		expect(result.current).toBe(false);

		// Rerender with same value multiple times
		rerender();
		rerender();
		rerender();

		expect(result.current).toBe(false);
	});

	it("accepts custom duration parameter", () => {
		// Test that the hook accepts the duration parameter without errors
		const { result } = renderHook(() => useRecentlyChanged("test", 500));
		expect(result.current).toBe(false);

		const { result: result2 } = renderHook(() =>
			useRecentlyChanged("test", 2000),
		);
		expect(result2.current).toBe(false);
	});

	it("handles value changes correctly", () => {
		let value = "initial";
		const { result, rerender } = renderHook(() =>
			useRecentlyChanged(value, 100),
		);

		// Initial state
		expect(result.current).toBe(false);

		// Change value
		value = "changed";
		rerender();

		// After the timeout period, should be false again
		act(() => {
			vi.advanceTimersByTime(150);
		});

		expect(result.current).toBe(false);
	});

	it("stays true if value changes again during timeout period", () => {
		let value = "initial";
		const { result, rerender } = renderHook(() =>
			useRecentlyChanged(value, 1000),
		);

		// Change value first time
		value = "changed1";
		rerender();

		// Advance time partially
		act(() => {
			vi.advanceTimersByTime(500);
		});

		// Change value again before timeout
		value = "changed2";
		rerender();

		// Advance time past original timeout but not past new timeout
		act(() => {
			vi.advanceTimersByTime(700);
		});

		// Should still be true because new timeout was set
		expect(result.current).toBe(true);

		// Advance past new timeout
		act(() => {
			vi.advanceTimersByTime(400);
		});

		// Now should be false
		expect(result.current).toBe(false);
	});
});
