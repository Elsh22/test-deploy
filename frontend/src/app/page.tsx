"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const companyLogos = [
  {
    name: "NewMarket Corporation",
    logo: "/images/company-logos/newmarket.png",
    wordmarkLogo: "/images/company-logos/newmarket-wordmark.png",
    href: "https://www.linkedin.com/company/newmarket-corporation",
  },
  {
    name: "IBM",
    logo: "/images/company-logos/ibm.png",
    wordmarkLogo: "/images/company-logos/ibm-wordmark.png",
    href: "https://www.linkedin.com/company/ibm",
  },
  {
    name: "Lockheed Martin",
    logo: "/images/company-logos/lockheed-martin.png",
    wordmarkLogo: "/images/company-logos/lockheed-martin-wordmark.png",
    href: "https://www.linkedin.com/company/lockheed-martin",
  },
  {
    name: "Estes Express Lines",
    logo: "/images/company-logos/estes.png",
    wordmarkLogo: "/images/company-logos/estes-wordmark.png",
    href: "https://www.linkedin.com/company/estes-express-lines",
  },
  {
    name: "Federal Reserve Bank of Richmond",
    logo: "/images/company-logos/federal-reserve-richmond.png",
    wordmarkLogo: "/images/company-logos/federal-reserve-richmond-wordmark.png",
    href: "https://www.linkedin.com/company/federal-reserve-bank-of-richmond",
  },
  {
    name: "Virginia Credit Union",
    logo: "/images/company-logos/virginia-credit-union.png",
    wordmarkLogo: "/images/company-logos/virginia-credit-union-wordmark.png",
    href: "https://www.linkedin.com/company/virginia-credit-union",
  },
  {
    name: "Google",
    logo: "/images/company-logos/google.png",
    wordmarkLogo: "/images/company-logos/google-wordmark.png",
    href: "https://www.linkedin.com/company/google",
  },
  {
    name: "Microsoft",
    logo: "/images/company-logos/microsoft.png",
    wordmarkLogo: "/images/company-logos/microsoft-wordmark.png",
    href: "https://www.linkedin.com/company/microsoft",
  },
  {
    name: "Virginia Commonwealth University",
    logo: "/images/company-logos/vcu.png",
    wordmarkLogo: "/images/company-logos/vcu-wordmark.png",
    href: "https://www.linkedin.com/school/virginia-commonwealth-university/",
  },
  {
    name: "Deloitte",
    logo: "/images/company-logos/deloitte.png",
    wordmarkLogo: "/images/company-logos/deloitte-wordmark.png",
    href: "https://www.linkedin.com/company/deloitte",
  },
  {
    name: "Leidos",
    logo: "/images/company-logos/leidos.png",
    wordmarkLogo: "/images/company-logos/leidos-wordmark.png",
    href: "https://www.linkedin.com/company/leidos",
  },
  {
    name: "SHPEP",
    logo: "/images/company-logos/shpep.png",
    wordmarkLogo: "/images/company-logos/shpep-wordmark.png",
    href: "https://www.linkedin.com/company/shpepuw",
  },
  {
    name: "Dell Technologies",
    logo: "/images/company-logos/dell-technologies.png",
    wordmarkLogo: "/images/company-logos/dell-technologies-wordmark.png",
    href: "https://www.linkedin.com/company/delltechnologies",
  },
  {
    name: "CGI Inc.",
    logo: "/images/company-logos/cgi.png",
    wordmarkLogo: "/images/company-logos/cgi-wordmark.png",
    href: "https://www.linkedin.com/company/cgi",
  },
  {
    name: "Serco",
    logo: "/images/company-logos/serco.png",
    wordmarkLogo: "/images/company-logos/serco-wordmark.png",
    href: "https://www.linkedin.com/company/serco",
  },
  {
    name: "WSP Global",
    logo: "/images/company-logos/wsp-global.png",
    wordmarkLogo: "/images/company-logos/wsp-global-wordmark.png",
    href: "https://www.linkedin.com/company/wsp",
  },
  {
    name: "PepsiCo",
    logo: "/images/company-logos/pepsico.png",
    wordmarkLogo: "/images/company-logos/pepsico-wordmark.png",
    href: "https://www.linkedin.com/company/pepsico",
  },
  {
    name: "Virginia State Police",
    logo: "/images/company-logos/virginia-state-police.png",
    wordmarkLogo: "/images/company-logos/virginia-state-police-wordmark.png",
    href: "https://www.linkedin.com/company/virginiastatepolice",
  },
];

