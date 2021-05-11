import { graphql, Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

import ArticleGrid from '../../components/ArticleGrid';
import Avatar from '../../components/Avatar';
import FeatureImage from '../../components/FeatureImage';
import Gallery from '../../components/Gallery';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import {
  NewsArticle,
  ReferencesContext,
  richText,
} from '../../utils/contentful';
import { isoToShortDate } from '../../utils/dates';
import { slugToLabel } from '../../utils/strings';

const Wrap = tw.section`py-20`;
const Container = tw.div`container mx-auto px-4`;

const Body = tw.div`
  max-w-2xl
  mx-auto
`;

const DateText = tw.span`
  text-base lg:text-xl
  text-gray-500
`;

const Tag = tw(Link)`
  text-base lg:text-xl
  hover:underline
  text-accent-600 hover:text-accent-700 font-bold
`;

interface Props {
  data: {
    contentfulNewsArticle: Omit<NewsArticle, 'slug' | 'thumbnail'> & {
      similar: Pick<
        NewsArticle,
        'date' | 'slug' | 'tag' | 'thumbnail' | 'title'
      >[];
    };
  };
  params: { tag: string };
}

const NewsArticlePage: React.FC<Props> = ({ data }) => {
  const { author, body, date, feature, gallery, similar, tag, title } =
    data.contentfulNewsArticle;

  return (
    <Page currentPath="/news">
      <title>{title} | WHHC</title>
      <Wrap>
        <Container>
          <PageHeader
            heading={title}
            top={
              <>
                <Tag to={`/news/${tag}`}>{slugToLabel(tag)}</Tag>
                <DateText>{isoToShortDate(date)}</DateText>
              </>
            }
            bottom={<Avatar member={author} />}
          />

          {feature && <FeatureImage image={feature} />}

          <ReferencesContext.Provider value={body.references}>
            <Body>{richText(body)}</Body>
          </ReferencesContext.Provider>

          {gallery && <Gallery images={gallery} />}

          <aside tw="mt-12">
            <h2 tw="sr-only">Similar News</h2>
            <ArticleGrid articles={similar} />
          </aside>
        </Container>
      </Wrap>
    </Page>
  );
};

export const query = graphql`
  query NewsArticle($slug: String!) {
    contentfulNewsArticle(slug: { eq: $slug }) {
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
      body {
        raw
        references {
          ... on ContentfulRichtextYoutube {
            contentful_id
            url
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
          }
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
      feature {
        fluid(
          cropFocus: FACES
          resizingBehavior: FILL
          toFormat: WEBP
          quality: 90
        ) {
          ...GatsbyContentfulFluid
        }
      }
      gallery {
        fluid(toFormat: WEBP, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
      title
      tag
      similar {
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

export default NewsArticlePage;
