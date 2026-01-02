/**
 * Enhanced cache for Contentful queries with persistent storage support
 * Reduces API calls and improves performance across server restarts
 */

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

interface PersistentStorage {
	get(key: string): Promise<string | null> | string | null;
	set(key: string, value: string): Promise<void> | void;
}

class ContentfulCache {
	private cache = new Map<string, CacheEntry<unknown>>();
	private defaultTTL: number;
	private persistentStorage?: PersistentStorage;
	private previewMode: boolean;

	/**
	 * Initialize with optional persistent storage backend
	 * Can be Netlify Blobs, Redis, or filesystem
	 */
	constructor(storage?: PersistentStorage, previewMode = false) {
		this.persistentStorage = storage;
		this.previewMode = previewMode;

		// In preview mode (dev with draft content), use 10 second cache or disable
		// In production, use 5 minute cache
		if (previewMode) {
			this.defaultTTL = 10 * 1000; // 10 seconds in preview mode
		} else {
			this.defaultTTL = 5 * 60 * 1000; // 5 minutes in production
		}
	}

	/**
	 * Generate a cache key from query parameters
	 */
	private generateKey(params: Record<string, unknown>): string {
		return makeCacheKey(params);
	}

	/**
	 * Try to load from persistent storage if available
	 * Skip persistent storage in preview mode for fresh content
	 */
	private async loadFromPersistent<T>(key: string, ttl: number): Promise<T | null> {
		if (this.previewMode) return null;

		// Lazily initialize storage if not set
		if (!this.persistentStorage) {
			this.persistentStorage = await getStorage();
		}

		if (!this.persistentStorage) return null;

		try {
			const stored = await this.persistentStorage.get(key);
			if (!stored) return null;

			const entry = JSON.parse(stored) as CacheEntry<T>;
			const age = Date.now() - entry.timestamp;

			if (age > ttl) return null;

			// Load into memory cache for faster subsequent access
			this.cache.set(key, entry);
			return entry.data;
		} catch {
			return null;
		}
	}

	/**
	 * Save to persistent storage if available
	 * Skip in preview mode to avoid caching draft content
	 */
	private async saveToPersistent<T>(key: string, data: T): Promise<void> {
		if (this.previewMode) return;

		// Lazily initialize storage if not set
		if (!this.persistentStorage) {
			this.persistentStorage = await getStorage();
		}

		if (!this.persistentStorage) return;

		try {
			const entry: CacheEntry<T> = {
				data,
				timestamp: Date.now(),
			};
			await this.persistentStorage.set(key, JSON.stringify(entry));
		} catch {
			// Silently fail - persistent storage is optional
		}
	}

	/**
	 * Get cached data if available and not expired
	 */
	async get<T>(key: string, ttl?: number): Promise<T | null> {
		// Try memory cache first
		const entry = this.cache.get(key) as CacheEntry<T> | undefined;
		if (entry) {
			const maxAge = ttl ?? this.defaultTTL;
			const age = Date.now() - entry.timestamp;

			if (age <= maxAge) {
				return entry.data;
			}

			this.cache.delete(key);
		}

		// Try persistent storage
		return await this.loadFromPersistent<T>(key, ttl ?? this.defaultTTL);
	}

	/**
	 * Set cached data in both memory and persistent storage
	 */
	async set<T>(key: string, data: T): Promise<void> {
		const entry: CacheEntry<T> = {
			data,
			timestamp: Date.now(),
		};
		this.cache.set(key, entry);
		await this.saveToPersistent(key, data);
	}

	/**
	 * Execute a query with caching (checks both memory and persistent storage)
	 */
	async cached<T>(
		queryFn: () => Promise<T>,
		params: Record<string, unknown>,
		ttl?: number,
	): Promise<T> {
		const key = this.generateKey(params);
		const cached = await this.get<T>(key, ttl);

		if (cached !== null) {
			return cached;
		}

		const data = await queryFn();
		await this.set(key, data);
		return data;
	}

	/**
	 * Clear all cache (memory only)
	 */
	clear(): void {
		this.cache.clear();
	}

	/**
	 * Clear expired entries from memory cache
	 */
	clearExpired(ttl?: number): void {
		const maxAge = ttl ?? this.defaultTTL;
		const now = Date.now();

		for (const [key, entry] of this.cache.entries()) {
			if (now - entry.timestamp > maxAge) {
				this.cache.delete(key);
			}
		}
	}
}

// Check if we're in preview mode
const isPreviewMode =
	process.env.CONTENTFUL_USE_PREVIEW === "true" || process.env.CONTENTFUL_USE_PREVIEW === "true";

// Lazy initialization function for Netlify Blobs storage
let storagePromise: Promise<PersistentStorage | undefined> | undefined;

async function getStorage(): Promise<PersistentStorage | undefined> {
	if (!storagePromise) {
		storagePromise = (async () => {
			// Don't use persistent storage in preview mode
			if (
				typeof process !== "undefined" &&
				process.env.NODE_ENV === "production" &&
				!isPreviewMode
			) {
				try {
					// Netlify Blobs storage adapter
					const { getStore } = await import("@netlify/blobs");
					const store = getStore("contentful-cache");

					return {
						async get(key: string) {
							try {
								return await store.get(key, { type: "text" });
							} catch {
								return null;
							}
						},
						async set(key: string, value: string) {
							try {
								await store.set(key, value);
							} catch {
								// Silently fail
							}
						},
					};
				} catch {
					// Netlify Blobs not available
					return undefined;
				}
			}
			return undefined;
		})();
	}
	return storagePromise;
}

export const contentfulCache = new ContentfulCache(undefined, isPreviewMode);

// Stable stringify that sorts object keys so cache keys are deterministic
function sortObject<T>(value: T): T {
	if (Array.isArray(value)) {
		return value.map((v) => sortObject(v)) as unknown as T;
	}

	if (value && typeof value === "object") {
		const obj = value as Record<string, unknown>;
		const sorted: Record<string, unknown> = {};
		Object.keys(obj)
			.sort()
			.forEach((key) => {
				// cast through unknown to avoid using `any`
				sorted[key] = sortObject(obj[key] as unknown);
			});
		return sorted as T;
	}

	return value;
}

export function makeCacheKey(params: Record<string, unknown>): string {
	return JSON.stringify(sortObject(params));
}

export function makePageKey(content_type: string, slug: string) {
	return makeCacheKey({ content_type, slug });
}

export function makeListKey(content_type: string) {
	return makeCacheKey({ content_type });
}
