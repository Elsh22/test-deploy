import Link from "next/link";
import { notFound } from "next/navigation";
import { Linkedin } from "lucide-react";
import { getLeaderBySlug, leaders } from "../leadershipData";

type LeaderPageProps = {
  params: {
    slug: string;
  };
};

export function generateStaticParams() {
  return leaders.map((leader) => ({
    slug: leader.slug,
  }));
}

export default function LeaderBiographyPage({ params }: LeaderPageProps) {
  const leader = getLeaderBySlug(params.slug);

  if (!leader) {
    notFound();
  }

  const linkedinActivityUrl = leader.linkedin
    ? `${leader.linkedin.replace(/\/$/, "")}/recent-activity/all/`
    : null;
  const recentPosts = leader.linkedinPosts?.slice(0, 2) ?? [];
  const organizations =
    leader.organizations ??
    (leader.group === "Advisor" ? [] : ["Developing Men of Color"]);

  return (
    <main className="min-h-screen bg-[#f3f3f1] px-6 pb-24 pt-40 text-black">
      <section className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.95fr_1.25fr_0.8fr] lg:items-start">
        <div className="bg-white p-4">
          <img
            src={leader.image}
            alt={leader.name}
            className="aspect-square w-full object-cover object-top grayscale"
          />
        </div>

        <article>
          <Link
            href="/leadership"
            className="font-['PolySans'] text-sm text-zinc-500 transition hover:text-black"
          >
            &lt; Back to leadership page
          </Link>

          <h1 className="font-['PolySans'] mt-8 text-5xl font-black leading-none md:text-7xl">
            {leader.name}
          </h1>
          <p className="font-['PolySans'] mt-5 text-xl text-zinc-700">
            {leader.role}
          </p>
          {leader.linkedin ? (
            <a
              href={leader.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${leader.name} on LinkedIn`}
              className="mt-5 inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 bg-white text-zinc-700 transition hover:border-yellow-600 hover:bg-yellow-500 hover:text-black"
            >
              <Linkedin className="h-4 w-4" aria-hidden="true" />
            </a>
          ) : null}

          <div className="font-['PolySans'] mt-14 grid gap-8 text-lg leading-8 text-zinc-800">
            {leader.biography.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </article>

        <aside className="grid gap-8">
          <div className="bg-white p-6">
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
              Leadership Area
            </p>
            <p className="font-['PolySans'] mt-4 text-xl font-black">
              {leader.group}
            </p>
          </div>

          <div className="bg-white p-6">
            <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
              Focus
            </p>
            <p className="font-['PolySans'] mt-4 text-base leading-7 text-zinc-700">
              {leader.focus}
            </p>
          </div>

          {organizations.length > 0 ? (
            <div className="bg-white p-6">
              <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                Organizations
              </p>
              <div className="mt-4 grid gap-3">
                {organizations.map((organization) => (
                  <p
                    key={organization}
                    className="font-['PolySans'] border-b border-zinc-100 pb-3 text-sm leading-6 text-zinc-700 last:border-b-0 last:pb-0"
                  >
                    {organization}
                  </p>
                ))}
              </div>
            </div>
          ) : null}

          {leader.details?.map((detail) => (
            <div key={detail.label} className="bg-white p-6">
              <p className="font-['PolySans'] text-sm font-bold uppercase tracking-[0.18em] text-zinc-500">
                {detail.label}
              </p>
              <p className="font-['PolySans'] mt-4 text-base leading-7 text-zinc-700">
                {detail.value}
              </p>
            </div>
          ))}

          <div>
            <p className="font-['PolySans'] mb-4 text-lg">
              Recent LinkedIn Posts
            </p>
            <div className="grid gap-4">
              {recentPosts.length > 0 ? (
                recentPosts.map((post) => (
                  <a
                    key={`${leader.slug}-${post.url}`}
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-5 transition hover:bg-black hover:text-white"
                  >
                    <p className="font-['PolySans'] text-xs font-bold uppercase tracking-[0.18em] text-yellow-700">
                      {post.date}
                    </p>
                    <p className="font-['PolySans'] mt-2 text-sm leading-6 text-zinc-500">
                      {post.excerpt}
                    </p>
                  </a>
                ))
              ) : linkedinActivityUrl ? (
                <a
                  href={linkedinActivityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-5 transition hover:bg-black hover:text-white"
                >
                  <p className="font-['PolySans'] text-xs font-bold uppercase tracking-[0.18em] text-yellow-700">
                    LinkedIn Activity
                  </p>
                  <p className="font-['PolySans'] mt-3 font-black">
                    Latest posts
                  </p>
                  <p className="font-['PolySans'] mt-2 text-sm leading-6 text-zinc-500">
                    View {leader.name}&apos;s recent updates and professional
                    activity on LinkedIn.
                  </p>
                </a>
              ) : (
                <div className="bg-white p-5">
                  <p className="font-['PolySans'] font-black">
                    LinkedIn posts coming soon
                  </p>
                  <p className="font-['PolySans'] mt-2 text-sm leading-6 text-zinc-500">
                    Add post dates, excerpts, and URLs to show recent updates
                    here.
                  </p>
                </div>
              )}
            </div>
          </div>

        </aside>
      </section>
    </main>
  );
}
