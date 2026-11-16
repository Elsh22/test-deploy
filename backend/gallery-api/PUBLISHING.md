# Album management and publication (Step 3)

The existing AdminModule and AdminAlbumsController are reused and mounted in the
application. There are no duplicate album routes and no frontend changes.
Every management route uses the existing JWT guard, active-user lookup, and
ADMIN/SUPER_ADMIN role guard. ADMIN may list/read/modify only owned albums;
SUPER_ADMIN may manage all albums. Unauthenticated requests return 401,
insufficient role/ownership 403, unknown albums 404, malformed input 400, and
invalid state/conflicting modifications 409. AWS/storage failures return a
sanitized 503, never raw errors or storage paths.

## Endpoints

All paths below start with `/api/admin/albums`:

| Method | Path | Body / behavior |
| --- | --- | --- |
| POST | `/` | Existing create: title, slug, optional description/eventDate; owner comes from JWT |
| GET | `/` | Owned albums in every status; SUPER_ADMIN sees all |
| GET | `/:albumId` | Album and ordered photo metadata, including drafts |
| PATCH | `/:albumId` | Optional title, description, eventDate, slug; at least one field |
| PUT | `/:albumId/photos/order` | `{ "photoIds": ["UUID", "UUID"] }`, every album photo exactly once |
| PUT | `/:albumId/cover` | `{ "photoId": "UUID" }`, atomically selects exactly one processed cover |
| POST | `/:albumId/publish` | `{}` for all photos, or `{ "photoIds": ["UUID"] }` for a selected subset |
| POST | `/:albumId/archive` | No body required; archive a published album without S3 deletion |

Route IDs must be UUIDs. DTOs reject unexpected fields, client-supplied keys,
status/owner overrides, duplicate photo IDs, invalid dates, path-like slugs,
invalid titles, and oversized arrays. Slugs are lowercase hyphen-separated
alphanumeric strings, at most 120 characters. Description and eventDate can be
cleared with null. Slugs may change only on DRAFT albums; other metadata,
ordering, and cover may change on DRAFT/PUBLISHED albums. ARCHIVED albums are
read-only. Published covers must already belong to the published photo subset.

Ordering accepts at most 500 IDs. Publication selects 1 through 100 unique photos
per request (no-body/empty-body defaults still enforce this cap). Unselected
PENDING/FAILED/private photos remain private, with no published keys or URLs.
A published album's selection is fixed; a repeated publish request must match
it or omit the selection. This step does not add unpublish/restore/add-to-live
operations. Archive is safe to repeat.

## Publication prerequisites and storage

A valid DRAFT album needs at least one selected photo, exactly one cover in the
album, and that cover must be selected. Every selected photo must be PROCESSED
and have both optimized keys, positive sizes and dimensions, and matching
server-generated processing-attempt paths. Every source is checked with S3
HeadObject for WebP ContentType, recorded size, and ETag before any transfer.

The publisher copies both private full-size and thumbnail outputs from
`dmc-gallery-staging-2026/processed/*` to new keys in
`dmc-website-gallery-2026`:

```text
Events/{album-UUID}/{publication-attempt-UUID}/{photo-UUID}/full.webp
Events/{album-UUID}/{publication-attempt-UUID}/{photo-UUID}/thumbnail.webp
```

The capital E is intentional. Destination keys do not use editable slugs or
client filenames. CopyObject uses the verified source ETag as CopySourceIfMatch,
replaces metadata with `image/webp` and immutable caching, replaces rather than
copies tags, and sends no ACL. The SDK handles embedded S3 copy errors; a copy
must return an ETag and a destination HeadObject with that ETag must confirm
size/type. No bucket policy, OAC, ACL, CloudFront setting, or IAM permission is
changed by the endpoint.

Only after all copies are verified does one database transaction record Photo
`publishedKey`/`publishedThumbnailKey`, set Album `publishedAt`, and transition
DRAFT to PUBLISHED. Original upload/processing keys and Photo records are kept.
Public API responses expose imageUrl and thumbnailUrl under
`https://d6uqhuj15c85p.cloudfront.net/Events/...`, never private keys or failure
codes. Immutable object URLs mean metadata edits/reordering need no image copy.

## Concurrency, partial failures, and the S3/database boundary

Album mutations take the same transaction-level PostgreSQL advisory lock keyed
by album ID and an Album row lock. This serializes cover/order/edit/publish/
archive operations. Upload and processing flows already use the Album row lock,
so they cannot change draft eligibility during publication. Competing album
mutations receive 409. One publisher job per API process bounds S3 work (other
concurrent publish calls receive 503). Transfers use a 120-second work deadline,
15-second individual S3 request timeouts, and a bounded 180-second transaction.

If a source is missing, no destination copies start. If a transfer or final
metadata update fails before commit, the transaction rolls back and the album
stays DRAFT. Cleanup attempts only newly generated destination keys, including
requests whose S3 result was uncertain. A retry generates a fresh attempt prefix
and updates the same Photo records; it never creates duplicate photo records.
Successful repeated publication returns the stored publication without more
copies. A changed selection on an already published album returns 409.

