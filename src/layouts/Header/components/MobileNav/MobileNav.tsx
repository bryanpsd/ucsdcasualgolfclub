import { useState } from 'react'
import * as NavMenu from '@radix-ui/react-navigation-menu'

import { disableHover } from '~layouts/Header/utils/disableHover'
import Menu from '../../../../icons/menu.svg?react'

import { Sheet } from '~components/Sheet/Sheet'
import { MainNavItem } from './../MainNavItem/MainNavItem'

import type { MainNavProps } from '../MainNav'

import * as styles from './MobileNav.css'

type MobileNavProps = MainNavProps & {
  items: {
    label: string
  }
}

type NavigationItem = MainNavProps['items']['menuItems'][number]

export const MobileNav = ({ items }: MobileNavProps) => {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.mobileNavRoot}>
      <NavMenu.Root>
        <NavMenu.List role="list">
          <NavMenu.Item>
            <Sheet
              open={open}
              trigger={
                <MainNavItem
                  as="button"
                  label="Navigation Menu"
                  onClick={() => setOpen(true)}
                  icon={<Menu className={styles.menuIcon} height={28} />}
                  hideLabelBelowDesktop
                  hideCaret
                  className={styles.mobileNavIcon}
                />
              }
              onOpenChange={(o) => {
                setOpen(o)
              }}
              title="Navigation Menu"
            >
              <NavMenu.Root orientation="vertical">
                <NavMenu.List>
                  {items.menuItems.map((m) => {
                    return <NavItem item={m} key={m.label} />
                  })}
                </NavMenu.List>
              </NavMenu.Root>
            </Sheet>
          </NavMenu.Item>
        </NavMenu.List>
      </NavMenu.Root>
    </div>
  )
}

function NavItem({ item }: { item: NavigationItem }) {
  return (
    <NavMenu.Item key={item.label}>
      {'href' in item ? (
        <NavMenu.Link asChild>
          <MainNavItem
            className={styles.mobileNavItem}
            label={item.label}
            href={item.href}
            as="a"
            target={item.target}
          />
        </NavMenu.Link>
      ) : (
        <>
          <NavMenu.Trigger {...disableHover} asChild value={item.label} className={styles.trigger}>
            <MainNavItem className={styles.mobileNavItem} label={item.label} />
          </NavMenu.Trigger>

          <NavMenu.Content {...disableHover} asChild>
            <ul>
              {item.links?.map((l, i) => {
                return (
                  <li key={l.label + i}>
                    <NavMenu.Link asChild>
                      <MainNavItem
                        as="a"
                        className={styles.mobileNavItem}
                        label={l.label}
                        href={l.href}
                      />
                    </NavMenu.Link>
                  </li>
                )
              })}
            </ul>
          </NavMenu.Content>
        </>
      )}
    </NavMenu.Item>
  )
}
