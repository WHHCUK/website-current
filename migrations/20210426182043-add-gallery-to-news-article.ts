import { MigrationFunction } from 'contentful-migration'

export = function (migration, { makeRequest, spaceId, accessToken }) {
  const newsArticle = migration.editContentType('news-article');

  newsArticle.createField('gallery', {
    name: 'Gallery',
    type: 'Array',
    required: false,
    validations: [
        { "size": { "min": 3 }},
    ],
    items: {
        type: 'Link',
        linkType: "Asset",
        validations: [
            { linkMimetypeGroup: ["image"]},
            {"assetImageDimensions": {
                height: {min:500},
                width: {min:500},
            }}
        ]
    }
  });

  newsArticle.changeFieldControl('gallery','builtin','assetGalleryEditor');
} as MigrationFunction
