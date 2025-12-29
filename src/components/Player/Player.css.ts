import { style } from "@vanilla-extract/css";
import { tokens } from "~styles";

export const playerWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 16,
	}),
]);

export const select = style([
	tokens({
		padding: 6,
		width: "auto",
	}),
]);
