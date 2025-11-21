import { defineAction } from "astro:actions";
import { contentfulClient } from "../services/contentful/contentful";
import type { TypeBannerSkeleton } from "../types/contentful/TypeBanner";

let cachedBanners: ReturnType<typeof mapBannerFields> | null = null;
let cacheTime = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

function mapBannerFields(
	data: Awaited<
		ReturnType<typeof contentfulClient.withoutUnresolvableLinks.getEntries<TypeBannerSkeleton>>
	>,
) {
	return data.items.map((banner) => banner.fields);
}

export const getHeaderBanners = defineAction({
	handler: async () => {
		const now = Date.now();

		if (cachedBanners && now - cacheTime < CACHE_TTL) {
			return cachedBanners;
		}

		const headerBannerData =
			await contentfulClient.withoutUnresolvableLinks.getEntries<TypeBannerSkeleton>({
				content_type: "banner",
			});

		cachedBanners = mapBannerFields(headerBannerData);
		cacheTime = now;

		return cachedBanners;
	},
});
