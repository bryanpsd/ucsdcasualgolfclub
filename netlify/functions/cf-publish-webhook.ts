import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";
import { makePageKey, makeListKey } from "../../src/utils/contentfulCache";

// This function is intended to be called by Contentful webhooks on publish/unpublish.
// Behavior:
// - If CONTENTFUL_WEBHOOK_SECRET is set in Netlify env, the function expects the
//   incoming request to include header `x-cf-webhook-secret` with the same value.
// - It clears keys from the `contentful-cache` blob store and then triggers the
//   Netlify build hook (if NETLIFY_BUILD_HOOK is set in env).

const handler: Handler = async (event) => {
  try {
    // Optional secret validation
    const requiredSecret = process.env.CONTENTFUL_WEBHOOK_SECRET;
    if (requiredSecret) {
      const incoming = (event.headers && (event.headers["x-cf-webhook-secret"] || event.headers["x-contentful-webhook-secret"])) as string | undefined;
      if (!incoming || incoming !== requiredSecret) {
        return { statusCode: 401, body: "unauthorized" };
      }
    }

    const store = getStore("contentful-cache");

    // Read the list result and normalize keys for deletion. The @netlify/blobs
    // list() result shape can vary depending on version; handle common shapes.
    // Try targeted invalidation using the Contentful webhook payload
    const bodyStr = event.body ?? "";
    let payload: any = {};
    try {
      payload = bodyStr ? JSON.parse(bodyStr) : {};
    } catch (e) {
      payload = {};
    }

    const sys = payload?.sys ?? {};
    const contentType = sys?.contentType?.sys?.id || sys?.contentType?.id || sys?.contentType;

    // Get slug from payload.fields.slug — handle localized shapes
    let slugValue: string | undefined;
    const fields = payload?.fields;
    if (fields && fields.slug) {
      const slugField = fields.slug;
      if (typeof slugField === "string") {
        slugValue = slugField;
      } else if (typeof slugField === "object") {
        // slugField might be { "en-US": "my-slug" } or { "en-US": {"value": "my-slug"} }
        const first = Object.values(slugField)[0];
        if (typeof first === "string") slugValue = first;
        else if (first && typeof first === "object") slugValue = Object.values(first)[0];
      }
    }

    // Track how many keys we deleted
    let clearedCount = 0;

    // If we have contentType and slug, delete specific keys used by contentfulCache
    if (contentType && slugValue) {
      try {
        const pageKey = makePageKey(contentType, slugValue);
        const listKey = makeListKey(contentType);
        const results = await Promise.all([
          store.delete(pageKey).then(() => 1).catch(() => 0),
          store.delete(listKey).then(() => 1).catch(() => 0),
        ]);
        clearedCount = results.reduce((a: number, b: number) => a + b, 0);
      } catch (e) {
        // if anything fails, we'll fall back to full clear below
      }
    } else {
      // Fallback: delete everything (safe, slower)
      const listResult = await store.list();
      const anyResult = listResult as any;
      let keys: string[] = [];

      if (anyResult && Array.isArray(anyResult.items)) {
        keys = anyResult.items.map((i: any) => i?.key).filter(Boolean);
      } else if (Array.isArray(anyResult)) {
        keys = anyResult.map((i: any) => i?.key).filter(Boolean);
      } else if (typeof anyResult.keys === "function") {
        try {
          const maybe = anyResult.keys();
          if (Array.isArray(maybe)) {
            keys = maybe.map((i: any) => i?.key ?? i).filter(Boolean);
          } else if (maybe && typeof maybe[Symbol.iterator] === "function") {
            keys = Array.from(maybe).map((i: any) => i?.key ?? i).filter(Boolean);
          }
        } catch (e) {
          // ignore
        }
      }

      keys = keys.map((k) => String(k));
      if (keys.length > 0) {
        const results = await Promise.all(keys.map((k) => store.delete(k).then(() => 1).catch(() => 0)));
        clearedCount = results.reduce((a: number, b: number) => a + b, 0);
      }
    }

    // Trigger Netlify build hook if configured
    const buildHook = process.env.NETLIFY_BUILD_HOOK;
    const netlifyApiToken = process.env.NETLIFY_API_TOKEN;
    const netlifySiteId = process.env.NETLIFY_SITE_ID;
    let triggeredBuild = false;
    let deployResult: any = null;

    if (buildHook) {
      triggeredBuild = true;
      // Record time before triggering so we can identify the new deploy
      const beforeTrigger = new Date().toISOString();
      await fetch(buildHook, { method: "POST" });

      // If API token + site id are available, poll Netlify for the resulting deploy
      if (netlifyApiToken && netlifySiteId) {
        const timeoutMs = 10 * 60 * 1000; // 10 minutes
        const pollInterval = 5000; // 5s
        const start = Date.now();

        async function getLatestDeployAfter() {
          const res = await fetch(`https://api.netlify.com/api/v1/sites/${netlifySiteId}/deploys`, {
            headers: { Authorization: `Bearer ${netlifyApiToken}` },
          });
          if (!res.ok) return null;
          const list = await res.json();
          if (!Array.isArray(list)) return null;
          // Find the first deploy created after our trigger time (newest first)
          for (const d of list) {
            if (!d || !d.created_at) continue;
            if (new Date(d.created_at) >= new Date(beforeTrigger)) return d;
          }
          return null;
        }

        // Wait for a deploy to appear, then wait for it to finish
        let deploy: any = null;
        while (Date.now() - start < timeoutMs) {
          deploy = await getLatestDeployAfter();
          if (deploy) break;
          await new Promise((r) => setTimeout(r, pollInterval));
        }

        if (deploy) {
          // Poll the deploy status until ready/error
          const deployId = deploy.id;
          while (Date.now() - start < timeoutMs) {
            const r = await fetch(`https://api.netlify.com/api/v1/deploys/${deployId}`, {
              headers: { Authorization: `Bearer ${netlifyApiToken}` },
            });
            if (!r.ok) break;
            const info = await r.json();
            deployResult = info;
            if (info.state === "ready" || info.state === "error" || info.state === "failed") break;
            await new Promise((r) => setTimeout(r, pollInterval));
          }
        }
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ cleared: clearedCount, triggeredBuild, deploy: deployResult }),
    };
  } catch (err) {
    return { statusCode: 500, body: String(err) };
  }
};

export { handler };
