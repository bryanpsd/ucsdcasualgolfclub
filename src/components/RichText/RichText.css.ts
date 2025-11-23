import { style } from "@vanilla-extract/css";
import { tokens } from "~styles";

export const textBlock = style([
	tokens({
		marginX: "auto",
	}),
]);

export const seasonRecap = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 16,
		marginTop: 24,
		marginBottom: 24,
	}),
]);

export const seasonRecapList = style([
	tokens({
		display: "grid",
		gap: 16,
		justifyContent: "center",
	}),
	{
		gridTemplateColumns: "repeat(auto-fit, minmax(0, 200px))",
	},
]);

export const image = style({
	display: "block",
	width: "100%",
	height: "auto",
});
