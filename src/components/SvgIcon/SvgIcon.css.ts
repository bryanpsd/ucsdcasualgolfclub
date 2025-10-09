import { style } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { tokens } from "~styles";

export const svgIcon = recipe({
	base: style([
		tokens({
			display: "inline-block",
			fill: "currentColor",
			flexShrink: 0,
			fontSize: 24,
		}),
		{
			transition: "fill 200ms cubic-bezier(0.0, 0, 0.2, 1) 0s",
		},
	]),
	defaultVariants: {
		color: "inherit",
		size: "default",
	},
	variants: {
		color: {
			inherit: tokens({ color: "inherit" }),
		},
		size: {
			default: style({ width: "1em", height: "1em" }),
			small: tokens({ width: 16 }),
			"extra-small": tokens({ width: 14, marginRight: 3 }),
		},
	},
});

export type SvgIconVariants = RecipeVariants<typeof svgIcon>;
