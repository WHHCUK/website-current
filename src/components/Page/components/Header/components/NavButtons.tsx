import { Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

export const NavButtonWrap = tw.div`w-auto space-x-3 justify-end`;
export const NavButtonWrapMobile = tw.div`flex flex-col space-y-4`;

const StyledNavButton = tw(Link)`
  text-center
  min-w-28
  inline-block lg:ml-auto
  py-2 px-3
  text-sm text-white
  font-bold
  transition duration-700 
  border-2 border-gray-100 hover:border-white rounded-xl
  hover:bg-club-maroon-400
`;

const BlackNavButton = tw(StyledNavButton)`
  bg-club-black-500 hover:bg-club-black-600
  border-club-black-400 hover:border-club-blue-500
  text-white hover:text-club-blue-500
`;

interface Props {
  label: string;
  to: string;
  color?: 'default' | 'black';
}

export const NavButton: React.FC<Props> = ({ label, to, color }) => {
  switch (color) {
    case 'black':
      return <BlackNavButton to={to}>{label}</BlackNavButton>;
    default:
      return <StyledNavButton to={to}>{label}</StyledNavButton>;
  }
};
