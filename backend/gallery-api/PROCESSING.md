# Private image processing (Step 2)

`POST /api/admin/photos/:photoId/process` automatically decodes and transforms a
completed upload on the server. It runs synchronously and returns HTTP 200 with
`photoId`, `status: PROCESSED`, `width`, and `height`. It does not publish anything,
write to `dmc-website-gallery-2026`, or generate public URLs. Processing is an
explicit step after upload completion; no background queue is required.

The existing JWT and role guards require an active ADMIN or SUPER_ADMIN. ADMIN
must own the draft album; SUPER_ADMIN may manage any draft album. Missing JWTs
return 401, insufficient role/ownership 403, unknown photos 404, invalid UUIDs 400,
and non-draft/PENDING photos 409. Clients cannot supply storage keys or options.

## Run locally and apply the migration

From `backend/gallery-api`, with the existing ignored `.env` configuration:

```powershell
npm ci
npx prisma migrate deploy --config prisma7.config.ts
npm run prisma:generate
npm run build
$env:AWS_PROFILE = 'dmc-gallery-dev'
npm run start:dev
```

Stop the previous local API instance before restarting. No deployment or AWS
infrastructure changes are part of these commands. Migration
`20261116020000_add_photo_processing` adds six nullable Photo columns:
`processedKey`, `thumbnailKey`, `processedSizeBytes`, `thumbnailSizeBytes`,
`processedAt`, and `processingError`. It preserves every original Photo row,
source `s3Key`, source filename/MIME/size, relationships, and earlier migrations.
The existing `width` and `height` fields describe the oriented full-size output.
Processed objects are always WebP; source MIME metadata is not overwritten.

The migration was applied to the configured local PostgreSQL database during
implementation. Other development databases need the same additive migration.
Do not reset a database or delete existing migrations to apply it.

## Test a real image with PowerShell

First use [UPLOADS.md](./UPLOADS.md) to log in, request a URL, PUT a real JPEG,
PNG, or WebP file, and call the completion endpoint. Keep the resulting
`$authHeaders` and `$upload` variables in the same PowerShell session:

```powershell
$api = 'http://127.0.0.1:4000'
$processUrl = "$api/api/admin/photos/$($upload.photoId)/process"
$result = Invoke-RestMethod -Method Post -Uri $processUrl -Headers $authHeaders -TimeoutSec 150
$result

# Authorized retry: returns the existing result without another S3 GET or PUT.
Invoke-RestMethod -Method Post -Uri $processUrl -Headers $authHeaders -TimeoutSec 150
```

For another existing UPLOADED photo, replace `$upload.photoId` with that photo's
UUID. Keep the album DRAFT throughout. The response intentionally contains no
private keys, credentials, signed URLs, or AWS errors. Inspect the private S3
outputs through an authorized operator account, not through CloudFront.

## Image limits and transformation

- Source GET metadata and actual streamed bytes must match the previously
  verified upload. Both must stay within 10,485,760 bytes (10 MiB). Streams are
  bounded and destroyed on success or rejection; source download has timeouts.
- Signature preflight permits only JPEG, PNG, or WebP decoders. Sharp metadata
  must agree with the declared MIME, and full `toBuffer` decoding must succeed.
  A MIME header, extension, or readable image header alone is insufficient.
- At most 24,000,000 input pixels, 8192 pixels per dimension, four channels,
  and one frame/page. Sharp's safety limits remain enabled and `failOn: warning`
  rejects truncated/corrupt data. Unsupported content and decoding failures
  return 422; byte or explicit dimension-limit failures return 413. Sharp's
  own pixel-limit rejection returns a sanitized 422.
- EXIF orientation is applied before resizing. Outputs are WebP at quality 80;
  full size fits inside 1920 x 1920, thumbnail inside 480 x 480, preserving aspect
  ratio and never enlarging smaller images. EXIF, XMP, IPTC, and ICC metadata are
  stripped by the default output behavior; no keepMetadata option is used.
- Only one processing job runs per API process, with libvips concurrency 1,
  cache memory 16 MiB, no file cache, and a 10-second processing timeout per
  output. Outputs are rendered sequentially. Busy processes return 503 so
  clients can retry, rather than building an unbounded native-memory queue.
  The cache cap is not a total RSS cap: pixel decoding needs additional memory.
  A future hosted worker should have an OS/container memory budget as well.

Both outputs use server-generated keys under
`processed/{albumId}/{photoId}/{attempt-UUID}/full.webp` and `thumbnail.webp` in
**dmc-gallery-staging-2026 only**. New attempts use new UUIDs and conditional PUTs;
no existing source or processed photograph is overwritten. No public ACLs are
sent. Existing bucket encryption, Block Public Access, and private ownership
settings must remain in place. S3 GET/PUT requests, additional private storage,
and processing CPU incur costs; no AWS resource settings were changed here.

Public album queries omit source/processed keys and internal failure codes.
PROCESSED describes validated private outputs, not publication. A separate future
publication step must transfer approved outputs and produce public URLs. That
step is now available through the album endpoints in [PUBLISHING.md](./PUBLISHING.md).

## Retry, locking, and failure handling

A PostgreSQL transaction-level advisory lock keyed by the photo UUID rejects
competing work across API instances (409). Album and Photo row locks use the same
album-first order as upload completion, and hold draft eligibility stable while
work runs. The bounded transaction has a 120-second timeout and 5-second pool
wait limit. Publication/deletion updates wait behind these row locks. No enum
change or persistent PROCESSING status is needed.

