import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const affiliate = migration.createContentType('affiliate', {
    name: 'Affiliate',
    displayField: 'name',
  });

  affiliate.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
  });

  affiliate.createField('url', {
    name: 'Url',
    type: 'Symbol',
    required: true,
    validations: [
      {
        regexp: {
          pattern:
            '^https:\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$',
        },
      },
    ],
  });

  affiliate.createField('logo', {
    name: 'Logo',
    type: 'Link',
    linkType: 'Asset',
    required: true,
    validations: [
      { linkMimetypeGroup: ['image'] },
      {
        assetImageDimensions: {
          height: { min: 128 },
          width: { min: 128 },
        },
      },
    ],
  });
} as MigrationFunction;
