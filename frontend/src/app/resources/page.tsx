"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  X,
} from "lucide-react";

const toolkitResources = [
  {
    title: "VCU Writing Center",
    category: "Academic Support",
    description:
      "Get help planning, drafting, revising, and polishing papers, personal statements, and scholarship essays.",
    href: "https://writing.vcu.edu/",
  },
  {
    title: "VCU Campus Learning Center",
    category: "Academic Support",
    description:
      "Find tutoring, academic coaching, supplemental instruction, and study support for high-demand courses.",
    href: "https://clc.vcu.edu/",
  },
  {
    title: "VCU Career Services",
    category: "Career Readiness",
    description:
      "Use career advising, resume reviews, Handshake support, mock interviews, and job search guidance.",
    href: "https://careers.vcu.edu/",
  },
  {
    title: "VCU Financial Aid",
    category: "Money & Planning",
    description:
      "Review financial aid, scholarships, FAFSA support, billing questions, and college affordability resources.",
    href: "https://sfs.vcu.edu/",
  },
  {
    title: "VCU Counseling Services",
    category: "Wellness",
    description:
      "Access mental health services, consultations, groups, crisis support, and wellness resources.",
    href: "https://counseling.vcu.edu/",
  },
  {
    title: "VCU Libraries",
    category: "Research",
    description:
      "Use research databases, study rooms, librarians, citation tools, and academic project support.",
    href: "https://www.library.vcu.edu/",
  },
];

const roleGroups = [
  {
    track: "Business",
    roles: [
      "Financial Analyst",
      "Accounting",
      "Marketing",
      "Sales Development",
      "Business Analyst",
      "Consulting",
      "Operations",
      "Project Management",
      "Human Resources",
      "Supply Chain",
      "Product Marketing",
      "Investment Banking",
      "Wealth Management",
      "Audit",
      "Tax",
      "Brand Strategy",
      "Customer Success",
      "Procurement",
      "Market Research",
      "Entrepreneurship",
    ],
  },
  {
    track: "Tech",
    roles: [
      "Software Engineer",
      "Frontend Developer",
      "Backend Developer",
      "Full Stack Developer",
      "Data Analyst",
      "Data Science",
      "Cybersecurity",
      "IT Support",
      "Cloud Engineering",
      "DevOps",
      "AI Engineer",
      "Machine Learning",
      "Product Manager",
      "UX Research",
      "UI Designer",
      "Systems Administrator",
      "Database Administrator",
      "Network Engineer",
      "Quality Assurance",
      "Technical Support",
    ],
  },
  {
    track: "Engineering",
    roles: [
      "Mechanical Engineering",
      "Electrical Engineering",
      "Civil Engineering",
      "Industrial Engineering",
      "Biomedical Engineering",
      "Chemical Engineering",
      "Environmental Engineering",
      "Manufacturing Engineering",
      "Aerospace Engineering",
      "Systems Engineering",
      "Controls Engineering",
      "Process Engineering",
      "Quality Engineering",
      "Field Engineering",
      "Construction Management",
      "Structural Engineering",
      "Materials Engineering",
      "Robotics Engineering",
      "Energy Engineering",
      "Engineering Project",
    ],
  },
  {
    track: "Health",
    roles: [
      "Healthcare Administration",
      "Public Health",
      "Clinical Research",
      "Research Assistant",
      "Medical Assistant",
      "Patient Care Technician",
      "Health Education",
      "Behavioral Health",
      "Pharmacy",
      "Nursing",
      "Physical Therapy Aide",
      "Occupational Therapy Aide",
      "Dental Assistant",
      "Medical Scribe",
      "Epidemiology",
      "Health Policy",
      "Hospital Operations",
      "Community Health Worker",
      "Lab Assistant",
      "Pre-Med",
    ],
  },
  {
    track: "Other",
    roles: [
      "Education",
      "Nonprofit",
      "Communications",
      "Public Relations",
      "Social Media",
      "Graphic Design",
      "Content Writer",
      "Policy",
      "Government Affairs",
      "Legal",
      "Paralegal",
      "Community Outreach",
      "Event Planning",
      "Program Coordinator",
      "Research",
      "Social Work",
      "Criminal Justice",
      "Journalism",
      "Administrative",
      "Leadership Development",
    ],
  },
];

