import { style } from '@vanilla-extract/css';
import { tokens } from '../styles/designTokens.css';

export const mainWrapper = style([
  tokens({
    display: 'flex',
    width: 'col-12',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center',
  }),
]);

export const pageMaxWidth = style([
  tokens({ width: 'col-12', marginLeft: 'auto', marginRight: 'auto' }),
  {
    maxWidth: 1280,
  },
]);

export const contentPadding = style([
  tokens({
    paddingX: { 'xs-min': 16, 'md-min': 24, 'lg-min': 48 },
  }),
]);

export const subPageWrapper = style([
  tokens({
    marginY: 12,
  }),
  pageMaxWidth,
  contentPadding,
]);

export const heroWrapper = style([
  tokens({
    marginY: 12,
    textAlign: 'center',
  }),
]);

export const image = style({
  maxWidth: '100%',
  height: 'auto',
  display: 'block',
});
