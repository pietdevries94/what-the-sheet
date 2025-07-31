// @ts-expect-error
import { tanstackConfig } from "@tanstack/eslint-config";
import { defineConfig } from "eslint/config";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";

export default defineConfig([
	{
		ignores: ["eslint.config.js"],
	},
	...tanstackConfig,
	{
		files: ["**/*.{jsx,tsx}"],
		languageOptions: {
			parserOptions: {
				ecmaFeatures: {
					jsx: true,
				},
			},
		},
		plugins: {
			"better-tailwindcss": eslintPluginBetterTailwindcss,
		},
		rules: {
			...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
			"better-tailwindcss/enforce-consistent-line-wrapping": [
				"error",
				{ indent: "tab" },
			],
			"better-tailwindcss/enforce-consistent-variable-syntax": "error",
			"better-tailwindcss/enforce-consistent-important-position": "error",
			"better-tailwindcss/enforce-shorthand-classes": "error",
			"better-tailwindcss/no-deprecated-classes": "error",
			"better-tailwindcss/no-conflicting-classes": "error",
			"better-tailwindcss/no-restricted-classes": "error",
		},
		settings: {
			"better-tailwindcss": {
				entryPoint: "src/styles.css",
			},
		},
	},
]);
