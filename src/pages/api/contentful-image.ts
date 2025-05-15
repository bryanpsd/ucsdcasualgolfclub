import type { APIRoute } from 'astro'

/**
 * Proxy for retrieving images from Contentful. This allows our CDN to be able to cache images
 * so we aren't making as many requests directly to Contentful.
 */
export const GET: APIRoute = async ({ url }) => {
  const contentfulUrl = url.searchParams.get('url')

  if (!contentfulUrl) {
    return new Response(null, { status: 404 })
  }

  // Need to add `https:` because Contentful uses protocol-relative URLs
  // https://www.paulirish.com/2010/the-protocol-relative-url/
  // Use globalThis.fetch for Node.js compatibility
  return globalThis.fetch('https:' + contentfulUrl)
}
