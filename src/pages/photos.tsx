import { graphql, Link } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';

import Gallery from '../components/Gallery';
import { H4 } from '../components/Headings';
import NewsletterForm from '../components/NewsletterForm';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import { NewsArticle } from '../utils/contentful';
import { isoToShortDate } from '../utils/dates';

const Wrap = tw.section`py-20`;
const Container = tw.div`container mx-auto px-0`;

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
    allContentfulNewsArticlesWithPhotos: Pick<
      NewsArticle,
      'title' | 'slug' | 'gallery' | 'date' | 'tag'
    >[];
  };
}

const PhotosPage: React.FC<Props> = ({ data }) => {
  const title = 'Photos';

  return (
    <Page currentPath="/news">
      <title>{title} | WHHC</title>
      <Wrap>
        <Container>
          <PageHeader heading={title} />

          <div tw="px-6">
            {data.allContentfulNewsArticlesWithPhotos.map(
              ({ title, slug, gallery, date, tag }) => (
                <article
                  key={slug}
                  tw="px-4 mb-6 pb-4 pb-6 md:w-full rounded shadow flex flex-col space-y-6 bg-white"
                >
                  <div tw="mx-2 md:mx-4 my-4 flex justify-between  items-center">
                    <div>
                      <H4 tw="mb-0 hover:underline">
                        <Link to={`/news/${slug}`}>{title}</Link>
                      </H4>
                      <DateText>{isoToShortDate(date)}</DateText>
                    </div>
                    <Tag to={`/news/${tag}`}>{tag}</Tag>
                  </div>
                  <Gallery images={gallery || []} pad={false} />
                </article>
              ),
            )}
          </div>
        </Container>
      </Wrap>
      <NewsletterForm />
    </Page>
  );
};

export const query = graphql`
  query {
    allContentfulNewsArticlesWithPhotos {
      title
      date
      tag
      slug
      gallery {
        fluid(toFormat: WEBP, quality: 90) {
          ...GatsbyContentfulFluid
        }
      }
    }
  }
`;

export default PhotosPage;
