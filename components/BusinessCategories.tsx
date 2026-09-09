"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import IndustryWalkthrough from "./IndustryWalkthrough";
import Link from "next/link";
import { ArrowUpRight, ArrowRight, X, Check, Phone } from "lucide-react";
import { industries, chooseIndustry } from "@/lib/assessment";
import { captureEvent } from "@/lib/analytics";

export default function BusinessCategories() {
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const [selected, setSelected] = useState<typeof industries[number] | null>(null);
  useEffect(() => {
    if (!selected) return;
    dialog.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [selected]);
  const close = () => { dialog.current?.close(); setSelected(null); trigger.current?.focus(); };
  return (
    <section id="industries" className="sf-industry-section scroll-mt-24 px-6 py-16 sm:py-24" aria-labelledby="industries-title">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-5"><div><p className="font-mono text-xs uppercase tracking-[0.2em] text-gold">Built for your day-to-day</p><h2 id="industries-title" className="mt-3 font-display text-3xl font-semibold sm:text-4xl">Your business. Your kind of busy.</h2></div><p className="max-w-sm text-sm leading-relaxed text-text-muted">Choose an industry to see a sample conversation and a practical next step.</p></div>
        <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map(industry => <button key={industry.id} type="button" aria-haspopup="dialog" onClick={event => { trigger.current = event.currentTarget; setSelected(industry); chooseIndustry(industry.id); captureEvent("industry_category_clicked", { industry: industry.id }); }} className="group overflow-hidden rounded-panel border border-gold/25 bg-gradient-surface text-left shadow-surface transition-colors hover:border-gold/70">
            <div className="relative aspect-[16/10] overflow-hidden"><Image src={`/images/${industry.image}`} alt="" fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" /><span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/60 p-2 text-white"><ArrowUpRight size={17} /></span></div>
            <div className="p-5"><h3 className="font-display text-lg font-semibold leading-snug">{industry.name}</h3><p className="mt-2 min-h-12 text-sm leading-relaxed text-text-muted">{industry.problem}</p><span className="mt-5 inline-flex items-center gap-2 font-mono text-xs text-gold">Explore your demo <ArrowRight size={14} /></span></div>
          </button>)}
        </div>
      </div>
      <dialog ref={dialog} onCancel={event => { event.preventDefault(); close(); }} onClose={() => { setSelected(null); trigger.current?.focus(); }} onClick={event => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) close(); } }} aria-labelledby="industry-dialog-title" className="industry-dialog w-[calc(100%-2rem)] max-w-2xl rounded-panel border border-gold/40 bg-panel p-0 text-text-primary shadow-forge">
        {selected && <div className="p-6 sm:p-8"><div className="flex items-start justify-between gap-4"><div><p className="font-mono text-xs uppercase tracking-widest text-gold">Industry walkthrough</p><h3 id="industry-dialog-title" className="mt-2 font-display text-2xl font-semibold">{selected.name}</h3></div><button type="button" onClick={close} autoFocus aria-label="Close industry demo" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line"><X size={20} /></button></div><p className="mt-4 text-text-muted">{selected.problem}</p>
          <IndustryWalkthrough key={selected.id} industry={selected} />
          <p className="mt-3 text-xs leading-relaxed text-text-muted">Illustrative text demo; no live call or appointment is created. Workflows and confirmations depend on your business setup.</p>
          {selected.id === "home" && <p className="mt-4 text-sm text-text-secondary">Serving HVAC, plumbing, electrical, garage doors, and auto services. <Link href="/hvac" onClick={close} className="text-gold underline">Explore the HVAC page</Link>. Other trades can request an assessment below.</p>}
          <p className="sf-industry-saved">Your assessment will start with {selected.name}. You can change it there.</p>
          <div className="mt-6 flex flex-wrap gap-3"><a href="#contact" onClick={() => { chooseIndustry(selected.id); close(); captureEvent("assessment_request", { placement: "industry_demo", industry: selected.id }); }} className="inline-flex items-center gap-2 rounded-btn bg-gradient-accent px-5 py-3 text-sm font-semibold text-bg"><Check size={16} />Personalize my assessment</a><Link href="/receptionist#demo" className="inline-flex items-center gap-2 px-2 py-3 text-sm text-text-secondary underline underline-offset-4" onClick={close}><Phone size={16} />Try the live AI demo</Link></div>
        </div>}
      </dialog>
    </section>
  );
}

