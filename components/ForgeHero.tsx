"use client";
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import ForgeCore from './ForgeCore';
import { captureEvent } from '@/lib/analytics';

export default function ForgeHero() {
  return <section className="sf-hero" aria-labelledby="forge-title" data-energy-marker="hero-bottom">
    <div className="sf-hero-grid">
      <div className="sf-hero-copy">
        <p className="sf-eyebrow sf-enter"><span /> BUILT FOR LOCAL BUSINESS</p>
        <h1 id="forge-title" className="sf-enter">You do<br />the good work.<br /><em>Make it easier to choose you.</em></h1>
        <p className="sf-hero-description sf-enter">You take care of the work. We build the websites and AI phone systems that turn interest into your next customer.</p>
        <div className="sf-hero-actions sf-enter">
          <a className="sf-button" href="#contact" onClick={() => captureEvent('cta_clicked', { cta: 'assessment_request', placement: 'homepage_hero' })}>Request an assessment <ArrowUpRight size={18} /></a>
          <Link className="sf-text-link" href="/receptionist#demo">Meet your AI receptionist <ArrowUpRight size={16} /></Link>
        </div>
        <p className="sf-hero-note sf-enter">A 15-minute conversation. A clear next step.</p>
      </div>
      <ForgeCore />
    </div>
    <div className="sf-hero-foot"><span>WEBSITES <b>+</b> AI RECEPTIONISTS <b>+</b> CUSTOMER CAPTURE</span><a href="#front-desk">See the connection <ArrowDown size={16} /></a></div>
  </section>;
}
