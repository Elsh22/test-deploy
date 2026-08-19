import { getMemberDashboardContext } from "../../lib/dashboard/getMember";
import { getDisplayName } from "../../lib/dashboard/platform";

const missionControlCards = [
  {
    title: "Upcoming Events",
    value: "3",
    description: "Events ready for RSVP and check-in.",
  },
  {
    title: "Learning Path",
    value: "1 active",
    description: "Professional Academy onboarding is in progress.",
  },
  {
    title: "Career Readiness",
    value: "0%",
    description: "Build your profile, resume, LinkedIn, and portfolio.",
  },
  {
    title: "Notifications",
    value: "2",
    description: "New DMC updates and member reminders.",
  },
];

const quickActions = ["RSVP for an event", "Upload resume", "Continue learning", "Update profile"];
const recentActivity = ["Account created", "Dashboard opened", "Profile setup ready"];

export default async function DashboardPage() {
  const { email, profile } = await getMemberDashboardContext();
  const displayName = getDisplayName(profile, email);

  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-normal uppercase tracking-[0.18em] text-yellow-400">
            Mission Control
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Welcome Back, {displayName}
          </h1>
        </div>

        <section className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {missionControlCards.map((card) => (
            <article className="border border-zinc-800 bg-zinc-950/60 p-5" key={card.title}>
              <p className="text-sm font-normal text-zinc-400">{card.title}</p>
              <p className="mt-4 text-3xl font-semibold text-white">{card.value}</p>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{card.description}</p>
            </article>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <article className="border border-zinc-800 bg-zinc-950/60 p-6">
            <div className="flex items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <p className="text-sm font-normal text-zinc-400">Current Learning Path</p>
                <h2 className="mt-1 text-2xl font-semibold text-white">Professional Academy</h2>
              </div>
              <span className="text-sm font-normal text-yellow-400">In Progress</span>
            </div>
            <div className="mt-6">
              <div className="h-2 overflow-hidden rounded-full bg-zinc-800">
                <div className="h-full w-1/4 rounded-full bg-yellow-400" />
              </div>
              <p className="mt-3 text-sm text-zinc-500">25% complete. Next step: Resume foundations.</p>
            </div>
          </article>

          <article className="border border-zinc-800 bg-zinc-950/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Quick Actions</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {quickActions.map((action) => (
                <button
                  className="border border-zinc-800 px-4 py-3 text-left text-sm font-normal text-zinc-300 transition hover:border-yellow-400 hover:text-yellow-400"
                  key={action}
                  type="button"
                >
                  {action}
                </button>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.85fr_1.15fr]">
          <article className="border border-zinc-800 bg-zinc-950/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Recent Activity</h2>
            <div className="mt-5 grid gap-4">
              {recentActivity.map((activity) => (
                <div className="border-b border-zinc-800 pb-4 text-sm text-zinc-400" key={activity}>
                  {activity}
                </div>
              ))}
            </div>
          </article>

          <article className="border border-zinc-800 bg-zinc-950/60 p-6">
            <h2 className="text-2xl font-semibold text-white">Notifications</h2>
            <div className="mt-5 grid gap-4">
              <div>
                <p className="text-sm font-normal text-white">Complete your profile</p>
                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  Add your major, classification, and graduation year to unlock better recommendations.
                </p>
              </div>
              <div>
                <p className="text-sm font-normal text-white">Academy tools are coming together</p>
                <p className="mt-1 text-sm leading-6 text-zinc-500">
                  Academy modules, badges, and certificates will live here soon.
                </p>
              </div>
            </div>
          </article>
        </section>
      </div>
    </section>
  );
}
