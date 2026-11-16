// Explicit operator command only; never run during app startup or installation.
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { S3Client, PutBucketCorsCommand, GetBucketCorsCommand } = require('@aws-sdk/client-s3');
const configuration = JSON.parse(readFileSync(join(__dirname, '../config/staging-cors.json'), 'utf8').replace(/^\uFEFF/, ''));
const bucket = 'dmc-gallery-staging-2026';
const approved = new Set(['http://localhost:3000', 'http://127.0.0.1:3000']);
if (configuration.CORSRules.length !== 1 || configuration.CORSRules[0].AllowedOrigins.length !== 2 ||
    !configuration.CORSRules[0].AllowedOrigins.every(origin => approved.has(origin))) {
  throw new Error('CORS origins must match the two approved local website origins.');
}
(async () => {
  const client = new S3Client({ region: 'us-east-2' });
  try {
    await client.send(new PutBucketCorsCommand({ Bucket: bucket, CORSConfiguration: configuration }));
    console.log('Applied the approved local-upload CORS configuration to the staging bucket.');
    const current = await client.send(new GetBucketCorsCommand({ Bucket: bucket }));
    console.log('Configured upload origins:', current.CORSRules?.flatMap(rule => rule.AllowedOrigins ?? []).join(', '));
  } catch (error) {
    console.error(`Staging CORS configuration could not be applied or verified (${error?.name || 'AWS error'}). No IAM or bucket-policy changes were attempted.`);
    process.exitCode = 1;
  } finally {
    client.destroy();
  }
})();
