# Production build and dependency review

Date: November 16, 2026 (America/New_York).
Base: `Elsh22/test-deploy:main`, `76c3a08`.
Fix branch: `fix/production-build-security`.

## Outcome and scope

This change repairs reproducible dependency installation and Next.js 15 compilation, preserves the local Gallery design work, and removes the initial critical production dependency findings. It does not approve a production rollout: residual advisories and the operational gates in `SECURITY_AUDIT.md` still require review. Nothing was merged or deployed. No existing database, AWS resource, or production secret was changed.

The original checkout at `C:\Users\swats\Documents\GitHub\test-deploy` remains on its original branch with all local modifications and ignored files intact. Work was performed in a separate worktree at `C:\Users\swats\Documents\GitHub\test-deploy-build-fix`. Local Gallery changes were copied into the fix branch. Generated agent documentation and local test scratch files were excluded.

## Root cause and fixes

The failed Actions run reached frontend installation after successfully building Strapi. The lockfile pinned NextAuth **4.24.5**, whose peer constraint excludes Next.js 15, alongside Next.js **15.5.24**. NextAuth **4.24.15** accepts Next.js 15 and React 18. Next.js was patched within version 15 to **15.5.29** and its ESLint config was aligned.

A second peer conflict came from unused `next-cloudinary` 5.20.0, which only accepts Next.js 12–14. Repository source/scripts have no imports of that package, native `bcrypt`, or `nodemailer`; those unused dependencies were removed. `bcryptjs` and all implemented authentication paths remain. NextAuth's Nodemailer 7 peer is optional: removing the unused SMTP dependency avoids a needless major upgrade and its remaining advisories. No NextAuth email provider is configured in this repository.

The existing framework upgrade also left synchronous request APIs. Pages, metadata, and catch-all handlers now await `params`/`searchParams`; Gallery cookies, Supabase cookies and both Supabase factory callers, and donation headers now await the Next.js 15 APIs. `next lint` was replaced with the ESLint CLI. Build-time lint bypass was removed, and the tracing root is set to the frontend directory.

Strapi and both installed official plugins were upgraded together from **5.5.1** to **5.62.0**, staying within major version 5. Compatible dependencies were refreshed. Node **22.23.5** is pinned for CI, with backend engine requirements aligned. The system Node installation was left unchanged; validation used a portable runtime in the temporary task directory.

The Gallery API lacked a direct `@types/express` development dependency; a clean Nest build exposed six missing declaration errors. Adding the Express 5 types repairs compilation without changing runtime controllers, guards, or services.

Five existing Gallery SQL migration files were accidentally excluded from the merge by the backend's broad `*.sql` ignore rule. The original local files were restored unchanged and a narrow migration exception was added. They were applied only to a new isolated PostgreSQL 17 test database, and the resulting schema was compared to Prisma with no drift. Existing databases must have their migration history checked before an operator applies anything.

Same-major dependency overrides patch PostCSS 8, Effect 3, and Zod 4. Zod 3 is retained where upstream packages require its major version. These changes do not introduce major framework, React, Prisma, or NestJS upgrades.

## Validation

Validation uses clean dependency installations without `--force` or `--legacy-peer-deps`. Builds run with no copied `.env` files or production secrets.

| Check | Result |
| --- | --- |
| Frontend clean `npm ci` | Passed |
| Frontend `npm run typecheck` | Passed, including generated Next route types |
| Frontend `npm run lint` | Passed, 23 existing image optimization warnings, 0 errors |
| Frontend tests | 49 passed, including async route and public Gallery regression tests |
| Frontend production build | Passed, all 40 static pages generated |
| Strapi clean `npm ci` | Passed |
| Strapi TypeScript | Passed |
| Strapi production build | Passed, including admin panel |
| Gallery API clean `npm ci` and Prisma generation | Passed |
| Gallery API TypeScript and Nest production build | Passed |
| Gallery API tests with isolated PostgreSQL | 213 passed in 18 suites; none skipped |
| All five migrations on isolated PostgreSQL | Passed |
| Prisma migration/schema drift check | Passed, no difference |
| Production frontend HTTP smoke checks | Gallery and album 200; unknown album 404; expired-session login 200 with notice; unauthenticated admin redirects without private content; protected albums API 401; async v1 courses route 200 |

The unauthenticated admin page uses Next.js streaming: HTTP 200 contains the login redirect, rather than an HTTP 307; no administrator data or album controls are rendered. The protected API returns 401.

