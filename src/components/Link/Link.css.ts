import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const link = style({
	color: color.link,
	textDecoration: "underline",
	textUnderlineOffset: "2px",
	":hover": {
		color: color.brand.navy,
		textDecoration: "underline",
	},
	":visited": {
		color: color.brand.navy,
	},
});

export const jumpLink = style([
	tokens({ textDecoration: "underline", cursor: "pointer" }),
	{
		color: color.brand.navy,
		textUnderlineOffset: "2px",
		":hover": {
			color: color.brand.blue,
			textDecoration: "underline",
		},
		":visited": {
			color: color.brand.navy,
		},
	},
]);
