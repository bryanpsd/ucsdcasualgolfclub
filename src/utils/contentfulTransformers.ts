/**
 * Contentful Data Transformation Utilities
 *
 * Centralized utilities for transforming and normalizing Contentful API responses.
 * These functions handle common patterns like field extraction, date parsing, and
 * nested data mapping across the application.
 */

import type { TypeCourseProps } from "~/types/contentful";

/**
 * Safely extracts fields from a Contentful entry-like object.
 * Handles both full Entry objects and plain field objects.
 */
export function extractFields<T>(entry: unknown): T | null {
	if (!entry || typeof entry !== "object") return null;
	if ("fields" in entry) return (entry.fields as T) || null;
	return entry as T;
}

/**
 * Validates and parses a date string, returning ISO string or null.
 * Handles invalid dates gracefully.
 */
export function parseContentfulDate(dateString: string | undefined | null): string | null {
	if (!dateString) return null;
	if (Number.isNaN(Date.parse(dateString))) return null;
	return new Date(dateString).toISOString();
}

/**
 * Finds the most recent update date from an array of Contentful entries.
 * Returns timestamp in milliseconds.
 */
export function getLatestUpdatedDate<T extends { sys: { updatedAt: string } }>(
	entries: T[],
): number {
	return entries.reduce((latest, item) => {
		const updatedAt = new Date(item.sys.updatedAt).getTime();
		return updatedAt > latest ? updatedAt : latest;
	}, 0);
}

/**
 * Extracts course information from a Contentful result entry.
 * Returns a normalized course object with name and slug.
 */
export function extractCourseInfo(courseEntry: unknown): {
	name: string;
	slug: string;
} | null {
	if (!courseEntry || typeof courseEntry !== "object") return null;
	if (!("fields" in courseEntry)) return null;

	const fields = courseEntry.fields as Record<string, unknown>;
	return {
		name: (fields.courseName as string) || "Unknown Course",
		slug: (fields.slug as string) || "unknown-course",
	};
}

/**
 * Transforms a tournament result entry into a normalized format.
 * Extracts all relevant fields including course info, scores, and special achievements.
 */
export function transformResultEntry(result: unknown) {
	const fields = extractFields<{
		title?: string;
		date?: string;
		gross?: number;
		flight?: string;
		courseHandicap?: number;
		net?: number;
		putts?: number;
		closestTo?: string[];
		longDrive?: "F" | "M" | "B";
		course?: unknown;
	}>(result);

	if (!fields) return null;

	return {
		title: fields.title ?? null,
		date: parseContentfulDate(fields.date),
		gross: fields.gross ?? null,
		flight: (fields.flight as "First Flight" | "Second Flight" | null) ?? null,
		courseHandicap: fields.courseHandicap ?? null,
		net: fields.net ?? null,
		putts: fields.putts ?? null,
		closestTo: fields.closestTo ?? null,
		longDrive: fields.longDrive ?? null,
		course: extractCourseInfo(fields.course),
	};
}

/**
 * Transforms player data with results from Contentful leaders entries.
 * Filters out "Unknown Player" entries and normalizes all result data.
 */
export function transformPlayerResults(
	entries: Array<{
		fields: {
			playerName?: string;
			results?: unknown[];
			handicapIndex?: number;
			gross?: number;
			net?: number;
			flight?: "First Flight" | "Second Flight";
			onCurrentRoster?: boolean;
		};
	}>,
) {
	return entries
		.map((entry) => ({
			playerName: entry.fields.playerName || "Unknown Player",
			results: (entry.fields.results || [])
				.map(transformResultEntry)
				.filter((result): result is NonNullable<typeof result> => result !== null),
			handicapIndex: entry.fields.handicapIndex,
			gross: entry.fields.gross,
			net: entry.fields.net,
			flight: entry.fields.flight,
			onCurrentRoster: entry.fields.onCurrentRoster ?? false,
		}))
		.filter((player) => player.playerName !== "Unknown Player");
}

/**
 * Generates a slug with tournament year prefix.
 * Extracts the year from the first tournament date and combines with the base slug.
 */
export function generateSlugWithYear(fields: TypeCourseProps): string {
	const tournamentYear = fields.tournaments
		?.map((tournament) => {
			const tournamentFields = extractFields<{ date?: string }>(tournament);
			if (tournamentFields?.date) {
				return new Date(tournamentFields.date).getFullYear();
			}
			return null;
		})
		.filter(Boolean)[0];

	return tournamentYear ? `/${tournamentYear}/${fields.slug}` : `/${fields.slug}`;
}

/**
 * Filters and transforms leaderboard entries for display.
 * Supports filtering by gross/net scoring and flight designation.
 */
export function filterLeaderboardEntries(
	entries: Array<{
		fields: {
			onCurrentRoster?: boolean;
			roundsCheck?: boolean;
			gross?: number;
			net?: number;
			flight?: string;
			playerName?: string;
		};
	}>,
	options: {
		gross?: boolean;
		net?: boolean;
		firstFlight?: boolean;
		secondFlight?: boolean;
	},
): Array<[string, number]> {
	const { gross, net, firstFlight, secondFlight } = options;

	const rows = entries
		.filter((item) => item.fields.onCurrentRoster)
		.map((item) => {
			if (gross && item.fields.roundsCheck && item.fields.gross !== undefined) {
				return [item.fields.playerName, item.fields.gross] as [string, number];
			}
			if (
				firstFlight &&
				net &&
				item.fields.net !== undefined &&
				item.fields.roundsCheck &&
				item.fields.flight === "First Flight"
			) {
				return [item.fields.playerName, item.fields.net] as [string, number];
			}
			if (
				secondFlight &&
				net &&
				item.fields.net !== undefined &&
				item.fields.roundsCheck &&
				item.fields.flight === "Second Flight"
			) {
				return [item.fields.playerName, item.fields.net] as [string, number];
			}
			return undefined;
		})
		.filter((row): row is [string, number] => row !== undefined);

	// Sort ascending by score
	return rows.sort((a, b) => a[1] - b[1]);
}

