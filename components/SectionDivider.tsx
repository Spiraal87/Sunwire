"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SignalGraphic from "./SignalGraphic";

export default function SectionDivider({
  litCount = 1,
  tintSide,
  ringScale = 1,
}: {
  litCount?: number;
  tintSide?: "top" | "bottom";
  ringScale?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="relative py-6 sm:py-10">
      {tintSide === "top" && (
        <div
          className="absolute left-1/2 top-0 h-1/2 w-screen -translate-x-1/2 bg-panel-2-textured"
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
          className="absolute bottom-0 left-1/2 h-1/2 w-screen -translate-x-1/2 bg-panel-2-textured"
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
        <SignalGraphic inView={inView} litCount={litCount} ringScale={ringScale} />
      </motion.div>
    </div>
  );
}
