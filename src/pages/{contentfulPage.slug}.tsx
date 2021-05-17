import { graphql } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';
import Container from '../components/Container';

import Page from '../components/Page';
import { RawDocument, ReferencesContext, richText } from '../utils/contentful';

const Wrap = tw.section`py-20`;

interface Props {
  data: {
    contentfulPage: {
      title: string;
      body: RawDocument;
    };
  };
}

const NewsArticlePage: React.FC<Props> = ({ data }) => {
  const { title, body } = data.contentfulPage;

  return (
    <Page currentPath="/news">
      <title>{title} | WHHC</title>
      <Wrap>
        <Container>
          <ReferencesContext.Provider value={body.references}>
            {richText(body)}
          </ReferencesContext.Provider>
          {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        </Container>
      </Wrap>
    </Page>
  );
};

export const query = graphql`
  query Page($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            description
            file {
              contentType
              details {
                size
              }
              fileName
              url
            }
            fluid(
              cropFocus: FACES
              resizingBehavior: FILL
              toFormat: WEBP
              quality: 90
            ) {
              ...GatsbyContentfulFluid
            }
          }
        }
      }
    }
  }
`;

export default NewsArticlePage;
