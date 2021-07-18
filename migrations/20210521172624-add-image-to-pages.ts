import { MigrationFunction } from 'contentful-migration';

export = function (migration) {
  const page = migration.editContentType('page');

  page.createField('feature', {
    name: 'Feature Image',
    type: 'Link',
    linkType: 'Asset',
    required: false,
    validations: [{ linkMimetypeGroup: ['image'] }],
  });

  page.moveField('feature').beforeField('body');
} as MigrationFunction;
