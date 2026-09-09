import Link from 'next/link';

export const metadata = { title: 'Stage 1 · Sunforge design review', robots: { index: false, follow: false } };

export default function ReviewGallery() {
  return <main className="mx-auto max-w-7xl px-6 py-16 text-[#f3f0e8]">
    <p className="font-mono text-xs uppercase tracking-widest text-[#eab362]">Sunforge Digital / Stage 1</p>
    <h1 className="mt-5 font-display text-4xl tracking-tight sm:text-6xl">A more dimensional Sunforge.</h1>
    <p className="mt-6 max-w-2xl text-base leading-8 text-[#b3b2ae]">A real molten core, machined rings, clearer typography, and a connected receptionist section. This is an isolated local preview. Stage 2 and Stage 3 await your visual review.</p>
    <div className="my-8 flex flex-wrap gap-4"><Link className="rounded border border-[#eab362] bg-[#eab362] px-5 py-3 text-sm font-semibold text-[#17130d]" href="/">Explore the prototype ↗</Link><Link className="rounded border border-white/20 px-5 py-3 text-sm" href="/review/original">Explore the original ↗</Link></div>
    <div className="grid gap-8 md:grid-cols-2">
      {[['desktop-original.png', 'Original homepage hero'], ['desktop-prototype.png', 'Stage 1 — interactive forge']].map(([file, caption]) => <figure key={file}><figcaption className="mb-3 font-mono text-xs text-[#c8bbab]">{caption}</figcaption><a href={`/review-assets/${file}`} target="_blank" rel="noreferrer"><img className="w-full rounded border border-white/15" src={`/review-assets/${file}`} alt={caption} /></a></figure>)}
    </div>
    <h2 className="mb-6 mt-16 font-display text-3xl">One connected visual language.</h2>
    <img className="w-full rounded border border-white/15" src="/review-assets/desktop-service.png" alt="Layered Ember conversation and owner notification with an amber connection" />
    <h2 className="mb-6 mt-16 font-display text-3xl">Designed for the smaller screen.</h2>
    <div className="grid items-start gap-8 sm:grid-cols-3">
      {[['mobile-original.png', 'Original mobile hero'], ['mobile-hero-full.png', 'Stage 1 mobile hero'], ['mobile-service.png', 'Stage 1 mobile service section']].map(([file, caption]) => <figure key={file}><figcaption className="mb-3 font-mono text-xs text-[#c8bbab]">{caption}</figcaption><a href={`/review-assets/${file}`} target="_blank" rel="noreferrer"><img className="w-full rounded border border-white/15" src={`/review-assets/${file}`} alt={caption} loading="lazy" /></a></figure>)}
    </div>
    <h2 className="mb-6 mt-16 font-display text-3xl">Motion, with an off switch.</h2>
    <p className="mb-6 max-w-2xl text-sm leading-7 text-[#b3b2ae]">The recording shows cursor response, pause/resume, the sample summary, and responsive/fallback checks. It is a browser review recording, not a customer call. Open the prototype to judge motion on your device.</p>
    <video className="w-full rounded border border-white/15" controls playsInline preload="none" poster="/review-assets/desktop-prototype.png" aria-label="Stage 1 browser review recording"><source src="/review-assets/review-motion.webm" type="video/webm" /></video>
    <p className="mt-8 max-w-3xl text-sm leading-7 text-[#b3b2ae]">Build, type, calculator, and assessment checks pass. Chrome review covers desktop/mobile, keyboard controls, reduced motion, data saver, and missing/lost WebGL. GPU draw checks confirm pause and visibility handling. Physical mobile devices and Safari remain untested. The original video and poster remain fallbacks; existing media files are unchanged.</p>
    <p className="mt-8 text-sm text-[#eab362]">Ready for your Stage 1 visual review. No production deployment.</p>
  </main>;
}
