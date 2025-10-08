import { recipe } from "@vanilla-extract/recipes"
import { fontSize, fontWeight, lineHeight } from "~styles"
import { breakpointQuery, tokens } from "~styles/utilities/designTokens.css"

export const responsiveHeadline = recipe({
	base: [
		tokens({
			fontFamily: "base",
			transitionDuration: "shortest",
		}),
		{
			transitionProperty: "font-size",
			transitionTimingFunction: "ease-out",
		},
	],
	variants: {
		size: {
			1: [
				{
					fontSize: fontSize.sizeFont6,
					lineHeight: lineHeight.sizeLineHeight6,
					fontWeight: fontWeight.fontWeight500,
				},
			],
			2: [
				{
					fontSize: fontSize.sizeFont8,
					lineHeight: lineHeight.sizeLineHeight8,
					fontWeight: fontWeight.fontWeight500,
					"@media": {
						[breakpointQuery["md-min"]]: {
							fontSize: fontSize.sizeFont10,
							lineHeight: lineHeight.sizeLineHeight10,
							fontWeight: fontWeight.fontWeight500,
						},
					},
				},
			],
			3: [
				{
					fontSize: fontSize.sizeFont10,
					lineHeight: lineHeight.sizeLineHeight10,
					fontWeight: fontWeight.fontWeight500,
					"@media": {
						[breakpointQuery["md-min"]]: {
							fontSize: fontSize.sizeFont13,
							lineHeight: lineHeight.sizeLineHeight13,
							fontWeight: fontWeight.fontWeight500,
						},
					},
				},
			],
			4: {
				fontSize: fontSize.sizeFont12,
				lineHeight: lineHeight.sizeLineHeight12,
				"@media": {
					[breakpointQuery["md-min"]]: {
						fontSize: fontSize.sizeFont14,
						lineHeight: lineHeight.sizeLineHeight14,
					},
					[breakpointQuery["lg-min"]]: {
						fontSize: fontSize.sizeFont15,
						lineHeight: lineHeight.sizeLineHeight15,
					},
				},
			},
		},
	},
})
