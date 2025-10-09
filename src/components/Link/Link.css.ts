import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const link = style({
	textDecoration: "none",
	":hover": {
		textDecoration: "underline",
	},
});

export const jumpLink = style([
	tokens({ textDecoration: "underline", cursor: "pointer" }),
	{
		color: color.brand.navy,
	},
]);
