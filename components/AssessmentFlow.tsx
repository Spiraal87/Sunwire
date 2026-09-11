"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, RotateCcw } from "lucide-react";
import LeadForm from "./LeadForm";
import { industries, chooseIndustry, useAssessment, recommendation, resetAssessment, coverageLabels, type CallCoverage, type IndustryId, type Pain, type WebsiteState } from "@/lib/assessment";
import { revealContent } from "@/lib/reveal-content";
import { fmt } from "@/lib/calculator";

const inputClass = "mt-2 w-full rounded-btn border border-line bg-bg px-3 py-3 text-sm text-text-primary focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";
const painLabels = { calls: "Missed calls", website: "Website conversion", both: "Calls and website" };
const customerOptions = [1, 3, 5];

export default function AssessmentFlow({ defaultBusinessType = "" }: { defaultBusinessType?: string }) {
  const { profile, update, persistent } = useAssessment();
  const [formVersion, setFormVersion] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const industry = industries.find(item => item.id === profile.industry);
  const result = recommendation(profile);
  const needsWebsite = profile.pain === "website" || profile.pain === "both";
  const missingDetails = !profile.industry || !profile.pain || (needsWebsite ? !profile.websiteState : !profile.callCoverage);
  const step = missingDetails ? 0 : profile.step;
  const opportunity = profile.value * profile.extraCustomers;
  const businessType = industry?.businessType ?? (defaultBusinessType || "Other");
  const summary = `Assessment — ${industry?.name ?? "Other business"}; biggest challenge: ${profile.pain ? painLabels[profile.pain] : "Not selected"}; ${needsWebsite ? `website today: ${profile.websiteState || "Not selected"}` : `call coverage: ${profile.callCoverage ? coverageLabels[profile.callCoverage] : "Not selected"}`}. Suggested starting point: ${result.label}. ${result.plan ? `Action plan: ${result.plan.title} ${result.plan.actions.join(" ")}` : ""} Scenario the visitor chose: ${profile.extraCustomers} more customers/month × ${fmt(profile.value)} per customer ≈ ${fmt(opportunity)}/month in potential new revenue. Illustrative scenario only — not a guarantee, and it excludes costs.`;
  const next = () => {
    if (missingDetails) { setError("Choose your industry, biggest challenge, and the coverage or website details for your selected service to continue."); return; }
    setError(""); update({ step: Math.min(2, step + 1) }); revealContent("assessment-form", false);
  };
  return (
    <div className="assessment-flow">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><p className="text-xs leading-relaxed text-text-muted">{persistent ? "Your business choices are saved on this browser." : "Browser storage is unavailable. Progress lasts for this visit only."}<br />Names, email, and message text are never saved here.</p><button type="button" onClick={() => { resetAssessment(); setFormVersion(value => value + 1); setSubmitted(false); setError(""); revealContent("assessment-form", false); }} className="inline-flex min-h-11 items-center gap-1.5 text-xs text-text-secondary"><RotateCcw size={13} />Start over</button></div>
      <ol className="mb-6 flex gap-2" aria-label="Assessment progress">{["Your business", "Opportunity", "Next step"].map((label, index) => <li key={label} className={`flex-1 border-t-2 pt-3 text-xs leading-relaxed ${index === step ? "border-gold text-gold" : "border-line text-text-muted"}`} aria-current={index === step ? "step" : undefined}>{index + 1}. {label}</li>)}</ol>
      <h3 id="assessment-form" tabIndex={-1} className="mb-5 scroll-mt-28 font-display text-xl font-semibold outline-none">{["Let’s make this fit your business.", "Put a rough number on it.", "Your recommended starting point."][step]}</h3>

      {step === 0 && <div className="space-y-5"><label className="block text-sm text-text-secondary">Industry<select className={inputClass} value={profile.industry} onChange={event => chooseIndustry(event.target.value as IndustryId)}><option value="" disabled>Select your industry</option>{industries.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}<option value="other">Other local business</option></select></label><label className="block text-sm text-text-secondary">Biggest challenge<select className={inputClass} value={profile.pain} onChange={event => update({ pain: event.target.value as Pain })}><option value="" disabled>Choose a challenge</option>{Object.entries(painLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>{needsWebsite && <label className="block text-sm text-text-secondary">Your website today<select className={inputClass} value={profile.websiteState} onChange={event => update({ websiteState: event.target.value as WebsiteState })}><option value="" disabled>Choose one</option><option value="working">It brings in inquiries</option><option value="weak">It could work harder</option><option value="none">I do not have one</option></select></label>}{profile.pain === "calls" && <label className="block text-sm text-text-secondary">Call coverage<select className={inputClass} value={profile.callCoverage} onChange={event => update({ callCoverage: event.target.value as CallCoverage })}><option value="" disabled>Choose coverage</option>{Object.entries(coverageLabels).map(([id, label]) => <option key={id} value={id}>{label}</option>)}</select></label>}</div>}

      {step === 1 && <div className="space-y-6">
        <p className="text-sm leading-relaxed text-text-muted">Rough math, in your terms — no traffic stats needed. Start with what one new customer is typically worth to you.</p>
        <label className="block text-sm text-text-secondary">Average value of a new customer ($)
          <input type="number" min={0} max={1000000} inputMode="decimal" value={profile.value} onChange={event => { const value = Number(event.target.value); if (Number.isFinite(value)) update({ value: Math.min(1000000, Math.max(0, value)) }); }} className={inputClass} />
          <span className="mt-1 block text-xs text-text-muted">Pre-filled with a typical figure for {industry?.name.toLowerCase() ?? "your business"}. Change it to your number.</span>
        </label>
        <fieldset>
          <legend className="text-sm text-text-secondary">If {result.label} helped you win just a few more customers a month…</legend>
          <div className="mt-2 flex gap-2">{customerOptions.map(count => <button key={count} type="button" onClick={() => update({ extraCustomers: count })} aria-pressed={profile.extraCustomers === count} className={`min-h-11 flex-1 rounded-btn border px-3 py-2 text-sm ${profile.extraCustomers === count ? "border-gold bg-gold/10 text-gold" : "border-line text-text-secondary"}`}>{count} more / mo</button>)}</div>
        </fieldset>
        <div className="rounded-card border border-line bg-bg/50 p-4">
          <p className="text-xs uppercase tracking-widest text-text-muted">Potential new revenue — your scenario</p>
          <p className="mt-1 font-display text-xl font-semibold text-text-primary">{fmt(opportunity)}<span className="text-sm font-normal text-text-muted"> / month</span></p>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">{profile.extraCustomers} more customers × {fmt(profile.value)} each. A scenario you’re choosing, not a prediction — and it doesn’t subtract what the service costs.</p>
        </div>
      </div>}

      {step === 2 && <div className="mb-6 rounded-card border border-gold/30 bg-gold/5 p-5">
        <p className="font-mono text-[10px] uppercase tracking-widest text-gold">{industry?.name ?? "Your business"}</p>
        <h4 className="mt-2 font-display text-2xl font-semibold">{result.label}</h4>
        <p className="mt-2 text-sm leading-relaxed text-text-secondary">{result.plan?.why ?? result.reason}</p>
        {result.plan && <div className="mt-4"><h5 className="font-display font-semibold">{result.plan.title}</h5><ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-text-secondary">{result.plan.actions.map(action => <li key={action}>{action}</li>)}</ol></div>}
        <div className="mt-5 rounded-btn border border-line bg-bg/50 p-4">
          <p className="text-xs uppercase tracking-widest text-text-muted">Potential new revenue — your scenario</p>
          <p className="mt-1 font-display text-xl text-text-primary">{fmt(opportunity)}<span className="text-sm text-text-muted"> / month</span></p>
          <p className="mt-2 text-xs leading-relaxed text-text-muted">{profile.extraCustomers} more customers a month × {fmt(profile.value)} per customer. A scenario you picked — not a guarantee, and it doesn’t include what the service costs.</p>
        </div>
        <Link href={result.href} className="mt-4 inline-block text-sm text-gold underline underline-offset-4">Explore {result.label}</Link>
      </div>}

      {error && <p role="alert" className="mt-4 text-sm text-red-400">{error}</p>}
      {!submitted && <div className="my-6 flex items-center justify-between gap-4">{step > 0 ? <button type="button" onClick={() => { update({ step: step - 1 }); revealContent("assessment-form", false); }} className="min-h-11 text-sm text-text-secondary underline underline-offset-4">Back</button> : <span />}{step < 2 && <button type="button" onClick={next} className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg">{step === 0 ? "Explore my opportunity" : "See my recommendation"}<ArrowRight size={16} /></button>}</div>}
      <div hidden={step !== 2}><LeadForm key={formVersion} defaultBusinessType={businessType} assessmentSummary={summary} onSuccess={() => setSubmitted(true)} /><p className="mt-3 text-xs leading-relaxed text-text-muted">Submitting requests a follow-up. It does not reserve a time. Your assessment summary is included with your message.</p></div>
    </div>
  );
}
