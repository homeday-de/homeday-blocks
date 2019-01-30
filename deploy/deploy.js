/* eslint-disable import/no-extraneous-dependencies */
// disabling this rule, because those dependnecies here are not production dependencies and
// I think is correct to list them in dev dependencies
const s3 = require('s3-node-client');
const AWS = require('aws-sdk');
const credentials = require('../aws.json');
// this is a script that deployes dist folder to s3

function getPath() {
  // get the first argument passed to script
  return `${process.argv[2]}/` || `${Date.now()}/`;
}
const BUCKET_URL = 'http://hd-storybook.s3-website.eu-central-1.amazonaws.com/';
const key = credentials.AWS_ACCESS_KEY_ID;
const secret = credentials.AWS_SECRET_ACCESS_KEY;
const bucket = 'hd-storybook';

console.log(`${bucket} bucket. Folder: ${getPath()}`);

if (key === undefined || secret === undefined) {
  throw new Error(
    'Credentials not found. Please make sure you have aws.json file in your root foler, containing AWS credentials.',
  );
}

function getS3Params(localFile, stat, callback) {
  const s3Params = {
    ACL: 'public-read',
  };
  // don't cache, we don't need caching
  s3Params.CacheControl = 'no-cache';
  // pass `null` for `s3Params` if you want to skip uploading this file.
  callback(undefined, s3Params);
}

const awsS3Client = new AWS.S3({
  accessKeyId: key,
  secretAccessKey: secret,
  signatureVersion: 'v4',
  region: 'eu-central-1',
});

const client = s3.createClient({
  s3Client: awsS3Client,
});

// For param details, look at: http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/S3.html#putObject-property
const params = {
  localDir: 'storybook-static',
  deleteRemoved: true, // Let's remove the rest
  getS3Params,
  s3Params: {
    Bucket: bucket,
    Prefix: getPath(),
  },
};

const uploader = client.uploadDir(params);

uploader.on('error', (err) => {
  console.error('That makes me a sad panda:', err.stack);
});

uploader.on('progress', () => {
  console.log('Current progress', uploader.progressAmount, uploader.progressTotal);
});

uploader.on('end', () => {
  console.log('Eureka!');
  console.log(`You can visit you're deployed version at ${BUCKET_URL}${getPath()}`);
});
