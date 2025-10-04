import { style } from "@vanilla-extract/css"
import { recipe } from "@vanilla-extract/recipes"
import { color } from "~styles/designTokens/colors"
import { tokens } from "~styles/designTokens.css"

export const courseCardDetails = style([
	tokens({
		display: "flex",
		flexDirection: "column",
		alignItems: { "xs-min": "center", "md-min": "flex-start" },
		justifyContent: { "xs-min": "center", "md-min": "flex-start" },
		width: { "xs-min": "col-12", "md-min": "col-6" },
		gap: 8,
	}),
])

export const courseCardDetailsWrapper = recipe({
	base: [
		tokens({
			display: "flex",
			flexDirection: "column",

			gap: 8,
		}),
	],
	variants: {
		variant: {
			default: {},
			secondary: {
				alignItems: "center",
			},
		},
	},
})

export const courseCardList = style([
	tokens({
		display: "flex",
	}),
])

export const courseCardListItem = recipe({
	base: [
		tokens({
			display: "flex",
			paddingX: 4,
			alignItems: "center",
			gap: 4,
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
})

export const coursePrice = recipe({
	variants: {
		variant: {
			default: {
				color: color.outline.success,
			},
			secondary: {
				color: color.brand.white,
			},
		},
	},
})

export const icons = recipe({
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
})

export const courseCardDetailsList = recipe({
	base: [
		tokens({
			display: "flex",
			flexDirection: "column",
			gap: 4,
		}),
	],
	variants: {
		variant: {
			default: {
				color: color.brand.black,
			},
			secondary: {
				color: color.brand.white,
				alignItems: "center",
			},
		},
	},
})

export const courseCardDetailsListItem = style([
	tokens({
		display: "flex",
	}),
])
