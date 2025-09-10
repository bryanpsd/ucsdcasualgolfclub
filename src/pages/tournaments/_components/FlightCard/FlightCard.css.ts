import { style } from '@vanilla-extract/css'
import { color } from '~styles/designTokens/colors'
import { tokens } from '~styles/designTokens.css'

export const flightCardWrapper = style([
	tokens({
		display: 'flex',
		flexDirection: 'column',
		gap: 12,
		width: 'col-12',
		overflowX: 'auto',
		marginBottom: 12,
	}),
])

export const flightCardLink = style({
	color: color.brand.navy,
})

export const highlighted = style({
	backgroundColor: color.brand.yellow,
	fontWeight: 'bold',
})
