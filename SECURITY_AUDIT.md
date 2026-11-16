# DMC Gallery security audit and integration testing

Update, November 16, 2026: the subsequent [production build and dependency review](docs/PRODUCTION_BUILD_REVIEW.md)
supersedes the framework-version and dependency-audit results below. Next.js is
now patched to 15.5.29, and all three production dependency audits have zero
critical findings. The original operational and infrastructure readiness gates
remain open; this update does not authorize deployment.

Audit date: November 15, 2026, America/New_York (November 16 UTC).
Scope: `frontend/` gallery administration and `backend/gallery-api/`.
Recommendation: **NO-GO for public production deployment.** Local development can continue.

The core gallery workflow passes automated checks. Remaining framework security
advisories and unverified production infrastructure/operations prevent approval.
No deployment, AWS infrastructure changes, live uploads/publication, or deletion
of existing records, images, migrations, or resources occurred during this audit.
Existing unrelated website changes were preserved. Work remains on
`feature/local-gallery-api`; nothing was merged.

## Findings and remediation

Severity describes impact in the applicable deployment, not merely an npm label.
“Unverified” means evidence is unavailable, not that a configuration is insecure.

| ID | Severity | Finding and evidence | Disposition |
| --- | --- | --- | --- |
| SEC-01 | Critical | Next.js 14.x is affected by unauthenticated Windows-hosted server RCE, GHSA-p293-qw3h-jr36. This workspace uses Windows. The vendor states there is no workaround for affected Windows hosts. | **Open, deployment blocker.** Updated 14.2.15 to the latest available 14.x patch, 14.2.35, which fixes older issues but does not address this advisory. Propose a separately reviewed migration to a currently patched supported Next major, including lint/config/React compatibility checks. Do not expose this development server publicly. |
| SEC-02 | Critical, conditional | Next image-optimization AVIF/SVG native-decoder advisories affect vulnerable Sharp builds. Exploitation requires affected image input to reach the optimizer and, for the cited SVG issue, a glibc Linux host. Admin thumbnails bypass the optimizer; gallery upload processing rejects SVG/AVIF. | **Native dependency mitigation applied:** frontend Sharp 0.33.x → 0.35.5; runtime loads patched libvips 8.18.7. Backend already uses Sharp 0.35.5. Next still receives advisory flags; framework upgrade and deployment-platform verification remain required. No exploit was executed. |
| SEC-03 | High | Login had no enforced application quota; Argon2 work could be flooded. Documentation alone did not enforce throttling. | **Fixed in application:** PostgreSQL-backed atomic quotas, bounded password verification, generic failures. **Ingress requirement remains:** shared trusted-source-IP limits before public access. |
| SEC-04 | High | Logout previously cleared only the browser cookie. A copied access token remained usable after logout. | **Fixed:** authenticated role-protected logout stores a SHA-256 token digest in PostgreSQL; all protected requests reject revoked tokens. Proxy revokes then clears cookie. Database outages fail closed. No refresh endpoint was added. |
| SEC-05 | Medium | JWT verification restricted signature algorithm, issuer and audience but did not require expiry/issued-at claims or bound lifetime. Tokens without expiry could pass library verification if signed by the issuer. | **Fixed:** require valid integer iat/exp, expiry in future, iat not in future, lifetime ≤900 seconds, bounded subject/token length. Sign HS256 explicitly, issue random jti per login. Minimum signing-secret length is 32 bytes; entropy still requires secure generation. |
| SEC-06 | Medium | Unknown/inactive accounts returned before password verification, creating a timing distinction. | **Mitigated:** unknown accounts verify against a randomly generated Argon2 dummy hash; inactive accounts still perform verification. Same 401 message. This is not a guarantee of identical timing across different stored Argon2 parameters. |
| SEC-07 | Medium | API metadata bodies lacked a small explicit limit; JSON content-type matching in the proxy accepted prefixes such as application/jsonp. Baseline transport headers and centralized sanitized error correlation were incomplete. | **Fixed:** 32 KiB JSON parser limit, strict proxy media-type boundary, bounded login fields, nosniff/frame/referrer/no-store headers, sanitized unexpected errors with request IDs. Parse errors do not echo passwords or bodies. |
| SEC-08 | Medium | Copies become accessible at their eventual CloudFront paths before the database publication transaction commits. Failed/uncertain operations can leave unreferenced destination objects. | **Residual architectural risk.** Random attempt UUIDs make URLs unguessable, but are not authorization. Public API never exposes drafts/partial publications. Strict pre-commit secrecy needs a reviewed private delivery/signing gate or equivalent infrastructure design. No live policy changes made. |
| SEC-09 | Medium | Source uploads and expired denylist/rate metadata do not have an automatic retention/reconciliation job. Signed PUTs do not enforce declared byte size before storage. Unique-email attempts can grow the rate table. | **Open operational requirement:** trusted-ingress IP limits, storage/DB monitoring, approved retention and reconciliation. Source/signature validation blocks processing/publication of invalid data, not transient S3 cost. No cleanup was run because existing data must be preserved. |
| SEC-10 | Medium | Effective production IAM, Block Public Access, ownership controls, CORS, CloudFront OAC/policies, backups and alarms cannot be independently attested from this profile. Read-only inspection returned AccessDenied. | **Unverified readiness gate.** Obtain evidence from an authorized operator; do not widen runtime permissions to administer infrastructure. |
| SEC-11 | Medium | Account quotas alone do not stop password spraying over many email identities; authenticated quotas do not protect unauthenticated traffic or large HTTP headers. | **Open readiness gate:** reverse-proxy global/source-IP limits, header/body/time limits, TLS, and alerts. Do not trust client-supplied X-Forwarded-For. Per-account lockout also has an availability tradeoff. |
| SEC-12 | Low | CSP blocks framing/objects/base changes but is not a complete script-nonce policy. Management lists are unpaginated. Health is a liveness check, not a dependency-readiness check. | React text escaping and fixed redirects were verified. Plan a compatible nonce CSP, pagination, and dependency-readiness probes separately. No unrelated site behavior changed. |

