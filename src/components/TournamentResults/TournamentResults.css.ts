import { style } from "@vanilla-extract/css"
import { color } from "~styles"

export const resultsLink = style({
	color: color.brand.navy,
})

export const intro = style({
	marginTop: "1rem",
})

export const select = style({
	padding: "0.5rem",
})

export const resultTableWrapper = style({
	marginTop: "1rem",
	overflowX: "auto",
})

export const highlighted = style({
	backgroundColor: color.brand.yellow,
	fontWeight: "bold",
})
