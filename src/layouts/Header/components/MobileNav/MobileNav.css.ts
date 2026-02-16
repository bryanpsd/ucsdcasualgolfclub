import { keyframes, style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const mobileNavRoot = style([
	tokens({
		height: "col-12",
		display: { "lg-min": "none", "lg-max": "flex" },
		alignItems: "center",
	}),
]);

export const mobileNavIcon = style({
	backgroundColor: "transparent",
	padding: 0,
	selectors: {
		"&:hover,&:focus": {
			backgroundColor: "transparent",
			color: color.brand.white,
			outline: "none",
		},
	},
});

export const mobileNavItem = style([
	tokens({
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		height: "col-12",
		fontFamily: "base",
		fontSize: "sizeFont8",
		paddingY: 4,
		paddingX: 0,
	}),
	{
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
]);

export const menuIcon = style({
	fill: color.navigationText,
	padding: 0,
	color: "inherit",
	display: "inline-block",
});

export const trigger = style([
	tokens({
		width: "col-12",
		justifyContent: "space-between",
	}),
	{
		color: color.brand.navy,
	},
]);

const open = keyframes({
	"0%": { height: 0 },
	"100%": { height: "var(--radix-navigation-menu-viewport-height)" },
});
const close = keyframes({
	"0%": { height: "var(--radix-navigation-menu-viewport-height)" },
	"100%": { height: 0 },
});

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
});

export const mobileNavSelectItem = style([
	tokens({
		paddingY: 4,
		paddingX: 0,
	}),
	{
		display: "flex",
		flexDirection: "column",
		gap: 8,
	},
]);

export const mobileNavLabel = style([
	tokens({
		fontFamily: "base",
		fontSize: "sizeFont6",
	}),
	{
		fontWeight: 600,
		color: color.brand.navy,
	},
]);

export const mobileNavSelect = style([
	tokens({
		padding: 12,
		fontSize: "sizeFont5",
	}),
	{
		width: "100%",
		color: color.brand.black,
		backgroundColor: color.brand.white,
		border: `2px solid ${color.brand.gray}`,
		borderRadius: 4,
		cursor: "pointer",
		":hover": {
			borderColor: color.brand.navy,
		},
		":focus": {
			outline: "none",
			borderColor: color.brand.navy,
			boxShadow: `0 0 0 2px ${color.brand.yellow}`,
		},
	},
]);

export const mobileNavSubsection = style([
	tokens({
		paddingY: 8,
	}),
	{
		display: "flex",
		flexDirection: "column",
		gap: 8,
	},
]);

export const mobileNavSubsectionTitle = style([
	tokens({
		fontFamily: "base",
		fontSize: "sizeFont6",
	}),
	{
		fontWeight: 600,
		color: color.brand.navy,
	},
]);

export const mobileNavSubList = style({
	all: "unset",
	display: "flex",
	flexDirection: "column",
	gap: 4,
	listStyle: "none",
	paddingLeft: 16,
});

export const mobileNavNestedItem = style([
	tokens({
		display: "flex",
		alignItems: "center",
		textDecoration: "none",
		paddingY: 8,
		paddingX: 0,
		fontFamily: "base",
		fontSize: "sizeFont5",
	}),
	{
		color: color.brand.black,
		cursor: "pointer",
		border: "none",
		backgroundColor: "transparent",
		selectors: {
			"&:hover,&:focus": {
				color: color.brand.navy,
				backgroundColor: "transparent",
			},
		},
	},
]);
