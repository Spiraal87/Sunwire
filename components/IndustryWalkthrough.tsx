"use client";
import { useState } from "react";
import { ArrowRight, Check, RotateCcw } from "lucide-react";
import { industries } from "@/lib/assessment";

const handoffs = {
  home: ["Cooling service request", "AC is not cooling", "Tomorrow requested", "Dispatcher to confirm availability and address"],
  restaurant: ["Reservation request", "Party of six", "Friday requested", "Host to confirm time and table availability"],
  salon: ["Appointment request", "Haircut", "This week requested", "Salon to confirm service and available times"],
  fitness: ["New member inquiry", "Beginner interested in a class", "Saturday requested", "Studio to share class details and next steps"],
  retail: ["Custom-order inquiry", "Customer wants a custom order", "Timing to be discussed", "Shop to collect specifications and follow up"],
  medical: ["New patient inquiry", "Asking about new patient availability", "Appointment time not selected", "Front desk to confirm availability and scheduling"],
};
export default function IndustryWalkthrough({ industry }: { industry: typeof industries[number] }) {
  const [step, setStep] = useState(0);
  const record = handoffs[industry.id];
  return <div className="sf-industry-walkthrough">
    <div className="sf-industry-progress" aria-label="Walkthrough steps">{["The inquiry", "The conversation", "The handoff"].map((label,i)=><button key={label} aria-pressed={step===i} onClick={()=>setStep(i)}><span>0{i+1}</span>{label}</button>)}</div>
    <div className="sf-industry-chat" aria-live="polite" aria-atomic="false">
      <div className="sf-industry-bubble"><span>CUSTOMER</span><p>{industry.caller}</p></div>
      {step>=1 && <div className="sf-industry-bubble sf-industry-answer"><span>EMBER / AI RECEPTIONIST</span><p>{industry.reply}</p></div>}
      {step===2 && <div className="sf-industry-record"><span className="sf-story-kicker"><Check size={15}/> READY FOR YOUR TEAM</span><h4>{record[0]}</h4><dl><div><dt>Inquiry</dt><dd>{record[1]}</dd></div><div><dt>Preference</dt><dd>{record[2]}</dd></div><div><dt>Next step</dt><dd>{record[3]}</dd></div></dl><p>{industry.outcome}</p><small>Example request · Not a confirmed booking</small></div>}
    </div>
    <button className="sf-industry-next" onClick={()=>setStep((step+1)%3)}>{step===2 ? <><RotateCcw size={16}/> Replay example</> : <>{step===0 ? "See how Ember responds" : "See what your team receives"}<ArrowRight size={16}/></>}</button>
  </div>;
}
