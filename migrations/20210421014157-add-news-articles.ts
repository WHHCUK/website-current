import { MigrationFunction } from 'contentful-migration'

const TAGS = [
  'charity',
  'club',
  'coaching',
  'competitions',
  'england-hockey',
  'ladies',
  'members',
  'mens',
  'mixed',
  'socials',
  'summer',
  'umpires'
];

export = function (migration, { makeRequest, spaceId, accessToken }) {
  const newsArticle = migration.createContentType('news-article', {
    name: 'News Article',
    displayField: 'title',
  });

  newsArticle.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: true,
  });

  newsArticle.createField('slug', {
    name: 'Slug',
    type: 'Symbol',
    required: true,
    validations: [{ unique: true }],
  });

  newsArticle.changeFieldControl('slug','builtin','slugEditor');

  newsArticle.createField('date', {
    name: 'Date',
    type: 'Date',
    required: true,
  });

  newsArticle.changeFieldControl('date', 'builtin', 'datePicker', {
    format: 'time',
    ampm: '12',
  });


  newsArticle.createField('thumbnail', {
    name: 'Thumbnail',
    type: 'Link',
    linkType: "Asset",
    required: true,
    validations: [{ linkMimetypeGroup: ["image"]}],
  });

  newsArticle.createField('hero', {
    name: 'Hero Image',
    type: 'Link',
    linkType: "Asset",
    required: false,
    validations: [{ linkMimetypeGroup: ["image"]}],
  });

  newsArticle.createField('tag', {
    name: 'Tag',
    type: "Symbol",
    required: true,
    validations: [
      { in: TAGS }
    ],
  });

  newsArticle.changeFieldControl('tags', 'builtin', 'checkbox');

  newsArticle.createField('body', {
    name: 'Body',
    type: 'RichText',
    required: true,

    validations: [
      { size: { min: 500 }},
      { enabledMarks: [ 'bold', 'italic' ]},
      { enabledNodeTypes: [
          'heading-3',
          'heading-4      ',
          'unordered-list',
          'ordered-list',
          'blockquote',
          'hyperlink',
          'entry-hyperlink',
          "embedded-asset-block"
        ],
      },
      {
        nodes: {
          'entry-hyperlink': [ { linkContentType: [ 'news-article' ] } ]
        }
      }
    ],
  });
} as MigrationFunction
