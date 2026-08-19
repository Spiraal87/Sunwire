"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const tracks = [
  {
    label: "Front Desk System",
    shortLabel: "Front Desk",
    steps: [
      {
        title: "Setup",
        body: "Configured around your hours, services, and the questions customers actually ask - trained on your business, not a script.",
      },
      {
        title: "Answer",
        body: "Picks up calls that would otherwise go unanswered - after hours, during a rush, or when every line's busy.",
      },
      {
        title: "Capture & book",
        body: "Collects the caller's info, checks availability, and books the appointment straight onto your calendar.",
      },
      {
        title: "Notify & follow up",
        body: "You're notified right away with a call summary, so anything needing a personal touch gets a callback.",
      },
    ],
  },
  {
    label: "Website + Conversion System",
    shortLabel: "Website",
    steps: [
      {
        title: "Discovery",
        body: "A short conversation about your business - what you offer and who your customers are.",
      },
      {
        title: "Design & build",
        body: "A working site gets designed and built around the reputation you've already earned in person.",
      },
      {
        title: "Review",
        body: "You see it live and ask for changes before anything is signed or launched.",
      },
      {
        title: "Launch & maintain",
        body: "Once you're happy, it goes live - updates get handled as your business changes.",
      },
    ],
  },
];

function TrackSteps({
  track,
  prefersReducedMotion,
  distance,
}: {
  track: (typeof tracks)[number];
  prefersReducedMotion: boolean | null;
  distance: number;
}) {
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
    <motion.div
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
          },
        },
      }}
    >
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
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
                className="absolute left-[9.5px] top-5 bottom-0 w-px origin-top bg-gradient-to-b from-[color:rgba(111,147,166,0.5)] to-line"
              />
            )}

            <motion.span
              aria-hidden="true"
              variants={badgeVariants}
              className="absolute left-0 top-0 flex h-5 w-5 items-center justify-center rounded-full border border-gold/50 bg-gold/5 font-mono text-[10px] font-semibold text-gold"
            >
              {i + 1}
            </motion.span>

            {!prefersReducedMotion && (
              <motion.span
                aria-hidden="true"
                variants={rippleVariants}
                className="absolute left-0 top-0 h-5 w-5 rounded-full border border-gold/25"
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
  );
}

export default function HowItWorks({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const [activeTrack, setActiveTrack] = useState(0);
  const panelClassName = backlit
    ? "border-gold/20 shadow-[0_0_0_1px_rgba(230,168,75,0.08),0_0_34px_rgba(242,200,112,0.12)]"
    : "border-line shadow-surface";

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">How it works</h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
          Step by step
        </span>
      </div>

      <div
        className={`rounded-panel border bg-gradient-panel p-8 transition-colors transition-shadow duration-1000 ease-out sm:p-10 ${panelClassName}`}
      >
        <div className="mb-8 flex gap-3 md:hidden">
          {tracks.map((track, index) => {
            const isActive = activeTrack === index;

            return (
              <button
                key={track.label}
                type="button"
                onClick={() => setActiveTrack(index)}
                className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                  isActive
                    ? "border-[color:var(--steel-blue)] bg-[color:rgba(111,147,166,0.12)] text-[color:var(--steel-blue)]"
                    : "border-line text-text-secondary hover:border-[color:rgba(111,147,166,0.4)] hover:text-text-primary"
                }`}
                aria-pressed={isActive}
              >
                {track.shortLabel}
              </button>
            );
          })}
        </div>

        <div className="hidden grid-cols-1 gap-10 md:grid md:grid-cols-2 md:gap-12">
          {tracks.map((track) => (
            <TrackSteps
              key={track.label}
              track={track}
              prefersReducedMotion={prefersReducedMotion}
              distance={distance}
            />
          ))}
        </div>

        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={tracks[activeTrack].label}
              initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: prefersReducedMotion ? 0 : -10 }}
              transition={{ duration: prefersReducedMotion ? 0.15 : 0.25, ease: "easeOut" }}
            >
              <TrackSteps
                track={tracks[activeTrack]}
                prefersReducedMotion={prefersReducedMotion}
                distance={distance}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <p className="mt-12 font-body text-sm text-text-muted">
          It runs quietly alongside your existing number and team - a voice AI answering as your
          business, not a replacement for either.
        </p>
      </div>
    </section>
  );
}
