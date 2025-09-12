import { keyframes, style } from "@vanilla-extract/css"
import { color } from "~styles/designTokens/colors"
import { tokens } from "~styles/designTokens.css"

export const mobileNavRoot = style([
	tokens({
		height: "col-12",
		display: { "lg-min": "none", "lg-max": "flex" },
		alignItems: "center",
	}),
])

export const mobileNavIcon = style({
	backgroundColor: "transparent",
	padding: 0,
	selectors: {
		"&:hover,&:focus": {
			backgroundColor: "transparent",
		},
	},
})

export const mobileNavItem = style([
	tokens({
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		height: "col-12",
		fontFamily: "base",
	}),
	{
		paddingLeft: 0,
		paddingRight: 0,
		paddingTop: 16,
		paddingBottom: 16,
		color: color.brand.navy,
		cursor: "pointer",
		border: "none",
		textDecoration: "none",
		transition: "background-color 0.2s",
		backgroundColor: "transparent",
		selectors: {
			"&:hover,&:focus": {
				color: color.brand.navy,
				backgroundColor: "transparent",
			},
		},
	},
])

export const menuIcon = style({
	fill: color.navigationText,
	padding: 0,
})

export const trigger = style([
	tokens({
		width: "col-12",
		justifyContent: "space-between",
	}),
	{
		color: color.brand.navy,
	},
])

const open = keyframes({
	"0%": { height: 0 },
	"100%": { height: "var(--radix-navigation-menu-viewport-height)" },
})
const close = keyframes({
	"0%": { height: "var(--radix-navigation-menu-viewport-height)" },
	"100%": { height: 0 },
})

export const viewport = style({
	transition: "height 0.3s",
	selectors: {
		[`${trigger}[data-state="open"] ~ &`]: {
			animation: `${open} 0.3s`,
		},
		[`${trigger}[data-state="closed"] ~ &`]: {
			height: 0,
			visibility: "hidden",
			animation: `${close} 0.3s`,
		},
	},
})
