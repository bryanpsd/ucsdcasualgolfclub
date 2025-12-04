import type { APIRoute } from "astro";

const CONTENTFUL_USE_PREVIEW = import.meta.env.CONTENTFUL_USE_PREVIEW === "true";
const CONTENTFUL_PREVIEW_TOKEN = import.meta.env.CONTENTFUL_PREVIEW_TOKEN;
const CONTENTFUL_DELIVERY_TOKEN = import.meta.env.CONTENTFUL_DELIVERY_TOKEN;
const CONTENTFUL_ENVIRONMENT = import.meta.env.CONTENTFUL_ENVIRONMENT_ID || "master";
const CONTENTFUL_SPACE_ID = import.meta.env.CONTENTFUL_SPACE_ID;

const HOST = CONTENTFUL_USE_PREVIEW ? "preview.contentful.com" : "cdn.contentful.com";
const TOKEN = CONTENTFUL_USE_PREVIEW ? CONTENTFUL_PREVIEW_TOKEN : CONTENTFUL_DELIVERY_TOKEN;

/**
 * Proxy to Contentful API
 *
 * This route intercepts all Contentful API calls and:
 * - Switches between preview and delivery APIs based on environment
 * - Adds HTTP cache headers for browser/CDN caching
 * - Centralizes all Contentful access for easier cache invalidation
 *
 * Cache strategy:
 * - Preview mode: 10 second cache (see changes quickly during development)
 * - Production mode: 1 hour cache (efficient for published content)
 *
 * @returns Contentful response with appropriate cache headers
 */
export const ALL: APIRoute = async ({ request, params }) => {
	// Get the path from the catch-all parameter
	const path = params.path || "";

	// Get query params from original request
	const url = new URL(request.url);
	const searchParams = url.searchParams;
	const encoded = new URLSearchParams(searchParams).toString();

	// Build Contentful API URL
	const contentfulUrl = `https://${HOST}/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/${path}${encoded ? `?${encoded}` : ""}`;

	// Clone headers from the incoming request
	const headers = new Headers(request.headers);
	headers.set("Authorization", `Bearer ${TOKEN}`);

	try {
		const response = await fetch(contentfulUrl, {
			method: request.method,
			headers,
			body: request.method !== "GET" && request.method !== "HEAD" ? await request.text() : undefined,
		});

		// Determine cache duration based on preview mode
		const cacheMaxAge = CONTENTFUL_USE_PREVIEW ? 10 : 3600; // 10 seconds in preview, 1 hour in production

		// Add cache headers
		const responseHeaders = new Headers(response.headers);
		responseHeaders.set("Cache-Control", `public, max-age=${cacheMaxAge}, s-maxage=${cacheMaxAge}`);
		responseHeaders.set("X-Contentful-Mode", CONTENTFUL_USE_PREVIEW ? "preview" : "delivery");

		return new Response(response.body, {
			status: response.status,
			statusText: response.statusText,
			headers: responseHeaders,
		});
	} catch (error) {
		console.error("Error fetching from Contentful:", error);
		return new Response(JSON.stringify({ error: "Error fetching content" }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
			},
		});
	}
};

// Export individual methods for clarity
export const GET = ALL;
export const POST = ALL;
export const PUT = ALL;
export const PATCH = ALL;
export const DELETE = ALL;
