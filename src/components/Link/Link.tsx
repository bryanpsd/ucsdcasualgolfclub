import { type ComponentPropsWithRef, forwardRef } from 'react'
import { concatClasses } from '~utils/concatClasses'
import { jumpLink as jumpLinkClass, link } from './Link.css'

export type LinkProps = ComponentPropsWithRef<'a'> & {
  jumpLink?: boolean
}

export const Link = forwardRef(
  ({ className, children, jumpLink, ...rest }: LinkProps, ref?: LinkProps['ref']) => {
    return (
      <a
        className={concatClasses([className, jumpLink ? jumpLinkClass : link])}
        ref={ref}
        {...rest}
      >
        {children}
      </a>
    )
  }
)

Link.displayName = 'Link'
