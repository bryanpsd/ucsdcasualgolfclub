import { style } from '@vanilla-extract/css'
import { color } from '~styles/designTokens/colors'
import { tokens } from '~styles/designTokens.css'

export const heroWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'md-min': 'row' },
    alignItems: 'center',
    justifyContent: 'center',
    width: 'col-12',
    height: { 'xs-min': 'auto', 'lg-min': 150 },
  }),
  {
    backgroundColor: color.brand.blue,
    color: color.brand.white,
  },
])

export const heroHeadline = style({
  color: color.brand.white,
})

export const heroBackground = style([
  tokens({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'col-12',
    height: { 'xs-min': 100, 'lg-min': 150 },
  }),
  {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
])

export const heroColLeft = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: { 'xs-min': 'col-12', 'md-min': 'col-6' },
    paddingX: { 'xs-min': 16, 'md-min': 24, 'lg-min': 48 },
    paddingY: 24,
    height: { 'xs-min': 100, 'lg-min': 150 },
  }),
])

export const heroColRight = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: { 'xs-min': 'col-12', 'md-min': 'col-6' },
  }),
])
