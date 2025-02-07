import { createGlobalTheme } from '@vanilla-extract/css';

import {
  borderRadius,
  borderWidth,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  palette,
  shadow,
  spacing,
} from './designTokens';

export const theme = createGlobalTheme(':root', {
  borderRadius,
  borderWidth,
  palette,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  shadow,
  spacing,
});
