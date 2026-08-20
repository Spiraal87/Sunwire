"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const examples = [
  {
    icon: "/images/icon-revenue.svg",
    iconAlt: "Revenue growth icon",
    label: "Captured revenue",
    value: "~$2,400/mo",
    kicker: "1 missed weekday call at a $120 average ticket",
    text: "A simple calculator-style example: roughly 20 missed jobs in a month can add up fast.",
  },
  {
    icon: "/images/icon-time-saved.svg",
    iconAlt: "Time saved icon",
    label: "Time saved",
    value: "1 hr/day",
    kicker: "Office time recovered",
    text: "That is time your team can spend helping customers instead of answering the same repetitive questions.",
  },
  {
    icon: "/images/icon-website.svg",
    iconAlt: "Website icon",
    label: "Stronger conversion",
    value: "Same traffic",
    kicker: "More calls from clearer pages",
    text: "A stronger first impression can turn existing demand into more real reach-outs instead of more drop-off.",
  },
];

export default function ROI({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const panelClassName = `rounded-panel border bg-gradient-panel transition-colors transition-shadow duration-1000 ease-out ${
    backlit ? "forge-lit-panel" : "border-line shadow-surface"
  }`;

  return (
    <section className="mx-auto max-w-6xl px-6 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mb-14 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Small Improvements. Big Results.
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Illustrative examples
        </span>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className={`${panelClassName} overflow-hidden`}
        >
          <div className="flex h-full flex-col p-8 sm:p-10">
            <div className="flex flex-col justify-center">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--steel-blue)]">
                What better handling looks like
              </p>
              <h3 className="mt-3 font-display text-2xl font-semibold text-text-primary sm:text-3xl">
                Caller captured. Urgency noted. Team in the loop.
              </h3>
              <p className="mt-4 font-body text-base leading-relaxed text-text-muted sm:text-lg">
                The point is not a flashy dashboard. It is a cleaner handoff: the issue gets
                captured, the next step gets handled, and your team is not left piecing things
                together from voicemail.
              </p>
              <ul className="mt-6 space-y-3">
                <li className="flex items-start gap-3 font-body text-sm text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-[color:var(--steel-blue)]"
                  />
                  The customer gets a faster response instead of dead air.
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-[color:var(--steel-blue)]"
                  />
                  Your team gets the details they need without chasing them down.
                </li>
                <li className="flex items-start gap-3 font-body text-sm text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-[color:var(--steel-blue)]"
                  />
                  Busy moments feel more handled and less leaky.
                </li>
              </ul>
            </div>

            <div className="mt-8 flex justify-center border-t border-line/80 bg-[radial-gradient(circle_at_50%_30%,rgba(230,168,75,0.14),transparent_58%),linear-gradient(180deg,rgba(18,15,13,0.32)_0%,rgba(13,10,9,0.82)_100%)] px-6 pb-4 pt-8 sm:px-8 sm:pt-10">
              <div className="w-full max-w-[320px] rounded-panel border border-gold/30 bg-[linear-gradient(180deg,rgba(30,23,18,0.92)_0%,rgba(18,14,11,0.96)_100%)] p-3 shadow-surface sm:max-w-[420px] sm:p-4">
                <div className="relative overflow-hidden rounded-[22px] sm:rounded-[26px]">
                <Image
                  src="/images/a1150029-dab7-4a91-b474-3f80483f0389.png"
                  alt="Phone standing on a desk showing a call handoff summary with a captured caller, service issue, booked appointment, and notifications sent"
                  width={1448}
                  height={1086}
                  quality={90}
                  sizes="(min-width: 1024px) 28vw, 70vw"
                  className="h-auto w-full drop-shadow-[0_24px_48px_rgba(0,0,0,0.45)]"
                />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-6">
          {examples.map((example, i) => (
            <motion.div
              key={example.label}
              initial={{ opacity: 0, y: distance }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{
                duration: prefersReducedMotion ? 0.2 : 0.6,
                ease: "easeOut",
                delay: i * 0.08,
              }}
              className={`${panelClassName} p-8 sm:p-10`}
            >
              <div className="flex items-center gap-3">
                <img
                  src={example.icon}
                  alt={example.iconAlt}
                  width={80}
                  height={80}
                  className="h-8 w-8 sm:h-9 sm:w-9"
                />
                <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
                  {example.label}
                </p>
              </div>
              <p className="mt-5 font-display text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
                {example.value}
              </p>
              <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.14em] text-gold/90">
                <span className="text-[color:var(--steel-blue)]">{example.kicker}</span>
              </p>
              <p className="mt-4 font-body text-base text-text-muted">{example.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <p className="mt-10 font-mono text-xs text-text-muted-dark">
        Illustrative examples only - not a guarantee of results. Revenue example assumes one missed
        weekday job and a $120 average ticket.
      </p>
    </section>
  );
}
