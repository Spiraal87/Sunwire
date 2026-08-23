"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

function FlowLine({
  label,
  steps,
  accent,
}: {
  label: string;
  steps: string[];
  accent: "muted" | "lit";
}) {
  const isLit = accent === "lit";

  return (
    <div>
      <p
        className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
          isLit ? "text-[color:var(--steel-blue)]" : "text-text-muted"
        }`}
      >
        {label}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-base font-semibold sm:text-lg">
        {steps.map((step, index) => (
          <span key={step} className="flex items-center gap-2">
            <span className={isLit ? "text-gold" : "text-text-muted"}>{step}</span>
            {index < steps.length - 1 && (
              <span
                aria-hidden="true"
                className={isLit ? "text-gold/50" : "text-text-muted-dark"}
              >
                &rarr;
              </span>
            )}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function Funnel({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const imageFrameClassName = backlit ? "forge-lit-panel" : "border-gold/30 shadow-surface";

  return (
    <section className="bg-panel-2-textured px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-stretch lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
            className={`relative min-h-[320px] min-w-0 overflow-hidden rounded-panel border bg-panel-2-textured transition-colors transition-shadow duration-1000 ease-out sm:min-h-[420px] lg:h-full ${imageFrameClassName}`}
          >
            <Image
              src="/images/funnel-before-after.png"
              alt="A stylist with a client, with a phone on the counter showing a booked confirmation"
              fill
              quality={90}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut", delay: 0.1 }}
            className="min-w-0 h-full"
          >
            <div className="flex h-full flex-col rounded-panel border border-gold/20 bg-[linear-gradient(165deg,rgba(27,21,17,0.96),rgba(14,11,9,0.98))] p-6 shadow-surface sm:p-8">
              <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                  Where Businesses Lose Customers
                </h2>
                <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
                  Before and after
                </span>
              </div>

              <p className="mb-8 max-w-xl font-body text-sm text-text-muted">
                The goal is simple: fewer dead ends, faster handoffs, and more real opportunities
                turning into booked work.
              </p>

              <div className="mb-8 rounded-card border border-line/70 bg-[linear-gradient(180deg,rgba(230,168,75,0.08),rgba(230,168,75,0.03))] p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[color:var(--steel-blue)]">
                  Why voicemail leaks
                </p>
                <div className="mt-3 flex flex-wrap items-end gap-x-4 gap-y-2">
                  <p className="font-display text-4xl font-bold leading-none text-gold sm:text-5xl">67-80%</p>
                  <p className="max-w-[20rem] font-body text-sm text-text-primary">
                    of callers who reach voicemail hang up without leaving a message.
                  </p>
                </div>
                <p className="mt-3 font-body text-[11px] italic text-text-muted-dark">
                  Industry-cited estimate, not verified for your business.
                </p>
              </div>

              <div className="mt-auto space-y-6 border-l border-line/80 pl-6">
                <FlowLine
                  label="Without Sunforge"
                  steps={["Missed call", "Voicemail", "Lost job"]}
                  accent="muted"
                />
                <FlowLine
                  label="With Sunforge"
                  steps={["Answered", "Booked", "Customer gained"]}
                  accent="lit"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
