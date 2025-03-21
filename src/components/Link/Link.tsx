import { type ComponentPropsWithRef, forwardRef } from 'react';
import { concatClasses } from '../../utils/concatClasses';
import { link, jumpLink as jumpLinkClass } from './Link.css';

export type LinkProps = ComponentPropsWithRef<'a'> & {
  jumpLink?: boolean;
};

export const Link = forwardRef(
  (
    { className, children, jumpLink, ...rest }: LinkProps,
    ref?: LinkProps['ref']
  ) => {
    return (
      <a
        className={concatClasses([className, jumpLink ? jumpLinkClass : link])}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    );
  }
);

// @ts-expect-error - Disabling error because forwardRef declaration in react-augment.d.ts
// doesn't currently have the displayName property for React components
Link.displayName = 'Link';
