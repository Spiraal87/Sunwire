import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

const TITLE = "How Much Do Missed Calls Actually Cost a Local Business?";
const DESCRIPTION =
  "A breakdown of what a missed call really costs a local business, how to estimate your own number, and why generic industry averages only get you so far.";
const PUBLISHED = "2026-08-12";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Sunforge Digital`,
    description: DESCRIPTION,
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Person", name: "Christopher Johnson" },
  publisher: { "@type": "Organization", name: "Sunforge Digital" },
  mainEntityOfPage: "https://sunforgedigital.com/resources/missed-call-cost",
};

export default function MissedCallCostPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        <Link href="/resources" className="hover:text-gold">
          Resources
        </Link>
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{TITLE}</h1>

      <div className="mt-8 rounded-panel border border-gold/40 bg-gold/5 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
          Quick answer
        </p>
        <p className="mt-3 font-body text-base leading-relaxed text-text-primary">
          Depending on the industry and average job value, a single missed call can cost anywhere
          from roughly $50 to well over $1,000 in lost revenue. Multiplied across the calls a
          typical local business misses every month — after hours, during a rush, or when every
          line is busy — that adds up fast. The only number that actually matters is your own,
          built from your real call volume, miss rate, and average job value, not a generic
          industry figure.
        </p>
      </div>

      <div className="mt-10 space-y-8 font-body text-text-muted">
        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Why calls go unanswered in the first place
          </h2>
          <p className="mt-3">
            Most missed calls at a local business aren&apos;t due to neglect — they happen for
            predictable reasons: the business is closed for the day, every line is tied up during
            a rush, staff are mid-job and can&apos;t get to the phone, or it&apos;s a slow period
            with nobody scheduled to answer. Each of those calls is still a customer who wanted to
            book something.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            The actual math behind the cost
          </h2>
          <p className="mt-3">
            The rough calculation is straightforward: take your monthly call volume, apply your
            miss rate (the share that go unanswered), apply a reasonable booking rate for the
            calls you do answer, and multiply by your average job value. What&apos;s hard is
            getting honest numbers for each variable — most published &quot;industry average&quot;
            figures trace back to a single dated study, or to companies that sell phone-answering
            products and have a direct interest in the number being large.
          </p>
          <p className="mt-3">
            That&apos;s the thinking behind our own{" "}
            <TrackedLink
              href="/calculator"
              cta="missed_call_calculator"
              placement="resource_missed_call_cost"
              className="text-text-primary underline hover:text-gold"
            >
              missed-call revenue calculator
            </TrackedLink>
            : instead of asserting a single industry number, it uses your own call volume,
            unanswered rate, and average job value to produce a range specific to your business —
            explicitly framed as a starting-point estimate, not a guarantee.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Why the range is usually wider than people expect
          </h2>
          <p className="mt-3">
            A restaurant losing a $60 reservation and a home-services company losing a $1,200 job
            are both &quot;a missed call,&quot; but the revenue at stake is nothing alike. Call
            volume matters just as much — a business fielding 300 calls a month with a 30% miss
            rate is losing roughly ten times as many opportunities as one fielding 30 calls a
            month at the same miss rate. That&apos;s why a single flat number (&quot;missed calls
            cost businesses $X&quot;) is close to meaningless without knowing your own volume,
            miss rate, and job value.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            What businesses actually do about it
          </h2>
          <p className="mt-3">
            Once a business has a real sense of what missed calls are costing, the fix usually
            comes down to making sure fewer calls go unanswered in the first place — whether
            that&apos;s adding staff to cover phones during peak hours, or routing unanswered
            calls to something that can pick up automatically, check availability, and book the
            job without waiting for someone to be free. That second approach is what our AI
            receptionist, Ember, is built to do: it runs alongside a business&apos;s existing
            phone number and staff, and only picks up when a call would otherwise go unanswered.
          </p>
        </section>
      </div>

      <div className="mt-12 rounded-panel border border-line bg-gradient-panel p-6 sm:p-8">
        <p className="font-display text-lg font-semibold text-text-primary">
          See what missed calls could be costing your business
        </p>
        <p className="mt-2 font-body text-sm text-text-muted">
          Plug in your own call volume and job value — takes under a minute, no info required.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            href="/calculator"
            cta="missed_call_calculator"
            placement="resource_missed_call_cost_footer"
            className="rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            Try the calculator
          </TrackedLink>
          <TrackedLink
            href="/#demo"
            cta="ai_receptionist_demo"
            placement="resource_missed_call_cost_footer"
            className="rounded-btn border border-line px-6 py-3.5 font-display text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
          >
            Hear the AI receptionist live
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
