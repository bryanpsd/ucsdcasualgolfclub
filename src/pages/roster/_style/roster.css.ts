import { style } from '@vanilla-extract/css';
import { contentPadding, pageMaxWidth } from '../../../styles/common.css';
import { breakpointQuery, tokens } from '../../../styles/designTokens.css';
import { color } from '../../../styles/designTokens/colors';

export const pageWrapper = style([
  tokens({
    marginY: 12,
  }),
  pageMaxWidth,
  contentPadding,
]);

export const table = style([
  tokens({
    width: 'col-12',
  }),
]);

export const thead = style([
  tokens({}),
  {
    color: color.brand.yellow,
    backgroundColor: color.brand.navy,
    fontWeight: 600,
  },
]);

export const th = style([
  tokens({
    paddingY: 8,
    paddingX: 4,
    textAlign: 'left',
  }),
  {
    selectors: {
      '&:nth-child(2)': {
        textAlign: 'center',
      },
    },
  },
]);

export const tr = style([
  tokens({}),
  {
    borderBottom: `1px solid ${color.tableBorder}`,
    selectors: {
      '&:hover': {
        backgroundColor: color.brand.gray,
      },
    },
  },
]);

export const td = style([
  tokens({
    paddingY: 8,
    paddingX: 4,
    textAlign: 'center',
  }),
  {
    borderLeft: `1px solid ${color.tableBorder}`,
  },
]);
