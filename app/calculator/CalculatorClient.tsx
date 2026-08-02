"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

type VerticalKey = "restaurant" | "home" | "club" | "other";

type VerticalDefaults = {
  calls: number;
  miss: number;
  value: number;
  cap: number;
  hintCalls: string;
  hintMiss: string;
  hintValue: string;
  hintCap: string;
};

const defaults: Record<VerticalKey, VerticalDefaults> = {
  restaurant: {
    calls: 300,
    miss: 33,
    value: 65,
    cap: 55,
    hintCalls: "Typical full-service restaurant/bar",
    hintMiss: "Washington Hospitality Assoc. benchmark",
    hintValue: "Blended order + reservation value",
    hintCap:
      "Peak-hour tables/kitchen throughput is fixed, but off-peak nights and to-go orders usually have real room.",
  },
  home: {
    calls: 250,
    miss: 28,
    value: 210,
    cap: 70,
    hintCalls: "Typical single-location HVAC/plumbing/electrical shop",
    hintMiss: "Home-services industry benchmark",
    hintValue: "Blended service call + repair value",
    hintCap:
      "Most missed calls become a future scheduled job, not an instant one — capacity is more flexible than same-day capacity suggests.",
  },
  club: {
    calls: 60,
    miss: 27,
    value: 500,
    cap: 35,
    hintCalls: "VIP / private-event inquiry calls only",
    hintMiss: "Rough placeholder — no vertical-specific study exists",
    hintValue: "Conservative VIP table minimum, secondary market",
    hintCap:
      "VIP tables are genuinely fixed inventory on busy nights — recoverable share is usually smaller than other verticals.",
  },
  other: {
    calls: 200,
    miss: 30,
    value: 120,
    cap: 50,
    hintCalls: "General small-business estimate",
    hintMiss: "General SMB benchmark",
    hintValue: "General estimate — adjust to your own average sale",
    hintCap: "Depends heavily on the business — adjust to how often you're actually turning away work.",
  },
};

