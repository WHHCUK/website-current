import { graphql } from 'gatsby';
import Img from 'gatsby-image';
import * as React from 'react';

import { renderer } from '../../utils/contentful';

const NewsArticlePage = (props) => {
  const { title, thumbnail } = props.data.contentfulNewsArticle;

  return (
    <main>
      <title>{title} | WHHC</title>
      <h1>{title}</h1>

      <Img fluid={thumbnail.fluid} />

      <div>{renderer(body)}</div>
    </main>
  );
};

export const query = graphql`
  query NewsArticle($slug: String!) {
    contentfulNewsArticle(slug: { eq: $slug }) {
      title
      thumbnail {
        fluid(maxWidth: 200, toFormat: WEBP, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
      body {
        raw
      }
    }
  }
`;

export default NewsArticlePage;
