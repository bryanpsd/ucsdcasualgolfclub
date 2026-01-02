# Contentful Proxy Architecture

This document explains the proxy-based architecture for Contentful content delivery implemented in this project.

## Overview

Instead of making direct requests to Contentful's API, all Contentful requests are routed through a local API proxy. This provides better caching control, centralized authentication, and webhook-based cache invalidation.

## Architecture Diagram

```
┌─────────────────┐
│   Astro Pages   │
│   & Components  │
└────────┬────────┘
         │
         │ contentfulClient.getEntries()
         ▼
┌─────────────────┐
│ Contentful      │
│ Client SDK      │
└────────┬────────┘
         │
         │ Configure with local basePath
         ▼
┌─────────────────────────────────────┐
│  /api/contentful/[...path]          │
│  (Local Proxy API Route)            │
│                                     │
│  • Switches preview/delivery APIs   │
│  • Adds HTTP cache headers          │
│  • Handles authentication           │
│  • 10s cache (preview)              │
│  • 1 hour cache (production)        │
└────────┬────────────────────────────┘
         │
         │ Forward to Contentful
         ▼
┌─────────────────────────────────────┐
│  Contentful API                     │
│  (preview.contentful.com or         │
│   cdn.contentful.com)               │
└─────────────────────────────────────┘

         ▲
         │ Webhook on publish/unpublish
         │
┌─────────────────────────────────────┐
│  /api/contentful/revalidate         │
│  (Webhook Handler)                  │
│                                     │
│  • Validates webhook secret         │
│  • Logs cache invalidation          │
│  • Returns success response         │
└─────────────────────────────────────┘
```

## Key Components

### 1. Contentful Client (`src/services/contentful/contentful.ts`)

Configured to use the local proxy instead of direct Contentful access:

```typescript
const clientConfig = {
	space: CONTENTFUL_SPACE_ID,
	accessToken: "proxy", // Dummy token, proxy handles auth
	host: "localhost:4321", // Or production domain
	basePath: "/api/contentful", // Local API route
	insecure: true, // For localhost
};
```

### 2. Proxy API Route (`src/pages/api/contentful/[...path].ts`)

Intercepts all Contentful requests and:

- Switches between preview and delivery APIs based on `CONTENTFUL_USE_PREVIEW`
- Adds HTTP cache headers (`Cache-Control: max-age=...`)
- Forwards authentication to Contentful
- Returns responses with appropriate cache directives

**Cache Strategy:**

- **Preview mode**: `max-age=10` (10 seconds) - See changes quickly during development
- **Production mode**: `max-age=3600` (1 hour) - Efficient caching for published content

### 3. Webhook Handler (`src/pages/api/contentful/revalidate.ts`)

Receives webhooks from Contentful when content is published/unpublished:

- Validates webhook secret for security
- Logs the content type and slug being updated
- Returns success response

**Note**: Since we use HTTP cache headers, the cache will automatically expire. For immediate invalidation, you can extend this endpoint to:

1. Clear the in-memory cache (`contentfulCache.clear()`)
2. Trigger a Netlify build via build hook
3. Use Netlify's cache API to purge specific keys

### 4. Content Cache (`src/utils/contentfulCache.ts`)

Provides in-memory and persistent caching:

- **Preview mode**: 10-second TTL, no persistent storage
- **Production mode**: 5-minute TTL, Netlify Blobs for persistence

Works alongside HTTP caching for optimal performance.

## Benefits

### 1. **Instant Content Updates (with Webhooks)**

- Set up Contentful webhook to call `/api/contentful/revalidate`
- Changes are reflected immediately after webhook triggers
- No manual cache clearing or server restarts needed

### 2. **Smart Caching**

- Preview mode: 10-second cache for quick iteration
- Production mode: 1-hour cache for performance
- Browser/CDN automatically respects cache headers

### 3. **Centralized Authentication**

- Contentful tokens stay on the server
- No token exposure in client-side code
- Single place to manage API credentials

### 4. **Environment Flexibility**

- Easy switching between preview and delivery APIs
- Single environment variable controls mode
- No code changes needed

### 5. **Better Debugging**

- All requests go through one route
- Easy to add logging, monitoring, or error handling
- Clear separation between app and CMS

## Setup Instructions

### 1. Environment Variables

Add to your `.env`:

