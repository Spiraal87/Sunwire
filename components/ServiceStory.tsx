"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, Globe, MessageSquare, Pause, Phone, Play } from "lucide-react";
import { useMotionPreference } from "@/lib/useMotionPreference";

type Kind = "receptionist" | "website";
const stories = {
  receptionist: [
    { title: "The phone rings. You're busy.", copy: "A customer needs help while your team is already helping someone else.", label: "Incoming call" },
    { title: "A conversation starts.", copy: "Ember answers and gathers the details that matter to your business.", label: "Ember answers" },
    { title: "The details come together.", copy: "The caller's needs and appointment request stay together in one clear record.", label: "Details captured" },
    { title: "Your team takes it from here.", copy: "A useful summary makes the next step clear, without another round of phone tag.", label: "Team handoff" },
  ],
  website: [
    { title: "A first impression that fits.", copy: "A clear, confident introduction to your business, on whatever screen a visitor uses.", label: "First impression" },
    { title: "An easy next step.", copy: "Your services and contact options stay within reach on a smaller screen.", label: "Mobile experience" },
    { title: "A question becomes a conversation.", copy: "An optional chat experience helps visitors explain what they need.", label: "Visitor inquiry" },
    { title: "Interest becomes an inquiry.", copy: "Your team gets the context to follow up with a person who wants to hear from you.", label: "Lead handoff" },
  ],
};

export default function ServiceStory({ mode = "home" }: { mode?: Kind | "home" }) {
  const [kind, setKind] = useState<Kind>(mode === "website" ? "website" : "receptionist");
  const [step, setStep] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const reduced = useMotionPreference();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 });
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (paused || reduced || !visible) return;
    const timer = window.setInterval(() => { if (!document.hidden) setStep(value => (value + 1) % 4); }, 3800);
    return () => window.clearInterval(timer);
  }, [paused, reduced, visible, kind]);
  const current = stories[kind][step];
  return <div ref={root} className="sf-story" data-kind={kind} data-step={step}>
    <div className="sf-story-toolbar">
      {mode === "home" ? <div className="sf-story-switch" aria-label="Choose a service demonstration">
        {(["receptionist", "website"] as Kind[]).map(value => <button key={value} aria-pressed={kind === value} onClick={() => { setKind(value); setStep(0); }}>
          {value === "receptionist" ? <Phone size={15} /> : <Globe size={15} />}{value === "receptionist" ? "Missing calls" : "Losing website inquiries"}
        </button>)}
      </div> : <span className="sf-story-kicker">{kind === "website" ? "From first visit to follow-up" : "From first ring to team handoff"}</span>}
      {!reduced && <button className="sf-story-play" aria-label={paused ? "Play service animation" : "Pause service animation"} onClick={() => setPaused(!paused)}>{paused ? <Play size={14} /> : <Pause size={14} />}<span>{paused ? "Play" : "Pause"}</span></button>}
    </div>
    <div className="sf-story-body">
      <div className="sf-story-copy"><span className="sf-story-kicker">0{step + 1} / THE {kind === "website" ? "WEBSITE" : "FRONT DESK"} SYSTEM</span>
        <div key={`${kind}-${step}`} className="sf-story-reveal"><h3>{current.title}</h3><p>{current.copy}</p></div>
        <span className="sf-story-example">Illustrative example · No call or inquiry is sent</span>
      </div>
      <div className="sf-story-scene" aria-label={`${current.label}, illustrative ${kind} example`}>
        <div className="sf-story-orbit" aria-hidden="true" />
        {kind === "receptionist" ? <div className="sf-story-phone">
          <div className="sf-story-device-top"><span>9:41</span><span>•••</span></div>
          <div className={`sf-story-call-icon ${step === 0 && !paused && !reduced && visible ? "is-ringing" : ""}`}><Phone size={25} /></div>
          <span className="sf-story-kicker">{step === 0 ? "INCOMING CALL" : "EMBER / AI RECEPTIONIST"}</span>
          <strong>{step === 0 ? "A new opportunity." : "You're still open."}</strong>
          <div className="sf-story-wave" data-active={!paused && !reduced && visible && step === 1} aria-hidden="true">{Array.from({ length: 19 }, (_, i) => <i key={i} style={{ height: `${12 + (i * 17 % 35)}px`, animationDelay: `${i * .07}s` }} />)}</div>
          <div className="sf-story-phone-note">{step < 2 ? "Missed calls. Busy hours. After hours." : "Service inquiry captured"}</div>
        </div> : <div className={`sf-story-browser ${step === 1 ? "is-mobile" : ""}`}>
          <div className="sf-story-browser-top"><span>● ● ●</span><span>DESERT & PINE / EXAMPLE</span></div>
          <div className="sf-story-web-content"><span>LOCAL EXPERTISE. PERSONAL SERVICE.</span><strong>Comfort starts<br />with a conversation.</strong><p>Thoughtful service for the place you call home.</p><span className="sf-story-fake-cta">Request a visit <ArrowUpRight size={13} /></span></div>
          <img src="/images/hvac-page.png" alt="" />
        </div>}
        <div className="sf-story-message" key={`${kind}-${step}-message`}>
          <span className="sf-story-message-icon">{step === 3 ? <Check size={19} /> : <MessageSquare size={19} />}</span>
          <div><span className="sf-story-kicker">{step === 3 ? "READY FOR YOUR TEAM" : step === 2 ? "CUSTOMER DETAILS" : "EXAMPLE CONVERSATION"}</span>
          <strong>{step === 3 ? "Appointment requested" : step === 2 ? "Alex · Service inquiry" : kind === "website" ? "Can I ask about a service?" : step === 0 ? "Someone needs your help." : "Thanks for calling. How can I help?"}</strong>
          <p>{step === 3 ? "Confirm availability and follow up." : step === 2 ? "Needs help with cooling. Prefers tomorrow." : "A clearer path to the next conversation."}</p></div>
        </div>
      </div>
    </div>
    <div className="sf-story-steps" aria-label="Demonstration steps">{stories[kind].map((item, i) => <button key={item.label} aria-pressed={step === i} onClick={() => { setStep(i); setPaused(true); }}><span>0{i + 1}</span>{item.label}<i /></button>)}</div>
  </div>;
}
