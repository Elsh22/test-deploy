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
        </section>
      </section>
    </main>
  );
}
