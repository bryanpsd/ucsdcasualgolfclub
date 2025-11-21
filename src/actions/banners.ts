import { defineAction } from "astro:actions";
import { contentfulClient } from "../services/contentful/contentful";
import type { TypeBannerSkeleton } from "../types/contentful/TypeBanner";
import { contentfulCache } from "../utils/contentfulCache";

function mapBannerFields(
	data: Awaited<
		ReturnType<typeof contentfulClient.withoutUnresolvableLinks.getEntries<TypeBannerSkeleton>>
	>,
) {
	return data.items.map((banner) => banner.fields);
}

export const getHeaderBanners = defineAction({
	handler: async () => {
		const data = await contentfulCache.cached(
			async () =>
				contentfulClient.withoutUnresolvableLinks.getEntries<TypeBannerSkeleton>({
					content_type: "banner",
					limit: 50,
				}),
			{ content_type: "banner" },
			5 * 60 * 1000, // 5 minutes cache
		);

		return mapBannerFields(data);
	},
});
