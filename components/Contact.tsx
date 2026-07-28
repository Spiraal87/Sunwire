"use client";

import { motion, useReducedMotion } from "framer-motion";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="rounded-panel border border-line bg-gradient-panel p-8 sm:p-14"
      >
        <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Let&apos;s talk about your business.
            </h2>
            <p className="mt-4 font-body text-text-muted">
              No pressure, no obligation — just a conversation about what&apos;s
              actually working and what isn&apos;t.
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <a
              href="mailto:cdjohnsonzero@gmail.com"
              className="flex items-center gap-3 font-mono text-sm text-text-primary transition-colors hover:text-gold"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
              cdjohnsonzero@gmail.com
            </a>
            <a
              href="tel:+17194245680"
              className="flex items-center gap-3 font-mono text-sm text-text-primary transition-colors hover:text-gold"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
              719-424-5680
            </a>
          </div>
        </div>
      </motion.div>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-2 font-mono text-xs text-text-muted-dark">
        <span>© 2026 Sunwire Digital</span>
        <span>Phoenix, AZ</span>
      </div>
    </section>
  );
}
