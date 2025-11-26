import type { APIRoute } from "astro";

/**
 * Proxy for retrieving images from Contentful with aggressive caching.
 * Images are cached for 1 year at CDN/browser level since Contentful URLs are immutable.
 */
export const GET: APIRoute = async ({ url }) => {
	const contentfulUrl = url.searchParams.get("url");

	if (!contentfulUrl) {
		return new Response(null, { status: 404 });
	}

	try {
		// Need to add `https:` because Contentful uses protocol-relative URLs
		// https://www.paulirish.com/2010/the-protocol-relative-url/
		const response = await globalThis.fetch(`https:${contentfulUrl}`);

		if (!response.ok) {
			return new Response(null, { status: response.status });
		}

		// Clone response to read headers and body
		const imageBlob = await response.blob();
		const contentType = response.headers.get("content-type") || "image/jpeg";

		// Aggressive caching: 1 year (images are immutable in Contentful)
		return new Response(imageBlob, {
			status: 200,
			headers: {
				"Content-Type": contentType,
				"Cache-Control": "public, max-age=31536000, immutable",
				"CDN-Cache-Control": "public, max-age=31536000, immutable",
				"Netlify-CDN-Cache-Control": "public, max-age=31536000, immutable",
			},
		});
	} catch (error) {
		console.error("Image proxy error:", error);
		return new Response(null, { status: 500 });
	}
};
