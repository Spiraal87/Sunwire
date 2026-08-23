import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Colors matching the site's existing amber/dark palette
const BG = "#0a0806";
const AMBER = "#ffb020";
const AMBER_BRIGHT = "#ffc94d";
const WHITE = "#f5f5f0";
const MUTED = "#a89a86";
const PANEL_BORDER = "#3a2c18";

const statBoxes = [
  { label: "250", sub: "calls/mo" },
  { label: "28%", sub: "unanswered" },
  { label: "1", sub: "location" },
  { label: "$210", sub: "per job" },
  { label: "70%", sub: "available capacity" },
  { label: "6 hrs/week", sub: "on routine calls" },
];

function StatBox({
  label,
  sub,
  delayFrames,
}: {
  label: string;
  sub: string;
  delayFrames: number;
}) {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delayFrames,
    fps,
    config: { damping: 14, stiffness: 140, mass: 0.6 },
  });

  const scale = interpolate(progress, [0, 1], [0.9, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        border: `1px solid ${PANEL_BORDER}`,
        borderRadius: 12,
        padding: "18px 14px",
        textAlign: "center",
        opacity,
        transform: `scale(${scale})`,
        background: "rgba(255,255,255,0.02)",
      }}
    >
      <div style={{ fontSize: 30, fontWeight: 800, color: AMBER_BRIGHT }}>
        {label}
      </div>
      <div style={{ fontSize: 15, color: MUTED, marginTop: 2 }}>{sub}</div>
    </div>
  );
}

export const MissedCallsAd: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline: fades/slides in 0-1s
  const headlineProgress = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const headlineY = interpolate(headlineProgress, [0, 1], [24, 0]);
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Results callout: 4-6s (frame 120-180), scale-emphasis entrance
  const resultProgress = spring({
    frame: frame - 120,
    fps,
    config: { damping: 12, stiffness: 130, mass: 0.7 },
  });
  const resultScale = interpolate(resultProgress, [0, 1], [0.85, 1]);
  const resultOpacity = interpolate(resultProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // CTA: 6-8s (frame 180-240), fade in then a single gentle pulse
  const ctaFadeProgress = spring({
    frame: frame - 180,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const ctaOpacity = interpolate(ctaFadeProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const pulse =
    frame > 200 && frame < 230
      ? 1 + Math.sin(((frame - 200) / 30) * Math.PI) * 0.04
      : 1;

  // Footer: 8-10s (frame 240-300)
  const footerProgress = spring({
    frame: frame - 240,
    fps,
    config: { damping: 16, stiffness: 120 },
  });
  const footerOpacity = interpolate(footerProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "Arial, sans-serif",
        padding: "60px 56px",
        color: WHITE,
      }}
    >
      {/* Headline */}
      <div
        style={{
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
          fontSize: 52,
          fontWeight: 900,
          lineHeight: 1.08,
          textAlign: "center",
          marginTop: 20,
        }}
      >
        WHAT ARE{" "}
        <span style={{ color: AMBER }}>MISSED CALLS</span> ACTUALLY{" "}
        <span style={{ color: AMBER }}>COSTING YOU?</span>
      </div>

      {/* Stat grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 16,
          marginTop: 56,
        }}
      >
        {statBoxes.map((box, i) => (
          <StatBox
            key={box.label}
            label={box.label}
            sub={box.sub}
            delayFrames={30 + i * 6}
          />
        ))}
      </div>

      {/* Results callout */}
      <div
        style={{
          opacity: resultOpacity,
          transform: `scale(${resultScale})`,
          marginTop: 48,
          border: `1px solid ${AMBER}`,
          borderRadius: 14,
          padding: "22px 20px",
          textAlign: "center",
          background: "rgba(255,176,32,0.05)",
        }}
      >
        <div style={{ fontSize: 14, color: MUTED, letterSpacing: 1 }}>
          ESTIMATED MONTHLY REVENUE LEAK
        </div>
        <div
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: AMBER_BRIGHT,
            marginTop: 6,
          }}
        >
          $3,087–$10,290
          <span style={{ fontSize: 20, color: MUTED }}> /mo</span>
        </div>
      </div>

      {/* CTA */}
      <div
        style={{
          opacity: ctaOpacity,
          transform: `scale(${pulse})`,
          marginTop: 40,
          background: AMBER,
          color: "#1a1206",
          borderRadius: 40,
          padding: "18px 0",
          textAlign: "center",
          fontSize: 26,
          fontWeight: 800,
        }}
      >
        CHECK FREE CALCULATOR →
      </div>

      {/* Footer */}
      <div
        style={{
          opacity: footerOpacity,
          marginTop: 32,
          textAlign: "center",
          fontSize: 20,
          color: AMBER,
          fontWeight: 700,
        }}
      >
        sunforgedigital.com &nbsp;|&nbsp; 719-424-5680
      </div>
    </AbsoluteFill>
  );
};
