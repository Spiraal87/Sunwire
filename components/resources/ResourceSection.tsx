import type { ReactNode } from "react";

type ResourceSectionProps = {
  id: string;
  title: string;
  children: ReactNode;
};

export default function ResourceSection({ id, title, children }: ResourceSectionProps) {
  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-panel border border-line bg-[linear-gradient(180deg,rgba(22,22,22,0.92),rgba(12,12,12,0.98))] p-6 shadow-surface sm:p-8"
    >
      <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(230,168,75,0.72),transparent)]" />
      <h2 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">{title}</h2>
      <div className="mt-4 space-y-4 font-body text-base leading-7 text-text-secondary">{children}</div>
    </section>
  );
}
