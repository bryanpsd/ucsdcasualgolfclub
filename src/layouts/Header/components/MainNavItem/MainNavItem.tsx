import { forwardRef, type ElementType, type ReactNode } from 'react';
import Caret from '../../../../icons/caretDown.svg?react';
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../../../types/PolymorphicComponent';

import * as styles from './MainNavItem.css';
import { concatClasses } from '../../../../utils/concatClasses';
import { Typography } from '~components/Typography';

type MainNavItemProps<Element extends ElementType> =
  PolymorphicComponentPropWithRef<
    Element,
    {
      label?: string;
      icon?: ReactNode;
      hideLabelBelowDesktop?: boolean;
      hideCaret?: boolean;
    }
  >;

export const MainNavItem = forwardRef(function MainNavItem<
  C extends ElementType
>(
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
  const Component = asComponent || 'button';
  return (
    <Component
      ref={ref}
      {...rest}
      className={concatClasses([className, styles.mainNavItem])}
    >
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

      {!hideCaret && !rest.href ? (
        <Caret height={20} className={styles.mainNavItemArrow} />
      ) : null}
    </Component>
  );
});
