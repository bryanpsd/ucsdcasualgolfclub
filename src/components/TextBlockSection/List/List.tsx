import type { ReactNode } from 'react'
import { type TypographyProps, Typography } from '~components/Typography'
import { list, listItem } from './List.css'

type ListProps = {
  variant?: TypographyProps['variant']
  ordered?: boolean
  children?: ReactNode
}

export const List = ({ variant, ordered, children }: ListProps) => {
  return (
    <Typography variant={variant} as={ordered ? 'ol' : 'ul'} className={list({ ordered })}>
      {children}
    </Typography>
  )
}

export type ListItemProps = {
  children?: ReactNode
}

export const ListItem = ({ children }: ListItemProps) => {
  return (
    <Typography as="li" variant="inherit" className={listItem}>
      {children}
    </Typography>
  )
}
