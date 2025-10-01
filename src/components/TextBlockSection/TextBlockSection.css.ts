import { style } from "@vanilla-extract/css"
import { color } from "~styles/designTokens/colors"
import { tokens } from "~styles/designTokens.css"

const firstChildMarginTop = style({
	selectors: {
		"&:first-child": {
			marginTop: 0,
		},
	},
})

export const h1 = style([tokens({ margin: 0 })])

export const h2 = style([
	tokens({ margin: 0, marginTop: 64 }),
	firstChildMarginTop,
])

export const h3 = style([
	tokens({ margin: 0, marginTop: 24 }),
	firstChildMarginTop,
])

export const h4 = style([
	tokens({ margin: 0, marginTop: 8 }),
	firstChildMarginTop,
])

const bodyCopyWidth = style({})

export const body = style([
	bodyCopyWidth,
	{
		marginTop: 8,
		selectors: {
			"& + &": {
				marginTop: 20,
			},
		},
	},
])

export const list = style([
	tokens({ margin: 0, marginTop: 20 }),
	firstChildMarginTop,
	bodyCopyWidth,
])

export const richTextContainer = style([
	{
		marginTop: 0,
	},
])

export const link = style([
	{
		color: color.brand.navy,
		textDecoration: "underline",
	},
])
