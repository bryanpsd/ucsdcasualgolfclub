import { style } from '@vanilla-extract/css'
import { tokens } from '~styles/designTokens.css'
import { body as textBlockSectionBody } from '~components/TextBlockSection/TextBlockSection.css'

export const body = style([textBlockSectionBody, { maxWidth: 'none' }])

export const textBlock = style([
  tokens({
    marginTop: 48,
    marginX: 'auto',
  }),
])

export const seasonRecap = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    marginTop: 24,
    marginBottom: 24,
  }),
])

export const seasonRecapList = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'md-min': 'row' },
    gap: 16,
    marginX: 'auto',
  }),
])

export const image = style({
  width: '100%',
  height: 'auto',
})
