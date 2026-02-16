import { globalStyle, style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";
import { breakpointQuery } from "~styles/utilities/designTokens.css";
import { mainNavItem as mainNavItemRoot } from "../MainNav/MainNav.css";

export const mainNavItem = style([
	tokens({
		display: "flex",
		alignItems: "center",
		paddingX: 12,
		height: "col-12",
		gap: 2,
	}),
	{
		color: color.brand.white,
		cursor: "pointer",
		border: "none",
		textDecoration: "none",
		transition: "background-color 0.2s",
		backgroundColor: "transparent",
		selectors: {
			'&[data-mobile-nav-item="true"]': {
				paddingLeft: 0,
				paddingRight: 0,
			},
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
	tokens({
		fontSize: { "xs-min": "sizeFont8", "sm-min": "sizeFont4" },
	}),
	{
		transition: "transform",
		transitionDuration: "0.3s",
		fill: color.brand.navy,
		width: "1em",
		height: "1em",
		selectors: {
			[`${mainNavItemRoot} &`]: {
				fill: color.brand.white,
			},
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
	width: "1.5rem",
	height: "1.5rem",
});

export const reactIcon = style({});

globalStyle(
	`${mainNavItem}:hover ${navIcon}, ${mainNavItemRoot}:hover ${navIcon}, ${mainNavItem}:focus ${navIcon}, ${mainNavItemRoot}:focus ${navIcon}, ${mainNavItem}:hover ${navIcon} *, ${mainNavItemRoot}:hover ${navIcon} *, ${mainNavItem}:focus ${navIcon} *, ${mainNavItemRoot}:focus ${navIcon} *`,
	{
		stroke: "currentColor",
		fill: "currentColor",
	},
);

globalStyle(
	`${mainNavItem}:hover ${reactIcon}, ${mainNavItemRoot}:hover ${reactIcon}, ${mainNavItem}:focus ${reactIcon}, ${mainNavItemRoot}:focus ${reactIcon}, ${mainNavItem}:hover ${reactIcon} *, ${mainNavItemRoot}:hover ${reactIcon} *, ${mainNavItem}:focus ${reactIcon} *, ${mainNavItemRoot}:focus ${reactIcon} *`,
	{
		stroke: "currentColor",
		fill: "currentColor",
	},
);

globalStyle(
	`${mainNavItem}[data-active] ${navIcon}, ${mainNavItemRoot}[data-active] ${navIcon}, ${mainNavItem}[data-active] ${navIcon} *, ${mainNavItemRoot}[data-active] ${navIcon} *`,
	{
		stroke: "currentColor",
		fill: "currentColor",
	},
);

globalStyle(
	`${mainNavItem}[data-active] ${reactIcon}, ${mainNavItemRoot}[data-active] ${reactIcon}, ${mainNavItem}[data-active] ${reactIcon} *, ${mainNavItemRoot}[data-active] ${reactIcon} *`,
	{
		stroke: color.brand.yellow,
		fill: color.brand.yellow,
	},
);

globalStyle(`${mainNavItem}[data-active]:hover, ${mainNavItemRoot}[data-active]:hover`, {
	stroke: "currentColor",
	fill: "currentColor",
});

globalStyle(
	`${mainNavItem}[data-active]:focus, ${mainNavItemRoot}[data-active]:focus, ${mainNavItem}[data-active]:focus-visible, ${mainNavItemRoot}[data-active]:focus-visible`,
	{
		stroke: "currentColor",
		fill: "currentColor",
	},
);

globalStyle(
	`${mainNavItem}[data-active]:hover ${navIcon}, ${mainNavItemRoot}[data-active]:hover ${navIcon}, ${mainNavItem}[data-active]:hover ${navIcon} *, ${mainNavItemRoot}[data-active]:hover ${navIcon} *`,
	{
		stroke: "currentColor",
		fill: "currentColor",
	},
);

globalStyle(
	`${mainNavItem}[data-active]:focus ${navIcon}, ${mainNavItemRoot}[data-active]:focus ${navIcon}, ${mainNavItem}[data-active]:focus ${navIcon} *, ${mainNavItemRoot}[data-active]:focus ${navIcon} *, ${mainNavItem}[data-active]:focus-visible ${navIcon}, ${mainNavItemRoot}[data-active]:focus-visible ${navIcon}, ${mainNavItem}[data-active]:focus-visible ${navIcon} *, ${mainNavItemRoot}[data-active]:focus-visible ${navIcon} *`,
	{
		stroke: "currentColor",
		fill: "currentColor",
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
