"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, Globe, Phone, Layers } from "lucide-react";
import { useAssessment, recommendation, type Pain, type WebsiteState } from "@/lib/assessment";
import { captureEvent } from "@/lib/analytics";

const pains: { id: Pain; title: string; description: string; icon: typeof Phone }[] = [
  { id: "calls", title: "Calls go unanswered", description: "Busy hours, after-hours calls, and too much phone tag.", icon: Phone },
  { id: "website", title: "My website loses people", description: "Hard to find, hard to use, or no clear way to book.", icon: Globe },
  { id: "both", title: "Both need attention", description: "The online experience and the phone handoff need to connect.", icon: Layers },
];
export default function ProblemSelector() {
  const { profile, update } = useAssessment();
  const [question, setQuestion] = useState<0 | 1>(0);
  const result = recommendation(profile);
  const ready = Boolean(profile.pain && profile.websiteState);
  return (
    <section id="find-your-fit" className="scroll-mt-24 px-6 py-16 sm:py-24" aria-labelledby="fit-title">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Find your starting point</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4"><h2 id="fit-title" className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">Where is the next customer slipping away?</h2><span className="text-sm text-text-muted">Two questions. A clearer next step.</span></div>
        <div className="mt-8 rounded-panel border border-gold/25 bg-panel p-5 sm:p-8">
          <fieldset>
            <legend className="mb-5 font-display text-xl font-semibold">{question === 0 ? "1 / What is your biggest friction point?" : "2 / How is your website working today?"}</legend>
            <div className="grid gap-3 md:grid-cols-3">
              {question === 0 ? pains.map(item => <button key={item.id} type="button" aria-pressed={profile.pain === item.id} onClick={() => update({ pain: item.id })} className={`rounded-card border p-5 text-left ${profile.pain === item.id ? "border-gold bg-gold/10" : "border-line bg-bg"}`}><item.icon size={23} className="mb-4 text-gold" /><span className="block font-display font-semibold leading-snug">{item.title}</span><span className="mt-2 block text-sm leading-relaxed text-text-muted">{item.description}</span></button>) : ([{ id: "working", label: "It brings in inquiries", body: "Clear, current, and easy to use." }, { id: "weak", label: "It could work harder", body: "Dated, confusing, or not converting." }, { id: "none", label: "I do not have one", body: "Customers rely on referrals or social media." }] as const).map(item => <button type="button" key={item.id} aria-pressed={profile.websiteState === item.id} onClick={() => { update({ websiteState: item.id as WebsiteState }); captureEvent("service_recommendation_viewed", { pain: profile.pain, website: item.id }); }} className={`rounded-card border p-5 text-left ${profile.websiteState === item.id ? "border-gold bg-gold/10" : "border-line bg-bg"}`}><span className="block font-display font-semibold leading-snug">{item.label}</span><span className="mt-2 block text-sm leading-relaxed text-text-muted">{item.body}</span></button>)}
            </div>
          </fieldset>
          <div className="mt-5 flex gap-4">{question === 1 ? <button type="button" onClick={() => setQuestion(0)} className="min-h-11 text-sm text-text-secondary underline underline-offset-4">Back to problem</button> : <button type="button" disabled={!profile.pain} onClick={() => setQuestion(1)} className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg disabled:opacity-40">Next question <ArrowRight size={16} /></button>}</div>
          {ready && <div className="mt-6 border-t border-line pt-6" aria-live="polite"><p className="flex items-center gap-2 text-sm text-gold"><Check size={16} />Your suggested starting point</p><h3 className="mt-2 font-display text-2xl font-semibold">{result.label}</h3><p className="mt-2 text-text-muted">{result.reason}</p><div className="mt-5 flex flex-wrap gap-4"><a href="#contact" onClick={() => update({ step: 0 })} className="rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg">Personalize my assessment</a><Link href={result.href} className="px-1 py-3 text-sm text-text-secondary underline underline-offset-4">Explore {result.label}</Link></div></div>}
        </div>
      </div>
    </section>
  );
}

