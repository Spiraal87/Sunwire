"use client";
import { useEffect, useState } from 'react';

export default function CalculatorNumber({ value, min, max, label, unit, onChange }: {
  value: number; min: number; max: number; label: string; unit?: string; onChange: (value: number) => void;
}) {
  const [draft, setDraft] = useState(String(value));
  useEffect(() => setDraft(String(value)), [value]);
  function commit() {
    const parsed = draft.trim() === '' ? value : Number(draft);
    const next = Number.isFinite(parsed) ? Math.min(max, Math.max(min, Math.round(parsed))) : value;
    setDraft(String(next)); onChange(next);
  }
  return <span className="calc-number">
    {unit === '$' && <span aria-hidden="true">$</span>}
    <input type="number" inputMode="numeric" aria-label={label} min={min} max={max} step={1} value={draft}
      onChange={event => {
        setDraft(event.target.value);
        const next = Number(event.target.value);
        if (event.target.value !== '' && Number.isInteger(next) && next >= min && next <= max) onChange(next);
      }}
      onBlur={commit} onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); commit(); event.currentTarget.blur(); } }} />
    {unit && unit !== '$' && <span aria-hidden="true">{unit}</span>}
  </span>;
}
