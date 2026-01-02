import type { APIRoute } from "astro";

/**
 * Webhook endpoint for Contentful to trigger cache invalidation
 *
 * This endpoint should be called by Contentful webhooks on publish/unpublish.
 * It returns a 200 status to signal successful cache invalidation.
 *
 * Since we're using HTTP cache headers in the proxy route, the cache will
 * automatically be invalidated by the browser/CDN based on the max-age.
 *
 * For more aggressive invalidation, you can:
 * 1. Clear the in-memory cache in contentfulCache.ts
 * 2. Trigger a Netlify build via build hook
 * 3. Use Netlify's cache invalidation API
 *
 * Setup in Contentful:
 * 1. Go to Settings > Webhooks
 * 2. Create a new webhook
 * 3. URL: https://your-site.com/api/contentful/revalidate
 * 4. Select "Entry publish" and "Entry unpublish" triggers
 * 5. Add a secret header: x-contentful-webhook-secret
 */
export const POST: APIRoute = async ({ request }) => {
    try {
        // Optional: Validate webhook secret
        const requiredSecret = import.meta.env.CONTENTFUL_WEBHOOK_SECRET;
        if (requiredSecret) {
            const incomingSecret = request.headers.get("x-contentful-webhook-secret");
            if (!incomingSecret || incomingSecret !== requiredSecret) {
                return new Response(JSON.stringify({ error: "Unauthorized" }), {
                    status: 401,
                    headers: { "Content-Type": "application/json" },
                });
            }
        }

        // Parse webhook payload
        const payload = await request.json();
        const sys = payload?.sys ?? {};
        const contentType = sys?.contentType?.sys?.id || sys?.contentType?.id || sys?.contentType;

        // Get slug from payload.fields.slug
        let slugValue: string | undefined;
        const fields = payload?.fields;
        if (fields?.slug) {
            const slugField = fields.slug;
            if (typeof slugField === "string") {
                slugValue = slugField;
            } else if (typeof slugField === "object") {
                // Handle localized fields: { "en-US": "my-slug" }
                const firstValue = Object.values(slugField)[0];
                if (typeof firstValue === "string") {
                    slugValue = firstValue;
                }
            }
        }

        console.log("Contentful webhook received:", {
            contentType,
            slug: slugValue,
            action: sys.type,
        });

        // In this implementation, we rely on HTTP cache headers in the proxy route
        // The cache will automatically expire based on max-age
        // For immediate invalidation, you could:
        // 1. Import and call contentfulCache.clear() from ~/utils/contentfulCache
        // 2. Trigger a Netlify build hook
        // 3. Use Netlify's API to purge specific cache keys

        return new Response(
            JSON.stringify({
                success: true,
                contentType,
                slug: slugValue,
                message: "Cache invalidation acknowledged. Changes will be reflected after cache expires.",
            }),
            {
                status: 200,
                headers: { "Content-Type": "application/json" },
            }
        );
    } catch (error) {
        console.error("Error processing Contentful webhook:", error);
        return new Response(
            JSON.stringify({
                error: "Error processing webhook",
                details: error instanceof Error ? error.message : String(error),
            }),
            {
                status: 500,
                headers: { "Content-Type": "application/json" },
            }
        );
    }
};