const roleOpportunities = roleGroups.flatMap((group) =>
  group.roles.map((role) => ({
    role,
    track: group.track,
    href: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(
      `${role} entry level early career`,
    )}&f_TPR=r86400&sortBy=DD`,
  })),
);

const highlightVideos = [
  {
    title: "DMC Get Fitted Suit Day",
    description:
      "Members received professional attire to support career readiness.",
    coverImage: "/images/highlights/suit-day.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1UIVgO5oqk-ahEtBWf4E6rS6aF4Nd6Ljp/preview",
  },
  {
    title: "GBM with Virginia Credit Union",
    description:
      "A financial literacy session with practical resources from VACU.",
    coverImage: "/images/highlights/gbm-vacu.png",
    videoUrl:
      "https://drive.google.com/file/d/1BggVKnHJAXKKl7MCd8EEoUKJSVxFda2G/preview",
  },
  {
    title: "Internship Workshop",
    description:
      "Professional networking, LinkedIn support, and career preparation.",
    coverImage: "/images/highlights/internship-workshop.png",
    videoUrl:
      "https://drive.google.com/file/d/1UbGG55vKIolyhGWtipMRS0Mr404RdhII/preview",
  },
  {
    title: "DMC 7 on 7 Football",
    description: "Competition, teamwork, and sportsmanship on the field.",
    coverImage: "/images/highlights/football-7on7.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1RB4XWhtfQZKUirPwWNwkV27oBt0TDhPN/preview",
  },
  {
    title: "DMC Mixer",
    description:
      "Students and professionals gathered for community and networking.",
    coverImage: "/images/highlights/dmc-mixer.jpg",
    videoUrl:
      "https://drive.google.com/file/d/1gHdVsuv4e2fyipT3fbZJfi5nUcj7ACrR/preview",
  },
  {
    title: "DMC Basketball",
    description: "A high-energy day of basketball and brotherhood.",
    coverImage: "/images/highlights/basketball.jpg",
    videoUrl:
      "https://drive.google.com/file/d/11DRpJ8PIrarpE4WVcjVCXUxj6eU5OMhB/preview",
  },
];

const dmcEduPaths = [
  {
    title: "Career Fair Certified",
    level: "Beginner",
    time: "2 hours",
    modules: "5 modules",
    description:
      "Build a resume, elevator pitch, LinkedIn profile, and employer follow-up system before career fair season.",
  },
  {
    title: "Tech Career Accelerator",
    level: "Beginner to Intermediate",
    time: "4 hours",
    modules: "6 modules",
    description:
      "Learn how to organize a portfolio, explain projects, prepare for technical interviews, and use GitHub professionally.",
  },
  {
    title: "Business Professional Accelerator",
    level: "Beginner",
    time: "3 hours",
    modules: "5 modules",
    description:
      "Practice networking, interview language, professional dress, finance basics, and workplace communication.",
  },
];

export default function ResourcesPage() {
  const [activeVideo, setActiveVideo] = useState<(typeof highlightVideos)[number] | null>(null);
  const [roleQuery, setRoleQuery] = useState("");

  const filteredRoles = useMemo(() => {
    const normalizedQuery = roleQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return roleOpportunities;
    }

    return roleOpportunities.filter((opportunity) =>
      `${opportunity.role} ${opportunity.track}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [roleQuery]);

  return (
    <main className="min-h-screen bg-white text-black">
      <section className="relative overflow-hidden bg-black px-6 pb-24 pt-36 text-white md:pt-44">
        <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(0,0,0,0.96),rgba(0,0,0,0.82)),radial-gradient(circle_at_80%_10%,rgba(250,204,21,0.16),transparent_34%)]" />
        <div className="absolute inset-x-0 bottom-0 h-[6px] bg-yellow-400" />

        <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
              DMC Resources
            </p>
            <h1 className="font-['PolySans'] mt-5 max-w-5xl text-6xl font-black uppercase leading-[0.9] md:text-8xl">
              Member resources built for action.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-zinc-300 md:text-xl">
              Academic support, career readiness, opportunities, video
              highlights, and the first preview of DMC Edu in one place.
            </p>
          </div>

          <div className="border-l border-yellow-400/60 pl-6">
            {[
              ["01", "Featured Highlights"],
              ["02", "Student Success Toolkit"],
              ["03", "Opportunities Board"],
              ["04", "DMC Edu Preview"],
            ].map(([number, item]) => (
              <div
                key={item}
                className="grid grid-cols-[3rem_1fr] border-b border-white/10 py-5 last:border-b-0"
              >
                <span className="font-['PolySans'] text-sm font-black text-yellow-400">
                  {number}
                </span>
                <span className="font-['PolySans'] text-lg font-black uppercase tracking-[0.08em] text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="highlights" className="bg-zinc-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 border-b border-white/10 pb-10 text-center">
            <div className="mx-auto max-w-4xl">
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
                Highlights
              </p>
              <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
                Watch DMC in motion.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {highlightVideos.map((video) => (
              <button
                key={video.title}
                type="button"
                onClick={() => setActiveVideo(video)}
                className="group border border-white/10 bg-black transition duration-300 hover:-translate-y-1 hover:border-yellow-400/70 hover:shadow-[0_24px_70px_rgba(0,0,0,0.35)]"
                aria-label={`Open ${video.title} video`}
              >
                <div className="aspect-video w-full overflow-hidden bg-black">
                  <div className="relative h-full w-full overflow-hidden text-left">
                    <img
                      src={video.coverImage}
                      alt=""
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/10" />
                    <span className="font-['PolySans'] absolute bottom-4 left-4 text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                      Watch Highlight
                    </span>
                  </div>
                </div>
                <div className="border-t border-white/10 p-5 text-left">
                  <h3 className="font-['PolySans'] text-xl font-black uppercase leading-tight text-white transition group-hover:text-yellow-400">
                    {video.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {video.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {activeVideo ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 px-4 py-8 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={`${activeVideo.title} video`}
          onClick={() => setActiveVideo(null)}
        >
          <div
            className="w-full max-w-6xl border border-white/15 bg-zinc-950 p-4 shadow-[0_40px_120px_rgba(0,0,0,0.65)] md:p-6"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mb-4 flex items-start justify-between gap-6">
              <div>
                <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-400">
                  Video Highlight
                </p>
                <h3 className="font-['PolySans'] mt-2 text-2xl font-black uppercase leading-tight text-white md:text-4xl">
                  {activeVideo.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActiveVideo(null)}
                className="flex h-11 w-11 shrink-0 items-center justify-center bg-yellow-400 text-black transition hover:bg-white"
                aria-label="Close video"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="aspect-video w-full bg-black">
              <iframe
                src={activeVideo.videoUrl}
                title={activeVideo.title}
                allow="autoplay; fullscreen"
                allowFullScreen
                className="h-full w-full"
              />
            </div>

            <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400 md:text-base">
              {activeVideo.description}
            </p>
          </div>
        </div>
      ) : null}

      <section id="student-success" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 border-b border-zinc-200 pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-700">
                Student Success Toolkit
              </p>
              <h2 className="font-['PolySans'] mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                The support system.
              </h2>
            </div>
            <p className="mt-5 text-lg leading-8 text-zinc-700">
              These are the resources members can use when they need academic,
              professional, financial, wellness, or research support.
            </p>
          </div>

          <div className="mt-2 divide-y divide-zinc-200">
            {toolkitResources.map((resource) => (
              <a
                key={resource.title}
                href={resource.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-4 py-7 transition md:grid-cols-[0.35fr_1fr_auto] md:items-center"
              >
                <span className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-700">
                  {resource.category}
                </span>
                <div>
                  <h3 className="font-['PolySans'] text-2xl font-black uppercase leading-tight transition group-hover:text-yellow-700">
                    {resource.title}
                  </h3>
                  <p className="mt-4 leading-7 text-zinc-600">
                    {resource.description}
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-zinc-400 transition group-hover:text-yellow-700" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="opportunities" className="bg-zinc-950 px-6 py-24 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 grid gap-8 border-b border-white/10 pb-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
            <div>
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-400">
                Opportunities Board
              </p>
              <h2 className="font-['PolySans'] mt-4 text-4xl font-black uppercase leading-none md:text-6xl">
                Search 100 role pathways.
              </h2>
            </div>
            <p className="text-lg leading-8 text-zinc-300">
              Type the role you want, then open LinkedIn jobs posted in the
              last 24 hours, sorted by newest first.
            </p>
          </div>

          <div className="mb-8 border border-white/10 bg-black/20 p-4">
            <label htmlFor="role-search" className="sr-only">
              Search role pathways
            </label>
            <div className="flex items-center gap-3 border-b border-white/15 pb-3">
              <Search className="h-5 w-5 text-yellow-400" />
              <input
                id="role-search"
                value={roleQuery}
                onChange={(event) => setRoleQuery(event.target.value)}
                placeholder="Search roles like software engineer, nurse, mechanical, marketing..."
                className="w-full bg-transparent text-sm text-white placeholder:text-zinc-500"
              />
            </div>
            <p className="mt-3 text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
              Showing {filteredRoles.length} of {roleOpportunities.length} role searches
            </p>
          </div>

          <div className="max-h-[46rem] overflow-y-auto border-y border-white/10 pr-2">
            <div className="divide-y divide-white/10">
              {filteredRoles.map((opportunity) => (
              <a
                key={`${opportunity.track}-${opportunity.role}`}
                href={opportunity.href}
                target="_blank"
                rel="noreferrer"
                className="group grid gap-5 py-5 transition hover:bg-white/[0.035] md:grid-cols-[1fr_auto] md:items-center"
              >
                <div>
                  <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-zinc-500">
                    {opportunity.track}
                  </p>
                  <h3 className="font-['PolySans'] mt-3 text-2xl font-black uppercase leading-tight text-white transition group-hover:text-yellow-400">
                    {opportunity.role}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    Last 24 hours · Newest first · LinkedIn Jobs
                  </p>
                </div>
                <ArrowUpRight className="h-6 w-6 text-zinc-500 transition group-hover:text-yellow-400" />
              </a>
              ))}
            </div>

            {filteredRoles.length === 0 ? (
              <div className="py-10 text-zinc-300">
                No role pathways match that search yet.
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section id="dmc-edu" className="bg-white px-6 py-24 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 border-y border-zinc-200 py-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <div>
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.24em] text-yellow-700">
                DMC Edu
              </p>
              <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
                Coming soon...
              </h2>
              <p className="mt-6 text-lg leading-8 text-zinc-700">
                This will become DMC&apos;s learning hub for professional
                development, technical training, certificates, badges, and
                student progress tracking.
              </p>

              <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
                {["Learning Paths", "Badges & Certificates", "Modules & Quizzes", "Career Skill Tracks"].map(
                  (label, index) => (
                    <div
                      key={label}
                      className="grid grid-cols-[3rem_1fr] py-4"
                    >
                      <span className="font-['PolySans'] text-sm font-black text-yellow-700">
                        0{index + 1}
                      </span>
                      <span className="font-['PolySans'] text-sm font-black uppercase tracking-[0.12em]">
                        {label}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>

            <div className="grid gap-4">
              {dmcEduPaths.map((path) => (
                <article
                  key={path.title}
                  className="border border-zinc-200 bg-white p-6"
                >
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-black px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-white">
                      {path.level}
                    </span>
                    <span className="bg-yellow-100 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-yellow-800">
                      {path.time}
                    </span>
                    <span className="border border-zinc-200 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-zinc-600">
                      {path.modules}
                    </span>
                  </div>
                  <h3 className="font-['PolySans'] mt-5 text-2xl font-black uppercase leading-tight">
                    {path.title}
                  </h3>
                  <p className="mt-3 leading-7 text-zinc-600">
                    {path.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
