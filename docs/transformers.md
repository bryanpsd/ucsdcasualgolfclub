# Contentful Data Transformation Utilities

## Overview

The `contentfulTransformers.ts` module provides centralized, reusable utilities for transforming and normalizing data from Contentful API responses. These utilities eliminate code duplication and establish consistent data transformation patterns across the application.

## Benefits

- **Code Reusability**: Transform data once, use everywhere
- **Type Safety**: Proper TypeScript types with null handling
- **Maintainability**: Single source of truth for transformations
- **Consistency**: Uniform data structures across the app
- **Testability**: Pure functions easy to unit test

## Core Utilities

### Field Extraction

#### `extractFields<T>(entry: unknown): T | null`

Safely extracts fields from Contentful entry objects, handling both full Entry objects and plain field objects.

```typescript
const fields = extractFields<{ title?: string }>(contentfulEntry);
```

### Date Handling

#### `parseContentfulDate(dateString: string | undefined | null): string | null`

Validates and parses date strings, returning ISO format or null for invalid dates.

```typescript
const isoDate = parseContentfulDate(entry.fields.date); // "2025-11-21T00:00:00.000Z"
```

#### `getLatestUpdatedDate<T>(entries: T[]): number`

Finds the most recent update timestamp from an array of Contentful entries.

```typescript
const lastUpdate = getLatestUpdatedDate(entries.items); // 1732204800000
```

### Course & Tournament Data

#### `extractCourseInfo(courseEntry: unknown)`

Extracts normalized course information with name and slug.

```typescript
const course = extractCourseInfo(result.fields.course);
// { name: "Torrey Pines", slug: "torrey-pines" }
```

#### `transformResultEntry(result: unknown)`

Transforms tournament result entries into normalized format with scores, dates, and achievements.

```typescript
const result = transformResultEntry(rawResult);
// { title, date, gross, net, flight, courseHandicap, putts, closestTo, longDrive, course }
```

#### `generateSlugWithYear(fields: TypeCourseProps): string`

Generates slugs with tournament year prefix from first tournament date.

```typescript
const slug = generateSlugWithYear(courseFields);
// "/2025/torrey-pines"
```

#### `filterUpcomingTournaments(entries, cutoffDate: Date)`

Filters and sorts tournaments occurring after a cutoff date.

```typescript
const upcoming = filterUpcomingTournaments(entries.items, new Date("2025-12-05"));
```

### Player & Roster Data

#### `transformPlayerResults(entries)`

Transforms player data with results, filtering out "Unknown Player" entries.

```typescript
const players = transformPlayerResults(entries.items);
// [{ playerName: "John Doe", results: [...] }]
```

#### `transformRosterPlayers(entries)`

Filters and sorts roster players by handicap index, excluding guests.

```typescript
const roster = transformRosterPlayers(entries.items);
// Sorted by handicap: lowest to highest
```

### Leaderboard Data

#### `filterLeaderboardEntries(entries, options)`

Filters leaderboard entries by gross/net scoring and flight designation.

```typescript
const leaders = filterLeaderboardEntries(entries.items, {
	gross: true,
	firstFlight: true,
});
```

#### `sortByScore<T>(entries: T[], field: "gross" | "net"): T[]`

Sorts entries by score in ascending order.

```typescript
const sorted = sortByScore(entries, "gross");
```

#### `formatLeaderboardRows(rows: [string, number][]): string[][]`

Formats leaderboard data for Table component display.

```typescript
const tableData = formatLeaderboardRows(leaderboardRows);
```

### Image Utilities

#### `isContentfulImage(src: string): boolean`

Checks if a URL is from Contentful's image service.

```typescript
if (isContentfulImage(src)) {
	// Apply optimization
}
```

#### `getContentfulProxyUrl(src: string, format: string): string`

Generates optimized proxy URLs for Contentful images with format parameters.

```typescript
const avifUrl = getContentfulProxyUrl(src, "avif");
```

## Usage Examples

### Results Page Transformation

**Before:**

