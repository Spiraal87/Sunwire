"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { captureEvent } from "@/lib/analytics";
import { CTA_LABELS } from "@/lib/cta";
import LeadForm from "./LeadForm";

export default function Contact({
  heading = CTA_LABELS.assessment,
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
      className="relative scroll-mt-20 overflow-hidden bg-panel-2-textured px-4 py-16 sm:scroll-mt-24 sm:px-6 sm:py-24"
    >
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/images/contact-office-scene.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-40"
          aria-hidden="true"
          priority={false}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(8,8,10,0.12)_0%,rgba(8,8,10,0.42)_45%,rgba(8,8,10,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,10,0.8)_0%,rgba(8,8,10,0.44)_18%,rgba(8,8,10,0.4)_82%,rgba(8,8,10,0.84)_100%)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          data-energy-marker="lead-form"
          className="relative rounded-panel border border-line bg-[rgba(22,22,22,0.72)] p-6 shadow-surface backdrop-blur-[2px] sm:p-10 lg:p-14"
        >
          <div className="max-w-md">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">{heading}</h2>
            <p className="mt-4 font-body text-text-muted">{body}</p>
          </div>

          <div className="relative mt-10 flex flex-col gap-10 md:flex-row md:items-start">
            <div className="md:w-3/5">
              <LeadForm defaultBusinessType={defaultBusinessType} />
            </div>

            <div className="flex flex-col gap-5 md:w-2/5 md:border-l md:border-line md:pl-10">
              <div className="rounded-card border border-line/80 bg-[rgba(12,12,12,0.46)] p-5 backdrop-blur-[1px]">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--steel-blue)]">
                  Assessment call
                </p>
                <p className="mt-2 font-body text-sm leading-relaxed text-text-secondary">
                  A quick conversation about missed calls, weak handoffs, or where the site may be
                  losing people.
                </p>
              </div>

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
