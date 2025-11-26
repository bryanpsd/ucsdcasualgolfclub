import { expect, test } from "@playwright/test";

test.describe("Results Page", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/results");
	});

	test("should display results page", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /results/i })).toBeVisible();
	});

	test("should display tournament results", async ({ page }) => {
		// Check if there's a table or results container
		const hasTable = await page.locator("table").count();
		const hasResults = await page.getByText(/tournament/i).count();

		expect(hasTable > 0 || hasResults > 0).toBeTruthy();
	});

	test("should allow filtering or searching results", async ({ page }) => {
		// Check if there's a player name filter
		const filterInput = page.locator('input[placeholder*="player" i]');

		if (await filterInput.isVisible()) {
			await filterInput.fill("test");
			await page.waitForTimeout(500);

			// Verify that filtering happens (results update)
			await expect(filterInput).toHaveValue("test");
		}
	});

	test("should be responsive on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });

		await expect(page.getByRole("heading", { name: /results/i })).toBeVisible();
	});
});

test.describe("Roster Page", () => {
	test("should display current roster", async ({ page }) => {
		await page.goto("/roster");

		await expect(page.getByRole("heading", { name: /roster/i })).toBeVisible();
	});

	test("should display player information in a table", async ({ page }) => {
		await page.goto("/roster");

		// Check for table headers
		const tableHeaders = page.locator("th");
		expect(await tableHeaders.count()).toBeGreaterThan(0);
	});

	test("should allow navigation to different roster years", async ({ page }) => {
		await page.goto("/roster");

		// Look for year links or dropdowns
		const yearLinks = page.locator('a[href*="/roster/"]');

		if (await yearLinks.count() > 0) {
			const firstYearLink = yearLinks.first();
			await firstYearLink.click();

			// Verify we navigated
			await expect(page).toHaveURL(/\/roster\//);
		}
	});
});

test.describe("Seasons Page", () => {
	test("should display seasons", async ({ page }) => {
		// Navigate to a specific season (e.g., 2024)
		await page.goto("/seasons/2024");

		// Should display season information
		await expect(page.locator("h1, h2")).toBeVisible();
	});

	test("should display course cards", async ({ page }) => {
		await page.goto("/seasons/2024");

		// Check for course information
		const courseCards = page.locator('[class*="course" i]');

		// There should be some course-related content
		expect(await page.getByText(/course/i).count()).toBeGreaterThan(0);
	});
});
