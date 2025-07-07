import { createSprinkles, defineProperties } from '@vanilla-extract/sprinkles'
import { vars } from '../styles/theme.css'
import { objectKeys } from '../types'
import { breakpoints } from './designTokens/breakpoints'

export const breakpointQuery = {
  xs: `screen and (min-width: ${breakpoints.xs}px) and (max-width: ${
    Number(breakpoints.sm) - 1
  }px)`,

  sm: `screen and (min-width: ${breakpoints.sm}px) and (max-width: ${
    Number(breakpoints.md) - 1
  }px)`,

  md: `screen and (min-width: ${breakpoints.md}px) and (max-width: ${
    Number(breakpoints.lg) - 1
  }px)`,

  lg: `screen and (min-width: ${breakpoints.lg}px) and (max-width: ${
    Number(breakpoints.xl) - 1
  }px)`,

  xl: `screen and (min-width: ${breakpoints.xl}px)`,

  'xs-min': '', // min-width: 0 is always true
  'sm-min': `screen and (min-width: ${breakpoints.sm}px)`,

  'md-min': `screen and (min-width: ${breakpoints.md}px)`,

  'lg-min': `screen and (min-width: ${breakpoints.lg}px)`,

  'xl-min': `screen and (min-width: ${breakpoints.xl}px)`,

  'xs-max': `screen and (max-width: ${breakpoints.xs}px)`,
  'sm-max': `screen and (max-width: ${Number(breakpoints.sm) - 0.05}px)`,
  'md-max': `screen and (max-width: ${Number(breakpoints.md) - 0.05}px)`,
  'lg-max': `screen and (max-width: ${Number(breakpoints.lg) - 0.05}px)`,
  'xl-max': `screen and (max-width: ${Number(breakpoints.xl) - 0.05}px)`,
} as const

const mediaQueryBreakpoints = objectKeys(breakpointQuery).reduce(
  (acc, breakpoint) => {
    acc[breakpoint] = { '@media': breakpointQuery[breakpoint] }
    return acc
  },
  {} as Record<keyof typeof breakpointQuery, { '@media': string }>
)

// *******************************************************************
// * Theme Variable Destructuring                                    *
// *******************************************************************
const {
  color: { brand, surface, outline, foreground, ...color },
  space,
  border,
  fontSize,
  fontWeight,
  lineHeight,
  fontFamily,
  duration,
} = vars
// *******************************************************************

// *******************************************************************
// * Color Properties                                                *
// *******************************************************************

// defineProperties doesn't support nested objects.
// destructuring and spreading to map nested variables to
const colors = {
  ...color,
}

const colorProperties = defineProperties({
  conditions: {
    default: {}, // Default condition
    hover: { selector: `&:hover:not(:disabled),&:focus:not(:disabled)` },
    focus: { selector: `&:focus:not(:disabled)` },
    focusWithin: { selector: '&:focus-within:not(:disabled)' },
    active: { selector: '&:active:not(:disabled)' },
    disabled: { selector: '&:disabled' },
  },
  defaultCondition: 'default',
  properties: {
    color: {
      ...(colors as unknown as Record<string, string>),
      ...brand,
      ...foreground,
      currentColor: 'currentColor',
      inherit: 'inherit',
      initial: 'initial',
    },
    fill: {
      ...(colors as unknown as Record<string, string>),
      ...(brand as Record<string, string>),
      ...(foreground as Record<string, string>),
      currentColor: 'currentColor',
      inherit: 'inherit',
      initial: 'initial',
    },
    stroke: {
      ...(colors as unknown as Record<string, string>),
      ...(brand as Record<string, string>),
      currentColor: 'currentColor',
      inherit: 'inherit',
      initial: 'initial',
    },
    borderColor: {
      ...(colors as unknown as Record<string, string>),
      ...(outline as Record<string, string>),
      ...(brand as Record<string, string>),
    },
    background: {
      ...(colors as unknown as Record<string, string>),
      ...(surface as Record<string, string>),
      ...(brand as Record<string, string>),
    },
    backgroundColor: {
      ...(colors as unknown as Record<string, string>),
      ...(surface as Record<string, string>),
      ...(brand as Record<string, string>),
    },
  },
})

// *******************************************************************

// *******************************************************************
// * Typography Properties                                           *
// *******************************************************************

const typographyProperties = defineProperties({
  conditions: {
    ...mediaQueryBreakpoints,
  },
  defaultCondition: 'xs-min',
  properties: {
    fontFamily,
    fontSize: { ...fontSize, ...space, inherit: 'inherit' },
    fontWeight,
    lineHeight: { ...lineHeight, ...space, inherit: 'inherit' },
    textDecoration: ['none', 'underline'],
    textAlign: ['left', 'center', 'right', 'justify', 'inherit'],
    textOverflow: ['ellipsis', 'clip', 'unset'],
    whiteSpace: ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line'],
  },
})
// *******************************************************************

