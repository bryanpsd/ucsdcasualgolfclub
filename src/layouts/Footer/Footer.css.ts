import { style } from "@vanilla-extract/css";
import { color, fontSize, tokens } from "~styles";
import { contentPadding, pageMaxWidth } from "~styles/globals/common.css";
import { breakpointQuery } from "~styles/utilities/designTokens.css";

export const footer = style({
	paddingTop: 48,
	paddingBottom: 32,
	borderTop: `1px solid ${color.brand.gray}`,
	backgroundColor: color.brand.white,
});

export const footerContent = style([
	contentPadding,
	pageMaxWidth,
	{
		display: "flex",
		flexDirection: "column",
		gap: 48,
	},
]);

export const footerNavigation = style({
	display: "grid",
	gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
	gap: 32,
	"@media": {
		[breakpointQuery["md-min"]]: {
			gridTemplateColumns: "repeat(4, 1fr)",
			gap: 40,
		},
	},
});

export const footerSection = style({
	display: "flex",
	flexDirection: "column",
	gap: 16,
});

export const footerSectionTitle = style([
	tokens({
		fontFamily: "base",
	}),
	{
		fontSize: fontSize.sizeFont6,
		fontWeight: 600,
		color: color.brand.navy,
		margin: 0,
		paddingBottom: 8,
	},
]);

export const footerSectionList = style([
	tokens({
		display: "flex",
		flexDirection: "column",
	}),
	{
		gap: 8,
		listStyle: "none",
		margin: 0,
		padding: 0,
	},
]);

export const footerSectionItem = style({
	"@media": {
		[breakpointQuery["lg-min"]]: {
			borderLeft: "none",
		},
	},
});

export const footerSubsection = style({
	marginTop: 12,
	paddingTop: 12,
	borderTop: `1px solid ${color.brand.gray}`,
});

export const footerSubsectionTitle = style([
	tokens({
		fontFamily: "base",
	}),
	{
		fontSize: fontSize.sizeFont4,
		fontWeight: 500,
		color: color.brand.navy,
		margin: 0,
		marginBottom: 8,
	},
]);

export const footerLink = style([
	tokens({
		fontFamily: "base",
	}),
	{
		fontSize: fontSize.sizeFont4,
	},
]);

export const footerSelectContainer = style({
	display: "flex",
	flexDirection: "column",
	gap: 8,
	marginTop: 12,
	paddingTop: 12,
	borderTop: `1px solid ${color.brand.gray}`,
});

export const footerSelectLabel = style([
	tokens({
		fontFamily: "base",
	}),
	{
		fontSize: fontSize.sizeFont4,
		fontWeight: 500,
		color: color.brand.navy,
	},
]);

export const footerSelect = style([
	tokens({
		padding: 8,
		fontFamily: "base",
	}),
	{
		width: "100%",
		fontSize: fontSize.sizeFont4,
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

export const footerBottom = style({
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	justifyContent: "center",
	paddingTop: 24,
	borderTop: `1px solid ${color.brand.gray}`,
});

export const footerCopyright = style([
	tokens({
		fontFamily: "base",
	}),
	{
		fontSize: fontSize.sizeFont4,
		margin: 0,
	},
]);
