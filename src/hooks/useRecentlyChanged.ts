import React from "react";

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
	const prevValueRef = React.useRef(value);
	const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

	React.useEffect(() => {
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
	}, []);

	React.useEffect(() => {
		if (prevValueRef.current === value) return;

		prevValueRef.current = value;

		if (timeoutRef.current !== null) {
			clearTimeout(timeoutRef.current);
		}

		setRecentlyChanged(true);

		timeoutRef.current = setTimeout(() => {
			setRecentlyChanged(false);
			timeoutRef.current = null;
		}, duration);
	}, [value, duration]);

	return recentlyChanged;
}
