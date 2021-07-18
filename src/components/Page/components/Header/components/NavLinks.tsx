import { Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

import { NavLinksType } from '../index';

const NavLink = tw(Link)`
    flex lg:inline-block
    lg:bg-club-maroon-500 hover:bg-club-maroon-600
    opacity-90 hover:opacity-100
    px-3 py-3
    rounded-md
    font-medium
    text-sm text-white
    transition duration-700 ease-in-out
`;

interface Props {
  links: NavLinksType;
}

export const NavLinks: React.FC<Props> = ({ links }) => (
  <ul role="menu" tw="flex w-auto space-x-1 justify-end">
    {links.map(([title, to]) => (
      <li key={to} role="none">
        <NavLink role="menuitem" to={to}>
          {title}
        </NavLink>
      </li>
    ))}
  </ul>
);

export const NavLinksMobile: React.FC<Props> = ({ links }) => (
  <ul role="menu" tw="space-y-4 w-full">
    {links.map(([title, to]) => (
      <li key={to} role="none">
        <NavLink role="menuitem" to={to}>
          {title}
        </NavLink>
      </li>
    ))}
  </ul>
);
