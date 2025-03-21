import { style } from '@vanilla-extract/css';
import { contentPadding, pageMaxWidth } from '../../styles/common.css';
import { breakpointQuery, tokens } from '../../styles/designTokens.css';
import { color } from '../../styles/designTokens/colors';

export const footer = style({
  paddingTop: 24,
  paddingBottom: 24,
  borderTop: `1px solid ${color.brand.gray}`,
  backgroundColor: color.brand.white,
});

export const footerNav = style([contentPadding, pageMaxWidth]);

export const footerList = style([
  tokens({
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
  }),
]);

export const footerListItem = style([
  tokens({
    paddingX: { xs: 0, 'sm-min': 12 },
    paddingY: { xs: 4, 'sm-min': 0 },
  }),
  {
    '@media': {
      [breakpointQuery['md-min']]: {
        borderLeft: `1px solid ${color.brand.gray}`,
      },
    },
    selectors: {
      '&:first-child': {
        borderLeft: 'none',
        paddingLeft: 0,
      },
    },
  },
]);

export const footerLink = style([
  tokens({
    fontFamily: 'base',
  }),
  {
    color: color.brand.black,
  },
]);
