"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Phone, Zap } from "lucide-react";
import { captureEvent } from "@/lib/analytics";
import GlowBorder from "./GlowBorder";

const DEMO_PHONE_TEL = "tel:+16233039061";
const CARD_BORDER_DELAY = 0.35;
const CARD_BORDER_DURATION = 1.4;
const CARD_SURFACE_SHADOW = "0 24px 48px -32px rgba(0,0,0,0.55)";
const CARD_GLOW_SHADOW =
  "0 0 0 1px rgba(230,168,75,0.24), 0 0 38px 3px rgba(230,168,75,0.2), 0 22px 52px -28px rgba(0,0,0,0.7)";

function CallTimerBadge({ reducedMotion }: { reducedMotion: boolean | null }) {
  const [seconds, setSeconds] = useState(3);

  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reducedMotion ? 0 : 0.3 }}
      className="absolute -right-3 -top-4 z-10 flex items-center gap-1.5 rounded-full border border-line bg-panel-2 px-3 py-1.5"
    >
      <Zap size={12} className="text-gold" fill="currentColor" />
      <span className="text-[11px] font-bold text-gold">
        {mm}:{ss}
      </span>
    </motion.div>
  );
}

export default function EmberCallWidget() {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [answered, setAnswered] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  const handleCallAction = () => {
    captureEvent("ember_widget_answered", { placement: "homepage_ember_widget" });
    setAnswered(true);
  };

  const handleReplay = () => {
    setAnswered(false);
    setReplayCount((n) => n + 1);
  };

  const handleRealCtaClick = () => {
    captureEvent("demo_call_started", { placement: "homepage_ember_widget" });
  };

  return (
    <section
      ref={sectionRef}
      id="demo"
      className="relative overflow-hidden bg-panel-2-textured px-6 py-16 sm:py-24"
    >
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2">
        {/* LEFT: Copy */}
        <div>
          <h1 className="mb-6 font-display text-4xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-5xl">
            Your customer called after you closed.{" "}
            <span className="gradient-text">Ember answered.</span>
          </h1>

          <p className="mb-8 max-w-lg font-body text-lg leading-relaxed text-text-muted">
            Ember is our AI receptionist demo. She answers every call, books
            the job, and texts you the details — 24/7, even when you&apos;re
            closed, slammed, or at lunch.
          </p>

          <div className="mb-8 max-w-lg rounded-xl border border-line bg-panel px-5 py-4">
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-text-primary">
                One flat monthly rate.
              </span>{" "}
              No contracts. No setup games. Runs alongside your existing
              number — never replaces it.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculator"
              className="rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              See what missed calls cost you
            </Link>
          </div>

          <p className="mt-4 text-xs text-text-muted-dark">
            Answer the call on the right to see how it works — then hear the
            real thing, live.
          </p>
        </div>

        {/* RIGHT: Live call card */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-sm">
            <AnimatePresence>
              {!answered && (
                <CallTimerBadge key={replayCount} reducedMotion={prefersReducedMotion} />
              )}
            </AnimatePresence>

            <motion.div
              initial={{ boxShadow: CARD_SURFACE_SHADOW }}
              animate={{ boxShadow: inView ? CARD_GLOW_SHADOW : CARD_SURFACE_SHADOW }}
              transition={{
                duration: prefersReducedMotion ? 0 : 0.6,
                delay: prefersReducedMotion ? 0 : CARD_BORDER_DELAY + CARD_BORDER_DURATION,
                ease: "easeOut",
              }}
              className="relative rounded-3xl border border-transparent bg-gradient-panel p-8"
            >
              <GlowBorder
                inView={inView}
                delay={CARD_BORDER_DELAY}
                duration={CARD_BORDER_DURATION}
                radius={24}
              />
              <div className="mb-6 flex justify-center">
                <div className="relative flex h-24 w-24 items-center justify-center">
                  {!answered && !prefersReducedMotion && (
                    <>
                      <div className="ember-ring-pulse absolute inset-0 rounded-full border-2 border-gold [animation-delay:0s]" />
                      <div className="ember-ring-pulse absolute inset-0 rounded-full border-2 border-gold [animation-delay:0.5s]" />
                      <div className="ember-ring-pulse absolute inset-0 rounded-full border-2 border-gold [animation-delay:1s]" />
                    </>
                  )}
                  {/* forged ring avatar */}
                  <div className="relative flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold bg-panel">
                    <div className="flex h-11 w-11 items-center justify-center rounded-full border border-coral">
                      <div
                        className="h-4 w-4 rounded-full"
                        style={{
                          background:
                            "radial-gradient(circle, #fff5e0 0%, #f2c870 45%, #e6a84b 100%)",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <p className="mb-0.5 text-center font-display text-lg font-bold text-text-primary">
                Ember
              </p>
              <p className="mb-4 text-center text-xs text-text-muted-dark">
                Sunforge Digital · AI receptionist
              </p>

              <div className="mb-1 flex items-center justify-center gap-1.5">
                <span
                  className={`h-1.5 w-1.5 rounded-full bg-[#6ed68c] ${
                    answered ? "" : "animate-pulse"
                  }`}
                />
                <span className="text-[11px] font-semibold uppercase tracking-wide text-[#6ed68c]">
                  {answered ? "call answered" : "incoming call"}
                </span>
              </div>

              {!answered ? (
                <div className="mt-6 flex items-center justify-center">
                  <button
                    onClick={handleCallAction}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-[#3fb86a] transition-colors hover:bg-[#4bcf7a]"
                    aria-label="Answer"
                  >
                    <Phone size={24} className="text-white" />
                  </button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                  className="mt-6"
                >
                  <div className="mb-4 rounded-xl border border-[#1e3a24] bg-[#0d1a10] px-4 py-3">
                    <p className="text-[13px] leading-relaxed text-[#8fdba3]">
                      &quot;Thanks for calling — I can get you booked in. What
                      day works best for you?&quot;
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 0 : 0.4, duration: prefersReducedMotion ? 0 : 0.3 }}
                    className="border-t border-line pt-4"
                  >
                    <p className="mb-3 text-center text-[11px] text-text-muted-dark">
                      That was a preview. Hear the real thing, live:
                    </p>
                    <a
                      href={DEMO_PHONE_TEL}
                      onClick={handleRealCtaClick}
                      className="flex w-full items-center justify-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
                    >
                      <Phone size={16} strokeWidth={2.5} />
                      Call Ember — the real demo
                    </a>
                    <button
                      onClick={handleReplay}
                      className="mt-3 w-full text-center text-[11px] text-text-muted-dark transition-colors hover:text-text-muted"
                    >
                      ↻ Replay the preview
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
