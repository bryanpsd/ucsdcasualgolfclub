import { expect, test } from "@playwright/test";

test.describe("Contact Form", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/contact");
	});

	test("should display contact form", async ({ page }) => {
		await expect(page.getByRole("heading", { name: /contact/i })).toBeVisible();
		await expect(page.getByLabel(/name/i)).toBeVisible();
		await expect(page.getByLabel(/email/i)).toBeVisible();
		await expect(page.getByLabel(/message/i)).toBeVisible();
		await expect(page.getByRole("button", { name: /submit/i })).toBeVisible();
	});

	test("should show validation errors for empty required fields", async ({ page }) => {
		await page.getByRole("button", { name: /submit/i }).click();

		// Wait for validation messages
		await expect(page.getByText(/enter your name/i)).toBeVisible();
		await expect(page.getByText(/enter a valid email/i)).toBeVisible();
	});

	test("should show validation error for invalid email", async ({ page }) => {
		await page.getByLabel(/name/i).fill("John Doe");
		await page.getByLabel(/email/i).fill("invalid-email");
		await page.getByLabel(/message/i).fill("Test message");

		await page.getByRole("button", { name: /submit/i }).click();

		await expect(page.getByText(/enter a valid email/i)).toBeVisible();
	});

	test("should allow filling out the form", async ({ page }) => {
		await page.getByLabel(/name/i).fill("John Doe");
		await page.getByLabel(/email/i).fill("john@example.com");
		await page.getByLabel(/message/i).fill("This is a test message for E2E testing.");

		// Verify values are filled
		await expect(page.getByLabel(/name/i)).toHaveValue("John Doe");
		await expect(page.getByLabel(/email/i)).toHaveValue("john@example.com");
		await expect(page.getByLabel(/message/i)).toHaveValue(
			"This is a test message for E2E testing."
		);
	});

	test("should have accessible form labels", async ({ page }) => {
		// Check that all inputs have associated labels
		const nameInput = page.getByLabel(/name/i);
		const emailInput = page.getByLabel(/email/i);
		const messageInput = page.getByLabel(/message/i);

		await expect(nameInput).toBeVisible();
		await expect(emailInput).toBeVisible();
		await expect(messageInput).toBeVisible();
	});

	test("should focus on first field when tabbing", async ({ page }) => {
		await page.keyboard.press("Tab");

		// First focusable element might be navigation, so tab until we reach the form
		const nameInput = page.getByLabel(/name/i);

		// Tab through to the name input
		let attempts = 0;
		while (!(await nameInput.evaluate((el: Element) => el === document.activeElement)) && attempts < 20) {
			await page.keyboard.press("Tab");
			attempts++;
		}

		await expect(nameInput).toBeFocused();
	});

	test("should submit button be enabled when form is valid", async ({ page }) => {
		const submitButton = page.getByRole("button", { name: /submit/i });

		// Initially enabled
		await expect(submitButton).toBeEnabled();

		// Fill form
		await page.getByLabel(/name/i).fill("John Doe");
		await page.getByLabel(/email/i).fill("john@example.com");
		await page.getByLabel(/message/i).fill("Test message");

		// Should still be enabled
		await expect(submitButton).toBeEnabled();
	});
});
