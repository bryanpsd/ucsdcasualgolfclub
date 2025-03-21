import { style } from '@vanilla-extract/css';
import { tokens } from '../../styles/designTokens.css';
import { color } from '../../styles/designTokens/colors';

export const upcomingTournament = style([
  tokens({}),
  {
    backgroundColor: color.brand.navy,
  },
]);