S3 and PostgreSQL are not atomic. An uncertain commit must not cause automatic
deletion of objects that a successful commit may already reference. The service
therefore preserves those outputs on commit/connection uncertainty; retries read
the database to resolve it. Crashes or denied cleanup may leave unreferenced
objects that an operator must reconcile against committed published keys after
all active attempts have stopped. Cleanup errors are logged generically without
private object paths. In versioned buckets, DeleteObject does not purge older
versions; lifecycle/version cleanup remains an operator task.

The public API never exposes a DRAFT/partial album or a URL for an unselected
photo. Bucket access remains private behind the existing CloudFront OAC. There
is still a physical visibility boundary to understand: a copied destination
object could be served by the existing public CloudFront distribution if its
unguessable attempt URL became known before database commit. URLs are neither
returned nor logged before commit, but this is not a per-request CDN
publication-status authorization check. Strict cryptographic denial of every
pre-commit CDN request would require additional viewer authorization or edge/
origin gating. That infrastructure is not changed in this implementation.

## Public listing, detail, and archiving

`GET /api/albums` and `GET /api/albums/` are the same listing route.
`GET /api/albums/:slug` remains the detail route. They query PUBLISHED albums
only, select PROCESSED photos with both published keys, and order by sortOrder
then ID. Responses are allowlisted and canonical published keys are checked
before URL generation. Records without a publication timestamp, usable outputs,
or exactly one valid cover fail closed (omitted from listing / detail 404).
Older manually marked PUBLISHED records without publication metadata are not
silently exposed or backfilled; they require operator review.

Archiving updates only the album status, preserves publishedAt and all historical
S3 objects/keys, and immediately removes it from subsequent public API reads.
Public API responses use Cache-Control: no-store to avoid stale album metadata.
Historical CloudFront image URLs remain accessible/cacheable if already known;
archive is removal from discovery/API, not revocation or deletion of images.
No CloudFront invalidation is performed.

## Local migration and PowerShell testing

From `backend/gallery-api`, use the existing database, JWT config, and AWS profile:

```powershell
npx prisma migrate deploy --config prisma7.config.ts
npm run prisma:generate
npm run build
$env:AWS_PROFILE = 'dmc-gallery-dev'
npm run start:dev
```

Migration `20261116030000_add_photo_publication` adds two nullable TEXT columns
to Photo: publishedKey and publishedThumbnailKey. It was applied to the local
PostgreSQL database during implementation. Existing records, prior migrations,
source objects, and relationships were preserved. Other local databases need
the same additive migration. Do not reset the database. Stop the existing API
instance before starting another.

First log in as described in UPLOADS.md and keep `$authHeaders`. These examples
use an existing owned draft containing processed photos:

```powershell
$api = 'http://127.0.0.1:4000'
$albums = Invoke-RestMethod -Uri "$api/api/admin/albums" -Headers $authHeaders
$albumId = Read-Host 'Existing owned draft album UUID'
$draft = Invoke-RestMethod -Uri "$api/api/admin/albums/$albumId" -Headers $authHeaders

$metadata = @{ title = 'Mastercard x Virginia Credit Union Meeting'; description = 'DMC event photographs' } | ConvertTo-Json
Invoke-RestMethod -Method Patch -Uri "$api/api/admin/albums/$albumId" -Headers $authHeaders -ContentType 'application/json' -Body $metadata

# Supply every photo UUID in the desired order (including unpublished photos).
$order = @{ photoIds = @($draft.photos.id) } | ConvertTo-Json
Invoke-RestMethod -Method Put -Uri "$api/api/admin/albums/$albumId/photos/order" -Headers $authHeaders -ContentType 'application/json' -Body $order

$selected = @($draft.photos | Where-Object { $_.status -eq 'PROCESSED' })
if ($selected.Count -eq 0) { throw 'Process at least one photo before publishing' }
$cover = @{ photoId = $selected[0].id } | ConvertTo-Json
Invoke-RestMethod -Method Put -Uri "$api/api/admin/albums/$albumId/cover" -Headers $authHeaders -ContentType 'application/json' -Body $cover

# Review the selection before this command: it releases CloudFront image URLs.
$selection = @{ photoIds = @($selected.id) } | ConvertTo-Json
$published = Invoke-RestMethod -Method Post -Uri "$api/api/admin/albums/$albumId/publish" -Headers $authHeaders -ContentType 'application/json' -Body $selection -TimeoutSec 210
Invoke-RestMethod -Uri "$api/api/albums/$($published.slug)"

# Same selection: idempotent, without re-copying objects.
Invoke-RestMethod -Method Post -Uri "$api/api/admin/albums/$albumId/publish" -Headers $authHeaders -ContentType 'application/json' -Body $selection -TimeoutSec 210

# Hides the album from public API reads, retaining historical objects.
Invoke-RestMethod -Method Post -Uri "$api/api/admin/albums/$albumId/archive" -Headers $authHeaders
# GET /api/albums/{slug} now returns 404; existing historical image URLs persist.
```

