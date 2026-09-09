"use client";
import { useEffect, useRef, useState, type ComponentProps } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import type Hero from './Hero';
import { captureEvent } from '@/lib/analytics';

export default function ServiceHero({ eyebrow, heading, subhead, videoSrc = '/images/hero-video.mp4', posterSrc = '/images/hero-image3.png', primaryCta, secondaryCta }: ComponentProps<typeof Hero>) {
  const staticPoster = videoSrc === '/images/receptionist_video.mp4' ? '/images/receptionist-poster.jpg' : videoSrc === '/images/website-hero.mp4' ? '/images/website-poster.jpg' : posterSrc;
  const media = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const reduced = matchMedia('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const updatePreference = () => setEnabled(!reduced.matches && !connection?.saveData);
    updatePreference(); reduced.addEventListener('change', updatePreference);
    let inView = true;
    const updateVisibility = () => setVisible(inView && !document.hidden);
    const observer = new IntersectionObserver(entries => { inView = entries[0].isIntersecting; updateVisibility(); }, { threshold: .05 });
    observer.observe(media.current!); document.addEventListener('visibilitychange', updateVisibility);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', updateVisibility); reduced.removeEventListener('change', updatePreference); };
  }, []);
  useEffect(() => {
    if (!video.current) return;
    if (enabled && visible && !paused) video.current.play().catch(error => { if (error.name !== 'AbortError') setPaused(true); });
    else video.current.pause();
  }, [enabled, visible, paused]);
  return <section className="sf-video-hero" aria-labelledby="service-title">
    <div ref={media} className="sf-video-media" aria-hidden="true">
      <img src={staticPoster} alt="" fetchPriority="high" />
      {enabled && <video ref={video} muted playsInline loop preload="metadata" poster={staticPoster} onError={() => setEnabled(false)}><source src={videoSrc} type="video/mp4" /></video>}
    </div>
    <div className="sf-video-content">
      <p className="sf-eyebrow sf-enter"><span /> {eyebrow}</p>
      <h1 id="service-title" className="sf-enter">{heading}</h1>
      <p className="sf-video-description sf-enter">{subhead}</p>
      <div className="sf-hero-actions sf-enter">
        <a className="sf-button" href={primaryCta?.href ?? '#contact'} onClick={() => captureEvent('cta_clicked', { cta: primaryCta?.cta ?? 'assessment_request', placement: primaryCta?.placement ?? 'service_hero' })}>Request an assessment <ArrowUpRight size={18} /></a>
        {secondaryCta && <Link className="sf-text-link" href={secondaryCta.href} onClick={() => captureEvent('cta_clicked', { cta: secondaryCta.cta, placement: secondaryCta.placement })}>{secondaryCta.label} <ArrowUpRight size={16} /></Link>}
      </div>
      <p className="sf-hero-note">A 15-minute conversation. Built around your business.</p>
    </div>
    <div className="sf-video-foot"><a href="#service-preview">See how it connects <ArrowDown size={15} /></a>{enabled && <button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Play video' : 'Pause video'}</button>}</div>
  </section>;
}
