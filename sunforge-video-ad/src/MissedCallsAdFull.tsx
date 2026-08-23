import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const BG = "#0a0806";
const AMBER = "#ffb020";
const AMBER_BRIGHT = "#ffc94d";
const WHITE = "#f5f5f0";
const MUTED = "#a89a86";
const PANEL_BORDER = "#3a2c18";
const PANEL_BG = "#120d08";
const AMBER_TEXT_DARK = "#1a1206";

// ---- Timing map (30fps) ----
const HEADLINE_IN_END = 30; // 0-1s
const PHONE_IN_END = 45; // 1-1.5s
const TAB_BEAT_START = 45; // tabs appear as soon as the panel does
const TAB_BEAT_DURATION = 30; // 1s: "Home Services" gets tapped/selected
const SLIDER_DURATION = 66; // 2.2s each
const SLIDER1_START = TAB_BEAT_START + TAB_BEAT_DURATION; // 75
const SLIDER2_START = SLIDER1_START + SLIDER_DURATION; // 141
const SLIDER3_START = SLIDER2_START + SLIDER_DURATION; // 207
const SLIDERS_END = SLIDER3_START + SLIDER_DURATION; // 273
const RESULTS_START = SLIDERS_END + 12; // 285
const RESULTS_HOLD_EXTRA = 60; // +2s extra hold so numbers are readable
const RESULTS_END = RESULTS_START + 90 + RESULTS_HOLD_EXTRA; // 435
const CROSSFADE_START = RESULTS_END; // 435
const CROSSFADE_DURATION = 24; // 0.8s
const CROSSFADE_END = CROSSFADE_START + CROSSFADE_DURATION; // 459
const HOLD_DURATION = 75; // 2.5s hold on the static ad
const TOTAL_FRAMES = CROSSFADE_END + HOLD_DURATION; // 534 (17.8s)

export { TOTAL_FRAMES };

function clampProgress(frame: number, start: number, duration: number) {
  return Math.max(0, Math.min(1, (frame - start) / duration));
}

function easedProgress(frame: number, start: number, duration: number) {
  const p = clampProgress(frame, start, duration);
  return Easing.out(Easing.cubic)(p);
}

// ---- Business type tabs ----
const businessTypes = [
  "Restaurant / Bar",
  "Home Services",
  "Bar / Nightlife",
  "Other / Retail",
];
const SELECTED_TAB = "Home Services";

