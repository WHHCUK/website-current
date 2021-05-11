/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

const ARTICLES_PER_PAGE = 12;
const TEMPLATE_PATH = './src/templates/newsLandingPage/template.tsx';

exports.createPages = async ({ graphql, actions }) => {
  await createPaginationForNewsArticles(graphql, actions);
};

async function createPaginationForNewsArticles(graphql, actions) {
  const newsArticles = await graphql(`
    {
      allContentfulNewsArticle {
        totalCount
        tags: distinct(field: tag)
      }
    }
  `);

  if (newsArticles.errors) {
    reporter.panicOnBuild(
      `Error while running GraphQL query for newsArticles .`,
    );
    return;
  }

  const { totalCount } = newsArticles.data.allContentfulNewsArticle;
  const numPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

  const pagePromises = Array.from({ length: numPages }).map((_, index) => {
    const currentPage = index + 1;
    const skip = index * ARTICLES_PER_PAGE;

    const basePath = `/news`;

    return actions.createPage({
      path: currentPage === 1 ? basePath : `${basePath}/${currentPage}`,
      component: path.resolve(TEMPLATE_PATH),
      context: {
        currentPage,
        index,
        numPages,
        skip,
        tag: null,
        tagRegex: '/.*/',
        limit: ARTICLES_PER_PAGE,
      },
    });
  });

  const { tags } = newsArticles.data.allContentfulNewsArticle;

  const tagPagePromises = tags.map(
    createPaginationForNewsArticleTags(graphql, actions),
  );

  await Promise.all([...pagePromises, ...tagPagePromises]);
}

function createPaginationForNewsArticleTags(graphql, actions) {
  return async (tag) => {
    const newsArticlesForTag = await graphql(`{
    allContentfulNewsArticle(filter: {tag: {eq: "${tag}"}}) {
      totalCount
    }
  }`);

    if (newsArticlesForTag.errors) {
      reporter.panicOnBuild(
        `Error while running GraphQL query for newsArticle(tag: ${tag}).`,
      );
      return;
    }

    const { totalCount } = newsArticlesForTag.data.allContentfulNewsArticle;
    const numPages = Math.ceil(totalCount / ARTICLES_PER_PAGE);

    const pagePromises = Array.from({ length: numPages }).map((_, index) => {
      const currentPage = index + 1;
      const skip = index * ARTICLES_PER_PAGE;

      const basePath = `/news/${tag}`;

      return actions.createPage({
        path: currentPage === 1 ? basePath : `${basePath}/${currentPage}`,
        component: path.resolve(TEMPLATE_PATH),
        context: {
          currentPage,
          index,
          numPages,
          skip,
          tag,
          tagRegex: `/${tag}/`,
          limit: ARTICLES_PER_PAGE,
        },
      });
    });

    return Promise.all(pagePromises);
  };
}

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    ContentfulNewsArticle: {
      similar: {
        type: ['ContentfulNewsArticle'],
        resolve: async (source, args, context, info) => {
          const { slug, tag } = source;

          const similar = await context.nodeModel.runQuery({
            query: {
              sort: {
                fields: ['date'],
                order: ['DESC'],
              },
              filter: {
                tag: { eq: tag },
                slug: { ne: slug },
              },
            },
            type: 'ContentfulNewsArticle',
          });

          const slugs = [slug, ...similar.map((a) => a.slug)];

          const mostRecent = await context.nodeModel.runQuery({
            query: {
              sort: {
                fields: ['date'],
                order: ['DESC'],
              },
              filter: {
                tag: { ne: tag },
                slug: { nin: slugs },
              },
            },
            type: 'ContentfulNewsArticle',
          });

          return [...similar.slice(0, 2), ...mostRecent.slice(0, 3)]
            .slice(0, 3)
            .sort((a, b) => b.date.localeCompare(a.date));
        },
      },
    },
  };

  createResolvers(resolvers);
};
