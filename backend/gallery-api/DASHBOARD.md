# Next.js gallery administrator dashboard (Step 4)

Open **http://localhost:3000/gallery-admin/login** after starting both apps.
The existing public `/gallery` and `/gallery/mastercard-vacu-2026` pages remain
unchanged. This interface uses real NestJS album data and existing administrator
accounts. It adds no registration, refresh-token, or credential-provisioning API.

## Local startup

Terminal 1, from the repository root:

```powershell
cd backend/gallery-api
npm ci
npx prisma migrate deploy --config prisma7.config.ts
npm run prisma:generate
$env:AWS_PROFILE = 'dmc-gallery-dev'
npm run start:dev
```

Terminal 2:

```powershell
cd frontend
npm ci
$env:GALLERY_API_BASE_URL = 'http://127.0.0.1:4000'
$env:GALLERY_ADMIN_ORIGIN = 'http://localhost:3000'
npm run dev
```

Use the exact configured website hostname/origin. An origin configured as
localhost does not authorize mutations from 127.0.0.1. Both origins are approved
for S3 CORS, but the dashboard uses one canonical origin. Configuration can also
live in the frontend's ignored `.env.local`; frontend `.env.example` documents
these server-only variables. Never prefix them with NEXT_PUBLIC_ or copy the
backend JWT signing secret/AWS credentials into frontend configuration.
The backend API base accepts HTTPS URLs, or HTTP on loopback for local use.
Production needs an HTTPS website origin, the production Secure cookie, and an
appropriately secured API URL. Use dev mode for local HTTP testing.

Stop previous instances before restarting. The API defaults to port 4000; the
website defaults to 3000. Existing port-conflict guidance remains in README.md.
There are no deployment commands in this step.

## Routes and workflow

- `/gallery-admin/login`: administrator sign-in only.
- `/gallery-admin`: owned albums (all albums for SUPER_ADMIN), status filters,
  search, protected cover previews, counts, and creation.
- `/gallery-admin/albums/{UUID}`: metadata editing, bulk uploads, processing
  state, private thumbnails, ordering, cover selection, publish review, archive.

Draft slugs may change; published slugs stay fixed. Archived albums are read-only.
Dates and descriptions can be cleared. The UI follows the backend's ownership,
publication selection, and archival rules; the backend remains authoritative.
Photo ordering supports desktop drag-and-drop and labeled move buttons for
keyboard/touch use. New orders include every album photo exactly once. Cover
selection uses the existing cover endpoint, preserving exactly one cover.

Choose or drop at most 20 JPEG/PNG/WebP files, at most 10 MiB each, then select
Upload queued photos. Files run sequentially to respect the existing bounded
Sharp processor. Each row shows preparing, upload byte progress, verification,
processing, completion, or a retryable error. A failed photograph does not
prevent subsequent photographs in the batch from running. Queued/failed rows
must be finished or explicitly dismissed before publication review. Dismiss only
removes the local queue row; it does not delete backend Photo records or objects.

The browser requests a signed PUT via the same-origin proxy and sends the raw
file directly to the exact staging host with the returned Content-Type and
If-None-Match headers. No API JWT is sent to S3, and image file bodies do not
pass through Next.js. Completion and Sharp processing then use authenticated
JSON requests. The client validates the signed host/path and required headers
before sending a file.

Only processed photos can be selected for publication. Select one cover among
them. The review dialog lists the selected/unselected counts and cover, and
requires explicit confirmation. Unselected photos stay private. Archive also
requires confirmation, hides the album from public API reads, and preserves
historical image objects and URLs, as described in PUBLISHING.md.

The public website gallery is still its existing implementation; it has not been
replaced or rebuilt to list arbitrary newly published database albums. Published
images and the existing Nest public API are available through the Step 3 contract.

## Authentication and CSRF

Next's Node route handler `/api/gallery-admin/[...path]` is a closed allowlist of
existing API operations, not an arbitrary upstream proxy. It forwards no caller
Authorization header, host, query string, bucket name, or custom redirect target.
Backend requests use a configured URL, no-store caching, and reject redirects.

