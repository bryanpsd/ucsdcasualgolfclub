import { defineProperties, createSprinkles } from '@vanilla-extract/sprinkles';
import { theme } from '~styles/theme.css';
import {
  borderStyle,
  heightPx,
  gapPx,
  widthPx,
  transition,
  transitionDuration,
  animationDuration,
} from '~styles/designTokens';
import { roles, fg, bg, border } from '~styles/designTokens/color';
import { spacingMapper } from './utils/spacingMapper';
import { mediaQuery } from '~styles/designTokens/breakpoints';

const {
  spacing,
  lineHeight,
  fontFamily,
  fontSize,
  fontWeight,
  borderRadius,
  borderWidth,
} = theme;

const headerHeightProperties = {
  'brand.small': '2rem',
  'brand.medium': '3.5rem',
  'brand.large': '4rem',
  'brand.large.sticky': '2.5rem',
  'header.desktop': '12.5rem',
  'header.desktop.scrollUp': '9.5rem',
  'header.tablet': '8rem',
  'header.mobile': '4.5rem',
};
const headerWidthProperties = {
  'brand.small': '8.5rem',
  'brand.medium': '12rem',
  'brand.large': '11.5rem',
  'brand.large.sticky': '7.75rem',
};

const responsiveProperties = defineProperties({
  conditions: {
    mobile: {},
    tablet: { '@media': mediaQuery('tablet') },
    desktop: { '@media': mediaQuery('desktop') },
  },
  defaultCondition: 'mobile',
  responsiveArray: ['mobile', 'tablet', 'desktop'],
  properties: {
    aspectRatio: ['1', '3/4', '4/3', '5/7', '5/3', '16/9'],
    textAlign: ['center', 'right', 'left'],
    position: ['absolute', 'relative', 'fixed'],
    display: ['none', 'flex', 'grid', 'block', 'inline', 'inline-block'],
    flexDirection: ['row', 'row-reverse', 'column'],
    flexWrap: ['wrap', 'nowrap'],
    justifyContent: [
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    justifyItems: [
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    alignItems: ['flex-start', 'center', 'flex-end'],
    alignSelf: ['flex-start', 'center', 'flex-end'],
    alignContent: [
      'flex-start',
      'center',
      'flex-end',
      'space-around',
      'space-between',
    ],
    paddingTop: spacing,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    marginTop: spacing,
    marginBottom: spacing,
    top: { ...spacing, ...headerHeightProperties, '50%': '50%' },
    right: { ...spacing, '50%': '50%' },
    left: { ...spacing, '50%': '50%' },
    marginLeft: { ...spacing, auto: 'auto' },
    marginRight: { ...spacing, auto: 'auto' },
    height: {
      ...spacingMapper(heightPx),
      ...headerHeightProperties,
      fill: '100%',
    },
    minHeight: {
      ...headerHeightProperties,
    },
    gap: spacingMapper(gapPx),
    width: {
      ...headerWidthProperties,
      ...spacingMapper(widthPx),
      'fit-content': 'fit-content',
      'col-12': '100%',
      'col-11': '91.66%',
      'col-10': '83.33%',
      'col-9': '75%',
      'col-8': '66.67%',
      'col-7': '58.33%',
      'col-6': '50%',
      'col-5': '41.66%',
      'col-4': '33.33%',
      'col-3': '25%',
      'col-2': '16.67%',
      'col-1': '8.33%',
      unset: 'unset',
    },
  },
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    placeItems: ['justifyContent', 'alignItems'],
  },
});

const colorProperties = defineProperties({
  conditions: {
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
    active: { selector: '&:active, &:hover:active' },
    disabled: { selector: '&:disabled' },
    default: {},
    darkMode: { '@media': '(prefers-color-scheme: dark)' },
  },
  defaultCondition: 'default',
  properties: {
    color: { ...fg, ...roles },
    background: { ...bg },
    borderColor: border,
    fill: { ...bg, ...roles, currentColor: 'currentcolor' },
  },
});

const typographyProperties = defineProperties({
  conditions: {
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
    active: { selector: '&:active' },
    default: {},
  },
  defaultCondition: 'default',
  properties: {
    fontFamily,
    fontSize,
    fontWeight,
    lineHeight,
    textDecoration: ['none', 'underline'],
  },
});

const borderProperties = defineProperties({
  properties: {
    borderBottomWidth: borderWidth,
    borderRadius,
    borderWidth,
    borderStyle,
  },
});

const animationProperties = defineProperties({
  conditions: {
    default: {},
    hover: { selector: `&:hover` },
    focus: { selector: `&:focus` },
    active: { selector: '&:active' },
  },
  defaultCondition: 'default',
  properties: {
    transition,
    transitionDuration,
    animationDuration,
  },
});

const layoutProperties = defineProperties({
  properties: {
    zIndex: {
      navBar: 100,
      header: 1000,
      navMenuButton: 1001,
      navMenu: 999,
    },
  },
});

export type Sprinkles = NonNullable<Parameters<typeof sprinkles>[0]>;

export const sprinkles = createSprinkles(
  animationProperties,
  responsiveProperties,
  colorProperties,
  typographyProperties,
  borderProperties,
  layoutProperties
);
