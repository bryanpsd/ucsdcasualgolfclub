import { type ElementType, forwardRef } from 'react'
import { svgIcon, type SvgIconVariants } from './SvgIcon.css'
import type {
  PolymorphicComponentPropWithRef,
  PolymorphicRef,
} from '../../types/PolymorphicComponent'
import { concatClasses } from '../../utils/concatClasses'

export type SvgIconProps<C extends ElementType = 'svg'> = PolymorphicComponentPropWithRef<
  C,
  SvgIconVariants & {
    viewBox?: `0 0 ${number} ${number}`
    className?: string
    classes?: Partial<{
      root: string
    }>

    // Depreciated
    component?: ElementType
  }
>

export const SvgIcon = forwardRef(
  <C extends ElementType>(
    {
      as: asComponent,
      children,
      classes,
      className,
      color = 'inherit',
      size,
      titleAccess,
      viewBox = '0 0 24 24',
      ...rest
    }: SvgIconProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    if (rest.component) {
      // eslint-disable-next-line no-undef
      console.error('`component` prop is deprecated. Use `as` instead')
    }

    const Component = asComponent || 'svg'

    return (
      <Component
        className={concatClasses([classes?.root, className, svgIcon({ color, size })])}
        focusable="false"
        viewBox={viewBox}
        aria-hidden={titleAccess ? undefined : true}
        role={titleAccess ? 'img' : undefined}
        ref={ref}
        {...rest}
      >
        {children}
      </Component>
    )
  }
)
