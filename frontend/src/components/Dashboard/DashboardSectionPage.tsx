type DashboardSectionPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  cards: Array<{
    title: string;
    description: string;
    meta?: string;
  }>;
};

export default function DashboardSectionPage({
  cards,
  description,
  eyebrow,
  title,
}: DashboardSectionPageProps) {
  return (
    <section className="px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-sm font-normal uppercase tracking-[0.18em] text-yellow-400">{eyebrow}</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white md:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-7 text-zinc-500">{description}</p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article className="border border-zinc-800 bg-zinc-950/60 p-6" id={card.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")} key={card.title}>
              {card.meta ? (
                <p className="text-xs font-normal uppercase tracking-[0.16em] text-zinc-500">{card.meta}</p>
              ) : null}
              <h2 className="mt-2 text-2xl font-semibold text-white">{card.title}</h2>
              <p className="mt-3 text-sm leading-6 text-zinc-500">{card.description}</p>
              <button
                className="mt-6 text-sm font-normal text-yellow-400 transition hover:text-yellow-300"
                type="button"
              >
                Open
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
