import * as contentful from 'contentful-management';
import { MigrationFunction } from 'contentful-migration';

export = function (migration, { makeRequest, spaceId, accessToken }) {
  const client = contentful.createClient({
    accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  return client
    .getSpace(spaceId)
    .then((space) => space.getEnvironment('master'))
    .then((environment) =>
      environment.createEntry('site-settings', {
        fields: { name: { 'en-US': 'Site Settings' } },
      }),
    )
    .then((entry) => entry.publish())
    .then((entry) => console.log(entry))
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
} as MigrationFunction;
