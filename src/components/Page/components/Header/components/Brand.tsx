import { graphql, Link, useStaticQuery } from 'gatsby';
import GatsbyImage, { GatsbyImageFluidProps } from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

export const NavLinks = tw.ul`flex w-auto space-x-1 justify-end`;

const Logo = tw(GatsbyImage)`w-12 lg:w-16 h-12 lg:h-16`;

const Brand: React.FC = () => {
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

  return (
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
  );
};

export default Brand;