The first isolated database run correctly failed because the merged repository had no SQL migrations. After restoring the original migrations, all database tests passed. No reset, seed, or destructive schema command was used. Tests verify fixture rollback and advisory-lock release.

Administrator login/logout, session expiry, token revocation, authorization, CSRF checks, upload retry, processing, cover selection, ordering, publication and archival are covered by the existing frontend and Gallery API tests. HTTP lifecycle tests exercise real Nest controllers/guards and Sharp with deterministic storage/persistence substitutes. The additional database tests use real isolated PostgreSQL. Live AWS uploads, real administrator credentials, live publication, payment transactions, and production databases were not exercised.

## Workflow and hosting

`.github/workflows/deploy.yml` now validates pull requests to `main` and pushes to `main` in three jobs. Checkout/setup-node move from v2 to v6. Installs require committed lockfiles. Type checks, frontend lint/tests, both backend builds, Gallery API tests, migration/schema checks, and critical production audit gates fail the workflow on error. PostgreSQL exists only as a disposable Actions service. `NODE_OPTIONS` is set at workflow scope, so the memory setting persists across steps.

The workflow has read-only repository permissions and does not expose production secrets to pull-request builds. Broad runner cleanup and lockfile fallbacks were removed. There is no deployment command, production migration, AWS step, or automatic merge in this workflow.

Historical repository deployment records identify `vercel[bot]` as the deployment creator. The README also points to Vercel. This supports Vercel as the external hosting integration, but does not establish its current project settings or which services it hosts. The old Actions workflow itself only built; it did not deploy.

## Deployment recommendation

1. Review this PR and require the three GitHub Actions jobs to pass on Linux. Local Windows passes do not substitute for the pending hosted run.
2. Review the residual advisory inventory below and the ingress, storage, backup, and operational requirements in `SECURITY_AUDIT.md`. In particular, do not silently accept the remaining Strapi Zod 3 high advisory or replace it with Zod 4 without a reviewed compatibility change.
3. Before approving a rollout, verify the Vercel project/root directory/Node version and independent Strapi/Gallery API host settings. Confirm whether merging `main` triggers production automatically; keep deployment gated until authorized.
4. Take verified backups and inspect existing Prisma migration history with an authorized operator. Restore/baseline history correctly if a database predates the newly tracked SQL; do not replay the initial CREATE statements blindly, reset data, or delete existing records. Review Strapi's version-5 migration/release notes against a backed-up staging copy before starting the updated runtime on production data.
5. After explicit deployment approval, promote through staging, verify login/logout/revocation and a controlled upload/publication, then deploy with rollback artifacts and monitoring. No such steps were performed here.

## Sources

- Failed run: https://github.com/Elsh22/test-deploy/actions/runs/43810081331
- Next.js 15 async request API guide: https://nextjs.org/docs/app/guides/upgrading/version-15
- NextAuth releases: https://github.com/nextauthjs/next-auth/releases
- Strapi release notes: https://github.com/strapi/strapi/releases
- Strapi security disclosure: https://strapi.io/blog/security-disclosure-of-vulnerabilities-cve-2025-64526-cve-2026-22599-cve-2026-22706-cve-2026-22707-and-cve-2026-27886
- Package compatibility and advisory results were checked against npm registry manifests and `npm audit` on the review date; audit counts may change as advisories are published.

## Dependency versions

Actual direct dependency versions resolved by the lockfiles are listed below when changed. All other direct locked versions are unchanged. Transitive versions also changed during compatible refreshes; the lockfile diffs are the complete machine-readable inventory.


### frontend

