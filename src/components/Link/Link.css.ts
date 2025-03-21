import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/designTokens.css';
import { color } from '../../styles/designTokens/colors';

export const link = style([
  tokens({
    textDecoration: 'none',
  }),
  {
    ':hover': {
      textDecoration: 'underline',
    },
  },
]);

export const jumpLink = style([
  tokens({ textDecoration: 'underline', cursor: 'pointer' }),
  {
    color: color.brand.navy,
  },
]);