```bash
CONTENTFUL_SPACE_ID="your-space-id"
CONTENTFUL_ENVIRONMENT_ID="master"
CONTENTFUL_DELIVERY_TOKEN="your-delivery-token"
CONTENTFUL_PREVIEW_TOKEN="your-preview-token"
CONTENTFUL_USE_PREVIEW=true
CONTENTFUL_WEBHOOK_SECRET="your-webhook-secret"
```

### 2. Contentful Webhook Configuration

1. Go to Contentful → **Settings** → **Webhooks**
2. Create new webhook:
   - **URL**: `https://your-site.netlify.app/api/contentful/revalidate`
   - **Triggers**: Entry publish, Entry unpublish
   - **Headers**: `x-contentful-webhook-secret: your-webhook-secret`
3. Test the webhook to ensure it reaches your endpoint

### 3. Development Workflow

**Preview mode (see draft content):**

```bash
# Set CONTENTFUL_USE_PREVIEW=true in .env
pnpm dev:preview
```

**Production mode (published content only):**

```bash
# Set CONTENTFUL_USE_PREVIEW=false in .env
pnpm dev
```

**See changes:**

- In preview mode: Wait up to 10 seconds
- In production mode: Wait up to 1 hour OR trigger webhook

## Comparison with Direct Access

| Feature                   | Direct Access         | Proxy Architecture    |
| ------------------------- | --------------------- | --------------------- |
| **Cache Control**         | Client-side only      | Server + Client + CDN |
| **Webhook Support**       | Manual implementation | Built-in endpoint     |
| **Token Security**        | Exposed in client     | Server-only           |
| **Environment Switching** | Manual config         | Single env var        |
| **Cache Invalidation**    | Manual/complex        | Automatic via webhook |
| **Debugging**             | Multiple endpoints    | Single proxy route    |

## Future Enhancements

### 1. Aggressive Cache Invalidation

Extend the webhook handler to:

```typescript
// Clear in-memory cache
import { contentfulCache } from "~/utils/contentfulCache";
contentfulCache.clear();

// Trigger Netlify build
await fetch(process.env.NETLIFY_BUILD_HOOK, { method: "POST" });
```

### 2. Granular Cache Keys

Use content type + slug for selective invalidation:

```typescript
const cacheKey = `${contentType}:${slug}`;
// Only invalidate specific entries
```

### 3. CDN Cache Purging

Use Netlify's API to purge specific pages:

```typescript
await fetch(`https://api.netlify.com/api/v1/sites/${siteId}/purge`, {
	method: "POST",
	headers: { Authorization: `Bearer ${token}` },
	body: JSON.stringify({ cache_tags: [cacheKey] }),
});
```

### 4. Stale-While-Revalidate

Add SWR caching for better UX:

```typescript
headers.set("Cache-Control", "max-age=3600, stale-while-revalidate=86400");
```

## Troubleshooting

### Changes not appearing

1. **Check cache TTL**: Wait for cache to expire (10s in preview, 1 hour in production)
2. **Verify webhook**: Check Contentful webhook logs for delivery status
3. **Check environment**: Ensure `CONTENTFUL_USE_PREVIEW` is set correctly
4. **Restart dev server**: Sometimes needed for environment variable changes

### Webhook not working

1. **Check secret**: Ensure `CONTENTFUL_WEBHOOK_SECRET` matches webhook header
2. **Check URL**: Verify webhook URL is correct (https, not http)
3. **Check logs**: Look at Netlify function logs for errors
4. **Test webhook**: Use Contentful's webhook test feature

### Performance issues

1. **Increase cache TTL**: Adjust `cacheMaxAge` in proxy route
2. **Add persistent cache**: Extend Netlify Blobs usage
3. **Add CDN caching**: Use Netlify's CDN cache headers
4. **Optimize queries**: Reduce number of `getEntries()` calls

## References

- [Contentful Delivery API](https://www.contentful.com/developers/docs/references/content-delivery-api/)
- [Contentful Preview API](https://www.contentful.com/developers/docs/references/content-preview-api/)
- [Contentful Webhooks](https://www.contentful.com/developers/docs/webhooks/)
- [Astro API Routes](https://docs.astro.build/en/core-concepts/endpoints/)
- [HTTP Caching](https://developer.mozilla.org/en-US/docs/Web/HTTP/Caching)
