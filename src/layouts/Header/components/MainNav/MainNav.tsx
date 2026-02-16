import * as NavMenu from "@radix-ui/react-navigation-menu";
import { createElement, type PointerEventHandler, type ReactNode, useState } from "react";
import { FaInstagram, FaRegEnvelope } from "react-icons/fa";
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
	isSelect?: boolean;
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
					} else if (item.icon === "instagram") {
						iconNode = createElement(FaInstagram, {
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
													{subItem.isSelect && subItem.links ? (
														<div className={styles.mainNavSubsection}>
															<label
																htmlFor={`select-${subItem.label}`}
																className={styles.mainNavSubsectionTitle}
															>
																{subItem.label}
															</label>
															<select
																id={`select-${subItem.label}`}
																className={styles.mainNavSelect}
																onChange={(e) => {
																	const selectedItem = subItem.links?.find(
																		(link) => link.href === e.target.value,
																	);
																	if (selectedItem) {
																		trackNavClick(selectedItem.label, selectedItem.href, {
																			navType: "sub",
																			navLocation: "desktop_main_nav",
																		});
																		window.location.href = e.target.value;
																	}
																}}
																defaultValue=""
															>
																<option value="" disabled>
																	Select a year
																</option>
																{subItem.links.map((nestedItem) => (
																	<option key={nestedItem.label} value={nestedItem.href}>
																		{nestedItem.label}
																	</option>
																))}
															</select>
														</div>
													) : subItem.links ? (
														<div className={styles.mainNavSubsection}>
															<span className={styles.mainNavSubsectionTitle}>{subItem.label}</span>
															<ul className={styles.mainNavSubList}>
																{subItem.links.map((nestedItem) => (
																	<li key={nestedItem.label}>
																		<NavMenu.Link
																			className={styles.mainNavNestedItem}
																			href={nestedItem.href}
																			active={nestedItem.href === currentPath}
																			target={nestedItem.target}
																			onClick={() =>
																				trackNavClick(nestedItem.label, nestedItem.href, {
																					navType: "sub",
																					navLocation: "desktop_main_nav",
																				})
																			}
																		>
																			{nestedItem.label}
																		</NavMenu.Link>
																	</li>
																))}
															</ul>
														</div>
													) : (
														<NavMenu.Link
															className={styles.mainNavSubItem}
															href={subItem.href}
															active={subItem.href === currentPath}
															target={subItem.target}
															onClick={() =>
																trackNavClick(subItem.label, subItem.href, {
																	navType: "sub",
																	navLocation: "desktop_main_nav",
																})
															}
														>
															{subItem.label}
														</NavMenu.Link>
													)}
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
