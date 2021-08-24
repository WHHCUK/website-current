// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const siteMetadata = {
  siteUrl: 'https://whhc.uk',
};

const plugins = [
  {
    resolve: 'gatsby-source-contentful',
    options: {
      accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      spaceId: process.env.CONTENTFUL_SPACE_ID,
      host: process.env.CONTENTFUL_HOST,
    },
  },
  'gatsby-transformer-sharp',
  'gatsby-plugin-sharp',
  'gatsby-plugin-sitemap',
  {
    resolve: 'gatsby-plugin-google-tagmanager',
    options: {
      id: 'GTM-N6VWH94',
    },
  },
];

if (process.env.ANALYSE_WEBPACK_BUNDLES === 'true') {
  plugins.push('gatsby-plugin-webpack-bundle-analyser-v2');
}

module.exports = {
  plugins,
  siteMetadata,
};