const memberSpotlights = [
  {
    name: "Stephen Kouevi (Alumni)",
    title: "Business Analyst",
    company: "CGI",
    excerpt:
      "Used DMC mentorship and professional development workshops to prepare for technical interviews and grow with confidence.",
    photo: "/images/LinkedIn_Headshots/SK.jpg",
  },
  {
    name: "Thomas Chatman (Alumni)",
    title: "Software Engineer II",
    company: "Dell Technologies",
    excerpt:
      "Built leadership skills through service, brotherhood, and campus involvement before stepping into a professional role.",
    photo: "/images/LinkedIn_Headshots/TC.jpg",
  },
  {
    name: "Kaleb Brown (Student)",
    title: "Cybersecurity Intern",
    company: "Estes Express Lines",
    excerpt:
      "Connected academic excellence with career preparation through DMC's network of alumni, mentors, and peers.",
    photo: "/images/LinkedIn_Headshots/KB.jpg",
  },
];

const programPreviews = [
  {
    title: "Professional Academy",
    description:
      "Career readiness through resumes, LinkedIn support, mock interviews, headshots, tie rentals, and professional development workshops.",
    image: "/images/home/program-academy.jpg",
  },
  {
    title: "Mentorship",
    description:
      "A brotherhood-centered support system connecting students with peers, alumni, and leaders who help them grow on campus and beyond.",
    image: "/images/home/program-mentorship.jpg",
  },
  {
    title: "Sports & Wellness",
    description:
      "Intramural sports, wellness events, and team-building experiences that help members stay active, connected, and balanced.",
    image: "/images/home/program-sports.jpg",
  },
  {
    title: "Committees",
    description:
      "Hands-on leadership opportunities in service, events, media, membership, fundraising, technology, and campus engagement.",
    image: "/images/home/program-committees.png",
  },
];

const upcomingEvents = [
  {
    date: "Aug 2026",
    title: "Fall Interest Meeting",
    type: "General Body",
  },
  {
    date: "Sep 2026",
    title: "Professional Academy Kickoff",
    type: "Career Development",
  },
  {
    date: "Oct 2026",
    title: "DMC Mixer",
    type: "Signature Event",
  },
];

const sundaySpotlight = {
  name: "Noah Benyam",
  highlight: "2026 Boeing Finance Intern",
  reason:
    "Today’s Sunday Spotlight is Noah Benyam, who recently excepted his offer as a 2026 Boeing Finance Intern. What an achievement of excellence! We celebrate this milestone in your career journey with you, Noah!",
  quote:
    "The community I've had at DMC has pushed me to want to achieve more for myself and to make sure I was prepared for the opportunities that came my way. I am very thankful for all the tools I've been given by DMC to succeed and I'm very blessed to say I've accepted an offer from Boeing as a Finance Intern.",
  flyer: "/images/spotlights/noah-benyam-boeing.jpg",
};

function CountUpNumber({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) return;

    let frame = 0;
    const totalFrames = 80;
    const interval = window.setInterval(() => {
      frame += 1;
      const progress = frame / totalFrames;
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * easedProgress));

      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setCount(target);
      }
    }, 20);

    return () => window.clearInterval(interval);
  }, [hasStarted, target]);

  return (
    <motion.span
      onViewportEnter={() => setHasStarted(true)}
      viewport={{ once: true, amount: 0.6 }}
    >
      {count}
    </motion.span>
  );
}

