import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const statsWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		width: "col-12",
		gap: 16,
	}),
]);

export const statsCardWrapper = style([
	tokens({
		display: "flex",
		flexDirection: { "xs-min": "column", "sm-min": "row" },
		width: "col-12",
		gap: 16,
	}),
]);

export const statsCard = style([
	tokens({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "column",
		padding: 12,
		width: { "xs-min": "col-12", "sm-min": 60 },
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