/**
 * Sorts entries by a specific score field (gross or net).
 * Returns entries sorted in ascending order by the specified field.
 */
export function sortByScore<T extends { fields: Record<string, unknown> }>(
	entries: T[],
	field: "gross" | "net",
): T[] {
	return [...entries].sort((a, b) => {
		const aScore = (a.fields[field] as number) ?? Number.POSITIVE_INFINITY;
		const bScore = (b.fields[field] as number) ?? Number.POSITIVE_INFINITY;
		return aScore - bScore;
	});
}

/**
 * Filters and sorts roster players by handicap index.
 * Removes guests and sorts by handicap (lowest to highest).
 */
export function transformRosterPlayers(
	entries: Array<{
		fields: {
			title?: string;
			players?: unknown[];
		};
	}>,
) {
	return entries
		.filter((item) => item.fields.title?.includes("Current"))
		.flatMap((item) =>
			(item.fields.players || []).map((player) => {
				const fields = extractFields<{
					playerName?: string;
					handicapIndex?: number;
					guest?: string;
				}>(player);
				return fields;
			}),
		)
		.filter((player): player is NonNullable<typeof player> => player !== null)
		.filter((player) => !player.guest?.includes("Yes"))
		.sort(
			(a, b) =>
				(a.handicapIndex ?? Number.POSITIVE_INFINITY) -
				(b.handicapIndex ?? Number.POSITIVE_INFINITY),
		);
}

/**
 * Filters tournaments occurring after a specific cutoff date.
 * Returns a sorted array of tournaments with normalized data.
 * Accepts Contentful Entry objects or plain objects with fields property.
 */
export function filterUpcomingTournaments(
	entries: Array<Record<string, unknown>>,
	cutoffDate: Date,
) {
	return entries
		.flatMap((item) => {
			const fields = item.fields as TypeCourseProps | undefined;
			if (!fields) return null;

			return fields.tournaments?.map((tournament) => {
				const tournamentFields = extractFields<{
					date?: string;
					prices?: string[];
					players?: string;
					inclusions?: string[];
					tees?: string[];
					type?: string;
					tournamentNotes?: string[];
					results?: unknown;
					clubChampionship?: boolean;
				}>(tournament);

				if (tournamentFields?.date && new Date(tournamentFields.date) > cutoffDate) {
					// Extract results file URL
					let resultsUrl: string | null = null;
					if (tournamentFields.results) {
						const resultsFields = extractFields<{ file?: { url?: string } }>(
							tournamentFields.results,
						);
						resultsUrl = resultsFields?.file?.url ?? null;
					}

					return {
						...fields,
						coursePar: fields.coursePar,
						tournaments: [
							{
								prices: tournamentFields.prices,
								date: tournamentFields.date,
								players: tournamentFields.players,
								inclusions: tournamentFields.inclusions,
								tees: tournamentFields.tees,
								type: tournamentFields.type,
								tournamentNotes: tournamentFields.tournamentNotes,
								results: resultsUrl,
								clubChampionship: tournamentFields.clubChampionship ?? false,
							},
						],
					};
				}
				return null;
			});
		})
		.filter((tournament): tournament is NonNullable<typeof tournament> => tournament !== null)
		.sort(
			(a, b) =>
				new Date(a.tournaments?.[0]?.date ?? 0).getTime() -
				new Date(b.tournaments?.[0]?.date ?? 0).getTime(),
		);
}

/**
 * Formats leaderboard rows for table display.
 * Converts score data to string format required by Table component.
 */
export function formatLeaderboardRows(rows: Array<[string, number]>): string[][] {
	return rows.map(([name, score]) => [String(name), String(score)]);
}

/**
 * Image Transformation Utilities
 */

/**
 * Checks if a URL is from Contentful's image service.
 */
export function isContentfulImage(src = ""): boolean {
	return src.startsWith("//images.ctfassets.net");
}

/**
 * Generates a proxied Contentful image URL with format, width, and quality parameters.
 * Used for image optimization through the API proxy.
 *
 * @param src - The Contentful image URL
 * @param format - Image format (avif, webp, jpg, png)
 * @param width - Optional width in pixels for resizing
 * @param quality - Optional quality (1-100, default 85)
 */
export function getContentfulProxyUrl(src = "", format = "", width?: number, quality = 85): string {
	if (!src) return "";

	const imgFormat = format || src.split(".").pop() || "jpg";
	const params = new URLSearchParams();
	params.set("fm", imgFormat);

	if (width) {
		params.set("w", String(width));
	}

	if (quality && quality !== 85) {
		params.set("q", String(quality));
	}

	return `/api/contentful-image?url=${encodeURIComponent(`${src}?${params.toString()}`)}`;
}
