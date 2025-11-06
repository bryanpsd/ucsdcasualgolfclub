import { globalStyle, style } from "@vanilla-extract/css";
import { color } from "~styles";

export const richTextContainer = style({});

globalStyle(`${richTextContainer} > *:not(:first-child)`, {
	marginTop: 24,
});
globalStyle(`${richTextContainer} > *:first-child`, {
	marginTop: 0,
});

export const link = style({
	color: color.brand.navy,
	textDecoration: "underline",
});
