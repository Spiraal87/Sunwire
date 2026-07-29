"use client";

import { motion, useReducedMotion } from "framer-motion";

const stages = [
  { label: "Google Search", caption: "Where they first find you" },
  { label: "Website", caption: "Where they decide to trust you" },
  { label: "Phone Call", caption: "Where questions get answered" },
  { label: "Appointment", caption: "Where it gets booked" },
  { label: "Customer", caption: "Where it pays off" },
];

export default function Funnel() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Where Businesses Lose Customers
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          The path to a customer
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface sm:p-10"
      >
        <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-start sm:gap-2">
          {stages.map((stage, i) => (
            <div key={stage.label} className="flex flex-1 flex-col items-center sm:contents">
              <div className="group flex w-full flex-1 flex-col items-center sm:w-auto">
                <motion.div
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.04 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="w-full cursor-default rounded-card border border-line bg-panel-2 px-4 py-4 text-center font-display text-sm font-semibold text-text-primary transition-colors duration-200 group-hover:border-gold group-hover:text-gold sm:text-base"
                >
                  {stage.label}
                </motion.div>
                <p className="mt-2 h-4 text-center font-mono text-[11px] text-text-muted-dark opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  {stage.caption}
                </p>
              </div>
              {i < stages.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  className="gradient-text my-1 font-display text-lg leading-none sm:my-0 sm:mt-4 sm:px-1"
                  animate={
                    prefersReducedMotion
                      ? undefined
                      : { opacity: [0.45, 0.85, 0.45] }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.15,
                  }}
                >
                  <span className="hidden sm:inline">→</span>
                  <span className="sm:hidden">↓</span>
                </motion.span>
              )}
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-2xl font-body text-text-muted">
          Most local businesses lose customers somewhere along this path — a
          slow website, a call that goes unanswered, a booking that never gets
          confirmed. Sunforge Digital helps improve every stage of this
          journey, not just one.
        </p>
      </motion.div>
    </section>
  );
}
