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

const RADII = [42, 60, 78, 96, 114, 132];
const RING_DRAW_DURATION = 1.2;
const RING_BASE_DELAY = 0.3;
const RING_STAGGER = 0.15;
const GLOW_STAGES = [
  { rx: 185, ry: 60, opacity: 0.5 },
  { rx: 230, ry: 72, opacity: 0.62 },
  { rx: 280, ry: 88, opacity: 0.74 },
  { rx: 340, ry: 108, opacity: 0.87 },
  { rx: 420, ry: 135, opacity: 1 },
];
const EMBERS = [
  { x: -14, delay: 0 },
  { x: 10, delay: 1.1 },
  { x: -30, delay: 2.2 },
  { x: 26, delay: 0.6 },
];

export default function SignalGraphic({
  inView,
  litCount = 1,
}: {
  inView: boolean;
  litCount?: number;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const width = 1200;
  const height = 340;
  const centerX = width / 2;
  const horizonY = 170;

  const normalizedLitCount = Math.min(Math.max(litCount, 1), RADII.length);
  const rings = RADII.slice(0, normalizedLitCount);
  const glow = GLOW_STAGES[Math.min(normalizedLitCount, GLOW_STAGES.length) - 1];
  const glareRevealDuration = RING_DRAW_DURATION + (rings.length - 1) * RING_STAGGER;

  return (
    <div className="relative aspect-[1200/340] w-full overflow-hidden">
      <img
        src="/images/sunforge-scroller.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 w-[54.5%] max-w-none -translate-x-1/2 select-none"
        style={{
          top: "-10.6%",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 42%, transparent 55%)",
          maskImage: "linear-gradient(to bottom, black 0%, black 42%, transparent 55%)",
        }}
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
        <radialGradient id="coreGlow" cx="50%" cy="50%" r="75%">
          <stop offset="0%" stopColor="#F2C870" stopOpacity="0.48" />
          <stop offset="38%" stopColor="#E6A84B" stopOpacity="0.22" />
          <stop offset="72%" stopColor="#D38A34" stopOpacity="0.07" />
          <stop offset="100%" stopColor="#D38A34" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="horizonFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F7F6F3" stopOpacity="0.14" />
          <stop offset="36%" stopColor="#F7F6F3" stopOpacity="0.14" />
          <stop offset="47%" stopColor="#F7F6F3" stopOpacity="0.03" />
          <stop offset="50%" stopColor="#F7F6F3" stopOpacity="0" />
          <stop offset="53%" stopColor="#F7F6F3" stopOpacity="0.03" />
          <stop offset="64%" stopColor="#F7F6F3" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#F7F6F3" stopOpacity="0.14" />
        </linearGradient>
        <linearGradient
          id="lowerGlareFade"
          x1={0}
          y1={horizonY}
          x2={0}
          y2={horizonY + 36}
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#fff" stopOpacity="0" />
          <stop offset="35%" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#fff" stopOpacity="1" />
        </linearGradient>
        <mask
          id="lowerGlareMask"
          maskUnits="userSpaceOnUse"
          x={0}
          y={horizonY}
          width={width}
          height={height - horizonY}
        >
          <rect
            x={0}
            y={horizonY}
            width={width}
            height={height - horizonY}
            fill="url(#lowerGlareFade)"
          />
        </mask>
        <filter id="glareBlur" x="-25%" y="-45%" width="150%" height="190%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="moltenGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <motion.ellipse
        cx={centerX}
        cy={horizonY}
        rx={glow.rx}
        ry={glow.ry}
        fill="url(#coreGlow)"
        filter="url(#glareBlur)"
        mask="url(#lowerGlareMask)"
        initial={
          reducedMotion
            ? false
            : { rx: glow.rx * 0.3, ry: glow.ry * 0.3, opacity: 0 }
        }
        animate={
          reducedMotion
            ? { rx: glow.rx, ry: glow.ry, opacity: glow.opacity }
            : inView
              ? { rx: glow.rx, ry: glow.ry, opacity: glow.opacity }
              : { rx: glow.rx * 0.3, ry: glow.ry * 0.3, opacity: 0 }
        }
        transition={
          reducedMotion || !inView
            ? { duration: 0 }
            : {
                duration: glareRevealDuration,
                delay: RING_BASE_DELAY,
                ease: "easeInOut",
              }
        }
      />

      <line
        x1={0}
        y1={horizonY}
        x2={width}
        y2={horizonY}
        stroke="url(#horizonFade)"
        strokeWidth={1}
      />

      <motion.path
        d={jaggedPath(0, centerX - 140, horizonY, 0.9)}
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
        d={jaggedPath(centerX + 140, width, horizonY, 1.1)}
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
