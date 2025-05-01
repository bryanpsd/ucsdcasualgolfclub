import * as NavMenu from '@radix-ui/react-navigation-menu'

import { useState, type PointerEventHandler } from 'react'
import { MainNavItem } from '../MainNavItem/MainNavItem'

import * as styles from './MainNav.css'

type NavigationLink = {
  label: string
  href?: string
  target?: string
  links?: NavigationLink[]
}

export type MainNavProps = {
  items: {
    label: string
    menuItems: NavigationLink[]
  }
  currentPath: string
}

const disableHoverInteraction: PointerEventHandler<HTMLElement> = (e) => {
  e.preventDefault()
}

export const MainNav = ({ items, currentPath }: MainNavProps) => {
  const [active, setActive] = useState('')
  return (
    <NavMenu.Root
      className={styles.mainNavRoot}
      value={active}
      onValueChange={(val) => setActive(val)}
    >
      <NavMenu.List className={styles.mainNavList}>
        {items.menuItems.map((item) => (
          <NavMenu.Item className={styles.mainNavItem} key={item.label}>
            {'href' in item ? (
              <NavMenu.Link asChild active={!!(item.href && currentPath.startsWith(item.href))}>
                <MainNavItem target={item.target} href={item.href} label={item.label} as="a" />
              </NavMenu.Link>
            ) : (
              <>
                <NavMenu.Trigger
                  className={styles.mainNavTrigger}
                  onPointerMove={disableHoverInteraction}
                  onPointerLeave={disableHoverInteraction}
                  asChild
                  style={{
                    textDecoration: currentPath.startsWith('/seasons') ? 'underline' : 'none',
                  }}
                >
                  <MainNavItem label={item.label} />
                </NavMenu.Trigger>
                <NavMenu.Content asChild>
                  <ul className={styles.mainNavContent}>
                    {item.links?.map((subItem) => (
                      <li key={subItem.label}>
                        <NavMenu.Link
                          className={styles.mainNavSubItem}
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
    </NavMenu.Root>
  )
}
