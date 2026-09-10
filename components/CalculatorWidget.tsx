"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CalculatorCallFlow from './CalculatorCallFlow';
import CalculatorNumber from './CalculatorNumber';
import TrackedLink from "@/components/TrackedLink";
import { captureEvent } from "@/lib/analytics";
import { CTA_LABELS } from "@/lib/cta";
import { defaults, verticalLabels, fmt, fmtRange, computeLeak, type VerticalKey } from "@/lib/calculator";

const tabs: { key: VerticalKey; label: string }[] = [
  { key: "restaurant", label: verticalLabels.restaurant },
  { key: "home", label: verticalLabels.home },
  { key: "club", label: verticalLabels.club },
  { key: "other", label: verticalLabels.other },
];

type CustomerSourceKey = "referral" | "mix" | "online";
type CalculatorSection = "calls" | "value" | "time";

const customerSourceOptions: { key: CustomerSourceKey; label: string }[] = [
  { key: "referral", label: "Referrals" },
  { key: "mix", label: "A mix" },
  { key: "online", label: "Online" },
];

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

// Used both as the full standalone /calculator page (showChrome, the
// default) and embedded inline within a vertical landing page's own section
// (showChrome=false) — in the latter case the host page supplies its own
// Nav/Footer/heading, so this renders just the interactive tool itself.
export default function CalculatorWidget({
  defaultVertical = "restaurant",
  showChrome = true,
}: {
  defaultVertical?: VerticalKey;
  showChrome?: boolean;
}) {
  const [activeVertical, setActiveVertical] = useState<VerticalKey>(defaultVertical);
  const [calls, setCalls] = useState(defaults[defaultVertical].calls);
  const [miss, setMiss] = useState(defaults[defaultVertical].miss);
  const [value, setValue] = useState(defaults[defaultVertical].value);
  const [locationsInput, setLocationsInput] = useState("1");
  const [capacity, setCapacity] = useState(defaults[defaultVertical].cap);
  const [routineCallHours, setRoutineCallHours] = useState(6);
  const [customerSource, setCustomerSource] = useState<CustomerSourceKey>("mix");
  const [showStickyBar, setShowStickyBar] = useState(true);
  const [openSection, setOpenSection] = useState<CalculatorSection | null>("calls");
  const leakCardRef = useRef<HTMLDivElement>(null);

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
  const { monthly, annual, monthlyLow, annualLow } = computeLeak({
    calls,
    missPct: miss,
    value,
    capacityPct: capacity,
    locations,
  });
  const monthlyRoutineCallHours = Math.round((routineCallHours * 52) / 12);
  const isBelowCallThreshold = calls < d.calls * 0.6;
  useEffect(() => {
    const el = leakCardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top > 0);
      },
      { threshold: 0, rootMargin: "0px 0px -120px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function scrollToLeakCard() {
    leakCardRef.current?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: "start" });
  }

  function toggleSection(section: CalculatorSection) {
    setOpenSection(current => current === section ? null : section);
  }

  const Wrapper = showChrome ? "main" : "div";

  return (
    <div className="calcRoot min-h-screen bg-bg">
      {showChrome && (
        <div className="print:hidden">
          <Nav />
        </div>
      )}

      <Wrapper
        className={
          showChrome ? "calc-workspace mx-auto px-6 py-16 sm:py-24" : "calc-workspace calc-embedded mx-auto"
        }
      >
        {showChrome && (
          <>
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
          </>
        )}

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

        <div className="calc-live-layout">
        <div className="calc-mobile-summary" data-hidden={!showStickyBar} aria-hidden={!showStickyBar} aria-label="Live calculator summary">
          <div className="calc-mobile-estimate"><div><span>ESTIMATED MONTHLY LEAK</span><strong>{fmtRange(monthlyLow, monthly)}</strong></div><button type="button" onClick={scrollToLeakCard}>Breakdown <span aria-hidden="true">↓</span></button></div>
          <div className="calc-mobile-split" aria-hidden="true"><span style={{ width: `${100-miss}%` }} /><span style={{ width: `${miss}%` }} /></div>
          <div className="calc-mobile-counts"><span>{Math.round(calls*locations*(1-miss/100)).toLocaleString('en-US')} answered</span><span>{Math.round(calls*locations*miss/100).toLocaleString('en-US')} unanswered · {miss}%</span></div>
        </div>
        <div className="calc-controls">
        <div className="card mt-3 overflow-hidden rounded-panel border border-line bg-gradient-surface shadow-surface">
          <section>
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
                  Calls you get in a typical month <CalculatorNumber value={calls} min={20} max={1500} label="Monthly calls" unit="" onChange={setCalls} />
                </label>
                <input
                  type="range"
                  min={20}
                  aria-label="Calls you get in a typical month"
                  max={1500}
                  step={1}
                  value={calls}
                  style={{ background: `linear-gradient(90deg, var(--gold) 0%, var(--coral) ${(calls - 20) / (1500 - 20) * 100}%, #414447 ${(calls - 20) / (1500 - 20) * 100}%, #414447 100%)` }}
                  onChange={(e) => setCalls(Number(e.target.value))}
                  className="calc-slider mt-2"
                />
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">{d.hintCalls}</div>
                {isBelowCallThreshold && <aside className="calc-source-note"><strong>Worth a quick check</strong><p>{getSourceNote(customerSource, verticalLabels[activeVertical])}</p><small>This compares with the calculator's starting assumption, not a verified benchmark for your business.</small></aside>}
              </div>

              <div className="field mt-6">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
                  Roughly what % go unanswered <CalculatorNumber value={miss} min={5} max={70} label="Unanswered calls percentage" unit="%" onChange={setMiss} />
                </label>
                <input
                  type="range"
                  min={5}
                  aria-label="Percentage of calls unanswered"
                  max={70}
                  step={1}
                  value={miss}
                  style={{ background: `linear-gradient(90deg, var(--gold) 0%, var(--coral) ${(miss - 5) / (70 - 5) * 100}%, #414447 ${(miss - 5) / (70 - 5) * 100}%, #414447 100%)` }}
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
                    aria-label="Locations with similar call volume"
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
                  <CalculatorNumber value={value} min={10} max={1000} label="Customer or job value" unit="$" onChange={setValue} />
                </label>
                <input
                  type="range"
                  min={10}
                  max={1000}
                  aria-label="Typical customer or job value"
                  step={1}
                  value={value}
                  style={{ background: `linear-gradient(90deg, var(--gold) 0%, var(--coral) ${(value - 10) / (1000 - 10) * 100}%, #414447 ${(value - 10) / (1000 - 10) * 100}%, #414447 100%)` }}
                  onChange={(e) => setValue(Number(e.target.value))}
                  className="calc-slider mt-2"
                />
                <div className="hint mt-1.5 font-mono text-xs leading-relaxed text-text-secondary/85">{d.hintValue}</div>
              </div>

              <div className="field mt-6">
                <label className="flex items-baseline justify-between gap-3 font-body text-sm font-semibold text-text-primary">
                  Extra capacity you could take on <CalculatorNumber value={capacity} min={10} max={100} label="Available capacity percentage" unit="%" onChange={setCapacity} />
                </label>
                <input
                  type="range"
                  min={10}
                  max={100}
                  aria-label="Extra capacity percentage"
                  step={1}
                  value={capacity}
                  style={{ background: `linear-gradient(90deg, var(--gold) 0%, var(--coral) ${(capacity - 10) / (100 - 10) * 100}%, #414447 ${(capacity - 10) / (100 - 10) * 100}%, #414447 100%)` }}
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
                  <CalculatorNumber value={routineCallHours} min={0} max={40} label="Routine call hours per week" unit="hrs" onChange={setRoutineCallHours} />
                </label>
                <input
                  type="range"
                  min={0}
                  max={40}
                  step={1}
                  aria-label="Time spent on routine calls"
                  value={routineCallHours}
                  style={{ background: `linear-gradient(90deg, var(--gold) 0%, var(--coral) ${(routineCallHours - 0) / (40 - 0) * 100}%, #414447 ${(routineCallHours - 0) / (40 - 0) * 100}%, #414447 100%)` }}
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

        </div>
        <div className="calc-results-column">
        <div
          ref={leakCardRef}
          className="leak-visual relative z-10 mt-6 rounded-panel border border-line bg-gradient-surface p-6 shadow-surface sm:p-8"
        >
          <div className="mb-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-highlight">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-highlight" />
            Live result · updates as you adjust
          </div>
          <CalculatorCallFlow calls={calls} miss={miss} locations={locations} />
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
                Time spent on routine calls
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

        </div>
        </div>
        <div className="demo-cta relative z-0 mt-6 rounded-panel border border-gold/60 bg-gradient-surface p-8 shadow-glow print:hidden">
          <div className="font-mono text-xs font-semibold uppercase tracking-[0.15em] text-gold">
            See how an AI receptionist could help
          </div>
          <p className="mt-3 font-body text-text-primary">
            An AI receptionist can help answer calls, capture caller details, and handle routine
            questions when your team is busy or unavailable. The revenue and time you could recover
            depend on your business and how the system is set up. Try the demo to hear how it works.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/receptionist#demo"
              onClick={() =>
                captureEvent("demo_call_started", { placement: "calculator_results" })
              }
              className="rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              {CTA_LABELS.aiDemo}
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
              {CTA_LABELS.assessment}
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
                A few more caveats: the inline note only compares you to this tool&apos;s own
                assumption, not an industry standard. Some of this &quot;loss&quot; is really a
                margin hit (a customer ordering through a delivery app instead), not a total loss,
                and it&apos;s not a guarantee — just the size of today&apos;s gap in a typical
                month.
              </p>
            </div>
          </details>
        </div>

        {showChrome && (
          <>
            <section className="relative left-1/2 mt-14 w-[calc(100vw-3rem)] max-w-6xl -translate-x-1/2 print:hidden">
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.22em] text-[#8ea3b5]">
                Resources
              </p>
              <div className="mt-3 max-w-2xl">
                <h2 className="font-display text-3xl font-semibold text-text-primary sm:text-4xl">
                  Keep reading
                </h2>
                <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
                  If you want the deeper breakdown behind missed-call math or how AI receptionists
                  compare to traditional answering services, start here.
                </p>
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                <div className="flex h-full flex-col rounded-panel border border-[#345064] bg-gradient-surface p-6 shadow-[0_18px_40px_rgba(4,8,12,0.28)] sm:p-8">
                  <p className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
                    How much do missed calls actually cost a local business?
                  </p>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-text-secondary">
                    What a missed call really costs, how to estimate your own number, and why generic
                    industry averages only get you so far.
                  </p>
                  <TrackedLink
                    href="/resources/missed-call-cost"
                    cta="resource_missed_call_cost"
                    placement="calculator_resource_section"
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-[#9ec6da] transition-colors hover:text-text-primary"
                  >
                    Read more
                    <span aria-hidden="true">-&gt;</span>
                  </TrackedLink>
                </div>

                <div className="flex h-full flex-col rounded-panel border border-[#345064] bg-gradient-surface p-6 shadow-[0_18px_40px_rgba(4,8,12,0.28)] sm:p-8">
                  <p className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
                    Why your website still matters: SEO, GEO, and conversions
                  </p>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-text-secondary">
                    Why a local-business website still matters, how SEO and AI-search visibility
                    overlap, and how better conversion paths affect revenue.
                  </p>
                  <TrackedLink
                    href="/resources/website-seo-geo-conversions"
                    cta="resource_website_seo_geo_conversions"
                    placement="calculator_resource_section"
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-[#9ec6da] transition-colors hover:text-text-primary"
                  >
                    Read more
                    <span aria-hidden="true">-&gt;</span>
                  </TrackedLink>
                </div>

                <div className="flex h-full flex-col rounded-panel border border-[#345064] bg-gradient-surface p-6 shadow-[0_18px_40px_rgba(4,8,12,0.28)] sm:p-8">
                  <p className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
                    AI receptionist vs. answering service: what&apos;s the difference?
                  </p>
                  <p className="mt-3 max-w-2xl font-body text-sm leading-relaxed text-text-secondary">
                    How AI phone receptionists and traditional answering services actually differ, and
                    how to tell which one fits a local business.
                  </p>
                  <TrackedLink
                    href="/resources/ai-receptionist-vs-answering-service"
                    cta="resource_ai_vs_answering_service"
                    placement="calculator_resource_section"
                    className="mt-auto inline-flex items-center gap-2 pt-6 font-mono text-sm font-semibold uppercase tracking-[0.12em] text-[#9ec6da] transition-colors hover:text-text-primary"
                  >
                    Read more
                    <span aria-hidden="true">-&gt;</span>
                  </TrackedLink>
                </div>
              </div>
            </section>

            <p className="mt-10 font-mono text-xs text-text-muted-dark print:hidden">
              Prepared by Sunforge Digital &middot; sunforgedigital.com &middot; 719-424-5680
            </p>
          </>
        )}
      </Wrapper>

      {showChrome && (
        <div className="print:hidden">
          <Footer />
        </div>
      )}

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
