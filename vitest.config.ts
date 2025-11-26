import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";

export default defineConfig({
	plugins: [react()],
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: ["./src/test/setup.ts"],
		include: ["src/**/*.{test,spec}.{ts,tsx}"],
		exclude: ["node_modules", "dist", ".astro", "e2e/**"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: [
				"node_modules/",
				"src/test/",
				"**/*.d.ts",
				"**/*.config.*",
				"**/mockData",
				"dist/",
			],
		},
		alias: {
			"~/styles/globals/global.css": "/src/test/mocks/emptyCSS.ts",
			"~/styles/globals/reset.css": "/src/test/mocks/emptyCSS.ts",
			"~/styles/globals/theme.css": "/src/test/mocks/emptyCSS.ts",
		},
	},
	resolve: {
		alias: {
			"~": resolve(__dirname, "./src"),
			"~components": resolve(__dirname, "./src/components"),
			"~layouts": resolve(__dirname, "./src/layouts"),
			"~pages": resolve(__dirname, "./src/pages"),
			"~styles": resolve(__dirname, "./src/styles"),
			"~utils": resolve(__dirname, "./src/utils"),
			"~services": resolve(__dirname, "./src/services"),
			"~types": resolve(__dirname, "./src/types"),
			"~assets": resolve(__dirname, "./src/assets"),
			"~icons": resolve(__dirname, "./src/icons"),
			"~actions": resolve(__dirname, "./src/actions"),
		},
	},
});
