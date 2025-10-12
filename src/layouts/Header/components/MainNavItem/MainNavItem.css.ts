import { globalStyle, style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";
import { breakpointQuery } from "~styles/utilities/designTokens.css";
// import the desktop/main nav item class so we can respond to hover on either
import { mainNavItem as mainNavItemRoot } from "../MainNav/MainNav.css";

export const mainNavItem = style([
	tokens({
		display: "flex",
		alignItems: "center",
		paddingX: 12,
		height: "col-12",
	}),
	{
		color: color.brand.white,
		cursor: "pointer",
		border: "none",
		textDecoration: "none",
		transition: "background-color 0.2s",
		backgroundColor: "transparent",
		selectors: {
			"&:hover,&:focus": {
				color: color.brand.navy,
				backgroundColor: color.brand.yellow,
			},
			"&[data-active]": {
				textDecoration: "underline",
			},
		},
	},
]);

export const mainNavItemArrow = style([
	{
		transition: "transform",
		transitionDuration: "0.3s",
		fill: color.brand.navy,
		"@media": {
			[breakpointQuery["sm-min"]]: {
				fill: color.brand.white,
			},
		},
		selectors: {
			[`${mainNavItem}[data-state="open"] > &`]: {
				transform: "rotate(-180deg)",
				fill: color.brand.navy,
			},
			[`${mainNavItem}[data-state="open"]:focus > &`]: {
				fill: color.brand.navy,
			},
			[`${mainNavItem}[data-state="open"]:hover > &`]: {
				fill: color.brand.navy,
			},
			[`${mainNavItem}[data-state="closed"]:hover > &`]: {
				fill: color.brand.navy,
			},
			[`${mainNavItem}[data-state="closed"]:focus > &`]: {
				fill: color.brand.navy,
			},
		},
	},
]);

export const iconWrapper = style([
	tokens({
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
	}),
]);

export const navIcon = style({
	width: "1.75rem",
	height: "1.75rem",
});

globalStyle(`${navIcon}, ${navIcon} *`, {
	stroke: color.brand.white,
	fill: "none",
});

globalStyle(
	`${mainNavItem}:hover ${navIcon}, ${mainNavItemRoot}:hover ${navIcon}, ${mainNavItem}:focus ${navIcon}, ${mainNavItemRoot}:focus ${navIcon}, ${mainNavItem}:hover ${navIcon} *, ${mainNavItemRoot}:hover ${navIcon} *, ${mainNavItem}:focus ${navIcon} *, ${mainNavItemRoot}:focus ${navIcon} *`,
	{
		stroke: color.brand.navy,
		fill: "none",
	},
);

globalStyle(
	`${mainNavItem}[data-active] ${navIcon}, ${mainNavItemRoot}[data-active] ${navIcon}, ${mainNavItem}[data-active] ${navIcon} *, ${mainNavItemRoot}[data-active] ${navIcon} *`,
	{
		stroke: color.brand.navy,
		fill: "none",
	},
);

globalStyle(
	`${mainNavItem}[data-key="contact"][data-active] ${navIcon}, ${mainNavItemRoot}[data-key="contact"][data-active] ${navIcon}, ${mainNavItem}[data-key="contact"][data-active] ${navIcon} *, ${mainNavItemRoot}[data-key="contact"][data-active] ${navIcon} *`,
	{
		stroke: color.brand.navy,
		fill: color.brand.white,
	},
);

globalStyle(
	`${mainNavItem}[data-active]:hover ${navIcon}, ${mainNavItemRoot}[data-active]:hover ${navIcon}, ${mainNavItem}[data-active]:hover ${navIcon} *, ${mainNavItemRoot}[data-active]:hover ${navIcon} *`,
	{
		stroke: color.brand.navy,
		fill: "none",
	},
);

globalStyle(
	`${mainNavItem}[data-active]:focus ${navIcon}, ${mainNavItemRoot}[data-active]:focus ${navIcon}, ${mainNavItem}[data-active]:focus ${navIcon} *, ${mainNavItemRoot}[data-active]:focus ${navIcon} *, ${mainNavItem}[data-active]:focus-visible ${navIcon}, ${mainNavItemRoot}[data-active]:focus-visible ${navIcon}, ${mainNavItem}[data-active]:focus-visible ${navIcon} *, ${mainNavItemRoot}[data-active]:focus-visible ${navIcon} *`,
	{
		stroke: color.brand.navy,
		fill: "none",
	},
);

export const hideBelowDesktop = style({
	position: "absolute",
	width: "1px",
	height: "1px",
	padding: 0,
	margin: "-1px",
	overflow: "hidden",
	clip: "rect(0,0,0,0)",
	border: 0,
	"@media": {
		[breakpointQuery["xl-min"]]: {
			position: "unset",
			width: "unset",
			height: "unset",
			padding: "unset",
			margin: "unset",
			overflow: "unset",
			clip: "unset",
			border: "unset",
		},
	},
});
