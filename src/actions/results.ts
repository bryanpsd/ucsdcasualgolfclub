import { defineAction } from "astro:actions"
import { contentfulClient } from "../services/contentful/contentful"
import type { TypeResultsSkeleton } from "../types/contentful/TypeResults"

export const getResults = defineAction({
	handler: async () => {
		const headerResultsData =
			await contentfulClient.withoutUnresolvableLinks.getEntries<TypeResultsSkeleton>(
				{
					content_type: "results",
				}
			)

		return headerResultsData.items.map((results) => results.fields)
	},
})
