import { style } from '@vanilla-extract/css'
import { color } from '~styles/designTokens/colors'
import { tokens } from '~styles/designTokens.css'

export const link = style({
	textDecoration: 'none',
	':hover': {
		textDecoration: 'underline',
	},
})

export const jumpLink = style([
	tokens({ textDecoration: 'underline', cursor: 'pointer' }),
	{
		color: color.brand.navy,
	},
])
