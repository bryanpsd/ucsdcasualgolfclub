/**
 * Simple in-memory cache for Contentful queries
 * Reduces API calls and improves performance
 */

interface CacheEntry<T> {
	data: T;
	timestamp: number;
}

class ContentfulCache {
	private cache = new Map<string, CacheEntry<unknown>>();
	private defaultTTL = 5 * 60 * 1000; // 5 minutes default

	/**
	 * Generate a cache key from query parameters
	 */
	private generateKey(params: Record<string, unknown>): string {
		return JSON.stringify(params);
	}

	/**
	 * Get cached data if available and not expired
	 */
	get<T>(key: string, ttl?: number): T | null {
		const entry = this.cache.get(key) as CacheEntry<T> | undefined;
		if (!entry) return null;

		const maxAge = ttl ?? this.defaultTTL;
		const age = Date.now() - entry.timestamp;

		if (age > maxAge) {
			this.cache.delete(key);
			return null;
		}

		return entry.data;
	}

	/**
	 * Set cached data
	 */
	set<T>(key: string, data: T): void {
		this.cache.set(key, {
			data,
			timestamp: Date.now(),
		});
	}

	/**
	 * Execute a query with caching
	 */
	async cached<T>(
		queryFn: () => Promise<T>,
		params: Record<string, unknown>,
		ttl?: number,
	): Promise<T> {
		const key = this.generateKey(params);
		const cached = this.get<T>(key, ttl);

		if (cached !== null) {
			return cached;
		}

		const data = await queryFn();
		this.set(key, data);
		return data;
	}

	/**
	 * Clear all cache
	 */
	clear(): void {
		this.cache.clear();
	}

	/**
	 * Clear expired entries
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

export const contentfulCache = new ContentfulCache();
