import { createGlobalTheme } from "@vanilla-extract/css";
import { border } from "~styles/tokens/borders";
import { breakpoints } from "~styles/tokens/breakpoints";
import { color } from "~styles/tokens/colors";
import { duration } from "~styles/tokens/duration";
import { space } from "~styles/tokens/spacing";
import { fontFamily, fontSize, fontWeight, lineHeight } from "~styles/tokens/typography";

import "./globals.css";

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
});
