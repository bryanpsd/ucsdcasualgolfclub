# Contentful Query Optimizations

## Overview

This document describes the optimizations implemented to improve Contentful API performance and reduce payload sizes.

## Key Improvements

### 1. **Centralized Caching System**

- **File**: `src/utils/contentfulCache.ts`
- **Features**:
  - In-memory cache with configurable TTL (Time To Live)
  - Automatic cache key generation from query parameters
  - Cache expiration handling
  - Simple API for cached queries

**Usage Example**:

```typescript
const data = await contentfulCache.cached(
  async () => contentfulClient.getEntries({...}),
  { content_type: "course", page: "home" },
  10 * 60 * 1000, // 10 minutes TTL
);
```

### 2. **Query Optimizations by File**

#### Pages

- **roster/index.astro**: Added caching, reduced include depth to 2
- **results.astro**: Added caching (10 min), limit 1000, reduced include from 3 to 2
- **about.astro**: Added caching (15 min for static content), limit 1
- **tournaments/index.astro**: Added caching (10 min), include 1, limit 100
- **\_layout/HomePage.astro**: Added caching for all queries (10-15 min), include 2, added limits

#### Components

- **Leaderboard/Leaderboard.astro**: Added caching (10 min), limit 300

#### Actions

- **banners.ts**: Migrated to centralized cache, added limit 50
- **coursePage.ts**: Reduced include depth from 10 to 3, added limit 1
- **results.ts**: Added caching (10 min), limit 1000

#### Utils

- **Header/utils/headerItems.ts**: Added caching (10 min), include 1, limit 100

### 3. **Cache TTL Strategy**

| Content Type                        | TTL    | Reason                                    |
| ----------------------------------- | ------ | ----------------------------------------- |
| Static pages (about)                | 15 min | Content rarely changes                    |
| Dynamic data (tournaments, results) | 10 min | Balance between freshness and performance |
| Banners                             | 5 min  | May need quicker updates                  |
| Menu items                          | 10 min | Changes infrequently                      |

### 4. **Include Depth Reduction**

**Before**: Many queries used `include: 3` or `include: 10` (coursePage)
**After**:

- Most queries: `include: 1-2`
- Course page: `include: 3` (reduced from 10)

**Impact**: Significantly reduced payload size by limiting nested reference resolution.

### 5. **Added Limits**

All queries now have appropriate limits to prevent over-fetching:

- Small datasets: `limit: 1-50`
- Medium datasets: `limit: 100`
- Large datasets: `limit: 300-1000`

## Performance Benefits

1. **Reduced API Calls**:
   - Cached queries prevent redundant API requests
   - Multiple page visits reuse cached data
   - SSR benefits from cache during build/render

2. **Smaller Payloads**:
   - Reduced include depth means less nested data
   - Limits prevent fetching unnecessary entries
   - Faster parsing and serialization

3. **Improved Response Times**:
   - Cache hits return data immediately
   - Reduced network latency
   - Lower Contentful API quota usage

4. **Better Scalability**:
   - Less load on Contentful API
   - Reduced risk of rate limiting
   - Lower bandwidth costs

## Monitoring Recommendations

1. **Cache Hit Rate**: Monitor how often cache is used vs. fresh fetches
2. **Response Times**: Track average query response times
3. **API Quota**: Monitor Contentful API usage to ensure it decreases
4. **Memory Usage**: Watch server memory if cache grows too large

## Future Optimizations

### Short Term

1. Add cache warming for frequently accessed content
2. Implement cache invalidation on Contentful webhooks
3. Add Redis/external cache for multi-instance deployments

### Long Term

1. Consider GraphQL for more precise field selection
2. Implement incremental static regeneration (ISR) for Astro
3. Add service worker caching for client-side performance
4. Implement stale-while-revalidate pattern

## Configuration

### Adjusting Cache TTL

Edit cache TTL values in individual files:

```typescript
contentfulCache.cached(
	queryFn,
	params,
	5 * 60 * 1000, // Change this value (milliseconds)
);
```

### Clearing Cache

Add a utility endpoint if needed:

```typescript
// Example: /api/clear-cache.ts
contentfulCache.clear();
```

### Cache Maintenance

The cache automatically handles expiration. For manual cleanup:

```typescript
contentfulCache.clearExpired(10 * 60 * 1000); // Clear entries older than 10 min
```

## Testing

Before deploying to production:

1. Test all pages to ensure data loads correctly
2. Verify cached data updates after TTL expires
3. Check that nested references resolve properly with reduced include depth
4. Monitor Contentful API quota usage

## Rollback Plan

If issues arise, you can quickly disable caching by replacing:

```typescript
await contentfulCache.cached(...)
```

With direct calls:

```typescript
await contentfulClient.getEntries(...)
```

## Notes

- Contentful's `select` parameter is not used due to TypeScript typing issues
- Instead, we optimize through include depth and caching
- Consider implementing field selection if types are loosened
- All optimizations are backward compatible with existing code
