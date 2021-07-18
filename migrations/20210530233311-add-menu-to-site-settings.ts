import { MigrationFunction } from 'contentful-migration';

export = function (migration, context) {
  const settings = migration.editContentType('site-settings');

  settings.createField('pageMenu', {
    name: 'Page Menu',
    type: 'Array',
    required: true,
    validations: [],
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['page'] }],
      linkType: 'Entry',
    },
  });

  settings.moveField('pageMenu').beforeField('footerColumn1Header');
} as MigrationFunction;
