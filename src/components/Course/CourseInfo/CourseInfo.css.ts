import { style } from '@vanilla-extract/css'
import { tokens } from '../../../styles/designTokens.css'
import { color } from '../../../styles/designTokens/colors'

export const courseCardInfo = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
  }),
  {
    backgroundColor: color.brand.navy,
  },
])

export const courseCardInfoTitle = style({
  display: 'flex',
  padding: 10,
  color: color.brand.white,
  alignItems: 'center',
  justifyContent: 'center',
})

export const courseCardInfoListWrapper = style([
  tokens({
    padding: 10,
  }),
  {
    borderTop: `1px solid ${color.brand.black}`,
  },
])

export const courseCardInfoContent = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  }),
  {
    color: color.brand.white,
  },
])
