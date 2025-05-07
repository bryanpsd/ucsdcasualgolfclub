import { style } from '@vanilla-extract/css'
import { tokens } from '../../../styles/designTokens.css'
export const tournamentWrapper = style([
  tokens({
    display: 'flex',
    flexDirection: { 'xs-min': 'column', 'md-min': 'row' },
    gap: 12,
    width: 'col-12',
  }),
])

export const tournamentLeftCol = style([
  tokens({
    width: { 'xs-min': 'col-12', 'md-min': 'col-8' },
    gap: 12,
    display: 'flex',
    flexDirection: 'column',
  }),
])

export const summary = style([
  tokens({
    marginBottom: 12,
  }),
])

export const tournamentRightCol = style([
  tokens({
    width: { 'xs-min': 'col-12', 'md-min': 'col-4' },
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  }),
])
