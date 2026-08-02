"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import SignalGraphic from "./SignalGraphic";

export default function SectionDivider({ litCount = 1 }: { litCount?: number }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
      className="mx-auto max-w-2xl px-6 opacity-80"
    >
      <SignalGraphic inView={inView} litCount={litCount} />
    </motion.div>
  );
}
