import Link from "next/link";
import type { ReactNode } from "react";

type AuthShellProps = {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footerText: string;
  footerHref: string;
  footerLink: string;
};

export default function AuthShell({
  eyebrow,
  title,
  description,
  children,
  footerText,
  footerHref,
  footerLink,
}: AuthShellProps) {
  return (
    <main className="min-h-screen bg-[#050505] px-5 pb-16 pt-28 text-white md:px-8">
      <section className="mx-auto grid max-w-7xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-black/40 lg:min-h-[760px] lg:grid-cols-[1fr_0.82fr]">
        <div className="relative min-h-[420px] overflow-hidden lg:min-h-full">
          <img
            src="/images/home/mission-campus.jpg"
            alt="Developing Men of Color members gathered at a DMC event"
            className="absolute inset-0 h-full w-full object-cover grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/20" />

          <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-between p-7 md:p-10 lg:min-h-full lg:p-12">
            <Link
              href="/"
              className="font-['PolySans'] inline-flex w-fit items-center gap-3 text-xs font-black uppercase tracking-[0.2em] text-zinc-200 transition hover:text-yellow-400"
            >
              <span className="grid h-9 w-9 place-items-center border border-yellow-400/60 bg-yellow-400 text-black">
                D
              </span>
              DMC VCU
            </Link>

            <div className="max-w-2xl">
              <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.28em] text-yellow-400">
                {eyebrow}
              </p>
              <h1 className="font-['PolySans'] mt-5 text-5xl font-black uppercase leading-[0.92] md:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-xl text-base leading-8 text-zinc-200 md:text-lg">
                {description}
              </p>
            </div>

            <div className="grid gap-3 border-t border-white/15 pt-6 text-sm text-zinc-300 sm:grid-cols-3">
              <div>
                <p className="font-['PolySans'] text-2xl font-black text-white">900+</p>
                <p className="mt-1">Members impacted</p>
              </div>
              <div>
                <p className="font-['PolySans'] text-2xl font-black text-white">400+</p>
                <p className="mt-1">Alumni network</p>
              </div>
              <div>
                <p className="font-['PolySans'] text-2xl font-black text-white">8</p>
                <p className="mt-1">Years of excellence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center bg-zinc-950 px-6 py-10 md:px-10 lg:px-12">
          <div className="w-full">
            <div className="mb-8">
              <p className="font-['PolySans'] text-xs font-black uppercase tracking-[0.22em] text-yellow-400">
                Member Portal
              </p>
              <h2 className="font-['PolySans'] mt-3 text-3xl font-black uppercase text-white">
                DMC Member Access
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                Sign in to keep your profile current and connect with events,
                resources, recognition, and future DMC technology tools.
              </p>
            </div>

            {children}

            <p className="mt-7 border-t border-white/10 pt-6 text-center text-sm text-zinc-400">
              {footerText}{" "}
              <Link className="font-bold text-yellow-400 hover:text-white" href={footerHref}>
                {footerLink}
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
