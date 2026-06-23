"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { executiveLeaders, getLeaderBySlug } from "./leadershipData";

const advisor = getLeaderBySlug("dr-carlton-goode");

const tabs = [
  {
    label: "Executive Officers",
    roles: ["President", "Vice President", "Secretary", "Treasurer", "Parliamentarian"],
  },
  {
    label: "Program Leads",
    roles: [
      "Director of Membership",
      "Director of Wellness",
      "Director of Mentorship",
      "Event Coordinator",
      "Director of Committees",
    ],
  },
  {
    label: "Communications",
    roles: [
      "Public Relations Director",
      "Social Media Director",
      "Director of Information Technology",
    ],
  },
];

export default function LeadershipPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const visibleLeaders = executiveLeaders.filter((leader) => {
    if ("roles" in activeTab && activeTab.roles) {
      return activeTab.roles.includes(leader.role);
    }

    return false;
  });

  return (
    <main className="bg-[#f3f3f1] text-black">
      <section className="relative min-h-[86vh] overflow-hidden px-6 pb-20 pt-40 text-white">
        <img
          src="/images/leadership/eboard-hero.jpg"
          alt="DMC executive board group photo"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f3f3f1] to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Leadership
          </p>
          <h1 className="font-['PolySans'] mt-5 max-w-5xl text-6xl font-black leading-none md:text-8xl">
            Meet the people guiding DMC.
          </h1>
          <p className="font-['PolySans'] mt-8 max-w-2xl text-xl leading-8 text-zinc-300">
            Developing Men of Color is led by students, supported by advisors,
            and shaped by people committed to brotherhood, excellence, service,
            and leadership.
          </p>
        </div>
      </section>

      {advisor ? (
        <section className="px-6 py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12">
              <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
                Meet the Advisor
              </p>
              <h2 className="font-['PolySans'] mt-4 text-5xl font-black leading-none md:text-7xl">
                {advisor.name}
              </h2>
            </div>

            <div className="grid gap-16 lg:grid-cols-[0.82fr_1.55fr] lg:items-start">
              <Link href={`/leadership/${advisor.slug}`} className="group bg-white p-4">
                <img
                  src={advisor.image}
                  alt={advisor.name}
                  className="aspect-square w-full object-cover grayscale transition duration-500 group-hover:grayscale-0"
                />
              </Link>

              <div>
                <p className="font-['PolySans'] text-sm text-zinc-500">
                  {advisor.role}
                </p>
                <h3 className="font-['PolySans'] mt-4 text-4xl font-black leading-tight">
                  Director of Intercultural Success & Initiatives
                </h3>
                <div className="font-['PolySans'] mt-10 grid gap-7 text-lg leading-8 text-zinc-700">
                  {advisor.biography.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
                <Link
                  href={`/leadership/${advisor.slug}`}
                  className="font-['PolySans'] mt-8 inline-flex text-sm font-black uppercase tracking-[0.16em] text-yellow-700 transition hover:text-black"
                >
                  Read Advisor Biography
                </Link>

                <div className="mt-10 grid gap-5 md:grid-cols-3">
                  {advisor.details?.slice(1).map((detail) => (
                    <div key={detail.label} className="bg-white p-6">
                      <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                        {detail.label}
                      </p>
                      <p className="font-['PolySans'] mt-4 text-base leading-7 text-zinc-700">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="font-['PolySans'] text-5xl font-black leading-none md:text-7xl">
              Executive Biographies
            </h2>
            <p className="font-['PolySans'] mt-6 max-w-2xl text-xl leading-8 text-zinc-700">
              Meet the student leaders building events, programs, mentorship,
              committees, technology, and member experiences for DMC.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap gap-8 border-b border-zinc-300">
            {tabs.map((tab) => {
              const isActive = activeTab.label === tab.label;

              return (
                <button
                  key={tab.label}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`font-['PolySans'] pb-3 text-lg transition ${
                    isActive
                      ? "border-b-2 border-black text-black"
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab.label}
              className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              {visibleLeaders.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                >
                  <Link
                    href={`/leadership/${member.slug}`}
                    className="group block bg-white p-8 text-center transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)]"
                  >
                    <h3 className="font-['PolySans'] text-2xl font-black">
                      {member.name}
                    </h3>
                    <p className="font-['PolySans'] mx-auto mt-4 max-w-48 text-base leading-7 text-zinc-500">
                      {member.role}
                    </p>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="mx-auto mt-10 h-56 w-56 object-cover object-top grayscale transition duration-500 group-hover:grayscale-0"
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </main>
  );
}
