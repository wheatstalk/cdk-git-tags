import * as sqs from '@aws-cdk/aws-sqs';
import * as cdk from '@aws-cdk/core';
import { GitTags } from '../../src';

// ::SNIP
// Create your CDK app as usual
const app = new cdk.App();

// Apply GitTags to your app and all stacks and resources will be tagged.
GitTags.add(app);
// ::END-SNIP

const stack = new cdk.Stack(app, 'ItDev', {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
new sqs.Queue(stack, 'Queue', {
  removalPolicy: cdk.RemovalPolicy.DESTROY,
});