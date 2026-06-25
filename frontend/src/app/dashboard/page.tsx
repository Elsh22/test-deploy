import { redirect } from "next/navigation";
import DashboardCard from "../../components/Dashboard/DashboardCard";
import LogoutButton from "../../components/Dashboard/LogoutButton";
import { createSupabaseServerClient } from "../../lib/supabase/server";

export const dynamic = "force-dynamic";

type Profile = {
  first_name: string | null;
  last_name: string | null;
  email: string;
  major: string | null;
  graduation_year: number | null;
  career_interest: string | null;
  linkedin_url: string | null;
  role: string;
};

type EventRow = {
  id: string;
  title: string;
  starts_at: string;
  location: string | null;
  category: string | null;
};

type RegistrationRow = {
  id: string;
  status: string;
  events: EventRow | EventRow[] | null;
};

type MemberBadgeRow = {
  awarded_at: string;
  badges: {
    name: string;
    description: string | null;
    icon: string | null;
  } | { name: string; description: string | null; icon: string | null }[] | null;
};

type ResourceRow = {
  id: string;
  title: string;
  description: string | null;
  url: string | null;
  category: string | null;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}

function firstJoinedRow<T>(value: T | T[] | null | undefined) {
  return Array.isArray(value) ? value[0] : value;
}

