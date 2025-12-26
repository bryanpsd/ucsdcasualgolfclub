import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const statsWrapper = style([
	tokens({
		display: "flex",
		gap: 10,
		flexDirection: "column",
	}),
]);

export const statsCardWrapper = style([
	tokens({
		display: "flex",
		flexDirection: { "xs-min": "column", "md-min": "row" },
		width: "col-12",
		gap: 10,
	}),
]);

export const statsCard = style([
	tokens({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "column",
		padding: 12,
	}),
	{
		backgroundColor: color.brand.navy,
		color: color.brand.white,
	},
]);

export const statValue = style([
	tokens({
		fontSize: "sizeFont6",
	}),
]);
