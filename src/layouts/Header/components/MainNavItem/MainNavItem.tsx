import { type ElementType, forwardRef, type ReactNode } from 'react'
import { Typography } from '~components/Typography'
import Caret from '~icons/caretDown.svg?react'
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '~types/PolymorphicComponent'

import { concatClasses } from '~utils/concatClasses'

import * as styles from './MainNavItem.css'

type MainNavItemProps<Element extends ElementType> = PolymorphicComponentPropWithRef<
  Element,
  {
    label?: string
    icon?: ReactNode
    hideLabelBelowDesktop?: boolean
    hideCaret?: boolean
    isActive?: boolean
  }
>

export const MainNavItem = forwardRef(function MainNavItem<C extends ElementType>(
  {
    label,
    icon,
    as: asComponent,
    hideLabelBelowDesktop,
    className,
    hideCaret = false,
    ...rest
  }: MainNavItemProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = asComponent || 'button'
  return (
    <Component ref={ref} {...rest} className={concatClasses([className, styles.mainNavItem])}>
      {icon}
      <Typography
        as="span"
        fontWeight={500}
        color="inherit"
        variant="inherit"
        className={hideLabelBelowDesktop ? styles.hideBelowDesktop : ''}
      >
        {label}
      </Typography>

      {!hideCaret && !rest.href ? <Caret height={20} className={styles.mainNavItemArrow} /> : null}
    </Component>
  )
})
