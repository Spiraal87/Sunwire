"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const DEMO_PHONE_DISPLAY = "623-303-9061";
const DEMO_PHONE_TEL = "tel:+16233039061";
const DEMO_LINE_READY = true;

// TODO: drop in a real recorded call snippet once one exists, e.g.:
// <AudioDemo src="/audio/demo-call.mp3" />
// Do not use placeholder/stock audio — leave commented out until a real
// recording is available.

export default function Demo() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  const [revealed, setRevealed] = useState(false);

  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="rounded-panel border border-line bg-gradient-panel p-8 text-center shadow-surface sm:p-14"
      >
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">
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
                Call the Demo
              </span>
              <span className="font-mono text-xs text-text-muted-dark">
                Demo line coming soon
              </span>
            </>
          ) : (
            <>
              <a
                href={DEMO_PHONE_TEL}
                onClick={() => setRevealed(true)}
                className="rounded-btn bg-gradient-accent px-8 py-4 font-display text-base font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
              >
                Call the Demo
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
