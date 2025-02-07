import type { PxRemMap } from '~types/Utils';
import { pxToRem } from '~utils/pxToRem';

const spacingPx = [
  0, 2, 4, 8, 10, 12, 14, 16, 20, 24, 28, 32, 40, 48, 56, 60, 64, 70, 72, 80,
  96, 104, 120, 132, 160, 176, 184, 190, 200, 224, 232, 240,
] as const;

export const heightPx = [4, 16, 20, 24, 32, 40, 48, 64, 70] as const;
export const widthPx = [20, 24, 32, 40, 48, 64] as const;
export const gapPx = [
  0, 4, 8, 12, 16, 20, 24, 32, 40, 48, 56, 64, 72, 80,
] as const;

type Spacing = PxRemMap<(typeof spacingPx)[number]>;

export const spacing = spacingPx.reduce((acc, px) => {
  acc[px] = pxToRem(px, { withUnit: true }) as `${number}rem`;
  return acc;
}, {} as Spacing);
