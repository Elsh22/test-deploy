# Secure staging uploads

The upload routes use the existing JWT and role guards. Only an album's creator
(or an explicitly authorized SUPER_ADMIN) can request or complete uploads for it.
Albums must remain DRAFT. Other administrators receive 403, missing records 404,
and ineligible album/photo states 409. There is no new schema or migration.

## Local configuration

Run from `backend/gallery-api` using your existing local database and JWT config:

```powershell
$env:AWS_PROFILE = 'dmc-gallery-dev'
$env:AWS_REGION = 'us-east-2'
npm run build
npm run start:dev
```

Start only one API instance. The SDK uses its default credential provider chain;
AWS_PROFILE selects your existing local profile. No keys belong in source code,
request bodies, or logs. Temporary credentials are preferred. The staging bucket
is fixed to `dmc-gallery-staging-2026` in `us-east-2`; clients cannot choose a
bucket, endpoint, object key, ACL, or published-image URL.

## Test with PowerShell

Use an existing active administrator and an existing draft album it owns. A
SUPER_ADMIN may manage another administrator's album. The current schema has no
per-photo uploader column, so authorization is based on album ownership, not on
which administrator originally requested the upload URL.

```powershell
$api = 'http://127.0.0.1:4000'
$credentials = Get-Credential -Message 'DMC administrator email and password'
$loginBody = @{
    email = $credentials.UserName
    password = $credentials.GetNetworkCredential().Password
} | ConvertTo-Json
$login = Invoke-RestMethod -Method Post -Uri "$api/api/auth/login" -ContentType 'application/json' -Body $loginBody
$authHeaders = @{ Authorization = "Bearer $($login.accessToken)" }

$albumId = Read-Host 'Existing draft album UUID'
$file = Get-Item -LiteralPath (Read-Host 'Path to a JPEG, PNG, or WebP image')
$mimeType = switch ($file.Extension.ToLowerInvariant()) {
    '.jpg' { 'image/jpeg' }
    '.jpeg' { 'image/jpeg' }
    '.png' { 'image/png' }
    '.webp' { 'image/webp' }
    default { throw 'Unsupported image extension' }
}
$body = @{
    filename = $file.Name
    mimeType = $mimeType
    sizeBytes = $file.Length
} | ConvertTo-Json
$upload = Invoke-RestMethod -Method Post -Uri "$api/api/admin/albums/$albumId/uploads" -Headers $authHeaders -ContentType 'application/json' -Body $body

# Send the raw file, not multipart/form-data. Do not send the API JWT to S3.
$putHeaders = @{ 'If-None-Match' = $upload.headers.'If-None-Match' }
Invoke-WebRequest -UseBasicParsing -Method Put -Uri $upload.uploadUrl -Headers $putHeaders -ContentType $upload.headers.'Content-Type' -InFile $file.FullName | Out-Null

$completeUrl = "$api/api/admin/photos/$($upload.photoId)/complete"
Invoke-RestMethod -Method Post -Uri $completeUrl -Headers $authHeaders
# Safe retry while the album is still DRAFT:
Invoke-RestMethod -Method Post -Uri $completeUrl -Headers $authHeaders
```

Do not print, persist, or share the access token or signed URL. Both authorize
access for their respective lifetimes.

### Request and response contract

- `POST /api/admin/albums/:albumId/uploads` accepts `filename`, `mimeType`,
  integer `sizeBytes`, and an optional UUID `requestId` for retry identity. Reuse
  the same requestId for the same album/file metadata to resume without adding
  a duplicate Photo. UUID route parameters, a safe filename matching its
  MIME extension, and 1 through 10,485,760 bytes (10 MiB) are required. JPEG,
  PNG, and WebP only. Invalid metadata, extra keys, or oversized declarations
  return 400. Authentication failures return 401; role/ownership failures 403.
- HTTP 201 returns `photoId`, `status: PENDING`, `method: PUT`, `expiresIn: 300`,
  `uploadUrl`, and exact required `headers`: `Content-Type` and
  `If-None-Match: *`. The response is marked `Cache-Control: no-store`.
- Keys are generated as `uploads/{albumId}/{new-UUID}.{jpg|png|webp}`. Names from
  the client are stored as metadata only. Both required headers are signed.
  S3 conditional PUT prevents replay from overwriting the first uploaded object;
  retries after a successful PUT can return S3 412. Do not drop signed headers.
- Metadata is inserted with status PENDING only after URL signing succeeds.
  Album state and ownership are rechecked under a database row lock before
  insertion, so a concurrent publication cannot bypass the draft requirement.
