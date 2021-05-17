import { graphql, useStaticQuery } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';

import Container from './Container';
import { Affiliate } from '../utils/contentful';
import ExternalLink from './ExternalLink';

const Wrap = tw.section`py-8 bg-white`;
const ImageContainer = tw(ExternalLink)`w-48 p-2`;
const Image = tw(GatsbyImage)``;

interface QueryData {
  contentfulHomepage: {
    affiliateHeading?: string;
    affiliates: Affiliate[];
  };
}

export const query = graphql`
  query AffiliateSection {
    contentfulHomepage(name: { eq: "Home Page" }) {
      affiliateHeading
      affiliates {
        name
        url
        logo {
          fluid(
            toFormat: WEBP
            quality: 90
            maxHeight: 200
            resizingBehavior: PAD
          ) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`;

const AffiliateSection: React.FC = () => {
  const {
    contentfulHomepage: { affiliateHeading, affiliates },
  } = useStaticQuery<QueryData>(query);

  return (
    <Wrap>
      <Container tw="text-center">
        {affiliateHeading && (
          <h3 tw="mb-12 text-2xl font-heading capitalize">
            {affiliateHeading}
          </h3>
        )}

        <div tw="flex justify-center items-center space-x-6">
          {affiliates.map(({ name, url, logo }) => (
            <ImageContainer key={name} href={url}>
              <Image tw="mx-auto" fluid={logo.fluid} alt="" />
            </ImageContainer>
          ))}
        </div>
      </Container>
    </Wrap>
  );
};

export default AffiliateSection;
