"use client";

import { useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const DEFAULT_RADIUS = 20;
const GLOW_STROKE_WIDTH = 9;
const LINE_STROKE_WIDTH = 2.5;

export default function GlowBorder({
  inView,
  delay = 0,
  duration = 2.6,
  radius = DEFAULT_RADIUS,
}: {
  inView: boolean;
  delay?: number;
  duration?: number;
  radius?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const gradientId = useId();
  const filterId = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const el = ref.current?.parentElement;
    if (!el) return;

    const updateSize = () => {
      const { width, height } = el.getBoundingClientRect();
      setSize({ w: width, h: height });
    };

    updateSize();

    const observer = new ResizeObserver(() => {
      updateSize();
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  const revealed = prefersReducedMotion || hasDrawn;
  const glowInset = GLOW_STROKE_WIDTH / 2;
  const lineInset = LINE_STROKE_WIDTH / 2;
  const glowWidth = Math.max(0, w - GLOW_STROKE_WIDTH);
  const glowHeight = Math.max(0, h - GLOW_STROKE_WIDTH);
  const lineWidth = Math.max(0, w - LINE_STROKE_WIDTH);
  const lineHeight = Math.max(0, h - LINE_STROKE_WIDTH);
  const glowRadius = Math.max(0, Math.min(radius, glowWidth / 2, glowHeight / 2));
  const lineRadius = Math.max(0, Math.min(radius, lineWidth / 2, lineHeight / 2));

  const drawProps = revealed
    ? {}
    : {
        initial: { pathLength: 0 },
        animate: inView ? { pathLength: 1 } : { pathLength: 0 },
        transition: !inView ? { duration: 0 } : { duration, delay, ease: "easeInOut" },
        onAnimationComplete: () => {
          if (inView) setHasDrawn(true);
        },
      };

  return (
    <div ref={ref} className="pointer-events-none absolute -inset-px">
      {w > 0 && h > 0 && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2C870" />
              <stop offset="50%" stopColor="#E6A84B" />
              <stop offset="100%" stopColor="#D38A34" />
            </linearGradient>
            <filter id={filterId} x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          <motion.rect
            x={glowInset}
            y={glowInset}
            width={glowWidth}
            height={glowHeight}
            rx={glowRadius}
            ry={glowRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={GLOW_STROKE_WIDTH}
            strokeLinejoin="round"
            filter={`url(#${filterId})`}
            opacity={0.9}
            {...drawProps}
          />

          <motion.rect
            x={lineInset}
            y={lineInset}
            width={lineWidth}
            height={lineHeight}
            rx={lineRadius}
            ry={lineRadius}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth={LINE_STROKE_WIDTH}
            strokeLinejoin="round"
            {...drawProps}
          />
        </svg>
      )}
    </div>
  );
}