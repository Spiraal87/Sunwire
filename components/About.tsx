export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">About Sunforge</h2>
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
        <h3 className="mt-5 max-w-2xl font-display text-2xl font-semibold text-text-primary sm:text-3xl">
          Forged in the heat of the sun.
        </h3>
        <div className="mt-4 max-w-3xl space-y-4 font-body text-text-muted">
          <p>
            Sunforge is two ideas locked together as one mechanism: the sun as the source of
            heat, and the forge as the place where raw material gets shaped into something useful.
          </p>
          <p>
            That&apos;s the whole point of the work here. Take the pressure, noise, and missed
            opportunities a local business deals with every day, then turn that energy into
            systems that actually help: a site that earns trust, and an AI receptionist that keeps
            the phone from becoming a leak.
          </p>
        </div>
      </div>
    </section>
  );
}
