import React from 'react';
import tw from 'twin.macro';

import { NavLinksMobile } from './NavLinks';
import { NavButton, NavButtonWrapMobile } from './NavButtons';

const Button = tw.button`
  lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white
`;

interface Props {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentPath?: string;
  links: [string, string][];
}

export const MobileMenuOpenButton: React.FC<Pick<Props, 'setIsOpen'>> = ({
  setIsOpen,
}) => (
  <Button
    type="button"
    aria-expanded="false"
    aria-haspopup="true"
    aria-label="show mobile menu"
    aria-controls="mobile-menu"
    onClick={() => setIsOpen(true)}
  >
    <span tw="sr-only">Open main menu</span>

    <svg
      tw="block h-6 w-6"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 6h16M4 12h16M4 18h16"
      />
    </svg>
  </Button>
);

export const MobileMenuCloseButton: React.FC<Pick<Props, 'setIsOpen'>> = ({
  setIsOpen,
}) => (
  <button
    aria-label="close menu"
    aria-pressed="true"
    aria-controls="mobile-menu"
    onClick={() => setIsOpen(false)}
  >
    <svg
      tw="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M6 18L18 6M6 6l12 12"
      ></path>
    </svg>
  </button>
);

export const MobileMenu: React.FC<Props> = ({
  isOpen,
  setIsOpen,
  currentPath,
  links,
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{ display: isOpen ? 'block' : 'none' }}
      id="mobile-menu"
      tw="lg:hidden z-50 fixed top-0 left-0 right-0 bottom-0"
      onClick={() => setIsOpen(false)}
    >
      <nav tw="z-50 fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-club-black-500 border-r overflow-y-auto">
        <div tw="flex items-center justify-end   mb-8">
          <MobileMenuCloseButton setIsOpen={setIsOpen} />
        </div>
        <div tw="flex flex-col h-full justify-between">
          <NavLinksMobile currentPath={currentPath} links={links} />

          <NavButtonWrapMobile>
            <NavButton label="Pay Subs" to="/register" />
            <NavButton label="Join" to="/join" color="black" />
          </NavButtonWrapMobile>
        </div>
      </nav>
    </div>
  );
};
