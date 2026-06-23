 "use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Home", href: "/", hasDropdown: false },
  { label: "Programs", href: "/programs", hasDropdown: true },
  { label: "Resources", href: "/resources", hasDropdown: true },
  { label: "Leadership", href: "/leadership", hasDropdown: false },
];

const programMenu = [
  {
    title: "Professional Academy",
    href: "/programs#professional-academy",
    items: ["Resume Support", "LinkedIn Help", "Headshots", "Mock Interviews"],
  },
  {
    title: "Committees",
    href: "/programs#committees",
    items: [
      "Information Technology",
      "Health",
      "Social",
      "Community Service",
      "Academic",
      "Professional Development",
    ],
  },
  {
    title: "Wellness",
    href: "/programs#mentorship-wellness",
    items: ["Sports", "Brotherhood", "Health", "Balance"],
  },
  {
    title: "Upcoming Events",
    href: "/programs#upcoming-events",
    items: ["GBMs", "Workshops", "Mixers", "Service Events"],
  },
];

const resourcesMenu = [
  {
    title: "Highlights",
    href: "/resources#highlights",
    items: ["Featured Video", "DMC Story", "Member Moments", "Events"],
  },
  {
    title: "Student Success",
    href: "/resources#student-success",
    items: ["Writing Center", "Tutoring", "Career Services", "Wellness"],
  },
  {
    title: "Opportunities",
    href: "/resources#opportunities",
    items: ["Internships", "Scholarships", "Leadership", "Service"],
  },
  {
    title: "DMC Edu",
    href: "/resources#dmc-edu",
    items: ["Learning Paths", "Badges", "Certificates", "Quizzes"],
  },
  {
    title: "Role Search",
    href: "/resources#opportunities",
    items: ["Business", "Tech", "Engineering", "Health"],
  },
];

export default function Navbar() {
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsPastHero(window.scrollY > window.innerHeight * 0.85);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 px-4 pt-4 transition duration-500 md:px-8 ${
        isPastHero
          ? "pointer-events-none -translate-y-24 opacity-0"
          : "translate-y-0 opacity-100"
      }`}
    >
      <div
        className={`fixed inset-0 -z-10 bg-black/25 backdrop-blur-sm transition duration-300 ${
          activeDropdown
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <nav
        className={`relative mx-auto grid max-w-7xl overflow-hidden rounded-[2rem] border border-white/25 bg-white/[0.08] px-4 text-white shadow-[0_18px_60px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.35),0_0_45px_rgba(250,204,21,0.12)] backdrop-blur-xl transition-all duration-300 md:px-6 ${
          mobileOpen
            ? "h-[31rem] py-3"
            : activeDropdown
              ? "h-80 py-4"
              : "h-[68px] py-3"
        }`}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/12 via-transparent to-yellow-400/[0.03]" />

        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            aria-label="DMC home"
            className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full"
          >
            <img
              src="/favicon.ico"
              alt=""
              className="h-full w-full object-cover"
            />
          </Link>

          <div className="hidden items-center gap-5 md:gap-9 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onMouseEnter={() =>
                  setActiveDropdown(item.hasDropdown ? item.label : null)
                }
                className="font-['PolySans'] inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.14em] text-zinc-200 transition hover:text-yellow-400 md:text-base"
              >
                <span>{item.label}</span>
                {item.hasDropdown ? (
                  <span className="text-xs leading-none">v</span>
                ) : null}
              </Link>
            ))}
          </div>

          <Link
            href="/donate"
            className="font-['PolySans'] hidden rounded-full bg-yellow-400 px-5 py-3 text-xs font-black uppercase tracking-[0.14em] text-black shadow-[inset_0_1px_0_rgba(255,255,255,0.55)] transition hover:scale-105 hover:bg-white md:px-6 md:text-sm lg:inline-flex"
          >
            Donate
          </Link>

          <button
            type="button"
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((isOpen) => !isOpen);
              setActiveDropdown(null);
            }}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-white/10 lg:hidden"
          >
            <span className="grid gap-1.5">
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  mobileOpen ? "translate-y-2 rotate-45" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-0.5 w-5 bg-white transition ${
                  mobileOpen ? "-translate-y-2 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`relative z-10 hidden border-t border-white/10 transition duration-300 lg:block ${
            activeDropdown
              ? "mt-4 opacity-100"
              : "pointer-events-none mt-0 opacity-0"
          }`}
        >
          {activeDropdown === "Programs" ? (
            <div className="grid gap-6 px-2 pt-5 md:grid-cols-4 md:px-6">
              {programMenu.map((section) => (
                <div key={section.title}>
                  <Link
                    href={section.href}
                    className="font-['PolySans'] text-base font-black uppercase tracking-[0.12em] text-white transition hover:text-yellow-400"
                  >
                    {section.title}
                  </Link>

                  <div className="mt-4 grid gap-2">
                    {section.items.map((item) => (
                      <p
                        key={item}
                        className="font-['PolySans'] text-sm font-medium text-zinc-400"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {activeDropdown === "Resources" ? (
            <div className="grid gap-6 px-2 pt-5 md:grid-cols-5 md:px-6">
              {resourcesMenu.map((section) => (
                <div key={section.title}>
                  <Link
                    href={section.href}
                    className="font-['PolySans'] text-base font-black uppercase tracking-[0.12em] text-white transition hover:text-yellow-400"
                  >
                    {section.title}
                  </Link>

                  <div className="mt-4 grid gap-2">
                    {section.items.map((item) => (
                      <p
                        key={item}
                        className="font-['PolySans'] text-sm font-medium text-zinc-400"
                      >
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : null}
        </div>

        <div
          className={`relative z-10 border-t border-white/10 transition duration-300 lg:hidden ${
            mobileOpen
              ? "mt-4 opacity-100"
              : "pointer-events-none mt-0 opacity-0"
          }`}
        >
          <div className="grid gap-4 px-2 pt-5">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-['PolySans'] text-xl font-black uppercase tracking-[0.14em] text-white"
              >
                {item.label}
              </Link>
            ))}

            <div className="grid gap-3 border-t border-white/10 pt-4">
              <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.2em] text-yellow-400">
                Featured
              </p>
              {[
                ["Professional Academy", "/programs#professional-academy"],
                ["Committees", "/programs#committees"],
                ["Opportunities", "/resources#opportunities"],
                ["Highlights", "/resources#highlights"],
              ].map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="font-['PolySans'] text-sm font-medium text-zinc-300"
                >
                  {label}
                </Link>
              ))}
            </div>

            <Link
              href="/donate"
              onClick={() => setMobileOpen(false)}
              className="font-['PolySans'] mt-2 inline-flex items-center justify-center bg-yellow-400 px-5 py-4 text-sm font-black uppercase tracking-[0.14em] text-black"
            >
              Donate
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
