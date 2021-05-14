import { MigrationFunction } from 'contentful-migration';

export = async function (migration) {
  const settings = migration.editContentType('site-settings');

  settings.createField('newsletterHeading', {
    name: 'Newsletter Heading',
    type: 'Symbol',
    required: true,
  });

  settings.moveField('newsletterHeading').beforeField('footerColumn1Header');

  settings.createField('newsletterText', {
    name: 'Newsletter Text',
    type: 'Symbol',
    required: true,
  });

  settings.moveField('newsletterText').beforeField('footerColumn1Header');

  settings.createField('newsletterFieldPlaceholder', {
    name: 'Newsletter Field Placeholder',
    type: 'Symbol',
    required: false,
  });

  settings
    .moveField('newsletterFieldPlaceholder')
    .beforeField('footerColumn1Header');

  settings.createField('newsletterSubmitText', {
    name: 'Newsletter Submit Button Text',
    type: 'Symbol',
    required: true,
  });

  settings.moveField('newsletterSubmitText').beforeField('footerColumn1Header');

  settings.createField('newsletterSuccessHeading', {
    name: 'Newsletter Success Heading',
    type: 'Symbol',
    required: true,
  });

  settings
    .moveField('newsletterSuccessHeading')
    .beforeField('footerColumn1Header');

  settings.createField('newsletterSuccessText', {
    name: 'Newsletter Success Text',
    type: 'Symbol',
    required: true,
  });

  settings
    .moveField('newsletterSuccessText')
    .beforeField('footerColumn1Header');

  settings.createField('newsletterErrorMsgInvalidEmail', {
    name: 'Newsletter Error Message (invalid email address)',
    type: 'Symbol',
    required: true,
  });

  settings
    .moveField('newsletterErrorMsgInvalidEmail')
    .beforeField('footerColumn1Header');

  settings.createField('newsletterErrorMsgAlreadySignedUp', {
    name: 'Newsletter Error Message (already signed up)',
    type: 'Symbol',
    required: true,
  });

  settings
    .moveField('newsletterErrorMsgAlreadySignedUp')
    .beforeField('footerColumn1Header');

  settings.createField('newsletterErrorMsgUnknownError', {
    name: 'Newsletter Error Message (unknown error)',
    type: 'Symbol',
    required: true,
  });

  settings
    .moveField('newsletterErrorMsgUnknownError')
    .beforeField('footerColumn1Header');
} as MigrationFunction;
