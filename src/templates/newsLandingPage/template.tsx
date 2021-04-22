import { graphql, Link } from 'gatsby';
import GatsbyImage from 'gatsby-image';
import React from 'react';
import tw from 'twin.macro';
import ArticleGrid from '../../components/ArticleGrid';
import { H1 } from '../../components/Headings';

import Page from '../../components/Page';
import Pagination from '../../components/Pagination';
import PageHeader from '../../components/PageHeader';
import { NewsArticle } from '../../utils/contentful';
import { slugToLabel } from '../../utils/strings';

const Wrap = tw.section`py-20`;
const Container = tw.div`container mx-auto px-4`;

interface Props {
  data: {
    allContentfulNewsArticle: {
      totalCount: number;
      nodes: Pick<
        NewsArticle,
        'author' | 'date' | 'slug' | 'tag' | 'thumbnail' | 'title'
      >[];
    };
  };
  pageContext: {
    currentPage: number;
    numPages: number;
    tag?: string;
  };
}

const NewsLandingPage: React.FC<Props> = (props) => {
  const tag = slugToLabel(props.pageContext.tag);
  const title = `${tag ? `${tag} ` : ''}News`;

  const articles = props.data.allContentfulNewsArticle.nodes;

  return (
    <Page currentPath="/news">
      <title>{title} | WHHC</title>
      <Wrap tw="bg-gray-50">
        <Container>
          <div tw="container mx-auto px-4">
            <div tw="mb-6 flex flex-wrap justify-center">
              <PageHeader
                heading={title}
                // top={
                //   <span tw="text-accent-500 font-bold">West Hampstead HC</span>
                // }
              />

              <ArticleGrid articles={articles} />

              <Pagination
                currentPage={props.pageContext.currentPage}
                numPages={props.pageContext.numPages}
                path={
                  props.pageContext.tag
                    ? `/news/${props.pageContext.tag}`
                    : '/news'
                }
              />
            </div>
          </div>
        </Container>
      </Wrap>
    </Page>
  );
};

export default NewsLandingPage;

export const query = graphql`
  query NewsArticleTag($tagRegex: String!, $skip: Int, $limit: Int) {
    allContentfulNewsArticle(
      filter: { tag: { regex: $tagRegex } }
      sort: { order: DESC, fields: date }
      skip: $skip
      limit: $limit
    ) {
      nodes {
        date
        author {
          avatar {
            fluid(toFormat: WEBP, quality: 90) {
              ...GatsbyContentfulFluid
            }
          }
          email
          name
          role
        }
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
