
"use client";

import { type FormEvent, useState } from "react";
import {
  CalendarPlus,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  X,
} from "lucide-react";

const professionalAcademyGroups = [
  {
    group: "Health Track",
    description: "Support for health-care, pre-health, and care-centered career guidance.",
    links: [
      {
        title: "Xavier",
        href: "https://calendly.com/lewisxm-vcu/new-meeting?month=2025-09",
      },
    ],
  },
  {
    group: "Tech & Engineering",
    description: "Career research, technical direction, and preparation for technical pathways.",
    links: [
      {
        title: "Hussein",
        href: "https://calendly.com/elshowayah2-vcu/career-research",
      },
      {
        title: "Thurman",
        href: "https://calendly.com/smithjrte-vcu/30min?month=2025-09",
      },
      {
        title: "Naod",
        href: "https://calendly.com/danielnt-vcu/30min",
      },
    ],
  },
  {
    group: "Business Students",
    description: "LinkedIn, resume, interview, and business-career preparation.",
    links: [
      {
        title: "Hassan",
        href: "https://calendly.com/elshowayah-vcu/lindkln-review",
      },
      {
        title: "Kaleb",
        href: "https://calendly.com/brownkj7-vcu/30min",
      },
      {
        title: "Sameer",
        href: "http://calendly.com/dwivedysk2-vcu/30min",
      },
    ],
  },
  {
    group: "Headshots",
    description: "Professional photos for LinkedIn, resumes, portfolios, and applications.",
    links: [
      {
        title: "Jason",
        href: "https://calendly.com/gallardogoj-vcu/30min",
      },
    ],
  },
  {
    group: "Feedback",
    description: "Help improve the Professional Academy experience for future members.",
    links: [
      {
        title: "Feedback Form",
        href: "https://docs.google.com/forms/d/e/1FAIpQLScEX4LpYlbbXUhmAqVvxy0SBDk_9m5pcrAdH7XgJxK4rwMl2A/viewform?usp=dialog",
      },
    ],
  },
];

const committees = [
  {
    title: "Information Technology",
    description:
      "Builds and maintains DMC's digital presence while exploring software engineering, web development, automation, and technical leadership.",
    groupMe: "https://web.groupme.com/join_group/96138862/KuAOiW33",
  },
  {
    title: "Health",
    description:
      "Promotes wellness, healthy habits, balance, and conversations that help men of color care for themselves and each other.",
    groupMe: "https://groupme.com/join_group/89916463/uBQYKr0c",
  },
  {
    title: "Social",
    description:
      "Creates spaces for brotherhood, connection, campus engagement, and member bonding through intentional social experiences.",
    groupMe: "https://groupme.com/join_group/89916344/ZkE6p97c",
  },
  {
    title: "Community Service",
    description:
      "Leads service opportunities that allow members to give back to Richmond, VCU, and communities connected to DMC.",
    groupMe: "https://groupme.com/join_group/89916463/uBQYKr0c",
  },
  {
    title: "Academic",
    description:
      "Supports study habits, academic accountability, tutoring connections, and resources that help members succeed in the classroom.",
    groupMe: "https://groupme.com/join_group/90176811/E5gNlYKq",
  },
  {
    title: "Professional Development",
    description:
      "Creates career-focused events, workshops, speaker sessions, and networking opportunities for members across majors.",
    groupMe: "https://web.groupme.com/join_group/89916400/H3d6zVwp",
  },
];

