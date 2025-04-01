import { style } from '@vanilla-extract/css';
import { contentPadding, pageMaxWidth } from '../../../styles/common.css';
import { breakpointQuery, tokens } from '../../../styles/designTokens.css';
import { color } from '../../../styles/designTokens/colors';

export const tournamentWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'md-min': 'row' },
    gap: 12,
    width: 'col-12',
  }),
]);

export const tournamentLeftCol = style([
  tokens({
    width: 'col-8',
    gap: 12,
    display: 'flex',
    flexDirection: 'column',
  }),
]);

export const tournamentRightCol = style([
  tokens({
    width: 'col-4',
    display: 'flex',
    flexDirection: 'column',
  }),
]);
