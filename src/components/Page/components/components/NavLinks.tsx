import { Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

const InactiveNavLink = tw(Link)`
    block lg:inline-block
    lg:bg-club-maroon-500 hover:bg-club-maroon-600
    opacity-90 hover:opacity-100
    px-3 py-3
    rounded-md
    font-medium
    text-sm text-white
    transition duration-700 ease-in-out
`;

const ActiveNavLink = tw(InactiveNavLink)`
  bg-club-black-400
  lg:bg-club-maroon-600
  opacity-100
`;

interface Props {
  currentPath: string;
  links: [string, string][];
}

const getLinks = ({ currentPath, links }: Props) =>
  links.map(([title, to]) => (
    <li key={to}>
      {currentPath === to ? (
        <ActiveNavLink to={to}>{title}</ActiveNavLink>
      ) : (
        <InactiveNavLink to={to}>{title}</InactiveNavLink>
      )}
    </li>
  ));

export const NavLinks: React.FC<Props> = ({ currentPath, links }) => (
  <ul tw="flex w-auto space-x-1 justify-end">
    {getLinks({ currentPath, links })}
  </ul>
);

export const NavLinksMobile: React.FC<Props> = ({ currentPath, links }) => (
  <ul tw="space-y-4 w-full">{getLinks({ currentPath, links })}</ul>
);
