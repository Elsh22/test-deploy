"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { leaders } from "./leadershipData";

const previousLeadershipOrder = [
  "dr-carlton-goode",
  "kaleb-brown",
  "naod-daniel",
  "ayo-orenuga",
  "noah-mcgirt",
  "atticus-kamara",
  "ethan-jemmont",
  "samuel-brannen",
  "andre-carter",
  "surafel-muluneh",
  "derrick-bryant",
  "tyrese-perkins",
  "jayden-nshimye",
  "shawn-watson",
];

const orderedLeaders = previousLeadershipOrder
  .map((slug) => leaders.find((leader) => leader.slug === slug))
  .filter((leader): leader is (typeof leaders)[number] => Boolean(leader));

export default function LeadershipPage() {
  return (
    <main className="bg-[#f3f3f1] text-black">
      <section className="relative min-h-[86vh] overflow-hidden px-6 pb-20 pt-40 text-white">
        <img
          src="/images/leadership/eboard-hero-2026.jpg"
          alt="DMC executive board group photo"
          className="absolute inset-0 h-full w-full object-cover"
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

      <section className="px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <h2 className="font-['PolySans'] text-5xl font-black leading-none md:text-7xl">
              Leadership
            </h2>
            <p className="font-['PolySans'] mt-6 max-w-2xl text-xl leading-8 text-zinc-700">
              Meet the executive board, advisor, and directors building events,
              programs, mentorship, technology, wellness, and member experiences
              for DMC.
            </p>
          </div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
          >
            {orderedLeaders.map((member, index) => (
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
                    className="mx-auto mt-10 h-56 w-56 object-cover object-top transition duration-500"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
}
