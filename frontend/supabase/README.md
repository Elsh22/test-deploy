# DMC Supabase Member Platform Setup

This folder contains the SQL and setup notes for the DMC member platform.

## What Supabase Auth Does

Supabase Auth manages account creation, login, logout, password reset emails, and secure user sessions. The website uses the public anon key in the browser. PostgreSQL Row Level Security decides what each signed-in member can read or write.

## What PostgreSQL Stores

Run `supabase/schema.sql` to create the platform tables:

- `profiles`: one DMC member profile for each Supabase Auth user
- `events`: GBMs, workshops, service events, sports events, mixers
- `event_registrations`: RSVP and attendance records
- `learning_modules`: future DMC Edu learning paths
- `module_progress`: member progress through learning modules
- `badges`: digital badges DMC can award
- `member_badges`: badges earned by members
- `certificates`: issued certificates
- `community_service_hours`: service-hour tracking
- `mentor_assignments`: mentor/mentee relationships
- `goals`: personal member goals
- `resources`: managed career, academic, wellness, and DMC resources
- `saved_resources`: member-saved resources
- `resume_reviews`: Professional Academy resume review and mock interview records
- `ai_messages`: future AI Career Coach chat history

## Why Row Level Security Matters

The browser can see the anon key, so the database must enforce privacy. RLS policies make sure members can only access their own private dashboard data, while officer/admin/advisor roles can manage organization-level records.

## Setup Steps

1. Create a Supabase project.
2. Open Supabase SQL Editor.
3. Paste and run `supabase/schema.sql`.
4. Copy your Project URL and anon key into `frontend/.env.local`.
5. Restart the Next.js dev server.
6. Visit `/signup`, create an account, confirm email if required, then visit `/dashboard`.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Only add `SUPABASE_SERVICE_ROLE_KEY` for server-only admin workflows. Never expose it in client components.

## How To Test Locally

1. Run `npm install` in `frontend` if dependencies are missing.
2. Run `npm run dev`.
3. Go to `http://localhost:3000/signup`.
4. Create a test member account.
5. Log in at `/login`.
6. Confirm `/dashboard` loads only when signed in.
7. Check dashboard subpages:
   - `/dashboard/profile`
   - `/dashboard/events`
   - `/dashboard/badges`
   - `/dashboard/resources`
   - `/dashboard/career`
   - `/dashboard/goals`

## AI Career Coach Notes

The `ai_messages` table is intentionally connected to `profiles`. Later, an AI Career Coach can use profile completion, career readiness, saved resources, resume review status, learning modules, and goals as context, then store member-specific conversations in `ai_messages`.

## Existing Project Note

If you already ran an older schema, use a fresh Supabase project while learning. The current `schema.sql` is designed as a complete Version 1 setup file.