const tabs: { key: VerticalKey; label: string }[] = [
  { key: "restaurant", label: "Restaurant / Bar" },
  { key: "home", label: "Home Services" },
  { key: "club", label: "Bar / Nightlife" },
  { key: "other", label: "Other / Retail" },
];

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export default function CalculatorClient() {
  const [activeVertical, setActiveVertical] = useState<VerticalKey>("restaurant");
  const [calls, setCalls] = useState(defaults.restaurant.calls);
  const [miss, setMiss] = useState(defaults.restaurant.miss);
  const [value, setValue] = useState(defaults.restaurant.value);
  const [locationsInput, setLocationsInput] = useState("1");
  const [capacity, setCapacity] = useState(defaults.restaurant.cap);
  const [routineCallHours, setRoutineCallHours] = useState(6);
  const [demoNumberRevealed, setDemoNumberRevealed] = useState(false);

  const d = defaults[activeVertical];

  function applyVertical(key: VerticalKey) {
    const nd = defaults[key];
    setActiveVertical(key);
    setCalls(nd.calls);
    setMiss(nd.miss);
    setValue(nd.value);
    setCapacity(nd.cap);
  }

  function handleReset() {
    setLocationsInput("1");
    setRoutineCallHours(6);
    applyVertical(activeVertical);
  }

  const locations = Math.max(1, Number(locationsInput) || 1);
  const missPct = miss / 100;
  const capPct = capacity / 100;
  const missedCalls = calls * missPct * locations;
  const recoverable = missedCalls * capPct;
  const monthly = recoverable * value;
  const annual = monthly * 12;
  const monthlyRoutineCallHours = Math.round((routineCallHours * 52) / 12);

  return (
    <div className="calcRoot min-h-screen bg-bg">
      <div className="print:hidden">
        <Nav />
      </div>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 font-mono text-sm font-semibold uppercase tracking-wider text-gold transition-colors hover:text-highlight print:hidden"
        >
          <span aria-hidden="true">←</span> Back to Sunforge Digital
        </Link>

        <h1 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
          What are missed calls actually costing you?
        </h1>
        <p className="lede mt-3 max-w-xl font-body text-text-primary print:hidden">
          Every missed call is a customer who might just call the next business instead.
        </p>
        <ul className="mt-4 max-w-xl space-y-2 font-body text-text-muted print:hidden">
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            Start from realistic numbers for your type of business
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            Adjust anything that doesn&apos;t match your reality
          </li>
          <li className="flex items-start gap-2.5">
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
            Watch your estimated loss update instantly
          </li>
        </ul>

        <div className="tabs mt-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <div
              key={tab.key}
              className={`tab cursor-pointer rounded-full border px-4 py-2 font-body text-sm font-semibold transition-colors ${
                activeVertical === tab.key
                  ? "border-transparent bg-gradient-accent text-bg"
                  : "border-line bg-panel text-text-muted hover:border-gold"
              }`}
              onClick={() => applyVertical(tab.key)}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div className="card mt-6 rounded-panel border border-line bg-gradient-panel p-8 shadow-surface">
          <div className="field mb-6">
            <label className="flex items-baseline justify-between font-body text-sm font-semibold text-text-primary">
              Calls you get in a typical month <span className="font-mono text-coral">{calls}</span>
            </label>
            <input
              type="range"
              min={20}
              max={1500}
              step={10}
              value={calls}
              onChange={(e) => setCalls(Number(e.target.value))}
              className="calc-slider mt-2"
            />
            <div className="hint mt-1.5 font-mono text-xs text-text-muted-dark">{d.hintCalls}</div>
          </div>

          <div className="field mb-6">
            <label className="flex items-baseline justify-between font-body text-sm font-semibold text-text-primary">
              Roughly what % go unanswered <span className="font-mono text-coral">{miss}%</span>
            </label>
            <input
              type="range"
              min={5}
              max={70}
              step={1}
              value={miss}
              onChange={(e) => setMiss(Number(e.target.value))}
              className="calc-slider mt-2"
            />
            <div className="hint mt-1.5 font-mono text-xs text-text-muted-dark">{d.hintMiss}</div>
          </div>

          <div className="field mb-6">
            <label className="flex items-baseline justify-between font-body text-sm font-semibold text-text-primary">
              What&apos;s a new customer/job typically worth to you{" "}
              <span className="font-mono text-coral">{fmt(value)}</span>
            </label>
            <input
              type="range"
              min={10}
              max={1000}
              step={5}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="calc-slider mt-2"
            />
            <div className="hint mt-1.5 font-mono text-xs text-text-muted-dark">{d.hintValue}</div>
          </div>

          <div className="field mb-6">
            <div className="flex items-center gap-3">
              <label className="font-body text-sm font-semibold text-text-primary">Number of locations</label>
              <input
                type="number"
                min={1}
                max={50}
                value={locationsInput}
                onChange={(e) => setLocationsInput(e.target.value)}
                className="w-20 rounded-btn border border-line bg-panel-2 px-3 py-2 font-mono text-sm text-text-primary focus:border-gold focus:outline-none"
              />
            </div>
          </div>

          <div className="field border-t border-line pt-6">
            <label className="flex items-baseline justify-between font-body text-sm font-semibold text-text-primary">
              If every call got answered, how much of that extra business could you actually take on
              right now <span className="font-mono text-coral">{capacity}%</span>
            </label>
            <input
              type="range"
              min={10}
              max={100}
              step={5}
              value={capacity}
              onChange={(e) => setCapacity(Number(e.target.value))}
              className="calc-slider mt-2"
            />
            <div className="hint mt-1.5 font-mono text-xs text-text-muted-dark">
              Not every missed call is recoverable if you&apos;re already at capacity — this is
              normal, adjust honestly.
            </div>
          </div>

          <div className="field mt-6 border-t border-line pt-6">
            <label className="flex items-baseline justify-between font-body text-sm font-semibold text-text-primary">
              Hours a week you or your staff spend answering routine calls{" "}
              <span className="font-mono text-coral">{routineCallHours} hrs</span>
            </label>
            <input
              type="range"
              min={0}
              max={40}
              step={1}
              value={routineCallHours}
              onChange={(e) => setRoutineCallHours(Number(e.target.value))}
              className="calc-slider mt-2"
            />
            <div className="hint mt-1.5 font-mono text-xs text-text-muted-dark">
              Hours, menu, pricing, &quot;are you open Sunday&quot; - the same handful of
              questions, over and over. This one&apos;s entirely your own estimate, no industry
              number behind it.
            </div>
          </div>
        </div>

        <div className="leak-visual mt-6 flex items-center gap-6 rounded-panel border border-line bg-panel-2 p-8 shadow-surface">
          <div className="phone-icon relative h-14 w-14 shrink-0">
            <svg viewBox="0 0 54 54" width="54" height="54">
              <rect
                x="14"
                y="4"
                width="26"
                height="44"
                rx="6"
                fill="none"
                stroke="#F7F6F3"
                strokeWidth="2.5"
                opacity="0.9"
              />
              <circle cx="27" cy="42" r="1.8" fill="#F7F6F3" opacity="0.9" />
            </svg>
            <div className="drop"></div>
            <div className="drop"></div>
            <div className="drop"></div>
          </div>
          <div className="flex-1">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              Estimated monthly revenue leak
            </div>
            <div className="mt-1 font-display text-4xl font-bold tabular-nums text-text-primary">
              {fmt(monthly)}
            </div>
            <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-gold">
              {fmt(annual)} / year
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center gap-6 rounded-panel border border-line bg-gradient-panel p-8 shadow-surface">
          <div className="shrink-0 text-text-primary" aria-hidden="true">
            <svg viewBox="0 0 54 54" width="54" height="54">
              <circle
                cx="27"
                cy="27"
                r="22"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                opacity="0.92"
              />
              <path
                d="M27 15v13l9 4"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.92"
              />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              Phone time you&apos;d get back
            </div>
            <div className="mt-1 font-display text-4xl font-bold tabular-nums text-text-primary">
              {routineCallHours} hrs/wk
            </div>
            <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-gold">
              {monthlyRoutineCallHours} hrs / month
            </div>
          </div>
        </div>

        <div className="demo-cta mt-6 rounded-panel border border-gold/60 bg-gradient-panel p-8 shadow-glow print:hidden">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            This is exactly what an AI receptionist closes
          </div>
          <p className="mt-3 font-body text-text-primary">
            An AI receptionist answers every call, 24/7, captures the caller&apos;s info, and can
            schedule the appointment right then — so the missed-call side of this number stops
            growing. Hear it work on a real line before you decide anything.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="tel:6233039061"
              onClick={() => setDemoNumberRevealed(true)}
              className="rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              Call the AI demo
            </a>
            <a
              href="mailto:cdjohnsonzero@gmail.com?subject=My%20missed-call%20numbers"
              className="rounded-btn border border-line px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-gold hover:text-gold"
            >
              Contact us
            </a>
          </div>
          {demoNumberRevealed && (
            <a
              href="tel:6233039061"
              className="mt-3 inline-block font-mono text-sm text-text-muted transition-colors hover:text-gold"
            >
              623-303-9061
            </a>
          )}
        </div>

        <div className="print-summary hidden rounded-panel border border-line bg-white p-8 print:block">
          <div className="mb-4 border-b border-line pb-3">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              Business type
            </div>
            <div className="font-display text-lg font-semibold text-text-primary">
              {tabs.find((t) => t.key === activeVertical)?.label}
            </div>
          </div>

          <div className="mb-4 grid grid-cols-2 gap-y-2 font-body text-sm text-text-primary">
            <div>Calls per month</div>
            <div className="font-mono font-semibold">{calls}</div>

            <div>% of calls missed</div>
            <div className="font-mono font-semibold">{miss}%</div>

            <div>Value per customer/job</div>
            <div className="font-mono font-semibold">{fmt(value)}</div>

            <div>Locations</div>
            <div className="font-mono font-semibold">{Math.round(locations)}</div>

            <div>% of that business you could take on</div>
            <div className="font-mono font-semibold">{capacity}%</div>

            <div>Routine call time per week</div>
            <div className="font-mono font-semibold">{routineCallHours} hrs</div>

            <div>Routine call time per month</div>
            <div className="font-mono font-semibold">{monthlyRoutineCallHours} hrs</div>
          </div>

          <div className="mb-4 border-t border-line pt-4">
            <div className="font-mono text-xs font-semibold uppercase tracking-[0.1em] text-text-muted">
              Estimated monthly revenue leak
            </div>
            <div className="mt-1 font-display text-3xl font-bold tabular-nums text-text-primary">
              {fmt(monthly)}
            </div>
            <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-text-primary">
              {fmt(annual)} / year
            </div>
          </div>

          <div className="border-t border-line pt-4 font-body text-sm text-text-muted">
            <p>
              This estimate multiplies your calls per month by your missed-call rate to get missed
              calls, then applies the share of that business you said you could actually take on
              right now to get recoverable calls. Recoverable calls are multiplied by your typical
              job value and by your number of locations to get the monthly figure above; the
              annual figure is simply that number times twelve.
            </p>
            <p className="mt-2">
              These numbers are only as accurate as the inputs above — they&apos;re a
              starting-point estimate based on your own figures, not a guarantee of results.
            </p>
          </div>
        </div>

        <div className="card method mt-6 rounded-panel border border-line bg-panel p-6">
          <details>
            <summary className="cursor-pointer font-body text-sm font-semibold text-text-muted">
              Where these starting numbers come from
            </summary>
            <div className="mt-4 space-y-3 font-body text-sm text-text-muted">
              <p>
                These are decent starting points, not verified facts about any specific business.
                They&apos;re the most commonly repeated figures in this space, but the primary
                sources behind them are thinner than the volume of citations suggests — several
                trace back to a single dated study, or to companies that sell phone-answering
                products and have a direct interest in the number being large. Treat every default
                here as directional, not authoritative.
              </p>
              <p>
                The one figure in this tool backed by an independent source with no stake in the
                outcome is the home-services value-per-job range, which draws on Service Roundtable
                contractor benchmarking data. Everything else — restaurant miss rates, call volumes
                across every vertical, and all nightlife/VIP figures — is a reasonable planning
                assumption, not a citation you should repeat as settled fact.
              </p>
              <p className="text-text-muted-dark">
                This calculator exists to get a conversation started, not to hand over a defensible
                number. The only real number is the one built from your own actual call volume and
                average ticket — which is exactly what the sliders above are for.
              </p>
              <p>
                Two sliders have no benchmark behind them at all, on purpose. The first is
                &quot;how much of that extra business could you actually take on.&quot; Not every
                missed call is free money - if you&apos;re already at capacity, answering more
                calls doesn&apos;t create more tables, techs, or hours in the day. That&apos;s
                entirely your judgment call, not an industry number, which is why it starts around
                35-70% depending on the business type instead of 100%.
              </p>
              <p>
                The second is the weekly routine-call estimate. There isn&apos;t a trustworthy
                universal benchmark for how many hours your team burns on repetitive phone questions,
                and pretending there is would make the tool look more precise than it really is. That
                one should come straight from your own gut check of how often the phone pulls someone
                away from real work.
              </p>
              <p>
                A few more things worth knowing. For order-driven businesses, some of this
                &quot;loss&quot; isn&apos;t fully gone — a customer who can&apos;t get through
                sometimes orders through a delivery app instead, so part of the number above is
                really a margin loss (the commission cut), not a total loss. This estimate also
                isn&apos;t a promise of what any solution recovers — it&apos;s the size of the gap
                today, not a guaranteed result after a fix. And it assumes a fairly typical month;
                real call volume swings with season, weather, and local events, so treat this as a
                representative month, not an annual guarantee.
              </p>
            </div>
          </details>
        </div>

        <div className="actions mt-8 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={() => window.print()}
            className="rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            Print this page
          </button>
          <button
            onClick={handleReset}
            className="rounded-btn border border-line px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-gold hover:text-gold"
          >
            Reset to defaults
          </button>
        </div>

        <p className="mt-10 font-mono text-xs text-text-muted-dark">
          Prepared by Sunforge Digital &middot; cdjohnsonzero@gmail.com
        </p>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>

      <style jsx>{`
        .calc-slider {
          width: 100%;
          -webkit-appearance: none;
          height: 6px;
          border-radius: 999px;
          background: linear-gradient(90deg, var(--gold), var(--coral));
          outline: none;
        }
        .calc-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, var(--highlight), var(--gold) 55%, var(--coral) 100%);
          border: 2px solid rgba(11, 14, 23, 0.55);
          cursor: pointer;
          box-shadow:
            0 0 0 3px rgba(230, 168, 75, 0.18),
            0 2px 6px rgba(0, 0, 0, 0.5);
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }
        .calc-slider:hover::-webkit-slider-thumb {
          transform: scale(1.15);
          box-shadow:
            0 0 0 6px rgba(230, 168, 75, 0.22),
            0 2px 8px rgba(0, 0, 0, 0.55);
        }
        .calc-slider:active::-webkit-slider-thumb {
          transform: scale(1.05);
        }
        .calc-slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: radial-gradient(circle at 35% 30%, var(--highlight), var(--gold) 55%, var(--coral) 100%);
          border: 2px solid rgba(11, 14, 23, 0.55);
          cursor: pointer;
          box-shadow:
            0 0 0 3px rgba(230, 168, 75, 0.18),
            0 2px 6px rgba(0, 0, 0, 0.5);
          transition:
            transform 0.15s ease,
            box-shadow 0.15s ease;
        }
        .calc-slider:hover::-moz-range-thumb {
          transform: scale(1.15);
          box-shadow:
            0 0 0 6px rgba(230, 168, 75, 0.22),
            0 2px 8px rgba(0, 0, 0, 0.55);
        }

        .phone-icon .drop {
          position: absolute;
          left: 50%;
          top: 46px;
          width: 6px;
          height: 9px;
          background: linear-gradient(180deg, var(--gold), var(--coral));
          border-radius: 0 50% 50% 50%;
          transform: translateX(-50%) rotate(45deg);
          opacity: 0;
          animation: dripfall 2.6s infinite;
        }
        .phone-icon .drop:nth-child(2) {
          animation-delay: 0.9s;
          left: 65%;
        }
        .phone-icon .drop:nth-child(3) {
          animation-delay: 1.8s;
          left: 35%;
        }
        @keyframes dripfall {
          0% {
            opacity: 0;
            top: 44px;
          }
          10% {
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            top: 74px;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .phone-icon .drop {
            animation: none;
            opacity: 0.6;
          }
        }

        @media print {
          .calcRoot :global(*) {
            color: #1b2040 !important;
            border-color: #1b2040 !important;
            box-shadow: none !important;
          }
          .calcRoot {
            background: #fff !important;
          }
          .tabs,
          .card,
          .leak-visual {
            display: none !important;
          }
          .method :global(summary) {
            display: none !important;
          }
          .method :global(summary) ~ :global(*) {
            display: none !important;
          }
          .method {
            background: #fff !important;
            border: 2px solid #1b2040 !important;
          }
          .print-summary {
            display: block !important;
            background: #fff !important;
            border: 2px solid #1b2040 !important;
          }
        }
      `}</style>
    </div>
  );
}
