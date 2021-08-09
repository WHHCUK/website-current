import { graphql } from 'gatsby';
import React from 'react';
import tw from 'twin.macro';
import Container from '../components/Container';

import { H2 } from '../components/Headings';

import Page from '../components/Page';
import { PageMenu, MobilePageMenu } from '../components/PageMenu';
import {
  Page as PageType,
  ReferencesContext,
  richText,
} from '../utils/contentful';

// const Wrap = tw.section`py-20`;
// const Container = tw.div`mb-10 max-w-3xl mx-auto`;
const Wrap = tw.section`py-20`;

const LeftColumn = tw.div`lg:w-1/5`;
const RightColumn = tw.main`lg:w-4/5`;

interface Props {
  path: string;
  data: {
    contentfulSiteSettings: {
      pageMenu: {
        title: string;
        shortName: string;
        slug: string;
      }[];
    };
    contentfulPage: Omit<PageType, 'slug'>;
  };
}

const NewsArticlePage: React.FC<Props> = ({ data, path }) => {
  const { title, body } = data.contentfulPage;
  const menuItems = data.contentfulSiteSettings.pageMenu;

  const showMenu = !!menuItems.find(({ slug }) => path === `/${slug}/`);

  return (
    <Page>
      <title>{title} | WHHC</title>
      <Wrap>
        <Container>
          {showMenu && <MobilePageMenu currentSlug={path} items={menuItems} />}
          <div tw="flex space-x-8">
            {showMenu && <LeftColumn />}
            <RightColumn>
              <H2 tw="mt-0">{title}</H2>
            </RightColumn>
          </div>

          <div tw="flex space-x-8 pr-8 lg:pr-0">
            {showMenu && (
              <LeftColumn tw="pt-2 hidden lg:block ">
                <div tw="sticky top-0 -mt-16 pt-16">
                  <PageMenu currentSlug={path} items={menuItems} />
                </div>
              </LeftColumn>
            )}
            <RightColumn>
              <ReferencesContext.Provider value={body.references}>
                {richText(body)}
              </ReferencesContext.Provider>
            </RightColumn>
          </div>
        </Container>
      </Wrap>
    </Page>
  );
};

export const query = graphql`
  query Page($slug: String!) {
    contentfulSiteSettings(name: { eq: "Site Settings" }) {
      pageMenu {
        slug
        shortName
        title
      }
    }
    contentfulPage(slug: { eq: $slug }) {
      title
      body {
        raw
        references {
          ... on ContentfulRichTextTable {
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            table {
              headings
              rows
              alignment
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
          ... on ContentfulMember {
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            avatar {
              fluid(toFormat: WEBP, quality: 90) {
                ...GatsbyContentfulFluid
              }
            }
            email
            role
            name
          }
          ... on ContentfulCityMapperLink {
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            link
          }
          ... on ContentfulRichTextForm {
            contentful_id
            sys {
              contentType {
                sys {
                  id
                }
              }
            }
            items {
              internal {
                content
              }
            }
            active
            introduction {
              raw
            }
            success {
              raw
            }
          }
        }
      }
    }
  }
`;

export default NewsArticlePage;
