import { defineAction } from 'astro:actions'
import type { TypeResultsSkeleton } from '../types/contentful/TypeResults'
import { contentfulClient } from '../lib/contentful'

export const getResults = defineAction({
  handler: async () => {
    const headerResultsData =
      await contentfulClient.withoutUnresolvableLinks.getEntries<TypeResultsSkeleton>({
        content_type: 'results',
      })

    return headerResultsData.items.map((results) => results.fields)
  },
})
