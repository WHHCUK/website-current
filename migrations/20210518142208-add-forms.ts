import { MigrationFunction } from 'contentful-migration';

export = function (migration) {
  const form = migration.createContentType('form', {
    name: 'RichText: Form',
    displayField: 'name',
  });

  form.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  form.createField('active', {
    name: 'Accepting submissions',
    type: 'Boolean',
    required: true,
  });

  form.createField('introduction', {
    name: 'Introduction',
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
          'entry-hyperlink': [
            { linkContentType: ['homepage', 'news-article', 'pages'] },
          ],
        },
      },
    ],
  });

  form.createField('success', {
    name: 'Success',
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
          'entry-hyperlink': [
            { linkContentType: ['homepage', 'news-article', 'pages'] },
          ],
        },
      },
    ],
  });

  form.createField('items', {
    name: 'Fields',
    type: 'Object',
    required: true,
  });

  form.createField('config', {
    name: 'Config',
    type: 'Object',
    required: true,
  });

  migration.editContentType('news-article').editField('body', {
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
          'entry-hyperlink': [
            { linkContentType: ['homepage', 'news-article', 'pages'] },
          ],
          'embedded-entry-block': [{ linkContentType: 'youtube' }],
        },
      },
    ],
  });

  migration.editContentType('page').editField('body', {
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
          'entry-hyperlink': [
            { linkContentType: ['homepage', 'news-article', 'pages'] },
          ],
          'embedded-entry-block': [
            { linkContentType: 'form' },
            { linkContentType: 'youtube' },
          ],
        },
      },
    ],
  });
} as MigrationFunction;
