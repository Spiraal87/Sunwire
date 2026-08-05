"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const RADIUS = 20;

function roundedRectPath(w: number, h: number, r: number) {
  return `M ${w / 2} 0
    L ${w - r} 0
    A ${r} ${r} 0 0 1 ${w} ${r}
    L ${w} ${h - r}
    A ${r} ${r} 0 0 1 ${w - r} ${h}
    L ${r} ${h}
    A ${r} ${r} 0 0 1 0 ${h - r}
    L 0 ${r}
    A ${r} ${r} 0 0 1 ${r} 0
    L ${w / 2} 0`;
}

export default function GlowBorder({
  inView,
  delay = 0,
  duration = 2.6,
}: {
  inView: boolean;
  delay?: number;
  duration?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ w: width, h: height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { w, h } = size;
  const r = Math.min(RADIUS, w / 2, h / 2);
  const perimeter = w && h ? 2 * (w - 2 * r) + 2 * (h - 2 * r) + 2 * Math.PI * r : 0;
  const path = roundedRectPath(w, h, r);

  const dashProps = {
    initial: { strokeDashoffset: prefersReducedMotion ? 0 : perimeter },
    animate:
      prefersReducedMotion
        ? { strokeDashoffset: 0 }
        : inView
          ? { strokeDashoffset: 0 }
          : { strokeDashoffset: perimeter },
    transition:
      prefersReducedMotion || !inView
        ? { duration: 0 }
        : { duration, delay, ease: "easeInOut" },
    style: { strokeDasharray: perimeter },
  };

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0">
      {w > 0 && h > 0 && (
        <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 overflow-visible">
          <defs>
            <linearGradient id="glowBorderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F2C870" />
              <stop offset="50%" stopColor="#E6A84B" />
              <stop offset="100%" stopColor="#D38A34" />
            </linearGradient>
            <filter id="borderGlow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="7" />
            </filter>
          </defs>

          {/* Wide blurred glow pass, drawn in sync behind the crisp line */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#glowBorderGradient)"
            strokeWidth={9}
            strokeLinecap="round"
            filter="url(#borderGlow)"
            opacity={0.9}
            {...dashProps}
          />

          {/* Crisp bright line on top */}
          <motion.path
            d={path}
            fill="none"
            stroke="url(#glowBorderGradient)"
            strokeWidth={2.5}
            strokeLinecap="round"
            {...dashProps}
          />
        </svg>
      )}
    </div>
  );
}
