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

export default function SignalGraphic() {
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

  const arcs = [90, 65, 42];

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Decorative graphic of a desert horizon with sun arcs, flanked by waveform signal lines"
    >
      <defs>
        <linearGradient id="signalGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F2C870" />
          <stop offset="100%" stopColor="#D38A34" />
        </linearGradient>
      </defs>

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
        animate={reducedMotion ? { strokeOpacity: 0.35 } : { strokeDashoffset: [0, -26], strokeOpacity: 0.35 }}
        transition={
          reducedMotion
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
        animate={reducedMotion ? { strokeOpacity: 0.35 } : { strokeDashoffset: [0, 26], strokeOpacity: 0.35 }}
        transition={
          reducedMotion
            ? undefined
            : { strokeDashoffset: { duration: 6, repeat: Infinity, ease: "linear" } }
        }
      />

      {arcs.map((r, i) => {
        const isInnermost = i === arcs.length - 1;
        const circumference = Math.PI * r;

        if (isInnermost) {
          return (
            <motion.path
              key={r}
              d={`M ${centerX - r} ${horizonY} A ${r} ${r} 0 0 1 ${centerX + r} ${horizonY}`}
              fill="none"
              stroke="url(#signalGradient)"
              strokeWidth={3}
              strokeLinecap="round"
              initial={
                reducedMotion
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: circumference }
              }
              animate={
                reducedMotion
                  ? { strokeDashoffset: 0 }
                  : { strokeDashoffset: 0, opacity: [1, 0.7, 1] }
              }
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : {
                      strokeDashoffset: { duration: 1.4, delay: 0.5, ease: "easeInOut" },
                      opacity: {
                        duration: 2.6,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "easeInOut",
                        delay: 1.9,
                      },
                    }
              }
              style={{ strokeDasharray: circumference }}
            />
          );
        }

        return (
          <motion.path
            key={r}
            d={`M ${centerX - r} ${horizonY} A ${r} ${r} 0 0 1 ${centerX + r} ${horizonY}`}
            fill="none"
            stroke="rgba(230,168,75,0.3)"
            strokeWidth={1.5}
            initial={false}
            animate={
              reducedMotion
                ? { opacity: 1 }
                : { opacity: [0.5, 1, 0.5] }
            }
            transition={
              reducedMotion
                ? undefined
                : {
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                    delay: i * 0.5,
                  }
            }
          />
        );
      })}
    </svg>
  );
}
