import { style } from "@vanilla-extract/css"
import { color } from "~styles/designTokens/colors"
import { breakpointQuery, tokens } from "~styles/designTokens.css"

export const mainNavItem = style([
	tokens({
		display: "flex",
		alignItems: "center",
		paddingX: 16,
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
])

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
])

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
})
