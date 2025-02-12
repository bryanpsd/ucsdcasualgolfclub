import * as NavMenu from '@radix-ui/react-navigation-menu';

export const MainNav = () => {
  return (
    <NavMenu.Root>
      <NavMenu.Item>
        <NavMenu.Link href="/tournament-schedule">
          Tournament Schedule
        </NavMenu.Link>
      </NavMenu.Item>
      <NavMenu.Item>
        <NavMenu.Link href="/roster">Roster</NavMenu.Link>
      </NavMenu.Item>
      <NavMenu.Item>
        <NavMenu.Link href="/about">About</NavMenu.Link>
      </NavMenu.Item>
      <NavMenu.Item>
        <NavMenu.Link href="/contact">Past Seasons</NavMenu.Link>
      </NavMenu.Item>
      <NavMenu.Item>
        <NavMenu.Link
          target="_blank"
          href="https://membership.scga.org/start/join/?cid=885"
        >
          Join the Club
        </NavMenu.Link>
      </NavMenu.Item>
    </NavMenu.Root>
  );
};
