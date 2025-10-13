import { createElement, type ElementType, forwardRef, type ReactNode } from "react";
import { FaChevronDown } from "react-icons/fa6";
import { Typography } from "~components/Typography";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "~types/PolymorphicComponent";

import { concatClasses } from "~utils/concatClasses";

import * as styles from "./MainNavItem.css";

type MainNavItemProps<Element extends ElementType> = PolymorphicComponentPropWithRef<
	Element,
	{
		label?: string;
		icon?: ReactNode;
		hideLabelBelowDesktop?: boolean;
		hideLabel?: boolean;
		hideCaret?: boolean;
		isActive?: boolean;
	}
>;

export const MainNavItem = forwardRef(function MainNavItem<C extends ElementType>(
	{
		label,
		icon,
		as: asComponent,
		hideLabelBelowDesktop,
		hideLabel = false,
		className,
		hideCaret = false,
		...rest
	}: MainNavItemProps<C>,
	ref: PolymorphicRef<C>,
) {
	const Component = asComponent || "button";

	type ComponentProps = Record<string, unknown>;
	return (
		<Component ref={ref} {...rest} className={concatClasses([className, styles.mainNavItem])}>
			{icon ? (
				<span className={styles.iconWrapper}>
					{typeof icon === "function"
						? createElement(icon as React.ComponentType<ComponentProps>, {
								"aria-hidden": hideLabel ? true : undefined,
							})
						: icon}
				</span>
			) : null}
			<Typography
				as="span"
				fontWeight={500}
				color="inherit"
				variant="inherit"
				className={hideLabel ? "sr-only" : hideLabelBelowDesktop ? styles.hideBelowDesktop : ""}
			>
				{label}
			</Typography>

			{!hideCaret && !rest.href ? <FaChevronDown className={styles.mainNavItemArrow} /> : null}
		</Component>
	);
});
