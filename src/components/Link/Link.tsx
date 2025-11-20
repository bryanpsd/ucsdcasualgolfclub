import type { ComponentPropsWithRef, FC, MouseEvent } from "react";
import { forwardRef } from "react";
import { concatClasses } from "~utils/concatClasses";
import { trackLinkClick, trackOutboundLink, isExternalUrl } from "~utils/analytics";
import * as styles from "./Link.css";
import type { LinkVariants } from "./Link.css";

export type LinkProps = ComponentPropsWithRef<"a"> & 
    LinkVariants & {
    className?: string;
    track?: boolean;
    trackLabel?: string;
    trackCategory?: string;
    trackParams?: Record<string, unknown>;
};

export const Link: FC<LinkProps> = forwardRef<HTMLAnchorElement, LinkProps>(
    ({ 
        children, 
        className, 
        onClick, 
        href = "#",
        track = true, // Auto-track links by default
        trackLabel,
        trackCategory,
        trackParams,
        variant,
        underline,
        size,
        weight,
        ...rest 
    }, ref) => {
        const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
            // Track link click if enabled
            if (track && href) {
                const label = trackLabel || (typeof children === "string" ? children : href);
                
                if (isExternalUrl(href)) {
                    trackOutboundLink(href, label);
                } else {
                    trackLinkClick(href, label, {
                        event_category: trackCategory || "navigation",
                        ...trackParams,
                    });
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

Link.displayName = "Link";