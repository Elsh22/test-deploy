-- DMC Supabase schema
-- Run this file in the Supabase SQL editor after creating your project.
-- Supabase Auth stores login accounts in auth.users. These public tables
-- store DMC-specific member data and connect back to auth.users by UUID.

create extension if not exists "pgcrypto";

-- Members can be normal members, officers, admins, or advisors.
-- The default role is member so new signups do not accidentally receive
-- management privileges.
create type public.member_role as enum ('member', 'officer', 'admin', 'advisor');

-- Profiles extend Supabase Auth users with DMC-specific information.
-- id matches auth.users.id, creating a one-to-one relationship.
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text not null unique,
  major text,
  graduation_year integer check (graduation_year between 2000 and 2100),
  career_interest text,
  linkedin_url text,
  avatar_url text,
  role public.member_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'DMC member profile records. Each profile belongs to one Supabase Auth user.';

-- Storage bucket for member profile photos. Files are organized by user id:
-- profile-photos/<auth-user-id>/avatar.jpg
insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', true)
on conflict (id) do nothing;

-- Events are public-facing DMC programs, GBMs, workshops, service events,
-- sports events, and signature events.
create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text,
  category text,
  is_public boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.events is
  'Calendar events members can view and register for.';

-- Event registrations connect a member profile to an event.
-- The unique constraint prevents a member from registering for the same event twice.
create table public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'registered' check (status in ('registered', 'waitlisted', 'cancelled', 'attended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, profile_id)
);

comment on table public.event_registrations is
  'RSVP records showing which members registered for which DMC events.';

-- Badges represent accomplishments members can earn, such as attending
-- Professional Academy, completing mentorship orientation, or volunteering.
create table public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now()
);

comment on table public.badges is
  'Achievement badges DMC can award to members.';

-- member_badges is a many-to-many join table between profiles and badges.
create table public.member_badges (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  awarded_by uuid references public.profiles(id) on delete set null,
  awarded_at timestamptz not null default now(),
  unique (profile_id, badge_id)
);

comment on table public.member_badges is
  'Tracks which badges each member has earned.';

-- Resources are member-facing links, documents, videos, guides, and toolkit items.
create table public.resources (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  url text,
  category text,
  is_public boolean not null default true,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.resources is
  'Career, academic, wellness, and organization resources for DMC members.';

-- Resume reviews support Professional Academy workflows.
-- Members can only read their own review records; officers/admins can manage them.
create table public.resume_reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  resume_url text,
  status text not null default 'requested' check (status in ('requested', 'in_review', 'completed', 'cancelled')),
  feedback text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.resume_reviews is
  'Professional Academy resume review requests and feedback.';

-- AI messages are future-proofing for an AI Career Coach.
-- Each message belongs to the signed-in member who sent/received it.
create table public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

comment on table public.ai_messages is
  'Conversation history for a future DMC AI Career Coach feature.';

-- Keep updated_at fresh whenever rows change.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger event_registrations_set_updated_at
before update on public.event_registrations
for each row execute function public.set_updated_at();

create trigger resources_set_updated_at
before update on public.resources
for each row execute function public.set_updated_at();

create trigger resume_reviews_set_updated_at
before update on public.resume_reviews
for each row execute function public.set_updated_at();

-- Automatically create a profile whenever a new Supabase Auth user signs up.
-- raw_user_meta_data comes from signup options in the app.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (
    id,
    email,
    first_name,
    last_name,
    major,
    graduation_year,
    career_interest,
    linkedin_url,
    role
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'major',
    nullif(new.raw_user_meta_data ->> 'graduation_year', '')::integer,
    new.raw_user_meta_data ->> 'career_interest',
    new.raw_user_meta_data ->> 'linkedin_url',
    'member'
  );

  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- Helper function for RLS policies. It checks the signed-in user's role.
create or replace function public.current_member_role()
returns public.member_role
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_dmc_manager()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_member_role() in ('officer', 'admin', 'advisor'), false);
$$;