```typescript
const players = entries.items
	.map((entry) => ({
		playerName: entry.fields.playerName || "Unknown Player",
		results:
			entry.fields.results?.map((result) => ({
				title: "fields" in result ? (result.fields?.title ?? null) : null,
				date:
					"fields" in result && result.fields?.date
						? Number.isNaN(Date.parse(result.fields.date))
							? null
							: new Date(result.fields.date).toISOString()
						: null,
				// ... 30+ more lines
			})) ?? [],
	}))
	.filter((player) => player.playerName !== "Unknown Player");
```

**After:**

```typescript
import { transformPlayerResults } from "~/utils/contentfulTransformers";

const players = transformPlayerResults(entries.items);
```

### Leaderboard Filtering

**Before:**

```typescript
const rows = entries.items
  .filter((item) => item.fields.onCurrentRoster)
  .map((item) => {
    if (gross && item.fields.roundsCheck && item.fields.gross !== undefined) {
      return [item.fields.playerName, item.fields.gross];
    } else if (/* complex conditions */) {
      return [item.fields.playerName, item.fields.net];
    }
    // ... more logic
  })
  .filter((row) => row !== undefined)
  .sort((a, b) => Number(a[1]) - Number(b[1]));
```

**After:**

```typescript
import { filterLeaderboardEntries, formatLeaderboardRows } from "~/utils/contentfulTransformers";

const rows = filterLeaderboardEntries(entries.items, { gross, net, firstFlight });
const tableData = formatLeaderboardRows(rows);
```

### Tournament Filtering

**Before:**

```typescript
const getTournaments = entries.items
	.flatMap((item) => {
		return item.fields.tournaments?.map((tournament) => {
			if (
				tournament &&
				"fields" in tournament &&
				tournament.fields.date &&
				new Date(tournament.fields.date) > cutoffDate
			) {
				return {
					...item.fields,
					tournaments: [
						{
							// ... manual field extraction
						},
					],
				};
			}
			return null;
		});
	})
	.filter(Boolean)
	.sort(/* manual date sorting */);
```

**After:**

```typescript
import { filterUpcomingTournaments } from "~/utils/contentfulTransformers";

const getTournaments = filterUpcomingTournaments(entries.items, cutoffDate);
```

## Files Refactored

### Pages

- ✅ `src/pages/results.astro` - Player results transformation
- ✅ `src/pages/roster/index.astro` - Roster player filtering and sorting
- ✅ `src/pages/tournaments/index.astro` - Tournament filtering and sorting

### Components

- ✅ `src/components/Leaderboard/Leaderboard.astro` - Leaderboard data filtering
- ✅ `src/components/Image/ContentfulImage.tsx` - Image URL optimization

### Actions

- ✅ `src/actions/coursePage.ts` - Slug generation with year
- ✅ `src/actions/banners.ts` - Banner field mapping

## Code Quality Improvements

| Metric                      | Before          | After             | Improvement            |
| --------------------------- | --------------- | ----------------- | ---------------------- |
| Lines of Code (transformed) | ~200            | ~50               | 75% reduction          |
| Duplication                 | High            | None              | 100% reduction         |
| Type Safety                 | Manual guards   | Utility functions | Better                 |
| Maintainability             | Scattered logic | Centralized       | Significantly improved |

## Best Practices

1. **Use Type Guards**: Utilities include proper null/undefined checks
2. **Immutable Operations**: All transformations return new data structures
3. **Composable Functions**: Small, focused utilities that work together
4. **Consistent Naming**: Clear, descriptive function names
5. **Documentation**: Every function has JSDoc comments

## Future Enhancements

Potential additions to consider:

- Caching transformation results
- Adding validation utilities
- Performance profiling helpers
- Error handling wrappers
- Data aggregation utilities

## Testing

These pure functions are ideal candidates for unit testing:

```typescript
// Example test
import { parseContentfulDate } from "~/utils/contentfulTransformers";

expect(parseContentfulDate("2025-11-21")).toBe("2025-11-21T00:00:00.000Z");
expect(parseContentfulDate("invalid")).toBe(null);
expect(parseContentfulDate(null)).toBe(null);
```