Login calls the real Nest `/api/auth/login`, validates the returned token through
`/api/admin/me`, and stores only the short-lived access token in an HttpOnly,
SameSite=Strict, path=/ cookie, capped at the actual JWT expiry and 15 minutes.
Production uses Secure and the host-only `__Host-dmc-gallery-admin` prefix; local
dev uses `dmc-gallery-admin`. No session or password is written to localStorage,
sessionStorage, or client props. The login response to JavaScript contains only
administrator metadata and remaining lifetime, never the JWT.

Protected layouts/pages validate the cookie with Nest, without relying on cookie
presence or middleware alone. API calls always repeat backend authentication and
role/ownership checks. Server-rendered responses never serialize the access
token. Next streaming may encode an anonymous redirect in the streamed response
rather than use HTTP 307; no private album data is rendered in that response.

All proxy mutations, including login/logout, require the exact website Origin,
reject cross-site Fetch Metadata, and accept small JSON requests only. The proxy
caps metadata bodies at 32 KiB. Production mutations fail closed if the canonical
origin is missing. SameSite cookies supplement this Origin/content-type defense.
Admin UI responses disallow framing and use no-referrer; private API/image
responses use no-store and nosniff. Next image optimization is intentionally not
used for private thumbnails because it cannot forward the browser session.

Expired/rejected tokens clear the proxy cookie and require reauthentication.
The UI checks sessions periodically and redirects expired actions to the fixed
login route. No refresh endpoint is invented and no token lifetime is extended.
Logout calls authenticated `POST /api/auth/logout` to persist a SHA-256 access-token
denylist entry before clearing the browser cookie. Each protected API request
checks this shared denylist. There is still no refresh endpoint. The proxy clears
its cookie even on a network failure and reports that server revocation could not
be confirmed; a stolen token could then survive until its original 15-minute expiry.

Before public/shared hosting, apply shared login and mutation rate limits at the
trusted ingress and follow existing backend upload/processing/publishing
throttling requirements. The API now also enforces shared PostgreSQL quotas;
see [the audit](../../SECURITY_AUDIT.md) for limits and remaining dependency blockers.

## Backend gaps addressed

### Private previews

Added `GET /api/admin/photos/:photoId/preview`, protected by the existing JWT/role
guards and album-owner/SUPER_ADMIN rules. It returns only the PROCESSED WebP
thumbnail, validates the server-generated processed key, and uses the existing
bounded S3 reader. It never returns an S3 GET URL, bucket key, or raw upload.
The Next proxy streams those authorized bytes at the same-origin preview URL.
Published thumbnails may use their already-public CloudFront URL. Original
PENDING/UPLOADED files are not exposed as preview images.

This requires backend `s3:GetObject` on staging `processed/*`, already needed
for publication. No public ACL, bucket policy, or CloudFront change is made.

### Safe upload retries

Migration `20261116040000_upload_retry_identity` adds nullable unique
`Photo.uploadRequestId`. Existing rows and migrations are preserved. It was
applied to the local database during implementation. No file data is stored in
PostgreSQL. The existing upload endpoint accepts optional requestId UUIDs, checks
album ownership and matching immutable metadata, and reuses the same Photo and
key. A matching race is rechecked under the existing album row lock.

A matching PENDING request gets a fresh five-minute URL to the same key;
UPLOADED/FAILED/PROCESSED responses return the existing photoId/status without
another upload URL. Other clients omitting requestId retain the original API
behavior. Admin photo responses now include source size and uploadRequestId for
resuming a pending upload after reauthentication/reload.

The queue saves each checkpoint in component memory. On an uncertain PUT it
checks completion first; a verified existing object skips PUT. A missing object
gets a renewed URL with the same requestId/key. S3 412 also triggers verification,
not a duplicate record. Processing retries use the existing photoId and never
re-upload bytes. Ambiguous metadata-request failures reuse the same identity.

Browser reload discards File objects. Reauthenticate if needed, then use Resume
upload on a new PENDING record and reselect the original file with matching name,
MIME, and size; or Retry processing on UPLOADED/FAILED records. Rows created
before this migration have no uploadRequestId and are not automatically resumable
through the new UI; operators must review those legacy pending records. Corrupt
immutable source objects require an intentional new upload with corrected data,
not an overwrite disguised as a retry. No delete-photo endpoint is invented.