Only after both S3 writes succeed does the transaction set PROCESSED and record
the two keys, sizes, oriented dimensions, and timestamp. Authorized retries of
PROCESSED photos return existing metadata without reprocessing. FAILED photos
can be retried from the preserved source; transient S3 failures do not require a
new upload. Invalid source bytes cannot be fixed in place because presigned PUT
forbids overwrite: request a new photo upload for a corrected image instead.

For normal decode/storage failures, incomplete attempted output writes are
cleaned up best-effort, and FAILED is committed with a stable sanitized code:
`INVALID_IMAGE`, `SOURCE_LIMIT_EXCEEDED`, or `PROCESSING_FAILED`. The HTTP failure
is raised after that commit. Source files are never deleted. Cleanup permission
failures produce a generic operator warning without paths or AWS error details.

A worker crash or database outage can roll back the transaction before FAILED
can be recorded. PostgreSQL releases its locks; a retry can use the original
UPLOADED/FAILED record. Crashes or uncertain database commits may leave orphan
private outputs. The service deliberately does not delete outputs after an
ambiguous commit, since the database may already reference them. Operators must
reconcile unreferenced attempts after confirming that no job is active. In a
versioned bucket, deleting the current object does not purge old object versions.
No automatic deletion of source data or bucket lifecycle changes are introduced.

Step 5 adds a shared PostgreSQL quota of 30 processing requests/minute per
administrator, separately from upload/metadata quotas. Trusted-ingress source-IP
limits remain required before public exposure. The local processing concurrency
cap bounds decoding memory; it supplements the shared request limiter. See the
[security audit](../../SECURITY_AUDIT.md) for operational requirements.

## IAM permissions needed

Use the default SDK credential chain, selecting the local profile with
AWS_PROFILE. Never give browser clients AWS credentials or bucket permissions.
No IAM policies were applied automatically. The runtime identity needs:

| Action | Resource scope | Purpose |
| --- | --- | --- |
| `s3:GetObject` | `arn:aws:s3:::dmc-gallery-staging-2026/uploads/*` | Download the verified source; existing completion also needs this for HeadObject |
| `s3:PutObject` | `arn:aws:s3:::dmc-gallery-staging-2026/processed/*` | Store the two private WebP outputs |
| `s3:DeleteObject` | `arn:aws:s3:::dmc-gallery-staging-2026/processed/*` | Best-effort cleanup of incomplete attempts |

The processed-prefix permissions are new if the current identity is restricted
to `uploads/*`. No access to the public bucket, CloudFront, PutObjectAcl, or
ListAllMyBuckets is needed. If the staging bucket uses SSE-KMS, the matching KMS
key policy and identity permissions must also permit source decryption and output
data-key generation. An operator inspecting processed outputs may separately
need GetObject on processed/*; the API does not require it for processing.

## Automated verification

```powershell
npx tsc --noEmit
npm run build
npm test -- --runInBand
```

Sharp tests generate real fixture images in memory and exercise actual decoding,
resizing, EXIF orientation, metadata stripping, malformed images, unsupported
formats, byte limits, and oversized dimensions/pixel counts. Service tests mock
S3/Prisma, including partial writes, cleanup failures, duplicate requests,
concurrent state protection, authorization, safe retries, and uncertain commits.
HTTP tests exercise JWT/roles and UUID validation on the processing route.
A read-only local PostgreSQL check verified that advisory locks exclude a second
transaction and are released at commit. No real S3 processing round trip was
performed; validate the profile's processed-prefix permissions before the real
PowerShell workflow. These are historical Step 2 verification results. Before
Step 5 the user confirmed the real workflow succeeds. The latest audit records
remaining configuration-inspection limits without assuming CORS is still broken.

References: [Sharp input limits](https://sharp.pixelplumbing.com/api-constructor/),
[Sharp orientation](https://sharp.pixelplumbing.com/api-operation/),
[Sharp output and timeout](https://sharp.pixelplumbing.com/api-output/),
[AWS conditional writes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html).

## Changed files in this step

All paths below are relative to `backend/gallery-api`:

- `package.json`, `package-lock.json` (Sharp dependency).
- `prisma/schema.prisma`, `prisma/migrations/20261116020000_add_photo_processing/migration.sql` (additive output metadata).
- `src/uploads/sharp-image.service.ts`, `src/uploads/sharp-image.service.spec.ts` (decoder/transformations and real-image tests).
- `src/uploads/image-processing.service.ts`, `src/uploads/image-processing.service.spec.ts` (locking, orchestration, failure state, retries).
- `src/uploads/staging-storage.service.ts`, `src/uploads/staging-storage.service.spec.ts` (bounded GET, private PUT, cleanup).
- `src/uploads/uploads.controller.ts`, `src/uploads/uploads.controller.spec.ts`, `src/uploads/uploads.module.ts` (protected processing route and wiring).
- `src/albums/albums.service.ts`, `src/albums/albums.service.spec.ts`, `test/app.test.cjs` (omit private storage fields from public queries and update assertions).
- `README.md`, `UPLOADS.md`, `PROCESSING.md` (entry points, API contract, PowerShell testing, permissions, and limits).
