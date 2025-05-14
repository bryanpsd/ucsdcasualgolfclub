import { style } from '@vanilla-extract/css'
import { tokens } from '~styles/designTokens.css'
import { color } from '~styles/designTokens/colors'

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

export const highlighted = style({
  backgroundColor: color.brand.yellow,
  fontWeight: 'bold',
})
