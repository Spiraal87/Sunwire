"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Phone, Zap } from "lucide-react";
import { captureEvent } from "@/lib/analytics";
import GlowBorder from "./GlowBorder";

const DEMO_PHONE_DISPLAY = "623-303-9061";
const DEMO_PHONE_TEL = "tel:+16233039061";

// Same offsets/timing as the ember particles in SignalGraphic, for a
// consistent "sparks rising" motif across the site.
const AVATAR_SPARKS = [
  { x: -14, delay: 0 },
  { x: 10, delay: 1.1 },
  { x: -30, delay: 2.2 },
  { x: 26, delay: 0.6 },
];
const CARD_BORDER_DELAY = 0.35;
const CARD_BORDER_DURATION = 1.4;
const CARD_SURFACE_SHADOW = "0 24px 48px -32px rgba(0,0,0,0.55)";
const CARD_GLOW_SHADOW =
  "0 0 0 1px rgba(230,168,75,0.24), 0 0 38px 3px rgba(230,168,75,0.2), 0 22px 52px -28px rgba(0,0,0,0.7)";

type NavigatorWithUserAgentData = Navigator & {
  userAgentData?: {
    mobile?: boolean;
  };
};

function getIsLikelyMobileDevice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") {
    return false;
  }

  const nav = navigator as NavigatorWithUserAgentData;
  if (typeof nav.userAgentData?.mobile === "boolean") {
    return nav.userAgentData.mobile;
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }

  return window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}

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

