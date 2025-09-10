import { style } from '@vanilla-extract/css'
import { color } from '~styles/designTokens/colors'
import { fontSize } from '~styles/designTokens/typography'
import { tokens } from '~styles/designTokens.css'

export const table = style([
	tokens({
		width: 'col-12',
	}),
	{
		fontSize: fontSize.sizeFont4,
		tableLayout: 'auto',
	},
])

export const thead = style({
	color: color.brand.yellow,
	backgroundColor: color.brand.navy,
	fontWeight: 600,
})

export const th = style([
	tokens({
		paddingY: 8,
		paddingX: 4,
		textAlign: 'left',
	}),
	{
		selectors: {
			'&:nth-child(2)': {
				textAlign: 'center',
			},
		},
	},
])

export const tr = style({
	borderBottom: `1px solid ${color.tableBorder}`,
	selectors: {
		'&:hover': {
			backgroundColor: color.brand.gray,
		},
	},
})

export const td = style([
	tokens({
		paddingY: 8,
		paddingX: 4,
		textAlign: 'center',
	}),
	{
		borderLeft: `1px solid ${color.tableBorder}`,
	},
])

export const tfoot = style({
	color: color.brand.yellow,
	backgroundColor: color.brand.navy,
	fontWeight: 600,
})
