import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const flightCardWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 12,
		width: "col-12",
		overflowX: "auto",
		marginBottom: 12,
	}),
]);

export const highlighted = style({
	backgroundColor: color.brand.yellow,
	fontWeight: "bold",
});
