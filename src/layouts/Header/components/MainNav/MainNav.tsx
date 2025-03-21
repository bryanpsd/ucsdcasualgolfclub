import * as NavMenu from '@radix-ui/react-navigation-menu';
import Caret from '../../../../icons/caretDown.svg?react';

import {
  arrow,
  mainNavRoot,
  mainNavList,
  mainNavItem,
  mainNavTrigger,
  mainNavContent,
  viewportPosition,
} from './MainNav.css';
import { useState, type PointerEventHandler } from 'react';
import { MainNavItem } from '../MainNavItem/MainNavItem';

type NavigationLink = {
  label: string;
  href?: string;
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
  const [active, setActive] = useState('');
  return (
    <NavMenu.Root
      className={mainNavRoot}
      value={active}
      onValueChange={(val) => setActive(val)}
    >
      <NavMenu.List className={mainNavList}>
        {items.menuItems.map((item) => (
          <NavMenu.Item className={mainNavItem} key={item.label}>
            {'href' in item ? (
              <NavMenu.Link asChild active={item.href === currentPath}>
                <MainNavItem href={item.href} label={item.label} as="a" />
              </NavMenu.Link>
            ) : (
              <>
                <NavMenu.Trigger
                  className={mainNavTrigger}
                  onPointerMove={disableHoverInteraction}
                  onPointerLeave={disableHoverInteraction}
                  asChild
                >
                  <MainNavItem label={item.label} />
                </NavMenu.Trigger>
                <NavMenu.Content>
                  <div className={mainNavContent}>
                    <ul>
                      {item.links?.map((subItem) => (
                        <li key={subItem.label}>
                          <NavMenu.Link href={subItem.href}>
                            {subItem.label}
                          </NavMenu.Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </NavMenu.Content>
              </>
            )}
          </NavMenu.Item>
        ))}
        <NavMenu.Indicator className="NavigationMenuIndicator">
          <div className={arrow} />
        </NavMenu.Indicator>
      </NavMenu.List>
      <div className={viewportPosition}>
        <NavMenu.Viewport />
      </div>
    </NavMenu.Root>
  );
};
