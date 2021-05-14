import * as aws from '@pulumi/aws';
import * as pulumi from '@pulumi/pulumi';

import * as mime from 'mime';
import * as path from 'path';

import config from './config';
import createAliasRecord from './helpers/createAliasRecord';
import crawlDirectory from './helpers/crawl-directory';

const contentBucket = new aws.s3.Bucket('contentBucket', {
  bucket: config.url,
  acl: 'public-read',
  website: {
    indexDocument: 'index.html',
    errorDocument: 'index.html',
  },
});

const webContentsRootPath = path.join(process.cwd(), 'public');

crawlDirectory(webContentsRootPath, (filePath: string) => {
  const relativeFilePath = filePath.replace(webContentsRootPath + '/', '');

  new aws.s3.BucketObject(
    relativeFilePath,
    {
      key: relativeFilePath,
      acl: 'public-read',
      bucket: contentBucket,
      contentType: mime.getType(filePath) || undefined,
      source: new pulumi.asset.FileAsset(filePath),
    },
    {
      parent: contentBucket,
    },
  );
});

const distributionArgs: aws.cloudfront.DistributionArgs = {
  enabled: true,
  aliases: [config.url],
  origins: [
    {
      originId: contentBucket.arn,
      domainName: contentBucket.websiteEndpoint,
      customOriginConfig: {
        originProtocolPolicy: 'http-only',
        httpPort: 80,
        httpsPort: 443,
        originSslProtocols: ['TLSv1.2'],
      },
    },
  ],

  defaultRootObject: 'index.html',

  defaultCacheBehavior: {
    targetOriginId: contentBucket.arn,

    viewerProtocolPolicy: 'redirect-to-https',
    allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
    cachedMethods: ['GET', 'HEAD', 'OPTIONS'],

    forwardedValues: {
      cookies: { forward: 'none' },
      queryString: false,
    },

    minTtl: 0,
    defaultTtl: config.ttl,
    maxTtl: config.ttl,
  },
  priceClass: 'PriceClass_100',

  customErrorResponses: [
    { errorCode: 404, responseCode: 404, responsePagePath: '/index.html' },
  ],

  restrictions: {
    geoRestriction: {
      restrictionType: 'none',
    },
  },

  viewerCertificate: {
    acmCertificateArn: config.certificateArn,
    sslSupportMethod: 'sni-only',
  },
};

const cdn = new aws.cloudfront.Distribution('cdn', distributionArgs);

createAliasRecord(config.url, cdn);

const output = {
  contentBucketUri: pulumi.interpolate`s3://${contentBucket.bucket}`,
  contentBucketWebsiteEndpoint: contentBucket.websiteEndpoint,
  cloudFrontDomain: cdn.domainName,
  targetDomainEndpoint: `https://${config.url}/`,
};

export default output;
