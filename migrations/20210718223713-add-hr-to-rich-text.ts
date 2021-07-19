import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const page = migration.editContentType('page');

  page.editField('body', {
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
          'hr',
          'entry-hyperlink',
          'embedded-asset-block',
          'embedded-entry-inline',
          'embedded-entry-block',
          'asset-hyperlink',
        ],
      },
      {
        nodes: {
          'embedded-entry-inline': [
            {
              linkContentType: ['citymapper'],
            },
          ],
          'embedded-entry-block': [
            {
              linkContentType: ['member', 'form', 'youtube'],
            },
          ],
          'entry-hyperlink': [
            {
              linkContentType: ['homepage', 'news-article', 'page'],
            },
          ],
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
          'hr',
          'entry-hyperlink',
          'embedded-asset-block',
          'embedded-entry-inline',
          'embedded-entry-block',
          'asset-hyperlink',
        ],
      },
      {
        nodes: {
          'embedded-entry-inline': [
            {
              linkContentType: ['citymapper'],
            },
          ],
          'embedded-entry-block': [
            {
              linkContentType: ['member', 'form', 'youtube'],
            },
          ],
          'entry-hyperlink': [
            {
              linkContentType: ['homepage', 'news-article', 'page'],
            },
          ],
        },
      },
    ],
  });
} as MigrationFunction;
