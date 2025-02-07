import { theme } from '~styles/theme.css';

const { palette } = theme;

export const roles = {
  neutral: palette.charcoal[900],
  'neutral.subdued': palette.charcoal[500],

  primary: palette.blue[50],
  'primary.subdued': palette.blue[50],
  'primary.emphasis': palette.blue[50],

  info: palette.slate[600],
  'info.subdued': palette.slate[100],

  success: palette.green[600],
  'success.subdued': palette.green[100],

  attention: palette.gold[50],
  'attention.subdued': palette.gold[50],

  danger: palette.red[600],
  'danger.subdued': palette.red[100],
};

export const fg = {
  'fg.neutral': palette.charcoal[900],
  'fg.neutral.inverse': palette.charcoal[50],
  'fg.neutral.subdued': palette.charcoal[500],
  'fg.neutral.light': palette.charcoal[300],
  'fg.info': palette.slate[600],
  'fg.primary': palette.blue[50],
  'fg.success': palette.green[600],
  'fg.attention': palette.gold[50],
  'fg.danger': palette.red[600],
  'fg.secondary': palette.yellow[50],
  'fg.link': palette.blue[50],
};

export const bg = {
  transparent: 'transparent',

  neutral: palette.charcoal[50],
  'neutral.subdued': palette.charcoal[100],
  'neutral.emphasis': palette.charcoal[500],

  primary: palette.navy[50],

  secondary: palette.yellow[50],

  info: palette.slate[50],
  'info.subdued': palette.slate[100],
  'info.emphasis': palette.slate[700],

  success: palette.green[50],
  'success.subdued': palette.green[100],
  'success.emphasis': palette.green[700],

  attention: palette.gold[50],
  'attention.subdued': palette.gold[50],
  'attention.emphasis': palette.gold[50],

  danger: palette.red[50],
  'danger.subdued': palette.red[100],
  'danger.emphasis': palette.red[700],
};

export const border = {
  neutral: palette.charcoal[300],
  'neutral.emphasis': palette.charcoal[500],
  'neutral.subdued': palette.charcoal[50],

  primary: palette.navy,

  secondary: palette.yellow[50],

  info: palette.slate[600],
  'info.subdued': palette.slate[100],

  success: palette.green[600],
  'success.subdues': palette.green[100],

  attention: palette.gold[50],

  error: palette.red[600],
  'error.subdues': palette.red[100],

  button: palette.charcoal[300],

  'button.primary': palette.blue[50],

  'button.tertiary': palette.charcoal[50],
  'button.tertiary.hover': palette.slate[50],
  'button.tertiary.pressed': palette.slate[100],
};
