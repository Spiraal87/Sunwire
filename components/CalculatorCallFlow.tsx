"use client";

import { useEffect, useRef, useState, type CSSProperties } from 'react';

export default function CalculatorCallFlow({ calls, miss, locations }: { calls: number; miss: number; locations: number }) {
  const host = useRef<HTMLDivElement>(null);
  const [running, setRunning] = useState(false);
  const [paused, setPaused] = useState(false);
  const total = Math.round(calls * locations);
  const missed = Math.round(calls * locations * miss / 100);
  useEffect(() => {
    let visible = false;
    const sync = () => setRunning(visible && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); });
    observer.observe(host.current!);
    document.addEventListener('visibilitychange', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); };
  }, []);
  return <div ref={host} className="calc-flow" data-running={running && !paused} style={{ '--flow-speed': `${3.8 - calls / 1500 * 2}s` } as CSSProperties}>
    <div className="calc-flow-heading"><span>YOUR MONTH IN CALLS</span><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? 'Play flow' : 'Pause flow'}</button></div>
    <div className="calc-flow-total"><strong>{total.toLocaleString('en-US')}</strong><span>incoming calls / month{locations > 1 ? ' · all locations' : ''}</span></div>
    <svg viewBox="0 0 440 135" fill="none" aria-hidden="true">
      <path d="M220 5 V35 Q220 65 170 65 H115 Q90 65 90 95 V128" stroke="#91b8af" strokeOpacity=".15" strokeWidth={3 + (100-miss)/12} />
      <path d="M220 5 V35 Q220 65 270 65 H325 Q350 65 350 95 V128" stroke="#edaa53" strokeOpacity=".18" strokeWidth={3 + miss/12} />
      <path className="calc-flow-stream" pathLength="100" d="M220 5 V35 Q220 65 170 65 H115 Q90 65 90 95 V128" stroke="#a4c8bd" strokeWidth="2" style={{ strokeDasharray: `2 ${4+miss/5}` }} />
      <path className="calc-flow-stream" pathLength="100" d="M220 5 V35 Q220 65 270 65 H325 Q350 65 350 95 V128" stroke="#ffc16d" strokeWidth="2" style={{ strokeDasharray: `2 ${4+(100-miss)/5}` }} />
      <circle cx="220" cy="12" r="9" fill="#191d1f" stroke="#eab362" /><circle cx="220" cy="12" r="3" fill="#ffce83" />
      <circle cx="90" cy="126" r="4" fill="#a4c8bd" /><circle cx="350" cy="126" r="4" fill="#ffc16d" />
    </svg>
    <div className="calc-flow-outcomes">
      <div><span>Answered · {100-miss}%</span><strong data-call-count="answered">{(total-missed).toLocaleString('en-US')}</strong><small>conversations started</small></div>
      <div><span>Unanswered · {miss}%</span><strong data-call-count="missed">{missed.toLocaleString('en-US')}</strong><small>calls without an answer</small></div>
    </div>
    <p>Adjust call volume or unanswered % to change the flow. Call counts are estimates, not bookings.</p>
  </div>;
}