- A presigned PUT does NOT enforce the declared size. Completion uses HeadObject
  and requires the actual ContentLength to be positive, at most 10 MiB, and equal
  to the declaration, with the expected ContentType. Missing uploads return 409,
  oversized actual objects 413, and size/type mismatches 400. AWS credential,
  permission, and transport failures return a sanitized 503.
- `POST /api/admin/photos/:photoId/complete` returns HTTP 200 with `photoId` and
  `status: UPLOADED` after verification. Authorized retries return the same result.
  Completion rechecks draft ownership/state transactionally and conditionally
  transitions PENDING to UPLOADED, without clobbering later processing states.
- No signature/byte validation or image decoding happens here. Content-Type is
  client-declared metadata. After completing the upload, call the protected
  `POST /api/admin/photos/:photoId/process` endpoint described in
  [PROCESSING.md](./PROCESSING.md). It validates and decodes the image, enforces
  resource limits, and stores private WebP outputs before setting PROCESSED.
  Neither upload endpoint publishes content or generates a
  CloudFront URL; existing public endpoints still exclude unprocessed images.

Invalid objects stay private and unprocessed. Because overwrite is forbidden,
request a new photo/URL for a corrected file. An operator must later clean up
abandoned PENDING metadata and staging objects after issued URLs expire; no
automatic deletes are added.
Treat outstanding signed URLs as valid until expiry even if album state changes.
A subsequent completion still checks the album, and publication is separate.

## Required throttling before shared/public access

The API now uses shared PostgreSQL per-administrator quotas: 120 writes/minute
(upload grants, completions and metadata edits combined), 30 processing requests/minute,
4 publication requests/minute, and 180 authenticated reads/minute. Login is limited
to 8 attempts per normalized email per 15 minutes. Rejections return 429 and
Retry-After; logout remains available after quota exhaustion. JSON bodies are
limited to 32 KiB. Also apply source-IP limits at the trusted ingress before
shared hosting; do not trust arbitrary forwarded-IP headers. No limiter dependency
or refresh-token functionality is added. Monitor abandoned uploads and storage
usage: a declared-size check does not prevent an oversized direct PUT from
incurring temporary storage costs. PUT/HEAD requests and staging storage incur
[standard S3 charges](https://aws.amazon.com/s3/pricing/).

## Staging browser CORS

The approved origins are exactly `http://localhost:3000` and
`http://127.0.0.1:3000`. `config/staging-cors.json` allows only PUT and the required
signed headers, exposing ETag. It grants no public read permission and does not
replace JWT authorization. No wildcard or production origins are configured.

An operator with bucket CORS permissions can apply this reviewable configuration:

```powershell
$env:AWS_PROFILE = 'dmc-gallery-dev'
node scripts/configure-staging-cors.cjs
```

This explicit command replaces the staging bucket's CORS rules with the approved
local-upload rule and reads them back. It does not run on app startup and never
changes IAM, bucket policies, the published bucket, or CloudFront. The runtime
profile can stay restricted to PutObject and GetObject/HeadObject under
`arn:aws:s3:::dmc-gallery-staging-2026/uploads/*`. CORS administration requires
`s3:PutBucketCORS` and `s3:GetBucketCORS` on this staging bucket; do not grant it to
browser clients. The attempted local configuration was denied by AWS AccessDenied,
so this profile could not independently verify the live configuration. This is
a historical implementation check: the user subsequently confirmed successful
browser uploads before Step 5. The current audit still requires an authorized
operator to attest to origin scoping, rather than assuming a current CORS failure.

Retain Block Public Access, bucket-owner-enforced ownership/no public ACLs,
encryption at rest, TLS in transit, and least-privilege principals. For any future
AWS service-principal access, scope trust with appropriate SourceAccount and
SourceArn conditions. Do not widen bucket access to work around CORS or a 403.
The local profile was also denied public-access-block inspection; privacy was
not independently audited or changed in this task.

References: [AWS signing required headers](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-request-presigner/),
[AWS conditional writes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/conditional-writes.html),
[AWS CORS](https://docs.aws.amazon.com/AmazonS3/latest/userguide/enabling-cors-examples.html),
[AWS S3 security](https://docs.aws.amazon.com/AmazonS3/latest/userguide/security-best-practices.html).

## Verification

```powershell
npx tsc --noEmit
npm run build
npm test -- --runInBand
```

Tests mock Prisma and AWS calls. They cover guards on both endpoints, validation,
draft/owner authorization, signing headers/expiry, pending metadata, missing or
invalid uploads, verified completion, retries, races, and sanitized AWS errors.
Unit tests use available loopback ports and close their servers. They do not
create real S3 objects, modify data, or run migrations.
