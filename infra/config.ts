import * as pulumi from '@pulumi/pulumi';

const pulumiConfig = new pulumi.Config();

const config = {
  url: pulumiConfig.require('url'),
  certificateArn: pulumiConfig.require('certificateArn'),
  ttl: Number.parseInt(pulumiConfig.require('ttl')),
};

export default config;