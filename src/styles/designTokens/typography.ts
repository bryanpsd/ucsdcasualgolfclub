import { ucsd } from '../../styles/ucsd';
import { type Flatten, objectKeys } from '../../types';

const { variants } = ucsd.typography;

type Variants = typeof variants;
type TypographyFacetMap<
  Vars extends Variants,
  Fac extends keyof Vars[keyof Vars]
> = {
  // remove readonly, map variant names to facet values
  -readonly [K in keyof Vars]: Vars[K][Fac];
};

/**
 *
 * @param variants Font variants
 * @param facet keys of variants
 * @returns A mapping of a Variant name to the facet passed
 */
const extractTypographyFacet = <V extends Variants, F extends keyof V[keyof V]>(
  variants: V,
  facet: F
) => {
  return objectKeys(variants).reduce((acc, variant) => {
    acc[variant] = variants[variant][facet];
    return acc;
  }, {} as Flatten<TypographyFacetMap<V, F>>);
};

/**
 * Typography related tokens for consumption in theme.css.ts
 */

export const fontFamily = {
  base: ['Roboto', 'serif'].join(', '),
};
export const fontWeight = {
  fontWeight300: '300',
  fontWeight400: '400',
  fontWeight500: '500',
  fontWeight700: '700',
} as const;
// export const fontSize = extractTypographyFacet(variants, 'fontSize');
export const fontSize = {
  sizeFont1: '10px',
  sizeFont2: '12px',
  sizeFont3: '14px',
  sizeFont4: '16px',
  sizeFont5: '20px',
  sizeFont6: '24px',
  sizeFont7: '28px',
  sizeFont8: '32px',
  sizeFont9: '36px',
  sizeFont10: '40px',
  sizeFont11: '44px',
  sizeFont12: '48px',
  sizeFont13: '56px',
  sizeFont14: '64px',
  sizeFont15: '90px',
  sizeFont16: '96px',
} as const;
// export const lineHeight = extractTypographyFacet(variants, 'lineHeight');
export const lineHeight = {
  sizeLineHeight1: '12px',
  sizeLineHeight2: '16px',
  sizeLineHeight3: '18px',
  sizeLineHeight4: '20px',
  sizeLineHeight5: '24px',
  sizeLineHeight6: '28px',
  sizeLineHeight7: '32px',
  sizeLineHeight8: '40px',
  sizeLineHeight9: '44px',
  sizeLineHeight10: '48px',
  sizeLineHeight11: '56px',
  sizeLineHeight12: '64px',
  sizeLineHeight13: '72px',
  sizeLineHeight14: '80px',
  sizeLineHeight15: '96px',
  sizeLineHeight16: '120px',
} as const;