export default async function DashboardPage() {
  const supabase = createSupabaseServerClient();

  if (!supabase) {
    return (
      <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white">
        <section className="mx-auto max-w-4xl border border-yellow-400/30 bg-yellow-400/10 p-8">
          <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
            Supabase setup needed
          </p>
          <h1 className="font-['PolySans'] mt-4 text-4xl font-black uppercase">
            Add your environment variables
          </h1>
          <p className="mt-4 leading-7 text-zinc-300">
            The dashboard is ready, but it needs `NEXT_PUBLIC_SUPABASE_URL` and
            `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `frontend/.env.local` before it
            can connect to your Supabase project.
          </p>
        </section>
      </main>
    );
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // These queries are SQL-backed reads through Supabase. Row Level Security
  // filters the results so a member only receives rows they are allowed to see.
  const [profileResult, eventsResult, registrationsResult, badgesResult, resourcesResult] =
    await Promise.all([
      supabase.from("profiles").select("*").eq("id", user.id).maybeSingle(),
      supabase
        .from("events")
        .select("id,title,starts_at,location,category")
        .eq("is_public", true)
        .gte("starts_at", new Date().toISOString())
        .order("starts_at", { ascending: true })
        .limit(4),
      supabase
        .from("event_registrations")
        .select("id,status,events(id,title,starts_at,location,category)")
        .eq("profile_id", user.id)
        .limit(4),
      supabase
        .from("member_badges")
        .select("awarded_at,badges(name,description,icon)")
        .eq("profile_id", user.id)
        .limit(6),
      supabase
        .from("resources")
        .select("id,title,description,url,category")
        .eq("is_public", true)
        .limit(4),
    ]);

  const profile = profileResult.data as Profile | null;
  const upcomingEvents = (eventsResult.data || []) as EventRow[];
  const registrations = (registrationsResult.data || []) as unknown as RegistrationRow[];
  const badges = (badgesResult.data || []) as unknown as MemberBadgeRow[];
  const resources = (resourcesResult.data || []) as ResourceRow[];
  const displayName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") ||
    user.email ||
    "DMC Member";
  const initials =
    [profile?.first_name?.[0], profile?.last_name?.[0]]
      .filter(Boolean)
      .join("")
      .toUpperCase() || "DM";

  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-20 pt-28 text-white md:px-8">
      <section className="mx-auto max-w-7xl">
        <div className="border border-white/10 bg-zinc-950">
          <div className="grid gap-0 lg:grid-cols-[1fr_360px]">
            <div className="p-6 md:p-9 lg:p-10">
              <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.28em] text-yellow-400">
                    Member Portal
                  </p>
                  <h1 className="font-['PolySans'] mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                    {profile?.first_name ? `Welcome, ${profile.first_name}` : "Welcome to DMC"}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-300 md:text-lg">
                    Your home base for DMC events, resources, recognition, and
                    professional growth.
                  </p>
                </div>
                <LogoutButton />
              </div>

              <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
                {[
                  ["Role", profile?.role || "member"],
                  ["Track", profile?.career_interest || "Not set"],
                  ["Events", registrations.length ? `${registrations.length} registered` : "None yet"],
                ].map(([label, value]) => (
                  <div key={label}>
                    <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                      {label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="border-t border-white/10 bg-black p-6 md:p-9 lg:border-l lg:border-t-0 lg:p-10">
              <div className="flex items-center gap-4">
                <div className="grid h-16 w-16 place-items-center bg-yellow-400 font-['PolySans'] text-xl font-black text-black">
                  {initials}
                </div>
                <div>
                  <p className="text-lg font-bold text-white">{displayName}</p>
                  <p className="mt-1 text-sm text-zinc-400">{profile?.email || user.email}</p>
                </div>
              </div>

              <div className="mt-8 space-y-4 text-sm">
                {[
                  ["Major", profile?.major || "Not set"],
                  ["Graduation", profile?.graduation_year?.toString() || "Not set"],
                  ["LinkedIn", profile?.linkedin_url ? "Added" : "Not set"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-zinc-500">{label}</span>
                    <span className="font-medium text-zinc-100">{value}</span>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>

        <div className="mt-8 grid gap-10 lg:grid-cols-[360px_1fr]">
          <DashboardCard
            title="Profile"
            description="Keep your member information current so DMC can connect you with the right opportunities."
          >
            <dl className="space-y-4 text-sm text-zinc-300">
              {[
                ["Name", displayName],
                ["Email", profile?.email || user.email || "Not set"],
                ["Major", profile?.major || "Not set"],
                ["Graduation Year", profile?.graduation_year?.toString() || "Not set"],
                ["Career Interest", profile?.career_interest || "Not set"],
                ["Role", profile?.role || "member"],
              ].map(([label, value]) => (
                <div key={label} className="flex flex-col border-b border-white/10 pb-3">
                  <dt className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
                    {label}
                  </dt>
                  <dd className="mt-1 text-white">{value}</dd>
                </div>
              ))}
            </dl>
          </DashboardCard>

          <div>
          <DashboardCard
            title="Upcoming Events"
            description="Stay close to the rooms where the brotherhood, mentorship, and professional work happen."
          >
            <div className="divide-y divide-white/10 border-y border-white/10">
              {upcomingEvents.length ? (
                upcomingEvents.map((event) => (
                  <article key={event.id} className="grid gap-3 py-5 sm:grid-cols-[180px_1fr] sm:items-center">
                    <div>
                      <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
                        {formatDate(event.starts_at)}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.12em] text-zinc-500">
                        {event.category || "DMC Event"}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{event.title}</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {event.location || "Location pending"}
                      </p>
                    </div>
                  </article>
                ))
              ) : (
                <p className="py-5 text-sm leading-6 text-zinc-400">
                  No upcoming events have been posted yet.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Registered Events"
            description="A quick look at the events you have signed up for."
          >
            <div className="divide-y divide-white/10 border-y border-white/10">
              {registrations.length ? (
                registrations.map((registration) => {
                  const event = firstJoinedRow(registration.events);

                  return (
                    <article key={registration.id} className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          {event?.title || "Registered event"}
                        </h3>
                        <p className="mt-1 text-sm text-zinc-400">
                          {event?.starts_at ? formatDate(event.starts_at) : "Date pending"}
                        </p>
                      </div>
                      <p className="font-['PolySans'] w-fit bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.12em] text-black">
                        {registration.status}
                      </p>
                    </article>
                  );
                })
              ) : (
                <p className="py-5 text-sm leading-6 text-zinc-400">
                  You have not registered for any events yet.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Earned Badges"
            description="Recognition for service, leadership, mentorship, and professional milestones."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {badges.length ? (
                badges.map((badge) => {
                  const badgeDetails = firstJoinedRow(badge.badges);

                  return (
                    <article key={`${badgeDetails?.name}-${badge.awarded_at}`} className="border border-white/10 p-5">
                      <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-400">
                        {badgeDetails?.icon || "DMC"}
                      </p>
                      <h3 className="mt-3 text-lg font-bold text-white">{badgeDetails?.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-400">{badgeDetails?.description}</p>
                    </article>
                  );
                })
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  Badges will appear here as DMC starts awarding achievements.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Resources"
            description="Recommended links and materials for academic, career, and leadership growth."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {resources.length ? (
                resources.map((resource) => (
                  <a
                    key={resource.id}
                    className="group block border border-white/10 p-5 transition hover:border-yellow-400"
                    href={resource.url || "/resources"}
                    rel="noopener noreferrer"
                    target={resource.url ? "_blank" : "_self"}
                  >
                    <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
                      {resource.category || "Resource"}
                    </p>
                    <h3 className="mt-2 font-bold text-white">{resource.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{resource.description}</p>
                    <p className="mt-4 text-sm font-bold text-yellow-400 transition group-hover:text-white">
                      Open resource
                    </p>
                  </a>
                ))
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  No dashboard resources have been posted yet.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="AI Career Coach"
            description="A future space for resume feedback, interview prep, and weekly career action plans."
          >
            <div className="border border-dashed border-yellow-400/40 p-6">
              <p className="font-['PolySans'] text-xl font-black uppercase text-yellow-400">
                Coming soon...
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                This will become a private career support space for DMC members.
              </p>
            </div>
          </DashboardCard>
          </div>
        </div>
      </section>
    </main>
  );
}
