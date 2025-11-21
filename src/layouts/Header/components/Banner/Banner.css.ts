import { globalStyle, style } from "@vanilla-extract/css";
import { color } from "~styles";
import { contentPadding } from "~styles/globals/common.css";

export const bannerWrapper = style([
	contentPadding,
	{
		paddingTop: 24,
		paddingBottom: 24,
		backgroundColor: color.brand.blue,
		color: color.brand.white,
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 16,
	},
]);

export const bannerLink = style({
	color: color.brand.white,
	textDecoration: "underline",
	selectors: {
		"&:hover, &:focus, &:active, &:visited": {
			color: color.brand.white,
			textDecoration: "underline",
		},
	},
});

globalStyle(`${bannerWrapper} a`, {
	color: color.brand.white,
	textDecoration: "underline",
});

globalStyle(
	`${bannerWrapper} a:hover, ${bannerWrapper} a:focus, ${bannerWrapper} a:active, ${bannerWrapper} a:visited`,
	{
		color: color.brand.white,
		textDecoration: "underline",
	},
);
