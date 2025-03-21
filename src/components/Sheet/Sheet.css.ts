import { keyframes, style } from '@vanilla-extract/css';
import { breakpointQuery, tokens } from '../../styles/designTokens.css';
import { color } from '../../styles/designTokens/colors';

export const modalOverlay = style([
  tokens({
    position: 'fixed',
    zIndex: 'drawer',
  }),
  {
    inset: 0,
    backgroundColor: color.brand.black,
    opacity: 0.5,
  },
]);

const slideIn = keyframes({
  '0%': {
    right: '-100%',
  },
  '100%': {
    right: 0,
  },
});

export const modalContent = style([
  tokens({
    position: 'fixed',
    height: 'col-12',
    paddingTop: 16,
    paddingX: 8,
    paddingBottom: 24,
    zIndex: 'drawer',
    overflowY: 'auto',
  }),
  {
    top: 0,
    right: 0,
    width: '100%',
    backgroundColor: color.brand.white,
    '@media': {
      [breakpointQuery['sm-min']]: {
        width: 336,
      },
    },
    selectors: {
      '&[data-state="open"]': {
        '@media': {
          [breakpointQuery['sm-min']]: {
            animation: `${slideIn} 0.3s`,
          },
        },
      },
    },
  },
]);

export const modalCloseContainer = style([
  tokens({
    width: 'col-12',
    display: 'flex',
    justifyContent: 'flex-end',
  }),
]);
