"use client";

import { motion, useReducedMotion } from "framer-motion";
import { captureEvent } from "@/lib/analytics";
import LeadForm from "./LeadForm";

export default function Contact({
  heading = "Book a 15-Minute Assessment",
  body = "Tell us a little about your business and we will reach out to set up a quick fit call. No pressure. Just a practical conversation about where opportunities may be slipping through the cracks.",
  defaultBusinessType,
}: {
  heading?: string;
  body?: string;
  defaultBusinessType?: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section
      id="contact"
      className="scroll-mt-20 bg-panel-2-textured px-4 py-16 sm:scroll-mt-24 sm:px-6 sm:py-24"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          data-energy-marker="lead-form"
          className="rounded-panel border border-line bg-panel p-6 shadow-surface sm:p-10 lg:p-14"
        >
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{heading}</h2>
            <p className="mt-4 font-body text-text-muted">{body}</p>
          </div>

          <div className="relative mt-10 flex flex-col gap-10 md:flex-row md:items-start">
            <div className="md:w-3/5">
              <LeadForm defaultBusinessType={defaultBusinessType} />
            </div>

            <div className="flex flex-col gap-4 md:w-2/5 md:border-l md:border-line md:pl-10">
              <p className="font-body text-xs uppercase tracking-wide text-text-muted-dark">
                Prefer to talk now?
              </p>
              <a
                href="tel:+17194245680"
                onClick={() => captureEvent("tel_link_clicked", { location: "contact_section" })}
                className="flex items-center gap-3 font-mono text-sm text-text-primary transition-colors hover:text-gold"
              >
                <span
                  aria-hidden="true"
                  className="h-2 w-2 shrink-0 rounded-full border border-coral"
                />
                719-424-5680
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
