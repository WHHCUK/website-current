import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const homepage = migration.createContentType('homepage', {
    name: 'Homepage',
    displayField: 'name',
  });

  homepage.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
    validations: [
      {
        in: ['Home Page'],
      },
    ],
  });

  homepage.createField('heroHeading', {
    name: 'Hero Heading',
    type: 'Symbol',
    required: true,
  });

  homepage.createField('heroText', {
    name: 'Hero Text',
    type: 'Symbol',
    required: true,
  });

  homepage.createField('heroImage', {
    name: 'Hero Image',
    type: 'Link',
    linkType: 'Asset',
    required: true,
    validations: [{ linkMimetypeGroup: ['image'] }],
  });

  homepage.createField('affiliateHeading', {
    name: 'Affiliate Heading',
    type: 'Symbol',
    required: true,
  });

  homepage.createField('affiliates', {
    name: 'Affiliates',
    type: 'Array',
    required: true,
    items: {
      type: 'Link',
      validations: [{ linkContentType: ['afilliate'] }],
      linkType: 'Entry',
    },
  });

  homepage.changeFieldControl('affiliates', 'builtin', 'entryLinksEditor', {
    bulkEditing: false,
    showCreateEntityAction: false,
    showLinkEntityAction: true,
  });
} as MigrationFunction;
