import { defineAction } from "astro:actions";
import { contentfulClient } from "../services/contentful/contentful";
import type { TypeResultsSkeleton } from "../types/contentful/TypeResults";
import { contentfulCache } from "../utils/contentfulCache";

export const getResults = defineAction({
	handler: async () => {
		const headerResultsData = await contentfulCache.cached(
			async () =>
				contentfulClient.withoutUnresolvableLinks.getEntries<TypeResultsSkeleton>({
					content_type: "results",
					select:
						"fields.title,fields.course,fields.date,fields.flight,fields.gross,fields.net,fields.putts",
					limit: 1000,
				}),
			{ content_type: "results" },
			10 * 60 * 1000, // 10 minutes cache
		);

		return headerResultsData.items.map((results) => results.fields);
	},
});
