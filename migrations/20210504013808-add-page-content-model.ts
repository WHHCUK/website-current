import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const page = migration.createContentType('page', {
    name: 'Page',
    displayField: 'name',
  });

  page.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: true,
  });

  page.createField('slug', {
    name: 'Slug',
    type: 'Symbol',
    required: true,
    validations: [
      {
        unique: true,
      },
      {
        regexp: {
          pattern: '(^$)|(^[a-z0-9-]+(\\/[a-z0-9-]+)*$)',
        },
      },
    ],
  });

  page.changeFieldControl('slug', 'builtin', 'slugEditor');

  const settings = migration.editContentType('site-settings');

  settings.editField('footerColumn1Links', {
    name: 'Footer Column Two Links',
    type: 'Array',
    required: true,
    validations: [{ size: { min: 3, max: 8 } }],
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['page'] }],
      linkType: 'Entry',
    },
  });

  settings.editField('footerColumn2Links', {
    name: 'Footer Column Two Links',
    type: 'Array',
    required: true,
    validations: [{ size: { min: 3, max: 8 } }],
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['page'] }],
      linkType: 'Entry',
    },
  });

  settings.editField('footerColumn3Links', {
    name: 'Footer Column Two Links',
    type: 'Array',
    required: true,
    validations: [{ size: { min: 3, max: 8 } }],
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['page'] }],
      linkType: 'Entry',
    },
  });
} as MigrationFunction;
