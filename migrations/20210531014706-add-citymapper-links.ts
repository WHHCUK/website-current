import { MigrationFunction } from 'contentful-migration';

export = function (migration) {
  const citymapper = migration.createContentType('citymapper', {
    name: 'City Mapper Link',
    displayField: 'name',
  });

  citymapper.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
    validations: [],
  });

  citymapper.createField('link', {
    name: 'Link',
    type: 'Symbol',
    required: true,
    validations: [],
  });

  const newsArticle = migration.editContentType('news-article');

  newsArticle.editField('body', {
    type: 'RichText',
    validations: [
      {
        enabledMarks: ['bold', 'italic'],
        message: 'Only bold and italic marks are allowed',
      },
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
          'embedded-entry-inline',
          'embedded-entry-block',
        ],
        message:
          'Only heading 3, heading 4, unordered list, ordered list, quote, link to Url, link to entry, asset, and block entry nodes are allowed',
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
              linkContentType: ['member', 'youtube'],
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

  const page = migration.editContentType('page');

  page.editField('body', {
    type: 'RichText',
    validations: [
      {
        enabledMarks: ['bold', 'italic'],
        message: 'Only bold and italic marks are allowed',
      },
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
          'embedded-entry-inline',
          'embedded-entry-block',
          'asset-hyperlink',
        ],
        message:
          'Only heading 3, heading 4, unordered list, ordered list, quote, link to Url, link to entry, asset, block entry, and link to asset nodes are allowed',
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
