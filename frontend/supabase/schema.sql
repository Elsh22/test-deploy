-- DMC Supabase schema
-- Run this file in the Supabase SQL editor after creating your project.
-- Supabase Auth owns login accounts in auth.users. These public tables store
-- the DMC member platform data and connect back to auth.users with UUIDs.

create extension if not exists "pgcrypto";

do $$
begin
  if not exists (select 1 from pg_type where typname = 'member_role') then
    create type public.member_role as enum ('member', 'officer', 'admin', 'advisor');
  end if;
end
$$;

-- Profiles are the central member record. The id is the same UUID as auth.users.id,
-- creating a one-to-one relationship between Supabase Auth and DMC member data.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text,
  last_name text,
  email text not null unique,
  major text,
  second_major text,
  minor text,
  classification text,
  graduation_year integer check (graduation_year between 2000 and 2100),
  career_interest text,
  career_end_goal text,
  track text,
  linkedin_url text,
  portfolio_url text,
  resume_url text,
  avatar_url text,
  role public.member_role not null default 'member',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is
  'DMC member profiles. Each row belongs to one Supabase Auth user.';

alter table public.profiles
add column if not exists career_end_goal text;

alter table public.profiles
add column if not exists second_major text;

alter table public.profiles
add column if not exists minor text;

-- Storage bucket for profile photos. Files should be organized by user id:
-- profile-photos/<auth-user-id>/avatar.jpg
insert into storage.buckets (id, name, public)
values ('profile-photos', 'profile-photos', true)
on conflict (id) do update set public = excluded.public;

-- Resume PDFs power the member dashboard resume preview. Files should be
-- organized by user id: resumes/<auth-user-id>/resume.pdf
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', true)
on conflict (id) do update set public = excluded.public;

