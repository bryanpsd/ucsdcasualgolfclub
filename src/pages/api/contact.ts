import type { APIRoute } from "astro";
import { validateCaptcha } from "~actions/utils/captcha";
import { log } from "~/utils/logger";

export const CAPTCHA_THRESHOLD = Number(import.meta.env.RECAPTCHA_THRESHOLD) || 0.1;

export const POST: APIRoute = async ({ request }) => {
	try {
		const { name, email, message, captchaToken, "bot-field": botField } = await request.json();

		// Honeypot check
		if (botField) {
			return new Response(JSON.stringify({ error: "Bot detected." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Define the expected captcha response type
		type CaptchaResponse = {
			success: boolean;
			score?: number;
			[key: string]: unknown;
		};

		// Validate captcha on the server
		const captchaResponse = (await validateCaptcha({
			token: captchaToken,
		})) as CaptchaResponse;

		// Use CAPTCHA_THRESHOLD to check the score if available
		if (
			!captchaResponse ||
			typeof captchaResponse.success !== "boolean" ||
			captchaResponse.success !== true ||
			(typeof captchaResponse.score === "number" && captchaResponse.score < CAPTCHA_THRESHOLD)
		) {
			return new Response(JSON.stringify({ error: "Captcha validation failed." }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Prepare Netlify form data
		const netlifyFormData = new URLSearchParams({
			"form-name": "contact",
			name,
			email,
			message,
		});

		// Only use your production domain
		const netlifyUrl = "https://ucsdcasualgolfclub.com/contact/";

		let netlifyResponse: Response | undefined, netlifyText: string | undefined, lastError: unknown;

		try {
			netlifyResponse = await fetch(netlifyUrl, {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: netlifyFormData.toString(),
			});
			netlifyText = await netlifyResponse.text();
		} catch (err) {
			lastError = err;
			log.error("Netlify Forms POST failed", err, {
				url: netlifyUrl,
				formName: "contact",
			});
		}

		if (!netlifyResponse?.ok) {
			log.error("Netlify Forms submission failed", lastError, {
				status: netlifyResponse?.status,
				body: netlifyText?.substring(0, 200), // Truncate long responses
				formName: "contact",
			});
			return new Response(
				JSON.stringify({
					error: "Failed to submit to Netlify Forms.",
					netlifyStatus: netlifyResponse?.status,
					netlifyBody: netlifyText,
					netlifyError: lastError ? String(lastError) : undefined,
				}),
				{
					status: 500,
					headers: { "Content-Type": "application/json" },
				},
			);
		}

		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error) {
		log.error("Contact form server error", error);
		return new Response(JSON.stringify({ error: "Server error. Please try again." }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};
