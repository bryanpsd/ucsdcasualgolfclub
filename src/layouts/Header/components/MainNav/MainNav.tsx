import * as NavMenu from "@radix-ui/react-navigation-menu";
import { createElement, type PointerEventHandler, type ReactNode, useState } from "react";
import { FaRegEnvelope } from "react-icons/fa";
import { trackNavClick } from "~/utils/analytics";
import { MainNavItem } from "../MainNavItem/MainNavItem";
import * as itemStyles from "../MainNavItem/MainNavItem.css";

import * as styles from "./MainNav.css";

type NavigationLink = {
	label: string;
	href?: string;
	target?: string;
	links?: NavigationLink[];
	icon?: ReactNode;
	hideLabel?: boolean;
};

export type MainNavProps = {
	items: {
		label: string;
		menuItems: NavigationLink[];
	};
	currentPath: string;
};

const disableHoverInteraction: PointerEventHandler<HTMLElement> = (e) => {
	e.preventDefault();
};

export const MainNav = ({ items, currentPath }: MainNavProps) => {
	const [active, setActive] = useState("");
	return (
		<NavMenu.Root
			className={styles.mainNavRoot}
			value={active}
			onValueChange={(val) => setActive(val)}
		>
			<NavMenu.List className={styles.mainNavList}>
				{items.menuItems.map((item) => {
					let iconNode = item.icon as ReactNode | undefined;

					// map string keys to actual icon components
					if (item.icon === "mail") {
						// icon is decorative when hideLabel is used; do not set title when aria-hidden
						iconNode = createElement(FaRegEnvelope, {
							"aria-hidden": true,
							className: `${itemStyles.navIcon} ${itemStyles.reactIcon}`,
						});
					}

					return (
						<NavMenu.Item className={styles.mainNavItem} key={item.label}>
							{"href" in item ? (
								<NavMenu.Link asChild active={!!(item.href && currentPath.startsWith(item.href))}>
									<MainNavItem
										target={item.target}
										href={item.href}
										label={item.label}
										icon={iconNode}
										hideLabel={item.hideLabel}
										as="a"
										data-key={item.href === "/contact" ? "contact" : undefined}
										onClick={() =>
											trackNavClick(item.label, item.href, {
												navType: "main",
												navLocation: "desktop_main_nav",
											})
										}
									/>
								</NavMenu.Link>
							) : (
								<>
									<NavMenu.Trigger
										className={styles.mainNavTrigger}
										onPointerMove={disableHoverInteraction}
										onPointerLeave={disableHoverInteraction}
										asChild
										style={{
											textDecoration: currentPath.startsWith("/seasons") ? "underline" : "none",
										}}
									>
										<MainNavItem label={item.label} icon={iconNode} hideLabel={item.hideLabel} />
									</NavMenu.Trigger>
									<NavMenu.Content asChild>
										<ul className={styles.mainNavContent}>
											{item.links?.map((subItem) => (
												<li key={subItem.label}>
													<NavMenu.Link
														className={styles.mainNavSubItem}
														href={subItem.href}
														active={subItem.href === currentPath}
														onClick={() =>
															trackNavClick(subItem.label, subItem.href, {
																navType: "sub",
																navLocation: "desktop_main_nav",
															})
														}
													>
														{subItem.label}
													</NavMenu.Link>
												</li>
											))}
										</ul>
									</NavMenu.Content>
								</>
							)}
						</NavMenu.Item>
					);
				})}
			</NavMenu.List>
		</NavMenu.Root>
	);
};
