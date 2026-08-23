import type { Metadata } from "next";
import ResourceArticleLayout from "@/components/resources/ResourceArticleLayout";
import ResourceSection from "@/components/resources/ResourceSection";
import TrackedLink from "@/components/TrackedLink";
import { CTA_LABELS } from "@/lib/cta";

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
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ResourceArticleLayout
        title={TITLE}
        description={DESCRIPTION}
        quickAnswer="Depending on the industry and average job value, a single missed call can cost anywhere from roughly $50 to well over $1,000 in lost revenue. Multiplied across the calls a typical local business misses every month, after hours, during a rush, or when every line is busy, that adds up fast. The only number that actually matters is your own, built from your real call volume, miss rate, and average job value."
        guideItems={[
          { id: "why-calls-are-missed", label: "Why calls go unanswered" },
          { id: "cost-math", label: "The actual math behind the cost" },
          { id: "range", label: "Why the range is wider than people expect" },
          { id: "what-to-do", label: "What businesses actually do about it" },
        ]}
        summaryCards={[
          {
            eyebrow: "Leak point",
            title: "After hours and rushes",
            description: "The biggest misses usually come when nobody is free to answer, not from a lack of demand.",
          },
          {
            eyebrow: "Core math",
            title: "Volume x miss rate x job value",
            description: "A realistic estimate depends on your own call flow and what a booked customer is worth.",
          },
          {
            eyebrow: "Best next step",
            title: "Estimate your own number",
            description: "Generic averages are rough signals. Your business should be modeled from your real inputs.",
          },
        ]}
        footerCta={{
          title: "See what missed calls could be costing your business",
          description: "Plug in your own call volume and job value. It takes under a minute, no info required.",
          placement: "resource_missed_call_cost_footer",
          primary: {
            href: "/#contact",
            cta: "assessment_request",
            label: CTA_LABELS.assessment,
          },
          secondary: {
            href: "/calculator",
            cta: "missed_call_calculator",
            label: CTA_LABELS.calculator,
          },
        }}
      >
        <ResourceSection id="why-calls-are-missed" title="Why calls go unanswered in the first place">
          <p>
            Most missed calls at a local business are not due to neglect. They happen for
            predictable reasons: the business is closed for the day, every line is tied up during a
            rush, staff are mid-job and cannot get to the phone, or it is a slow period with nobody
            scheduled to answer. Each of those calls is still a customer who wanted to book
            something.
          </p>
        </ResourceSection>

        <ResourceSection id="cost-math" title="The actual math behind the cost">
          <p>
            The rough calculation is straightforward: take your monthly call volume, apply your
            miss rate, apply a reasonable booking rate for the calls you do answer, and multiply by
            your average job value. What is hard is getting honest numbers for each variable. Most
            published industry-average figures trace back to a single dated study, or to companies
            that sell phone-answering products and have a direct interest in the number being large.
          </p>
          <p>
            That is the thinking behind our own{" "}
            <TrackedLink
              href="/calculator"
              cta="missed_call_calculator"
              placement="resource_missed_call_cost"
              className="text-text-primary underline decoration-gold/60 underline-offset-4 transition-colors hover:text-gold"
            >
              missed-call revenue calculator
            </TrackedLink>
            . Instead of asserting a single industry number, it uses your own call volume,
            unanswered rate, and average job value to produce a range specific to your business,
            explicitly framed as a starting-point estimate, not a guarantee.
          </p>
        </ResourceSection>

        <ResourceSection id="range" title="Why the range is usually wider than people expect">
          <p>
            A restaurant losing a $60 reservation and a home-services company losing a $1,200 job
            are both &quot;a missed call,&quot; but the revenue at stake is nothing alike. Call
            volume matters just as much. A business fielding 300 calls a month with a 30% miss rate
            is losing roughly ten times as many opportunities as one fielding 30 calls a month at
            the same miss rate.
          </p>
          <p>
            That is why a single flat number for what missed calls cost is close to meaningless
            without knowing your own volume, miss rate, and job value.
          </p>
        </ResourceSection>

        <ResourceSection id="what-to-do" title="What businesses actually do about it">
          <p>
            Once a business has a real sense of what missed calls are costing, the fix usually
            comes down to making sure fewer calls go unanswered in the first place, whether that is
            adding staff to cover phones during peak hours, or routing unanswered calls to something
            that can pick up automatically, check availability, and book the job without waiting for
            someone to be free.
          </p>
          <p>
            That second approach is what our AI receptionist, Ember, is built to do. It runs
            alongside a business&apos;s existing phone number and staff, and only picks up when a
            call would otherwise go unanswered.
          </p>
        </ResourceSection>
      </ResourceArticleLayout>
    </>
  );
}
