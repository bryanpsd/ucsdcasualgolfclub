import { contentfulClient } from "../../../services/contentful/contentful";
import type { MainNavProps } from "../components/MainNav";

const getAvailableSeasons = async () => {
	const entries = await contentfulClient.getEntries({
		content_type: "course",
		include: 1,
	});

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

const generatePastSeasonsLinks = async () => {
	const availableSeasons = await getAvailableSeasons();

	// Get the current year
	const currentYear = new Date().getFullYear();

	// Filter out the current year
	const filteredSeasons = availableSeasons.filter((year) => year !== currentYear);

	return filteredSeasons.map((year) => ({
		label: year.toString(),
		href: `/seasons/${year}`,
	}));
};

const pastSeasonsLinks = await generatePastSeasonsLinks();

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
