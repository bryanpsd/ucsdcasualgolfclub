import { defineAction } from 'astro:actions'
import { contentfulClient } from '../services/contentful/contentful'
import type { TypeBannerSkeleton } from '../types/contentful/TypeBanner'

export const getHeaderBanners = defineAction({
	handler: async () => {
		const headerBannerData =
			await contentfulClient.withoutUnresolvableLinks.getEntries<TypeBannerSkeleton>(
				{
					content_type: 'banner',
				}
			)

		return headerBannerData.items.map((banner) => banner.fields)
	},
})
