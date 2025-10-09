import { style } from "@vanilla-extract/css";
import { color, fontSize, tokens } from "~styles";
import { contentPadding, pageMaxWidth } from "~styles/globals/common.css";
import { breakpointQuery } from "~styles/utilities/designTokens.css";

export const footer = style({
	paddingTop: 24,
	paddingBottom: 24,
	borderTop: `1px solid ${color.brand.gray}`,
	backgroundColor: color.brand.white,
});

export const footerContent = style([
	contentPadding,
	pageMaxWidth,
	{
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
]);

export const footerList = style([
	tokens({
		display: "flex",
		flexDirection: { "xs-min": "column", "md-min": "row" },
	}),
]);

export const footerListItem = style([
	tokens({
		paddingX: { "xs-min": 0, "md-min": 12 },
		paddingY: { "xs-min": 4, "md-min": 0 },
	}),
	{
		"@media": {
			[breakpointQuery["lg-min"]]: {
				borderLeft: `1px solid ${color.brand.gray}`,
			},
		},
		selectors: {
			"&:first-child": {
				borderLeft: "none",
				paddingLeft: 0,
			},
		},
	},
]);

export const footerLink = style([
	tokens({
		fontFamily: "base",
	}),
	{
		color: color.brand.black,
		fontSize: fontSize.sizeFont4,
	},
]);

export const footerCopyright = style([
	tokens({
		fontFamily: "base",
	}),
]);
