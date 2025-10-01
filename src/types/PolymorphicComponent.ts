import type {
	ComponentPropsWithoutRef,
	ComponentPropsWithRef,
	ElementType,
	PropsWithChildren,
} from "react"

export type PolymorphicRef<C extends ElementType> =
	ComponentPropsWithRef<C>["ref"]

type AsProp<C extends ElementType> = {
	as?: C
}

type PropsToOmit<C extends ElementType, P> = keyof (AsProp<C> & P)

export type PolymorphicComponentProp<
	C extends ElementType,
	Props = object,
> = PropsWithChildren<Props & AsProp<C>> &
	Omit<ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>

export type PolymorphicComponentPropWithRef<
	C extends ElementType,
	Props = object,
> = PolymorphicComponentProp<C, Props> & { ref?: PolymorphicRef<C> }
