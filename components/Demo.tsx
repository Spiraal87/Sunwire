"use client";

import { useState, FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DEMO_PHONE_DISPLAY = "623-303-9061";
const DEMO_PHONE_TEL = "tel:+16233039061";
const DEMO_LINE_READY = true;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Demo() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  const [email, setEmail] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!EMAIL_PATTERN.test(email)) {
      setError(true);
      return;
    }
    setError(false);
    setRevealed(true);
  }

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
                Try the AI Demo
              </span>
              <span className="font-mono text-xs text-text-muted-dark">
                Demo line coming soon
              </span>
            </>
          ) : !revealed ? (
            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-sm flex-col items-center gap-3 sm:flex-row"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(false);
                }}
                placeholder="you@business.com"
                aria-label="Email address"
                className="w-full rounded-btn border border-line bg-panel-2 px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-muted-dark focus:border-gold focus:outline-none"
              />
              <button
                type="submit"
                className="w-full shrink-0 rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110 sm:w-auto"
              >
                Get the number
              </button>
            </form>
          ) : (
            <a
              href={DEMO_PHONE_TEL}
              className="rounded-btn bg-gradient-accent px-8 py-4 font-display text-base font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              Call {DEMO_PHONE_DISPLAY}
            </a>
          )}

          {error && (
            <p className="font-mono text-xs text-coral">Enter a valid email to continue.</p>
          )}
        </div>
      </motion.div>
    </section>
  );
}
