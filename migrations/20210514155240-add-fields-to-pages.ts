import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const page = migration.editContentType('page');

  page.createField('body', {
    name: 'Body',
    type: 'RichText',
    required: true,

    validations: [
      { enabledMarks: ['bold', 'italic'] },
      {
        enabledNodeTypes: [
          'heading-3',
          'heading-4',
          'unordered-list',
          'ordered-list',
          'blockquote',
          'hyperlink',
          'entry-hyperlink',
          'embedded-asset-block',
        ],
      },
      {
        nodes: {
          'entry-hyperlink': [{ linkContentType: ['news-article', 'page'] }],
        },
      },
    ],
  });

  const newsArticle = migration.editContentType('news-article');

  newsArticle.editField('body', {
    type: 'RichText',
    validations: [
      { enabledMarks: ['bold', 'italic'] },
      {
        enabledNodeTypes: [
          'heading-3',
          'heading-4',
          'unordered-list',
          'ordered-list',
          'blockquote',
          'hyperlink',
          'entry-hyperlink',
          'embedded-asset-block',
          'embedded-entry-block',
        ],
      },
      {
        nodes: {
          'entry-hyperlink': [{ linkContentType: ['news-article', 'pages'] }],
          'embedded-entry-block': [{ linkContentType: ['youtube'] }],
        },
      },
    ],
  });
} as MigrationFunction;
