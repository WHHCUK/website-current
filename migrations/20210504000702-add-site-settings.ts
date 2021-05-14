import { MigrationFunction } from 'contentful-migration';

export = async function (migration, { makeRequest, spaceId, accessToken }) {
  const settings = migration.createContentType('site-settings', {
    name: 'Site Settings',
    displayField: 'name',
  });

  settings.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
    validations: [
      {
        in: ['Site Settings'],
      },
    ],
  });

  settings.createField('slogan', {
    name: 'Slogan',
    type: 'Text',
    required: false,
  });

  settings.createField('facebook', {
    name: 'Facebook url',
    type: 'Symbol',
    required: true,
    validations: [
      {
        regexp: {
          pattern: '^https://(www\\.)?facebook\\.com/[A-Za-z0-9]+$',
        },
      },
    ],
  });

  settings.createField('twitter', {
    name: 'Twitter url',
    type: 'Symbol',
    required: true,
    validations: [
      {
        regexp: {
          pattern: '^https://(www\\.)?twitter\\.com/[A-Za-z0-9]+$',
        },
      },
    ],
  });

  settings.createField('instagram', {
    name: 'Instagram url',
    type: 'Symbol',
    required: true,
    validations: [
      {
        regexp: {
          pattern: '^https://(www\\.)?instagram\\.com/[A-Za-z0-9]+$',
        },
      },
    ],
  });

  settings.changeFieldControl('slogan', 'builtin', 'multipleLine');

  settings.createField('footerColumn1Header', {
    name: 'Footer Column One Header',
    type: 'Symbol',
    required: true,
  });

  settings.createField('footerColumn1Links', {
    name: 'Footer Column One Links',
    type: 'Array',
    required: true,
    validations: [{ size: { min: 4, max: 6 } }],
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['news-article'] }],
      linkType: 'Entry',
    },
  });

  settings.changeFieldControl(
    'footerColumn1Links',
    'builtin',
    'entryLinksEditor',
    {
      bulkEditing: false,
      showCreateEntityAction: false,
      showLinkEntityAction: true,
    },
  );

  settings.createField('footerColumn2Header', {
    name: 'Footer Column Two Header',
    type: 'Symbol',
    required: true,
  });

  settings.createField('footerColumn2Links', {
    name: 'Footer Column Two Links',
    type: 'Array',
    required: true,
    validations: [{ size: { min: 8, max: 12 } }],
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['news-article'] }],
      linkType: 'Entry',
    },
  });

  settings.changeFieldControl(
    'footerColumn2Links',
    'builtin',
    'entryLinksEditor',
    {
      bulkEditing: false,
      showCreateEntityAction: false,
      showLinkEntityAction: true,
    },
  );
} as MigrationFunction;
