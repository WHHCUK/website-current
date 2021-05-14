import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const newsArticle = migration.editContentType('news-article');

  newsArticle.createField('gallery', {
    name: 'Gallery',
    type: 'Array',
    required: false,
    validations: [{ size: { min: 2 } }],
    items: {
      type: 'Link',
      linkType: 'Asset',
      validations: [
        { linkMimetypeGroup: ['image'] },
        {
          assetImageDimensions: {
            height: { min: 300 },
            width: { min: 400 },
          },
        },
      ],
    },
  });

  newsArticle.changeFieldControl('gallery', 'builtin', 'assetGalleryEditor');
} as MigrationFunction;
