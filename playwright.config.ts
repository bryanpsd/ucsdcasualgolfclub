import { defineConfig, devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	testDir: "./e2e",
	fullyParallel: true,
	forbidOnly: !!process.env.CI,
	retries: process.env.CI ? 2 : 0,
	// Limit workers to avoid overwhelming dev server
	workers: process.env.CI ? 1 : 3,
	// Increase timeout for slow pages
	timeout: 60 * 1000, // 60 seconds per test
	reporter: [["html", { open: "never" }], ["list"]],
	use: {
		baseURL: process.env.BASE_URL || "http://localhost:4321",
		trace: "on-first-retry",
		screenshot: "only-on-failure",
	},

	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},

		// Disable other browsers by default to reduce load
		// Uncomment to test cross-browser compatibility
		// {
		// 	name: "firefox",
		// 	use: { ...devices["Desktop Firefox"] },
		// },
		//
		// {
		// 	name: "webkit",
		// 	use: { ...devices["Desktop Safari"] },
		// },
		//
		// /* Test against mobile viewports. */
		// {
		// 	name: "Mobile Chrome",
		// 	use: { ...devices["Pixel 5"] },
		// },
		// {
		// 	name: "Mobile Safari",
		// 	use: { ...devices["iPhone 12"] },
		// },
	],

	/* Run your local dev server before starting the tests */
	webServer: {
		command: "pnpm start",
		url: "http://localhost:4321",
		reuseExistingServer: !process.env.CI,
		timeout: 180 * 1000, // 3 minutes to start server
		timeout: 120 * 1000,
	},
});
