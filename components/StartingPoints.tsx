"use client";

import Link from "next/link";
import { ArrowUpRight, Phone, Globe, Layers } from "lucide-react";

const options = [
  { icon: Phone, title: "Calls need attention.", label: "FRONT DESK SYSTEM", body: "Missed calls, after-hours inquiries, or too much phone tag. Start with a clearer path from the first ring to follow-up.", href: "/receptionist", action: "Explore the receptionist" },
  { icon: Globe, title: "Your website needs to work harder.", label: "WEBSITE + CONVERSION", body: "An unclear first impression or visits that go nowhere. Help people understand your services and take the next step.", href: "/website", action: "Explore websites" },
  { icon: Layers, title: "Both need to connect.", label: "ONE STEP AT A TIME", body: "Start where the most opportunities are being lost. Add the next system when the first is working for your business.", href: "#contact", action: "Find your starting point" },
];

export default function StartingPoints() {
  return <>
    <section className="sf-starting-points" aria-labelledby="starting-title">
      <header><span className="sf-story-kicker">A CLEARER NEXT STEP</span><h2 id="starting-title">Which starting point<br />fits your business?</h2><p>Start with the part of your day that needs the most help.</p></header>
      <div className="sf-starting-grid">{options.map((option, i) => <Link href={option.href} key={option.href} className="sf-starting-option">
        <div className="sf-starting-top"><span>0{i + 1}</span><option.icon size={27} strokeWidth={1.25} /></div>
        <span className="sf-story-kicker">{option.label}</span><h3>{option.title}</h3><p>{option.body}</p>
        <span className="sf-starting-action">{option.action}<ArrowUpRight size={19} /></span>
      </Link>)}</div>
    </section>
    <section className="sf-working-day" aria-labelledby="working-title">
      <figure><img src="/images/operations-assessment-scene.png" alt="A customer being helped at a busy local business front desk" loading="lazy" /><figcaption>MORE ROOM FOR THE PEOPLE IN FRONT OF YOU</figcaption></figure>
      <div className="sf-working-copy"><span className="sf-story-kicker">BUILT AROUND YOUR WORKDAY</span><h2 id="working-title">A busy day.<br /><span>A clearer way through.</span></h2><p>Give customers a clear response and your team the details to keep things moving. More attention for the work in front of you, with fewer loose ends behind it.</p>
        <div className="sf-working-outcomes"><span><b>01</b> A way to respond when you are busy</span><span><b>02</b> Customer details ready for your team</span><span><b>03</b> A clear next step for follow-up</span></div>
        <Link href="#contact">Talk through your workday <ArrowUpRight size={18} /></Link>
      </div>
    </section>
  </>;
}
