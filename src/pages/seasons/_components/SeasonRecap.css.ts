import { style } from '@vanilla-extract/css';
import { tokens } from '../../../styles/designTokens.css';

export const seasonRecapWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: 'column',
    gap: 24,
    marginBottom: 24,
  }),
]);

export const seasonRecapList = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'sm-min': 'row' },
    gap: 16,
  }),
]);

export const seasonRecapImage = style({
  width: '100%',
  height: 'auto',
});
