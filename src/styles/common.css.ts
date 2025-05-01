import { style } from '@vanilla-extract/css'
import { tokens } from './designTokens.css' // Fixed path
import { color } from './designTokens/colors' // Fixed path
import { fontSize } from './designTokens/typography' // Fixed path

export const mainWrapper = style([
  tokens({
    display: 'flex',
    width: 'col-12',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }),
])

export const pageMaxWidth = style([
  tokens({ width: 'col-12', marginLeft: 'auto', marginRight: 'auto' }),
  {
    maxWidth: 1280,
  },
])

export const contentPadding = style([
  tokens({
    paddingX: { 'xs-min': 16, 'md-min': 24, 'lg-min': 48 },
  }),
])

export const subPageWrapper = style([
  tokens({
    marginY: 12,
  }),
  pageMaxWidth,
  contentPadding,
])

export const centerContent = style([
  tokens({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
  }),
])

export const heroWrapper = style([
  tokens({
    marginY: 12,
    textAlign: 'center',
  }),
])

export const image = style({
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
})

export const table = style([
  tokens({
    width: 'col-12',
  }),
  {
    fontSize: fontSize.sizeFont4,
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