const calendarEvents = [
  {
    title: "DMC 8th Annual Mixer",
    start: "2025-09-07T16:00:00",
    end: "2025-09-07T19:00:00",
  },
  {
    title: "1st DMC General Body Meeting",
    start: "2025-09-24T19:00:00",
    end: "2025-09-24T21:00:00",
  },
  {
    title: "Internship Workshop",
    start: "2025-09-30T18:00:00",
    end: "2025-09-30T20:30:00",
  },
  {
    title: "LinkedIn Workshop",
    start: "2025-10-09T18:00:00",
    end: "2025-10-09T20:00:00",
  },
  {
    title: "2nd DMC General Body Meeting",
    start: "2025-10-15T19:00:00",
    end: "2025-10-15T21:00:00",
  },
  {
    title: "Jacob's Chance Kickball Match",
    start: "2025-10-26T14:30:00",
    end: "2025-10-26T16:30:00",
  },
  {
    title: "DMC Basketball Tournament",
    start: "2025-11-08T19:00:00",
    end: "2025-11-08T21:00:00",
  },
  {
    title: "3rd DMC General Body Meeting",
    start: "2025-11-19T19:00:00",
    end: "2025-11-19T21:00:00",
  },
  {
    title: "1st Spring DMC General Body Meeting",
    start: "2026-02-11T19:00:00",
    end: "2026-02-11T21:00:00",
  },
  {
    title: "VCU DMC ODU Summit",
    start: "2026-02-19T00:00:00",
    end: "2026-02-21T23:59:00",
  },
  {
    title: "DMC CGI Event",
    start: "2026-02-24T18:00:00",
    end: "2026-02-24T21:00:00",
  },
  {
    title: "Get Fitted",
    start: "2026-02-28T09:00:00",
    end: "2026-02-28T17:00:00",
  },
  {
    title: "IT Workshop",
    start: "2026-03-17T19:00:00",
    end: "2026-03-17T21:00:00",
  },
  {
    title: "DMC Health Event",
    start: "2026-03-22T16:00:00",
    end: "2026-03-22T17:00:00",
  },
  {
    title: "2nd Spring DMC General Body Meeting",
    start: "2026-03-25T19:00:00",
    end: "2026-03-25T21:00:00",
  },
  {
    title: "Suit Day",
    start: "2026-04-03T17:00:00",
    end: "2026-04-03T20:00:00",
  },
  {
    title: "3rd Spring DMC General Body Meeting",
    start: "2026-04-15T19:00:00",
    end: "2026-04-15T21:00:00",
  },
  {
    title: "Jacob's Chance Kickball Event",
    start: "2026-04-19T14:30:00",
    end: "2026-04-19T16:30:00",
  },
  {
    title: "College Day",
    start: "2026-04-21T09:00:00",
    end: "2026-04-21T22:00:00",
  },
];

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const calendarStartMonth = new Date(2025, 7, 1);
const calendarEndMonth = new Date(2027, 4, 1);

type ParsedCalendarEvent = (typeof calendarEvents)[number] & {
  date: Date;
  endDate: Date;
  day: string;
  dateLabel: string;
  time: string;
  timeRange: string;
  location: string;
  category: string;
  pill: string;
  card: string;
  accent: string;
  badge: string;
};

type CalendarDay = {
  day: number;
  isCurrentMonth: boolean;
  date: Date | null;
};

type CalendarView = "month" | "week" | "day";

const monthValue = (date: Date) => date.getFullYear() * 12 + date.getMonth();
const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1);
const addMonths = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth() + amount, 1);
const addDays = (date: Date, amount: number) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + amount);

const isSameCalendarDay = (firstDate: Date | null, secondDate: Date | null) =>
  Boolean(
    firstDate &&
      secondDate &&
      firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() === secondDate.getDate()
  );

const getInitialCalendarDate = () => {
  const today = new Date();

  if (
    monthValue(today) >= monthValue(calendarStartMonth) &&
    monthValue(today) <= monthValue(calendarEndMonth)
  ) {
    return today;
  }

  return calendarStartMonth;
};

const formatMonthTitle = (date: Date) =>
  new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric" }).format(date);

const formatDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(date);

const formatGoogleCalendarDate = (date: Date) =>
  date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");

