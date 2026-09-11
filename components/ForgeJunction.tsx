"use client";
import { useEffect, useId, useRef, useState } from 'react';

/** A single arrival sequence, without a recurring animation or WebGL scene. */
export default function ForgeJunction({ variant = 'major', onIgnite }: { variant?: 'major' | 'hero' | 'contact'; onIgnite?: () => void }) {
  const id = useId().replace(/:/g, '');
  const host = useRef<HTMLDivElement>(null);
  const fired = useRef(false);
  const [lit, setLit] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (!entries.some(entry => entry.isIntersecting)) return;
      setLit(true);
      if (!fired.current) { fired.current = true; onIgnite?.(); }
      observer.disconnect();
    }, { threshold: .25 });
    observer.observe(host.current!);
    return () => observer.disconnect();
  }, [onIgnite]);
  return <div ref={host} className={`sf-junction sf-junction--${variant} ${lit ? 'is-lit' : ''}`} aria-hidden="true">
    <div className="sf-junction-wash" />
    <svg viewBox="0 0 1000 230" fill="none">
      <defs>
        <linearGradient id={`${id}-metal`} x1="330" y1="25" x2="650" y2="205" gradientUnits="userSpaceOnUse"><stop stopColor="#363a3d" /><stop offset=".28" stopColor="#92938a" /><stop offset=".42" stopColor="#292d30" /><stop offset=".75" stopColor="#51514b" /><stop offset="1" stopColor="#191c1e" /></linearGradient>
        <radialGradient id={`${id}-sun`}><stop stopColor="#fff3b5" /><stop offset=".22" stopColor="#ffd06b" /><stop offset=".65" stopColor="#ef8b16" /><stop offset="1" stopColor="#753407" /></radialGradient>
      </defs>
      {[150,120,90,60].map((radius,i) => <g key={radius}>
        <path d={`M ${500-radius} 195 A ${radius} ${radius} 0 0 1 ${500+radius} 195`} stroke={`url(#${id}-metal)`} strokeWidth="18" />
        <path d={`M ${500-radius} 195 A ${radius} ${radius} 0 0 1 ${500+radius} 195`} stroke="#c1b59b" strokeOpacity=".3" strokeWidth="1" />
        <path className="sf-junction-ring" style={{ animationDelay: `${.2+(3-i)*.12}s` }} d={`M ${504-radius} 195 A ${radius-4} ${radius-4} 0 0 1 ${496+radius} 195`} stroke="#ecac4c" strokeWidth="2" />
        {Array.from({length:17},(_,tick)=>{ const angle=Math.PI+tick/16*Math.PI; return <path key={tick} d={`M ${500+Math.cos(angle)*(radius-5)} ${195+Math.sin(angle)*(radius-5)} L ${500+Math.cos(angle)*(radius+5)} ${195+Math.sin(angle)*(radius+5)}`} stroke={tick%4?'#ad8852':'#d2cab6'} strokeWidth={tick%4?1:2} opacity=".7" />; })}
      </g>)}
      <circle className="sf-junction-sun" cx="500" cy="195" r="29" fill={`url(#${id}-sun)`} />
      <path d="M 480 176 L 496 182 L 509 171 M 496 182 L 490 199 L 478 207 M 490 199 L 509 202 L 521 190 M 509 202 L 513 218" stroke="#ffe2a0" strokeWidth="1.2" opacity=".8" />
      <path d="M 500 195 H 690 L 717 182 H 773 L 800 195 H 980 M 500 195 H 310 L 283 182 H 227 L 200 195 H 20" stroke="#786248" strokeOpacity=".5" />
      <path className="sf-junction-signal" pathLength="1" d="M 500 195 H 690 L 717 182 H 773 L 800 195 H 980" stroke="#ffd489" strokeWidth="2" />
      <path className="sf-junction-signal" pathLength="1" d="M 500 195 H 310 L 283 182 H 227 L 200 195 H 20" stroke="#ffd489" strokeWidth="2" />
    </svg>
  </div>;
}
