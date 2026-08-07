"use client";

import { motion, useReducedMotion } from "framer-motion";
import LeadForm from "./LeadForm";

export default function Contact() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section id="contact" className="bg-panel-2-textured px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface sm:p-14"
      >
        <div className="max-w-md">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            Let&apos;s Find Your Biggest Opportunity.
          </h2>
          <p className="mt-4 font-body text-text-muted">
            No pressure. No hard sales pitch. Just a conversation about
            where your business may be losing customers and how technology
            can help.
          </p>
        </div>

        <div className="relative mt-10 flex flex-col gap-10 md:flex-row md:items-start">
          <div className="md:w-3/5">
            <LeadForm />
          </div>

          <div className="flex flex-col gap-4 md:w-2/5 md:border-l md:border-line md:pl-10">
            <p className="font-body text-xs uppercase tracking-wide text-text-muted-dark">
              Or reach me directly
            </p>
            <a
              href="mailto:cdjohnsonzero@gmail.com"
              className="flex items-center gap-3 font-mono text-sm text-text-primary transition-colors hover:text-gold"
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full border border-coral" />
              cdjohnsonzero@gmail.com
            </a>
            <a
              href="tel:+17194245680"
              className="flex items-center gap-3 font-mono text-sm text-text-primary transition-colors hover:text-gold"
            >
              <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full border border-coral" />
              719-424-5680
            </a>
          </div>
        </div>
      </motion.div>
      </div>
    </section>
  );
}
