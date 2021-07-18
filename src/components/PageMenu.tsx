import { Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

import RightIcon from '../assets/images/icons/right.svg';
import DownIcon from '../assets/images/icons/down.svg';

const Container = tw.ul`border border-gray-200 rounded-xl overflow-hidden`;
const NavItem = tw.li`block border-b hover:bg-club-blue-200`;
const ActiveNavItem = tw(NavItem)`bg-club-blue-200`;
const NavLink = tw(
  Link,
)`block px-4 py-2 text-sm text-gray-500 hover:text-gray-700`;
const ActiveNavLink = tw(NavLink)`text-gray-700`;

export const PageMenu: React.FC<{
  currentSlug: string;
  items: {
    title: string;
    shortName: string;
    slug: string;
  }[];
}> = ({ currentSlug, items }) => {
  return (
    <Container>
      {items.map(({ title, shortName, slug }) => {
        const isActive = currentSlug === `/${slug}/`;
        if (isActive) {
          return (
            <ActiveNavItem key={slug}>
              <ActiveNavLink title={title} to={`/${slug}`}>
                {shortName}
              </ActiveNavLink>
            </ActiveNavItem>
          );
        }

        return (
          <NavItem key={slug}>
            <NavLink title={title} to={`/${slug}`}>
              {shortName}
            </NavLink>
          </NavItem>
        );
      })}
    </Container>
  );
};

export const MobilePageMenu: React.FC<{
  currentSlug: string;
  items: {
    title: string;
    shortName: string;
    slug: string;
  }[];
}> = ({ currentSlug, items }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  if (items.map((i) => `/${i.slug}/`).includes(currentSlug)) {
    return (
      <nav tw="lg:hidden border border-gray-200 rounded-lg mb-8 overflow-hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          tw="w-full bg-club-black-500 text-white px-4 py-2 flex items-center"
        >
          <div tw="text-left flex-grow leading-tight">Menu</div>

          <img src={isOpen ? DownIcon : RightIcon} tw="h-6 w-6" />
        </button>
        {isOpen &&
          items.map(({ title, shortName, slug }) => {
            const isActive = currentSlug === `/${slug}/`;
            if (isActive) {
              return (
                <ActiveNavItem key={slug}>
                  <ActiveNavLink title={title} to={`/${slug}`}>
                    {shortName}
                  </ActiveNavLink>
                </ActiveNavItem>
              );
            }

            return (
              <NavItem key={slug}>
                <NavLink title={title} to={`/${slug}`}>
                  {shortName}
                </NavLink>
              </NavItem>
            );
          })}
      </nav>
    );
  }

  return null;
};
