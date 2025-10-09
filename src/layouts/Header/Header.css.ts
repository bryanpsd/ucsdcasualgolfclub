import { style } from "@vanilla-extract/css";
import { color, fontSize, tokens } from "~styles";
import { contentPadding, pageMaxWidth } from "~styles/globals/common.css";

export const headerWrapper = style([
	tokens({
		display: "flex",
		justifyContent: "center",
		width: "col-12",
	}),
	{
		height: 84,
		backgroundColor: color.brand.navy,
		fontSize: fontSize.sizeFont4,
		position: "sticky",
		top: 0,
		zIndex: 1000,
	},
]);

export const header = style([
	tokens({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		position: "relative",
		width: "col-12",
	}),
	pageMaxWidth,
	contentPadding,
]);

export const logoWrapper = style([
	tokens({
		display: "flex",
	}),
]);

export const logoLink = style([
	tokens({
		textDecoration: "none",
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		fontFamily: "base",
		gap: 4,
	}),
	{
		color: color.brand.white,
		fontSize: fontSize.sizeFont5,
	},
]);

export const mainContentJumpLink = style({
	selectors: {
		".sr-only&:focus": {
			height: "auto",
			width: "auto",
			overflow: "visible",
			clip: "unset",
			position: "static",
		},
	},
});
