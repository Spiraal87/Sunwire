"use client";

import { motion, useReducedMotion } from "framer-motion";
import TrackedLink from "@/components/TrackedLink";
import { defaults, verticalLabels, fmt, fmtRange, computeDefaultLeak, type VerticalKey } from "@/lib/calculator";

// A lighter, non-interactive stand-in for the full CalculatorWidget — shows
// one illustrative figure using that vertical's default inputs, then hands
// off to the real calculator for anyone who wants to plug in their own
// numbers. Meant for embedding inside a vertical landing page's own section
// (which supplies its own heading/body), not as a page in itself.
export default function CalculatorTeaser({
  vertical,
  placement,
}: {
  vertical: VerticalKey;
  placement: string;
}) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const { monthly, monthlyLow, annual, annualLow } = computeDefaultLeak(vertical);
  const d = defaults[vertical];

  return (
    <motion.div
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
      className="rounded-panel border border-line bg-[linear-gradient(160deg,#1f1814,#18120f)] p-6 shadow-surface sm:p-8"
    >
      <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-text-secondary">
        <span aria-hidden="true" className="h-2 w-2 rounded-full border border-gold" />
        Illustrative example · typical single-location shop
      </div>

      <div className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
        Estimated monthly revenue leak
      </div>
      <div className="mt-1 font-display text-3xl font-bold tabular-nums text-highlight sm:text-4xl">
        {fmtRange(monthlyLow, monthly)}
      </div>
      <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-text-primary">
        {fmtRange(annualLow, annual)} / year
      </div>

      <p className="mt-4 font-mono text-xs text-text-muted-dark">
        Based on typical {verticalLabels[vertical]} numbers ({d.calls} calls/mo, {d.miss}% missed,{" "}
        {fmt(d.value)}/job) — not your own.
      </p>

      <TrackedLink
        href={`/calculator?vertical=${vertical}`}
        cta="missed_call_calculator"
        placement={placement}
        className="mt-6 inline-flex items-center gap-1.5 rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
      >
        See Your Real Number <span aria-hidden="true">→</span>
      </TrackedLink>
    </motion.div>
  );
}
