// @ts-check

import tseslint from "@typescript-eslint/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
	// Base ignores
	{
		ignores: ["dist/**", "node_modules/**", ".astro/**", "**/*.css.ts", "*.config.{js,ts,mjs}"],
	},

	// Astro recommended config
	...eslintPluginAstro.configs.recommended,

	// Custom rules for Astro files
	{
		files: ["**/*.astro"],
		plugins: {
			"@typescript-eslint": tseslint,
		},
		rules: {
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
					caughtErrorsIgnorePattern: "^_",
				},
			],
		},
	},
];
