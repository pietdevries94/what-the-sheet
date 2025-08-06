import React, { useEffect, useRef } from "react";

/**
 * Hook that tracks when a value has recently changed and returns a boolean
 * indicating whether the value was changed within the specified duration.
 *
 * @param value - The value to track for changes
 * @param duration - Duration in milliseconds to keep the "recently changed" flag active (default: 1000ms)
 * @returns boolean indicating if the value was recently changed
 */
export function useRecentlyChanged(
	value: unknown,
	duration: number = 1000,
): boolean {
	const [recentlyChanged, setRecentlyChanged] = React.useState(false);
	const [prevValue, setPrevValue] = React.useState(value);
	const timeoutRef = useRef<number | null>(null);

	// Clean up timeout on unmount
	useEffect(() => {
		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	// Handle value changes - mimic the original logic
	if (prevValue !== value) {
		setPrevValue(value);

		// Clear any existing timeout
		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
		}

		// Set the flag immediately
		setTimeout(() => setRecentlyChanged(true), 0);

		// Clear the flag after the specified duration
		timeoutRef.current = setTimeout(() => {
			setRecentlyChanged(false);
			timeoutRef.current = null;
		}, duration);
	}

	return recentlyChanged;
}
