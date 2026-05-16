'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Crown, UsersRound } from 'lucide-react';
import EboardHero from '../../../assets/EBOARD2025/EBoard2025.jpg';
import Goode from '../../../assets/EBOARD2025/Goode2025.jpg';
import Kaleb from '../../../assets/EBOARD2025/Kaleb2025.jpg';
import Xavier from '../../../assets/EBOARD2025/Xavier2025.jpg';
import Kwame from '../../../assets/EBOARD2025/Kwame2025.jpg';
import Kabir from '../../../assets/EBOARD2025/Kabir2025.jpg';
import Sean from '../../../assets/EBOARD2025/Sean2025.jpg';
import Thurman from '../../../assets/EBOARD2025/Thurman.jpg';
import Jason from '../../../assets/EBOARD2025/Jason2025.jpg';
import Paul from '../../../assets/EBOARD2025/Paul2025.jpg';
import Naod from '../../../assets/EBOARD2025/Naod2025.jpg';
import Sam from '../../../assets/EBOARD2025/Sam2025.jpg';
import Clyde from '../../../assets/EBOARD2025/Clyde2025.jpg';
import Shawn from '../../../assets/EBOARD2025/Shawn2025.jpg';
import Mo from '../../../assets/EBOARD2025/Mo2025.jpg';

const team = [
  { name: 'Kaleb Brown', role: 'President', image: Kaleb, link: '/eboard/president', group: 'Executive' },
  { name: 'Xavier Lewis', role: 'Vice President', image: Xavier, link: '/eboard/vice-president', group: 'Executive' },
  { name: 'Kabir Munjwani', role: 'Secretary', image: Kabir, link: '/eboard/secretary', group: 'Operations' },
  { name: 'Sean Goffigan', role: 'Director of Finances', image: Sean, link: '/eboard/treasurer', group: 'Operations' },
  { name: 'Kwame Mensah', role: 'Parliamentarian', image: Kwame, link: '/eboard/parliamentarian', group: 'Operations' },
  { name: 'Naod Daniel', role: 'Director of Membership', image: Naod, link: '/eboard/membership-chair', group: 'Member Experience' },
  { name: 'Jason Gallardo Gonzalez', role: 'Public Relations Director', image: Jason, link: '/eboard/public-relations-coordinator', group: 'Communications' },
  { name: 'Paul Adelugba', role: 'Social Media Director', image: Paul, link: '/eboard/social-media-chair', group: 'Communications' },
  { name: 'Samuel Brannen', role: 'Director of Wellness', image: Sam, link: '/eboard/wellness-director', group: 'Member Experience' },
  { name: 'Shawn Watson', role: 'Director of IT', image: Shawn, link: '/eboard/director-of-it', group: 'Technology' },
  { name: 'Thurman Smith Jr', role: 'Director of Mentorship', image: Thurman, link: '/eboard/mentorship-director', group: 'Programs' },
  { name: 'Clyde Clark III', role: 'Event Coordinator', image: Clyde, link: '/eboard/event-coordinator', group: 'Programs' },
  { name: 'Mohamed Turay', role: 'Director of Committees', image: Mo, link: '/eboard/director-of-committees', group: 'Programs' },
  { name: 'Dr. Carlton Goode', role: 'Faculty Advisor', image: Goode, link: '/eboard/faculty-advisor', group: 'Advisor' },
];

const EboardPage = () => {
  const executive = team.slice(0, 2);
  const members = team.slice(2);

  return (
    <main className="dmc-dark-section">
      <section className="relative min-h-screen overflow-hidden px-6 pb-20 pt-32 sm:px-8 lg:px-12">
        <Image
          src={EboardHero}
          alt="DMC executive board group photo"
          fill
          priority
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.76)_48%,rgba(0,0,0,0.30)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[var(--dmc-bg)] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col justify-center">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/35 bg-black/35 px-4 py-2 text-sm font-black uppercase tracking-[0.22em] text-yellow-300">
              <Crown className="h-4 w-4" />
              2025-2026 Leadership
            </div>
            <h1 className="text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-8xl">
              Meet the E-Board.
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-gray-200 md:text-xl">
              The students and advisors organizing DMC&apos;s programs, committees,
              mentorship, events, communications, and member experience.
            </p>
            <a
              href="#team"
              className="mt-9 inline-flex items-center gap-3 bg-yellow-400 px-7 py-4 text-lg font-black text-black transition hover:bg-white"
            >
              View Leadership
              <ArrowRight className="h-5 w-5" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="dmc-light-section px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-sm font-black uppercase tracking-[0.24em] text-yellow-600">
                Executive Team
              </p>
              <h2 className="text-4xl font-black leading-tight md:text-6xl">
                Setting the direction.
              </h2>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {executive.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index} featured />
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="dmc-panel-section px-6 py-24 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="mb-6 inline-flex items-center gap-3 border border-yellow-400/40 px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-yellow-400">
                <UsersRound className="h-4 w-4" />
                Full Board
              </div>
              <h2 className="max-w-3xl text-4xl font-black leading-tight md:text-6xl">
                The team behind the work.
              </h2>
            </div>
            <p className="dmc-muted max-w-md text-lg leading-8">
              Click a leader to view their role page and learn more about their work.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {members.map((member, index) => (
              <MemberCard key={member.name} member={member} index={index} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

const MemberCard = ({ member, index, featured = false }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, delay: index * 0.05 }}
  >
    <Link
      href={member.link}
      className={`dmc-card group block overflow-hidden border transition hover:border-yellow-400 ${
        featured ? 'grid md:grid-cols-[0.86fr_1fr]' : ''
      }`}
    >
      <div className={`relative overflow-hidden bg-black ${featured ? 'aspect-[4/5] md:aspect-auto' : 'aspect-[4/5]'}`}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          sizes={featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80" />
      </div>
      <div className="p-6">
        <p className="mb-3 inline-flex bg-yellow-400 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-black">
          {member.group}
        </p>
        <h3 className={`${featured ? 'text-4xl' : 'text-2xl'} font-black`}>{member.name}</h3>
        <p className="dmc-muted mt-2 text-lg font-bold">{member.role}</p>
        <div className="mt-6 inline-flex items-center gap-2 font-black text-yellow-500">
          View profile
          <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  </motion.div>
);

export default EboardPage;
