import { recipe } from "@vanilla-extract/recipes";
import { color, tokens } from "~styles";

export const courseInclusionsWrapper = recipe({
	base: [
		tokens({
			display: "flex",
			flexDirection: "column",
			gap: 4,
		}),
	],
	variants: {
		variant: {
			default: {},
			secondary: {
				color: color.brand.white,
			},
		},
	},
});

export const courseInclusionsHeadline = recipe({
	variants: {
		variant: {
			secondary: {
				color: color.brand.white,
			},
		},
	},
});

export const courseInclusionsList = recipe({
	base: [
		tokens({
			display: "flex",
			flexDirection: "row",
			gap: { "xs-min": 8, "lg-min": 0 },
			flexWrap: { "xs-min": "wrap", "lg-min": "nowrap" },
		}),
	],
	variants: {
		variant: {
			default: {},
			secondary: {
				color: color.brand.white,
				justifyContent: "center",
			},
		},
	},
});

export const courseInclusionsListItem = recipe({
	base: [
		tokens({
			display: "flex",
			paddingX: 4,
			alignItems: "center",
		}),
		{
			selectors: {
				"&:first-child": {
					paddingLeft: 0,
				},
				"&:last-child": {
					borderRight: "none",
				},
			},
		},
	],
	variants: {
		variant: {
			default: {
				borderRight: `1px solid ${color.brand.navy}`,
			},
			secondary: {
				borderRight: `1px solid ${color.brand.white}`,
				color: color.brand.white,
			},
		},
	},
});

export const courseInclusionsIcon = recipe({
	variants: {
		variant: {
			default: {
				fill: color.brand.navy,
			},
			secondary: {
				fill: color.brand.white,
			},
		},
	},
});
