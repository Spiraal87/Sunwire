"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GlowBorder from "./GlowBorder";
import { captureEvent } from "@/lib/analytics";

const DEMO_PHONE_DISPLAY = "623-303-9061";
const DEMO_PHONE_TEL = "tel:+16233039061";
const DEMO_LINE_READY = true;

const SURFACE_SHADOW = "0 24px 48px -32px rgba(0,0,0,0.55)";
const GLOW_SHADOW =
  "0 0 0 1px rgba(230,168,75,0.45), 0 0 40px 4px rgba(230,168,75,0.25), 0 0 90px 12px rgba(211,138,52,0.12)";
const PULSE_SHADOW =
  "0 0 0 1px rgba(230,168,75,0.7), 0 0 55px 8px rgba(230,168,75,0.4), 0 0 110px 16px rgba(211,138,52,0.22)";

// Sequence: beam extends down (0 - 0.7s) -> border draws in clockwise
// (0.6 - 3.2s, overlapping the tail of the beam) -> outer glow powers on
// (3.2 - 3.8s) -> once fully lit, the glow settles into a slow, subtle
// infinite pulse. Keeps the "activation" feel of light traveling down from
// the SignalGraphic divider above and switching this section on.
const BEAM_DURATION = 0.7;
const BORDER_DELAY = 0.6;
const BORDER_DURATION = 2.6;
const GLOW_DELAY = BORDER_DELAY + BORDER_DURATION;

// TODO: drop in a real recorded call snippet once one exists, e.g.:
// <AudioDemo src="/audio/demo-call.mp3" />
// Do not use placeholder/stock audio — leave commented out until a real
// recording is available.

export default function Demo() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  const [revealed, setRevealed] = useState(false);
  const [activated, setActivated] = useState(false);

  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: "-80px" });

  return (
    <section id="demo" className="relative mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.div
        aria-hidden="true"
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: prefersReducedMotion ? 0 : BEAM_DURATION, ease: "easeOut" }}
        style={{ transformOrigin: "top" }}
        className="pointer-events-none absolute left-1/2 top-0 h-12 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-gold sm:h-16"
      />
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: distance, boxShadow: SURFACE_SHADOW }}
        animate={
          inView
            ? {
                opacity: 1,
                y: 0,
                boxShadow:
                  activated && !prefersReducedMotion
                    ? [GLOW_SHADOW, PULSE_SHADOW, GLOW_SHADOW]
                    : GLOW_SHADOW,
              }
            : { opacity: 0, y: distance, boxShadow: SURFACE_SHADOW }
        }
        transition={{
          opacity: { duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" },
          y: { duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" },
          boxShadow:
            activated && !prefersReducedMotion
              ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
              : {
                  duration: prefersReducedMotion ? 0.2 : 0.6,
                  delay: prefersReducedMotion ? 0 : GLOW_DELAY,
                  ease: "easeOut",
                },
        }}
        onAnimationComplete={() => {
          if (inView && !prefersReducedMotion) setActivated(true);
        }}
        className="relative rounded-panel border border-transparent bg-gradient-panel p-8 text-center sm:p-14"
      >
        <GlowBorder inView={inView} delay={BORDER_DELAY} />
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
          Hear It Yourself
        </p>
        <h2 className="mx-auto mt-4 max-w-xl font-display text-2xl font-semibold sm:text-3xl">
          Curious what an AI receptionist actually sounds like?
        </h2>
        <p className="mx-auto mt-4 max-w-lg font-body text-text-muted">
          Call our interactive demo and experience how it answers questions,
          books appointments, and handles conversations naturally.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3">
          {!DEMO_LINE_READY ? (
            <>
              <span
                aria-disabled="true"
                className="cursor-not-allowed rounded-btn bg-gradient-accent px-8 py-4 font-display text-base font-semibold text-bg opacity-90"
              >
                Talk to the AI Receptionist
              </span>
              <span className="font-mono text-xs text-text-muted-dark">
                Demo line coming soon
              </span>
            </>
          ) : (
            <>
              <a
                href={DEMO_PHONE_TEL}
                onClick={() => {
                  setRevealed(true);
                  captureEvent("demo_call_started", { placement: "homepage_demo" });
                }}
                className="rounded-btn bg-gradient-accent px-8 py-4 font-display text-base font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
              >
                Talk to the AI Receptionist
              </a>
              {revealed && (
                <motion.a
                  href={DEMO_PHONE_TEL}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="font-mono text-lg text-text-primary transition-colors hover:text-gold"
                >
                  {DEMO_PHONE_DISPLAY}
                </motion.a>
              )}
            </>
          )}

          <p className="mt-1 max-w-sm font-body text-sm text-text-muted-dark">
            Tell it what kind of business you run — it&apos;ll show you how
            it&apos;d sound for yours.
          </p>

          {DEMO_LINE_READY && (
            <div className="mt-8 hidden w-full max-w-xs flex-col items-center gap-3 border-t border-line pt-8 lg:flex">
              <div className="rounded-card bg-white p-3">
                <Image
                  src="/images/demo-qr.png"
                  alt="QR code that calls the AI demo line when scanned"
                  width={160}
                  height={160}
                  className="h-40 w-40"
                />
              </div>
              <p className="max-w-[220px] text-center font-body text-sm text-text-muted-dark">
                On a computer? Scan to call from your phone.
              </p>
            </div>
          )}
        </div>
      </motion.div>

      {/*
        TODO: embedded audio player for a real recorded demo call, once one
        exists. Do not fabricate or use placeholder/stock audio.

        <AudioDemo src="/audio/demo-call.mp3" />
      */}
    </section>
  );
}
