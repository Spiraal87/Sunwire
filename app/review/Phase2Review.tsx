import Link from 'next/link';
export const metadata = { title: 'Phase 2 · Sunforge design review', robots: { index: false, follow: false } };
const pages = [
 {slug:'receptionist',label:'AI receptionist',description:'The original Ember video, stronger typography, and a connected phone-to-handoff composition.'},
 {slug:'website',label:'Websites',description:'The original website video, layered desktop and mobile designs, and the retained interactive demo.'},
 {slug:'hvac',label:'HVAC',description:'The original forge video with a service-specific request and team notification.'},
 {slug:'about',label:'About Sunforge',description:'An open brand story with larger type, the original core artwork, and the same founder information.'},
 {slug:'resources',label:'Resources',description:'A spacious index with numbered article rows and clearer reading hierarchy.'},
 {slug:'missed-call-cost',label:'Resource articles',href:'/resources/missed-call-cost',description:'A readable editorial layout with a quick answer, useful summaries, and desktop/mobile article navigation.'},
];
export default function ReviewGallery() {
 return <main className="mx-auto max-w-7xl px-6 py-16 text-[#f3f0e8]">
  <p className="font-mono text-xs uppercase tracking-widest text-[#eab362]">Sunforge Digital / Phase 2</p>
  <h1 className="mt-5 font-display text-4xl tracking-tight sm:text-6xl">One site. One visual language.</h1>
  <p className="mt-6 max-w-2xl text-base leading-8 text-[#b3b2ae]">The approved forge direction now extends across the service pages, About, and resources. Original videos, existing content, and working integrations are preserved. This is a local design preview.</p>
  <div className="my-8 flex flex-wrap gap-4"><Link className="sf-button" href="/">Open the homepage ↗</Link><Link className="sf-text-link" href="/review/phase1">Phase 1 screenshots</Link><Link className="sf-text-link" href="/review/original">Original homepage</Link></div>
  <h2 className="mt-14 font-display text-3xl">More presence on a wide screen.</h2>
  <p className="mb-6 mt-4 text-sm leading-7 text-[#b3b2ae]">The homepage now uses more of a wide viewport while keeping paragraphs at a readable width.</p>
  <a href="/phase2-review/homepage-wide.png" target="_blank" rel="noreferrer"><img src="/phase2-review/homepage-wide.png" alt="The refined homepage at 2541 pixels wide" className="w-full rounded border border-white/15" /></a>
  {pages.map(page=><section key={page.slug} className="mt-20 border-t border-white/15 pt-10">
   <div className="mb-6 flex flex-wrap items-end justify-between gap-5"><div><h2 className="font-display text-3xl">{page.label}</h2><p className="mt-3 max-w-2xl text-sm leading-7 text-[#b3b2ae]">{page.description}</p></div><Link className="sf-text-link" href={page.href??`/${page.slug}`}>Explore the page ↗</Link></div>
   <div className="grid gap-6 md:grid-cols-2">{['before','after'].map(version=><figure key={version}><figcaption className="mb-3 font-mono text-xs uppercase tracking-wider text-[#c7bba9]">{version==='before'?'Previous design':'Phase 2'}</figcaption><a href={`/phase2-review/${version}/${page.slug}-desktop.png`} target="_blank" rel="noreferrer"><img src={`/phase2-review/${version}/${page.slug}-desktop.png`} alt={`${page.label}: ${version} desktop`} className="w-full rounded border border-white/15" loading="lazy" /></a></figure>)}</div>
   <details className="mt-5 border-b border-white/15 pb-5"><summary className="cursor-pointer py-3 text-sm text-[#eab362]">View mobile{['receptionist','website','hvac'].includes(page.slug)?' and service section':''}</summary><div className="mt-5 flex flex-wrap items-start gap-6"><img src={`/phase2-review/after/${page.slug}-mobile.png`} alt={`${page.label} on mobile`} width={300} className="max-w-full rounded border border-white/15" loading="lazy" />{['receptionist','website','hvac'].includes(page.slug)&&<img src={`/phase2-review/after/${page.slug}-service.png`} alt={`${page.label} dimensional service section`} className="w-full max-w-3xl rounded border border-white/15" loading="lazy" />}</div></details>
  </section>)}
  <p className="mt-14 max-w-3xl text-sm leading-7 text-[#b3b2ae]">Phase 3 remains separate: connected journeys, expanded personalization, approved Ember recordings, richer website examples, and calculator/assessment refinements. No calls, leads, or appointments were triggered during testing. Nothing is deployed to production.</p>
 </main>;
}
