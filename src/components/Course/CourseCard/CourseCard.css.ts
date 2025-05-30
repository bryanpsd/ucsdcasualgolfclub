import { style } from '@vanilla-extract/css'
import { tokens } from '~styles/designTokens.css'
import { color } from '~styles/designTokens/colors'
import { recipe } from '@vanilla-extract/recipes'

export const courseCardWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'md-min': 'row' },
    width: 'col-12',
    paddingY: 10,
    gap: 10,
  }),
  {
    borderTop: `1px solid ${color.brand.navy}`,
  },
])

export const dateWrapper = recipe({
  base: [
    tokens({
      display: 'flex',
      flexDirection: 'column',
      width: { 'xs-min': 'col-12', 'md-min': 'col-2' },
      alignItems: 'center',
      justifyContent: 'center',
      paddingY: 10,
    }),
  ],
  variants: {
    variant: {
      default: {
        backgroundColor: color.brand.navy,
        color: color.brand.white,
      },
      secondary: {
        backgroundColor: color.brand.blue,
      },
      special: {
        backgroundColor: color.brand.yellow,
        color: color.brand.navy,
      },
    },
  },
})

export const courseCardInfo = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: { 'xs-min': 'center', 'md-min': 'flex-start' },
    justifyContent: { 'xs-min': 'center', 'md-min': 'flex-start' },
    width: { 'xs-min': 'col-12', 'md-min': 'col-7', 'lg-min': 'col-6' },
    gap: 8,
  }),
])

export const courseCardNameWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: { 'xs-min': 'center', 'md-min': 'flex-start' },
    justifyContent: 'center',
    width: { 'xs-min': 'col-12', 'md-min': 'col-7', 'lg-min': 'col-6' },
  }),
])

export const courseCardTimeType = style([
  tokens({
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  }),
])

export const courseCardList = style([
  tokens({
    display: 'flex',
  }),
])

export const courseCardListItem = style([
  tokens({
    display: 'flex',
    paddingX: 4,
    alignItems: 'center',
  }),
  {
    borderRight: `1px solid ${color.brand.navy}`,
    selectors: {
      '&:first-child': {
        paddingLeft: 0,
      },
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
])

export const courseCardButtons = style([
  tokens({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: { 'xs-min': 'center', 'md-min': 'flex-end' },
    width: { 'xs-min': 'col-12', 'md-min': 'col-3', 'lg-min': 'col-4' },
  }),
])

export const courseCardButtonsWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'row', 'md-min': 'column', 'lg-min': 'row' },
    gap: 8,
  }),
])

export const courseNote = style({
  color: color.brand.blue,
})

export const coursePrice = style({
  color: color.outline.success,
})
