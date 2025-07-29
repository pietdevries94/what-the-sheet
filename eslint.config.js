//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		ignores: ["eslint.config.js"],
	},
	...tanstackConfig,
]);
