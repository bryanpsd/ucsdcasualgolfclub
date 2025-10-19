import { recipe } from "@vanilla-extract/recipes";
import { fontSize, fontWeight, lineHeight } from "~styles";
import { breakpointQuery, tokens } from "~styles/utilities/designTokens.css";

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
					fontSize: fontSize.sizeFont8, // 32px
					lineHeight: lineHeight.sizeLineHeight8, // 40px
					fontWeight: fontWeight.fontWeight500,
					"@media": {
						[breakpointQuery["md-min"]]: {
							fontSize: fontSize.sizeFont10, // 40px
							lineHeight: lineHeight.sizeLineHeight10, // 48px
						},
						[breakpointQuery["lg-min"]]: {
							fontSize: fontSize.sizeFont13, // 56px
							lineHeight: lineHeight.sizeLineHeight13, // 72px
						},
					},
				},
			],
			2: [
				{
					fontSize: fontSize.sizeFont6, // 24px
					lineHeight: lineHeight.sizeLineHeight6, // 28px
					fontWeight: fontWeight.fontWeight500,
					"@media": {
						[breakpointQuery["md-min"]]: {
							fontSize: fontSize.sizeFont8, // 32px
							lineHeight: lineHeight.sizeLineHeight8, // 40px
						},
						[breakpointQuery["lg-min"]]: {
							fontSize: fontSize.sizeFont10, // 40px
							lineHeight: lineHeight.sizeLineHeight10, // 48px
						},
					},
				},
			],
			3: [
				{
					fontSize: fontSize.sizeFont5, // 20px
					lineHeight: lineHeight.sizeLineHeight5, // 24px
					fontWeight: fontWeight.fontWeight500,
					"@media": {
						[breakpointQuery["md-min"]]: {
							fontSize: fontSize.sizeFont6, // 24px
							lineHeight: lineHeight.sizeLineHeight6, // 28px
						},
						[breakpointQuery["lg-min"]]: {
							fontSize: fontSize.sizeFont8, // 32px
							lineHeight: lineHeight.sizeLineHeight8, // 40px
						},
					},
				},
			],
			4: {
				fontSize: fontSize.sizeFont4, // 16px
				lineHeight: lineHeight.sizeLineHeight4, // 20px
				fontWeight: fontWeight.fontWeight500,
				"@media": {
					[breakpointQuery["md-min"]]: {
						fontSize: fontSize.sizeFont5, // 20px
						lineHeight: lineHeight.sizeLineHeight5, // 24px
					},
					[breakpointQuery["lg-min"]]: {
						fontSize: fontSize.sizeFont6, // 24px
						lineHeight: lineHeight.sizeLineHeight6, // 28px
					},
				},
			},
			5: {
				fontSize: fontSize.sizeFont4, // 16px
				lineHeight: lineHeight.sizeLineHeight4, // 20px
				fontWeight: fontWeight.fontWeight500,
			},
			6: {
				fontSize: fontSize.sizeFont2, // 12px
				lineHeight: lineHeight.sizeLineHeight2, // 16px
				fontWeight: fontWeight.fontWeight400,
			},
		},
	},
});
