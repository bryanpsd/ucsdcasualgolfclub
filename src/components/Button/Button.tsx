import type { FC } from "react";
import React, {
	type ElementType,
	forwardRef,
	type MouseEventHandler,
	memo,
	type ReactNode,
} from "react";
import type { PolymorphicComponentPropWithRef, PolymorphicRef } from "~types/PolymorphicComponent";
import { trackButtonClick } from "~utils/analytics";
import { concatClasses } from "~utils/concatClasses";
import { type ButtonVariants, button, buttonIcon, buttonLabel } from "./Button.css";

export type ButtonProps<C extends ElementType = "button"> = PolymorphicComponentPropWithRef<
	C,
	ButtonVariants & {
		"data-testid"?: string;
		href?: string | undefined;
		external?: boolean;
		type?: "button" | "reset" | "submit";
		startIcon?: ReactNode;
		endIcon?: ReactNode;
		className?: string;
		classes?: Partial<{
			root: string;
			label: string;
			startIcon: string;
			endIcon: string;
		}>;
		round?: boolean;
		// Analytics props
		track?: boolean;
		trackLabel?: string;
		trackCategory?: string;
		trackParams?: Record<string, unknown>;
		trackPriority?: "critical" | "standard" | "verbose";
	}
>;

type ChildrenProps = {
	startIcon?: ReactNode;
	endIcon?: ReactNode;
	size?: ButtonProps["size"];
	classes?: Partial<{
		label: string;
		startIcon: string;
		endIcon: string;
	}>;
	children?: ReactNode;
};

const Children: FC<ChildrenProps> = ({ startIcon, endIcon, size, classes, children }) => (
	<span className={concatClasses([buttonLabel, classes?.label])}>
		{startIcon ? (
			<span
				className={concatClasses([buttonIcon({ position: "start", size }), classes?.startIcon])}
			>
				{startIcon}
			</span>
		) : null}
		{children}
		{endIcon ? (
			<span className={concatClasses([buttonIcon({ position: "end", size }), classes?.endIcon])}>
				{endIcon}
			</span>
		) : null}
	</span>
);

const ButtonComponent = forwardRef(
	<C extends ElementType>(
		{
			as: asComponent,
			onClick,
			children,
			type = "button",
			className,
			classes,
			color,
			size,
			variant,
			startIcon,
			endIcon,
			track = false,
			trackLabel,
			trackCategory,
			trackParams,
			trackPriority = "standard",
			href,
			...rest
		}: ButtonProps<C>,
		ref: PolymorphicRef<C>,
	) => {
		const handleClick: MouseEventHandler = (e) => {
			// Track button click if enabled
			if (track) {
				const label =
					trackLabel ||
					(typeof children === "string" ? children : href ? String(href) : "button_click");

				trackButtonClick(
					label,
					{
						event_category: trackCategory || "button_interaction",
						button_variant: variant,
						button_color: color,
						button_size: size,
						...(href && { link_url: href }),
						...trackParams,
					},
					trackPriority,
				);
			}

			onClick?.(e as React.MouseEvent<HTMLButtonElement>);
		};

		const Component = asComponent || "button";

		return (
			<Component
				{...rest}
				onClick={handleClick}
				type={type}
				className={concatClasses([className, classes?.root, button({ color, size, variant })])}
				ref={ref}
				tabIndex={rest.disabled ? -1 : rest.tabIndex}
				href={href}
			>
				<Children startIcon={startIcon} endIcon={endIcon} size={size} classes={classes}>
					{children}
				</Children>
			</Component>
		);
	},
);

ButtonComponent.displayName = "Button";

export const Button = memo(ButtonComponent);
