const attendedEvents = [
  {
    title: "General Body Meeting",
    date: "April 15, 2026",
    detail: "Keynote speaker and end-of-semester celebration",
  },
  {
    title: "Jacob's Chance Kickball",
    date: "April 19, 2026",
    detail: "Community service and wellness event",
  },
];

const rsvpEvents = [
  {
    title: "9th Annual DMC Mixer",
    date: "September 13, 2026",
    detail: "Networking, brotherhood, and professional connections",
  },
  {
    title: "Professional Academy Workshop",
    date: "Coming soon",
    detail: "Resume, LinkedIn, and interview preparation",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white md:px-10">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center justify-center gap-10 md:flex-row md:justify-start">
        <aside className="flex w-full flex-col items-center gap-6 md:w-[360px] md:items-start">
          <div className="grid h-64 w-64 place-items-center rounded-full border border-white/10 bg-zinc-950 shadow-[0_24px_80px_rgba(0,0,0,0.55)] md:h-72 md:w-72">
            <div className="grid h-[94%] w-[94%] place-items-center rounded-full bg-yellow-400 font-['PolySans'] text-7xl font-black uppercase text-black md:text-8xl">
              DM
            </div>
          </div>
        </aside>

        <section className="w-full text-center md:flex-1 md:text-left">
          <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.26em] text-yellow-400">
            DMC Member
          </p>
          <h1 className="font-['PolySans'] mt-4 text-6xl font-black uppercase leading-none text-white lg:text-8xl">
            Member Name
          </h1>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              ["Major", "Computer Science"],
              ["Classification", "Junior"],
              ["Role", "Member"],
              ["Track", "Technology"],
            ].map(([label, value]) => (
              <div key={label} className="border-l border-yellow-400/60 pl-4">
                <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.18em] text-zinc-500">
                  {label}
                </p>
                <p className="mt-2 text-lg font-semibold text-white">{value}</p>
              </div>
            ))}
          </div>
        </section>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 pb-16 md:grid-cols-2">
        {[
          ["Events Attended", attendedEvents],
          ["RSVP'd Events", rsvpEvents],
        ].map(([sectionTitle, events]) => (
          <section key={sectionTitle as string} className="border border-white/10 bg-zinc-950 p-6 md:p-8">
            <div className="flex items-end justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
                  Member Activity
                </p>
                <h2 className="font-['PolySans'] mt-2 text-2xl font-black uppercase text-white md:text-3xl">
                  {sectionTitle as string}
                </h2>
              </div>
              <p className="font-['PolySans'] text-3xl font-black text-white">
                {(events as typeof attendedEvents).length}
              </p>
            </div>

            <div className="mt-6 grid gap-5">
              {(events as typeof attendedEvents).map((event) => (
                <article key={event.title} className="border-l border-yellow-400/70 pl-4">
                  <h3 className="font-['PolySans'] text-lg font-black uppercase text-white">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-sm font-semibold text-yellow-400">{event.date}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{event.detail}</p>
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
    </main>
  );
}
