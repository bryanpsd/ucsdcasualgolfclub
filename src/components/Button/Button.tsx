import React, { type ElementType, type MouseEventHandler, type ReactNode, forwardRef } from 'react'

import { type ButtonVariants, button, buttonIcon, buttonLabel } from './Button.css'

import { concatClasses } from '~utils/concatClasses'

import type { PolymorphicComponentPropWithRef, PolymorphicRef } from '~types/PolymorphicComponent'

export type ButtonProps<C extends ElementType = 'button'> = PolymorphicComponentPropWithRef<
  C,
  ButtonVariants & {
    'data-testid'?: string
    href?: string | undefined
    external?: boolean
    type?: 'button' | 'reset' | 'submit'
    startIcon?: ReactNode
    endIcon?: ReactNode
    className?: string
    classes?: Partial<{
      root: string
      label: string
      startIcon: string
      endIcon: string
    }>
    round?: boolean
  }
>

export const Button = forwardRef(
  <C extends ElementType>(
    {
      as: asComponent,
      onClick,
      children,
      type = 'button',
      className,
      classes,
      color,
      size,
      variant,
      startIcon,
      endIcon,
      ...rest
    }: ButtonProps<C>,
    ref: PolymorphicRef<C>
  ) => {
    const handleClick: MouseEventHandler = (e) => {
      onClick && onClick(e as React.MouseEvent<HTMLButtonElement>)
    }

    const Children = () => {
      return (
        <span className={concatClasses([buttonLabel, classes?.label])}>
          {startIcon && (
            <span
              className={concatClasses([
                buttonIcon({ position: 'start', size }),
                classes?.startIcon,
              ])}
            >
              {startIcon}
            </span>
          )}
          {children}
          {endIcon && (
            <span
              className={concatClasses([buttonIcon({ position: 'end', size }), classes?.endIcon])}
            >
              {endIcon}
            </span>
          )}
        </span>
      )
    }

    const Component = asComponent || 'button'

    return (
      <Component
        {...rest}
        onClick={handleClick}
        type={type}
        className={concatClasses([className, classes?.root, button({ color, size, variant })])}
        ref={ref}
        tabIndex={rest.disabled ? -1 : rest.tabIndex}
      >
        <Children />
      </Component>
    )
  }
)