-- Indexes keep dashboard queries fast as membership grows.
create index profiles_role_idx on public.profiles(role);
create index events_starts_at_idx on public.events(starts_at);
create index events_public_starts_at_idx on public.events(is_public, starts_at);
create index event_registrations_profile_idx on public.event_registrations(profile_id);
create index event_registrations_event_idx on public.event_registrations(event_id);
create index member_badges_profile_idx on public.member_badges(profile_id);
create index resources_public_category_idx on public.resources(is_public, category);
create index resume_reviews_profile_idx on public.resume_reviews(profile_id);
create index ai_messages_profile_created_idx on public.ai_messages(profile_id, created_at);

-- Row Level Security matters because the browser uses the anon key.
-- RLS ensures users cannot read or write private rows just by changing client code.
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.badges enable row level security;
alter table public.member_badges enable row level security;
alter table public.resources enable row level security;
alter table public.resume_reviews enable row level security;
alter table public.ai_messages enable row level security;

-- Profiles: members manage only themselves; DMC managers can read/update profiles.
create policy "Members can read their own profile"
on public.profiles for select
using (auth.uid() = id or public.is_dmc_manager());

create policy "Members can update their own profile"
on public.profiles for update
using (auth.uid() = id or public.is_dmc_manager())
with check (auth.uid() = id or public.is_dmc_manager());

-- Profile photo storage policies. The file path must begin with the user's id,
-- which prevents members from overwriting another member's avatar.
create policy "Members can read profile photos"
on storage.objects for select
using (bucket_id = 'profile-photos');

create policy "Members can upload their own profile photo"
on storage.objects for insert
with check (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can update their own profile photo"
on storage.objects for update
using (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
)
with check (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can delete their own profile photo"
on storage.objects for delete
using (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Events: public events are readable by signed-in members. Managers can manage them.
create policy "Members can read public events"
on public.events for select
using (is_public = true or public.is_dmc_manager());

create policy "Managers can manage events"
on public.events for all
using (public.is_dmc_manager())
with check (public.is_dmc_manager());

-- Registrations: members create/read/update their own RSVP records.
-- Managers can view and manage all registrations.
create policy "Members can read their own event registrations"
on public.event_registrations for select
using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their own event registrations"
on public.event_registrations for insert
with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can update their own event registrations"
on public.event_registrations for update
using (profile_id = auth.uid() or public.is_dmc_manager())
with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can delete event registrations"
on public.event_registrations for delete
using (public.is_dmc_manager());

-- Badges: members can read badges; managers create/update/delete them.
create policy "Members can read badges"
on public.badges for select
using (auth.role() = 'authenticated');

create policy "Managers can manage badges"
on public.badges for all
using (public.is_dmc_manager())
with check (public.is_dmc_manager());

-- Member badges: members see their own achievements; managers manage awards.
create policy "Members can read their own badges"
on public.member_badges for select
using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage member badges"
on public.member_badges for all
using (public.is_dmc_manager())
with check (public.is_dmc_manager());

-- Resources: members read public resources; managers manage resource records.
create policy "Members can read public resources"
on public.resources for select
using (is_public = true or public.is_dmc_manager());

create policy "Managers can manage resources"
on public.resources for all
using (public.is_dmc_manager())
with check (public.is_dmc_manager());

-- Resume reviews: private to the member and DMC managers.
create policy "Members can read their own resume reviews"
on public.resume_reviews for select
using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their own resume reviews"
on public.resume_reviews for insert
with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can update resume reviews"
on public.resume_reviews for update
using (public.is_dmc_manager())
with check (public.is_dmc_manager());

-- AI messages: private to the member. This can later power AI Career Coach chat history.
create policy "Members can read their own ai messages"
on public.ai_messages for select
using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their own ai messages"
on public.ai_messages for insert
with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage ai messages"
on public.ai_messages for all
using (public.is_dmc_manager())
with check (public.is_dmc_manager());
