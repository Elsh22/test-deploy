# DMC Supabase Setup

This folder contains the SQL schema for the DMC member account system.

## What Supabase Auth Does

Supabase Auth manages account creation, login, logout, password reset emails, and secure user sessions. The website uses the public anon key in the browser, but Row Level Security controls what each signed-in user can read or write.

## What PostgreSQL Stores

Supabase includes PostgreSQL. The `schema.sql` file creates DMC-specific tables:

- `profiles`: member profile information connected to `auth.users`
- `events`: public DMC events
- `event_registrations`: member RSVPs for events
- `badges`: achievements DMC can award
- `member_badges`: connects members to earned badges
- `resources`: member resources and toolkit links
- `resume_reviews`: Professional Academy resume review workflow
- `ai_messages`: future AI Career Coach conversation history

## Why Row Level Security Matters

The browser can see the anon key, so SQL policies must protect the data. RLS makes the database enforce rules like "members can only read their own resume reviews" even if someone edits browser code.

## Setup Steps

1. Create a Supabase project.
2. Open the Supabase SQL editor.
3. Paste and run `supabase/schema.sql`.
4. Copy your Project URL and anon key into `frontend/.env.local`.
5. Restart the Next.js dev server.
6. Visit `/signup`, create an account, confirm email if required, then visit `/dashboard`.

## Updating an Existing Supabase Project

If you already ran the schema before profile photos were added, run the newest
`schema.sql` in a fresh project, or manually add:

```sql
alter table public.profiles add column if not exists avatar_url text;
```

Then create the `profile-photos` bucket and storage policies from `schema.sql`.

## Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Only add `SUPABASE_SERVICE_ROLE_KEY` for server-only admin workflows. Do not use it in client components.
