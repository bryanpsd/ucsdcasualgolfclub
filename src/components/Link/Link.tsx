import type { ComponentPropsWithRef, FC, MouseEvent } from "react";
import { forwardRef, memo } from "react";
import { isExternalUrl, trackLinkClick, trackOutboundLink } from "~utils/analytics";
import { concatClasses } from "~utils/concatClasses";
import type { LinkVariants } from "./Link.css";
import * as styles from "./Link.css";

export type LinkProps = ComponentPropsWithRef<"a"> &
	LinkVariants & {
		className?: string;
		track?: boolean;
		trackLabel?: string;
		trackCategory?: string;
		trackParams?: Record<string, unknown>;
		trackPriority?: "critical" | "standard" | "verbose";
	};

const LinkComponent: FC<LinkProps> = forwardRef<HTMLAnchorElement, LinkProps>(
	(
		{
			children,
			className,
			onClick,
			href = "#",
			track = true, // Auto-track links by default
			trackLabel,
			trackCategory,
			trackParams,
			trackPriority = "verbose", // Links default to verbose
			variant,
			underline,
			size,
			weight,
			...rest
		},
		ref,
	) => {
		const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
			// Track link click if enabled
			if (track && href) {
				const label = trackLabel || (typeof children === "string" ? children : href);

				if (isExternalUrl(href)) {
					trackOutboundLink(href, label, trackPriority);
				} else {
					trackLinkClick(
						href,
						label,
						{
							event_category: trackCategory || "navigation",
							...trackParams,
						},
						trackPriority,
					);
				}
			}

			onClick?.(e);
		};

		return (
			<a
				{...rest}
				ref={ref}
				href={href}
				onClick={handleClick}
				className={concatClasses([styles.link({ variant, underline, size, weight }), className])}
			>
				{children}
			</a>
		);
	},
);

LinkComponent.displayName = "Link";

export const Link = memo(LinkComponent);
