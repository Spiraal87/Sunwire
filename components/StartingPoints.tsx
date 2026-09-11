"use client";

import Link from "next/link";
import WorkingDay from "./WorkingDay";
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
    <WorkingDay />
  </>;
}
