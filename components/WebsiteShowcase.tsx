import Link from 'next/link';
import { ArrowUpRight, Check } from 'lucide-react';

export default function WebsiteShowcase() {
 return <section className="sf-web-showcase" id="service-preview" aria-labelledby="website-showcase-title">
   <div className="sf-service-top"><p className="sf-eyebrow">01 / YOUR DIGITAL FRONT DOOR</p><span>DESIGNED TO TURN INTEREST INTO INQUIRY</span></div>
   <div className="sf-web-grid">
     <div className="sf-service-copy"><h2 id="website-showcase-title">A first impression.<br /><span>A clear next step.</span></h2><p>Your reputation gets people interested. A clear, useful website helps them understand what you do and reach out, from whichever screen is in their hands.</p><ul><li><Check size={16} /> Services people can find and understand</li><li><Check size={16} /> A clear path from browsing to inquiry</li><li><Check size={16} /> Your business, on every screen</li></ul><Link href="#website-demo" className="sf-text-link">Explore the existing website demo <ArrowUpRight size={16} /></Link></div>
     <div className="sf-browser-stage">
       <div className="sf-browser-window">
         <div className="sf-browser-chrome"><span aria-hidden="true">● ● ●</span><span>desert-and-pine.example</span><b>DEMO</b></div>
         <div className="sf-sample-nav"><strong>DESERT <i>&</i> PINE<small>HEATING & COOLING</small></strong><span>Service with a local touch.</span></div>
         <div className="sf-sample-hero"><div><span>COMFORT, CLOSE TO HOME.</span><h3>Good days<br />start at home.</h3><p>AC repair, seasonal care, and a team that makes the next step simple.</p><span className="sf-sample-cta">Request a visit ↗</span></div><img src="/images/hvac-page.png" alt="HVAC technician working on a rooftop unit" loading="lazy" /></div>
         <div className="sf-sample-services"><span>01 / AC repair</span><span>02 / Seasonal care</span><span>03 / New systems</span></div>
       </div>
       <div className="sf-site-phone"><div className="sf-site-speaker" /><span className="sf-sample-brand">DESERT & PINE</span><p>Let’s get your<br />comfort back.</p><dl><div><dt>Service</dt><dd>AC repair</dd></div><div><dt>Preferred time</dt><dd>Morning</dd></div></dl><span className="sf-sample-cta">Request a visit ↗</span><small>Your team confirms availability.</small></div>
       <p className="sf-website-caption">FICTIONAL BUSINESS · DESIGN EXAMPLE · NO REQUEST IS SENT</p>
     </div>
   </div>
 </section>;
}
