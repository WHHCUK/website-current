import { MigrationFunction } from 'contentful-migration';

export = function (migration, context) {
  const page = migration.editContentType('page');

  page.createField('shortName', {
    name: 'Menu Label',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  page.moveField('shortName').beforeField('slug');
} as MigrationFunction;
