import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const totalWrapper = style([
	tokens({
		display: "inline-flex",
		gap: 4,
		paddingX: 4,
		paddingY: 8,
	}),
	{
		backgroundColor: color.brand.yellow,
		color: color.brand.navy,
		fontWeight: 600,
	},
]);

export const resultWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 16,
	}),
]);

export const resultTableWrapper = style([
	tokens({
		overflowX: "auto",
	}),
]);

export const highlighted = style({
	backgroundColor: color.brand.yellow,
	border: `1px solid ${color.brand.gold} !important`,
	fontWeight: "bold",
});
