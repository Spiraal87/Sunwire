"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

const proofPoints = [
  "Busy front desk, no dropped handoffs",
  "Customer-facing work and back-office work moving at the same time",
  "A business that feels handled instead of stretched thin",
];

export default function OperationsSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="px-6 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className="grid items-stretch gap-6 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div className="relative min-h-[320px] overflow-hidden rounded-panel border border-gold/30 bg-panel-2-textured shadow-surface sm:min-h-[420px]">
            <Image
              src="/images/operations-assessment-scene.png"
              alt="Busy local business front desk where a customer is being helped while operations continue in the background"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
              style={{ objectPosition: "56% center" }}
              priority={false}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,10,0.68)_0%,rgba(8,8,10,0.22)_38%,rgba(8,8,10,0.18)_100%)]" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <div className="inline-flex max-w-xl flex-col rounded-card border border-gold/35 bg-[linear-gradient(180deg,rgba(10,10,10,0.22),rgba(10,10,10,0.58))] px-5 py-4 backdrop-blur-[2px] sm:px-6 sm:py-5">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold">
                  What this looks like in real life
                </p>
                <h2 className="mt-3 font-display text-2xl font-semibold text-text-primary sm:text-3xl">
                  When the day gets busy, the business still feels handled.
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center rounded-panel border border-gold/20 bg-[linear-gradient(165deg,rgba(27,21,17,0.96),rgba(14,11,9,0.98))] p-6 shadow-surface sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[color:var(--steel-blue)]">
              Why it matters
            </p>
            <p className="mt-4 font-body text-base leading-relaxed text-text-muted sm:text-lg">
              The point is not to make a business feel more high-tech. It is to make busy moments
              feel less chaotic for the customer and less leaky for the owner.
            </p>
            <ul className="mt-6 space-y-3">
              {proofPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 font-body text-sm text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-[color:var(--steel-blue)]"
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
