import { createGlobalTheme } from '@vanilla-extract/css'
import { breakpoints } from '~styles/designTokens/breakpoints'
import { boxShadow } from '~styles/designTokens/shadows'
import { color } from '~styles/designTokens/colors'
import { space } from '~styles/designTokens/spacing'
import { duration } from '~styles/designTokens/duration'
import { border } from '~styles/designTokens/borders'
import { fontSize, fontWeight, lineHeight, fontFamily } from '~styles/designTokens/typography'

import '~styles/designTokens/globals.css'

export const vars = createGlobalTheme(':root', {
  color,
  fontFamily,
  fontSize,
  lineHeight,
  fontWeight,
  space,
  border,
  boxShadow,
  breakpoints,
  duration,
})
