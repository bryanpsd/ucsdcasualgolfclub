import { style } from "@vanilla-extract/css";
import { tokens } from "~styles";

export const seasonRecapWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		gap: 24,
		marginBottom: 24,
	}),
]);

export const seasonRecapList = style([
	tokens({
		display: "grid",
		gap: 16,
		justifyContent: { xs: "center", md: "flex-start" },
	}),
	{
		gridTemplateColumns: "repeat(auto-fit, minmax(0, 200px))",
	},
]);

export const seasonRecapImage = style({
	width: "100%",
	height: "auto",
});
