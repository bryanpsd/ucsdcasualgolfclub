import { contentfulClient } from "../../../services/contentful/contentful";
import { contentfulCache } from "../../../utils/contentfulCache";

const getAvailableSeasons = async () => {
	const entries = await contentfulCache.cached(
		async () =>
			contentfulClient.getEntries({
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

	// Only include past years (exclude current year)
	const unique = Array.from(new Set(availableSeasons));
	const past = unique.filter((y) => y < currentYear).sort((a, b) => b - a);

	return past.slice(0, 5).map((year) => ({ label: year.toString(), href: `/seasons/${year}` }));
};

const pastSeasonsLinks = await generateSeasonsLinks();

type FooterLink = {
	label: string;
	href: string;
	target?: string;
	track?: boolean;
	trackCategory?: string;
};

export type FooterSection = {
	title: string;
	links: FooterLink[];
};

export const footerItems: FooterSection[] = [
	{
		title: "Club",
		links: [
			{ label: "About", href: "/about" },
			{ label: "Roster", href: "/roster" },
			{ label: "Club Champions", href: "/club-champions" },
		],
	},
	{
		title: "Tournaments",
		links: [{ label: `${new Date().getFullYear()} Tournaments`, href: "/tournaments" }],
	},
	{
		title: "Membership",
		links: [
			{
				label: "Join/Renew",
				href: "https://membership.scga.org/start/join/?cid=885",
				target: "_blank",
			},
		],
	},
	{
		title: "Connect",
		links: [
			{
				label: "Contact",
				href: "/contact",
			},
			{
				label: "Instagram",
				href: "https://www.instagram.com/ucsdcasualgolfclub/",
				target: "_blank",
			},
		],
	},
];
export const pastSeasonsItems = pastSeasonsLinks;
