"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const rows = [
  {
    need: "Calls are getting missed when the team is busy.",
    bestFit: "Front Desk System",
    why: "Handles overflow and unanswered calls before they turn into lost jobs.",
  },
  {
    need: "After-hours inquiries need a response instead of voicemail.",
    bestFit: "Front Desk System",
    why: "Keeps the phone covered outside normal hours and captures what the caller needs.",
  },
  {
    need: "The business feels stronger in person than it does online.",
    bestFit: "Website + Conversion System",
    why: "Rebuilds the first impression people get when they check you out online.",
  },
  {
    need: "People visit the site, but too few actually call or reach out.",
    bestFit: "Website + Conversion System",
    why: "Improves the pages, messaging, and conversion paths that turn interest into action.",
  },
  {
    need: "Both call handling and web conversion feel leaky.",
    bestFit: "Both, phased in",
    why: "Start with the biggest leak first, then layer in the second system once the foundation is in place.",
  },
];

export default function SystemComparison({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const [openRow, setOpenRow] = useState(0);
  const panelClassName = backlit
    ? "border-gold/20 shadow-[0_0_0_1px_rgba(230,168,75,0.07),0_0_28px_rgba(211,138,52,0.1)]"
    : "border-line shadow-surface";

  return (
    <section className="px-6 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className="mb-10 flex flex-wrap items-end justify-between gap-4"
        >
          <div className="max-w-3xl">
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Which starting point fits best?
            </h2>
            <p className="mt-3 font-body text-text-muted">
              These are packaged starting points, not the limit of what we can build. The goal is
              to find the first system that fixes the biggest leak.
            </p>
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
            Honest comparison
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut", delay: 0.08 }}
          className={`overflow-hidden rounded-panel border bg-gradient-panel transition-colors transition-shadow duration-1000 ease-out ${panelClassName}`}
        >
          <div className="hidden grid-cols-[1.35fr_0.8fr_1fr] border-b border-line/80 bg-[linear-gradient(90deg,rgba(111,147,166,0.06),rgba(255,255,255,0.02))] px-6 py-4 md:grid">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
              If your biggest issue is...
            </p>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
              Best starting point
            </p>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
              Why
            </p>
          </div>

          <div className="hidden md:block">
            {rows.map((row, index) => (
              <div
                key={row.need}
                className={`grid gap-3 px-6 py-5 md:grid-cols-[1.35fr_0.8fr_1fr] md:gap-6 ${
                  index < rows.length - 1 ? "border-b border-line/80" : ""
                }`}
              >
                <div>
                  <p className="font-body text-sm text-text-primary sm:text-base">{row.need}</p>
                </div>
                <div>
                  <p className="font-display text-base font-semibold text-gold">{row.bestFit}</p>
                </div>
                <div>
                  <p className="font-body text-sm text-text-muted">{row.why}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="md:hidden">
            {rows.map((row, index) => {
              const isOpen = openRow === index;

              return (
                <div key={row.need} className={index < rows.length - 1 ? "border-b border-line/80" : ""}>
                  <button
                    type="button"
                    onClick={() => setOpenRow(isOpen ? -1 : index)}
                    className="flex w-full items-start justify-between gap-4 px-5 py-5 text-left"
                    aria-expanded={isOpen}
                  >
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
                        Biggest issue
                      </p>
                      <p className="mt-2 font-body text-base text-text-primary">{row.need}</p>
                      <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
                        Best starting point
                      </p>
                      <p className="mt-1.5 font-display text-lg font-semibold text-gold">{row.bestFit}</p>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`mt-1 shrink-0 text-[color:var(--steel-blue)] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0.15 : 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-5">
                          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
                            Why
                          </p>
                          <p className="mt-1.5 font-body text-sm leading-relaxed text-text-muted">
                            {row.why}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
