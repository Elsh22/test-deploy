"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Bebas_Neue, Lora, PT_Serif_Caption } from "next/font/google";
import { useEffect, useState } from "react";

const ptSerifCaption = PT_Serif_Caption({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const mixerCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=Developing%20Men%20of%20Color%209th%20Annual%20Mixer" +
  "&dates=20260913T160000/20260913T200000" +
  "&ctz=America%2FNew_York" +
  "&location=VCU%20Campus" +
  "&details=Join%20us%20for%20the%209th%20Annual%20DMC%20Mixer%20on%20September%2013th%2C%202026%20from%204-8pm.%20Connect%20with%20the%20brotherhood%2C%20meet%20campus%20leaders%2C%20and%20build%20your%20network%20with%20other%20men%20of%20color.";

const companyLogos = [
  {
    name: "NewMarket Corporation",
    wordmarkLogo: "/images/company-logos/newmarket-wordmark.png",
    href: "https://www.linkedin.com/company/newmarket-corporation",
  },
  {
    name: "IBM",
    wordmarkLogo: "/images/company-logos/ibm-wordmark.png",
    href: "https://www.linkedin.com/company/ibm",
  },
  {
    name: "Lockheed Martin",
    wordmarkLogo: "/images/company-logos/lockheed-martin-wordmark.png",
    href: "https://www.linkedin.com/company/lockheed-martin",
  },
  {
    name: "Estes Express Lines",
    wordmarkLogo: "/images/company-logos/estes-wordmark.png",
    href: "https://www.linkedin.com/company/estes-express-lines",
  },
  {
    name: "Federal Reserve Bank of Richmond",
    wordmarkLogo: "/images/company-logos/federal-reserve-richmond-wordmark.png",
    href: "https://www.linkedin.com/company/federal-reserve-bank-of-richmond",
  },
  {
    name: "Virginia Credit Union",
    wordmarkLogo: "/images/company-logos/virginia-credit-union-wordmark.png",
    href: "https://www.linkedin.com/company/virginia-credit-union",
  },
  {
    name: "Google",
    wordmarkLogo: "/images/company-logos/google-wordmark.png",
    href: "https://www.linkedin.com/company/google",
  },
  {
    name: "Microsoft",
    wordmarkLogo: "/images/company-logos/microsoft-wordmark.png",
    href: "https://www.linkedin.com/company/microsoft",
  },
  {
    name: "Virginia Commonwealth University",
    wordmarkLogo: "/images/company-logos/vcu-wordmark.png",
    href: "https://www.linkedin.com/school/virginia-commonwealth-university/",
  },
  {
    name: "Deloitte",
    wordmarkLogo: "/images/company-logos/deloitte-wordmark.png",
    href: "https://www.linkedin.com/company/deloitte",
  },
  {
    name: "Leidos",
    wordmarkLogo: "/images/company-logos/leidos-wordmark.png",
    href: "https://www.linkedin.com/company/leidos",
  },
  {
    name: "SHPEP",
    wordmarkLogo: "/images/company-logos/shpep-wordmark.png",
    href: "https://www.linkedin.com/company/shpepuw",
  },
  {
    name: "Dell Technologies",
    wordmarkLogo: "/images/company-logos/dell-technologies-wordmark.png",
    href: "https://www.linkedin.com/company/delltechnologies",
  },
  {
    name: "CGI Inc.",
    wordmarkLogo: "/images/company-logos/cgi-wordmark.png",
    href: "https://www.linkedin.com/company/cgi",
  },
  {
    name: "Serco",
    wordmarkLogo: "/images/company-logos/serco-wordmark.png",
    href: "https://www.linkedin.com/company/serco",
  },
  {
    name: "WSP Global",
    wordmarkLogo: "/images/company-logos/wsp-global-wordmark.png",
    href: "https://www.linkedin.com/company/wsp",
  },
  {
    name: "PepsiCo",
    wordmarkLogo: "/images/company-logos/pepsico-wordmark.png",
    href: "https://www.linkedin.com/company/pepsico",
  },
  {
    name: "Virginia State Police",
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
];

const programPreviews = [
  {
    title: "Professional Academy",
    description:
      "Build your resume. Sharpen interviews. Grow your network.",
    image: "/images/home/program-academy.jpg",
  },
  {
    title: "Mentorship",
    description:
      "Find guidance. Build brotherhood. Move with support.",
    image: "/images/home/program-mentorship.jpg",
  },
  {
    title: "Sports & Wellness",
    description:
      "Stay active. Compete together. Protect your balance.",
    image: "/images/home/program-sports.jpg",
  },
  {
    title: "Committees",
    description:
      "Lead projects. Serve campus. Build real experience.",
    image: "/images/home/program-committees.png",
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

export default function HomePage() {
  const [showPopup, setShowPopup] = useState(true);

  return (
    <main className="bg-[#050505] text-white">
      <AnimatePresence>
        {showPopup ? (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
          <motion.div
            className="relative w-full max-w-lg border border-yellow-400/60 bg-black p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, scale: 0.72, y: 34 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 18 }}
            transition={{ type: "spring", stiffness: 360, damping: 24 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="homepage-popup-title"
          >
            <button
              type="button"
              aria-label="Close mixer popup"
              onClick={() => setShowPopup(false)}
              className="absolute right-3 top-3 grid h-10 w-10 place-items-center text-2xl leading-none text-white transition hover:text-yellow-400"
            >
              x
            </button>
            <p
              id="homepage-popup-title"
              className={`${ptSerifCaption.className} text-4xl font-normal italic leading-tight text-yellow-400`}
            >
              Developing Men of Color Mixer
            </p>
            <p className={`${lora.className} mt-4 text-base leading-7 text-zinc-200`}>
              Join us for the 9th Annual DMC Mixer on September 13th, 2026 from 4-8pm. Connect with the brotherhood, meet campus leaders, and build your network with other men of color.
            </p>
            <img
              src="/images/event-posters/dmc-mixer-save-the-date-2026.jpg"
              alt="9th Annual DMC Mixer save the date flyer"
              className="mt-5 max-h-[460px] w-full object-contain"
            />
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={mixerCalendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${lora.className} inline-flex items-center justify-center bg-yellow-400 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:bg-white`}
              >
                Save the Date
              </a>
            </div>
          </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <section className="relative min-h-screen overflow-hidden bg-black">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        >
          <source src="/hero-mixer.webm" type="video/webm" />
        </video>

        <div className="absolute inset-0 bg-black/60" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#050505] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-24">
          <div>
            <motion.div
              className="max-w-6xl"
              initial={{ opacity: 0, x: -120 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            >
              <h1 className={`${ptSerifCaption.className} max-w-5xl text-6xl font-normal italic leading-[0.95] text-yellow-400 drop-shadow-[0_8px_22px_rgba(0,0,0,0.75)] md:text-8xl`}>
                Developing Excellence is our Standard.
              </h1>
            </motion.div>
          </div>

          <motion.a
            href="https://vcu.campusgroups.com/DMC/club_signup"
            target="_blank"
            rel="noopener noreferrer"
            className={`${lora.className} absolute left-[60%] top-[53%] inline-flex items-center justify-center bg-yellow-400 px-16 py-4 text-base font-black uppercase tracking-[0.12em] text-black shadow-[0_8px_22px_rgba(0,0,0,0.45)] transition hover:bg-white max-md:left-6 max-md:top-[68%]`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, delay: 0.75, ease: "easeOut" }}
          >
            Join DMC
          </motion.a>
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-black">
        <div className="mx-auto grid max-w-7xl justify-items-center gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative h-[380px] w-full max-w-[640px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.16)] md:h-[600px] md:max-w-[700px]">
            <img
              src="/images/home/mission-brotherhood.jpg"
              alt="DMC members at a signature organization event"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center md:px-12">
              <h2
                className={`${bebasNeue.className} text-7xl leading-none text-yellow-400 md:text-9xl`}
              >
                Mission
              </h2>
              <p
                className={`${lora.className} mt-6 max-w-xl text-sm font-medium uppercase leading-7 tracking-[0.14em] text-white md:text-base md:leading-8`}
              >
                Developing Men of Color (DMC) empowers men of color through
                mentorship, academic support, professional development,
                leadership opportunities, and community service, fostering a
                strong brotherhood that helps students thrive in college and
                beyond.
              </p>
            </div>
          </div>
          <div className="relative h-[380px] w-full max-w-[640px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.16)] md:h-[600px] md:max-w-[700px]">
            <img
              src="/images/home/mission-campus.jpg"
              alt="DMC members connecting with students on campus"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center md:px-12">
              <h2
                className={`${bebasNeue.className} text-7xl leading-none text-yellow-400 md:text-9xl`}
              >
                Philosophy
              </h2>
              <p
                className={`${lora.className} mt-6 max-w-xl text-sm font-medium uppercase leading-7 tracking-[0.14em] text-white md:text-base md:leading-8`}
              >
                DMC empowers men of color at VCU through brotherhood,
                mentorship, leadership, academic excellence, professional
                development, and community service, inspiring members to
                challenge stereotypes and create lasting impact on campus and
                beyond.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-32 text-white">
        <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-3">
          <div>
            <h2
              className={`${bebasNeue.className} text-center text-[7rem] leading-none text-yellow-400 md:text-[11rem] lg:text-[13rem] xl:text-[15rem]`}
            >
              1000+
            </h2>
            <p
              className={`${bebasNeue.className} mt-3 text-center text-4xl leading-none text-zinc-300 md:text-6xl lg:text-7xl`}
            >
              Members
            </p>
          </div>
          <div>
            <h2
              className={`${bebasNeue.className} text-center text-[7rem] leading-none text-yellow-400 md:text-[11rem] lg:text-[13rem] xl:text-[15rem]`}
            >
              500+
            </h2>
            <p
              className={`${bebasNeue.className} mt-3 text-center text-4xl leading-none text-zinc-300 md:text-6xl lg:text-7xl`}
            >
              Alumni
            </p>
          </div>
          <div>
            <h2
              className={`${bebasNeue.className} text-center text-[7rem] leading-none text-yellow-400 md:text-[11rem] lg:text-[13rem] xl:text-[15rem]`}
            >
              8
            </h2>
            <p
              className={`${bebasNeue.className} mt-3 text-center text-4xl leading-none text-zinc-300 md:text-6xl lg:text-7xl`}
            >
              Years of Excellence
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 grid max-w-7xl gap-10 lg:grid-cols-[420px_1fr] lg:items-center lg:gap-16">
          <motion.div
            className="relative h-[460px] w-full max-w-[420px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:h-[620px]"
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <img
              src="/images/home/dmc-member-suit.jpg"
              alt="DMC member in a suit"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          >
            <h3 className={`${bebasNeue.className} text-5xl leading-none text-yellow-400 md:text-7xl lg:text-8xl`}>
              Kaleb Brown
            </h3>
            <p className={`${lora.className} mt-3 text-xl font-bold text-zinc-300 md:text-2xl`}>
              Cybersecurity Intern at Estes Express Lines
            </p>
            <blockquote className={`${lora.className} mt-8 border-l-4 border-yellow-400 pl-6 text-xl leading-9 text-zinc-200 md:text-2xl md:leading-10`}>
              “I’m grateful for everyone at Estes who took the time to teach
              me, answer my questions, and help me grow throughout the summer.
              I’m leaving this experience with new skills, great connections,
              and a better understanding of where I want to take my career.”
            </blockquote>
          </motion.div>
        </div>

        <div className="mx-auto mt-20 grid max-w-7xl gap-10 lg:grid-cols-[1fr_420px] lg:items-center lg:gap-16">
          <motion.div
            className="max-w-3xl"
            initial={{ opacity: 0, x: -90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
          >
            <h3 className={`${bebasNeue.className} text-5xl leading-none text-yellow-400 md:text-7xl lg:text-8xl`}>
              Clyde Clark III
            </h3>
            <p className={`${lora.className} mt-3 text-xl font-bold text-zinc-300 md:text-2xl`}>
              Intern at Two Capitols Consulting
            </p>
            <blockquote className={`${lora.className} mt-8 border-l-4 border-yellow-400 pl-6 text-xl leading-9 text-zinc-200 md:text-2xl md:leading-10`}>
              &quot;Through my work, I&apos;ve been able to contribute to
              fundraising efforts, donor relations, campaign operations, and
              strategic initiatives while strengthening my research, analytical,
              communication, and relationship-building skills. Most
              importantly, working directly with senior leadership has taught me
              how to evaluate information, manage competing priorities, and
              make decisions with real financial and organizational
              impact.&quot;
            </blockquote>
          </motion.div>
          <motion.div
            className="relative h-[460px] w-full max-w-[420px] overflow-hidden rounded-[2rem] shadow-[0_28px_90px_rgba(0,0,0,0.45)] md:h-[620px]"
            initial={{ opacity: 0, x: 90 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.75, ease: "easeOut", delay: 0.08 }}
          >
            <img
              src="/images/home/clyde-clark-iii.jpg"
              alt="Clyde Clark III"
              className="h-full w-full object-cover object-center"
            />
          </motion.div>
        </div>
      </section>

      <section className="bg-white px-6 py-28 text-black">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className={`${bebasNeue.className} text-7xl leading-none text-yellow-600 md:text-9xl`}>
              Programs
            </h2>
            <p className={`${lora.className} mx-auto mt-6 max-w-2xl text-xl leading-8 text-zinc-700`}>
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

                <h3
                  className={`${bebasNeue.className} relative text-5xl leading-none text-yellow-400 md:text-6xl ${
                    program.image
                      ? ""
                      : "group-hover:text-yellow-400"
                  }`}
                >
                  {program.title}
                </h3>
                <p
                  className={`${lora.className} relative mt-5 text-lg leading-8 ${
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
              className={`${bebasNeue.className} inline-flex items-center justify-center bg-black px-8 py-4 text-2xl leading-none text-white transition hover:bg-yellow-400 hover:text-black`}
            >
              Explore Programs
            </a>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] px-6 py-28 text-white">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className={`${bebasNeue.className} text-6xl leading-none text-yellow-400 md:text-8xl`}>
              DMC Events
            </h2>
            <p className={`${lora.className} mt-6 max-w-xl text-xl leading-8 text-zinc-300`}>
              Stay connected with DMC mixers, workshops, service days, sports,
              and general body meetings throughout the year.
            </p>
            <a
              href="/programs#upcoming-events"
              className="font-['PolySans'] mt-8 inline-flex items-center justify-center bg-yellow-400 px-8 py-4 text-sm font-black uppercase tracking-[0.16em] text-black transition hover:bg-white"
            >
              View Calendar
            </a>
          </div>

          <div className="mx-auto w-full max-w-xl overflow-hidden bg-black shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
            <img
              src="/images/event-posters/dmc-mixer-save-the-date-2026.jpg"
              alt="9th Annual DMC Mixer flyer"
              className="h-full w-full object-contain"
            />
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
