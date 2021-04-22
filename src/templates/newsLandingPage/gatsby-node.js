const path = require('path');

const ARTICLES_PER_PAGE = 9;
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
      `Error while running GraphQL query for newsArticles .`
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
    createPaginationForNewsArticleTags(graphql, actions)
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
        `Error while running GraphQL query for newsArticle(tag: ${tag}).`
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
