"use client";

import { useEffect, useRef, useState } from 'react';

export default function ForgeCore() {
  const host = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [mode, setMode] = useState<'poster' | 'webgl' | 'video'>('poster');
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  const scene = useRef<ReturnType<typeof import('@/lib/forge-scene').createForgeScene>>();
  useEffect(() => {
    const element = host.current!;
    let cancelled = false;
    let generation = 0;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const constrained = connection?.saveData || /(^|-)2g$/.test(connection?.effectiveType ?? '') || navigator.hardwareConcurrency <= 2;
    const fail = () => { scene.current?.dispose(); scene.current = undefined; if (!cancelled) setMode(reduced.matches || constrained ? 'poster' : 'video'); };
    const configure = () => {
      const currentGeneration = ++generation;
      scene.current?.dispose(); scene.current = undefined;
      setMode('poster');
      if (reduced.matches || constrained) return;
      import('@/lib/forge-scene').then(({ createForgeScene }) => {
        if (cancelled || reduced.matches || currentGeneration !== generation) return;
        try { scene.current = createForgeScene(element, fail); setMode('webgl'); } catch { fail(); }
      }).catch(fail);
    };
    configure(); reduced.addEventListener('change', configure);
    let inView = true;
    const update = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; update(); }, { threshold: .05 });
    observer.observe(element); document.addEventListener('visibilitychange', update);
    return () => { cancelled = true; observer.disconnect(); document.removeEventListener('visibilitychange', update); reduced.removeEventListener('change', configure); scene.current?.dispose(); scene.current = undefined; };
  }, []);
  useEffect(() => {
    scene.current?.setActive(visible && !paused);
    if (video.current) { if (visible && !paused) video.current.play().catch(() => setMode('poster')); else video.current.pause(); }
  }, [visible, paused, mode]);
  return (
    <div className="sf-core-wrap" data-render-mode={mode}>
      <div className="sf-core-halo" aria-hidden="true" />
      <div ref={host} className="sf-core-canvas" role="img" aria-label="The Sunforge core: a molten amber sphere within four rotating, machined metal rings" />
      {mode !== 'webgl' && <div className="sf-core-fallback">
        {mode === 'video' ? <video ref={video} muted loop playsInline preload="none" poster="/images/hero-image3.png" aria-hidden="true"><source src="/images/hero-video.mp4" type="video/mp4" /></video> : <img src="/images/hero-image3.png" alt="" fetchPriority="high" />}
      </div>}
      {mode === 'webgl' && <div className="sf-core-interaction"><span>Swipe to spin · Tap to ignite</span><button type="button" disabled={paused} onClick={() => scene.current?.pulse()}>Ignite core</button></div>}
      <div className="sf-core-caption"><span><i /> THE SUNFORGE CORE</span>{mode !== 'poster' && <button type="button" onClick={() => setPaused(value => !value)} aria-pressed={paused}>{paused ? 'Resume motion' : 'Pause motion'}</button>}</div>
    </div>
  );
}