// *******************************************************************
// * Spacing Properties                                              *
// *******************************************************************

const spacingProperties = defineProperties({
  conditions: {
    ...mediaQueryBreakpoints,
  },
  defaultCondition: 'xs-min',
  properties: {
    margin: space,
    marginTop: space,
    marginBottom: space,
    marginRight: space,
    marginLeft: space,
    padding: space,
    paddingTop: space,
    paddingBottom: space,
    paddingRight: space,
    paddingLeft: space,
  },
  shorthands: {
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
})
// *******************************************************************

// *******************************************************************
// * Border Properties                                               *
// *******************************************************************

const borderProperties = defineProperties({
  properties: {
    borderStyle: border.style,
    borderStyleTop: border.style,
    borderStyleBottom: border.style,
    borderStyleRight: border.style,
    borderStyleLeft: border.style,

    borderWidth: space,
    borderTopWidth: space,
    borderBottomWidth: space,
    borderRightWidth: space,
    borderLeftWidth: space,

    borderRadius: border.radius,
    outline: ['none'],
  },
  shorthands: {
    borderStyleX: ['borderStyleRight', 'borderStyleLeft'],
    borderStyleY: ['borderStyleTop', 'borderStyleBottom'],

    borderWidthX: ['borderRightWidth', 'borderLeftWidth'],
    borderWidthY: ['borderTopWidth', 'borderBottomWidth'],
  },
})
// *******************************************************************

// *******************************************************************
// * Sizing Properties                                               *
// *******************************************************************

const sizingProperties = defineProperties({
  conditions: {
    ...mediaQueryBreakpoints,
  },
  defaultCondition: 'xs-min',
  properties: {
    width: space,
    minWidth: space,
    maxWidth: space,
    height: space,
    minHeight: space,
    maxHeight: space,
  },
})
// *******************************************************************

// *******************************************************************
// * Display Properties                                              *
// *******************************************************************

const displayProperties = defineProperties({
  conditions: {
    ...mediaQueryBreakpoints,
    disabled: { selector: '&:disabled' },
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    default: {},
  },
  defaultCondition: 'xs-min',
  properties: {
    position: ['relative', 'absolute', 'fixed', 'sticky', 'static'],
    verticalAlign: ['baseline', 'top', 'middle', 'bottom'],
    display: [
      'block',
      'inline-block',
      'inline',
      'flex',
      'inline-flex',
      'grid',
      'inline-grid',
      'none',
      'inherit',
      'initial',
    ],
    boxSizing: ['border-box', 'content-box'],
    flexBasis: {
      ...space,
      0: 0,
      1: 1,
      auto: 'auto',
    },
    flexDirection: ['row', 'row-reverse', 'column', 'column-reverse'],
    flexGrow: [0, 1],
    flexShrink: [0, 1, 'initial'],
    flexWrap: ['nowrap', 'wrap', 'wrap-reverse'],
    cursor: ['pointer', 'default', 'not-allowed', 'text'],
    gap: space,
    justifyContent: [
      'center',
      'flex-start',
      'flex-end',
      'space-between',
      'space-around',
      'space-evenly',
      'inherit',
    ],
    justifyItems: ['stretch', 'start', 'left', 'right', 'center', 'end', 'inherit'],
    alignItems: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline', 'inherit'],
    alignSelf: ['flex-start', 'center', 'flex-end', 'stretch', 'baseline', 'inherit'],
    alignContent: [
      'center',
      'flex-start',
      'flex-end',
      'baseline',
      'stretch',
      'space-between',
      'space-around',
      'inherit',
    ],
    overflowY: ['hidden', 'visible', 'scroll', 'auto'],
    overflowX: ['hidden', 'visible', 'scroll', 'auto'],
    zIndex: {
      subNav: 500,
      backToTopButton: 500,
      mobileStepper: 1000,
      speedDial: 1050,
      appBar: 1200,
      drawer: 1100,
      modal: 1300,
      snackbar: 1400,
      tooltip: 1500,
      popover: 2000,
    },
  },
  shorthands: {
    overflow: ['overflowX', 'overflowY'],
  },
})

// *******************************************************************

// *******************************************************************
// * Animation Properties                                               *
// *******************************************************************

const animationProperties = defineProperties({
  properties: {
    transitionDuration: duration,
  },
})

// *******************************************************************

export const tokens = createSprinkles(
  displayProperties,
  colorProperties,
  typographyProperties,
  spacingProperties,
  borderProperties,
  sizingProperties,
  animationProperties
)
export type Tokens = NonNullable<Parameters<typeof tokens>[0]>
