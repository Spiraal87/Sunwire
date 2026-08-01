"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type OrbState = "dim" | "dimFinal" | "bright" | "brightFinal";

const withoutSunforge = [
  { title: "Unranked", sub: "invisible in search" },
  { title: "Slow, dated site", sub: "visitors bounce" },
  { title: "Call rings out", sub: "no one answers" },
  { title: "Lost customer", sub: "they call the next one" },
];

const withSunforge = [
  { title: "Ranked and found", sub: "shows up in the map pack" },
  { title: "Fast, modern site", sub: "builds trust instantly" },
  { title: "AI answers 24/7", sub: "never misses a call" },
  { title: "Customer gained", sub: "appointment booked" },
];

function Orb({ state }: { state: OrbState }) {
  const prefersReducedMotion = useReducedMotion();
  const isBright = state === "bright" || state === "brightFinal";
  const isBrightFinal = state === "brightFinal";
  const isDimFinal = state === "dimFinal";

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full ${
        isBrightFinal ? "h-16 w-16 sm:h-20 sm:w-20" : "h-12 w-12 sm:h-16 sm:w-16"
      } ${isDimFinal ? "bg-panel-2" : ""}`}
      style={
        isDimFinal
          ? undefined
          : {
              background: isBright
                ? "radial-gradient(circle, #F2C870 0%, #E6A84B 45%, #D38A34 85%, transparent 100%)"
                : "radial-gradient(circle, rgba(230,168,75,0.3) 0%, rgba(211,138,52,0.16) 45%, transparent 78%)",
            }
      }
    >
      {isBrightFinal && !prefersReducedMotion && (
        <motion.span
          aria-hidden="true"
          className="absolute -inset-1.5 rounded-full border border-highlight/50"
          animate={{ scale: [1, 1.12, 1], opacity: [0.6, 0.15, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      <span
        aria-hidden="true"
        className={`absolute rounded-full border ${
          isBright
            ? "inset-[18%] border-highlight/70"
            : isDimFinal
              ? "inset-[24%] border-line"
              : "inset-[20%] border-gold/25"
        }`}
      />
      <span aria-hidden="true" className={`h-1.5 w-1.5 rounded-full ${isBright ? "bg-bg" : "bg-panel-2"}`} />
    </div>
  );
}

function Connector({ dim }: { dim: boolean }) {
  return (
    <div className="relative mt-6 flex w-6 shrink-0 items-center sm:mt-8 sm:w-10">
      <span
        aria-hidden="true"
        className={`h-px w-full ${dim ? "bg-line" : "bg-gradient-to-r from-gold to-coral"}`}
      />
      <span
        aria-hidden="true"
        className={`absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          dim ? "bg-text-muted-dark" : "bg-highlight"
        }`}
      />
    </div>
  );
}

function ScrollArrow({ direction, onClick }: { direction: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={direction === "left" ? "Scroll left" : "Scroll right"}
      className={`absolute top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-panel-2/90 text-text-primary shadow-surface backdrop-blur-sm transition-colors hover:border-gold hover:text-gold sm:h-9 sm:w-9 ${
        direction === "left" ? "left-1" : "right-1"
      }`}
    >
      <svg width="7" height="12" viewBox="0 0 7 12" fill="none" aria-hidden="true">
        <path
          d={direction === "left" ? "M6 1L1 6L6 11" : "M1 1L6 6L1 11"}
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

function OrbRow({
  label,
  items,
  dim,
}: {
  label: string;
  items: { title: string; sub: string }[];
  dim: boolean;
}) {
  return (
    <div>
      <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">{label}</p>
      <div className="mt-6 flex items-start sm:mt-8">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const state: OrbState = dim ? (isLast ? "dimFinal" : "dim") : isLast ? "brightFinal" : "bright";
          return (
            <Fragment key={item.title}>
              <div className="flex w-24 shrink-0 flex-col items-center text-center sm:w-28 md:w-auto md:flex-1">
                <Orb state={state} />
                <p
                  className={`mt-4 font-display text-xs font-semibold sm:text-sm ${
                    dim ? "text-text-muted" : "text-text-primary"
                  }`}
                >
                  {item.title}
                </p>
                <p className={`mt-1.5 font-mono text-[10px] sm:text-[11px] ${dim ? "text-text-muted-dark" : "text-text-muted"}`}>
                  {item.sub}
                </p>
              </div>
              {!isLast && <Connector dim={dim} />}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default function Funnel() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateArrows = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    const raf = requestAnimationFrame(updateArrows);
    const el = scrollRef.current;
    el?.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      cancelAnimationFrame(raf);
      el?.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, [updateArrows]);

  function scrollByAmount(direction: 1 | -1) {
    scrollRef.current?.scrollBy({ left: direction * 180, behavior: "smooth" });
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Where Businesses Lose Customers
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          The path to a customer
        </span>
      </div>

      <p className="mb-6 font-body text-sm text-text-muted">Same search, two different outcomes.</p>

      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface sm:p-10"
      >
        <div className="relative">
          {canScrollLeft && <ScrollArrow direction="left" onClick={() => scrollByAmount(-1)} />}
          {canScrollRight && <ScrollArrow direction="right" onClick={() => scrollByAmount(1)} />}
          <div ref={scrollRef} className="scrollbar-hide overflow-x-auto">
            <div className="min-w-[300px]">
              <OrbRow label="Without Sunforge" items={withoutSunforge} dim />

              <div className="my-10 border-t border-line sm:my-12" />

              <OrbRow label="With Sunforge" items={withSunforge} dim={false} />
            </div>
          </div>
        </div>

        <p className="mt-8 max-w-2xl font-body text-text-muted">
          Same search, same phone number, two different outcomes. Sunforge Digital covers every
          stage you actually control — the site that gets found and trusted, and the AI
          receptionist that never lets a call go unanswered.
        </p>
      </motion.div>
    </section>
  );
}
