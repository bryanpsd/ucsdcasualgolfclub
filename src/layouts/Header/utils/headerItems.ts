import type { MainNavProps } from '../components/MainNav';

// Generate dynamic links for past seasons
const getYear = new Date().getFullYear() - 1;
const pastSeasonsLinks = Array.from({ length: getYear - 2019 }, (_, i) => {
  const year = getYear - i;
  return {
    label: year.toString(),
    href: `/past-seasons/${year}`,
  };
});

export const menuItems: MainNavProps['items'] = {
  label: 'Main',
  menuItems: [
    {
      label: 'Tournament Schedule',
      href: '/tournament-schedule',
    },
    {
      label: 'Roster',
      href: '/roster',
    },
    {
      label: 'Past Seasons',
      links: pastSeasonsLinks,
    },
    {
      label: 'About',
      href: '/about',
    },
    {
      label: 'Join the Club',
      href: 'https://membership.scga.org/start/join/?cid=885',
    },
  ],
};
