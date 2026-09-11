"use client";

import { useRef, useState } from "react";
import { ArrowRight, Check, Globe, Phone, Layers } from "lucide-react";
import { useAssessment, recommendation, type Pain } from "@/lib/assessment";
import { revealContent } from "@/lib/reveal-content";
import { captureEvent } from "@/lib/analytics";

const pains: { id: Pain; title: string; description: string; icon: typeof Phone }[] = [
  { id: "calls", title: "Calls go unanswered", description: "Busy hours, after-hours calls, and too much phone tag.", icon: Phone },
  { id: "website", title: "My website loses people", description: "Hard to find, hard to use, or no clear way to book.", icon: Globe },
  { id: "both", title: "Both need attention", description: "The online experience and the phone handoff need to connect.", icon: Layers },
];
const websites = [
  { id: "working", label: "It brings in inquiries", body: "Keep what works and find the gaps in the customer journey." },
  { id: "weak", label: "It could work harder", body: "Improve the existing site and make contacting you easier." },
  { id: "none", label: "I do not have one", body: "Build a first website around your services and customer inquiries." },
] as const;
const coverage = [
  { id: "busy", label: "During business hours", body: "Pick up when your team is busy or already on another call." },
  { id: "after-hours", label: "After hours", body: "Capture inquiries when your business is closed." },
  { id: "both", label: "Both", body: "Cover busy periods and calls outside business hours." },
] as const;
const choiceClass = (selected: boolean) => `rounded-card border p-5 text-left transition-colors motion-reduce:transition-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold ${selected ? "border-gold bg-gold/10" : "border-line bg-bg hover:border-gold/60"}`;

