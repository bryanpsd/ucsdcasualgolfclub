import { style } from "@vanilla-extract/css";
import { color, tokens } from "~styles";

export const miniCardWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	}),
	{
		backgroundColor: color.brand.navy,
	},
]);

export const miniCardTitle = style([
	tokens({
		padding: 10,
	}),
	{
		color: color.brand.white,
	},
]);

export const miniCardCourse = style({
	color: color.brand.white,
});

export const miniCard = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "col-12",
		gap: 8,
		padding: 10,
	}),
	{
		borderTop: `1px solid ${color.brand.black}`,
	},
]);

export const tournamentNotes = style({
	color: color.brand.white,
});

export const dateTimeTypeWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: 2,
		fontSize: "sizeFont5",
	}),
	{
		color: color.brand.yellow,
	},
]);

export const dateTimeWrapper = style([
	tokens({
		display: "flex",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		width: "col-12",
		gap: 2,
	}),
]);

export const resultsIconWrapper = style([
	{
		display: "inline-flex",
		alignItems: "center",
	},
]);

export const resultsIcon = style([
	tokens({
		fontSize: "sizeFont5",
	}),
	{
		marginRight: 4,
		display: "inline-flex",
		alignItems: "center",
	},
]);
