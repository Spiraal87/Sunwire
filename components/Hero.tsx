"use client";

import { motion, useReducedMotion } from "framer-motion";
import SignalGraphic from "./SignalGraphic";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const distance = prefersReducedMotion ? 0 : 16;

  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: distance },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-16 sm:pt-24">
      <motion.div variants={container} initial="hidden" animate="show">
        <motion.div variants={item} className="mb-6 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
            Phoenix, Arizona
          </span>
        </motion.div>

        <motion.h1
          variants={item}
          className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
        >
          We build the sites and AI receptionists{" "}
          <span className="gradient-text">your business runs on.</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-xl font-body text-base text-text-muted sm:text-lg"
        >
          Sunwire Digital designs websites and builds AI receptionists that
          handle missed calls and book clients for local businesses across the
          Valley.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href="mailto:cdjohnsonzero@gmail.com"
            className="rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg transition-transform hover:scale-[1.02]"
          >
            Start a conversation
          </a>
          <a
            href="tel:+17194245680"
            className="rounded-btn border border-line px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-gold hover:text-gold"
          >
            719-424-5680
          </a>
        </motion.div>

        <motion.div variants={item} className="mt-16 sm:mt-20">
          <SignalGraphic />
        </motion.div>
      </motion.div>
    </section>
  );
}
