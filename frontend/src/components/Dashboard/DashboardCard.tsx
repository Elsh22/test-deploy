import type { ReactNode } from "react";

type DashboardCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

export default function DashboardCard({ title, description, children }: DashboardCardProps) {
  return (
    <section className="border-t border-white/10 py-7">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <h2 className="font-['PolySans'] text-2xl font-black uppercase tracking-tight text-white">
          {title}
        </h2>
        {description ? (
          <p className="max-w-md text-sm leading-6 text-zinc-400">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