| Direct dependency | Scope | Before | After |
| --- | --- | --- | --- |
| @emotion/react | production | 11.11.3 | 11.14.0 |
| @emotion/styled | production | 11.11.0 | 11.14.1 |
| @fullcalendar/daygrid | production | 6.1.10 | 6.1.22 |
| @fullcalendar/interaction | production | 6.1.10 | 6.1.22 |
| @fullcalendar/react | production | 6.1.10 | 6.1.22 |
| @fullcalendar/timegrid | production | 6.1.10 | 6.1.22 |
| @mui/icons-material | production | 5.15.5 | 5.18.0 |
| @react-three/drei | production | 9.96.1 | 9.122.0 |
| @react-three/fiber | production | 8.15.14 | 8.18.0 |
| @stripe/react-stripe-js | production | 2.5.1 | 2.9.0 |
| @stripe/stripe-js | production | 3.0.7 | 3.5.0 |
| @studio-freight/lenis | production | 1.0.34 | 1.0.42 |
| @supabase/ssr | production | 0.12.0 | 0.12.7 |
| @supabase/supabase-js | production | 2.108.2 | 2.119.0 |
| @testing-library/react | development | 16.3.0 | 16.3.3 |
| @testing-library/user-event | development | 14.6.1 | 14.6.12 |
| @types/jsonwebtoken | development | 9.0.5 | 9.0.10 |
| @types/locomotive-scroll | development | 4.1.3 | 4.1.4 |
| @types/multer | development | 1.4.11 | 1.4.13 |
| @types/nodemailer | development | 6.4.14 | removed |
| @types/react | development | 18.2.46 | 18.3.31 |
| @types/react-bootstrap | development | 0.32.35 | 0.32.37 |
| @types/react-dom | development | 18.2.18 | 18.3.7 |
| @types/styled-components | production | 5.1.34 | 5.1.36 |
| @uploadthing/react | production | 6.1.0 | 6.8.0 |
| autoprefixer | development | 10.4.16 | 10.6.2 |
| axios | production | 1.6.4 | 1.21.1 |
| bcrypt | production | 5.1.1 | removed |
| date-fns | production | 3.3.1 | 3.6.0 |
| dotenv | production | 16.3.1 | 16.6.1 |
| eslint | development | 8.56.0 | 8.57.1 |
| eslint-config-next | development | 14.0.4 | 15.5.29 |
| formidable | production | 3.5.1 | 3.5.4 |
| framer-motion | production | 10.17.6 | 10.18.0 |
| gsap | production | 3.12.5 | 3.15.1 |
| instafeed.js | production | 2.0.0 | 2.1.0 |
| jsonwebtoken | production | 9.0.2 | 9.0.3 |
| mongoose | production | 8.0.3 | 8.24.9 |
| multer | production | 1.4.5-lts.1 | 1.4.5-lts.2 |
| next | production | 15.5.24 | 15.5.29 |
| next-auth | production | 4.24.5 | 4.24.15 |
| next-cloudinary | production | 5.20.0 | removed |
| nodemailer | production | 6.9.8 | removed |
| pusher | production | 5.2.0 | 5.3.4 |
| pusher-js | production | 8.4.0-rc2 | 8.6.0 |
| react | production | 18.2.0 | 18.3.1 |
| react-bootstrap | production | 2.9.2 | 2.10.10 |
| react-dom | production | 18.2.0 | 18.3.1 |
| react-hook-form | production | 7.49.3 | 7.92.0 |
| react-hot-toast | production | 2.4.1 | 2.6.1 |
| react-slick | production | 0.30.2 | 0.30.3 |
| resend | production | 3.2.0 | 3.5.0 |
| stream-chat | production | 8.14.4 | 8.61.0 |
| stream-chat-react | production | 11.2.1 | 11.24.1 |
| stripe | production | 14.19.0 | 14.25.0 |
| styled-components | production | 6.1.6 | 6.6.0 |
| tailwindcss | development | 3.4.0 | 3.4.19 |
| typescript | development | 5.3.3 | 5.9.3 |
| uploadthing | production | 6.1.1 | 6.13.3 |

### backend

| Direct dependency | Scope | Before | After |
| --- | --- | --- | --- |
| @strapi/plugin-cloud | production | 5.5.1 | 5.62.0 |
| @strapi/plugin-users-permissions | production | 5.5.1 | 5.62.0 |
| @strapi/strapi | production | 5.5.1 | 5.62.0 |
| @types/node | development | 20.17.10 | 20.19.43 |
| @types/react | development | 18.3.17 | 18.3.31 |
| @types/react-dom | development | 18.3.5 | 18.3.7 |
| react-router-dom | production | 6.28.0 | 6.30.6 |
| styled-components | production | 6.1.13 | 6.6.0 |
| typescript | development | 5.3.3 | 5.9.3 |

### backend/gallery-api

| Direct dependency | Scope | Before | After |
| --- | --- | --- | --- |
| @types/express | development | absent | 5.0.6 |

## Remaining security findings

These are npm audit package findings, including inherited findings through dependent packages, rather than counts of distinct exploitable vulnerabilities. `--omit=dev` classifies dependencies by the manifest tree: Strapi publishes some build tooling in its production dependency tree. Zero critical findings does not mean no residual risk.

