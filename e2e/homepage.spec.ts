import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
	test("should load successfully", async ({ page }) => {
		await page.goto("/");
		await expect(page).toHaveTitle(/UCSD Casual Golf Club/i);
	});

	test("should display navigation menu", async ({ page }) => {
		await page.goto("/");

		// Check for main navigation links (using first() to avoid strict mode violations)
		await expect(page.getByRole("link", { name: /about/i }).first()).toBeVisible();
		await expect(page.getByRole("link", { name: /roster/i }).first()).toBeVisible();
		// Note: Seasons is a dropdown menu, not a direct link
		await expect(page.getByText(/seasons/i).first()).toBeVisible();
		await expect(page.getByRole("link", { name: /contact/i }).first()).toBeVisible();
	});

	test("should display upcoming tournament card", async ({ page }) => {
		await page.goto("/");

		// Check for tournament information
		await expect(page.getByText(/upcoming tournament/i)).toBeVisible();
	});

	test("should navigate to different pages", async ({ page }) => {
		await page.goto("/");

		// Navigate to About page
		await page.getByRole("link", { name: /about/i }).first().click();
		await expect(page).toHaveURL(/\/about/);
		await expect(page.getByRole("heading", { name: /about/i })).toBeVisible();

		// Navigate to Contact page
		await page.goto("/");
		await page.getByRole("link", { name: /contact/i }).first().click();
		await expect(page).toHaveURL(/\/contact/);
		await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();
	});

	test("should display club champions section", async ({ page }) => {
		await page.goto("/");

		// Check for club champions heading
		await expect(page.getByRole("heading", { name: /club champions/i })).toBeVisible();
	});

	test("should have back to top button appear on scroll", async ({ page }) => {
		await page.goto("/");

		// Wait for page to be fully loaded
		await page.waitForLoadState("networkidle");

		// Scroll down
		await page.evaluate(() => window.scrollTo(0, 500));

		// Wait for back to top button to hydrate and appear (client:idle can take time)
		const backToTopButton = page.getByRole("button", { name: /back to top/i });
		await expect(backToTopButton).toBeVisible({ timeout: 15000 });

		// Click back to top
		await backToTopButton.click();

		// Wait for scroll animation and verify we're at the top
		await page.waitForFunction(() => window.scrollY < 10, { timeout: 5000 });

		// Check that we're at or near the top
		const scrollY = await page.evaluate(() => window.scrollY);
		expect(scrollY).toBeLessThan(10);
	});

	test("should be responsive on mobile", async ({ page }) => {
		await page.setViewportSize({ width: 375, height: 667 });
		await page.goto("/");

		await expect(page).toHaveTitle(/UCSD Casual Golf Club/i);

		// Check that mobile menu is present
		const mobileMenuButton = page.locator('button[aria-label*="menu" i]');
		if (await mobileMenuButton.isVisible()) {
			await mobileMenuButton.click();
			await expect(page.getByRole("link", { name: /about/i })).toBeVisible();
		}
	});
});
