import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { sprinkles } from '~styles/sprinkles.css';

export const header = style([
  sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: 'primary',
    paddingX: 2,
    paddingY: 4,
  }),
]);

export const brand = style([
  sprinkles({
    display: 'flex',
  }),
]);

export const brandLink = style([
  sprinkles({
    display: 'flex',
  }),
]);
