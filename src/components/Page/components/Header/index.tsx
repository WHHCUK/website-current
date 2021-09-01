import React from 'react';
import tw from 'twin.macro';

import useScrollBlock from '../../../../hooks/useScrollBlock';
import Brand from '../../../Brand';

import {
  MobileMenu,
  MobileMenuOpenButton,
} from '../Footer/components/MobileMenu';
import { NavButton, NavButtonWrap } from './components/NavButtons';
import { NavLinks } from './components/NavLinks';

export type NavLinksType = [string, string][];

const Container = tw.section`
    border-b-6 border-club-black-500 shadow-xl
`;

const Header: React.FC = () => {
  const navLinks: NavLinksType = [
    ['News', '/news/'],
    // ['Events', '/events/'],
    // ['Fixtures', '/fixtures/'],
    // ['Teams', '/teams/'],
    ['Photos', '/photos/'],
    ['Club Info', '/about-us/'],
  ];

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  React.useEffect(() => {
    menuIsOpen ? blockScroll() : allowScroll();
  }, [menuIsOpen]);

  return (
    <Container>
      <div tw="border-b-8 border-club-blue-500">
        <nav tw="z-40 fixed w-full lg:relative px-6 py-6 flex justify-between items-center bg-club-maroon-500">
          <Brand />

          <div tw="hidden lg:flex lg:w-auto lg:space-x-12 justify-end items-center">
            <NavLinks links={navLinks} />

            <NavButtonWrap>
              <NavButton label="Pay Subs" to="/membership-fees" />
              <NavButton label="Join" to="/join" color="black" />
            </NavButtonWrap>
          </div>

          <MobileMenuOpenButton setIsOpen={setMenuIsOpen} />
        </nav>

        <MobileMenu
          isOpen={menuIsOpen}
          setIsOpen={setMenuIsOpen}
          links={navLinks}
        />
      </div>
    </Container>
  );
};

export default Header;
