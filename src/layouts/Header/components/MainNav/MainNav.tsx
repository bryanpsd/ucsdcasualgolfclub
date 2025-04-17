import * as NavMenu from "@radix-ui/react-navigation-menu";

import {
  mainNavRoot,
  mainNavList,
  mainNavItem,
  mainNavTrigger,
  mainNavContent,
  mainNavSubItem,
  viewportPosition,
} from "./MainNav.css";
import { useState, type PointerEventHandler } from "react";
import { MainNavItem } from "../MainNavItem/MainNavItem";

type NavigationLink = {
  label: string;
  href?: string;
  target?: string;
  links?: NavigationLink[];
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
      className={mainNavRoot}
      value={active}
      onValueChange={(val) => setActive(val)}
    >
      <NavMenu.List className={mainNavList}>
        {items.menuItems.map((item) => (
          <NavMenu.Item className={mainNavItem} key={item.label}>
            {"href" in item ? (
              <NavMenu.Link
                asChild
                active={!!(item.href && currentPath.startsWith(item.href))}
              >
                <MainNavItem
                  target={item.target}
                  href={item.href}
                  label={item.label}
                  as="a"
                />
              </NavMenu.Link>
            ) : (
              <>
                <NavMenu.Trigger
                  className={mainNavTrigger}
                  onPointerMove={disableHoverInteraction}
                  onPointerLeave={disableHoverInteraction}
                  asChild
                  style={{
                    textDecoration: currentPath.startsWith("/seasons")
                      ? "underline"
                      : "none",
                  }}
                >
                  <MainNavItem label={item.label} />
                </NavMenu.Trigger>
                <NavMenu.Content asChild>
                  <ul className={mainNavContent}>
                    {item.links?.map((subItem) => (
                      <li key={subItem.label}>
                        <NavMenu.Link
                          className={mainNavSubItem}
                          href={subItem.href}
                          active={subItem.href === currentPath}
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
        ))}
      </NavMenu.List>
      <div className={viewportPosition}>
        <NavMenu.Viewport />
      </div>
    </NavMenu.Root>
  );
};
