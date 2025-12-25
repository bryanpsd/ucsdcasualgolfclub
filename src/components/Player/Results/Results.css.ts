import { style } from "@vanilla-extract/css";
import { color } from "~styles";

export const intro = style({
	marginTop: "1rem",
});

export const select = style({
	padding: "0.5rem",
});

export const resultTableWrapper = style({
	marginTop: "1rem",
	overflowX: "auto",
	display: "flex",
	flexDirection: "column",
	gap: 12,
});

export const highlighted = style({
	backgroundColor: color.brand.yellow,
	border: `1px solid ${color.brand.gold} !important`,
	fontWeight: "bold",
});
