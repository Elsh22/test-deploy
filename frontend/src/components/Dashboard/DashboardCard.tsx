import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function DashboardCard({ title, description, children }: DashboardCardProps) {
  return (
    <section className="border border-white/10 bg-white/[0.04] p-6 shadow-xl shadow-black/20">
      <div className="mb-5">
        <h2 className="font-['PolySans'] text-2xl font-black uppercase text-white">
          {title}
        </h2>
        {description ? <p className="mt-2 text-sm leading-6 text-zinc-400">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
