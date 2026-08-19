import Link from "next/link";
import type { MemberProfile } from "../../lib/dashboard/platform";
import { getInitials } from "../../lib/dashboard/platform";

const dashboardNav = [
  {
    title: "Dashboard",
    href: "/dashboard",
    items: [
      "Welcome message",
      "Upcoming events",
      "Current learning path",
      "Notifications",
      "Career Readiness Score",
      "Quick Actions",
      "Recent activity",
    ],
  },
  {
    title: "Academy",
    href: "/dashboard/academy",
    items: [
      "Learning Paths",
      "Courses",
      "Quizzes",
      "Hands-on Activities",
      "Certificates",
      "Digital Badges",
      "Progress",
    ],
  },
  {
    title: "Career",
    href: "/dashboard/career",
    items: [
      "Resume",
      "LinkedIn",
      "Portfolio",
      "GitHub",
      "Mock Interviews",
      "Career Fair Tracker",
      "Applications",
      "Dream Companies",
      "Career Readiness Score",
    ],
  },
  {
    title: "Events",
    href: "/dashboard/events",
    items: [
      "Upcoming Events",
      "Calendar",
      "RSVP",
      "QR Check-In",
      "Attendance History",
      "Volunteer Opportunities",
    ],
  },
  {
    title: "Community",
    href: "/dashboard/community",
    items: [
      "Directory",
      "Mentorship",
      "Brotherhood Feed",
      "Discussion Boards",
      "Committees",
      "Alumni Network",
    ],
  },
  {
    title: "Resources",
    href: "/dashboard/resources",
    items: [
      "Resume Templates",
      "Interview Guides",
      "Financial Literacy",
      "Business Resources",
      "Tech Resources",
      "Mental Health",
      "Professional Dress",
    ],
  },
];

const profileItems = ["Profile", "Settings", "Notifications", "Privacy", "Connected Accounts", "Logout"];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function DashboardHeader({ profile }: { profile: MemberProfile }) {
  return (
    <header className="flex h-20 items-center justify-between border-b border-zinc-700 px-6">
      <div className="flex min-w-0 items-center">
        <Link aria-label="Back to DMC website" href="/">
          <img
            alt="Developing Men of Color logo"
            className="h-11 w-11 object-contain"
            src="/favicon.ico"
          />
        </Link>
        <span className="mx-4 text-zinc-600">|</span>

        <nav className="hidden items-center gap-6 text-sm font-normal text-zinc-300 lg:flex">
          {dashboardNav.map((section) => (
            <div className="group relative" key={section.title}>
              <Link
                className={`relative inline-flex pb-1 font-normal transition after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-yellow-400 after:transition-all hover:text-white hover:after:w-full ${
                  section.title === "Dashboard" ? "text-xl text-white" : ""
                }`}
                href={section.href}
              >
                {section.title}
              </Link>

              <div className="invisible absolute left-0 top-full z-20 mt-6 w-64 border border-zinc-800 bg-black p-4 opacity-0 shadow-2xl shadow-black/40 transition group-hover:visible group-hover:opacity-100">
                <div className="grid gap-3">
                  {section.items.map((item) => (
                    <Link
                      className="text-left text-sm font-normal text-zinc-400 transition hover:text-yellow-400"
                      href={`${section.href}#${slugify(item)}`}
                      key={item}
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </nav>

        <span className="text-xl font-semibold text-white lg:hidden">Dashboard</span>
      </div>

      <div className="group relative">
        <button
          aria-label="Open profile menu"
          className="grid h-11 w-11 place-items-center overflow-hidden rounded-full bg-zinc-900 ring-1 ring-zinc-700"
          type="button"
        >
          {profile.avatar_url ? (
            <img
              alt="User profile"
              className="h-full w-full object-cover"
              src={profile.avatar_url}
            />
          ) : (
            <span className="text-sm font-semibold text-yellow-400">{getInitials(profile)}</span>
          )}
        </button>

        <div className="invisible absolute right-0 top-full z-20 mt-5 w-56 border border-zinc-800 bg-black p-4 opacity-0 shadow-2xl shadow-black/40 transition group-hover:visible group-hover:opacity-100">
          <div className="grid gap-3">
            {profileItems.map((item) => (
              <button
                className="text-left text-sm font-normal text-zinc-400 transition hover:text-yellow-400"
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
