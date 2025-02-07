import type { PxRemMap } from '~types/Utils';
import { pxToRem } from '~utils/pxToRem';

/**
 * Typography related tokens for consumption in theme.css.ts
 */

export const fontFamily = {
  base: ['Source Sans 3', 'Arial', 'Helvetica', 'sans-serif'].join(', '),
};
export const fontWeight = {
  light: '300',
  normal: '400',
  medium: '500',
  bold: '700',
  black: '900',
} as const;

// ============================= FONT SIZE ==================================== //

const fontSizePx = [
  8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 60, 64, 72, 80, 96,
] as const;

// {} flattens the type and makes intellisense more readable
// eslint-disable-next-line @typescript-eslint/ban-types
type FontSize = PxRemMap<(typeof fontSizePx)[number]> & {};

export const fontSize = fontSizePx.reduce((acc, px) => {
  acc[px] = pxToRem(px, { withUnit: true }) as `${number}rem`;
  return acc;
}, {} as FontSize);

// ============================= LINE HEIGHT ==================================== //

const lineHeightPx = [
  10, 14, 18, 20, 24, 28, 32, 40, 48, 60, 62, 72, 80, 96, 120,
] as const;

// {} flattens the type and makes intellisense more readable
// eslint-disable-next-line @typescript-eslint/ban-types
type LineHeight = PxRemMap<(typeof lineHeightPx)[number]> & {};

export const lineHeight = lineHeightPx.reduce((acc, px) => {
  acc[px] = pxToRem(px, { withUnit: true }) as `${number}rem`;
  return acc;
}, {} as LineHeight);
