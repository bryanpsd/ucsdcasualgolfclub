import { globalStyle, style } from "@vanilla-extract/css"
import { type RecipeVariants, recipe } from "@vanilla-extract/recipes"
import { tokens } from "~styles"

export const baseButton = style([
	tokens({
		textDecoration: "none",
		position: "relative",
		display: "inline-flex",
		justifyContent: "center",
		alignContent: "center",
		verticalAlign: "middle",
		alignItems: "center",
		cursor: { hover: "pointer", disabled: "not-allowed" },
		fontFamily: "base",
		borderStyle: "solid",
	}),
	{
		boxSizing: "border-box",
		transitionProperty: "background, border-color",
		transitionDuration: "250ms",
		transitionTimingFunction: "ease-in",
		outlineOffset: ".2rem",
	},
])

export const button = recipe({
	base: [
		baseButton,
		tokens({
			fontWeight: "fontWeight500",
			borderWidth: 1,
		}),
	],
	variants: {
		size: {
			small: tokens({
				fontSize: "sizeFont4",
				lineHeight: "sizeLineHeight4",
				gap: 4,
				padding: 4,
			}),
			medium: tokens({
				fontSize: "sizeFont16",
				lineHeight: "sizeLineHeight16",
				gap: 16,
				paddingY: 11,
				paddingX: 10,
			}),
			large: tokens({
				fontSize: "sizeFont16",
				lineHeight: "sizeLineHeight16",
				gap: 16,
				paddingY: 18,
				paddingX: 16,
			}),
		},
		// empty values are placeholders. compoundVariants will control the values
		color: {
			primary: "",
			secondary: "",
			danger: "",
			default: "", // neutral coloring naming comes from MUI, TODO: rename to neutral
		},
		variant: {
			outlined: tokens({ minWidth: 96 }),
			contained: tokens({ minWidth: 96 }),
			text: tokens({ minWidth: "none" }),
		},
	},
	compoundVariants: [
		// *******************************************************************
		// Contained
		// *******************************************************************
		{
			variants: {
				color: "primary",
				variant: "contained",
			},
			style: tokens({
				color: { default: "yellow", hover: "white", disabled: "gray" },
				borderColor: { default: "navy", hover: "navy", disabled: "gray" },
				backgroundColor: { default: "navy", hover: "navy", disabled: "gray" },
			}),
		},

		// *******************************************************************
		// Outlined (default)
		// *******************************************************************
		{
			variants: {
				color: "primary",
				variant: "outlined",
			},
			style: tokens({
				color: { default: "yellow", hover: "white", disabled: "gray" },
				borderColor: { default: "navy", disabled: "gray" },
				backgroundColor: {
					default: "transparent",
					hover: "navy",
					disabled: "gray",
				},
			}),
		},
		{
			variants: {
				color: "secondary",
				variant: "outlined",
			},
			style: tokens({
				color: { default: "yellow", hover: "white", disabled: "gray" },
				borderColor: { default: "yellow", disabled: "gray" },
				backgroundColor: {
					default: "transparent",
					hover: "navy",
					disabled: "gray",
				},
			}),
		},
		// *******************************************************************
		// Text
		// *******************************************************************
		{
			variants: {
				color: "default",
				variant: "text",
			},
			style: tokens({
				color: { default: "inherit", disabled: "gray" },
				borderColor: "transparent",
				backgroundColor: "transparent",
			}),
		},
		{
			variants: {
				variant: "text",
				size: "small",
			},
			style: {
				padding: "0.2rem 0 !important",
			},
		},
	],
	defaultVariants: {
		size: "medium",
		variant: "outlined",
		color: "primary",
	},
})

export const buttonLabel = tokens({
	display: "flex",
	alignItems: "center",
	alignContent: "center",
	justifyContent: "center",
})

export const buttonIcon = recipe({
	base: [
		tokens({
			display: "inherit",
			fill: "currentColor",
		}),
		{ height: "1em", width: "1em" },
	],
	variants: {
		position: {
			end: "",
			start: "",
		},
		size: {
			small: [tokens({ fontSize: 16 }), {}],
			medium: [tokens({ fontSize: 20 }), {}],
			large: [tokens({ fontSize: 22 }), {}],
		},
	},
	compoundVariants: [
		{
			variants: {
				position: "end",
				size: "small",
			},
			style: [
				tokens({ marginLeft: 4 }),
				{
					marginRight: "-0.2rem",
				},
			],
		},
		{
			variants: {
				position: "start",
				size: "small",
			},
			style: [
				tokens({ marginRight: 4 }),
				{
					marginLeft: "-0.2rem",
				},
			],
		},
		{
			variants: {
				position: "end",
				size: "medium",
			},
			style: [
				tokens({ marginLeft: 8 }),
				{
					marginRight: "-0.4rem",
				},
			],
		},
		{
			variants: {
				position: "start",
				size: "medium",
			},
			style: [
				tokens({ marginRight: 8 }),
				{
					marginLeft: "-0.4rem",
				},
			],
		},
		{
			variants: {
				position: "end",
				size: "large",
			},
			style: [
				tokens({ marginLeft: 8 }),
				{
					marginRight: "-0.4rem",
				},
			],
		},
		{
			variants: {
				position: "start",
				size: "large",
			},
			style: [
				tokens({ marginRight: 8 }),
				{
					marginLeft: "-0.4rem",
				},
			],
		},
	],
	defaultVariants: {
		size: "medium",
	},
})

globalStyle(`${buttonIcon.classNames.base}`, {
	transition: "fill 250ms ease-in-out", // Smooth transition for color changes
})

globalStyle(`${buttonIcon.classNames.variants.size.small} > *:first-child`, {
	fontSize: "1.6rem",
})
globalStyle(`${buttonIcon.classNames.variants.size.medium} > *:first-child`, {
	fontSize: "2.0rem",
})
globalStyle(`${buttonIcon.classNames.variants.size.large} > *:first-child`, {
	fontSize: "2.2rem",
})

export type ButtonVariants = RecipeVariants<typeof button>
