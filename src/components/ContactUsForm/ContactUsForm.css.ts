import { style } from '@vanilla-extract/css'
import { tokens } from '~styles/designTokens.css'

export const formWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    width: 'col-12',
    gap: 10,
  }),
])
