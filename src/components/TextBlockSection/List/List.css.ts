import { style } from '@vanilla-extract/css'
import { recipe } from '@vanilla-extract/recipes'
import { tokens } from '~styles/designTokens.css'

export const list = recipe({
  base: [
    tokens({
      fontSize: 'inherit',
      marginTop: 24,
      paddingLeft: 20,
      marginBottom: 24,
    }),
    {
      listStyleType: 'disc', // reset.css is setting this to none
      ':first-child': {
        marginTop: 0,
      },
    },
  ],
  variants: {
    ordered: {
      true: {
        listStyleType: 'decimal', // reset.css is setting this to none
      },
    },
  },
})

export const listItem = style({
  selectors: {
    '&:not(:first-child)': {
      marginTop: 20,
    },
  },
})
