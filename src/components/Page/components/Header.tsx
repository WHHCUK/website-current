import { graphql, Link, useStaticQuery } from 'gatsby';
import GatsbyImage, { GatsbyImageFluidProps } from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

import useScrollBlock from '../../../hooks/useScrollBlock';

const Logo = tw(GatsbyImage)`w-12 lg:w-16 h-12 lg:h-16`;

const NavLink = tw(Link)`
block lg:inline-block
lg:bg-club-maroon-400 hover:bg-club-maroon-600
opacity-90 hover:opacity-100
px-3 py-2
rounded-md
font-medium
text-sm text-white
transition duration-700 ease-in-out
`;

const ActiveNavLink = tw(NavLink)`
  bg-club-black-400
  lg:bg-club-maroon-600
  opacity-100
`;

const Button = tw(Link)`
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

interface Props {
  currentPath?: string;
}

const Header: React.FC<Props> = ({ currentPath }) => {
  const { logo } = useStaticQuery<{
    logo: GatsbyImageFluidProps;
  }>(graphql`
    {
      logo: contentfulAsset(contentful_id: { eq: "5mHnjASUSvhCSL9JIoqVpl" }) {
        fluid(toFormat: WEBP) {
          ...GatsbyContentfulFluid
        }
      }
    }
  `);

  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  const [blockScroll, allowScroll] = useScrollBlock();

  React.useEffect(() => {
    menuIsOpen ? blockScroll() : allowScroll();
  }, [menuIsOpen]);

  return (
    <section tw="border-b-6 border-club-black-500 shadow-xl">
      <div tw="border-b-8 border-club-blue-500">
        <nav tw="z-40 fixed w-full lg:relative px-6 py-6 flex justify-between items-center bg-club-maroon-500">
          <Link
            tw="text-white text-3xl font-bold leading-none flex space-x-3 items-center"
            to="/"
          >
            <Logo fluid={logo.fluid} />
            <h1 tw="flex flex-col uppercase text-xl lg:text-3xl tracking-tight">
              <span>West Hampstead</span>
              <span>Hockey Club</span>
            </h1>
          </Link>

          <div tw="hidden lg:flex lg:w-auto lg:space-x-12 justify-end items-center">
            <ul tw="flex w-auto space-x-4 justify-end">
              {[
                ['News', '/news'],
                ['Events', '/events'],
                ['Fixtures', '/fixtures'],
                ['Teams', '/teams'],
                ['Photos', '/photos'],
                ['Club Info', '/club-info'],
              ].map(([title, to]) => (
                <li>
                  {currentPath?.startsWith(to) ? (
                    <ActiveNavLink to={to}>{title}</ActiveNavLink>
                  ) : (
                    <NavLink to={to}>{title}</NavLink>
                  )}
                </li>
              ))}
            </ul>

            <div tw="flex w-auto space-x-3 justify-end">
              <Button to="/register">Pay Subs</Button>
              <Button
                tw="bg-club-black-500 border-club-black-400 hover:bg-club-black-600 hover:border-club-blue-500 hover:text-club-blue-500"
                to="/join"
              >
                Join
              </Button>
            </div>
          </div>

          <button
            type="button"
            tw="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            aria-controls="mobile-menu"
            onClick={() => setMenuIsOpen(true)}
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
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </nav>

        {menuIsOpen && (
          <div
            tw="lg:hidden z-50 fixed top-0 left-0 right-0 bottom-0"
            onClick={() => setMenuIsOpen(false)}
          >
            <nav tw="z-50 fixed top-0 right-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-club-black-500 border-r overflow-y-auto">
              <div tw="flex items-center mb-8">
                <a
                  tw="mr-auto text-3xl font-bold leading-none"
                  href="#"
                  data-config-id="brand"
                  data-ol-has-click-handler=""
                >
                  <img
                    tw="h-10"
                    src="atis-assets/logo/atis/atis-mono-black.svg"
                    alt=""
                    width="auto"
                  />
                </a>
                <button onClick={() => setMenuIsOpen(false)}>
                  <svg
                    tw="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </button>
              </div>
              <div tw="flex flex-col h-full justify-between">
                <ul tw="space-y-4 w-full">
                  <li>
                    {currentPath === '/' ? (
                      <ActiveNavLink to="/">Home</ActiveNavLink>
                    ) : (
                      <NavLink to="/">Home</NavLink>
                    )}
                  </li>
                  {[
                    ['News', '/news'],
                    ['Events', '/events'],
                    ['Fixtures', '/fixtures'],
                    ['Teams', '/teams'],
                    ['Photos', '/photos'],
                    ['Club Info', '/club-info'],
                  ].map(([title, to]) => (
                    <li>
                      {currentPath?.startsWith(to) ? (
                        <ActiveNavLink to={to}>{title}</ActiveNavLink>
                      ) : (
                        <NavLink to={to}>{title}</NavLink>
                      )}
                    </li>
                  ))}
                </ul>
                <div tw="flex flex-col space-y-4">
                  <Button
                    tw="bg-club-black-400 border-club-black-300"
                    to="/register"
                  >
                    Pay Subs
                  </Button>
                  <Button tw="bg-club-blue-500 border-club-blue-600" to="/join">
                    Join
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </section>
  );
};

export default Header;
