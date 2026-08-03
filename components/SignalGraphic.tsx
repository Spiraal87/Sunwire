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
  const height = 260;
  const centerX = width / 2;
  const horizonY = 170;

  const rings = RADII.slice(0, Math.min(Math.max(litCount, 1), RADII.length));

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Decorative graphic of a forged molten horizon with glowing arcs, flanked by circuit-like signal lines"
    >
      <defs>
        <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F2C870" />
          <stop offset="50%" stopColor="#E6A84B" />
          <stop offset="100%" stopColor="#D38A34" />
        </linearGradient>
        <radialGradient id="coreGlow" cx="50%" cy="100%" r="65%">
          <stop offset="0%" stopColor="#F2C870" stopOpacity="0.5" />
          <stop offset="55%" stopColor="#D38A34" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#D38A34" stopOpacity="0" />
        </radialGradient>
        <filter id="moltenGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
      </defs>

      <ellipse cx={centerX} cy={horizonY} rx={220} ry={90} fill="url(#coreGlow)" />

      <line
        x1={0}
        y1={horizonY}
        x2={width}
        y2={horizonY}
        stroke="rgba(247,246,243,0.14)"
        strokeWidth={1}
      />

      <motion.path
        d={jaggedPath(0, centerX - 140, horizonY, 0.9)}
        fill="none"
        stroke="#9CA6B8"
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
        stroke="#9CA6B8"
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
                  : { duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeInOut" }
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
                    strokeDashoffset: { duration: 1.2, delay: 0.3 + i * 0.15, ease: "easeInOut" },
                    opacity: {
                      duration: 2.4,
                      repeat: Infinity,
                      repeatType: "mirror",
                      ease: "easeInOut",
                      delay: 1.5 + i * 0.15,
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
  );
}
