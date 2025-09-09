import { style } from '@vanilla-extract/css'
import { tokens } from '~styles/designTokens.css'

export const formWrapper = style([
	tokens({
		display: 'flex',
		flexDirection: 'column',
		width: { 'xs-min': 'col-12', 'md-min': 'col-8' },
		gap: 16,
		padding: 24,
	}),
])

export const formField = style([
	tokens({
		display: 'flex',
		flexDirection: 'column',
		width: 'col-12',
		gap: 4,
	}),
])

export const input = style([
	tokens({
		padding: 10,
		outline: 'none',
	}),
	{
		borderRadius: 4,
		border: '1px solid #ccc',
		transition: 'border-color 0.2s',
		selectors: {
			'&:focus': {
				borderColor: '#0070f3',
			},
		},
	},
])

export const textarea = style([
	tokens({
		padding: 10,
		minHeight: 80,
		outline: 'none',
	}),
	{
		borderRadius: 4,
		border: '1px solid #ccc',
		transition: 'border-color 0.2s',
		selectors: {
			'&:focus': {
				borderColor: '#0070f3',
			},
		},
	},
])

export const error = style({
	color: '#d32f2f',
})
