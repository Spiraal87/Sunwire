"use client";

import { useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useAnimationFrame,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";

// viewBox width is arbitrary; height is derived at measure-time from the
// container's real aspect ratio so preserveAspectRatio="none" scales
// uniformly on both axes (a non-uniform stretch here previously distorted
// the blur/glow filter).
const VIEWBOX_WIDTH = 400;
const CENTER_X = VIEWBOX_WIDTH / 2;

const MOLTEN_HIGHLIGHT = "#F2C870";
const MOLTEN_GOLD = "#E6A84B";
const MOLTEN_CORAL = "#D38A34";

function debounce<Args extends unknown[]>(fn: (...args: Args) => void, ms: number) {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), ms);
  };
}

// Straight vertical line: constant x, y running from the hero section's
// bottom edge down to the lead-form card's top edge. Both are real measured
// points (see the useLayoutEffect below) — no zig-zag, no curve smoothing.
function buildPath(startY: number, endY: number) {
  return `M${CENTER_X},${startY.toFixed(1)} L${CENTER_X},${endY.toFixed(1)}`;
}

// A soft point traveling along the drawn portion of the line. Since the path
// is a straight vertical segment, this is a plain linear interpolation
// between startY/endY — no need to walk the rendered <path> geometry.
function TravelingHighlight({
  startY,
  endY,
  progress,
  reducedMotion,
}: {
  startY: number;
  endY: number;
  progress: MotionValue<number>;
  reducedMotion: boolean | null;
}) {
  const [y, setY] = useState<number | null>(null);
  const travelRef = useRef(0);
  const lastFrameRef = useRef(0);

  useAnimationFrame((time) => {
    if (reducedMotion) return;
    if (time - lastFrameRef.current < 80) return;
    lastFrameRef.current = time;

    const drawnLength = (endY - startY) * progress.get();
    if (drawnLength < 4) {
      setY(null);
      return;
    }

    travelRef.current = (travelRef.current + drawnLength * 0.004) % drawnLength;
    setY(startY + travelRef.current);
  });

  if (reducedMotion || y === null) return null;

  return <circle cx={CENTER_X} cy={y} r={5} fill={MOLTEN_HIGHLIGHT} filter="url(#energy-line-glow)" opacity={0.8} />;
}

export default function EnergyLine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  // null until the first real measurement completes — nothing is rendered
  // before that, so there's no flash of an incorrectly-positioned line and
  // no server/client markup mismatch (the server never has real layout to
  // measure, so it always renders the same "not yet measured" empty state).
  const [span, setSpan] = useState<{ startY: number; endY: number } | null>(null);
  const [viewBoxHeight, setViewBoxHeight] = useState(0);

  useLayoutEffect(() => {
    function measure() {
      const container = containerRef.current;
      if (!container) return;

      const containerRect = container.getBoundingClientRect();
      const containerWidth = containerRect.width;
      const containerHeight = container.scrollHeight || containerRect.height;
      if (!containerWidth || !containerHeight) return;

      const scale = VIEWBOX_WIDTH / containerWidth;
      const measuredHeight = containerHeight * scale;

      const heroEl = container.querySelector<HTMLElement>('[data-energy-marker="hero-bottom"]');
      // "lead-form" lives in Contact.tsx, outside this container's subtree
      // (the section the line terminates at, by design) — look it up page-wide.
      const leadFormEl = document.querySelector<HTMLElement>('[data-energy-marker="lead-form"]');
      if (!heroEl || !leadFormEl) return;

      const heroRect = heroEl.getBoundingClientRect();
      const leadFormRect = leadFormEl.getBoundingClientRect();

      const startY = (heroRect.bottom - containerRect.top) * scale;
      // The lead-form card sits below/outside this container by design (the
      // line terminates exactly at the container's own bottom edge, which is
      // that section's top edge) — clamp rather than let the SVG's own bounds
      // be exceeded.
      const endY = Math.min(measuredHeight, (leadFormRect.top - containerRect.top) * scale);

      setViewBoxHeight(measuredHeight);
      setSpan({ startY, endY });
    }

    const debouncedMeasure = debounce(measure, 200);

    measure();
    const raf = requestAnimationFrame(measure);

    const resizeObserver = new ResizeObserver(debouncedMeasure);
    if (containerRef.current) resizeObserver.observe(containerRef.current);

    window.addEventListener("resize", debouncedMeasure);
    window.addEventListener("load", measure);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener("resize", debouncedMeasure);
      window.removeEventListener("load", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 30,
    restDelta: 0.001,
  });

  const pathLength = prefersReducedMotion ? 1 : smoothProgress;
  const lineOpacity = prefersReducedMotion ? 0.6 : 1;

  const terminusOpacity = useTransform(smoothProgress, [0.94, 1], [0, 1]);
  const terminusOpacityStatic = prefersReducedMotion ? 0.5 : terminusOpacity;

  const path = span ? buildPath(span.startY, span.endY) : "";

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-10"
      aria-hidden="true"
    >
      {span && (
        <svg
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${viewBoxHeight.toFixed(0)}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full mix-blend-screen"
        >
          <defs>
            {/* Tight, contained glow — thin halo, not a wash. */}
            <filter id="energy-line-glow" x="-60%" y="-4%" width="220%" height="108%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Cross-stroke gradient — brightest at the center of the line,
                fading to the same deeper amber used at the rings' outer edge. */}
            <linearGradient
              id="energy-core-gradient"
              gradientUnits="userSpaceOnUse"
              x1={CENTER_X - 30}
              y1="0"
              x2={CENTER_X + 30}
              y2="0"
            >
              <stop offset="0%" stopColor={MOLTEN_CORAL} />
              <stop offset="50%" stopColor={MOLTEN_HIGHLIGHT} />
              <stop offset="100%" stopColor={MOLTEN_CORAL} />
            </linearGradient>
          </defs>

          <motion.path
            d={path}
            fill="none"
            stroke={MOLTEN_GOLD}
            strokeWidth={4}
            strokeLinecap="round"
            opacity={0.3 * lineOpacity}
            filter="url(#energy-line-glow)"
            style={{ pathLength }}
          />
          <motion.path
            d={path}
            fill="none"
            stroke="url(#energy-core-gradient)"
            strokeWidth={2}
            strokeLinecap="round"
            opacity={0.95 * lineOpacity}
            style={{ pathLength }}
          />
          <TravelingHighlight
            startY={span.startY}
            endY={span.endY}
            progress={smoothProgress}
            reducedMotion={prefersReducedMotion}
          />
        </svg>
      )}

      {/* Terminus "ignition" flare — same amber radial-gradient recipe used on the
          lead form's own glow (components/LeadForm.tsx), so the line's arrival
          reads as feeding directly into that section lighting up. */}
      <motion.div
        className="absolute inset-x-0 bottom-0 h-64 mix-blend-screen"
        style={{
          opacity: terminusOpacityStatic,
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(230,168,75,0.45) 0%, rgba(211,138,52,0.2) 45%, transparent 75%)",
        }}
      />
    </div>
  );
}