export default function ProblemSelector() {
  const { profile, update } = useAssessment();
  const [question, setQuestion] = useState<0 | 1>(0);
  const heading = useRef<HTMLHeadingElement>(null);
  const result = recommendation(profile);
  const direction = recommendation({ ...profile, websiteState: "" });
  const callsOnly = profile.pain === "calls";
  const selectedPain = pains.find(item => item.id === profile.pain);
  const changeQuestion = (next: 0 | 1) => {
    setQuestion(next);
    revealContent("fit-question");
    requestAnimationFrame(() => heading.current?.focus({ preventScroll: true }));
  };
  return (
    <section id="find-your-fit" className="scroll-mt-24 px-6 py-16 sm:py-24" aria-labelledby="fit-title">
      <div className="mx-auto max-w-6xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Find your starting point</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 id="fit-title" className="max-w-2xl font-display text-3xl font-semibold sm:text-4xl">Where is the next customer slipping away?</h2>
          <p className="max-w-xs text-sm text-text-muted">Find your service direction, then get a practical plan for where to begin.</p>
        </div>
        <div className="mt-8 rounded-panel border border-gold/25 bg-panel p-5 sm:p-8">
          <ol className="mb-7 grid grid-cols-2 gap-4" aria-label="Starting point progress">
            {["Identify the problem", "Shape your action plan"].map((label, index) => <li key={label} aria-current={question === index ? "step" : undefined} className={`border-t-2 pt-3 text-sm ${question === index ? "border-gold text-gold" : "border-line text-text-muted"}`}>{index + 1}. {label}</li>)}
          </ol>
          {question === 1 && <p className="mb-4 text-sm text-text-muted">Your priority: <span className="text-text-primary">{selectedPain?.title}</span></p>}
          <h3 ref={heading} tabIndex={-1} id="fit-question" className="font-display text-xl font-semibold focus:outline-none">{question === 0 ? "What is your biggest friction point?" : callsOnly ? "When do you need help answering calls?" : "What website foundation are we starting with?"}</h3>
          <p id="fit-help" className="mb-5 mt-2 max-w-3xl text-sm leading-relaxed text-text-muted">{question === 0 ? "Choose the issue you want to solve first. We will suggest a service direction." : callsOnly ? "Choose the coverage you need. Your plan will focus on answering calls and handing requests to your team." : "This answer sets the scope: keep and fine-tune your site, improve it, or build from scratch. Your plan below shows what to tackle first."}</p>
          <fieldset aria-labelledby="fit-question" aria-describedby="fit-help">
            <div className="grid gap-3 md:grid-cols-3">
              {question === 0 ? pains.map(item => <button key={item.id} type="button" aria-pressed={profile.pain === item.id} onClick={() => { update({ pain: item.id }); revealContent("fit-direction"); }} className={choiceClass(profile.pain === item.id)}><item.icon aria-hidden="true" size={23} className="mb-4 text-gold" /><span className="flex items-start justify-between gap-3 font-display font-semibold leading-snug">{item.title}{profile.pain === item.id && <Check aria-hidden="true" size={18} className="shrink-0 text-gold" />}</span><span className="mt-2 block text-sm leading-relaxed text-text-muted">{item.description}</span></button>) : callsOnly ? coverage.map(item => <button type="button" key={item.id} aria-pressed={profile.callCoverage === item.id} onClick={() => { update({ callCoverage: item.id }); revealContent("fit-plan"); captureEvent("service_recommendation_viewed", { pain: profile.pain, coverage: item.id }); }} className={choiceClass(profile.callCoverage === item.id)}><span className="flex items-start justify-between gap-3 font-display font-semibold leading-snug">{item.label}{profile.callCoverage === item.id && <Check aria-hidden="true" size={18} className="shrink-0 text-gold" />}</span><span className="mt-2 block text-sm leading-relaxed text-text-muted">{item.body}</span></button>) : websites.map(item => <button type="button" key={item.id} aria-pressed={profile.websiteState === item.id} onClick={() => { update({ websiteState: item.id }); revealContent("fit-plan"); captureEvent("service_recommendation_viewed", { pain: profile.pain, website: item.id }); }} className={choiceClass(profile.websiteState === item.id)}><span className="flex items-start justify-between gap-3 font-display font-semibold leading-snug">{item.label}{profile.websiteState === item.id && <Check aria-hidden="true" size={18} className="shrink-0 text-gold" />}</span><span className="mt-2 block text-sm leading-relaxed text-text-muted">{item.body}</span></button>)}
            </div>
          </fieldset>
          {question === 1 && (callsOnly || profile.pain === "both") && <label className="mt-3 flex min-h-11 cursor-pointer items-center gap-3 text-sm text-text-secondary"><input type="checkbox" checked={profile.pain === "both"} onChange={event => { update({ pain: event.target.checked ? "both" : "calls" }); revealContent("fit-question"); }} className="h-4 w-4 shrink-0 accent-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold" />Include website help (optional)</label>}
          <div aria-live="polite" aria-atomic="true">
            {question === 0 && profile.pain && <div id="fit-direction" tabIndex={-1} className="mt-6 scroll-mt-28 border-t border-line pt-6 outline-none"><p className="text-sm text-gold">Your service direction</p><h4 className="mt-2 font-display text-2xl font-semibold">{direction.label}</h4><p className="mt-2 text-text-muted">{direction.reason}</p><p className="mt-3 text-sm text-text-secondary">{callsOnly ? "Next, choose when you need call coverage so we can outline your receptionist setup." : "Next, tell us what you already have so we can outline the right scope and first actions."}</p></div>}
            {question === 1 && result.plan && <div id="fit-plan" tabIndex={-1} className="mt-6 scroll-mt-28 border-t border-line pt-6 outline-none">
              <p className="flex items-center gap-2 text-sm text-gold"><Check aria-hidden="true" size={16} />Your suggested action plan</p>
              <h4 className="mt-2 font-display text-2xl font-semibold">{result.plan.title}</h4>
              <p className="mt-3 max-w-3xl leading-relaxed text-text-muted">{result.plan.why}</p>
              <ol className="mt-5 grid gap-3 md:grid-cols-3">{result.plan.actions.map((action, index) => <li key={action} className="rounded-card border border-line bg-bg p-4"><span className="font-mono text-xs uppercase tracking-widest text-gold">{index === 0 ? "Start here" : `Then ${index + 1}`}</span><p className="mt-2 text-sm leading-relaxed text-text-secondary">{action}</p></li>)}</ol>
              <p className="mt-5 text-sm text-text-muted">Suggested service: <span className="text-text-primary">{result.label}</span></p>
            </div>}
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-5">
            {question === 1 ? <>
              {result.plan && <a href="#assessment-form" onClick={event => { event.preventDefault(); update({ step: 0 }); revealContent("assessment-form", false); }} className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg">Continue <ArrowRight aria-hidden="true" size={16} /></a>}
              <button type="button" onClick={() => changeQuestion(0)} className="min-h-11 text-sm text-text-secondary underline underline-offset-4">Back</button>
            </> : <button type="button" disabled={!profile.pain} onClick={() => changeQuestion(1)} className="inline-flex min-h-11 items-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg disabled:opacity-40">Shape my action plan <ArrowRight aria-hidden="true" size={16} /></button>}
          </div>
          {question === 1 && result.plan && <p className="mt-2 text-xs text-text-muted">Next: your business details. Your selections are already filled in.</p>}
        </div>
      </div>
    </section>
  );
}