Vendor sources: [Windows RCE](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36),
[SVG optimizer / Sharp workaround](https://github.com/vercel/next.js/security/advisories/GHSA-2464-fhr4-w9xw),
[AVIF optimizer](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4),
[Next support policy](https://nextjs.org/support-policy).

## Authentication, authorization and application review

- JWTs are verified by Nest against HS256, issuer `dmc-gallery-api`, audience
  `dmc-gallery-admin`, expiry and maximum lifetime. Current role/active state is
  loaded from PostgreSQL on every protected request; stale signed roles do not
  override database roles. Revocation-store failures return sanitized 503.
- Production cookies use `__Host-`, Secure, HttpOnly, SameSite=Strict, Path=/,
  no Domain, and maximum age bounded by actual token expiry/15 minutes. Login
  replaces the cookie and now creates a unique token identity. Tokens/passwords
  never enter localStorage or administrator HTML/props.
- Expired/rejected sessions require login again. Logout invalidates the specific
  access token across instances. It does not invalidate other separately issued
  sessions. If revocation cannot be confirmed, the browser cookie is still cleared
  and the UI reports the limitation; a copied bearer may survive its original TTL.
- Every management/upload/completion/processing/preview route requires JWT and
  ADMIN or SUPER_ADMIN. Ownership checks apply to albums and to photos through
  their album. SUPER_ADMIN intentionally manages all albums. Archived albums are
  read-only. Authorized published-album title/description/order/cover edits remain
  permitted by the existing contract; uploading/processing/slug changes do not.
- The Next proxy permits only explicit backend paths, validates UUIDs, rejects
  query strings, blocks upstream redirects, and does not proxy arbitrary URLs.
  Server-rendered administrator routes verify `/api/admin/me`.
- All cookie-authenticated mutations, including login/logout, require exact
  canonical Origin and reject cross-site Fetch Metadata. JSON metadata is bounded.
  Nest accepts bearer credentials, not the browser session cookie, and does not
  enable broad browser CORS. S3 CORS is a separate infrastructure concern.
- Prisma queries use bound values; raw lock/rate SQL uses tagged parameters.
  No unsafe SQL interpolation, eval, untrusted HTML rendering or arbitrary redirect
  target was found in the gallery code. React escapes administrator-entered text.
  Errors/operational logs omit SQL, request bodies, tokens, credentials and raw AWS
  exceptions. New unexpected-error logs contain a request ID/status only.
- `.env` / `.env.local` are ignored. A focused source scan found no AWS access-key
  or private-key literals. This is not a full Git-history secret scan. No secret
  values were printed or changed. Production uses workload roles/default chain.

## Upload, image processing and publication review

- Signed PUTs expire after 300 seconds and bind Content-Type and If-None-Match: `*`.
  Clients cannot choose bucket, key or ACL. Server UUIDs identify new photographs;
  retry request IDs reuse the same record/key. No AWS credentials reach browsers.
- JPEG/PNG/WebP filename/MIME declarations and 10 MiB size are validated. Completion
  checks actual HeadObject length and MIME before UPLOADED; matching declarations
  are not treated as proof of safe content.
- Sharp checks signatures and actual decoding, MIME/format agreement, one frame,
  ≤24 million pixels, ≤8192 per dimension, and ≤4 channels. It bounds cache/native
  concurrency and decoding time, corrects EXIF orientation, strips metadata and
  produces WebP full/thumbnail images within 1920/480 pixels without enlargement.
  Input reads are byte/time bounded. Native libraries still require OS/container
  memory limits and timely patches; cache limits are not total RSS limits.
- Processed outputs remain private staging objects. PROCESSED is committed only
  after both writes. Failure records a safe code and attempts cleanup of only that
  new attempt. Retry and concurrency controls use local work caps, transaction-level
  PostgreSQL advisory locks and consistent album/photo row locks.
- Publication requires an eligible draft, processed selected photos, complete
  optimized metadata, exactly one selected cover, and verified source objects.
  Source ETags condition copies; destination HEAD confirms size/type/ETag. Outputs
  use fresh `Events/{album UUID}/{attempt UUID}/{photo UUID}/...` keys and no ACL.
  Only after all copies verify does the transaction commit published keys/status/date.
- Duplicate publication is idempotent. Pre-commit transfer failure leaves the
  album draft and attempts cleanup of that attempt. Ambiguous commit failures keep
  outputs rather than risking deletion of committed photographs. S3 and PostgreSQL
  are not atomic; reconciliation is still necessary after crashes.
- Public endpoints select PUBLISHED only and expose ordered, allowlisted data with
  canonical CloudFront URLs. Draft/archive detail reads return 404. Archive hides
  the API entry but intentionally retains historical objects and usable existing
  CloudFront URLs. Archive is not revocation of an already public photograph.

## Dependency audit and exploitability

`npm audit --json` and `npm audit --omit=dev --json` completed against both lockfiles.
Counts are affected package entries reported by npm, including inherited severity;
they are not counts of distinct exploitable attacks.

| Application / scope | Critical | High | Moderate | Low | Total |
| --- | ---: | ---: | ---: | ---: | ---: |
| Frontend, all dependencies | 6 | 26 | 20 | 14 | 66 |
| Frontend, production dependencies | 6 | 18 | 17 | 14 | 55 |
| Gallery API, all dependencies | 0 | 0 | 3 | 8 | 11 |
| Gallery API, production dependencies | 0 | 0 | 0 | 0 | 0 |

Baseline frontend count was 67 (27 high); frontend Sharp remediation removed one
high package entry. Updating Next 14 fixed older advisories but newer advisories
keep its aggregate severity Critical. Native Sharp mitigation does not erase the
Next version-range advisory flags. No `npm audit fix --force` or bulk upgrade ran.

Priority and reachability assessment:

1. **Next runtime:** Windows RCE and RSC denial-of-service apply to relevant deployed
   runtime paths. Gallery authentication checks cannot fix a framework request parser.
   A supported patched major is required. Middleware-bypass advisories are not the
   gallery's authorization boundary: the dashboard verifies sessions server-side
   and Nest authorizes every operation. Conditional rewrite/custom-server/nonce
   advisories still require review against the eventual deployment configuration.
2. **Frontend legacy dependencies:** npm reports Critical for fast-xml-parser,
   form-data, mongoose, next-auth and tar, plus High for axios, multer, nodemailer,
   Cloudinary/zod and other chains. Focused `frontend/src` searches found no direct
   use of these legacy clients in the gallery workflow; gallery uses native fetch,
   Nest JWT, Prisma and direct signed PUTs. This reduces demonstrated gallery
   reachability but is not proof that bundled/transitive or unrelated website routes
   are safe. Tar is principally an installation/archive-extraction chain, not an
   image-upload parser here. Remove unused dependencies or update their owning
   features in a separate reviewed change; do not migrate authentication/databases.
3. **Build tools:** frontend CDK/glob/style/lint chains and backend Nest CLI/glob/
   minimatch/Jest chains require malicious build input or tool execution in many
   cases. The API production audit is clean; development/CI findings still matter.
   Suggested automated Nest CLI major upgrades/Jest downgrades were not applied.
4. Node itself and the deployment OS/native runtime are outside npm's vulnerability
   inventory. Use a currently patched supported Node LTS, not merely the local
   22.16.0 minimum-compatible installation. See [Node release policy](https://nodejs.org/en/about/previous-releases).

Frontend `@types/node` was updated to the Node 22 line to resolve the installed
Vitest peer constraint without `--force`/`--legacy-peer-deps`. Existing lint/build
warnings in unrelated site code remain: native img suggestions, Supabase Edge
runtime process.version usage, stale Browserslist data and webpack cache warnings.

## Verification results

| Check | Result |
| --- | --- |
| Backend `npx tsc --noEmit` | Passed |
| Backend `npm run build` | Passed |
| Backend Jest, including opt-in local PostgreSQL tests | Passed: 213 tests across 18 suites, no skipped tests in the full opt-in run |
| Frontend `npx tsc --noEmit` | Passed |
| Frontend `npm run lint` | Passed with pre-existing warnings |
| Frontend `npm run build` | Passed, with warnings described above |
| Frontend `npm test` | Passed: 45 tests across 3 files |
| Prisma generate / validate / migrate status | Passed; five migrations applied locally |
| Both dependency audits | Completed; unresolved findings above; not a security pass |
| Built API HTTP smoke checks | health 200; listings with/without trailing slash 200/empty array; unknown slug 404; anonymous admin/preview 401; security headers present |
| Built Next HTTP smoke checks | public gallery/album/login 200; anonymous admin response contains framework redirect and no album data; proxy 401; cross-origin logout 403 |
| Existing CloudFront photographs | Cover and photo-01 through photo-11 all eventually returned HEAD 200 image/webp, capital Events path preserved. Initial requests intermittently reset connections; bounded retries succeeded. No images downloaded into Git. |
| AWS configuration inspection | AccessDenied: both buckets' public-access-block; staging CORS, policy-status and ownership-controls. No configuration changed. |

Automated coverage includes real signed JWT failures (wrong secret/issuer/audience,
expired/missing-exp/missing-iat/overlong-lifetime), database role changes, logout
revocation, quota failures, CSRF/redirect/body limits, ownership/IDOR and private
previews. Lifecycle HTTP tests integrate real controllers/services/Sharp with
transactional in-memory persistence and mocked AWS: upload → completion → processing
→ ordering → cover → publication → public URLs → archive, plus corrupt bytes,
missing uploads, interrupted copy/retry and idempotency. Existing tests exercise
oversized bytes/dimensions, failed S3 operations, concurrent processing/publication,
ambiguous commits and upload retry checkpoints.

Opt-in PostgreSQL tests verify the actual atomic quota SQL, window reset, and
mutual exclusion/release of photo/album advisory locks across separate transactions.
All fixture writes roll back; no fixture DELETE or existing-record modification is
performed. This does not constitute a full multi-instance load test.

The user reported the entire real local AWS workflow manually passed before this
audit. That is retained as user-provided evidence. This audit did not repeat live
uploads/copies/publishing, access real passwords, run destructive fault injection,
or test production HTTPS infrastructure. Browser visual/device automation was not
available for a fresh responsive review; jsdom/HTTP tests and existing responsive
styles were checked. CloudFront availability does not prove origin policy privacy.

## Migration, local verification and logout testing

New migration: `20261116050000_security_controls`. It only creates
`RevokedAccessToken` (digest, expiry, creation date/index) and `SecurityRateBucket`
(hashed scope/identity, window start, count). Existing tables/data and old migrations
remain intact. Apply it before starting the updated API; missing tables fail closed.
The application DB role needs SELECT/INSERT/UPDATE on these new tables; schema
migrations use a separately controlled role. No new AWS permissions are required.

```powershell
cd backend/gallery-api
npm ci
npm run prisma:generate
npx prisma migrate deploy --config prisma7.config.ts
npx prisma validate --config prisma7.config.ts
npx tsc --noEmit
npm run build
npm.cmd test -- --runInBand

# Optional integration against ONLY the existing loopback PostgreSQL connection:
$env:GALLERY_SECURITY_DB_TEST = '1'
npm.cmd test -- --runInBand
Remove-Item Env:GALLERY_SECURITY_DB_TEST

# Use the login example in UPLOADS.md; do not print $login or bearer credentials.
Invoke-RestMethod -Method Post -Uri "$api/api/auth/logout" -Headers $authHeaders
# Reusing the same $authHeaders for /api/admin/me must now return 401.
# A second logout with the revoked token returns 401; the browser proxy treats this
# as already signed out. No refresh-token operation is needed.

cd ../../frontend
npm ci
npx tsc --noEmit
npm run lint
npm test
npm run build
npm audit
npm audit --omit=dev
```

API quotas: login 8 attempts/email/900 seconds; authenticated reads 180/admin/60
seconds; writes 120/admin/60 seconds; processing 30/admin/60 seconds; publishing
4/admin/60 seconds. PostgreSQL makes counters shared across instances. API 429
responses include a conservative Retry-After, and the proxy forwards a bounded
interval. Logout remains available after workload-quota exhaustion. These are
initial limits to monitor, not a substitute for source-IP/global ingress limits.

## Deployment-readiness checklist and operations

- [x] Preserve public site, album workflow, migrations and data; no deployment.
- [x] Verify guards, ownership, IDOR, claims, expiration, revocation and CSRF.
- [x] Add additive schema, distributed quotas, transport limits and regression tests.
- [x] Verify local build/test commands and direct CloudFront HEAD responses.
- [ ] **Blocker:** review/implement a supported patched Next major upgrade, rerun
  runtime/dependency audits and full website regression tests. Resolve or explicitly
  disposition each remaining reachable Critical/High dependency finding.
- [ ] Configure exact HTTPS `GALLERY_ADMIN_ORIGIN` and server-only
  `GALLERY_API_BASE_URL`; set production NODE_ENV. Require TLS externally and on
  any non-loopback API/database hop; validate certificates. Configure HSTS at trusted
  HTTPS ingress after validating the hostname. Restrict Nest to its trusted network.
- [ ] Inject DATABASE_URL and a randomly generated ≥32-byte JWT_ACCESS_SECRET from
  protected secret storage. Do not use `.env.example` placeholders. Rotate secrets
  with an incident plan; signing-key rotation invalidates all outstanding tokens.
  No AWS/JWT secrets belong in NEXT_PUBLIC variables, images or logs.
- [ ] Enforce ingress IP/global login and request quotas, header/body/time limits,
  bounded connections, and trusted proxy configuration. Do not expose Next dev mode.
- [ ] Obtain effective least-privilege IAM evidence: staging uploads/processed
  GetObject/PutObject and attempted-output cleanup; published Events PutObject,
  GetObject for destination HEAD, and cleanup DeleteObject only as needed. Copy
  needs source read + destination write, not an IAM `s3:CopyObject` action. Scope
  prefixes/buckets; no PutObjectAcl, policy editing or CloudFront admin is needed
  by the runtime. Review KMS permissions if SSE-KMS is used. See PUBLISHING.md.
- [ ] Attest to private staging, Block Public Access, bucket-owner-enforced ownership,
  TLS/encryption, published-origin CloudFront OAC/SourceArn scoping and direct-S3
  denial. Keep CORS to approved origins (`http://localhost:3000` and
  `http://127.0.0.1:3000` locally); production HTTPS origins need separate approval.
- [ ] Accept the documented pre-commit CloudFront exposure window or review a
  delivery-gate design. Confirm archive's historical URL retention meets policy.
- [ ] Set measured container/OS memory/CPU limits and DB pool/statement timeouts;
  test a representative 24MP source and concurrent mixed operations under load.
- [ ] Add monitored liveness AND dependency readiness (DB, credential/storage access),
  with probes restricted appropriately. `/health` alone only proves process liveness.
- [ ] Collect request IDs/status/latency and security events with safe administrator/
  album identifiers; alert on 401/403/429/5xx spikes, login failures, queue/busy
  responses, failed processing/publication, S3 cost, storage growth and DB pressure.
  Configure log retention/access and ensure edge/proxy logs redact authorization,
  cookies, login bodies and presigned URL query strings. No full audit trail is
  claimed by the current minimal error logger.
- [ ] Approve retention for expired token digests/rate buckets and abandoned uploads.
  Reconcile orphan outputs against committed DB references, allow a safety window
  longer than all signed URLs/transactions/retries, and account for S3 versions.
  Never blanket-expire `processed/` while drafts/previews still reference it.
  No automatic cleanup or lifecycle changes were made in this audit.
- [ ] Establish encrypted PostgreSQL backups/PITR and any required S3 versioning/
  backup retention; restrict recovery credentials and rehearse a restore in an
  isolated environment. Agree RPO/RTO and test recovery of DB references with S3.
- [ ] Release only after migration backup/review and `migrate deploy`; never reset
  production. Rollback by restoring the last reviewed application artifact while
  retaining additive tables/data. **Do not roll back to the old non-revoking auth
  implementation** without an incident plan/key rotation. Reconcile ambiguous S3
  operations; do not delete published objects as an application rollback step.
- [ ] Run an authorized staging HTTPS/browser smoke test including signed headers,
  token expiry, logout, interruption/retry, publication, archive visibility and
  image delivery. No destructive testing against existing albums is authorized.

## Files changed by this audit

Backend paths below are relative to `backend/gallery-api/`:

- `prisma/schema.prisma`; new `prisma/migrations/20261116050000_security_controls/migration.sql`.
- `src/auth/auth.module.ts`, `auth.service.ts`, `auth.controller.ts`,
  `dto/login.dto.ts`, `guards/jwt-auth.guard.ts`; new `security.service.ts`.
- `src/security-http.ts` (new), `src/main.ts`, `src/app.module.ts`.
- `src/auth/security.spec.ts` (new), existing `auth.service.spec.ts`,
  `auth.controller.spec.ts`, `src/admin/admin-albums.controller.spec.ts`,
  `src/uploads/uploads.controller.spec.ts`, `test/app.test.cjs`.
- New `test/gallery-lifecycle.test.cjs`, `test/security-database.test.cjs`,
  `test/security-http.test.cjs`.
- `.env.example` (new); README.md, UPLOADS.md, PROCESSING.md, PUBLISHING.md,
  DASHBOARD.md (current controls and historical verification clarification).

Frontend paths below are relative to `frontend/`:

- `src/lib/gallery-admin/proxy.ts`, `src/components/GalleryAdmin/SessionControls.tsx`.
- `test/gallery-admin/proxy.test.ts`, `test/gallery-admin/interface.test.tsx`.
- `next.config.js`, `package.json`, `package-lock.json` (Next/Sharp/Node type updates).

Root: this `SECURITY_AUDIT.md`. Generated Prisma client output is ignored and
regenerated locally. Other already-modified/untracked files belong to prior work
and were not included as new audit changes.

Final test totals: **213 backend + 45 frontend tests passed**. All requested
compilation/lint/build commands passed. Dependency audits completed with the
unresolved findings above. Read-only live AWS policy checks were denied; no live
AWS mutation or fresh end-to-end browser test was performed by this audit.
