"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function jaggedPath(startX: number, endX: number, baseY: number, seed: number) {
  const points: string[] = [];
  const segments = 24;
  const width = endX - startX;
  for (let i = 0; i <= segments; i++) {
    const x = startX + (width * i) / segments;
    const noise = Math.sin(i * seed) * 10 + Math.sin(i * seed * 2.3) * 5;
    const y = baseY + noise;
    points.push(`${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return points.join(" ");
}

const BASE_RADII = [42, 60, 78, 96, 114, 132];
const RING_DRAW_DURATION = 1.2;
const RING_BASE_DELAY = 0.3;
const RING_STAGGER = 0.15;
const BASE_EMBERS = [
  { x: -14, delay: 0 },
  { x: 10, delay: 1.1 },
  { x: -30, delay: 2.2 },
  { x: 26, delay: 0.6 },
];
// Clearance derived from today's known-good numbers, so ringScale=1 reproduces
// the original output exactly: 140 - 132 and 170 - 132.
const RING_GAP_CLEARANCE = 8;
const RING_HEADROOM_CLEARANCE = 38;

// The molten-core background image (sunforge-scroller.png) is a raster layer,
// not part of the SVG viewBox, so it doesn't scale with the rings automatically.
// These calibrate its hand-tuned baseline position/size (width: 54.5%, top: -10.6%
// of the fixed 1200x340 box) against the baseline ring radius/horizon, so it can
// be recomputed proportionally for any ringScale below.
const BASE_MAX_RADIUS = BASE_RADII[BASE_RADII.length - 1]; // 132
const BASE_HORIZON_Y = BASE_MAX_RADIUS + RING_HEADROOM_CLEARANCE; // 170
const BASE_IMG_WIDTH_PERCENT = 54.5;
const BASE_IMG_TOP_PERCENT = -10.6;

// Energy beam core flare — centered exactly on the rings' own center point
// (centerX, horizonY), scaling with ringScale the same way. Its own PNG
// background doesn't fade to transparent (same issue sunforge-scroller.png
// had), so this uses mix-blend-screen instead of a mask: gray/dark pixels
// barely register against the dark divider, while the bright flare pops.
// Kept small/contained rather than the source PNG's full length so the beam
// reads as a spark at the ring's core, not a line spanning the whole divider.
const BASE_BEAM_WIDTH_PERCENT = 46;
// The sphere image (sunforge-scroller.png) is positioned by its top edge via
// its own separate calibration, not centered on horizonY the way this flare
// is — nudged to visually match the sphere's actual center once rendered.
const BEAM_VERTICAL_NUDGE_PERCENT = -0.1;
const BEAM_HORIZONTAL_NUDGE_PERCENT = -0.5;
const BEAM_FLICKER_DURATION = 0.5;
const BEAM_PULSE_DURATION = 2.6;

export default function SignalGraphic({
  inView,
  litCount = 1,
  ringScale = 1,
}: {
  inView: boolean;
  litCount?: number;
  ringScale?: number;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const RADII = BASE_RADII.map((r) => r * ringScale);
  const EMBERS = BASE_EMBERS.map((e) => ({ x: e.x * ringScale, delay: e.delay }));

  const width = 1200;
  const height = 340;
  const centerX = width / 2;

  const maxRingRadius = RADII[RADII.length - 1];
  const horizonY = maxRingRadius + RING_HEADROOM_CLEARANCE;
  const horizonGapHalfWidth = maxRingRadius + RING_GAP_CLEARANCE;

  // Scale the background image's width directly with ringScale, and reposition
  // its top edge to track the (also-scaled) offset from horizonY, so it grows
  // and resettles around the rings' new center instead of staying fixed size/place.
  const imgWidthPercent = BASE_IMG_WIDTH_PERCENT * ringScale;
  const baseImgTopOffsetFromHorizon = (BASE_IMG_TOP_PERCENT / 100) * height - BASE_HORIZON_Y;
  const imgTopPercent =
    ((horizonY + baseImgTopOffsetFromHorizon * ringScale) / height) * 100;

  const beamWidthPercent = BASE_BEAM_WIDTH_PERCENT * ringScale;
  const beamTopPercent = (horizonY / height) * 100 + BEAM_VERTICAL_NUDGE_PERCENT;

  const normalizedLitCount = Math.min(Math.max(litCount, 1), RADII.length);
  const rings = RADII.slice(0, normalizedLitCount);

  // The last ring finishes its draw-in animation at this point — the beam
  // core waits until then to flicker to life, rather than just appearing
  // immediately alongside the rings.
  const ringsCompleteAt =
    RING_BASE_DELAY + RING_DRAW_DURATION + (rings.length - 1) * RING_STAGGER;

  const [beamIgnited, setBeamIgnited] = useState(false);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const timer = setTimeout(
      () => setBeamIgnited(true),
      (ringsCompleteAt + BEAM_FLICKER_DURATION) * 1000
    );
    return () => clearTimeout(timer);
  }, [inView, reducedMotion, ringsCompleteAt]);

  return (
    <div className="relative aspect-[1200/340] w-full overflow-hidden">
      <img
        src="/images/sunforge-scroller.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 max-w-none -translate-x-1/2 select-none"
        style={{
          width: `${imgWidthPercent}%`,
          top: `${imgTopPercent}%`,
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 42%, transparent 55%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 42%, transparent 55%)",
        }}
      />
      <motion.img
        src="/images/energy%20beam%20core.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none select-none mix-blend-screen"
        style={{
          width: `${beamWidthPercent}%`,
          top: `${beamTopPercent}%`,
          left: `${50 + BEAM_HORIZONTAL_NUDGE_PERCENT}%`,
          // x/y handle the centering offset here (rather than Tailwind's
          // -translate-x/y-1/2 classes) so they compose correctly with the
          // animated scale below instead of Framer Motion's transform
          // overwriting a separately-set CSS transform.
          x: "-50%",
          y: "-50%",
          // Boosts how much light the screen-blended pixels actually
          // contribute, on top of the mix-blend-screen already brightening
          // against the dark background.
          filter: "brightness(1.5) saturate(1.15)",
        }}
        initial={{ opacity: 0, scale: 1 }}
        animate={
          reducedMotion
            ? { opacity: 1, scale: 1 }
            : !inView
              ? { opacity: 0, scale: 1 }
              : beamIgnited
                ? { opacity: [0.9, 1, 0.92, 1], scale: [1, 1.08, 1] }
                : { opacity: [0, 0.7, 0.05, 1, 0.3, 1], scale: 1 }
        }
        transition={
          reducedMotion || !inView
            ? { duration: 0 }
            : beamIgnited
              ? {
                  duration: BEAM_PULSE_DURATION,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }
              : {
                  duration: BEAM_FLICKER_DURATION,
                  delay: ringsCompleteAt,
                  ease: "easeOut",
                }
        }
      />
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Decorative graphic of a forged molten horizon with glowing arcs, flanked by circuit-like signal lines"
      >
      <defs>
        <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F2C870" />
          <stop offset="50%" stopColor="#E6A84B" />
          <stop offset="100%" stopColor="#D38A34" />
        </linearGradient>
        <linearGradient id="horizonFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F7F6F3" stopOpacity="0.14" />
          <stop offset="36%" stopColor="#F7F6F3" stopOpacity="0.14" />
          <stop offset="47%" stopColor="#F7F6F3" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#F7F6F3" stopOpacity="0" />
          <stop offset="53%" stopColor="#F7F6F3" stopOpacity="0.03" />
          <stop offset="64%" stopColor="#F7F6F3" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#F7F6F3" stopOpacity="0.14" />
        </linearGradient>
        <filter id="moltenGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <line
        x1={0}
        y1={horizonY}
        x2={width}
        y2={horizonY}
        stroke="url(#horizonFade)"
        strokeWidth={1}
      />

      <motion.path
        d={jaggedPath(0, centerX - horizonGapHalfWidth, horizonY, 0.9)}
        fill="none"
        stroke="#A8A8AC"
        strokeWidth={1.5}
        style={{ strokeDasharray: reducedMotion ? undefined : "8 5" }}
        initial={false}
        animate={
          reducedMotion || !inView
            ? { strokeOpacity: 0.35 }
            : { strokeDashoffset: [0, -26], strokeOpacity: 0.35 }
        }
        transition={
          reducedMotion || !inView
            ? undefined
            : { strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" } }
        }
      />
      <motion.path
        d={jaggedPath(centerX + horizonGapHalfWidth, width, horizonY, 1.1)}
        fill="none"
        stroke="#A8A8AC"
        strokeWidth={1.5}
        style={{ strokeDasharray: reducedMotion ? undefined : "8 5" }}
        initial={false}
        animate={
          reducedMotion || !inView
            ? { strokeOpacity: 0.35 }
            : { strokeDashoffset: [0, 26], strokeOpacity: 0.35 }
        }
        transition={
          reducedMotion || !inView
            ? undefined
            : { strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" } }
        }
      />

      {/* Soft blurred glow pass behind the crisp arcs, for a molten/forged look */}
      <g filter="url(#moltenGlow)" opacity={0.8}>
        {rings.map((r, i) => {
          const circumference = Math.PI * r;
          return (
            <motion.path
              key={`glow-${r}`}
              d={`M ${centerX - r} ${horizonY} A ${r} ${r} 0 0 1 ${centerX + r} ${horizonY}`}
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth={5}
              strokeLinecap="round"
              initial={
                reducedMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }
              }
              animate={
                reducedMotion
                  ? { strokeDashoffset: 0 }
                  : inView
                    ? { strokeDashoffset: 0 }
                    : { strokeDashoffset: circumference }
              }
              transition={
                reducedMotion || !inView
                  ? { duration: 0 }
                  : {
                      duration: RING_DRAW_DURATION,
                      delay: RING_BASE_DELAY + i * RING_STAGGER,
                      ease: "easeInOut",
                    }
              }
              style={{ strokeDasharray: circumference }}
            />
          );
        })}
      </g>

      {rings.map((r, i) => {
        const circumference = Math.PI * r;

        return (
          <motion.path
            key={r}
            d={`M ${centerX - r} ${horizonY} A ${r} ${r} 0 0 1 ${centerX + r} ${horizonY}`}
            fill="none"
            stroke="url(#signalGradient)"
            strokeWidth={3}
            strokeLinecap="round"
            initial={
              reducedMotion ? { strokeDashoffset: 0 } : { strokeDashoffset: circumference }
            }
            animate={
              reducedMotion
                ? { strokeDashoffset: 0 }
                : inView
                  ? { strokeDashoffset: 0, opacity: [1, 0.75, 1] }
                  : { strokeDashoffset: circumference }
            }
            transition={
              reducedMotion || !inView
                ? { duration: 0 }
                : {
                    strokeDashoffset: {
                      duration: RING_DRAW_DURATION,
                      delay: RING_BASE_DELAY + i * RING_STAGGER,
                      ease: "easeInOut",
                    },
                    opacity: {
                      duration: 2.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: RING_BASE_DELAY + RING_DRAW_DURATION + i * RING_STAGGER,
                    },
                  }
            }
            style={{ strokeDasharray: circumference }}
          />
        );
      })}

      {!reducedMotion &&
        EMBERS.map((ember, i) => (
          <motion.circle
            key={i}
            cx={centerX + ember.x}
            r={1.6}
            fill="#F2C870"
            initial={{ opacity: 0, cy: horizonY - 6 }}
            animate={
              inView
                ? { opacity: [0, 0.9, 0], cy: [horizonY - 6, horizonY - 70] }
                : { opacity: 0, cy: horizonY - 6 }
            }
            transition={
              inView
                ? {
                    duration: 3.2,
                    repeat: Infinity,
                    ease: "easeOut",
                    delay: ember.delay,
                  }
                : undefined
            }
          />
        ))}
      </svg>
    </div>
  );
}
