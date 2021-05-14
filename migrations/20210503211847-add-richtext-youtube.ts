import { MigrationFunction } from 'contentful-migration';

export = function (migration, { makeRequest, spaceId, accessToken }) {
  const youtube = migration.createContentType('youtube', {
    name: 'Richtext: Youtube',
    displayField: 'name',
  });

  youtube.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
  });

  youtube.createField('url', {
    name: 'YouTube url',
    type: 'Symbol',
    required: true,
    validations: [
      {
        regexp: {
          pattern:
            '^https://(www\\.)?youtu(\\.be\\/|be\\.com/watch\\?v=)[A-Za-z]',
        },
        message: 'https://youtu.be/s5BlrxYEgv4',
      },
    ],
  });

  youtube.changeFieldControl('url', 'builtin', 'urlEditor');

  const newsArticle = migration.editContentType('news-article');

  newsArticle.editField('body', {
    type: 'RichText',
    validations: [
      { size: { min: 500 } },
      { enabledMarks: ['bold', 'italic'] },
      {
        enabledNodeTypes: [
          'blockquote',
          'embedded-asset-block',
          'embedded-entry-block',
          'entry-hyperlink',
          'heading-3',
          'heading-4',
          'hyperlink',
          'ordered-list',
          'unordered-list',
        ],
      },
      {
        nodes: {
          'entry-hyperlink': [{ linkContentType: ['news-article'] }],
          'embedded-entry-block': [{ linkContentType: ['youtube'] }],
        },
      },
    ],
  });
} as MigrationFunction;
