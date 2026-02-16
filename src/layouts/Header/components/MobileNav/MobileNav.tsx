import * as NavMenu from "@radix-ui/react-navigation-menu";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { trackNavClick } from "~/utils/analytics";
import { Sheet } from "~components/Sheet/Sheet";
import { disableHover } from "~layouts/Header/utils/disableHover";
import type { MainNavProps } from "../MainNav";
import { MainNavItem } from "./../MainNavItem/MainNavItem";

import * as styles from "./MobileNav.css";

type MobileNavProps = MainNavProps & {
	items: {
		label: string;
	};
};

type NavigationItem = MainNavProps["items"]["menuItems"][number];

export const MobileNav = ({ items }: MobileNavProps) => {
	const [open, setOpen] = useState(false);
	return (
		<div className={styles.mobileNavRoot}>
			<NavMenu.Root>
				<ul>
					<NavMenu.Item>
						<Sheet
							open={open}
							trigger={
								<MainNavItem
									as="button"
									label="Navigation Menu"
									data-mobile-nav-item="true"
									onClick={() => setOpen(true)}
									icon={<IoMenu className={styles.menuIcon} size={28} />}
									hideLabelBelowDesktop
									hideCaret
									className={styles.mobileNavIcon}
								/>
							}
							onOpenChange={(o) => {
								setOpen(o);
							}}
							title="Navigation Menu"
						>
							<NavMenu.Root orientation="vertical">
								<NavMenu.List>
									{items.menuItems.map((m) => {
										return <NavItem item={m} key={m.label} />;
									})}
								</NavMenu.List>
							</NavMenu.Root>
						</Sheet>
					</NavMenu.Item>
				</ul>
			</NavMenu.Root>
		</div>
	);
};

function NavItem({ item }: { item: NavigationItem }) {
	return (
		<NavMenu.Item key={item.label}>
			{"href" in item ? (
				<NavMenu.Link asChild>
					<MainNavItem
						className={styles.mobileNavItem}
						data-mobile-nav-item="true"
						label={item.label}
						href={item.href}
						as="a"
						target={item.target}
						onClick={() =>
							trackNavClick(item.label, item.href, { navType: "main", navLocation: "mobile_nav" })
						}
					/>
				</NavMenu.Link>
			) : (
				<>
					<NavMenu.Trigger {...disableHover} asChild value={item.label} className={styles.trigger}>
						<MainNavItem
							className={styles.mobileNavItem}
							data-mobile-nav-item="true"
							label={item.label}
						/>
					</NavMenu.Trigger>

					<NavMenu.Content {...disableHover} asChild>
						<ul>
							{item.links?.map((l) => {
								// Handle select dropdown
								if (l.isSelect && l.links) {
									return (
										<li key={l.label} className={styles.mobileNavSelectItem}>
											<label htmlFor={`mobile-select-${l.label}`} className={styles.mobileNavLabel}>
												{l.label}
											</label>
											<select
												id={`mobile-select-${l.label}`}
												className={styles.mobileNavSelect}
												onChange={(e) => {
													const selectedItem = l.links?.find(
														(link) => link.href === e.target.value,
													);
													if (selectedItem) {
														trackNavClick(selectedItem.label, selectedItem.href, {
															navType: "sub",
															navLocation: "mobile_nav",
														});
														window.location.href = e.target.value;
													}
												}}
												defaultValue=""
											>
												<option value="" disabled>
													Select a year
												</option>
												{l.links.map((nestedItem) => (
													<option key={nestedItem.label} value={nestedItem.href}>
														{nestedItem.label}
													</option>
												))}
											</select>
										</li>
									);
								}
								// Handle nested links (non-select)
								if (l.links) {
									return (
										<li key={l.label}>
											<div className={styles.mobileNavSubsection}>
												<span className={styles.mobileNavSubsectionTitle}>{l.label}</span>
												<ul className={styles.mobileNavSubList}>
													{l.links.map((nestedItem) => (
														<li key={nestedItem.label}>
															<NavMenu.Link asChild>
																<MainNavItem
																	as="a"
																	className={styles.mobileNavNestedItem}
																	data-mobile-nav-item="true"
																	label={nestedItem.label}
																	href={nestedItem.href}
																	target={nestedItem.target}
																	onClick={() =>
																		trackNavClick(nestedItem.label, nestedItem.href, {
																			navType: "sub",
																			navLocation: "mobile_nav",
																		})
																	}
																/>
															</NavMenu.Link>
														</li>
													))}
												</ul>
											</div>
										</li>
									);
								}
								// Handle regular links
								return (
									<li key={l.label}>
										<NavMenu.Link asChild>
											<MainNavItem
												as="a"
												className={styles.mobileNavItem}
												data-mobile-nav-item="true"
												label={l.label}
												href={l.href}
												target={l.target}
												onClick={() =>
													trackNavClick(l.label, l.href, {
														navType: "sub",
														navLocation: "mobile_nav",
													})
												}
											/>
										</NavMenu.Link>
									</li>
								);
							})}
						</ul>
					</NavMenu.Content>
				</>
			)}
		</NavMenu.Item>
	);
}
