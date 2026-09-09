"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import LeadForm from "./LeadForm";
import { industries, chooseIndustry, useAssessment, recommendation, resetAssessment, type Assessment, type IndustryId, type Pain, type WebsiteState } from "@/lib/assessment";
import { computeLeak, fmt } from "@/lib/calculator";

const inputClass = "mt-2 w-full rounded-btn border border-line bg-bg px-3 py-3 text-sm text-text-primary focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";
const painLabels = { calls: "Missed calls", website: "Website conversion", both: "Calls and website" };
export default function AssessmentFlow({ defaultBusinessType = "" }: { defaultBusinessType?: string }) {
  const { profile, update, persistent } = useAssessment();
  const [formVersion, setFormVersion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const title = useRef<HTMLHeadingElement>(null);
  const previousStep = useRef(profile.step);
  const industry = industries.find(item => item.id === profile.industry);
  const result = recommendation(profile);
  const step = !profile.industry || !profile.pain || !profile.websiteState ? 0 : profile.step;
  const leak = computeLeak(profile);
  const webOpportunity = profile.visitors * profile.conversionPct / 100 * profile.value;
  useEffect(() => {
    if (previousStep.current !== step) { title.current?.focus({ preventScroll: true }); previousStep.current = step; }
  }, [step]);
  const businessType = industry?.businessType ?? (defaultBusinessType || "Other");
  const summary = `Assessment: ${industry?.name ?? "Other business"}; priority: ${profile.pain ? painLabels[profile.pain] : "Not selected"}; website: ${profile.websiteState || "Not selected"}. Suggested start: ${result.label}. Planning inputs: ${profile.calls} calls/month, ${profile.missPct}% missed, ${profile.capacityPct}% service capacity, $${profile.value} average customer value; ${profile.visitors} website visits/month, ${profile.conversionPct}% assumed additional paying-customer conversion. Illustrative phone opportunity: ${fmt(leak.monthlyLow)}–${fmt(leak.monthly)}/month; website scenario: ${fmt(webOpportunity)}/month. Estimates are not guarantees and exclude costs; channels may overlap.`;
  const next = () => {
    if (!profile.industry || !profile.pain || !profile.websiteState) { setError("Choose your industry, biggest challenge, and current website situation to continue."); return; }
    setError(""); update({ step: Math.min(2, step + 1) });
  };
  const numericInput = (key: keyof Pick<Assessment, "calls" | "missPct" | "value" | "capacityPct" | "visitors" | "conversionPct">, label: string, max: number, increment = 1) => <label className="block text-sm text-text-secondary" key={key}>{label}<input type="number" min={0} max={max} step={increment} inputMode="decimal" value={profile[key]} onChange={event => { const value = Number(event.target.value); if (Number.isFinite(value)) update({ [key]: Math.min(max, Math.max(0, value)) }); }} className={inputClass} /></label>;
  return (
    <div className="assessment-flow">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs leading-relaxed text-text-muted">{persistent ? "Your business choices are saved on this browser." : "Browser storage is unavailable. Progress lasts for this visit only."}<br />Names, email, and message text are never saved here.</p><button type="button" onClick={() => { resetAssessment(); setFormVersion(value => value + 1); setSubmitted(false); setError(""); }} className="inline-flex min-h-11 items-center gap-1.5 text-xs text-text-secondary"><RotateCcw size={13} />Start over</button></div>
      <ol className="mb-6 flex gap-2" aria-label="Assessment progress">{["Your business", "Opportunity", "Next step"].map((label, index) => <li key={label} className={`flex-1 border-t-2 pt-3 text-xs leading-relaxed ${index === step ? "border-gold text-gold" : "border-line text-text-muted"}`} aria-current={index === step ? "step" : undefined}>{index + 1}. {label}</li>)}</ol>
      <h3 ref={title} tabIndex={-1} className="mb-5 font-display text-xl font-semibold outline-none">{["Let’s make this fit your business.", "Put your opportunity in perspective.", "Your recommended starting point."][step]}</h3>
      {step === 0 && <div className="space-y-5"><label className="block text-sm text-text-secondary">Industry<select className={inputClass} value={profile.industry} onChange={event => chooseIndustry(event.target.value as IndustryId)}><option value="" disabled>Select your industry</option>{industries.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}<option value="other">Other local business</option></select></label><label className="block text-sm text-text-secondary">Biggest challenge<select className={inputClass} value={profile.pain} onChange={event => update({ pain: event.target.value as Pain })}><option value="" disabled>Choose a challenge</option>{Object.entries(painLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label><label className="block text-sm text-text-secondary">Your website today<select className={inputClass} value={profile.websiteState} onChange={event => update({ websiteState: event.target.value as WebsiteState })}><option value="" disabled>Choose one</option><option value="working">It brings in inquiries</option><option value="weak">It could work harder</option><option value="none">I do not have one</option></select></label></div>}
      {step === 1 && <div><p className="mb-5 text-sm leading-relaxed text-text-muted">Start with these illustrative inputs for {industry?.name.toLowerCase() ?? "your business"}, then replace them with your own. They are planning assumptions, not industry benchmarks.</p><div className="grid gap-4 sm:grid-cols-2">{numericInput("value", "Average paying-customer value ($)", 1000000)}{result.id !== "website" && <>{numericInput("calls", "Inbound calls per month", 100000)}{numericInput("missPct", "Calls missed (%)", 100)}{numericInput("capacityPct", "Share of missed calls you can serve (%)", 100)}</>}{result.id !== "receptionist" && <>{numericInput("visitors", "Website visits per month", 1000000)}{numericInput("conversionPct", "Additional paying-customer conversion (%)", 100, 0.1)}</>}</div><p className="mt-4 text-xs leading-relaxed text-text-muted">For a new website, traffic is a scenario you choose—not a promise of visitors.</p></div>}
      {step === 2 && <div className="mb-6 rounded-card border border-gold/30 bg-gold/5 p-5"><p className="font-mono text-[10px] uppercase tracking-widest text-gold">{industry?.name ?? "Your business"}</p><h4 className="mt-2 font-display text-2xl font-semibold">{result.label}</h4><p className="mt-2 text-sm leading-relaxed text-text-secondary">{result.reason}</p><div className="mt-5 space-y-4">{result.id !== "website" && <div><p className="text-xs text-text-muted">Illustrative monthly phone opportunity</p><p className="mt-1 font-display text-2xl text-gold">{fmt(leak.monthlyLow)}–{fmt(leak.monthly)}</p><p className="mt-2 text-xs leading-relaxed text-text-muted">{profile.calls} calls × {profile.missPct}% missed × {profile.capacityPct}% capacity × {fmt(profile.value)} value × 30–100% conversion.</p></div>}{result.id !== "receptionist" && <div><p className="text-xs text-text-muted">Illustrative monthly website opportunity</p><p className="mt-1 font-display text-2xl text-gold">{fmt(webOpportunity)}</p><p className="mt-2 text-xs leading-relaxed text-text-muted">{profile.visitors} visits × {profile.conversionPct}% additional paying-customer conversion × {fmt(profile.value)} value.</p></div>}</div><p className="mt-4 text-xs leading-relaxed text-text-muted">Gross revenue scenarios, not guaranteed revenue, profit, or net ROI. Costs are not included. Phone and website opportunities can overlap, so we do not add them together.</p><Link href={result.href} className="mt-4 inline-block text-sm text-gold underline underline-offset-4">Explore {result.label}</Link></div>}
      {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
      {!submitted && <div className="my-6 flex items-center justify-between gap-4">{step > 0 ? <button type="button" onClick={() => update({ step: step - 1 })} className="min-h-11 text-sm text-text-secondary underline underline-offset-4">Back</button> : <span />}{step < 2 && <button type="button" onClick={next} className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg">{step === 0 ? "Explore my opportunity" : "See my recommendation"}<ArrowRight size={16} /></button>}</div>}
      <div hidden={step !== 2}><LeadForm key={formVersion} defaultBusinessType={businessType} assessmentSummary={summary} onSuccess={() => setSubmitted(true)} /><p className="mt-3 text-xs leading-relaxed text-text-muted">Submitting requests a follow-up. It does not reserve a time. Your assessment summary is included with your message.</p></div>
    </div>
  );
}