-- Events are DMC meetings, workshops, service events, sports events, and mixers.
create table if not exists public.events (
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

-- Event registrations connect one member to one event. A row can begin as
-- registered, then later become attended after check-in.
create table if not exists public.event_registrations (
  id uuid primary key default gen_random_uuid(),
  event_id uuid not null references public.events(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'registered' check (status in ('registered', 'waitlisted', 'cancelled', 'attended')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (event_id, profile_id)
);

-- Learning modules support the future DMC Edu experience. Module progress tracks
-- which members started or completed each learning path.
create table if not exists public.learning_modules (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text,
  estimated_minutes integer,
  is_published boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.module_progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  module_id uuid not null references public.learning_modules(id) on delete cascade,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (profile_id, module_id)
);

-- Badges and certificates are digital proof of member progress. Badges can be
-- earned for attendance, service, Professional Academy, learning modules, etc.
create table if not exists public.badges (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  description text,
  icon text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.member_badges (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  badge_id uuid not null references public.badges(id) on delete cascade,
  awarded_by uuid references public.profiles(id) on delete set null,
  awarded_at timestamptz not null default now(),
  unique (profile_id, badge_id)
);

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  certificate_url text,
  issued_by uuid references public.profiles(id) on delete set null,
  issued_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

-- Community service hours document DMC impact and can be approved by officers.
create table if not exists public.community_service_hours (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  event_id uuid references public.events(id) on delete set null,
  organization text,
  hours numeric(5,2) not null check (hours >= 0),
  service_date date not null,
  notes text,
  approved_by uuid references public.profiles(id) on delete set null,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Mentor assignments connect mentees to mentors. Both users are profiles.
create table if not exists public.mentor_assignments (
  id uuid primary key default gen_random_uuid(),
  mentee_id uuid not null references public.profiles(id) on delete cascade,
  mentor_id uuid references public.profiles(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'paused', 'completed')),
  started_at date default current_date,
  ended_at date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Goals are member-owned personal development targets.
create table if not exists public.goals (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  category text,
  status text not null default 'active' check (status in ('active', 'completed', 'archived')),
  due_date date,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Resources are managed by officers/admins. Saved resources are private member
-- bookmarks that power the dashboard resources page.
create table if not exists public.resources (
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

create table if not exists public.saved_resources (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  resource_id uuid references public.resources(id) on delete cascade,
  title text,
  url text,
  notes text,
  created_at timestamptz not null default now()
);

-- Resume reviews track Professional Academy feedback. mock_interview_completed
-- lets the career score count mock interview completion without another table.
create table if not exists public.resume_reviews (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  reviewer_id uuid references public.profiles(id) on delete set null,
  resume_url text,
  status text not null default 'requested' check (status in ('requested', 'in_review', 'completed', 'cancelled')),
  feedback text,
  mock_interview_completed boolean not null default false,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- AI messages are intentionally separate from profile data. Later, an AI Career
-- Coach can read a member's profile/progress and store chat history here.
create table if not exists public.ai_messages (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  created_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

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
    second_major,
    minor,
    classification,
    graduation_year,
    career_interest,
    career_end_goal,
    track,
    linkedin_url,
    portfolio_url,
    role
  )
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    new.raw_user_meta_data ->> 'major',
    new.raw_user_meta_data ->> 'second_major',
    new.raw_user_meta_data ->> 'minor',
    new.raw_user_meta_data ->> 'classification',
    nullif(new.raw_user_meta_data ->> 'graduation_year', '')::integer,
    new.raw_user_meta_data ->> 'career_interest',
    new.raw_user_meta_data ->> 'career_end_goal',
    new.raw_user_meta_data ->> 'track',
    new.raw_user_meta_data ->> 'linkedin_url',
    new.raw_user_meta_data ->> 'portfolio_url',
    'member'
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

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

-- Trigger setup. Dropping first makes this script easier to rerun while learning.
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at before update on public.profiles
for each row execute function public.set_updated_at();

drop trigger if exists events_set_updated_at on public.events;
create trigger events_set_updated_at before update on public.events
for each row execute function public.set_updated_at();

drop trigger if exists event_registrations_set_updated_at on public.event_registrations;
create trigger event_registrations_set_updated_at before update on public.event_registrations
for each row execute function public.set_updated_at();

drop trigger if exists learning_modules_set_updated_at on public.learning_modules;
create trigger learning_modules_set_updated_at before update on public.learning_modules
for each row execute function public.set_updated_at();

drop trigger if exists module_progress_set_updated_at on public.module_progress;
create trigger module_progress_set_updated_at before update on public.module_progress
for each row execute function public.set_updated_at();

drop trigger if exists badges_set_updated_at on public.badges;
create trigger badges_set_updated_at before update on public.badges
for each row execute function public.set_updated_at();

drop trigger if exists community_service_hours_set_updated_at on public.community_service_hours;
create trigger community_service_hours_set_updated_at before update on public.community_service_hours
for each row execute function public.set_updated_at();

drop trigger if exists mentor_assignments_set_updated_at on public.mentor_assignments;
create trigger mentor_assignments_set_updated_at before update on public.mentor_assignments
for each row execute function public.set_updated_at();

drop trigger if exists goals_set_updated_at on public.goals;
create trigger goals_set_updated_at before update on public.goals
for each row execute function public.set_updated_at();

drop trigger if exists resources_set_updated_at on public.resources;
create trigger resources_set_updated_at before update on public.resources
for each row execute function public.set_updated_at();

drop trigger if exists resume_reviews_set_updated_at on public.resume_reviews;
create trigger resume_reviews_set_updated_at before update on public.resume_reviews
for each row execute function public.set_updated_at();

-- Indexes keep dashboard queries fast.
create index if not exists profiles_role_idx on public.profiles(role);
create index if not exists events_starts_at_idx on public.events(starts_at);
create index if not exists events_public_starts_at_idx on public.events(is_public, starts_at);
create index if not exists event_registrations_profile_idx on public.event_registrations(profile_id);
create index if not exists event_registrations_event_idx on public.event_registrations(event_id);
create index if not exists learning_modules_published_idx on public.learning_modules(is_published, category);
create index if not exists module_progress_profile_idx on public.module_progress(profile_id);
create index if not exists module_progress_module_idx on public.module_progress(module_id);
create index if not exists member_badges_profile_idx on public.member_badges(profile_id);
create index if not exists member_badges_badge_idx on public.member_badges(badge_id);
create index if not exists certificates_profile_idx on public.certificates(profile_id);
create index if not exists community_service_profile_idx on public.community_service_hours(profile_id);
create index if not exists community_service_event_idx on public.community_service_hours(event_id);
create index if not exists mentor_assignments_mentee_idx on public.mentor_assignments(mentee_id);
create index if not exists mentor_assignments_mentor_idx on public.mentor_assignments(mentor_id);
create index if not exists goals_profile_status_idx on public.goals(profile_id, status);
create index if not exists resources_public_category_idx on public.resources(is_public, category);
create index if not exists saved_resources_profile_idx on public.saved_resources(profile_id);
create index if not exists saved_resources_resource_idx on public.saved_resources(resource_id);
create index if not exists resume_reviews_profile_idx on public.resume_reviews(profile_id);
create index if not exists ai_messages_profile_created_idx on public.ai_messages(profile_id, created_at);

-- Row Level Security matters because the browser uses the anon key. RLS makes
-- PostgreSQL enforce data boundaries even if someone edits client-side code.
alter table public.profiles enable row level security;
alter table public.events enable row level security;
alter table public.event_registrations enable row level security;
alter table public.learning_modules enable row level security;
alter table public.module_progress enable row level security;
alter table public.badges enable row level security;
alter table public.member_badges enable row level security;
alter table public.certificates enable row level security;
alter table public.community_service_hours enable row level security;
alter table public.mentor_assignments enable row level security;
alter table public.goals enable row level security;
alter table public.resources enable row level security;
alter table public.saved_resources enable row level security;
alter table public.resume_reviews enable row level security;
alter table public.ai_messages enable row level security;

-- Profiles
create policy "Members can read their own profile" on public.profiles
for select using (auth.uid() = id or public.is_dmc_manager());

create policy "Members can update their own profile" on public.profiles
for update using (auth.uid() = id or public.is_dmc_manager())
with check (auth.uid() = id or public.is_dmc_manager());

-- Storage policies. The first folder segment must match the signed-in user id.
create policy "Members can read profile photos" on storage.objects
for select using (bucket_id = 'profile-photos');

create policy "Members can upload their own profile photo" on storage.objects
for insert with check (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can update their own profile photo" on storage.objects
for update using (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
) with check (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can delete their own profile photo" on storage.objects
for delete using (
  bucket_id = 'profile-photos'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can read resumes" on storage.objects
for select using (bucket_id = 'resumes');

create policy "Members can upload their own resume" on storage.objects
for insert with check (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can update their own resume" on storage.objects
for update using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
) with check (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

create policy "Members can delete their own resume" on storage.objects
for delete using (
  bucket_id = 'resumes'
  and auth.uid()::text = (storage.foldername(name))[1]
);

-- Events and registrations
create policy "Members can read public events" on public.events
for select using (is_public = true or public.is_dmc_manager());

create policy "Managers can manage events" on public.events
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can read their own registrations" on public.event_registrations
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their own registrations" on public.event_registrations
for insert with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can update their own registrations" on public.event_registrations
for update using (profile_id = auth.uid() or public.is_dmc_manager())
with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can delete registrations" on public.event_registrations
for delete using (public.is_dmc_manager());

-- Learning
create policy "Members can read published modules" on public.learning_modules
for select using (is_published = true or public.is_dmc_manager());

create policy "Managers can manage modules" on public.learning_modules
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can read their module progress" on public.module_progress
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can manage their module progress" on public.module_progress
for all using (profile_id = auth.uid() or public.is_dmc_manager())
with check (profile_id = auth.uid() or public.is_dmc_manager());

-- Badges and certificates
create policy "Members can read badges" on public.badges
for select using (auth.role() = 'authenticated');

create policy "Managers can manage badges" on public.badges
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can read their badges" on public.member_badges
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage member badges" on public.member_badges
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can read their certificates" on public.certificates
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage certificates" on public.certificates
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

-- Service, mentorship, goals
create policy "Members can read their service hours" on public.community_service_hours
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their service hours" on public.community_service_hours
for insert with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can update their unapproved service hours" on public.community_service_hours
for update using ((profile_id = auth.uid() and approved_at is null) or public.is_dmc_manager())
with check ((profile_id = auth.uid() and approved_at is null) or public.is_dmc_manager());

create policy "Managers can delete service hours" on public.community_service_hours
for delete using (public.is_dmc_manager());

create policy "Members can read their mentor assignments" on public.mentor_assignments
for select using (mentee_id = auth.uid() or mentor_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage mentor assignments" on public.mentor_assignments
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can manage their goals" on public.goals
for all using (profile_id = auth.uid() or public.is_dmc_manager())
with check (profile_id = auth.uid() or public.is_dmc_manager());

-- Resources
create policy "Members can read public resources" on public.resources
for select using (is_public = true or public.is_dmc_manager());

create policy "Managers can manage resources" on public.resources
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can manage their saved resources" on public.saved_resources
for all using (profile_id = auth.uid() or public.is_dmc_manager())
with check (profile_id = auth.uid() or public.is_dmc_manager());

-- Career and AI
create policy "Members can read their resume reviews" on public.resume_reviews
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their resume reviews" on public.resume_reviews
for insert with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage resume reviews" on public.resume_reviews
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());

create policy "Members can read their ai messages" on public.ai_messages
for select using (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Members can create their ai messages" on public.ai_messages
for insert with check (profile_id = auth.uid() or public.is_dmc_manager());

create policy "Managers can manage ai messages" on public.ai_messages
for all using (public.is_dmc_manager()) with check (public.is_dmc_manager());
