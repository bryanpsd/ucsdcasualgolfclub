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
	private defaultTTL = 5 * 60 * 1000; // 5 minutes default
	private persistentStorage?: PersistentStorage;

	/**
	 * Initialize with optional persistent storage backend
	 * Can be Netlify Blobs, Redis, or filesystem
	 */
	constructor(storage?: PersistentStorage) {
		this.persistentStorage = storage;
	}

	/**
	 * Generate a cache key from query parameters
	 */
	private generateKey(params: Record<string, unknown>): string {
		return makeCacheKey(params);
	}

	/**
	 * Try to load from persistent storage if available
	 */
	private async loadFromPersistent<T>(key: string, ttl: number): Promise<T | null> {
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
	 */
	private async saveToPersistent<T>(key: string, data: T): Promise<void> {
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

// Initialize with Netlify Blobs storage if available (server-side only)
let storage: PersistentStorage | undefined;

if (typeof process !== "undefined" && import.meta.env.PROD) {
	try {
		// Netlify Blobs storage adapter
		const { getStore } = await import("@netlify/blobs");
		const store = getStore("contentful-cache");

		storage = {
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
	}
}

export const contentfulCache = new ContentfulCache(storage);

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
