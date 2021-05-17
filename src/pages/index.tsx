import { graphql, Link } from 'gatsby';
import * as React from 'react';
import tw from 'twin.macro';
import BackgroundImage from 'gatsby-background-image';

import AffiliateSection from '../components/AffiliateSection';
import ArticleGrid from '../components/ArticleGrid';
import Container from '../components/Container';
import NewsletterSection from '../components/NewsletterSection';
import Page from '../components/Page';
import { Homepage, NewsArticle } from '../utils/contentful';
import { H2, H3 } from '../components/Headings';
import styled from 'styled-components';

const HeroText = styled.div`
  &:before {
    display: block;
    content: '';
    height: 0.49rem;
    width: 8rem;
    background-color: #209cee;
  }
`;

const Wrap = tw.section`py-20`;

interface Props {
  data: {
    contentfulHomepage: Pick<
      Homepage,
      'heroHeading' | 'heroText' | 'heroImage'
    >;
    allContentfulNewsArticle: {
      nodes: Pick<
        NewsArticle,
        'date' | 'slug' | 'tag' | 'thumbnail' | 'title'
      >[];
    };
  };
}

const IndexPage: React.FC<Props> = ({
  data: {
    contentfulHomepage: { heroHeading, heroText, heroImage },
    allContentfulNewsArticle: { nodes: articles },
  },
}) => {
  return (
    <Page currentPath="/">
      <title>Home | WHHC</title>
      <BackgroundImage fluid={heroImage.fluid} tw="h-160 w-full">
        <div tw="container mx-auto h-full flex flex-col justify-end py-32">
          <HeroText tw="text-white px-4 py-2">
            <H2 tw="mb-0">{heroHeading}</H2>
            <H3 tw="-mt-2 mb-0 text-2xl">{heroText}</H3>
          </HeroText>
        </div>
      </BackgroundImage>
      <Wrap tw="bg-gray-50">
        <Container>
          <H3 tw="mx-4 mb-2 pb-2">
            <Link to="/news">News</Link>
          </H3>
          <ArticleGrid articles={articles} />
        </Container>
      </Wrap>
      <NewsletterSection />
      <AffiliateSection />
    </Page>
  );
};

export const query = graphql`
  query HomePage {
    contentfulHomepage(name: { eq: "Home Page" }) {
      heroHeading
      heroText
      heroImage {
        fluid(toFormat: WEBP, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
    }
    allContentfulNewsArticle(sort: { order: DESC, fields: date }, limit: 4) {
      nodes {
        date
        slug
        tag
        thumbnail {
          fluid(toFormat: WEBP, quality: 90) {
            ...GatsbyContentfulFluid
          }
        }
        title
      }
    }
  }
`;

export default IndexPage;
