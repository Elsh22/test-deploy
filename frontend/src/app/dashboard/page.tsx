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

  return (
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white">
      <section className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-6 border-b border-white/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.28em] text-yellow-400">
              Member Dashboard
            </p>
            <h1 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              Welcome, {profile?.first_name || "Member"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-300">
              This dashboard connects your DMC profile to events, badges,
              resources, resume support, and future AI Career Coach tools.
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <DashboardCard
            title="Profile"
            description="Your profile row lives in the profiles table and connects to your Supabase Auth user."
          >
            <dl className="grid gap-4 text-sm text-zinc-300 sm:grid-cols-2">
              {[
                ["Name", displayName],
                ["Email", profile?.email || user.email || "Not set"],
                ["Major", profile?.major || "Not set"],
                ["Graduation Year", profile?.graduation_year?.toString() || "Not set"],
                ["Career Interest", profile?.career_interest || "Not set"],
                ["Role", profile?.role || "member"],
              ].map(([label, value]) => (
                <div key={label} className="border border-white/10 bg-black/40 p-4">
                  <dt className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
                    {label}
                  </dt>
                  <dd className="mt-2">{value}</dd>
                </div>
              ))}
            </dl>
          </DashboardCard>

          <DashboardCard
            title="Upcoming Events"
            description="Public events come from the events table. Members can later RSVP from here."
          >
            <div className="space-y-3">
              {upcomingEvents.length ? (
                upcomingEvents.map((event) => (
                  <article key={event.id} className="border border-white/10 bg-black/40 p-4">
                    <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
                      {formatDate(event.starts_at)}
                    </p>
                    <h3 className="mt-2 text-lg font-bold text-white">{event.title}</h3>
                    <p className="mt-1 text-sm text-zinc-400">
                      {[event.category, event.location].filter(Boolean).join(" | ") || "DMC Event"}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  No upcoming events are in Supabase yet. Add event rows after running the SQL schema.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Registered Events"
            description="event_registrations connects your profile to the events you RSVP for."
          >
            <div className="space-y-3">
              {registrations.length ? (
                registrations.map((registration) => {
                  const event = firstJoinedRow(registration.events);

                  return (
                    <article key={registration.id} className="border border-white/10 bg-black/40 p-4">
                      <h3 className="text-lg font-bold text-white">
                        {event?.title || "Registered event"}
                      </h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {event?.starts_at ? formatDate(event.starts_at) : "Date pending"}
                      </p>
                      <p className="mt-2 text-xs uppercase tracking-[0.16em] text-yellow-400">
                        {registration.status}
                      </p>
                    </article>
                  );
                })
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  You have not registered for any events yet.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Earned Badges"
            description="Badges can recognize service, leadership, mentorship, and career milestones."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {badges.length ? (
                badges.map((badge) => {
                  const badgeDetails = firstJoinedRow(badge.badges);

                  return (
                    <article key={`${badgeDetails?.name}-${badge.awarded_at}`} className="border border-white/10 bg-black/40 p-4">
                      <p className="text-2xl">{badgeDetails?.icon || "*"}</p>
                      <h3 className="mt-2 font-bold text-white">{badgeDetails?.name}</h3>
                      <p className="mt-1 text-sm text-zinc-400">{badgeDetails?.description}</p>
                    </article>
                  );
                })
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  No badges yet. This section is ready for Professional Academy, service, and mentorship achievements.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="Saved Resources"
            description="For V1, this shows public resources. Later we can add a saved_resources table for bookmarks."
          >
            <div className="space-y-3">
              {resources.length ? (
                resources.map((resource) => (
                  <a
                    key={resource.id}
                    className="block border border-white/10 bg-black/40 p-4 transition hover:border-yellow-400"
                    href={resource.url || "/resources"}
                    rel="noopener noreferrer"
                    target={resource.url ? "_blank" : "_self"}
                  >
                    <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-400">
                      {resource.category || "Resource"}
                    </p>
                    <h3 className="mt-2 font-bold text-white">{resource.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-zinc-400">{resource.description}</p>
                  </a>
                ))
              ) : (
                <p className="text-sm leading-6 text-zinc-400">
                  No resources are in Supabase yet. The public Resources page still works normally.
                </p>
              )}
            </div>
          </DashboardCard>

          <DashboardCard
            title="AI Career Coach"
            description="Future feature powered by ai_messages, where each member can have private career coaching history."
          >
            <div className="border border-dashed border-yellow-400/40 bg-yellow-400/10 p-6">
              <p className="font-['PolySans'] text-xl font-black uppercase text-white">
                Coming soon...
              </p>
              <p className="mt-3 text-sm leading-6 text-zinc-300">
                The database is ready to store AI messages securely per member.
                Later, this can support resume feedback, interview prep, role
                recommendations, and weekly career action plans.
              </p>
            </div>
          </DashboardCard>
        </div>
      </section>
    </main>
  );
}
