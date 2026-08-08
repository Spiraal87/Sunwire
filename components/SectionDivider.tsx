"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SignalGraphic from "./SignalGraphic";

export default function SectionDivider({
  id,
  litCount = 1,
  tintSide,
  ringScale = 1,
  onIgnite,
}: {
  /** When set, makes this divider (rather than the section below it) the
   * in-page anchor target, so jumping to it keeps the forge graphic in view
   * alongside the section title instead of scrolling past it. */
  id?: string;
  litCount?: number;
  tintSide?: "top" | "bottom";
  ringScale?: number;
  /** Forwarded to SignalGraphic — fires once the ring's beam flare ignites. */
  onIgnite?: () => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div id={id} ref={ref} className="relative scroll-mt-20 pt-6 sm:scroll-mt-24 sm:pt-10">
      {tintSide === "top" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-1/2 w-screen -translate-x-1/2 bg-panel-2-textured"
          style={{
            // Fades out toward the divider's midpoint instead of stopping
            // there in a straight line.
            maskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 55%, transparent 100%)",
          }}
        />
      )}
      {tintSide === "bottom" && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-0 left-1/2 h-1/2 w-screen -translate-x-1/2 bg-panel-2-textured"
          style={{
            // Fades in from the divider's midpoint instead of starting there
            // in a straight line.
            maskImage: "linear-gradient(to bottom, transparent 0%, black 45%, black 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 45%, black 100%)",
          }}
        />
      )}
      <motion.div
        initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
        animate={inView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="relative mx-auto max-w-2xl px-6 opacity-80"
      >
        <SignalGraphic inView={inView} litCount={litCount} ringScale={ringScale} onIgnite={onIgnite} />
      </motion.div>
    </div>
  );
}
