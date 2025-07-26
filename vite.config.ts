import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { livestoreDevtoolsPlugin } from "@livestore/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import { VitePWA } from "vite-plugin-pwa";
import { resolve } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		tanstackRouter({ autoCodeSplitting: true }),
		viteReact(),
		tailwindcss(),
		livestoreDevtoolsPlugin({ schemaPath: "./src/livestore/schema.ts" }),
		VitePWA({ registerType: "autoUpdate" }),
	],
	resolve: {
		alias: {
			"@": resolve(__dirname, "./src"),
		},
	},
	base: "/what-the-sheet/",
});