| Project | Scope | Critical | High | Moderate | Low | Total |
| --- | --- | ---: | ---: | ---: | ---: | ---: |
| frontend | production before | 6 | 18 | 17 | 14 | 55 |
| frontend | production after | 0 | 0 | 5 | 5 | 10 |
| frontend | all dependencies after | 0 | 3 | 11 | 5 | 19 |
| backend | production before | 16 | 41 | 24 | 10 | 91 |
| backend | production after | 0 | 5 | 22 | 2 | 29 |
| backend | all dependencies after | 0 | 5 | 22 | 2 | 29 |
| backend/gallery-api | production before | 0 | 0 | 0 | 0 | 0 |
| backend/gallery-api | production after | 0 | 0 | 0 | 0 | 0 |
| backend/gallery-api | all dependencies after | 0 | 0 | 3 | 8 | 11 |

### frontend: production inventory

| Package | Severity | Direct / transitive | Evidence or inherited dependency |
| --- | --- | --- | --- |
| @react-email/render | moderate | transitive | html-to-text; js-beautify |
| cookie | low | transitive | [cookie accepts cookie name, path, and domain with out of bounds characters ](https://github.com/advisories/GHSA-pxg6-pf52-xh8x) |
| deepmerge | low | transitive | [deepmerge mergeObject() allows prototype poisoning of returned objects ](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) |
| editorconfig | moderate | transitive | minimatch |
| glob | moderate | transitive | [Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal ](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4); minimatch |
| html-to-text | low | transitive | deepmerge |
| js-beautify | moderate | transitive | editorconfig; glob |
| minimatch | moderate | transitive | [minimatch has potential denial of service via globparts amplification ](https://github.com/advisories/GHSA-g3hv-75wg-m249) |
| resend | low | direct | @react-email/render |
| universal-cookie | low | direct | cookie |

### backend: production inventory

| Package | Severity | Direct / transitive | Evidence or inherited dependency |
| --- | --- | --- | --- |
| @hono/node-server | moderate | transitive | [@hono/node-server: `serveStatic` decodes the request path a second time, leading to bypass of middleware on static paths ](https://github.com/advisories/GHSA-rmxm-3fg6-px4f) |
| @strapi/admin | moderate | transitive | @strapi/data-transfer; @strapi/types; react-router-dom; rimraf |
| @strapi/cloud-cli | moderate | transitive | minimatch |
| @strapi/content-manager | moderate | transitive | @strapi/admin; @strapi/types; react-router-dom |
| @strapi/content-releases | moderate | transitive | @strapi/admin; @strapi/content-manager; @strapi/types; react-router-dom |
| @strapi/content-type-builder | moderate | transitive | @strapi/admin; react-router-dom |
| @strapi/core | high | transitive | @strapi/admin; @strapi/types; glob; koa-body; koa-session |
| @strapi/data-transfer | moderate | transitive | @strapi/types |
| @strapi/email | moderate | transitive | @strapi/admin; react-router-dom |
| @strapi/i18n | moderate | transitive | @strapi/admin; @strapi/content-manager; react-router-dom |
| @strapi/plugin-cloud | moderate | direct | @strapi/admin; @strapi/strapi; react-router-dom |
| @strapi/plugin-users-permissions | moderate | direct | @strapi/admin; @strapi/strapi; react-router-dom |
| @strapi/review-workflows | moderate | transitive | @strapi/admin; @strapi/content-manager; @strapi/types; react-router-dom |
| @strapi/strapi | moderate | direct | @strapi/admin; @strapi/cloud-cli; @strapi/content-manager; @strapi/content-releases; @strapi/content-type-builder; @strapi/core; @strapi/data-transfer; @strapi/email; @strapi/i18n; @strapi/review-workflows; @strapi/types; @strapi/upload; fork-ts-checker-webpack-plugin; react-router-dom |
| @strapi/types | high | transitive | koa-body; typedoc; typedoc-github-wiki-theme; typedoc-plugin-markdown |
| @strapi/upload | moderate | transitive | @strapi/admin; react-router-dom |
| deepmerge | low | transitive | [deepmerge mergeObject() allows prototype poisoning of returned objects ](https://github.com/advisories/GHSA-gcqx-w48m-w2h4) |
| fork-ts-checker-webpack-plugin | low | transitive | deepmerge |
| glob | moderate | transitive | [Glob: AbortSignal cancellation bypass allows post-timeout filesystem traversal ](https://github.com/advisories/GHSA-3g3m-2fjr-6pw4); minimatch |
| koa-body | high | transitive | zod |
| koa-session | high | transitive | zod |
| minimatch | moderate | transitive | [minimatch has potential denial of service via globparts amplification ](https://github.com/advisories/GHSA-g3hv-75wg-m249) |
| react-router | moderate | transitive | [React Router: Open redirect via backslash in <Link> and useNavigate (CVE-2025-68470 bypass) ](https://github.com/advisories/GHSA-wrjc-x8rr-h8h6); [React Router: Arbitrary Constructor Injection via deserializeErrors() in React Router SSR Hydration ](https://github.com/advisories/GHSA-337j-9hxr-rhxg) |
| react-router-dom | moderate | direct | react-router |
| rimraf | moderate | transitive | glob |
| typedoc | moderate | transitive | minimatch |
| typedoc-github-wiki-theme | moderate | transitive | typedoc-plugin-markdown |
| typedoc-plugin-markdown | moderate | transitive | typedoc |
| zod | high | transitive | [Zod can exhaust memory while validating oversized constrained collections ](https://github.com/advisories/GHSA-mrhx-c7xc-m3w5) |

### backend/gallery-api: production inventory

No findings.

### Compatibility limits and follow-up

- Strapi still requires Zod 3 through `koa-body` and `koa-session`; the current advisory fixes start at Zod 4.6.6. Forcing a major replacement can change validator behavior. Patched Zod 4 is used wherever the dependency already requires version 4; Zod 3 remains documented for an upstream-compatible fix or a separate reviewed migration.
- Strapi React Router 6 and its pinned CLI/tool dependencies still receive moderate/low findings. Audit suggestions include major upgrades or even downgrading Strapi to 4; those were not applied. They are not safe security fixes for the version-5 application.
- Frontend production residual findings come from the existing Resend 3 email-rendering dependency tree and universal-cookie 6. Resolving them requires reviewed major changes to those integrations or upstream backports. No critical/high production frontend findings remain.
- Development-only frontend findings include the unused, pinned CDK 2.110.1 toolkit and ESLint dependencies. CDK 2.277.0 and Constructs >=10.5.0 are a possible separately reviewed development-tool update; no infrastructure source or AWS operation was changed here. The audit also flags minimatch versions whose available fixes cross a major boundary.
- Gallery API development-only findings remain in its CLI/test tooling. Its runtime dependency audit is clean.
- The workflow blocks any critical production advisory. It prints lower-severity findings and does not declare them resolved. Original operational findings in `SECURITY_AUDIT.md` still apply; the old Next 14 critical finding is superseded by the patched Next 15 build verified here.


## Complete modified file list

- `.github/workflows/deploy.yml`
- `.nvmrc`
- `SECURITY_AUDIT.md`
- `backend/.gitignore`
- `backend/gallery-api/package-lock.json`
- `backend/gallery-api/package.json`
- `backend/gallery-api/prisma/migrations/20261116002402_init_gallery/migration.sql`
- `backend/gallery-api/prisma/migrations/20261116020000_add_photo_processing/migration.sql`
- `backend/gallery-api/prisma/migrations/20261116030000_add_photo_publication/migration.sql`
- `backend/gallery-api/prisma/migrations/20261116040000_upload_retry_identity/migration.sql`
- `backend/gallery-api/prisma/migrations/20261116050000_security_controls/migration.sql`
- `backend/package-lock.json`
- `backend/package.json`
- `docs/PRODUCTION_BUILD_REVIEW.md`
- `frontend/next.config.js`
- `frontend/package-lock.json`
- `frontend/package.json`
- `frontend/src/app/api/gallery-admin/[...path]/route.ts`
- `frontend/src/app/api/v1/[...path]/route.ts`
- `frontend/src/app/auth/callback/route.ts`
- `frontend/src/app/gallery-admin/(protected)/albums/[albumId]/page.tsx`
- `frontend/src/app/gallery-admin/layout.tsx`
- `frontend/src/app/gallery-admin/login/page.tsx`
- `frontend/src/app/gallery/[slug]/page.tsx`
- `frontend/src/app/gallery/page.tsx`
- `frontend/src/app/leadership/[slug]/page.tsx`
- `frontend/src/components/Donate/stripe.ts`
- `frontend/src/components/Gallery/Gallery.tsx`
- `frontend/src/components/Gallery/GalleryImage.tsx`
- `frontend/src/components/Gallery/gallery-fonts.ts`
- `frontend/src/components/Gallery/gallery.module.css`
- `frontend/src/components/GalleryAdmin/LoginForm.tsx`
- `frontend/src/components/GalleryAdmin/gallery-admin.module.css`
- `frontend/src/lib/dashboard/getMember.ts`
- `frontend/src/lib/gallery-admin/server.ts`
- `frontend/src/lib/supabase/server.ts`
- `frontend/test/gallery-admin/next15-routes.test.tsx`
- `frontend/test/gallery-admin/proxy.test.ts`