Step 5 adds a shared PostgreSQL quota of 4 publication requests/minute per
administrator, plus separate upload/processing/read quotas. Source-IP controls
at trusted ingress remain required. The process-local publication cap limits S3
work and supplements the distributed limiter. Copies, source/destination
HEAD requests, destination storage, and cleanup can incur standard S3 charges.

## IAM inspection and required permissions

Read-only inspection with `dmc-gallery-dev` authenticated successfully, but IAM
SimulatePrincipalPolicy and inline policy listing were denied/unavailable. Its
complete effective permissions could not be verified, so **no live publication
copy or event publication was attempted**. No IAM or bucket-policy changes were
made. An authorized operator must inspect attached and inline policies, relevant
resource policies, permission boundaries/SCPs, and encryption requirements before
performing the real publication workflow.

Server-side copy is not a single `s3:CopyObject` IAM action. The runtime identity
needs these scoped permissions:

| Action | Scope | Why |
| --- | --- | --- |
| s3:GetObject | arn:aws:s3:::dmc-gallery-staging-2026/processed/* | Read and HeadObject both optimized sources for CopyObject |
| s3:PutObject | arn:aws:s3:::dmc-website-gallery-2026/Events/* | Write the destination copies |
| s3:GetObject | arn:aws:s3:::dmc-website-gallery-2026/Events/* | HeadObject destination verification |
| s3:DeleteObject | arn:aws:s3:::dmc-website-gallery-2026/Events/* | Best-effort cleanup of failed, uncommitted attempts only |

No PutObjectAcl, bucket-policy editing, CloudFront administration, or public read
ACL is needed. Tagging permissions are not required for copied source tags,
since the request replaces tags rather than copying them. For SSE-KMS, verify
source kms:Decrypt and destination kms:GenerateDataKey plus appropriate KMS key
policies; destination verification may have additional key-policy implications.
Retain least privilege, TLS, bucket encryption, Block Public Access, and the
existing CloudFront service-principal/SourceArn restrictions. Do not widen origin
access or add public ACLs to fix a copy error.

For a deterministic, reviewable baseline from the runtime SDK source, an operator
with uvx available can run this AWS IAM Policy Autopilot command. It generates a
candidate; it does not upload or apply policies. uvx was not available in this
workspace, and policy generation/installation was not needed for the read-only
permission check:

```powershell
$apiRoot = (Get-Location).Path  # run from backend/gallery-api
$awsCli = 'C:/Program Files/Amazon/AWSCLIV2/aws.exe'
$account = & $awsCli sts get-caller-identity --profile dmc-gallery-dev --query Account --output text
uvx iam-policy-autopilot@latest generate-policies "$apiRoot/src/admin/publication-storage.service.ts" "$apiRoot/src/uploads/staging-storage.service.ts" --region us-east-2 --account $account --service-hints s3 --pretty
```

Review resource/prefix scoping and effective denies before applying any generated
policy. No policy is automatically installed. References:
[AWS CopyObject](https://docs.aws.amazon.com/AmazonS3/latest/API/API_CopyObject.html),
[AWS S3 permission mapping](https://docs.aws.amazon.com/AmazonS3/latest/userguide/using-with-s3-policy-actions.html).

## Verification and changed files

```powershell
npx tsc --noEmit
npm run build
npm test -- --runInBand
```

Tests mock S3 and Prisma, checking successful publication, all guard-protected
routes, owner/SUPER_ADMIN scoping, strict DTOs, missing/non-processed photos,
source/destination verification, selection and covers, order changes, partial
transfer failures, retries, concurrent requests, uncertain commits, public URL
mapping/visibility, and archival without deletion. Live S3 transfers and CDN
serving of a newly published album remain unverified due to the IAM inspection
restriction. No deployed infrastructure or frontend code was changed.

All paths below are relative to backend/gallery-api:

- prisma/schema.prisma; prisma/migrations/20261116030000_add_photo_publication/migration.sql.
- src/admin/dto/create-album.dto.ts; src/admin/dto/manage-album.dto.ts.
- src/admin/admin-albums.controller.ts; src/admin/admin-albums.controller.spec.ts.
- src/admin/admin-albums.service.ts; src/admin/admin-albums.service.spec.ts.
- src/admin/publication-storage.service.ts; src/admin/publication-storage.service.spec.ts.
- src/admin/admin.module.ts; src/app.module.ts.
- src/albums/published-images.ts; src/albums/albums.service.ts; src/albums/albums.service.spec.ts; src/albums/albums.controller.ts.
- test/app.test.cjs.
- README.md; PROCESSING.md; PUBLISHING.md.
