"use client";

import { motion, useReducedMotion } from "framer-motion";

const examples = [
  {
    icon: "/images/icon-revenue.svg",
    iconAlt: "Revenue growth icon",
    text: "Missing only one service call each weekday could represent thousands of dollars in lost revenue over the course of a month.",
  },
  {
    icon: "/images/icon-time-saved.svg",
    iconAlt: "Time saved icon",
    text: "Saving your office manager one hour each day means more time spent helping customers instead of answering repetitive questions.",
  },
];

export default function ROI() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Small Improvements. Big Results.
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Illustrative examples
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {examples.map((example, i) => (
          <motion.div
            key={example.text}
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.6,
              ease: "easeOut",
              delay: i * 0.1,
            }}
            className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface"
          >
            <div className="flex items-center gap-3">
              <img src={example.icon} alt={example.iconAlt} width={80} height={80} className="h-8 w-8 sm:h-9 sm:w-9" />
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
                Example {String(i + 1).padStart(2, "0")}
              </p>
            </div>
            <p className="mt-4 font-body text-lg text-text-primary">{example.text}</p>
          </motion.div>
        ))}
      </div>

      <p className="mt-6 font-mono text-xs text-text-muted-dark">
        Illustrative examples only — not a guarantee of results.
      </p>
    </section>
  );
}