## Verification and known live blockers

Frontend:

```powershell
cd frontend
npm test
npx tsc --noEmit
npm run lint
npm run build
```

Backend:

```powershell
cd backend/gallery-api
npx tsc --noEmit
npm run build
npm test -- --runInBand
```

Frontend tests use Vitest, Testing Library, and jsdom for interface interaction,
plus Node tests for the real proxy/security helpers. They cover auth cookies,
expired sessions, CSRF, server protection, body/path limits, sanitized errors,
private previews, creation/editing, ordering/covers, publishing eligibility and
confirmation, archiving, multiple-file uploads, and retry checkpoints. Backend
tests mock Prisma/AWS and add preview ownership, role checks, and idempotent URL
issuance. Existing tests remain executable.

Read-only live HTTP checks verified the login page, anonymous server redirect,
CSRF rejection, cookie clearing, authenticated proxy and server-rendered album
pages, absence of JWTs from HTML, and unchanged public gallery routes. This check
used a short-lived locally signed test token with an existing active admin;
it did not create an account, change passwords, or publish albums. Password-based
login was exercised with mocked API responses in automated tests, not with a
user's real credentials.

**Historical Step 4 observation, superseded:** browser preflights previously
returned 403, and this profile could not update CORS. Before Step 5 the user
confirmed that the complete real workflow, including browser uploads and
CloudFront delivery, works. Do not treat the earlier CORS failure as a current
functional blocker. Step 5 read-only configuration inspection was still denied;
an authorized operator must independently attest to the current allowed origins.
No live infrastructure was changed during the security audit.

Real S3 upload/preview/processing/publication round trips were not performed.
The runtime identity still needs staging processed-object read access and the
published-prefix permissions documented in PROCESSING.md and PUBLISHING.md.
Live permission sufficiency remains unverified. The Step 3 pre-commit CloudFront
visibility caveat is unchanged. Browser preview automation was unavailable, so
responsive CSS was reviewed and DOM interactions tested, but desktop/tablet/mobile
screenshots and native focus/drag interactions remain unverified.

## Changed-file manifest

Frontend paths relative to frontend/:

- package.json, package-lock.json (server-only boundary and test-only tooling).
- next.config.js, .env.example, README.md.
- src/components/Layout/SiteChrome.tsx (exclude only the new admin area from public chrome).
- src/lib/gallery-admin/{types,client,server,proxy,upload}.ts.
- src/components/GalleryAdmin/{LoginForm,SessionControls,PhotoPreview,AlbumForm,Dashboard,ConfirmDialog,UploadQueue,AlbumEditor}.tsx.
- src/components/GalleryAdmin/gallery-admin.module.css.
- src/app/api/gallery-admin/[...path]/route.ts.
- src/app/gallery-admin/{layout.tsx,error.tsx,loading.tsx,not-found.tsx,login/page.tsx}.
- src/app/gallery-admin/(protected)/{layout.tsx,page.tsx,albums/[albumId]/page.tsx}.
- vitest.config.mts; test/{setup,server-only}.ts;
  test/gallery-admin/{fixtures.ts,upload.test.ts,proxy.test.ts,interface.test.tsx}.

Backend paths relative to backend/gallery-api/:

- prisma/schema.prisma; prisma/migrations/20261116040000_upload_retry_identity/migration.sql.
- src/uploads/dto/create-upload.dto.ts; src/uploads/uploads.service.ts; src/uploads/uploads.service.spec.ts.
- src/uploads/photo-preview.service.ts; src/uploads/photo-preview.service.spec.ts.
- src/uploads/uploads.controller.ts; src/uploads/uploads.controller.spec.ts; src/uploads/uploads.module.ts.
- src/admin/admin-albums.service.ts (source-size/retry-identity metadata for authorized admins).
- README.md, UPLOADS.md, DASHBOARD.md.

Implementation verification result: frontend TypeScript, lint, build, and 41 tests
passed; backend TypeScript, build, migration-status check, and 186 tests passed.
Existing lint/build/dependency audit findings outside this feature remain.
Use Node.js 22.12+ on the Node 22 line (tested with 22.16) for the dashboard test
tooling and both local applications.
