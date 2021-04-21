import { MigrationFunction } from 'contentful-migration'

export = function (migration, { makeRequest, spaceId, accessToken }) {
  const member = migration.createContentType('member', {
    name: 'Member',
    displayField: 'name',
  });

  member.createField('name', {
    name: 'Name',
    type: 'Symbol',
    required: true,
  });

  member.createField('role', {
    name: 'Role',
    type: 'Symbol',
    required: false,
  });

  member.createField('email', {
    name: 'Email',
    type: 'Symbol',
    required: false,
    validations: [{ regexp: { pattern: "^\\w[\\w.-]*@whhc.uk$" }}],
  });

  member.createField('avatar', {
    name: 'Avatar',
    type: 'Link',
    linkType: "Asset",
    required: true,
    validations: [
      { linkMimetypeGroup: ["image"]},
      { assetImageDimensions: { 
          height: { min: 128 }, 
          width: { min: 128 }
        }
      },
    ],
  });

  const newsArticle = migration.editContentType('news-article');

  newsArticle.createField('author', {
    name: 'Author',
    type: 'Link',
    linkType: "Entry",
    required: true,
    validations: [
      { linkContentType: ["member"] }
    ],
  });

  newsArticle.moveField('author').beforeField('date');

  newsArticle.changeFieldControl('author','builtin','entryCardEditor');
} as MigrationFunction