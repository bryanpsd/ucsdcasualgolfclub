import type { APIRoute } from "astro";
import { contentfulClient, usePreview } from "~services/contentful/contentful";

export const GET: APIRoute = async ({ request }) => {
	const url = new URL(request.url);
	const slug = url.searchParams.get("slug") || "";

	try {
		const entries = await contentfulClient.getEntries({
			content_type: "simplePage",
			"fields.slug": slug,
			limit: 1,
		});

		return new Response(
			JSON.stringify({
				usePreview: Boolean(usePreview),
				items: entries.items ?? [],
			}),
			{
				status: 200,
				headers: { "content-type": "application/json" },
			},
		);
	} catch (err) {
		return new Response(JSON.stringify({ error: String(err) }), {
			status: 500,
			headers: { "content-type": "application/json" },
		});
	}
};
