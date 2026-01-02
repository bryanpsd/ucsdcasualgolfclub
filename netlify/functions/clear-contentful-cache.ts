import { Handler } from "@netlify/functions";
import { getStore } from "@netlify/blobs";

const handler: Handler = async () => {
  const store = getStore("contentful-cache");
  try {
    const keysResult = await store.list();
    const keysResultAny = keysResult as any;
    let keys: string[] = [];

    if (keysResultAny && Array.isArray(keysResultAny.items)) {
      keys = keysResultAny.items.map((i: any) => i?.key).filter(Boolean);
    } else if (Array.isArray(keysResultAny)) {
      keys = keysResultAny.map((i: any) => i?.key).filter(Boolean);
    } else if (typeof keysResultAny.keys === "function") {
      const maybeKeys = keysResultAny.keys();
      if (Array.isArray(maybeKeys)) {
        keys = maybeKeys.map((i: any) => i?.key ?? i).filter(Boolean);
      } else if (maybeKeys && typeof maybeKeys[Symbol.iterator] === "function") {
        keys = Array.from(maybeKeys).map((i: any) => i?.key ?? i).filter(Boolean);
      }
    }

    keys = keys.map((k) => String(k));
    if (keys.length > 0) {
      await Promise.all(keys.map((key: string) => store.delete(key)));
    }
    return {
      statusCode: 200,
      body: "Contentful cache cleared.",
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Failed to clear cache.",
    };
  }
};

export { handler };