function MixerCountdown() {
  const mixerDate = new Date("2026-09-07T16:00:00-04:00").getTime();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const distance = Math.max(0, mixerDate - Date.now());

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(interval);
  }, [mixerDate]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      {[
        ["Days", timeLeft.days],
        ["Hours", timeLeft.hours],
        ["Minutes", timeLeft.minutes],
        ["Seconds", timeLeft.seconds],
      ].map(([label, value]) => (
        <div key={label} className="flex items-baseline gap-2">
          <span className="font-['PolySans'] text-2xl font-black text-white md:text-3xl">
            {String(value).padStart(2, "0")}
          </span>
          <span className="text-xs font-black uppercase tracking-[0.18em] text-zinc-400">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="bg-[#050505] text-white">
      <section className="relative min-h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/DMCMIXER2025.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
          <div>
            <p className="font-['PolySans'] mb-5 text-sm font-bold uppercase tracking-[0.3em] text-yellow-400">
              Developing Men of Color at VCU
            </p>

            <h1 className="font-['PolySans'] max-w-5xl text-6xl font-black uppercase leading-[0.88] md:text-8xl">
              Excellence is our standard.
            </h1>

            <div className="font-['PolySans'] mt-10 flex flex-col gap-4 sm:flex-row">
              <a
                href="https://vcu.campusgroups.com/DMC/club_signup"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-yellow-400 px-7 py-4 text-base font-black uppercase tracking-[0.12em] text-black transition hover:bg-white"
              >
                Join DMC
              </a>
              <a
                href="/donate"
                className="inline-flex items-center justify-center border border-white/25 bg-white/10 px-7 py-4 text-base font-black uppercase tracking-[0.12em] text-white backdrop-blur transition hover:border-yellow-400 hover:text-yellow-300"
              >
                Donate
              </a>
            </div>

            <div className="mt-7 flex flex-col gap-4 border-l-4 border-yellow-400 pl-5 md:flex-row md:items-center md:gap-7">
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.28em] text-yellow-400 md:text-base">
                9th Annual DMC Mixer
              </p>
              <MixerCountdown />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-24 text-black">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1fr_1.15fr_1fr]">
          <div>
            <p className=" font-['PolySans'] mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
              Our Mission
            </p>
            <h2 className=" font-['PolySans'] text-3xl font-black leading-tight md:text-4xl">
              Developing Men of Color (DMC) empowers men of color through mentorship, academic support, professional development, leadership opportunities, and community service, fostering a strong brotherhood that helps students thrive in college and beyond.
            </h2>
          </div>

          <div className="relative h-[580px] w-full max-w-2xl">
            <div className="absolute -left-6 top-10 h-24 w-24 bg-yellow-400" />
            <div className="absolute -right-6 bottom-12 h-32 w-32 bg-yellow-400" />

            <motion.div
              className="absolute left-0 top-0 h-[360px] w-[72%] overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl"
              initial={{ opacity: 0, y: -80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <img
                src="/images/home/mission-brotherhood.jpg"
                alt="DMC members at a signature organization event"
                className="relative h-full w-full object-cover"
              />
            </motion.div>

            <motion.div
              className="absolute -bottom-10 right-0 h-[360px] w-[72%] overflow-hidden rounded-2xl bg-zinc-100 shadow-2xl"
              initial={{ opacity: 0, y: 80 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.12 }}
            >
              <img
                src="/images/home/mission-campus.jpg"
                alt="DMC members connecting with students on campus"
                className="relative h-full w-full object-cover"
              />
            </motion.div>
          </div>

          <div>
            <p className="font-['PolySans'] mb-4 text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
              Our Philosophy
            </p>
            <h2 className="font-['PolySans'] text-3xl font-black leading-tight md:text-4xl">
              DMC empowers men of color at VCU through brotherhood, mentorship, leadership, academic excellence, professional development, and community service, inspiring members to challenge stereotypes and create lasting impact on campus and beyond.
            </h2>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-32 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="font-['PolySans'] mb-6 text-xl font-bold uppercase tracking-[0.18em] text-zinc-300 md:text-2xl">
              DMC has impacted the lives of over
            </p>
            <h2 className="font-['PolySans'] text-6xl font-black uppercase leading-none text-yellow-400 md:text-9xl">
              <CountUpNumber target={900} />+ Members
            </h2>
          </div>

          <div className="mt-20 grid min-h-[55vh] items-center gap-10 lg:grid-cols-[0.9fr_0.8fr_0.9fr]">
            <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
              <img
                src="/images/home/impact-members.jpg"
                alt="DMC members gathered at the annual mixer"
                className="h-[520px] w-full object-cover"
              />
            </div>

            <div className="text-center">
              <div className="grid gap-12">
                <div>
                  <p className="font-['PolySans'] text-6xl font-black text-yellow-400 md:text-8xl">
                    400+
                  </p>
                  <p className="mt-3 font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 md:text-base">
                    Alumni
                  </p>
                </div>

                <div>
                  <p className="font-['PolySans'] text-6xl font-black text-yellow-400 md:text-8xl">
                    8
                  </p>
                  <p className="mt-3 font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-300 md:text-base">
                    Years of Excellence
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl bg-zinc-900 shadow-2xl">
              <img
                src="/images/home/impact-sports.jpg"
                alt="DMC members participating in sports and wellness"
                className="h-[520px] w-full object-cover"
              />
            </div>
          </div>

          <p className="font-['PolySans'] mt-20 text-center text-lg font-bold uppercase tracking-[0.22em] text-zinc-300 md:text-2xl">
            Companies our members have worked at
          </p>

          <div className="company-logo-marquee relative mt-12 overflow-hidden bg-white py-10 shadow-[0_30px_120px_rgba(0,0,0,0.35)]">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-white via-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-white via-white to-transparent" />

            <div className="company-logo-marquee-track flex w-max items-center gap-14">
              {[...companyLogos, ...companyLogos].map((company, index) => (
                <a
                  key={`${company.name}-${index}`}
                  href={company.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit ${company.name}`}
                  title={company.name}
                  className="group flex h-24 w-80 shrink-0 items-center justify-center text-center transition hover:-translate-y-1"
                >
                  <img
                    src={company.wordmarkLogo}
                    alt={`${company.name} logo`}
                    className="max-h-16 max-w-72 object-contain opacity-80 transition duration-300 group-hover:scale-105 group-hover:opacity-100"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-24">
            <div className="mx-auto max-w-3xl text-center">
              <h3 className="font-['PolySans'] mt-4 text-4xl font-black uppercase leading-none text-white md:text-6xl">
                Our Student Successes
              </h3>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {memberSpotlights.map((member, index) => (
                <motion.article
                  key={`${member.name}-${member.company}-${index}`}
                  className="text-center transition hover:-translate-y-2"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                >
                  <div className="mx-auto h-40 w-40 overflow-hidden rounded-full border-2 border-yellow-400 bg-zinc-900 md:h-52 md:w-52">
                    <img
                      src={member.photo}
                      alt={`${member.name} profile photo`}
                      className="h-full w-full object-cover grayscale"
                    />
                  </div>

                  <div className="mt-6">
                    <p className="font-['PolySans'] text-2xl font-black text-white md:text-3xl">
                      {member.name}
                    </p>
                    <p className="font-['PolySans'] mt-3 text-base font-bold uppercase tracking-[0.14em] text-yellow-400">
                      {member.title}
                    </p>
                    <p className="font-['PolySans'] mt-2 text-base text-zinc-400">
                      {member.company}
                    </p>
                  </div>

                  <p className="font-['PolySans'] mx-auto mt-6 max-w-sm text-lg leading-8 text-zinc-300">
                    {member.excerpt}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
                Programs
              </p>
              <h2 className="font-['PolySans'] mt-4 max-w-3xl text-5xl font-black uppercase leading-none md:text-7xl">
                Built for growth in every direction.
              </h2>
            </div>

            <p className="font-['PolySans'] max-w-2xl text-xl leading-8 text-zinc-700">
              DMC gives members multiple ways to develop: professionally,
              academically, socially, physically, and as campus leaders. Each
              pathway is designed to help students find their people and build
              real momentum.
            </p>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden border border-zinc-200 bg-zinc-200 md:grid-cols-2">
            {programPreviews.map((program, index) => (
              <motion.article
                key={program.title}
                className="group relative overflow-hidden bg-white p-8 transition hover:bg-black md:p-10"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                {program.image ? (
                  <>
                    <img
                      src={program.image}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-black/65 transition group-hover:bg-black/55" />
                  </>
                ) : null}

                <p className="font-['PolySans'] relative text-sm font-black uppercase tracking-[0.2em] text-yellow-600 group-hover:text-yellow-400">
                  0{index + 1}
                </p>
                <h3
                  className={`font-['PolySans'] relative mt-6 text-3xl font-black uppercase leading-tight md:text-4xl ${
                    program.image
                      ? "text-white"
                      : "text-black group-hover:text-white"
                  }`}
                >
                  {program.title}
                </h3>
                <p
                  className={`font-['PolySans'] relative mt-5 text-lg leading-8 ${
                    program.image
                      ? "text-zinc-200"
                      : "text-zinc-600 group-hover:text-zinc-300"
                  }`}
                >
                  {program.description}
                </p>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="/programs"
              className="font-['PolySans'] inline-flex items-center justify-center bg-black px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-white transition hover:bg-yellow-400 hover:text-black"
            >
              Explore Programs
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-28 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              Calendar
            </p>
            <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              Know what is coming next.
            </h2>
            <p className="font-['PolySans'] mt-6 max-w-xl text-xl leading-8 text-zinc-300">
              From general body meetings to workshops, mixers, service events,
              and sports, the calendar keeps members connected to the full DMC
              experience.
            </p>
            <a
              href="/programs#upcoming-events"
              className="font-['PolySans'] mt-8 inline-flex items-center justify-center bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              View Calendar
            </a>
          </div>

          <div className="border border-white/10 bg-white/[0.03] p-4 md:p-6">
            <div className="grid grid-cols-7 border-b border-white/10 pb-4 text-center font-['PolySans'] text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">
              <span>Sun</span>
              <span>Mon</span>
              <span>Tue</span>
              <span>Wed</span>
              <span>Thu</span>
              <span>Fri</span>
              <span>Sat</span>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-px bg-white/10">
              {Array.from({ length: 35 }).map((_, index) => {
                const day = index + 1;
                const isEventDay = day === 8 || day === 15 || day === 24;

                return (
                  <div
                    key={day}
                    className="min-h-20 bg-[#050505] p-2 md:min-h-24"
                  >
                    <p className="font-['PolySans'] text-sm font-bold text-zinc-400">
                      {day}
                    </p>
                    {isEventDay ? (
                      <div className="mt-3 h-2 w-full bg-yellow-400" />
                    ) : null}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 grid gap-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.title}
                  className="grid gap-3 border-t border-white/10 pt-4 md:grid-cols-[7rem_1fr]"
                >
                  <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.16em] text-yellow-400">
                    {event.date}
                  </p>
                  <div>
                    <p className="font-['PolySans'] text-xl font-black text-white">
                      {event.title}
                    </p>
                    <p className="font-['PolySans'] mt-1 text-sm uppercase tracking-[0.14em] text-zinc-500">
                      {event.type}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
                Sunday Spotlight
              </p>
              <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
                {sundaySpotlight.name}
              </h2>
              <p className="font-['PolySans'] mt-5 text-xl font-black uppercase tracking-[0.12em] text-yellow-700">
                {sundaySpotlight.highlight}
              </p>
            </div>

            <p className="font-['PolySans'] max-w-2xl text-xl leading-8 text-zinc-700">
              {sundaySpotlight.reason}
            </p>
          </div>

          <motion.article
            className="mt-16 grid gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:items-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
          >
            <div className="overflow-hidden bg-black p-4 shadow-[0_30px_90px_rgba(0,0,0,0.18)]">
              <img
                src={sundaySpotlight.flyer}
                alt={`${sundaySpotlight.name} Sunday Spotlight flyer`}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>

            <div className="border-l-4 border-yellow-500 pl-8">
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.2em] text-zinc-500">
                Quote
              </p>
              <blockquote className="font-['PolySans'] mt-5 text-2xl font-light italic leading-tight text-black md:text-4xl">
                “{sundaySpotlight.quote}”
              </blockquote>
              <p className="font-['PolySans'] mt-8 whitespace-nowrap text-sm font-black uppercase tracking-[0.18em] text-yellow-700">
                - {sundaySpotlight.name}
              </p>
            </div>
          </motion.article>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-28 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              Stay Connected
            </p>
            <h2 className="font-['PolySans'] mt-4 max-w-5xl text-6xl font-black uppercase leading-none md:text-8xl">
              Ready to connect with DMC?
            </h2>
            <p className="font-['PolySans'] mt-8 max-w-2xl text-xl leading-8 text-zinc-300">
              Whether you are a student, alumni, campus partner, donor, or VCU
              employee, we want to help you find the right next step with
              Developing Men of Color.
            </p>

            <a
              href="https://vcu.campusgroups.com/DMC/club_signup"
              target="_blank"
              rel="noopener noreferrer"
              className="font-['PolySans'] mt-10 inline-flex items-center justify-center bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              Join DMC
            </a>
          </div>

          <div className="border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <form className="grid gap-5">
              <div className="grid gap-5 md:grid-cols-2">
                <label className="font-['PolySans'] block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                    First Name
                  </span>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                  />
                </label>

                <label className="font-['PolySans'] block">
                  <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                    Last Name
                  </span>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                  />
                </label>
              </div>

              <label className="font-['PolySans'] block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                  Email
                </span>
                <input
                  type="email"
                  name="email"
                  placeholder="your.email@example.com"
                  className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </label>

              <label className="font-['PolySans'] block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                  Subject
                </span>
                <input
                  type="text"
                  name="subject"
                  placeholder="What is this about?"
                  className="mt-3 w-full border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </label>

              <label className="font-['PolySans'] block">
                <span className="text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                  Message
                </span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="Tell us how we can help."
                  className="mt-3 w-full resize-none border border-white/10 bg-black px-4 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-400"
                />
              </label>

              <button
                type="submit"
                className="font-['PolySans'] inline-flex w-full items-center justify-center bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
