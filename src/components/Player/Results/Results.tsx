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

export interface Player {
	playerName: string;
	results: Result[];
	handicapIndex?: number;
	gross?: number;
	net?: number;
	flight?: "First Flight" | "Second Flight";
	onCurrentRoster?: boolean;
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
		return <p className={styles.intro}>Please select a player to view their results.</p>;
	}

	if (sortedResults.length === 0) {
		return (
			<div className={styles.resultTableWrapper}>
				<ResponsiveHeadline size={3} as="h2">
					Results
				</ResponsiveHeadline>
				<p>No results available for this player.</p>
			</div>
		);
	}

	return (
		<div className={styles.resultTableWrapper}>
			<ResponsiveHeadline size={3} as="h2">
				Results
			</ResponsiveHeadline>
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
				tbody={sortedResults.map((result, idx) => {
					const tournamentUrl = buildTournamentUrl(result.date, result.course?.slug || null);
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
							className: result.gross === lowestScores.lowestGross ? styles.highlighted : undefined,
						},
						result.courseHandicap?.toString() ?? "N/A",
						{
							value: result.net?.toString() ?? "N/A",
							className: result.net === lowestScores.lowestNet ? styles.highlighted : undefined,
						},
						{
							value: result.putts?.toString() ?? "N/A",
							className: result.putts === lowestScores.lowestPutts ? styles.highlighted : undefined,
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
	);
};
