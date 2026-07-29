"use client";

import { motion, useReducedMotion } from "framer-motion";

const facts = [
  { label: "BASED IN", value: "Phoenix, Arizona" },
  { label: "FOCUS", value: "Local businesses across the Valley" },
  { label: "APPROACH", value: "Understand the business, then build" },
];

export default function About() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Who&apos;s behind it</h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          About
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className="space-y-4 font-body text-text-muted"
        >
          <p>
            Sunforge Digital is run by Christopher Johnson, a Phoenix-based
            developer who spent close to a decade building software before
            turning his focus to helping local businesses grow. We&apos;re a
            local business helping other local businesses — restaurants,
            service companies, and everyone in between.
          </p>
          <p>
            Every project starts the same way: understanding how your
            business actually works and where you&apos;re losing customers —
            not pitching technology for its own sake. Something real gets
            built and shown to you before anything&apos;s decided.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut", delay: 0.1 }}
          className="space-y-6 border-t border-line pt-6 md:border-l md:border-t-0 md:pl-10 md:pt-0"
        >
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
                {fact.label}
              </p>
              <p className="mt-1 font-body text-text-primary">{fact.value}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
