"use client";

import { motion, useReducedMotion } from "framer-motion";

const tracks = [
  {
    label: "AI Receptionists",
    steps: [
      {
        title: "Setup",
        body: "The system is configured around your hours, services, pricing, and the questions customers actually ask — trained on your business, not a generic script.",
      },
      {
        title: "Answer",
        body: "When a call comes in and goes unanswered — after hours, during a rush, or if every line is busy — a conversational AI voice system picks up and talks through what the caller needs.",
      },
      {
        title: "Capture & book",
        body: "It collects the caller's info, checks real-time availability, and books the appointment straight onto your calendar — or takes a detailed message if it can't.",
      },
      {
        title: "Notify & follow up",
        body: "You get notified right away with a summary of the call, so anything that needs a personal touch gets a callback from you or your team.",
      },
    ],
  },
  {
    label: "Websites",
    steps: [
      {
        title: "Discovery",
        body: "A short conversation about your business — what you offer, who your customers are, and what they need to see.",
      },
      {
        title: "Design & build",
        body: "A working site gets designed and built around the reputation you've already earned in person.",
      },
      {
        title: "Review",
        body: "You see it live, click through it, and ask for changes before anything is signed or launched.",
      },
      {
        title: "Launch & maintain",
        body: "Once you're happy, it goes live. Updates to hours, menus, or services get handled as your business changes.",
      },
    ],
  },
];

export default function HowItWorks() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">How it works</h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Step by step
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
        {tracks.map((track, trackIndex) => (
          <motion.div
            key={track.label}
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{
              duration: prefersReducedMotion ? 0.2 : 0.6,
              ease: "easeOut",
              delay: trackIndex * 0.1,
            }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
              {track.label}
            </p>

            <ol className="mt-6">
              {track.steps.map((step, i) => (
                <li key={step.title} className="relative pb-9 pl-9 last:pb-0">
                  {i < track.steps.length - 1 && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-[9.5px] top-5 bottom-0 w-px origin-top bg-gradient-to-b from-gold to-coral"
                      initial={{ scaleY: prefersReducedMotion ? 1 : 0 }}
                      whileInView={{ scaleY: 1 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{
                        duration: prefersReducedMotion ? 0 : 0.7,
                        delay: prefersReducedMotion ? 0 : 0.25,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  <motion.span
                    aria-hidden="true"
                    className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-gradient-accent font-mono text-[10px] font-semibold text-bg"
                    initial={{ scale: prefersReducedMotion ? 1 : 0.3, opacity: prefersReducedMotion ? 1 : 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: prefersReducedMotion ? 0.2 : 0.5,
                      ease: "backOut",
                    }}
                  >
                    {i + 1}
                  </motion.span>

                  {!prefersReducedMotion && (
                    <motion.span
                      aria-hidden="true"
                      className="absolute left-0 top-0 h-5 w-5 rounded-full border border-gold"
                      initial={{ scale: 1, opacity: 0 }}
                      whileInView={{ scale: [1, 1.6], opacity: [0.45, 0] }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 1, ease: "easeOut", delay: 0.05 }}
                    />
                  )}

                  <motion.div
                    initial={{ opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: prefersReducedMotion ? 0.2 : 0.4, delay: prefersReducedMotion ? 0 : 0.1 }}
                  >
                    <h3 className="font-display text-base font-semibold text-text-primary sm:text-lg">
                      {step.title}
                    </h3>
                    <p className="mt-1.5 font-body text-sm text-text-muted">{step.body}</p>
                  </motion.div>
                </li>
              ))}
            </ol>
          </motion.div>
        ))}
      </div>

      <p className="mt-12 rounded-card border border-line bg-gradient-panel px-6 py-5 font-body text-sm text-text-muted shadow-surface">
        The phone system runs quietly alongside your existing number and team —
        it&apos;s a voice AI answering as your business, not a replacement for
        either.
      </p>
    </section>
  );
}
