/* eslint-disable @typescript-eslint/no-var-requires */
const newsLandingPages = require('./src/templates/newsLandingPage/gatsby-node');

exports.createPages = async (gatsbyParams) => {
  await Promise.all([newsLandingPages.createPages(gatsbyParams)]);
};

exports.createResolvers = ({ createResolvers }) => {
  const resolvers = {
    Query: {
      allContentfulNewsArticlesWithPhotos: {
        type: ['ContentfulNewsArticle'],
        resolve: allContentfulNewsArticlesWithPhotos,
      },
    },
    ContentfulNewsArticle: {
      similar: {
        type: ['ContentfulNewsArticle'],
        resolve: similarNewsArticleResolver,
      },
    },
  };

  createResolvers(resolvers);
};

async function allContentfulNewsArticlesWithPhotos(source, _args, context) {
  const articles = await context.nodeModel.runQuery({
    query: {
      sort: {
        fields: ['date'],
        order: ['DESC'],
      },
    },
    type: 'ContentfulNewsArticle',
  });

  return articles
    .filter((article) => !!article.gallery___NODE)
    .sort(sortByDateDesc);
}

async function similarNewsArticleResolver(source, _args, context) {
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

  return [...similar.slice(0, 2), ...mostRecent.slice(0, 4)]
    .slice(0, 4)
    .sort(sortByDateDesc);
}

function sortByDateDesc(a, b) {
  return b.date.localeCompare(a.date);
}
