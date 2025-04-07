import { defineAction } from 'astro:actions';
import type { TypeBannerSkeleton } from '../types/contentful/TypeBanner';
import { contentfulClient } from '../lib/contentful';

export const getHeaderBanners = defineAction({
  handler: async () => {
    const headerBannerData =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeBannerSkeleton>(
        {
          content_type: 'banner',
        }
      );

    return headerBannerData.items.map((banner) => banner.fields);
  },
});
