const newsLandingPages = require('./src/templates/newsLandingPage/gatsby-node');

exports.createPages = async (gatsbyParams) => {
  await Promise.all([newsLandingPages.createPages(gatsbyParams)]);
};
