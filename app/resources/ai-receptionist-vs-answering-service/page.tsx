import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

const TITLE = "AI Receptionist vs. Answering Service: What's the Difference?";
const DESCRIPTION =
  "How AI phone receptionists and traditional answering services actually differ, and how to tell which one fits a local business.";
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
  mainEntityOfPage:
    "https://sunforgedigital.com/resources/ai-receptionist-vs-answering-service",
};

export default function AiReceptionistVsAnsweringServicePage() {
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
          A traditional answering service uses human operators, usually working from a script,
          often with limited hours and a per-minute or per-call cost. An AI receptionist is
          software that answers instantly, any time of day, using the business&apos;s own hours,
          services, and pricing to hold a real conversation and book the job directly onto the
          calendar — without a human operator on the other end. Both exist to catch calls a
          business would otherwise miss; they just work in fundamentally different ways
          underneath.
        </p>
      </div>

      <div className="mt-10 space-y-8 font-body text-text-muted">
        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            How a traditional answering service works
          </h2>
          <p className="mt-3">
            A live answering service routes your unanswered calls to a call center, where a human
            operator picks up — often reading from a general script rather than speaking with deep
            knowledge of your specific business. They take a message or basic details and pass
            them along, but usually can&apos;t check your real-time calendar or book an
            appointment on the spot. Pricing is typically per-minute or per-call, so cost scales
            directly with call volume, and coverage is limited to whatever hours the service
            staffs.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            How an AI receptionist works
          </h2>
          <p className="mt-3">
            An AI receptionist is configured around a specific business&apos;s hours, services,
            pricing, and the questions its customers actually ask. When a call comes in that would
            otherwise go unanswered, it talks through what the caller needs, checks real-time
            availability, and books the appointment straight onto the calendar — or takes a
            detailed message if it can&apos;t. The business is notified right away with a summary
            of the call. It runs 24/7 alongside the business&apos;s existing phone number and
            staff, not as a replacement for either.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Where they actually differ
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-5">
            <li>
              <span className="text-text-primary">Availability:</span> an answering service is
              staffed during set hours; an AI receptionist answers instantly, 24/7.
            </li>
            <li>
              <span className="text-text-primary">Booking:</span> an AI receptionist can check
              real-time availability and book directly onto a calendar; a live operator typically
              takes a message for someone else to follow up on.
            </li>
            <li>
              <span className="text-text-primary">Consistency:</span> a live operator&apos;s
              familiarity with your business varies call to call; an AI receptionist answers from
              the same configured knowledge of your hours, services, and pricing every time.
            </li>
            <li>
              <span className="text-text-primary">Cost structure:</span> answering services are
              usually billed per minute or per call, so cost rises with volume; an AI receptionist
              is typically a flat monthly rate regardless of how many calls come in.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            When each one makes sense
          </h2>
          <p className="mt-3">
            A live answering service can still make sense for businesses that need a human handling
            genuinely complex, non-scriptable conversations, or that have call volume too low to
            justify a dedicated system. For most local businesses fielding routine calls — booking
            questions, hours, pricing, availability — an AI receptionist tends to close the actual
            gap: it answers immediately instead of during business hours only, and books the job
            instead of just taking a message.
          </p>
          <p className="mt-3">
            The most direct way to judge either option is to hear it handle a real conversation.
            Our own AI receptionist, Ember, has a live interactive demo line you can call before
            deciding anything.
          </p>
        </section>
      </div>

      <div className="mt-12 rounded-panel border border-line bg-gradient-panel p-6 sm:p-8">
        <p className="font-display text-lg font-semibold text-text-primary">
          Hear an AI receptionist handle a real call
        </p>
        <p className="mt-2 font-body text-sm text-text-muted">
          Call the live demo line and judge for yourself — no info required.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            href="/#demo"
            cta="ai_receptionist_demo"
            placement="resource_ai_vs_answering_service_footer"
            className="rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            Hear the AI receptionist live
          </TrackedLink>
          <TrackedLink
            href="/calculator"
            cta="missed_call_calculator"
            placement="resource_ai_vs_answering_service_footer"
            className="rounded-btn border border-line px-6 py-3.5 font-display text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
          >
            See what missed calls cost you
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
