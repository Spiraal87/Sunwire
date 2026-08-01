"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

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
    <section className="relative flex items-center lg:min-h-[82vh]">
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <Image
          src="/images/hero-image3.png"
          alt="Concentric forged metal rings around a glowing molten core, with circuit-like data lines radiating outward"
          fill
          priority
          sizes="100vw"
          className="object-cover brightness-110"
          style={{ objectPosition: "68% center" }}
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(11,14,23,0.94)_0%,rgba(11,14,23,0.78)_28%,rgba(11,14,23,0.28)_52%,rgba(11,14,23,0.04)_75%,rgba(11,14,23,0.15)_100%)]" />
      </div>
      <div
        className="absolute inset-x-0 -top-px bottom-[-2px] -z-10"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix type='matrix' values='0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.05 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\"), linear-gradient(to bottom, rgba(11,14,23,0.7) 0%, rgba(11,14,23,0.12) 30%, rgba(11,14,23,0.14) 42%, rgba(11,14,23,0.22) 52%, rgba(11,14,23,0.35) 61%, rgba(11,14,23,0.52) 69%, rgba(11,14,23,0.68) 76%, rgba(11,14,23,0.82) 82%, rgba(11,14,23,0.92) 87%, rgba(11,14,23,0.98) 92%, rgba(11,14,23,1) 97%)",
        }}
      />
      <div className="absolute inset-0 -z-10 bg-bg/55 lg:hidden" />

      <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16 lg:py-32">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.div variants={item} className="mb-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-8 bg-gold" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
              Digital Systems
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl sm:leading-tight md:text-6xl md:leading-tight"
          >
            Capture more customers.{" "}
            <span className="gradient-text">Miss fewer calls.</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl font-body text-base text-text-muted sm:text-lg"
          >
            Digital systems — AI receptionists and websites — that help local
            businesses capture every opportunity, book more jobs, and save
            valuable time.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/calculator"
              className="rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              See What Missed Calls Cost You
            </Link>
            <a
              href="#demo"
              className="rounded-btn border border-line px-6 py-3 font-mono text-sm text-text-primary backdrop-blur-sm transition-colors hover:border-gold hover:text-gold"
            >
              Try the AI Demo
            </a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 lg:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted-dark">
          Scroll
        </span>
        <motion.svg
          width="16"
          height="9"
          viewBox="0 0 16 9"
          fill="none"
          animate={prefersReducedMotion ? undefined : { y: [0, 5, 0] }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }
          }
        >
          <path
            d="M1 1L8 8L15 1"
            stroke="#E6A84B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.svg>
      </motion.div>
    </section>
  );
}
