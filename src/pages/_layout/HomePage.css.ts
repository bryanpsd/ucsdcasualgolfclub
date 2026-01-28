import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";
import { contentPadding, pageMaxWidth } from "~styles/globals/common.css";

export const homeWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		width: "col-12",
	}),
]);

export const homeHero = style([
	tokens({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
	}),
	{
		position: "relative",
		height: "300px",
		overflow: "hidden",
	},
]);

export const heroImage = style({
	position: "absolute",
	inset: 0,
	width: "100%",
	height: "100%",
	objectFit: "cover",
	objectPosition: "center",
	zIndex: 0,
});

export const heroContent = style({
	position: "relative",
	zIndex: 1,
});

export const homeColWrapper = style([
	tokens({
		display: "flex",
		flexDirection: { "xs-min": "column", "lg-min": "row" },
		justifyContent: "center",
		gap: 24,
		paddingY: 24,
	}),
	pageMaxWidth,
	contentPadding,
]);

export const leftCol = style([
	tokens({
		display: "flex",
		width: { "xs-min": "col-12", "lg-min": "col-8" },
	}),
]);

export const rightCol = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		width: { "xs-min": "col-12", "lg-min": "col-4" },
		gap: 24,
	}),
]);

export const rightColCard = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}),
	{
		backgroundColor: color.brand.navy,
		color: color.brand.white,
	},
]);

export const rightColCardTitle = style([
	tokens({
		padding: 10,
	}),
]);

export const rightColCardInfo = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "col-12",
		gap: 8,
		padding: 10,
	}),
	{
		borderTop: `1px solid ${color.brand.black}`,
	},
]);