const createGoogleCalendarLink = (event: ParsedCalendarEvent) => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatGoogleCalendarDate(event.date)}/${formatGoogleCalendarDate(event.endDate)}`,
    details:
      "Developing Men of Color at VCU event. Check DMC channels for final room details and updates.",
    location: event.location,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

const getEventPoster = (event: ParsedCalendarEvent) => {
  if (event.title.includes("College Day")) {
    return "/images/event-posters/college-day-2026.jpg";
  }

  if (event.title.includes("Jacob's Chance") || event.title.includes("Kickball")) {
    return "/images/event-posters/jacobs-chance-kickball-2026.jpg";
  }

  if (event.title.includes("General Body") || event.title.includes("GBM")) {
    return "/images/event-posters/gbm-april-15-2026.jpg";
  }

  return "/images/home/program-fallback.jpg";
};

const getEventMeta = (title: string) => {
  if (title.includes("General Body") || title.includes("GBM")) {
    return {
      category: "Meeting",
      pill: "bg-violet-500 text-white",
      card: "border-violet-400/35 bg-black",
      accent: "bg-violet-400",
      badge: "bg-violet-400 text-black",
    };
  }

  if (title.includes("Basketball") || title.includes("Kickball")) {
    return {
      category: "Sports",
      pill: "bg-orange-400 text-black",
      card: "border-orange-300/35 bg-black",
      accent: "bg-orange-300",
      badge: "bg-orange-300 text-black",
    };
  }

  if (title.includes("Workshop") || title.includes("Mixer") || title.includes("Suit") || title.includes("Fitted") || title.includes("Summit")) {
    return {
      category: "Professional",
      pill: "bg-yellow-400 text-black",
      card: "border-yellow-300/40 bg-black",
      accent: "bg-yellow-300",
      badge: "bg-yellow-300 text-black",
    };
  }

  if (title.includes("Health") || title.includes("Chance") || title.includes("College")) {
    return {
      category: "Service",
      pill: "bg-rose-500 text-white",
      card: "border-rose-400/35 bg-black",
      accent: "bg-rose-400",
      badge: "bg-rose-400 text-black",
    };
  }

  return {
    category: "Program",
    pill: "bg-emerald-500 text-white",
    card: "border-emerald-400/35 bg-black",
    accent: "bg-emerald-400",
    badge: "bg-emerald-400 text-black",
  };
};

const parsedCalendarEvents: ParsedCalendarEvent[] = calendarEvents
  .map((event) => {
    const date = new Date(event.start);
    const endDate = new Date(event.end);

    return {
      ...event,
      date,
      endDate,
      day: String(date.getDate()).padStart(2, "0"),
      dateLabel: formatDate(date),
      time: formatTime(date),
      timeRange: `${formatTime(date)} - ${formatTime(endDate)}`,
      location: event.title.match(/\(([^)]+)\)/)?.[1] ?? "VCU",
      ...getEventMeta(event.title),
    };
  })
  .sort((a, b) => a.date.getTime() - b.date.getTime());

const createCalendarDays = (monthDate: Date): CalendarDay[] => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const previousMonthDays = new Date(year, month, 0).getDate();
  const mondayStartOffset = (firstDay.getDay() + 6) % 7;
  const totalCells = Math.ceil((mondayStartOffset + daysInMonth) / 7) * 7;

  return Array.from({ length: totalCells }, (_, index) => {
    const dayNumber = index - mondayStartOffset + 1;
    const isCurrentMonth = dayNumber >= 1 && dayNumber <= daysInMonth;
    const displayDay = isCurrentMonth
      ? dayNumber
      : dayNumber < 1
        ? previousMonthDays + dayNumber
        : dayNumber - daysInMonth;

    return {
      day: displayDay,
      isCurrentMonth,
      date: isCurrentMonth ? new Date(year, month, dayNumber) : null,
    };
  });
};

const startOfWeek = (date: Date) => {
  const mondayOffset = (date.getDay() + 6) % 7;
  return addDays(date, -mondayOffset);
};

const mentorshipSteps = [
  {
    step: "01",
    title: "Express Interest",
    text: "Notify any E-Board member or committee chair that you are interested in becoming a mentor. A Google Form is usually sent out near the beginning of the semester.",
  },
  {
    step: "02",
    title: "Attend Orientation",
    text: "Attend an orientation session for potential mentors. The session covers the mentoring program, its goals, and expectations for mentors. Details are shared by email, GroupMe, and at GBMs.",
  },
  {
    step: "03",
    title: "Submit Application & Background Check",
    text: "Complete the mentorship application and background check process provided through CIS.",
  },
];

const wellnessSteps = [
  {
    step: "01",
    title: "Purchase Intramural Pass",
    text: "Purchase the intramural semester pass through the VCU RecWell website.",
  },
  {
    step: "02",
    title: "Fill Out Interest Form",
    text: "Complete the interest form for the sport you want to participate in.",
  },
  {
    step: "03",
    title: "Sign Sports Contract",
    text: "Sign the contract agreeing to DMC and intramural sports policies.",
  },
];

export default function ProgramsPage() {
  const [calendarView, setCalendarView] = useState<CalendarView>("month");
  const [calendarMonth, setCalendarMonth] = useState(() =>
    startOfMonth(getInitialCalendarDate())
  );
  const [focusedDate, setFocusedDate] = useState(() => getInitialCalendarDate());
  const [rsvpEvent, setRsvpEvent] = useState<ParsedCalendarEvent | null>(null);
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);
  const [rsvpForm, setRsvpForm] = useState({
    name: "",
    email: "",
    notes: "",
  });
  const today = getInitialCalendarDate();
  const featuredEvents = parsedCalendarEvents.slice(-3).reverse();
  const calendarDays = createCalendarDays(calendarMonth);
  const visibleWeek = Array.from({ length: 7 }, (_, index) =>
    addDays(startOfWeek(focusedDate), index)
  );
  const canGoPrevious =
    calendarView === "month"
      ? monthValue(calendarMonth) > monthValue(calendarStartMonth)
      : focusedDate > calendarStartMonth;
  const canGoNext =
    calendarView === "month"
      ? monthValue(calendarMonth) < monthValue(calendarEndMonth)
      : focusedDate < new Date(2027, 4, 31);

  const changeCalendarPeriod = (amount: number) => {
    if (calendarView === "day") {
      setFocusedDate((currentDate) => addDays(currentDate, amount));
      return;
    }

    if (calendarView === "week") {
      setFocusedDate((currentDate) => addDays(currentDate, amount * 7));
      return;
    }

    setCalendarMonth((currentMonth) => {
      const nextMonth = addMonths(currentMonth, amount);
      const nextValue = monthValue(nextMonth);

      if (nextValue < monthValue(calendarStartMonth)) return currentMonth;
      if (nextValue > monthValue(calendarEndMonth)) return currentMonth;

      return nextMonth;
    });
  };

  const getEventsForDay = (date: Date | null) => {
    if (!date) return [];

    return parsedCalendarEvents.filter(
      (event) =>
        event.date.getFullYear() === date.getFullYear() &&
        event.date.getMonth() === date.getMonth() &&
        event.date.getDate() === date.getDate()
    );
  };

  const openDayView = (date: Date | null) => {
    if (!date) return;

    setFocusedDate(date);
    setCalendarView("day");
  };

  const openRsvp = (event: ParsedCalendarEvent) => {
    setRsvpEvent(event);
    setRsvpSubmitted(false);
    setRsvpForm({ name: "", email: "", notes: "" });
  };

  const closeRsvp = () => {
    setRsvpEvent(null);
    setRsvpSubmitted(false);
  };

  const handleRsvpSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!rsvpEvent) return;

    const subject = encodeURIComponent(`RSVP: ${rsvpEvent.title}`);
    const body = encodeURIComponent(
      [
        `Event: ${rsvpEvent.title}`,
        `Date: ${rsvpEvent.dateLabel}`,
        `Time: ${rsvpEvent.timeRange}`,
        "",
        `Name: ${rsvpForm.name}`,
        `Email: ${rsvpForm.email}`,
        `Notes: ${rsvpForm.notes || "None"}`,
      ].join("\n")
    );

    setRsvpSubmitted(true);
    window.location.href = `mailto:dmc.vcu@gmail.com?subject=${subject}&body=${body}`;
  };

  const viewTitle =
    calendarView === "month"
      ? formatMonthTitle(calendarMonth)
      : calendarView === "week"
        ? `${formatDate(visibleWeek[0])} - ${formatDate(visibleWeek[6])}`
        : formatDate(focusedDate);

  return (
    <main className="bg-white text-black">
      <section className="relative min-h-[88vh] overflow-hidden bg-black px-6 pb-24 pt-40 text-white">
        <img
          src="/assethighlights/darrellgettinglinkedin.jpg"
          alt="DMC member working on professional development"
          className="absolute inset-0 h-full w-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
            Programs
          </p>
          <h1 className="font-['PolySans'] mt-5 max-w-6xl text-6xl font-black uppercase leading-none md:text-8xl">
            Pathways for growth, leadership, and brotherhood.
          </h1>
          <p className="font-['PolySans'] mt-8 max-w-3xl text-xl leading-8 text-zinc-300">
            DMC programs help members grow professionally, academically,
            socially, physically, and as leaders on campus. This page gives new
            members a clear place to find where they fit.
          </p>
        </div>
      </section>

      <section
        id="professional-academy"
        className="bg-white px-6 py-28 text-black"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-4xl text-center">
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-600">
              Professional Academy
            </p>
            <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              Career readiness with real tools.
            </h2>
            <p className="font-['PolySans'] mx-auto mt-6 max-w-3xl text-xl leading-8 text-zinc-700">
              The Professional Academy empowers men of color to achieve career success through personalized peer mentoring, resume and LinkedIn reviews, professional headshots, and career guidance from students and alumni who have already navigated similar paths. By providing practical resources, professional development, and a supportive community, we help participants build the confidence, skills, and network needed to secure internships, jobs, and long-term career success.
            </p>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-2">
            {professionalAcademyGroups.slice(0, 4).map((group) => (
              <article
                key={group.group}
                className="border border-zinc-200 bg-white p-6 transition hover:border-black"
              >
                <h3 className="font-['PolySans'] text-2xl font-black uppercase leading-tight">
                  {group.group}
                </h3>
                <div className="font-['PolySans'] mt-4 flex flex-wrap gap-x-3 gap-y-2 text-base font-black uppercase tracking-[0.1em] text-yellow-600">
                  {group.links.map((link, index) => (
                    <span key={link.title}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-black"
                      >
                        {link.title}
                      </a>
                      {index < group.links.length - 1 ? (
                        <span className="ml-3 text-zinc-300">|</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-5 max-w-xl">
            {professionalAcademyGroups.slice(4).map((group) => (
              <article
                key={group.group}
                className="border border-zinc-200 bg-white p-6 text-center transition hover:border-black"
              >
                <h3 className="font-['PolySans'] text-2xl font-black uppercase leading-tight">
                  {group.group}
                </h3>
                <div className="font-['PolySans'] mt-4 flex flex-wrap justify-center gap-x-3 gap-y-2 text-base font-black uppercase tracking-[0.1em] text-yellow-600">
                  {group.links.map((link, index) => (
                    <span key={link.title}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition hover:text-black"
                      >
                        {link.title}
                      </a>
                      {index < group.links.length - 1 ? (
                        <span className="ml-3 text-zinc-300">|</span>
                      ) : null}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="committees" className="bg-[#050505] px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-5xl text-center">
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              Committees
            </p>
            <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              How our students are involved in DMC.
            </h2>

            <p className="font-['PolySans'] mx-auto mt-6 max-w-3xl text-xl leading-8 text-zinc-300">
              Committees give members practical ways to serve, lead, create,
              organize, and contribute to the direction of DMC.
            </p>
          </div>

          <div className="mt-16 grid gap-5">
            {committees.map((committee, index) => (
              <article
                key={committee.title}
                className="group relative min-h-40 overflow-hidden border border-white/10 p-8"
              >
                <img
                  src={
                    index % 2 === 0
                      ? "/assethighlights/DMCGettingCheckfromVACU.jpg"
                      : "/assethighlights/moreresourcefairsauce.jpg"
                  }
                  alt=""
                  aria-hidden="true"
                  className="absolute inset-0 h-full w-full object-cover opacity-20 grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-35"
                />
                <div className="absolute inset-0 bg-black/70" />

                <div className="relative grid gap-6 md:grid-cols-[0.8fr_1.2fr] md:items-center">
                  <h3 className="font-['PolySans'] text-3xl font-black uppercase leading-tight md:text-4xl">
                    {committee.title}
                  </h3>
                  <p className="font-['PolySans'] text-lg leading-8 text-zinc-300">
                    {committee.description}
                  </p>
                  <a
                    href={committee.groupMe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-['PolySans'] inline-flex text-sm font-black uppercase tracking-[0.16em] text-yellow-400 transition hover:text-white"
                  >
                    Join GroupMe
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="mentorship-wellness" className="grid bg-white text-white lg:grid-cols-2">
        <article className="group relative min-h-[680px] overflow-hidden px-6 py-28">
          <img
            src="/assethighlights/kidsNexttounderground.jpg"
            alt="DMC mentorship and brotherhood"
            className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/70 transition group-hover:bg-black/60" />

          <div className="relative z-10 mx-auto flex h-full max-w-2xl flex-col justify-end">
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              Mentorship
            </p>
            <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              Mentoring the next generation.
            </h2>
            <p className="font-['PolySans'] mt-6 text-xl leading-8 text-zinc-300">
              DMC members mentor underprivileged students at elementary and
              middle schools, creating positive role models, academic
              encouragement, and early exposure to leadership, college, and
              opportunity.
            </p>
            <div className="mt-10 grid gap-5">
              {mentorshipSteps.map((item) => (
                <div key={item.step} className="border-t border-white/15 pt-5">
                  <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
                    {item.step} / {item.title}
                  </p>
                  <p className="font-['PolySans'] mt-2 text-base leading-7 text-zinc-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="group relative min-h-[680px] overflow-hidden px-6 py-28">
          <img
            src="/assethighlights/dmc-sports.jpg"
            alt="DMC sports and wellness activity"
            className="absolute inset-0 h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
          />
          <div className="absolute inset-0 bg-black/70 transition group-hover:bg-black/60" />

          <div className="relative z-10 mx-auto flex h-full max-w-2xl flex-col justify-end">
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.25em] text-yellow-400">
              Wellness & Sports
            </p>
            <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
              Strong men need strong support systems.
            </h2>
            <p className="font-['PolySans'] mt-6 text-xl leading-8 text-zinc-300">
              Wellness includes sports, brotherhood, mental health,
              accountability, and spaces where members can reset and stay
              connected.
            </p>
            <div className="mt-10 grid gap-5">
              {wellnessSteps.map((item) => (
                <div key={item.step} className="border-t border-white/15 pt-5">
                  <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
                    {item.step} / {item.title}
                  </p>
                  <p className="font-['PolySans'] mt-2 text-base leading-7 text-zinc-300">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section id="upcoming-events" className="bg-[#050505] px-6 py-28 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <div className="mx-auto max-w-4xl text-center">
              <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.25em] text-yellow-400">
                Event Highlights
              </p>
              <h2 className="font-['PolySans'] mt-4 text-5xl font-black uppercase leading-none md:text-7xl">
                Recent moments from DMC.
              </h2>
              <p className="font-['PolySans'] mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-400">
                A quick look at the latest programs, service events, and
                brotherhood experiences before you explore the full calendar.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {featuredEvents.map((event) => (
                <article
                  key={`featured-${event.title}-${event.start}`}
                  className="group overflow-hidden border border-yellow-400/20 bg-black"
                >
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img
                      src={getEventPoster(event)}
                      alt={`${event.title} event poster placeholder`}
                      className="h-full w-full object-cover grayscale transition duration-500 group-hover:scale-105 group-hover:grayscale-0"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
                    <span
                      className={`absolute left-5 top-5 rounded-full px-3 py-1 font-['PolySans'] text-xs font-black uppercase tracking-[0.12em] ${event.badge}`}
                    >
                      {event.category}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-300">
                        {event.dateLabel}
                      </p>
                      <h3 className="font-['PolySans'] mt-3 text-2xl font-black uppercase leading-tight text-white">
                        {event.title}
                      </h3>
                    </div>
                  </div>

                  <div className="grid gap-4 p-5">
                    <div className="grid gap-2 font-['PolySans'] text-sm font-semibold text-zinc-300">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-yellow-300" />
                        {event.timeRange}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-yellow-300" />
                        {event.location}
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <button
                        type="button"
                        onClick={() => openRsvp(event)}
                        className="font-['PolySans'] rounded-full bg-yellow-400 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-yellow-300"
                      >
                        RSVP
                      </button>
                      <a
                        href={createGoogleCalendarLink(event)}
                        target="_blank"
                        rel="noreferrer"
                        className="font-['PolySans'] inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-3 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-yellow-300 hover:text-yellow-300"
                      >
                        <CalendarPlus className="h-3.5 w-3.5" />
                        Add to Calendar
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="overflow-hidden border border-yellow-400/20 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.55)]">
            <div className="grid lg:grid-cols-[1fr_18rem]">
              <div className="p-5 md:p-8">
                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-400">
                      Programs / Calendar
                    </p>
                    <h3 className="font-['PolySans'] mt-4 text-3xl font-light text-white md:text-5xl">
                      {viewTitle}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-3">
                    <div className="flex w-fit items-center rounded-full border border-yellow-400/20 bg-zinc-950 p-1 text-xs font-black uppercase tracking-[0.12em]">
                      {(["month", "week", "day"] as CalendarView[]).map((view) => (
                        <button
                          key={view}
                          type="button"
                          onClick={() => setCalendarView(view)}
                          className={`rounded-full px-4 py-2 transition ${
                            calendarView === view
                              ? "bg-yellow-400 text-black"
                              : "text-zinc-400 hover:bg-zinc-900 hover:text-yellow-300"
                          }`}
                        >
                          {view}
                        </button>
                      ))}
                    </div>

                    <div className="flex w-fit items-center gap-2 self-start sm:self-end">
                      <button
                        type="button"
                        onClick={() => changeCalendarPeriod(-1)}
                        disabled={!canGoPrevious}
                        aria-label="Previous calendar period"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400/20 bg-zinc-950 text-zinc-300 transition hover:bg-yellow-400 hover:text-black disabled:pointer-events-none disabled:opacity-25"
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => changeCalendarPeriod(1)}
                        disabled={!canGoNext}
                        aria-label="Next calendar period"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-yellow-400/20 bg-zinc-950 text-zinc-300 transition hover:bg-yellow-400 hover:text-black disabled:pointer-events-none disabled:opacity-25"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {calendarView === "month" ? (
                  <>
                    <div className="grid grid-cols-7 border-y border-yellow-400/20 bg-zinc-950 text-center font-['PolySans'] text-[0.58rem] font-black uppercase tracking-[0.12em] text-yellow-500/70 sm:text-xs">
                      {weekDays.map((day) => (
                        <div key={day} className="py-4">
                          {day}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-7">
                      {calendarDays.map(({ day, isCurrentMonth, date }, index) => {
                        const dayEvents = getEventsForDay(date);
                        const isToday = isSameCalendarDay(date, today);

                        return (
                          <button
                            key={`${day}-${index}`}
                            type="button"
                            onClick={() => openDayView(date)}
                            disabled={!date}
                            className="relative min-h-20 border-r border-t border-zinc-800 bg-zinc-950/80 p-2 text-left transition hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400 disabled:cursor-default disabled:hover:bg-zinc-950/80 last:border-r-0 sm:min-h-24"
                            aria-label={
                              date
                                ? `Open day view for ${formatDate(date)}`
                                : undefined
                            }
                          >
                            <span
                              className={`font-['PolySans'] inline-flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                                isToday
                                  ? "bg-yellow-400 font-black text-black"
                                  : isCurrentMonth
                                    ? "text-zinc-300"
                                    : "text-zinc-700"
                              }`}
                            >
                              {day}
                            </span>
                            <div className="mt-3 grid gap-1">
                              {dayEvents.slice(0, 2).map((event) => (
                                <div
                                  key={`${event.title}-${event.start}`}
                                  className={`truncate rounded-full px-2 py-1 text-center font-['PolySans'] text-[0.56rem] font-black uppercase tracking-[0.06em] ${event.pill}`}
                                >
                                  {event.title}
                                </div>
                              ))}
                              {dayEvents.length > 2 ? (
                                <div className="text-center font-['PolySans'] text-[0.56rem] font-semibold text-zinc-600">
                                  +{dayEvents.length - 2} more
                                </div>
                              ) : null}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : null}

                {calendarView === "week" ? (
                  <div className="grid gap-px bg-zinc-800 md:grid-cols-7">
                    {visibleWeek.map((date) => {
                      const dayEvents = getEventsForDay(date);

                      return (
                        <button
                          key={date.toISOString()}
                          type="button"
                          onClick={() => openDayView(date)}
                          className="min-h-72 bg-zinc-950 p-4 text-left transition hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-yellow-400"
                          aria-label={`Open day view for ${formatDate(date)}`}
                        >
                          <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.16em] text-yellow-500/70">
                            {weekDays[(date.getDay() + 6) % 7]}
                          </p>
                          <p className="font-['PolySans'] mt-2 text-3xl font-black text-white">
                            {date.getDate()}
                          </p>
                          <div className="mt-5 grid gap-2">
                            {dayEvents.length > 0 ? (
                              dayEvents.map((event) => (
                                <div
                                  key={`${event.title}-${event.start}`}
                                  className={`rounded-2xl px-3 py-2 font-['PolySans'] text-xs font-black uppercase leading-tight ${event.pill}`}
                                >
                                  {event.title}
                                </div>
                              ))
                            ) : (
                              <p className="font-['PolySans'] text-sm text-zinc-600">
                                No events
                              </p>
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                ) : null}

                {calendarView === "day" ? (
                  <div className="border-t border-yellow-400/20 pt-6">
                    <div className="mb-6">
                      <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.18em] text-yellow-400">
                        Daily Agenda
                      </p>
                    </div>

                    <div className="grid gap-4">
                      {getEventsForDay(focusedDate).length > 0 ? (
                        getEventsForDay(focusedDate).map((event) => (
                          <article
                            key={`${event.title}-${event.start}`}
                            className={`relative overflow-hidden rounded-2xl border p-6 ${event.card}`}
                          >
                            <div className={`absolute inset-y-0 left-0 w-1.5 ${event.accent}`} />
                            <span
                              className={`inline-flex rounded-full px-3 py-1 font-['PolySans'] text-xs font-black uppercase tracking-[0.12em] ${event.badge}`}
                            >
                              {event.category}
                            </span>
                            <h4 className="font-['PolySans'] mt-4 text-3xl font-black uppercase leading-tight text-white">
                              {event.title}
                            </h4>
                            <div className="mt-5 grid gap-2 font-['PolySans'] text-sm font-semibold text-white/75">
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" />
                                {event.timeRange}
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" />
                                {event.location}
                              </div>
                            </div>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                              <button
                                type="button"
                                onClick={() => openRsvp(event)}
                                className="font-['PolySans'] inline-flex items-center justify-center rounded-full bg-yellow-400 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:scale-[1.02] hover:bg-yellow-300"
                              >
                                RSVP
                              </button>
                              <a
                                href={createGoogleCalendarLink(event)}
                                target="_blank"
                                rel="noreferrer"
                                className="font-['PolySans'] inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-yellow-300 hover:text-yellow-300"
                              >
                                <CalendarPlus className="h-4 w-4" />
                                Add to Google Calendar
                              </a>
                            </div>
                          </article>
                        ))
                      ) : (
                        <div className="border border-yellow-400/20 bg-zinc-950 p-10 text-center">
                          <p className="font-['PolySans'] text-2xl font-black text-white">
                            No events scheduled.
                          </p>
                          <p className="font-['PolySans'] mt-3 text-zinc-400">
                            Use the arrows to move through upcoming DMC dates.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="border-t border-yellow-400/20 bg-zinc-950 p-5 lg:border-l lg:border-t-0">
                <div className="mb-5 flex items-center justify-between">
                  <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-500/70">
                    Since Aug 2025
                  </p>
                  <span className="font-['PolySans'] text-xs font-black text-yellow-300">
                    {parsedCalendarEvents.length} events
                  </span>
                </div>

                <div className="grid max-h-[38rem] gap-4 overflow-y-auto pr-1">
                  {parsedCalendarEvents.map((event) => (
                    <article
                      key={`${event.title}-${event.start}`}
                      className={`relative overflow-hidden rounded-2xl border p-4 text-white ${event.card}`}
                    >
                      <div className={`absolute inset-y-0 left-0 w-1.5 ${event.accent}`} />
                      <div className="flex gap-4">
                        <p className="font-['PolySans'] pl-2 text-4xl font-black leading-none text-white">
                          {event.day}
                        </p>
                        <div>
                          <span
                            className={`mb-2 inline-flex rounded-full px-2.5 py-1 font-['PolySans'] text-[0.58rem] font-black uppercase tracking-[0.1em] ${event.badge}`}
                          >
                            {event.category}
                          </span>
                          <h4 className="font-['PolySans'] text-sm font-black uppercase tracking-[0.08em] text-white">
                            {event.title}
                          </h4>
                          <p className="font-['PolySans'] mt-1 text-xs font-semibold text-white/70">
                            {event.dateLabel}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 pl-2 font-['PolySans'] text-xs font-semibold text-white/75">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5" />
                          {event.timeRange}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-3.5 w-3.5" />
                          {event.location}
                        </div>
                      </div>
                      <div className="mt-4 grid gap-2 pl-2">
                        <button
                          type="button"
                          onClick={() => openRsvp(event)}
                          className="font-['PolySans'] rounded-full bg-yellow-400 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-black transition hover:bg-yellow-300"
                        >
                          RSVP
                        </button>
                        <a
                          href={createGoogleCalendarLink(event)}
                          target="_blank"
                          rel="noreferrer"
                          className="font-['PolySans'] inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white transition hover:border-yellow-300 hover:text-yellow-300"
                        >
                          <CalendarPlus className="h-3.5 w-3.5" />
                          Add to Calendar
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {rsvpEvent ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4 backdrop-blur-md">
          <div className="w-full max-w-xl border border-yellow-400/25 bg-zinc-950 p-6 text-white shadow-2xl shadow-black/40">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-yellow-400">
                  Event RSVP
                </p>
                <h3 className="font-['PolySans'] mt-3 text-3xl font-black uppercase leading-tight">
                  {rsvpEvent.title}
                </h3>
                <p className="font-['PolySans'] mt-3 text-sm font-semibold text-zinc-400">
                  {rsvpEvent.dateLabel} · {rsvpEvent.timeRange}
                </p>
              </div>

              <button
                type="button"
                onClick={closeRsvp}
                aria-label="Close RSVP form"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-zinc-300 transition hover:border-yellow-300 hover:text-yellow-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {rsvpSubmitted ? (
              <div className="mt-8 border border-emerald-400/25 bg-emerald-400/10 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.12em] text-emerald-200">
                    RSVP email prepared
                  </p>
                </div>
                <p className="font-['PolySans'] mt-3 text-sm leading-6 text-zinc-300">
                  Your email app should open with the RSVP details filled in.
                  Send that email to finish the RSVP.
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="mt-8 grid gap-4">
                <label className="font-['PolySans'] grid gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-300">
                  Name
                  <input
                    required
                    value={rsvpForm.name}
                    onChange={(event) =>
                      setRsvpForm((current) => ({
                        ...current,
                        name: event.target.value,
                      }))
                    }
                    className="border border-white/10 bg-black px-4 py-3 text-base font-semibold normal-case tracking-normal text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-300"
                    placeholder="Your full name"
                  />
                </label>

                <label className="font-['PolySans'] grid gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-300">
                  Email
                  <input
                    required
                    type="email"
                    value={rsvpForm.email}
                    onChange={(event) =>
                      setRsvpForm((current) => ({
                        ...current,
                        email: event.target.value,
                      }))
                    }
                    className="border border-white/10 bg-black px-4 py-3 text-base font-semibold normal-case tracking-normal text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-300"
                    placeholder="you@example.com"
                  />
                </label>

                <label className="font-['PolySans'] grid gap-2 text-sm font-black uppercase tracking-[0.12em] text-zinc-300">
                  Notes
                  <textarea
                    value={rsvpForm.notes}
                    onChange={(event) =>
                      setRsvpForm((current) => ({
                        ...current,
                        notes: event.target.value,
                      }))
                    }
                    className="min-h-28 resize-none border border-white/10 bg-black px-4 py-3 text-base font-semibold normal-case tracking-normal text-white outline-none transition placeholder:text-zinc-600 focus:border-yellow-300"
                    placeholder="Anything DMC should know?"
                  />
                </label>

                <div className="mt-2 flex flex-col gap-3 sm:flex-row">
                  <button
                    type="submit"
                    className="font-['PolySans'] rounded-full bg-yellow-400 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-black transition hover:scale-[1.02] hover:bg-yellow-300"
                  >
                    Send RSVP
                  </button>
                  <a
                    href={createGoogleCalendarLink(rsvpEvent)}
                    target="_blank"
                    rel="noreferrer"
                    className="font-['PolySans'] inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:border-yellow-300 hover:text-yellow-300"
                  >
                    <CalendarPlus className="h-4 w-4" />
                    Add to Google Calendar
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </main>
  );
}
