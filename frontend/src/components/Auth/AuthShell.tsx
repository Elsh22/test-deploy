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
    <main className="min-h-screen bg-[#050505] px-6 pb-20 pt-32 text-white">
      <section className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="font-['PolySans'] text-sm font-black uppercase tracking-[0.28em] text-yellow-400">
            {eyebrow}
          </p>
          <h1 className="font-['PolySans'] mt-5 text-5xl font-black uppercase leading-none md:text-7xl">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-300">
            {description}
          </p>
          <div className="mt-8 border-l-4 border-yellow-400 pl-5 text-sm uppercase tracking-[0.18em] text-zinc-400">
            Secure accounts for members, officers, advisors, and future DMC
            technology tools.
          </div>
        </div>

        <div className="border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-black/40 backdrop-blur md:p-8">
          {children}
          <p className="mt-7 text-center text-sm text-zinc-400">
            {footerText}{" "}
            <Link className="font-bold text-yellow-400 hover:text-white" href={footerHref}>
              {footerLink}
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
