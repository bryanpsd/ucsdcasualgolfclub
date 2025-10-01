import { createGlobalTheme } from "@vanilla-extract/css"
import { border } from "~styles/designTokens/borders"
import { breakpoints } from "~styles/designTokens/breakpoints"
import { color } from "~styles/designTokens/colors"
import { duration } from "~styles/designTokens/duration"
import { space } from "~styles/designTokens/spacing"
import {
	fontFamily,
	fontSize,
	fontWeight,
	lineHeight,
} from "~styles/designTokens/typography"

import "~styles/designTokens/globals.css"

export const vars = createGlobalTheme(":root", {
	color,
	fontFamily,
	fontSize,
	lineHeight,
	fontWeight,
	space,
	border,
	breakpoints,
	duration,
})
