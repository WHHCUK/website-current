import { MigrationFunction } from 'contentful-migration';

export = function (migration, context) {
  const page = migration.editContentType('page');

  page.deleteField('feature');
} as MigrationFunction;
