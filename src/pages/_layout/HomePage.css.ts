import { style } from '@vanilla-extract/css'
import { tokens } from '~styles/designTokens.css'
import { contentPadding, pageMaxWidth } from '~styles/common.css'

export const homeWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    width: 'col-12',
  }),
])

export const homeHero = style([
  tokens({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  {
    backgroundImage: 'url(../../assets/admiral-baker-south-bg.webp)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '300px',
  },
])

export const homeColWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'lg-min': 'row' },
    justifyContent: 'center',
    gap: 24,
    paddingY: 24,
  }),
  pageMaxWidth,
  contentPadding,
])

export const leftCol = style([
  tokens({
    display: 'flex',
    width: { 'xs-min': 'col-12', 'lg-min': 'col-8' },
  }),
])

export const rightCol = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    width: { 'xs-min': 'col-12', 'lg-min': 'col-4' },
    gap: 24,
  }),
])
