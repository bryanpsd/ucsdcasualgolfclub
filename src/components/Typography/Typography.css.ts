import { type RecipeVariants, recipe } from '@vanilla-extract/recipes'
import { tokens } from '../../styles/designTokens.css'
import { fontSize, fontWeight, lineHeight } from '../../styles/designTokens/typography'

import { color } from '../../styles/designTokens/colors'

export const typography = recipe({
  base: tokens({ margin: 'none' }),
  variants: {
    variant: {
      headlineSm: {
        fontSize: fontSize.sizeFont6,
        lineHeight: lineHeight.sizeLineHeight6,
      },
      headlineMd: {
        fontSize: fontSize.sizeFont8,
        lineHeight: lineHeight.sizeLineHeight8,
      },
      headlineLg: {
        fontSize: fontSize.sizeFont10,
        lineHeight: lineHeight.sizeLineHeight10,
      },
      bodySm: {
        fontSize: fontSize.sizeFont3,
        lineHeight: lineHeight.sizeLineHeight3,
      },
      bodyMd: {
        fontSize: fontSize.sizeFont4,
        lineHeight: lineHeight.sizeLineHeight4,
      },
      bodyLg: {
        fontSize: fontSize.sizeFont5,
        lineHeight: lineHeight.sizeLineHeight5,
      },
      inherit: tokens({ fontSize: 'inherit', lineHeight: 'inherit' }),
    },
    fontWeight: {
      300: { fontWeight: fontWeight.fontWeight300 },
      400: { fontWeight: fontWeight.fontWeight400 },
      500: { fontWeight: fontWeight.fontWeight500 },
      700: { fontWeight: fontWeight.fontWeight700 },
    },
    color: {
      default: { color: color.brand.black },
      inverse: { color: color.brand.white },
      primary: { color: color.brand.navy },
      secondary: { color: color.brand.yellow },
      info: { color: color.outline.info },
      success: { color: color.outline.success },
      attention: { color: color.outline.attention },
      danger: { color: color.outline.danger },
      inherit: tokens({ color: 'inherit' }),
      initial: tokens({ color: 'initial' }),
    },
    // These utility styles are from the UI Core Typography component. In the future,
    // it might make sense to group utiliiy styles together in a single prop similar
    // to the `sx` prop in Material UI (https://mui.com/system/getting-started/the-sx-prop/.)
    align: {
      left: tokens({ textAlign: 'left' }),
      center: tokens({ textAlign: 'center' }),
      right: tokens({ textAlign: 'right' }),
      justify: tokens({ textAlign: 'justify' }),
      inherit: tokens({ textAlign: 'inherit' }),
    },
    display: {
      block: tokens({ display: 'block' }),
      inline: tokens({ display: 'inline' }),
      initial: tokens({ display: 'initial' }),
    },
    decoration: {
      none: tokens({ textDecoration: 'none' }),
      underline: tokens({ textDecoration: 'underline' }),
    },
    noWrap: {
      true: tokens({
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      }),
    },
  },
  defaultVariants: {
    variant: 'bodyMd',
    fontWeight: 400,
    color: 'default',
    align: 'inherit',
    noWrap: false,
  },
})

export type TypographyVariants = NonNullable<RecipeVariants<typeof typography>>
