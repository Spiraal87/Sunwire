"use client";
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Check, Phone, ArrowRight, Bell } from 'lucide-react';

export default function DimensionalService({ hvac = false, servicePage = false }: { hvac?: boolean; servicePage?: boolean }) {
  const [detail, setDetail] = useState(false);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  useEffect(() => {
    let inView = false;
    const sync = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; sync(); }, { threshold: .15 });
    observer.observe(section.current!); document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <section ref={section} id={servicePage ? 'service-preview' : 'front-desk'} className={`sf-service ${visible ? 'sf-in-view' : ''} ${detail ? 'sf-summary-open' : ''}`} aria-labelledby="front-desk-title">
    <div className="sf-conduit" aria-hidden="true"><span /></div>
    <div className="sf-service-top"><p className="sf-eyebrow">01 / {hvac ? 'BUILT FOR THE SERVICE CALL' : 'THE CONNECTED FRONT DESK'}</p><span>FROM FIRST RING TO FOLLOW-UP</span></div>
    <div className="sf-service-grid">
      <div className="sf-service-copy">
        <h2 id="front-desk-title">{hvac ? 'Out on a job?' : 'Hands full?'}<br /><span>{hvac ? 'The next call matters.' : "You're still open."}</span></h2>
        <p>{hvac ? 'A no-cool inquiry should reach your team with the details that matter: the problem, service address, and requested time. Ember captures the request while you focus on the work.' : 'Meet Ember, your AI receptionist. When you can’t pick up, Ember captures the details and gives your team a clear next step.'}</p>
        <ul><li><Check size={16} /> Answers missed and after-hours calls</li><li><Check size={16} /> Captures the customer’s request</li><li><Check size={16} /> Sends a useful summary to your team</li></ul>
        <Link href="/receptionist" className="sf-text-link">Explore the AI receptionist <ArrowUpRight size={17} /></Link>
      </div>
      <div className="sf-service-stage">
        <div className="sf-stage-orbit" aria-hidden="true" />
        <svg className="sf-handoff-line" viewBox="0 0 600 575" fill="none" aria-hidden="true"><path d="M260 255H310L350 295H470" stroke="#ac7d3f" strokeWidth="1" /><circle cx="470" cy="295" r="3" fill="#eab362" /></svg>
        <div className="sf-phone">
          <div className="sf-phone-top"><span>8:42</span><span>••• ▰</span></div>
          <div className="sf-phone-avatar"><Phone size={25} /></div>
          <p className="sf-phone-name">A new opportunity.</p><span className="sf-phone-status">AFTER-HOURS INQUIRY</span>
          <div className="sf-conversation"><span>CALLER</span><p>“My AC isn't cooling. Could someone come out tomorrow?”</p><span>EMBER</span><p>“I can help with that. What’s the service address?”</p></div>
          <div className="sf-call-footer"><span><i /> Details captured</span><Check size={16} /></div>
        </div>
        <div className="sf-notification">
          <div className="sf-notification-head"><span><Bell size={15} /> YOUR TEAM’S HANDOFF</span><span>EXAMPLE</span></div>
          <h3>One less lead to lose.</h3>
          <p className="sf-request"><span /> Appointment requested</p>
          <dl><div><dt>Customer</dt><dd>Alex Morgan</dd></div><div><dt>Needs help with</dt><dd>AC not cooling</dd></div><div><dt>Preferred time</dt><dd>Tomorrow morning</dd></div></dl>
          <button type="button" aria-expanded={detail} aria-controls="sf-summary-detail" onClick={() => setDetail(!detail)}>{detail ? 'Close call summary' : 'View call summary'} <ArrowRight size={16} /></button>
          {detail && <p id="sf-summary-detail" className="sf-summary-detail">Alex requested AC service at 124 Example Lane, Phoenix. Your team should confirm availability and contact Alex. No appointment is booked.</p>}
        </div>
        <p className="sf-demo-caption">ILLUSTRATIVE DEMONSTRATION · NO LIVE CALL OR BOOKING</p>
      </div>
    </div>
    <div className="sf-service-bottom"><span>Every inquiry deserves a next step.</span><Link href="/website">Make your website part of the system <ArrowUpRight size={15} /></Link></div>
  </section>;
}
