const facts = [
  { label: "BASED IN", value: "Phoenix, Arizona" },
  { label: "FOCUS", value: "Local businesses across the Valley" },
  { label: "APPROACH", value: "Understand the business, then build" },
];

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">About Sunforge</h1>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          About the name
        </span>
      </div>

      <div className="rounded-panel border border-line bg-gradient-panel p-8 shadow-surface sm:p-10 md:p-12">
        <img
          src="/images/sunforge_icon_only.svg"
          alt="Sunforge ring icon"
          className="h-14 w-14 sm:h-16 sm:w-16"
        />
        <h2 className="mt-5 max-w-2xl font-display text-2xl font-semibold text-text-primary sm:text-3xl">
          Forged into something useful.
        </h2>
        <div className="mt-4 max-w-3xl space-y-4 font-body text-text-muted">
          <p>
            The name Sunforge combines two ideas: the energy of the sun and the craft of shaping
            raw material into something useful, durable, and built to work.
          </p>
          <p>
            That same thinking guides what we build for local businesses - practical digital systems
            that turn missed calls, repetitive work, and an underperforming website into more
            booked jobs, more time, and a business that runs more smoothly.
          </p>
        </div>

        <div className="mt-8 border-t border-line pt-8">
          <p className="max-w-2xl font-body text-base text-text-primary sm:text-lg">
            Run by Christopher Johnson - a Phoenix-based developer helping local businesses grow
            with better websites and AI receptionists.
          </p>

          <dl className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-secondary">
                  {fact.label}
                </dt>
                <dd className="mt-1 font-body text-sm text-text-primary">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}