import { MigrationFunction } from 'contentful-migration';

export = function (migration) {
  const googleDriveFolder = migration.createContentType('googleDriveFolder', {
    name: 'RichText: Google Drive Folder',
    displayField: 'name',
  });

  googleDriveFolder.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
  });

  googleDriveFolder.createField('folderId', {
    name: 'Folder Id',
    type: 'Symbol',
    required: true,
    validations: [
      {
        regexp: {
          pattern: '^[A-Za-z0-9]+$',
        },
        message: 'Should be similar to 1egB4TtIYCQRQV0IxAsfZ5XLpu7sid4tk',
      },
    ],
  });

  googleDriveFolder.createField('layout', {
    name: 'Layout',
    type: 'Symbol',
    required: true,
    validations: [
      {
        in: ['grid', 'list'],
      },
    ],
  });

  googleDriveFolder.changeFieldControl('layout', 'builtin', 'radio');

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
              linkContentType: [
                'member',
                'googleDriveFolder',
                'form',
                'table',
                'youtube',
              ],
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
