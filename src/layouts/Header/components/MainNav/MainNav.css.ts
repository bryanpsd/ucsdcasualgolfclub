import { style } from '@vanilla-extract/css'
import { color } from '~styles/designTokens/colors'
import { tokens } from '~styles/designTokens.css'

export const mainNavRoot = style([
  tokens({
    height: 'col-12',
    display: { 'lg-max': 'none', 'lg-min': 'flex' },
  }),
  {
    justifyContent: 'flex-end',
    flexDirection: 'row',
    position: 'relative',
    transitionProperty: 'height, padding',
  },
])

export const mainNavList = style([
  tokens({
    display: 'flex',
    height: 'col-12',
  }),
])

export const mainNavTrigger = style({
  display: 'flex',
  paddingLeft: 16,
  paddingRight: 16,
  height: '100%',
  cursor: 'pointer',
  alignItems: 'center',
  position: 'relative',
})

export const mainNavItem = style([
  tokens({
    display: 'flex',
    verticalAlign: 'middle',
    position: 'relative',
  }),
  {
    alignItems: 'center',
    border: 'none',
    borderLeft: `1px solid ${color.brand.black}`,
  },
])

export const mainNavContent = style([
  {
    all: 'unset',
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
    position: 'absolute',
    width: 240,
    backgroundColor: color.brand.white,
    animationDuration: '250ms',
    animationTimingFunction: 'ease',
    listStyle: 'none',
    boxShadow: `0px 4px 12px 0px rgba(0, 0, 0, 0.1)`,
    zIndex: 500,
    top: '100%',
  },
])

export const mainNavSubItem = style([
  tokens({
    display: 'flex',
    textDecoration: 'none',
    padding: 8,
  }),
  {
    color: color.brand.black,
    selectors: {
      '&:hover': {
        backgroundColor: color.brand.yellow,
      },
      '&[data-active]': {
        textDecoration: 'underline',
      },
    },
  },
])

export const arrow = style({
  position: 'relative',
  top: '70%',
  backgroundColor: 'white',
  width: '10px',
  height: '10px',
  transform: 'rotate(45deg)',
  borderTopLeftRadius: '2px',
})
