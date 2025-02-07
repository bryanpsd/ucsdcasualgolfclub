/**
 * BUILD ON BRIX -- COLOR PRIMITIVES.
 * It is unlikely that you should be using this import.
 * Normal color implementation should use the semantic names (accent, fg.primary, error.default, etc...)
 * If you use this import, you will be subject to a declined PR
 * */
export const palette = {
  charcoal: {
    50: '#FFFFFF',
    100: '#FBFBFB',
    200: '#F3F4F6',
    300: '#C7C9CC',
    400: '#8B8E94',
    500: '#6C6F75',
    600: '#393C42',
    700: '#22272F',
    800: '#141D23',
    900: '#050505',
  },
  green: {
    50: '#EDF7E5',
    100: '#CBECB5',
    200: '#82CE59',
    300: '#57BB1F',
    400: '#48A414',
    500: '#318000',
    600: '#2B7200',
    700: '#246100',
    800: '#1A4C00',
    900: '#153802',
  },
  gold: {
    50: '#C69214',
  },
  red: {
    50: '#FCF1F0',
    100: '#FBDBD7',
    200: '#FFA198',
    300: '#FF7D75',
    400: '#F65857',
    500: '#D8383F',
    600: '#BB0628',
    700: '#A90523',
    800: '#86031A',
    900: '#640512',
  },
  slate: {
    50: '#F0F4FB',
    100: '#E0E6EF',
    200: '#AEBDD3',
    300: '#96A8C0',
    400: '#8193AA',
    500: '#687990',
    600: '#54657B',
    700: '#45576C',
    800: '#374353',
    900: '#27313E',
  },
  navy: {
    50: '#182B49',
  },
  blue: {
    50: '#00629B',
  },
  yellow: {
    50: '#FFCD00',
  },
} as const;

export type Palettes = typeof palette;
export type Palette = keyof Palettes;
export type PaletteShade = keyof Palettes[Palette];
