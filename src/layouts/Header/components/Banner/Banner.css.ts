import { style } from '@vanilla-extract/css'
import { contentPadding } from '~styles/common.css'
import { color } from '~styles/designTokens/colors'

export const bannerWrapper = style([
	contentPadding,
	{
		paddingTop: 24,
		paddingBottom: 24,
		backgroundColor: color.brand.blue,
		color: color.brand.white,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		gap: 16,
	},
])

export const bannerLink = style({
	color: color.brand.white,
	textDecoration: 'underline !important',
})
