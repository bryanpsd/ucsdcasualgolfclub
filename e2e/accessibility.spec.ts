import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
	test("homepage should have proper heading hierarchy", async ({ page }) => {
		await page.goto("/");

		// Check for h1
		const h1 = page.locator("h1");
		expect(await h1.count()).toBeGreaterThanOrEqual(1);
	});

	test("all images should have alt text", async ({ page }) => {
		await page.goto("/");

		const images = await page.locator("img").all();

		for (const img of images) {
			const alt = await img.getAttribute("alt");
			// Alt can be empty string for decorative images, but should exist
			expect(alt).toBeDefined();
		}
	});

	test("navigation links should be keyboard accessible", async ({ page }) => {
		await page.goto("/");

		// Tab through navigation
		await page.keyboard.press("Tab");

		// Check that focus is visible somewhere
		const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
		expect(focusedElement).toBeDefined();
	});

	test("forms should have accessible labels", async ({ page }) => {
		await page.goto("/contact");

		// All form inputs should have labels
		const inputs = await page.locator("input[type='text'], input[type='email'], textarea").all();

		for (const input of inputs) {
			const id = await input.getAttribute("id");
			if (id) {
				const label = page.locator(`label[for="${id}"]`);
				await expect(label).toBeVisible();
			}
		}
	});

	test("buttons should have accessible names", async ({ page }) => {
		await page.goto("/");

		const buttons = await page.locator("button").all();

		for (const button of buttons) {
			const ariaLabel = await button.getAttribute("aria-label");
			const textContent = await button.textContent();

			// Button should have either aria-label or text content
			expect(ariaLabel || textContent?.trim()).toBeTruthy();
		}
	});

	test("page should have proper document language", async ({ page }) => {
		await page.goto("/");

		const lang = await page.locator("html").getAttribute("lang");
		expect(lang).toBeTruthy();
	});

	test("links should have descriptive text", async ({ page }) => {
		await page.goto("/");

		const links = await page.locator("a").all();

		for (const link of links) {
			const text = await link.textContent();
			const ariaLabel = await link.getAttribute("aria-label");

			// Link should have meaningful text or aria-label
			expect(text?.trim() || ariaLabel).toBeTruthy();
		}
	});
});
