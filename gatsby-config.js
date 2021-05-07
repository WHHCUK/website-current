require('dotenv').config({
  path: '.env',
});

console.log('abc-123', {
  CONTENTFUL_HOST: process.env.CONTENTFUL_HOST,
});

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
];

if (process.env.ANALYSE_WEBPACK_BUNDLES === 'true') {
  plugins.push('gatsby-plugin-webpack-bundle-analyser-v2');
}

module.exports = {
  plugins,
};