export default function EmberCallWidget({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [answered, setAnswered] = useState(false);
  const [isLikelyMobile, setIsLikelyMobile] = useState(false);
  const [replayCount, setReplayCount] = useState(0);

  useEffect(() => {
    setIsLikelyMobile(getIsLikelyMobileDevice());
  }, []);

  const handleCallAction = () => {
    captureEvent("ember_widget_answered", { placement: "homepage_ember_widget" });
    setAnswered(true);

    const isMobile = getIsLikelyMobileDevice();
    setIsLikelyMobile(isMobile);

    if (isMobile) {
      captureEvent("demo_call_started", { placement: "homepage_ember_widget" });
      window.location.href = DEMO_PHONE_TEL;
    }
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
      className="relative overflow-hidden bg-panel-2-textured px-4 pb-16 pt-6 sm:px-6 sm:pb-24 sm:pt-10"
      style={{
        // bg-panel-2-textured is a flat solid fill, so the section's own box
        // has a hard edge wherever it meets the page above/below — fade the
        // whole section (background, glow, card, content) into transparency
        // right at its own top/bottom rather than stopping in a straight line.
        maskImage: "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to bottom, transparent 0%, black 6%, black 94%, transparent 100%)",
      }}
    >
      <div className="relative mx-auto max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className={`rounded-panel border bg-gradient-panel p-6 transition-colors transition-shadow duration-1000 ease-out sm:p-10 lg:p-14 ${
          backlit ? "border-gold/25 shadow-glow" : "border-line shadow-surface"
        }`}
      >
      <div className="grid items-center gap-12 md:grid-cols-2">
        <div className="md:col-start-1 md:row-start-1">
          <h2 className="mb-6 font-display text-4xl font-bold leading-[1.12] tracking-tight text-text-primary sm:text-5xl">
            Your customer called while you were away.{" "}
            <span className="gradient-text">Ember answered.</span>
          </h2>

          <p className="max-w-lg font-body text-lg leading-relaxed text-text-muted">
            Ember is our AI receptionist demo. She answers every call, books
            the job, and texts you the details - 24/7, even when you&apos;re
            closed, slammed, or at lunch.
          </p>
        </div>

        <div className="flex justify-center md:col-start-2 md:row-start-1 md:row-span-2">
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
                <div className="relative h-32 w-32">
                  <div className="absolute inset-0 overflow-hidden rounded-full border-2 border-gold bg-panel">
                    <Image
                      src="/images/ember-persona.png"
                      alt="Ember, Sunforge Digital's AI receptionist persona"
                      fill
                      sizes="128px"
                      className="scale-[1.2] object-cover object-[center_22%]"
                    />
                  </div>
                  {!prefersReducedMotion &&
                    AVATAR_SPARKS.map((spark, i) => (
                      <motion.div
                        key={i}
                        className="absolute h-1 w-1 rounded-full bg-[#F2C870]"
                        style={{ left: `calc(50% + ${spark.x}px)`, top: "10%" }}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 0.9, 0], y: -28 }}
                        transition={{
                          duration: 3.2,
                          repeat: Infinity,
                          ease: "easeOut",
                          delay: spark.delay,
                        }}
                      />
                    ))}
                </div>
              </div>

              <p className="mb-0.5 text-center font-display text-lg font-bold text-text-primary">
                Ember
              </p>
              <p className="mb-4 text-center text-xs text-text-muted-dark">
                Sunforge Digital &middot; AI receptionist
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
                  <div className="relative flex h-24 w-24 items-center justify-center">
                    {!prefersReducedMotion && (
                      <>
                        <div className="ember-ring-pulse absolute inset-0 rounded-full border-2 border-[#3fb86a] [animation-delay:0s]" />
                        <div className="ember-ring-pulse absolute inset-0 rounded-full border-2 border-[#3fb86a] [animation-delay:0.5s]" />
                        <div className="ember-ring-pulse absolute inset-0 rounded-full border-2 border-[#3fb86a] [animation-delay:1s]" />
                      </>
                    )}
                    <button
                      onClick={handleCallAction}
                      className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[#3fb86a] transition-colors hover:bg-[#4bcf7a]"
                      aria-label="Answer"
                    >
                      <Phone size={24} className="text-white" />
                    </button>
                  </div>
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
                      &quot;Thanks for calling - I can get you booked in. What
                      day works best for you?&quot;
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      delay: prefersReducedMotion ? 0 : 0.4,
                      duration: prefersReducedMotion ? 0 : 0.3,
                    }}
                    className="border-t border-line pt-4"
                  >
                    <p className="mb-3 text-center text-[11px] text-text-muted-dark">
                      {isLikelyMobile
                        ? "Calling the live demo now. If nothing opened, use the number below:"
                        : "Scan to call from your phone, or dial the number below:"}
                    </p>

                    {isLikelyMobile ? (
                      <a
                        href={DEMO_PHONE_TEL}
                        onClick={handleRealCtaClick}
                        className="block text-center font-mono text-base text-text-primary transition-colors hover:text-gold"
                      >
                        {DEMO_PHONE_DISPLAY}
                      </a>
                    ) : (
                      <p className="text-center font-mono text-base text-text-primary">
                        {DEMO_PHONE_DISPLAY}
                      </p>
                    )}

                    {!isLikelyMobile && (
                      <div className="mt-5 flex flex-col items-center gap-2 border-t border-line pt-5">
                        <div className="rounded-card bg-white p-2">
                          <Image
                            src="/images/demo-qr.png"
                            alt="QR code that calls the AI demo line when scanned"
                            width={112}
                            height={112}
                            className="h-28 w-28"
                          />
                        </div>
                        <p className="max-w-[200px] text-center font-body text-xs text-text-muted-dark">
                          On a computer? Scan to call from your phone.
                        </p>
                      </div>
                    )}

                    <button
                      onClick={handleReplay}
                      className="mt-4 w-full text-center text-[11px] text-text-muted-dark transition-colors hover:text-text-muted"
                    >
                      Replay the preview
                    </button>
                  </motion.div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        <div className="md:col-start-1 md:row-start-2">
          <div className="mb-8 max-w-lg rounded-xl border border-line bg-panel px-5 py-4">
            <p className="text-sm text-text-muted">
              <span className="font-semibold text-text-primary">
                One flat monthly rate.
              </span>{" "}
              No contracts. No setup games. Runs alongside your existing
              number - never replaces it.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/calculator"
              onClick={() =>
                captureEvent("cta_clicked", {
                  cta: "missed_call_calculator",
                  placement: "homepage_ember_widget",
                })
              }
              className="rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              See what missed calls cost you
            </Link>
          </div>

          <p className="mt-4 text-xs text-text-muted-dark">
            Answer the call on the right to see how it works - then hear the
            real thing, live.
          </p>
        </div>
      </div>
      </motion.div>
      </div>
    </section>
  );
}