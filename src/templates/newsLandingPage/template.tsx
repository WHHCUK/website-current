import { graphql, Link } from 'gatsby';

import React from 'react';
import tw from 'twin.macro';
import ArticleGrid from '../../components/ArticleGrid';

import NewsletterSection from '../../components/NewsletterSection';
import Page from '../../components/Page';
import Pagination from '../../components/Pagination';
import PageHeader from '../../components/PageHeader';
import { NewsArticle } from '../../utils/contentful';
import { slugToLabel } from '../../utils/strings';

const Wrap = tw.section`py-20`;
const Container = tw.div`container mx-auto px-2 lg:px-4`;
const TagTitle = tw.h3`text-base lg:text-xl text-accent-600 font-bold mt--6`;

interface Props {
  data: {
    allContentfulNewsArticle: {
      totalCount: number;
      nodes: Pick<
        NewsArticle,
        'date' | 'slug' | 'tag' | 'thumbnail' | 'title'
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

  const articles = props.data.allContentfulNewsArticle.nodes;

  return (
    <Page currentPath="/news">
      <title>News | WHHC</title>
      <Wrap tw="bg-gray-50">
        <Container>
          <div tw="container mx-auto px-4">
            <div tw="mb-6 flex flex-wrap justify-center">
              <PageHeader
                bottom={tag ? <TagTitle>{tag}</TagTitle> : undefined}
                heading={tag ? <Link to="/news">News</Link> : 'News'}
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
      <NewsletterSection />
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
