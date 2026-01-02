import { useMemo } from "react";
import { Link } from "~components/Link";
import { ResponsiveHeadline } from "~components/ResponsiveHeadline";
import { Table } from "~components/Table";
import * as styles from "./Results.css";

function generateUniqueRowKey(result: Result, playerName: string, idx: number): string {
	const str = [
		playerName,
		result.course?.slug || "no-course",
		result.date || "no-date",
		result.gross ?? "no-gross",
		result.net ?? "no-net",
		result.putts ?? "no-putts",
		idx,
	].join("|");

	let hash = 0;
	for (let i = 0; i < str.length; i++) {
		const chr = str.charCodeAt(i);
		hash = (hash << 5) - hash + chr;
		hash |= 0;
	}

	return `row-${playerName}-${result.course?.slug || "no-course"}-${Math.abs(hash)}-${idx}`;
}

function formatDate(date: string | null): string {
	if (!date) return "N/A";
	return new Date(date).toLocaleDateString("en-US", {
		year: "numeric",
		month: "short",
		day: "numeric",
	});
}

function buildTournamentUrl(date: string | null, courseSlug: string | null): string | null {
	if (!date || !courseSlug) return null;
	const year = new Date(date).getFullYear();
	return `/tournaments/${year}/${courseSlug}#results-link`;
}

export interface Result {
	title: string | null;
	date: string | null;
	gross: number | null;
	putts: number | null;
	net: number | null;
	courseHandicap: number | null;
	closestTo: string[] | null;
	longDrive: "F" | "M" | "B" | null;
	flight: "First Flight" | "Second Flight" | null;
	course?: {
		name: string;
		slug: string;
	} | null;
}

export interface YearlyStat {
	year: number | null;
	gross: number | null;
	net: number | null;
}

export interface Player {
	playerName: string;
	results: Result[];
	handicapIndex?: number;
	gross?: number;
	net?: number;
	flight?: "First Flight" | "Second Flight";
	onCurrentRoster?: boolean;
	yearlyStats?: YearlyStat[];
}

type ResultsProps = {
	players: Player[];
	selectedPlayer?: string;
};

export const Results: React.FC<ResultsProps> = ({ players, selectedPlayer = "" }) => {
	const filteredPlayer = useMemo(
		() => players.find((player) => player.playerName === selectedPlayer),
		[players, selectedPlayer],
	);

	const sortedResults = useMemo(() => {
		if (!filteredPlayer?.results) return [];
		return filteredPlayer.results.slice().sort((a, b) => {
			const dateA = a.date ? new Date(a.date).getTime() : 0;
			const dateB = b.date ? new Date(b.date).getTime() : 0;
			return dateB - dateA;
		});
	}, [filteredPlayer]);

	const resultsByYear = useMemo(() => {
		if (!sortedResults.length) return new Map<number, Result[]>();

		const yearMap = new Map<number, Result[]>();
		for (const result of sortedResults) {
			const year = result.date ? new Date(result.date).getFullYear() : 0;
			const yearResults = yearMap.get(year) || [];
			yearResults.push(result);
			yearMap.set(year, yearResults);
		}

		// Sort years in descending order
		return new Map([...yearMap.entries()].sort((a, b) => b[0] - a[0]));
	}, [sortedResults]);

	const lowestScores = useMemo(() => {
		if (!filteredPlayer?.results?.length) {
			return { lowestGross: null, lowestNet: null, lowestPutts: null };
		}

		const validScores = {
			gross: filteredPlayer.results
				.map((r) => r.gross)
				.filter((score): score is number => typeof score === "number"),
			net: filteredPlayer.results
				.map((r) => r.net)
				.filter((score): score is number => typeof score === "number"),
			putts: filteredPlayer.results
				.map((r) => r.putts)
				.filter((score): score is number => typeof score === "number"),
		};

		return {
			lowestGross: validScores.gross.length ? Math.min(...validScores.gross) : null,
			lowestNet: validScores.net.length ? Math.min(...validScores.net) : null,
			lowestPutts: validScores.putts.length ? Math.min(...validScores.putts) : null,
		};
	}, [filteredPlayer]);

	if (!selectedPlayer || !filteredPlayer) {
		return <p>Please select a player to view their results.</p>;
	}

	if (sortedResults.length === 0) {
		return (
			<div className={styles.resultWrapper}>
				<ResponsiveHeadline size={3} as="h2">
					Results
				</ResponsiveHeadline>
				<p>No results available for this player.</p>
			</div>
		);
	}

	return (
		<div className={styles.resultWrapper}>
			<ResponsiveHeadline size={3} as="h2">
				Results
			</ResponsiveHeadline>
			{Array.from(resultsByYear.entries()).map(([year, yearResults]) => {
				const yearStats = filteredPlayer.yearlyStats?.find((stat) => stat.year === year);

				return (
					<div key={`year-${year}`}>
						<ResponsiveHeadline size={4} as="h3" style={{ marginBottom: 16 }}>
							{year || "Unknown Year"}
						</ResponsiveHeadline>
						{yearStats && (
							<dl className={styles.totalWrapper}>
								<dt>Total Gross:</dt>
								<dd>{yearStats.gross ?? "N/A"}</dd>
								<dt>Total Net:</dt>
								<dd>{yearStats.net ?? "N/A"}</dd>
							</dl>
						)}
						<div className={styles.resultTableWrapper}>
							<Table
								thead={[
									"Course",
									"Date",
									"Flight",
									"Gross",
									"Course Handicap",
									"Net",
									"Putts",
									"Closest To",
									"Long Drive",
									"Tournament Results",
								]}
								tbody={yearResults.map((result, idx) => {
									const tournamentUrl = buildTournamentUrl(
										result.date,
										result.course?.slug || null,
									);
									const uniqueRowKey = generateUniqueRowKey(result, filteredPlayer.playerName, idx);

									return [
										{
											value: result.course?.name || "N/A",
											key: uniqueRowKey,
										},
										formatDate(result.date),
										result.flight ?? "N/A",
										{
											value: result.gross?.toString() ?? "N/A",
											className:
												result.gross === lowestScores.lowestGross ? styles.highlighted : undefined,
										},
										result.courseHandicap?.toString() ?? "N/A",
										{
											value: result.net?.toString() ?? "N/A",
											className:
												result.net === lowestScores.lowestNet ? styles.highlighted : undefined,
										},
										{
											value: result.putts?.toString() ?? "N/A",
											className:
												result.putts === lowestScores.lowestPutts ? styles.highlighted : undefined,
										},
										result.closestTo?.length ? result.closestTo.join(", ") : null,
										result.longDrive ?? null,
										tournamentUrl ? (
											<Link key={`link-${uniqueRowKey}`} href={tournamentUrl} variant="navy">
												Results
											</Link>
										) : (
											"N/A"
										),
									];
								})}
							/>
						</div>
					</div>
				);
			})}
		</div>
	);
};
