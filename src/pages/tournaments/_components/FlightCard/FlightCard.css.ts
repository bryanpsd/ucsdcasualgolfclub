import { style } from '@vanilla-extract/css';
import { tokens } from '../../../../styles/designTokens.css';

export const flightCardWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    width: 'col-12',
    overflowX: 'auto',
    marginBottom: 12,
  }),
]);

export const highlighted = style({
  backgroundColor: '#ffeb3b', // Yellow background
  fontWeight: 'bold',
});
