import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/designTokens.css';
import { color } from '../../styles/designTokens/colors';

export const heroWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'col-12',
  }),
  {
    backgroundColor: color.brand.blue,
    color: color.brand.white,
  },
]);

export const heroHeadline = style({
  color: color.brand.white,
});

export const heroBackground = style([
  tokens({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'col-12',
  }),
  {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: 200,
  },
]);

export const heroColLeft = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'col-6',
  }),
]);

export const heroColRight = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'col-6',
  }),
]);
