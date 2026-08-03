const facts = [
  { label: "BASED IN", value: "Phoenix, Arizona" },
  { label: "FOCUS", value: "Local businesses across the Valley" },
  { label: "APPROACH", value: "Understand the business, then build" },
];

export default function AboutOperator() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Who&apos;s behind it</h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Local operator
        </span>
      </div>

      <div className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface sm:p-10 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">Who&apos;s behind it</p>
        <p className="mt-4 max-w-xl font-body text-base text-text-primary sm:text-lg">
          Run by Christopher Johnson &mdash; a Phoenix-based developer helping local businesses grow
          with better websites and AI receptionists.
        </p>

        <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {facts.map((fact) => (
            <div key={fact.label}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-gold">
                {fact.label}
              </dt>
              <dd className="mt-1 font-body text-sm text-text-primary">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
