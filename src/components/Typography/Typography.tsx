import { type ElementType, forwardRef } from 'react'

import {
  type PolymorphicComponentPropWithRef,
  type PolymorphicRef,
} from '../../types/PolymorphicComponent'
import { concatClasses } from '~utils/concatClasses'

import { type TypographyVariants, typography } from './Typography.css'

export type VariantNames = NonNullable<NonNullable<TypographyVariants>['variant']>

const defaultElement: ElementType = 'p'

export type TypographyProps<
  C extends ElementType = typeof defaultElement,
  V extends VariantNames = VariantNames,
> = PolymorphicComponentPropWithRef<
  C,
  TypographyVariants & {
    variant?: V
    className?: string
  }
>

export const Typography = forwardRef(function TypographyComponent<
  C extends ElementType = typeof defaultElement,
>(
  {
    as: asComponent,
    align,
    className,
    color,
    display,
    noWrap = false,
    variant = 'bodyMd',
    children,
    fontWeight,
    decoration,
    ...rest
  }: TypographyProps<C>,
  ref: PolymorphicRef<C>
) {
  const Component = asComponent ?? defaultElement

  return (
    <Component
      className={concatClasses([
        className,
        typography({
          variant,
          color,
          display,
          noWrap,
          align,
          fontWeight,
          decoration,
        }),
      ])}
      ref={ref}
      {...rest}
    >
      {children}
    </Component>
  )
})

// @ts-expect-error - Disabling error because forwardRef declaration in react-augment.d.ts
// doesn't currently have the displayName property for React components
Typography.displayName = 'Typography'
