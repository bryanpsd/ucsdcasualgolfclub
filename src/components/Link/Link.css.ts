import { style } from "@vanilla-extract/css";
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes";
import { color, tokens } from "~styles";

export const baseLink = style([
	tokens({
		textDecoration: "underline",
		cursor: "pointer",
		position: "relative",
		display: "inline",
	}),
	{
		textUnderlineOffset: "2px",
		transitionProperty: "color",
		transitionTimingFunction: "ease-in-out",
		outlineOffset: "0.2rem",
	},
]);

export const link = recipe({
	base: [
		baseLink,
		tokens({
			fontWeight: "fontWeight400",
		}),
	],
	variants: {
		variant: {
			default: {
				color: color.link,
				":hover": {
					color: color.brand.navy,
					textDecoration: "underline",
				},
				":visited": {
					color: color.brand.navy,
				},
			},
			navy: {
				color: color.brand.navy,
				":hover": {
					color: color.brand.navy,
					textDecoration: "underline",
				},
				":visited": {
					color: color.brand.navy,
				},
			},
			yellow: {
				color: color.brand.yellow,
				":hover": {
					color: color.brand.navy,
					textDecoration: "underline",
				},
				":visited": {
					color: color.brand.yellow,
				},
			},
			blue: {
				color: color.brand.blue,
				":hover": {
					color: color.brand.navy,
					textDecoration: "underline",
				},
				":visited": {
					color: color.brand.blue,
				},
			},
			white: {
				color: color.brand.white,
				":hover": {
					color: color.brand.white,
					textDecoration: "underline",
				},
				":visited": {
					color: color.brand.white,
				},
			},
			inherit: {
				color: "inherit",
				":hover": {
					textDecoration: "underline",
				},
			},
		},
		underline: {
			always: {
				textDecoration: "underline",
			},
			hover: {
				textDecoration: "none",
				":hover": {
					textDecoration: "underline",
				},
			},
			none: {
				textDecoration: "none",
				":hover": {
					textDecoration: "none",
				},
			},
		},
		size: {
			small: tokens({
				fontSize: "sizeFont4",
				lineHeight: "sizeLineHeight4",
			}),
			medium: tokens({
				fontSize: "sizeFont5",
				lineHeight: "sizeLineHeight5",
			}),
			large: tokens({
				fontSize: "sizeFont6",
				lineHeight: "sizeLineHeight6",
			}),
			inherit: {
				fontSize: "inherit",
				lineHeight: "inherit",
			},
		},
		weight: {
			normal: tokens({ fontWeight: "fontWeight400" }),
			medium: tokens({ fontWeight: "fontWeight500" }),
			bold: tokens({ fontWeight: "fontWeight700" }),
		},
	},
	defaultVariants: {
		variant: "default",
		underline: "always",
		size: "inherit",
		weight: "normal",
	},
});

export type LinkVariants = RecipeVariants<typeof link>;

// Legacy named exports for backward compatibility
export const jumpLink = style([
	baseLink,
	{
		color: color.brand.navy,
		":hover": {
			color: color.brand.blue,
			textDecoration: "underline",
		},
		":visited": {
			color: color.brand.navy,
		},
	},
]);
