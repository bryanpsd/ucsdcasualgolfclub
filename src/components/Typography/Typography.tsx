import { type ElementType, forwardRef, memo } from "react";

import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "~types/PolymorphicComponent";
import { concatClasses } from "~utils/concatClasses";

import { type TypographyVariants, typography } from "./Typography.css";

export type VariantNames = NonNullable<NonNullable<TypographyVariants>["variant"]>;

const defaultElement: ElementType = "p";

export type TypographyProps<
	C extends ElementType = typeof defaultElement,
	V extends VariantNames = VariantNames,
> = PolymorphicComponentPropWithRef<
	C,
	TypographyVariants & {
		variant?: V;
		className?: string;
	}
>;

const TypographyBase = forwardRef<HTMLParagraphElement, TypographyProps<ElementType>>(
	function TypographyComponent<C extends ElementType = typeof defaultElement>(
		{
			as: asComponent,
			align,
			className,
			color,
			display,
			noWrap = false,
			variant = "bodyMd",
			children,
			fontWeight,
			decoration,
			...rest
		}: TypographyProps<C>,
		ref: PolymorphicRef<C>,
	) {
		const Component = asComponent ?? defaultElement;

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
		);
	},
);

TypographyBase.displayName = "Typography";

export const Typography = memo(TypographyBase);