function BusinessTypeTabs({ startFrame }: { startFrame: number }) {
  const frame = useCurrentFrame();
  const rowOpacity = interpolate(clampProgress(frame, startFrame, 10), [0, 1], [0, 1]);
  const selectProgress = easedProgress(frame, startFrame + 6, TAB_BEAT_DURATION - 6);

  return (
    <div
      style={{
        opacity: rowOpacity,
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        marginBottom: 22,
      }}
    >
      {businessTypes.map((label) => {
        const selected = label === SELECTED_TAB ? selectProgress : 0;
        return (
          <div
            key={label}
            style={{
              position: "relative",
              padding: "9px 16px",
              borderRadius: 999,
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {/* outline (unselected) layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                border: `1px solid ${PANEL_BORDER}`,
                opacity: 1 - selected,
              }}
            />
            {/* filled (selected) layer */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 999,
                background: AMBER,
                opacity: selected,
              }}
            />
            <span style={{ position: "relative", display: "inline-block" }}>
              <span style={{ opacity: 1 - selected, color: MUTED }}>{label}</span>
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  opacity: selected,
                  color: AMBER_TEXT_DARK,
                }}
              >
                {label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
}

type SliderConfig = {
  index: number;
  title: string;
  minLabel: string;
  maxLabel: string;
  minVal: number;
  targetVal: number;
  targetPercent: number; // 0-1 position on track
  helper: string;
  format: (v: number) => string;
};

const sliders: SliderConfig[] = [
  {
    index: 1,
    title: "Calls per month",
    minLabel: "50",
    maxLabel: "1,000+",
    minVal: 50,
    targetVal: 250,
    targetPercent: (250 - 50) / (1000 - 50),
    helper: "Typical range for your business",
    format: (v) => `${Math.round(v)} calls/mo`,
  },
  {
    index: 2,
    title: "Unanswered rate",
    minLabel: "5%",
    maxLabel: "70%",
    minVal: 5,
    targetVal: 28,
    targetPercent: (28 - 5) / (70 - 5),
    helper: "Industry average: 20–35%",
    format: (v) => `${Math.round(v)}%`,
  },
  {
    index: 3,
    title: "Average job value",
    minLabel: "$50",
    maxLabel: "$1,000+",
    minVal: 50,
    targetVal: 210,
    targetPercent: (210 - 50) / (1000 - 50),
    helper: "Typical range for your area",
    format: (v) => `$${Math.round(v)} per job`,
  },
];

const sliderStarts = [SLIDER1_START, SLIDER2_START, SLIDER3_START];

function SliderRow({ config, startFrame }: { config: SliderConfig; startFrame: number }) {
  const frame = useCurrentFrame();
  const progress = easedProgress(frame, startFrame, SLIDER_DURATION * 0.7);
  const rowOpacity = interpolate(
    clampProgress(frame, startFrame, 10),
    [0, 1],
    [0, 1]
  );

  const currentVal = config.minVal + (config.targetVal - config.minVal) * progress;
  const handlePercent = progress * config.targetPercent * 100;

  const helperOpacity = interpolate(
    clampProgress(frame, startFrame + SLIDER_DURATION * 0.7, 15),
    [0, 1],
    [0, 1]
  );

  return (
    <div style={{ opacity: rowOpacity, marginBottom: 22 }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 20,
          fontWeight: 700,
          color: WHITE,
        }}
      >
        <span>
          {config.index}. {config.title}
        </span>
        <span style={{ color: AMBER_BRIGHT }}>{config.format(currentVal)}</span>
      </div>

      {/* Track */}
      <div
        style={{
          position: "relative",
          height: 8,
          background: "#26200f",
          borderRadius: 4,
          marginTop: 12,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            height: "100%",
            width: `${handlePercent}%`,
            background: AMBER,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${handlePercent}%`,
            top: "50%",
            transform: "translate(-50%, -50%)",
            width: 22,
            height: 22,
            borderRadius: "50%",
            background: AMBER_BRIGHT,
            boxShadow: `0 0 12px ${AMBER}`,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 13,
          color: MUTED,
          marginTop: 6,
        }}
      >
        <span>{config.minLabel}</span>
        <span>{config.maxLabel}</span>
      </div>

      <div style={{ fontSize: 13, color: MUTED, opacity: helperOpacity, marginTop: 4 }}>
        {config.helper}
      </div>
    </div>
  );
}

export const MissedCallsAdFull: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Headline
  const headlineProgress = spring({ frame, fps, config: { damping: 16, stiffness: 120 } });
  const headlineY = interpolate(headlineProgress, [0, 1], [24, 0]);
  const headlineOpacity = interpolate(headlineProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const headlineScale = interpolate(
    clampProgress(frame, HEADLINE_IN_END, 15),
    [0, 1],
    [1, 0.62]
  );
  const headlineShiftUp = interpolate(
    clampProgress(frame, HEADLINE_IN_END, 15),
    [0, 1],
    [0, -300]
  );

  // Phone panel
  const phoneProgress = spring({
    frame: frame - PHONE_IN_END + 15,
    fps,
    config: { damping: 16, stiffness: 110 },
  });
  const phoneOpacity = interpolate(phoneProgress, [0, 1], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const phoneScale = interpolate(phoneProgress, [0, 1], [0.92, 1]);

  // Results
  const resultLine1 = interpolate(clampProgress(frame, RESULTS_START, 20), [0, 1], [0, 1]);
  const resultLine2 = interpolate(clampProgress(frame, RESULTS_START + 20, 20), [0, 1], [0, 1]);
  const resultLine3 = interpolate(clampProgress(frame, RESULTS_START + 40, 20), [0, 1], [0, 1]);
  const resultScale = interpolate(
    spring({ frame: frame - RESULTS_START, fps, config: { damping: 12, stiffness: 130 } }),
    [0, 1],
    [0.9, 1]
  );

  // Crossfade: animated scene fades out while the static ad fades in
  const crossfadeProgress = clampProgress(frame, CROSSFADE_START, CROSSFADE_DURATION);
  const sceneOpacity = interpolate(crossfadeProgress, [0, 1], [1, 0]);
  const staticImageOpacity = interpolate(crossfadeProgress, [0, 1], [0, 1]);

  const showScene = frame < CROSSFADE_END;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: BG,
        fontFamily: "Arial, sans-serif",
        color: WHITE,
      }}
    >
      {showScene && (
        <AbsoluteFill style={{ opacity: sceneOpacity, alignItems: "center" }}>
          {/* Persistent brand logo lockup, quiet top-left presence throughout */}
          <Img
            src={staticFile("sunforge_logo_full.svg")}
            style={{
              position: "absolute",
              top: 36,
              left: 40,
              height: 34,
              width: "auto",
            }}
          />

          {/* Headline */}
          <div
            style={{
              opacity: headlineOpacity,
              transform: `translateY(${headlineY + headlineShiftUp}px) scale(${headlineScale})`,
              fontSize: 46,
              fontWeight: 900,
              lineHeight: 1.1,
              textAlign: "center",
              marginTop: 70,
              padding: "0 50px",
            }}
          >
            WHAT ARE <span style={{ color: AMBER }}>MISSED CALLS</span> ACTUALLY{" "}
            <span style={{ color: AMBER }}>COSTING YOU?</span>
          </div>

          {/* Phone / calculator panel */}
          <div
            style={{
              opacity: phoneOpacity,
              transform: `scale(${phoneScale})`,
              marginTop: -60,
              width: 620,
              border: `2px solid ${PANEL_BORDER}`,
              borderRadius: 32,
              background: PANEL_BG,
              padding: "28px 32px",
              boxShadow: `0 0 40px rgba(255,176,32,0.08)`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                letterSpacing: 1,
                color: AMBER,
                fontWeight: 700,
                marginBottom: 18,
              }}
            >
              SUNFORGE MISSED-CALL CALCULATOR
            </div>

            <BusinessTypeTabs startFrame={TAB_BEAT_START} />

            {sliders.map((s, i) => (
              <SliderRow key={s.title} config={s} startFrame={sliderStarts[i]} />
            ))}

            {/* Results inside the same panel */}
            <div
              style={{
                marginTop: 16,
                paddingTop: 18,
                borderTop: `1px solid ${PANEL_BORDER}`,
              }}
            >
              <div style={{ opacity: resultLine1, transform: `scale(${resultScale})` }}>
                <div style={{ fontSize: 12, color: MUTED, letterSpacing: 1 }}>
                  ESTIMATED MONTHLY REVENUE LEAK
                </div>
                <div style={{ fontSize: 34, fontWeight: 800, color: AMBER_BRIGHT }}>
                  $3,087–$10,290
                  <span style={{ fontSize: 16, color: MUTED }}> /mo</span>
                </div>
              </div>

              <div style={{ opacity: resultLine2, marginTop: 10 }}>
                <div style={{ fontSize: 12, color: MUTED, letterSpacing: 1 }}>
                  ESTIMATED ANNUAL REVENUE LEAK
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: AMBER_BRIGHT }}>
                  $37,044–$123,480<span style={{ fontSize: 13, color: MUTED }}> /year</span>
                </div>
              </div>

              <div style={{ opacity: resultLine3, marginTop: 10 }}>
                <div style={{ fontSize: 12, color: MUTED, letterSpacing: 1 }}>
                  PHONE TIME YOU'D GET BACK
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: WHITE }}>6 hrs/wk</div>
              </div>
            </div>
          </div>
        </AbsoluteFill>
      )}

      {/* Crossfade target: the actual static ad, full-bleed */}
      <Img
        src={staticFile("reference-ad-image.png")}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: staticImageOpacity,
        }}
      />
    </AbsoluteFill>
  );
};
