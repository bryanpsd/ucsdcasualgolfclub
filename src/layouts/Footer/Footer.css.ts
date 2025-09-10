import { style } from '@vanilla-extract/css'
import { contentPadding, pageMaxWidth } from '~styles/common.css'
import { color } from '~styles/designTokens/colors'
import { fontSize } from '~styles/designTokens/typography'
import { breakpointQuery, tokens } from '~styles/designTokens.css'

export const footer = style({
	paddingTop: 24,
	paddingBottom: 24,
	borderTop: `1px solid ${color.brand.gray}`,
	backgroundColor: color.brand.white,
})

export const footerContent = style([
	contentPadding,
	pageMaxWidth,
	{
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
])

export const footerList = style([
	tokens({
		display: 'flex',
		flexDirection: { 'xs-min': 'column', 'lg-min': 'row' },
	}),
])

export const footerListItem = style([
	tokens({
		paddingX: { 'xs-min': 0, 'lg-min': 12 },
		paddingY: { 'xs-min': 4, 'lg-min': 0 },
	}),
	{
		'@media': {
			[breakpointQuery['lg-min']]: {
				borderLeft: `1px solid ${color.brand.gray}`,
			},
		},
		selectors: {
			'&:first-child': {
				borderLeft: 'none',
				paddingLeft: 0,
			},
		},
	},
])

export const footerLink = style([
	tokens({
		fontFamily: 'base',
	}),
	{
		color: color.brand.black,
		fontSize: fontSize.sizeFont4,
	},
])

export const footerCopyright = style([
	tokens({
		fontFamily: 'base',
	}),
])
