import type { MainNavProps } from '../components/MainNav'

// Generate dynamic links for Seasons
const getYear = new Date().getFullYear() - 1
const pastSeasonsLinks = Array.from({ length: getYear - 2018 }, (_, i) => {
  const year = getYear - i
  return {
    label: year.toString(),
    href: `/seasons/${year}`,
  }
})

export const menuItems: MainNavProps['items'] = {
  label: 'Main',
  menuItems: [
    {
      label: 'Tournaments',
      href: '/tournaments',
    },
    {
      label: 'Roster',
      href: '/roster',
    },
    {
      label: 'Seasons',
      links: pastSeasonsLinks,
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Join the Club',
      href: 'https://membership.scga.org/start/join/?cid=885',
      target: '_blank',
    },
  ],
}
