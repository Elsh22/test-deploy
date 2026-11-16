# DMC Gallery API

See the repository [security audit and production checklist](../../SECURITY_AUDIT.md)
before shared hosting. Apply the additive security migration before starting the
updated API. JWT_ACCESS_SECRET now requires at least 32 bytes of random secret
material. `.env.example` contains configuration placeholders only.

For protected staging upload endpoints, request/response contracts, approved
browser CORS, throttling requirements, and PowerShell testing, see [UPLOADS.md](./UPLOADS.md).
For the protected Sharp processing endpoint, limits, migration, and staging-only
IAM permissions, see [PROCESSING.md](./PROCESSING.md).
For album editing, photo ordering/cover selection, publication, archival, public
CloudFront URLs, and copy permissions, see [PUBLISHING.md](./PUBLISHING.md).
For the Next.js gallery administrator interface, cookie proxy, private previews,
and retry-safe upload requests, see [DASHBOARD.md](./DASHBOARD.md).

Separate NestJS backend for local gallery development. The React app remains in
`../../frontend/`, and the existing Strapi app remains in the parent `backend/`
directory. Each backend keeps its own dependencies and build commands.

## Run locally

Use Node.js 22.12 or later on the Node 22 line (the current workspace uses 22.16).
NestJS runtime requirements are documented in the
[official NestJS 11 first steps guide](https://docs.nestjs.com/v11/first-steps).

From the website repository:

```powershell
cd backend/gallery-api
npm ci
npm run prisma:generate
npm run start:dev
```

Open <http://127.0.0.1:4000/health>. Expected response:

```json
{ "status": "ok", "service": "dmc-gallery-api" }
```

The development server watches for source changes. Press Ctrl+C in its terminal
to stop it before starting another instance. The app binds to `127.0.0.1` and
defaults to port 4000. `PORT` can be set in the local `.env` file or in PowerShell
before starting (for example, `$env:PORT = '4001'`). An existing environment
variable takes precedence over `.env`; remove it with `Remove-Item Env:PORT` if
you want to use the file/default again. Port overrides must be integers from
1 through 65535.

Set `DATABASE_URL` in the local, ignored `.env` file to your existing PostgreSQL
connection string. The application explicitly loads this file at startup.
Missing configuration fails with a message naming the variable, without
printing its value. Never commit `.env` or paste credentials into logs.

Prisma 7 uses the generated client in `src/generated/prisma`, with the
`@prisma/adapter-pg` PostgreSQL driver adapter. `PrismaModule` exports
`PrismaService`; its lifecycle hook disconnects the client on shutdown.
The project uses `prisma7.config.ts`, so Prisma CLI commands must specify it:

```powershell
npx prisma validate --config prisma7.config.ts
npx prisma migrate status --config prisma7.config.ts
```

These are read-only checks. Generating the client does not modify the database.
Do not reset the database or delete existing migrations to address build errors.

## Port 4000 already in use (Windows PowerShell)

First inspect the listener and identify the process:

```powershell
$galleryListeners = Get-NetTCPConnection -LocalPort 4000 -State Listen -ErrorAction SilentlyContinue
$galleryListeners | Select-Object LocalAddress, LocalPort, OwningProcess
$galleryListeners.OwningProcess | Select-Object -Unique | ForEach-Object {
    Get-CimInstance Win32_Process -Filter "ProcessId = $_" |
        Select-Object ProcessId, ParentProcessId, Name, ExecutablePath, CommandLine
}
```

Check the command path to confirm it belongs to this `backend/gallery-api` app.
Prefer Ctrl+C in the terminal that started it, especially for a watch-mode
server that could otherwise respawn. If that terminal is unavailable and you
have confirmed the specific process is the Gallery API, replace the example ID
below with its actual `OwningProcess` value:

```powershell
# Example only: run after confirming which process owns the port.
Stop-Process -Id 12345
```

Recheck the listener before running `npm run start:dev`. Do not kill every Node
process or terminate an unrelated service. If another application legitimately
needs port 4000, use an explicit `PORT` override for a single API instance.

## Public routes

- `GET /health`: HTTP 200 with the status JSON above.
- `GET /api/albums`: published albums only, with processed photographs sorted
  by `sortOrder`; returns `[]` when none are published.
- `GET /api/albums/:slug`: a published album with processed photographs only;
  unknown, draft, and archived slugs return HTTP 404.

Database failures use Nest's HTTP 500 response rather than returning a
misleading empty array or exposing database exception details to clients.

## Verify

```powershell
npx tsc --noEmit
npm run build
npm test -- --runInBand
```

Jest and ts-jest run the controller/service unit tests and the HTTP tests.
Services are mocked at their dependency boundaries; HTTP tests override
`PrismaService`, use an available loopback port, and close their server afterward.
Tests require no database and do not write data. They cover public-query
filters, empty results, album lookup, 404s, and error responses.

The default TypeScript config checks the specs with Jest types. The production
build uses `tsconfig.build.json` to exclude specs and Jest globals. Strict
compiler checks remain enabled. `tsconfig.spec.json` configures CommonJS for
Jest without changing the application's Node16 module resolution.

Frontend integration, AWS changes, uploads, authentication, and deployment are
outside this API debugging step. No AWS credentials are required.
