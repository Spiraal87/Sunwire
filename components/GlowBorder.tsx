"use client";

import { motion, useReducedMotion } from "framer-motion";

// Dim baseline ring - always fully present, doesn't move. Gives the border a
// constant presence even before/without the comet passing over any given spot.
const BASE_RING = "linear-gradient(135deg, #F2C870, #E6A84B 50%, #D38A34)";

// A bright arc (~16deg core, soft fades on either side) surrounded by
// transparent for the rest of the circle. Rotating this continuously reads
// as a distinct light "chasing" around the ring, rather than the whole ring
// shifting hue at once.
const COMET =
  "conic-gradient(from 0deg, transparent 0deg, transparent 10deg, #F2C870 40deg, #FFF3D6 48deg, #F2C870 56deg, transparent 90deg, transparent 360deg)";
const COMET_LAP_SECONDS = 4.5;

// A ring rendered via the CSS "padding + mask-composite: exclude" trick: the
// mask carves out the content-box, leaving only the padding area (the ring)
// visible. The gradient itself lives on an oversized child that rotates
// freely underneath the (static) mask, so the highlight sweeps around the
// ring without the ring's own geometry ever moving - unlike rotating the
// whole element, which would visibly tilt a non-square card's corners.
function MaskedRing({
  padding,
  blur,
  opacity,
  background,
  rotate,
}: {
  padding: number;
  blur?: number;
  opacity: number;
  background: string;
  rotate: boolean;
}) {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{
        borderRadius: "inherit",
        padding,
        opacity,
        filter: blur ? `blur(${blur}px)` : undefined,
        WebkitMask:
          "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box",
        mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0) border-box",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      {rotate ? (
        <motion.div
          className="absolute inset-[-50%]"
          style={{ background }}
          animate={{ rotate: 360 }}
          transition={{ duration: COMET_LAP_SECONDS, ease: "linear", repeat: Infinity }}
        />
      ) : (
        <div className="absolute inset-0" style={{ background }} />
      )}
    </div>
  );
}

export default function GlowBorder({
  inView,
  delay = 0,
  duration = 1.4,
  radius = 20,
}: {
  inView: boolean;
  delay?: number;
  duration?: number;
  radius?: number;
}) {
  const prefersReducedMotion = useReducedMotion();
  const canAnimate = !prefersReducedMotion;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-px"
      style={{ borderRadius: radius }}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : duration,
        delay: prefersReducedMotion ? 0 : delay,
        ease: "easeOut",
      }}
    >
      <MaskedRing
        padding={2.5}
        opacity={canAnimate ? 0.55 : 1}
        background={BASE_RING}
        rotate={false}
      />

      {canAnimate && (
        <>
          {/* soft glow trail following the comet */}
          <MaskedRing padding={7} blur={6} opacity={0.8} background={COMET} rotate />
          {/* crisp bright comet on top */}
          <MaskedRing padding={2.5} opacity={1} background={COMET} rotate />
        </>
      )}
    </motion.div>
  );
}
