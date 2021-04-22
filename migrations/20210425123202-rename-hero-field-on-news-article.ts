import { MigrationFunction } from 'contentful-migration'

export = function (migration, { makeRequest, spaceId, accessToken }) {
  const newsArticle = migration.editContentType('news-article');

  newsArticle.createField('feature', {
    name: 'Feature Image',
    type: 'Link',
    linkType: "Asset",
    required: false,
    validations: [{ linkMimetypeGroup: ["image"]}],
  });

  newsArticle.moveField('feature').beforeField('tag');

  migration.transformEntries({
      contentType: 'news-article',
      from: ['hero'],
      to: ['feature'],
      transformEntryForLocale: (from, locale) => {
        if (!from.hero) return; 
    
        return  ({ feature: from.hero[locale] });
      },
      shouldPublish: true,
  })

  newsArticle.deleteField('hero');
} as MigrationFunction