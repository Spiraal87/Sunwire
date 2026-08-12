"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { captureEvent } from "@/lib/analytics";

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

type CustomerSourceKey = "referral" | "mix" | "online";
type CalculatorSection = "calls" | "value" | "time";

const customerSourceOptions: { key: CustomerSourceKey; label: string }[] = [
  { key: "referral", label: "Referrals" },
  { key: "mix", label: "A mix" },
  { key: "online", label: "Online" },
];

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function fmtRange(low: number, high: number) {
  return `${fmt(low)}–${fmt(high)}`;
}

// Not every recoverable call converts into a paying customer even once the
// business has the capacity to take it — some are comparison shopping, some
// don't follow through regardless. The capacity input already discounts for
// supply (can they serve it); this floor discounts for demand (would the
// caller actually convert). Flat across all business types for now.
const CONVERSION_RATE_FLOOR = 0.3;

function getSourceNote(source: CustomerSourceKey, verticalLabel: string): string {
  switch (source) {
    case "online":
      return `This is on the lower end for a ${verticalLabel} business. If people mostly find you by searching, it may be worth checking your visibility — some customers never find you to call in the first place.`;
    case "referral":
      return "Since most of your business comes through referrals, a lower call count isn't necessarily a problem — though it's worth a quick check that your online presence isn't quietly costing you a second channel.";
    case "mix":
    default:
      return `This is on the lower end for a ${verticalLabel} business. Worth a quick check on whether people can easily find you online, especially for the customers who aren't coming through referrals.`;
  }
}

