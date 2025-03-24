import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/designTokens.css';
import { color } from '../../../styles/designTokens/colors';
import { recipe } from '@vanilla-extract/recipes';

export const courseCardWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { xs: 'column', md: 'row' },
    width: 'col-12',
    paddingY: 10,
    gap: 10,
  }),
  {
    borderTop: `1px solid ${color.brand.navy}`,
  },
]);

export const dateWrapper = recipe({
  base: [
    tokens({
      display: 'flex',
      flexDirection: 'column',
      width: { 'xs-min': 'col-12', 'md-min': 'col-2' },
      alignItems: 'center',
      justifyContent: 'center',
      paddingY: 10,
    }),
  ],
  variants: {
    variant: {
      default: {
        backgroundColor: color.brand.navy,
      },
      secondary: {
        backgroundColor: color.brand.blue,
      },
    },
  },
});

export const courseCardInfo = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: { 'xs-min': 'center', 'md-min': 'flex-start' },
    justifyContent: { 'xs-min': 'center', 'md-min': 'flex-start' },
    width: { 'xs-min': 'col-12', 'md-min': 'col-5' },
    gap: 8,
  }),
  {},
]);

export const courseCardNameWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    alignItems: { 'xs-min': 'center', 'md-min': 'flex-start' },
    justifyContent: 'center',
    width: { 'xs-min': 'col-12', 'md-min': 'col-5' },
  }),
]);

export const courseCardTime = style([
  tokens({
    display: 'flex',
    alignItems: 'center',
  }),
]);

export const courseCardList = style([
  tokens({
    display: 'flex',
  }),
]);

export const courseCardListItem = style([
  tokens({
    display: 'flex',
    paddingX: 4,
    alignItems: 'center',
  }),
  {
    borderRight: `1px solid ${color.brand.navy}`,
    selectors: {
      '&:first-child': {
        paddingLeft: 0,
      },
      '&:last-child': {
        borderRight: 'none',
      },
    },
  },
]);

export const courseCardButtons = style([
  tokens({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: { 'xs-min': 'col-12', 'md-min': 'col-5' },
  }),
]);

export const courseCardButtonsWrapper = style([
  tokens({
    display: 'flex',
    gap: 8,
  }),
]);

export const courseNote = style({
  color: color.brand.blue,
});

export const coursePrice = style({
  color: color.outline.success,
});
