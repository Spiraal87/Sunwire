"use client";

import { motion, useReducedMotion } from "framer-motion";

const withoutSunforge = [
  { title: "Missed call", sub: "rush hour or after hours" },
  { title: "Voicemail", sub: "customer waits instead of booking" },
  { title: "Lost job", sub: "they call the next option" },
];

const withSunforge = [
  { title: "Answered", sub: "the call gets handled right away" },
  { title: "Booked", sub: "details and timing get captured" },
  { title: "Customer gained", sub: "the job stays with you" },
];

function PathRow({
  label,
  items,
  accent,
}: {
  label: string;
  items: { title: string; sub: string }[];
  accent: "muted" | "lit";
}) {
  const isLit = accent === "lit";

  return (
    <div className="rounded-card border border-line/80 bg-panel/40 p-5 sm:p-6">
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
          isLit ? "text-[color:var(--steel-blue)]" : "text-text-muted"
        }`}
      >
        {label}
      </p>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-3">
        {items.map((item, index) => (
          <div key={item.title} className="relative rounded-card border border-line/70 bg-bg/35 p-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                  isLit
                    ? "border-gold/60 bg-gold/10 text-gold"
                    : "border-text-muted-dark/50 bg-panel-2 text-text-muted"
                }`}
              >
                <span className="font-mono text-[11px] font-semibold">{index + 1}</span>
              </div>
              <div>
                <p className="font-display text-base font-semibold text-text-primary">{item.title}</p>
              </div>
            </div>
            <p className="mt-3 font-body text-sm text-text-muted">{item.sub}</p>

            {index < items.length - 1 && (
              <div className="mt-4 hidden items-center gap-2 sm:flex">
                <span
                  aria-hidden="true"
                  className={`h-px flex-1 ${
                    isLit
                      ? "bg-[linear-gradient(90deg,rgba(111,147,166,0.65),rgba(230,168,75,0.4))]"
                      : "bg-line"
                  }`}
                />
                <span
                  aria-hidden="true"
                  className={`text-xs ${
                    isLit ? "text-[color:var(--steel-blue)]" : "text-text-muted-dark"
                  }`}
                >
                  &rarr;
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Funnel({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const panelClassName = backlit ? "forge-lit-panel" : "border-line shadow-surface";

  return (
    <section className="bg-panel-2-textured px-6 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Where Businesses Lose Customers
          </h2>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
            Before and after
          </span>
        </div>

        <p className="mb-6 max-w-2xl font-body text-sm text-text-muted">
          The goal is simple: fewer dead ends, faster handoffs, and more real opportunities turning
          into booked work.
        </p>

        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className={`rounded-panel border bg-gradient-panel p-6 transition-colors transition-shadow duration-1000 ease-out sm:p-8 ${panelClassName}`}
        >
          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            <PathRow label="Without Sunforge" items={withoutSunforge} accent="muted" />
            <PathRow label="With Sunforge" items={withSunforge} accent="lit" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