export default function CalculatorClient() {
  const [activeVertical, setActiveVertical] = useState<VerticalKey>("restaurant");
  const [calls, setCalls] = useState(defaults.restaurant.calls);
  const [miss, setMiss] = useState(defaults.restaurant.miss);
  const [value, setValue] = useState(defaults.restaurant.value);
  const [locationsInput, setLocationsInput] = useState("1");
  const [capacity, setCapacity] = useState(defaults.restaurant.cap);
  const [routineCallHours, setRoutineCallHours] = useState(6);
  const [customerSource, setCustomerSource] = useState<CustomerSourceKey>("mix");
  const [dismissedSourceModal, setDismissedSourceModal] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [openSection, setOpenSection] = useState<CalculatorSection | null>("calls");
  const leakCardRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<Record<CalculatorSection, HTMLElement | null>>({
    calls: null,
    value: null,
    time: null,
  });
  const isFirstOpenRef = useRef(true);

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
    setCustomerSource("mix");
    applyVertical(activeVertical);
  }

  const locations = Math.max(1, Number(locationsInput) || 1);
  const missPct = miss / 100;
  const capPct = capacity / 100;
  const missedCalls = calls * missPct * locations;
  const recoverable = missedCalls * capPct;
  const monthly = recoverable * value;
  const annual = monthly * 12;
  const monthlyLow = monthly * CONVERSION_RATE_FLOOR;
  const annualLow = annual * CONVERSION_RATE_FLOOR;
  const monthlyRoutineCallHours = Math.round((routineCallHours * 52) / 12);
  const isBelowCallThreshold = calls < d.calls * 0.6;
  const showSourceModal = isBelowCallThreshold && !dismissedSourceModal;

  useEffect(() => {
    if (!isBelowCallThreshold) {
      setDismissedSourceModal(false);
    }
  }, [isBelowCallThreshold]);

  useEffect(() => {
    const el = leakCardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const resultIsClearlyVisible = entry.isIntersecting && entry.intersectionRatio >= 0.6;

        if (resultIsClearlyVisible) {
          setShowStickyBar(false);
        } else {
          setShowStickyBar(entry.boundingClientRect.top > 0);
        }
      },
      { threshold: [0, 0.6] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function scrollToLeakCard() {
    leakCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function toggleSection(section: CalculatorSection) {
    setOpenSection((current) => (current === section ? null : section));
  }

  // Centers whichever section the user just opened, so the sliders they
  // clicked to reveal aren't left cut off above/below the viewport. Skipped
  // on first render so the page doesn't jump on load for the default-open
  // "calls" section.
  useEffect(() => {
    if (isFirstOpenRef.current) {
      isFirstOpenRef.current = false;
      return;
    }
    if (!openSection) return;
    sectionRefs.current[openSection]?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [openSection]);

  return (
    <div className="calcRoot min-h-screen bg-bg">
      <div className="print:hidden">
        <Nav />
      </div>

      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-1.5 font-mono text-sm font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:text-text-primary print:hidden"
        >
          <span aria-hidden="true">←</span> Back to Sunforge Digital
        </Link>

        <h1 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
          What are missed calls actually costing you?
        </h1>
        <p className="lede mt-3 max-w-xl font-body text-sm text-text-secondary print:hidden">
          Pick your business type, then adjust the sliders below — your estimate updates
          instantly.
        </p>

        <div className="tabs mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              className={`tab w-full rounded-full border px-3 py-2 text-center font-body text-sm font-semibold transition-colors ${
                activeVertical === tab.key
                  ? "border-transparent bg-gradient-accent text-bg"
                  : "border-line bg-panel text-text-muted hover:border-gold"
              }`}
              onClick={() => {
                applyVertical(tab.key);
                captureEvent("calculator_business_type_selected", {
                  business_type: tab.key,
                });
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="card mt-3 overflow-hidden rounded-panel border border-line bg-[linear-gradient(160deg,#1d1713,#17120f)] shadow-surface">
          <section ref={(el) => { sectionRefs.current.calls = el; }}>
            <h2>
            <button
              type="button"
              onClick={() => toggleSection("calls")}
              aria-expanded={openSection === "calls"}
              aria-controls="calculator-calls-section"
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-8"
            >
              <span className="flex min-w-0 items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10 font-mono text-xs font-bold text-gold">
                  1
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-text-primary">
                    Calls &amp; missed opportunities
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-gold">
                    {calls} calls/mo · {miss}% unanswered · {Math.round(locations)} {locations === 1 ? "location" : "locations"}
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-text-muted/40 text-text-secondary transition-transform duration-200 ${
                  openSection === "calls" ? "rotate-180" : ""
                }`}
              >
                <svg viewBox="0 0 16 10" className="h-2.5 w-4 fill-none" stroke="currentColor" strokeWidth="1.75">
                  <path d="m2 2 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            </h2>
            <div
              id="calculator-calls-section"
              className={`${openSection === "calls" ? "block" : "hidden"} px-5 pb-6 md:px-8 md:pb-8`}
            >
              <div className="field">
                <p className="font-body text-xs font-semibold text-text-secondary">
                  Where do most of your customers come from?
                </p>
                <div className="mt-2 flex gap-2">
                  {customerSourceOptions.map((option) => (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => setCustomerSource(option.key)}
                      className={`flex-1 rounded-full border px-3 py-2 text-center font-body text-xs font-semibold transition-colors sm:px-4 sm:text-sm ${
                        customerSource === option.key
                          ? "border-gold/60 bg-[#191410] text-text-primary"
                          : "border-line bg-transparent text-text-muted hover:border-gold/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="field mt-6">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
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
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">{d.hintCalls}</div>
              </div>

              <div className="field mt-6">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
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
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">{d.hintMiss}</div>
                <p className="mt-1.5 font-body text-xs leading-relaxed text-text-muted-dark">
                  Includes after-hours calls when the business is closed, not just calls missed during open hours.
                </p>
              </div>

              <div className="field mt-6">
                <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <label className="font-body text-sm font-semibold text-text-primary">
                    Locations with similar call volume
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={locationsInput}
                    onChange={(e) => setLocationsInput(e.target.value)}
                    className="w-20 rounded-btn border border-line bg-[#191410] px-3 py-2 font-mono text-sm text-text-primary focus:border-gold focus:outline-none"
                  />
                </div>
                <p className="mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">
                  Calls above are counted per location. If they already cover your whole business,
                  leave this at 1.
                </p>
              </div>
            </div>
          </section>

          <section
            ref={(el) => { sectionRefs.current.value = el; }}
            className="border-t border-line"
          >
            <h2>
            <button
              type="button"
              onClick={() => toggleSection("value")}
              aria-expanded={openSection === "value"}
              aria-controls="calculator-value-section"
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-8"
            >
              <span className="flex min-w-0 items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10 font-mono text-xs font-bold text-gold">
                  2
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-text-primary">
                    Customer value &amp; capacity
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-gold">
                    {fmt(value)} per job · {capacity}% available capacity
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-text-muted/40 text-text-secondary transition-transform duration-200 ${
                  openSection === "value" ? "rotate-180" : ""
                }`}
              >
                <svg viewBox="0 0 16 10" className="h-2.5 w-4 fill-none" stroke="currentColor" strokeWidth="1.75">
                  <path d="m2 2 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            </h2>
            <div
              id="calculator-value-section"
              className={`${openSection === "value" ? "block" : "hidden"} px-5 pb-6 md:px-8 md:pb-8`}
            >
              <div className="field">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
                  What&apos;s a new customer/job typically worth to you
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
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">{d.hintValue}</div>
              </div>

              <div className="field mt-6">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
                  Extra capacity you could take on <span className="font-mono text-coral">{capacity}%</span>
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
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">
                  If every missed call got answered, how much of that extra business could you
                  actually take on right now? Not every one is recoverable if you&apos;re already
                  at capacity — adjust honestly.
                </div>
              </div>
            </div>
          </section>

          <section
            ref={(el) => { sectionRefs.current.time = el; }}
            className="border-t border-line"
          >
            <h2>
            <button
              type="button"
              onClick={() => toggleSection("time")}
              aria-expanded={openSection === "time"}
              aria-controls="calculator-time-section"
              className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-8"
            >
              <span className="flex min-w-0 items-start gap-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/60 bg-gold/10 font-mono text-xs font-bold text-gold">
                  3
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-base font-semibold text-text-primary">
                    Time spent on routine calls
                  </span>
                  <span className="mt-1 block font-mono text-[11px] text-gold">
                    {routineCallHours} hrs/week · {monthlyRoutineCallHours} hrs/month
                  </span>
                </span>
              </span>
              <span
                aria-hidden="true"
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-text-muted/40 text-text-secondary transition-transform duration-200 ${
                  openSection === "time" ? "rotate-180" : ""
                }`}
              >
                <svg viewBox="0 0 16 10" className="h-2.5 w-4 fill-none" stroke="currentColor" strokeWidth="1.75">
                  <path d="m2 2 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>
            </h2>
            <div
              id="calculator-time-section"
              className={`${openSection === "time" ? "block" : "hidden"} px-5 pb-6 md:px-8 md:pb-8`}
            >
              <div className="field">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
                  Time spent on routine calls{" "}
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
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">
                  Hours a week you or your staff spend answering routine questions — hours, menu,
                  pricing, &quot;are you open Sunday&quot; — the same handful of questions, over
                  and over. This one&apos;s entirely your own estimate, no industry number behind
                  it.
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="actions mt-4 flex flex-wrap gap-3 print:hidden">
          <button
            onClick={() => {
              captureEvent("calculator_printed", {
                business_type: activeVertical,
                estimated_monthly_revenue_leak: Math.round(monthly),
              });
              window.print();
            }}
            className="rounded-btn border border-text-secondary/50 bg-panel-2 px-6 py-3 font-display text-sm font-semibold text-text-primary shadow-surface transition-all duration-200 hover:scale-[1.02] hover:border-text-primary hover:bg-panel"
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

        <div
          ref={leakCardRef}
          className="leak-visual relative z-10 mt-6 rounded-panel border border-line bg-[linear-gradient(160deg,#1f1814,#18120f)] p-6 shadow-surface sm:p-8"
        >
          <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-highlight">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-highlight" />
            Live result · updates as you adjust
          </div>
          <div className="flex items-center gap-5 sm:gap-6">
            <div className="phone-icon relative hidden h-14 w-14 shrink-0 sm:block">
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
              <div className="mt-1 font-display text-3xl font-bold tabular-nums text-highlight sm:text-4xl">
                {fmtRange(monthlyLow, monthly)}
              </div>
              <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-text-primary">
                {fmtRange(annualLow, annual)} / year
              </div>
              <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">
                Conservative estimate — actual conversion varies by call urgency and business type.
              </div>
            </div>
          </div>

          <div className="my-6 border-t border-line" />

          <div className="flex items-center gap-5 sm:gap-6">
            <div className="hidden h-14 w-14 shrink-0 text-text-primary sm:block" aria-hidden="true">
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
              <div className="mt-1 font-mono text-sm font-semibold tabular-nums text-text-secondary">
                {monthlyRoutineCallHours} hrs / month
              </div>
            </div>
          </div>
        </div>

        <div className="demo-cta relative z-0 mt-6 rounded-panel border border-gold/60 bg-[linear-gradient(160deg,#211914,#19130f)] p-8 shadow-glow print:hidden">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            This is exactly what an AI receptionist closes
          </div>
          <p className="mt-3 font-body text-text-primary">
            An AI receptionist answers every call, 24/7, captures the caller&apos;s info, and can
            schedule the appointment right then — so the missed-call side of this number stops
            growing. Hear it work on a real line before you decide anything.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/#demo"
              onClick={() =>
                captureEvent("demo_call_started", { placement: "calculator_results" })
              }
              className="rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              Talk to the AI Receptionist
            </Link>
            <Link
              href="/#contact"
              onClick={() =>
                captureEvent("contact_clicked", {
                  method: "form",
                  placement: "calculator_results",
                })
              }
              className="rounded-btn border border-line px-6 py-3 font-mono text-sm text-text-primary transition-colors hover:border-gold hover:text-gold"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <div className="print-summary hidden rounded-panel border border-line bg-white p-6 print:block">
          <div className="print-header mb-4 flex items-end justify-between border-b-2 border-line pb-3">
            <div className="flex items-center gap-2.5">
              <svg viewBox="0 0 300 300" aria-hidden="true" className="h-9 w-9 shrink-0">
                <defs>
                  <linearGradient id="printLogoGrad" x1="0%" y1="0%" x2="60%" y2="100%">
                    <stop offset="0%" stopColor="#F2C98A" />
                    <stop offset="45%" stopColor="#D99A50" />
                    <stop offset="100%" stopColor="#A8672A" />
                  </linearGradient>
                </defs>
                <circle cx="150" cy="150" r="138" fill="none" stroke="url(#printLogoGrad)" strokeWidth="20" />
                <circle cx="150" cy="150" r="100" fill="none" stroke="url(#printLogoGrad)" strokeWidth="18" />
                <circle cx="150" cy="150" r="66" fill="none" stroke="url(#printLogoGrad)" strokeWidth="16" />
                <circle cx="150" cy="150" r="34" fill="none" stroke="url(#printLogoGrad)" strokeWidth="10" />
              </svg>
              <div>
                <div className="print-brand font-display text-lg font-bold leading-tight tracking-tight">
                  Sunforge Digital
                </div>
                <div className="print-accent font-mono text-[10px] font-semibold uppercase tracking-[0.18em]">
                  Missed-Call Revenue Estimate
                </div>
              </div>
            </div>
            <div className="print-accent font-mono text-[10px] uppercase tracking-[0.1em]">
              {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
            </div>
          </div>

          <div className="mb-3 border-b border-line pb-2">
            <div className="print-accent font-mono text-xs font-semibold uppercase tracking-[0.1em]">
              Business type
            </div>
            <div className="font-display text-base font-semibold text-text-primary">
              {tabs.find((t) => t.key === activeVertical)?.label}
            </div>
            <div className="mt-1 font-mono text-[10px] leading-relaxed text-text-secondary/85">
              Reflects the business type and sliders as set on screen — defaults shown if left
              unchanged. Adjust to match your own numbers before sharing.
            </div>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-y-1.5 font-body text-sm text-text-primary">
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

          <div className="print-highlight mb-3 rounded-lg border border-line p-4">
            <div className="print-accent font-mono text-xs font-semibold uppercase tracking-[0.1em]">
              Estimated monthly revenue leak
            </div>
            <div className="print-brand mt-1 font-display text-5xl font-bold leading-none tabular-nums">
              {fmtRange(monthlyLow, monthly)}
            </div>
            <div className="mt-2 font-mono text-base font-semibold tabular-nums text-text-primary">
              {fmtRange(annualLow, annual)} / year
            </div>
            <div className="mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">
              Conservative estimate — actual conversion varies by call urgency and business type.
            </div>
          </div>

          <div className="border-t border-line pt-3 font-body text-sm text-text-muted">
            <p>
              This estimate multiplies your calls per month by your missed-call rate, then applies
              the share of that business you said you could take on right now to get recoverable
              calls — multiplied by your job value and locations for the top of the range above.
              The low end applies a conservative 30% conversion rate, since not every recoverable
              call converts. These are starting-point estimates from your own figures, not a
              guarantee of results.
            </p>
          </div>

          <div className="print-accent mt-4 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[0.14em]">
            Prepared by Sunforge Digital · sunforgedigital.com · 719-424-5680
          </div>
        </div>

        <div className="card method mt-6 rounded-panel border border-line bg-panel p-6">
          <details>
            <summary className="cursor-pointer font-body text-sm font-semibold text-text-muted">
              Where these starting numbers come from
            </summary>
            <div className="mt-4 space-y-3 font-body text-sm text-text-muted">
              <p>
                These are decent starting points, not verified facts about your business — most
                trace back to thin, sometimes self-interested sources, so treat every default as
                directional, not authoritative. The one exception is the home-services
                value-per-job range, which draws on independent Service Roundtable contractor
                data.
              </p>
              <p>
                Two sliders — extra capacity and routine-call time — have no industry benchmark on
                purpose. They&apos;re your own judgment call, not a citation, which is why they
                start as a reasonable range instead of a hard number.
              </p>
              <p className="text-text-muted-dark">
                A few more caveats: the automatic pop-up only compares you to this tool&apos;s own
                assumption, not an industry standard. Some of this &quot;loss&quot; is really a
                margin hit (a customer ordering through a delivery app instead), not a total loss,
                and it&apos;s not a guarantee — just the size of today&apos;s gap in a typical
                month.
              </p>
            </div>
          </details>
        </div>

        <p className="mt-10 font-mono text-xs text-text-muted-dark print:hidden">
          Prepared by Sunforge Digital &middot; sunforgedigital.com &middot; 719-424-5680
        </p>
      </main>

      <div className="print:hidden">
        <Footer />
      </div>

      <div className="print:hidden">
        <AnimatePresence>
          {showStickyBar && (
            <motion.button
              type="button"
              onClick={scrollToLeakCard}
              initial={{ y: 24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 24, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
              className="fixed inset-x-0 bottom-0 z-50 flex w-full items-center justify-between gap-4 bg-gradient-accent px-5 pt-4 text-left md:hidden"
            >
              <span>
                <span className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-bg/70">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-bg" />
                  Live result · updates as you adjust
                </span>
                <span className="mt-1 block font-display text-xs font-semibold text-bg">
                  Estimated revenue leak
                </span>
              </span>
              <span aria-live="polite" className="whitespace-nowrap font-display text-lg font-bold leading-none tabular-nums text-bg">
                {fmtRange(monthlyLow, monthly)}
                <span className="ml-1 font-mono text-xs font-semibold leading-none text-bg/70">/mo</span>
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <div className="print:hidden">
        <AnimatePresence>
          {showSourceModal && (
            <motion.div
              className="fixed inset-0 z-[60] flex items-center justify-center p-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <div aria-hidden="true" className="absolute inset-0 bg-bg/80 backdrop-blur-sm" />
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="source-modal-heading"
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="relative w-full max-w-sm rounded-panel border border-line bg-[linear-gradient(160deg,#1f1814,#18120f)] p-6 shadow-surface"
              >
                <button
                  type="button"
                  onClick={() => setDismissedSourceModal(true)}
                  aria-label="Close dialog"
                  className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full border border-line/80 font-mono text-base leading-none text-text-muted transition-colors hover:border-gold hover:text-gold"
                >
                  ✕
                </button>
                <h3
                  id="source-modal-heading"
                  className="font-display text-lg font-semibold text-text-primary"
                >
                  Worth a quick check
                </h3>
                <p className="mt-3 font-body text-sm text-text-muted">
                  {getSourceNote(
                    customerSource,
                    tabs.find((t) => t.key === activeVertical)?.label ?? ""
                  )}
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
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
          border: 2px solid rgba(8, 8, 10, 0.55);
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
          border: 2px solid rgba(8, 8, 10, 0.55);
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
          main {
            padding: 0.5rem 1.5rem !important;
          }
          h1 {
            margin-bottom: 0 !important;
            font-size: 1.5rem !important;
          }
          .tabs,
          .card,
          .leak-visual,
          .method {
            display: none !important;
          }
          .print-summary {
            display: block !important;
            margin-top: 1rem !important;
            background: #fff !important;
            border: 2px solid #b3762c !important;
            border-radius: 14px !important;
          }
          .print-summary :global(.border-line) {
            border-color: #e7cfa3 !important;
          }
          .print-header {
            border-bottom-color: #b3762c !important;
          }
          .print-highlight {
            background: #fbf3e6 !important;
            border-color: #e7cfa3 !important;
          }
          .print-brand {
            color: #a8672a !important;
          }
          .print-accent {
            color: #b3762c !important;
          }
        }
      `}</style>
    </div>
  );
}
