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

  // Everything below is animated by variant propagation from the single
  // whileInView trigger on each track's outer motion.div — nested elements
  // don't run their own IntersectionObserver. Real mobile browsers (dynamic
  // address-bar resizing especially) have historically been unreliable at
  // firing many independent, tightly-margined observers on one page; a
  // single parent trigger orchestrating children via variants sidesteps
  // that entirely.
  const olVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
  };

  const liVariants = {
    hidden: {},
    show: {
      transition: { staggerChildren: 0.06 },
    },
  };

  const lineVariants = {
    hidden: { scaleY: prefersReducedMotion ? 1 : 0 },
    show: {
      scaleY: 1,
      transition: { duration: prefersReducedMotion ? 0 : 0.7, ease: "easeInOut" },
    },
  };

  const badgeVariants = {
    hidden: { scale: prefersReducedMotion ? 1 : 0.3, opacity: prefersReducedMotion ? 1 : 0 },
    show: {
      scale: 1,
      opacity: 1,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.5, ease: "backOut" },
    },
  };

  const rippleVariants = {
    hidden: { scale: 1, opacity: 0 },
    show: {
      scale: [1, 1.6],
      opacity: [0.45, 0],
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const textVariants = {
    hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.4 },
    },
  };

  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">How it works</h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Step by step
        </span>
      </div>

      <div className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface sm:p-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-12">
          {tracks.map((track, trackIndex) => (
            <motion.div
              key={track.label}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={{
                hidden: { opacity: 0, y: distance },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: prefersReducedMotion ? 0.2 : 0.6,
                    ease: "easeOut",
                    delay: trackIndex * 0.1,
                  },
                },
              }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
                {track.label}
              </p>

              <motion.ol className="mt-6" variants={olVariants}>
                {track.steps.map((step, i) => (
                  <motion.li
                    key={step.title}
                    variants={liVariants}
                    className="relative pb-9 pl-9 last:pb-0"
                  >
                    {i < track.steps.length - 1 && (
                      <motion.span
                        aria-hidden="true"
                        variants={lineVariants}
                        className="absolute left-[9.5px] top-5 bottom-0 w-px origin-top bg-gradient-to-b from-gold to-coral"
                      />
                    )}

                    <motion.span
                      aria-hidden="true"
                      variants={badgeVariants}
                      className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-gold bg-gradient-accent font-mono text-[10px] font-semibold text-bg"
                    >
                      {i + 1}
                    </motion.span>

                    {!prefersReducedMotion && (
                      <motion.span
                        aria-hidden="true"
                        variants={rippleVariants}
                        className="absolute left-0 top-0 h-5 w-5 rounded-full border border-gold"
                      />
                    )}

                    <motion.div variants={textVariants}>
                      <h3 className="font-display text-base font-semibold text-text-primary sm:text-lg">
                        {step.title}
                      </h3>
                      <p className="mt-1.5 font-body text-sm text-text-muted">{step.body}</p>
                    </motion.div>
                  </motion.li>
                ))}
              </motion.ol>
            </motion.div>
          ))}
        </div>

        <p className="mt-12 font-body text-sm text-text-muted">
          The phone system runs quietly alongside your existing number and team —
          it&apos;s a voice AI answering as your business, not a replacement for
          either.
        </p>
      </div>
    </section>
  );
}
