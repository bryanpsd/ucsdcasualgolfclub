import { contentfulClient } from "../../../services/contentful/contentful";
import { contentfulCache } from "../../../utils/contentfulCache";
import type { MainNavProps } from "../components/MainNav";

const getAvailableSeasons = async () => {
	const entries = await contentfulCache.cached(
		async () => contentfulClient.getEntries({
			content_type: "course",
			include: 1,
			limit: 100,
		}),
		{ content_type: "course", query: "menu_seasons" },
		10 * 60 * 1000, // 10 minutes cache
	);

	const seasonsWithTournaments = entries.items
		.flatMap((item) =>
			Array.isArray(item.fields.tournaments)
				? item.fields.tournaments.filter(
					(tournament) => typeof tournament === "object" && tournament !== null,
				)
				: [],
		)
		.filter((tournament) => tournament !== undefined && tournament !== null);

	const uniqueYears = Array.from(
		new Set(
			seasonsWithTournaments.map((tournament) => {
				if (
					"fields" in tournament &&
					tournament.fields &&
					typeof tournament.fields === "object" &&
					"date" in tournament.fields
				) {
					return typeof tournament.fields.date === "string" ||
						typeof tournament.fields.date === "number"
						? new Date(tournament.fields.date).getFullYear()
						: null;
				}
				return null;
			}),
		),
	).filter((year) => year !== null);

	return uniqueYears.sort((a, b) => b - a);
};

const generateSeasonsLinks = async () => {
	const availableSeasons = await getAvailableSeasons();
	const currentYear = new Date().getFullYear();

	// Ensure current year is included even if no tournaments yet
	const unique = Array.from(new Set([...availableSeasons, currentYear]));

	// Only include current and past years (exclude future years like 2026)
	const past = unique.filter((y) => y < currentYear).sort((a, b) => b - a);

	// Desired order: current year first, then past years descending
	const ordered = [currentYear, ...past];

	return ordered.map((year) => ({ label: year.toString(), href: `/seasons/${year}` }));
};

const pastSeasonsLinks = await generateSeasonsLinks();

export const menuItems: MainNavProps["items"] = {
	label: "Main",
	menuItems: [
		{
			label: "Tournaments",
			href: "/tournaments",
		},
		{
			label: "Roster",
			href: "/roster",
		},
		{
			label: "Seasons",
			links: pastSeasonsLinks,
		},
		{
			label: "About",
			href: "/about",
		},
		{
			label: "Contact",
			href: "/contact",
			icon: "mail",
			hideLabel: true,
		},
		{
			label: "Join the Club",
			href: "https://membership.scga.org/start/join/?cid=885",
			target: "_blank",
		},
	],
};
