import type { ElementType } from 'react';
import type { PolymorphicComponentProp } from 'types/PolymorphicComponent';
import { concatClasses } from '~utils/concatClasses';
import { responsiveHeadline } from './ResponsiveHeadline.css';

const defaultElement: ElementType = 'p';

type HeadlineProps<C extends ElementType = typeof defaultElement> =
  PolymorphicComponentProp<
    C,
    {
      size?: 1 | 2 | 3 | 4;
    }
  >;

export const ResponsiveHeadline = <C extends ElementType>({
  children,
  as: asComponent,
  size,
  className,
  ...rest
}: HeadlineProps<C>) => {
  const Element = asComponent || defaultElement;

  return (
    <Element
      className={concatClasses([responsiveHeadline({ size }), className])}
      {...rest}
    >
      {children}
    </Element>
  );
};
