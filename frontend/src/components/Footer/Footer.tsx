import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const primaryLinks = [
  {
    label: "Home",
    href: "/",
    description: "Mission, impact, programs, spotlights, and contact.",
  },
  {
    label: "Programs",
    href: "/programs",
    description: "Professional Academy, committees, mentorship, wellness, and events.",
  },
  {
    label: "Resources",
    href: "/resources",
    description: "Videos, student support, role searches, and DMC Edu preview.",
  },
  {
    label: "Leadership",
    href: "/leadership",
    description: "Advisor, executive officers, program leads, and communications.",
  },
  {
    label: "Donate",
    href: "/donate",
    description: "Support programming, student development, and DMC initiatives.",
  },
  {
    label: "Contact",
    href: "/contact",
    description: "Reach out about membership, partnerships, events, or support.",
  },
];

const programLinks = [
  { label: "Professional Academy", href: "/programs#professional-academy" },
  { label: "Committees", href: "/programs#committees" },
  { label: "Mentorship", href: "/programs#mentorship-wellness" },
  { label: "Wellness & Sports", href: "/programs#mentorship-wellness" },
  { label: "Upcoming Events", href: "/programs#upcoming-events" },
];

const resourceLinks = [
  { label: "Video Highlights", href: "/resources#highlights" },
  { label: "Student Success Toolkit", href: "/resources#student-success" },
  { label: "Opportunities Board", href: "/resources#opportunities" },
  { label: "DMC Edu", href: "/resources#dmc-edu" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/vcu.dmc/" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/developing-men-of-color/posts/?feedView=all",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@vcudevelopingmenofcolor3402",
  },
];

export default function Footer() {
  return (
    <footer className="bg-black px-6 py-20 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 border-y border-white/10 py-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
              Developing Men of Color
            </p>
            <h2 className="font-['PolySans'] mt-4 max-w-xl text-5xl font-black uppercase leading-none md:text-7xl">
              Excellence is our standard.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
              Brotherhood, mentorship, leadership, service, and professional
              development at Virginia Commonwealth University.
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {primaryLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="group grid gap-4 py-6 transition hover:bg-white/[0.035] md:grid-cols-[1fr_auto] md:items-center"
              >
                <span>
                  <span className="font-['PolySans'] block text-2xl font-black uppercase leading-tight transition group-hover:text-yellow-400">
                    {link.label}
                  </span>
                  <span className="mt-2 block leading-7 text-zinc-500">
                    {link.description}
                  </span>
                </span>
                <ArrowUpRight className="h-6 w-6 text-zinc-600 transition group-hover:text-yellow-400" />
              </Link>
            ))}
          </div>
        </div>

        <div className="grid gap-10 border-b border-white/10 py-12 md:grid-cols-3">
          <section>
            <h3 className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Programs
            </h3>
            <div className="mt-5 grid gap-3">
              {programLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-zinc-400 transition hover:text-yellow-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Resources
            </h3>
            <div className="mt-5 grid gap-3">
              {resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm font-semibold text-zinc-400 transition hover:text-yellow-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </section>

          <section>
            <h3 className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
              Social
            </h3>
            <div className="mt-5 grid gap-3">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-semibold text-zinc-400 transition hover:text-yellow-400"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-4 pt-8 text-sm font-semibold text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} Developing Men of Color at Virginia
            Commonwealth University.
          </p>
          <p>Built for members, partners, alumni, and the VCU community.</p>
        </div>
      </div>
    </footer>
  );
}
