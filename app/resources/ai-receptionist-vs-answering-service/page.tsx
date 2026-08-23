import type { Metadata } from "next";
import ResourceArticleLayout from "@/components/resources/ResourceArticleLayout";
import ResourceSection from "@/components/resources/ResourceSection";
import { CTA_LABELS } from "@/lib/cta";

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
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ResourceArticleLayout
        title={TITLE}
        description={DESCRIPTION}
        quickAnswer="A traditional answering service uses human operators, usually working from a script, often with limited hours and a per-minute or per-call cost. An AI receptionist is software that answers instantly, any time of day, using the business's own hours, services, and pricing to hold a real conversation and book the job directly onto the calendar without a human operator on the other end."
        guideItems={[
          { id: "answering-service", label: "How a traditional answering service works" },
          { id: "ai-receptionist", label: "How an AI receptionist works" },
          { id: "voice-recording", label: "What about a voice recording?" },
          { id: "differences", label: "Where they actually differ" },
          { id: "when-each-fits", label: "When each option makes sense" },
        ]}
        summaryCards={[
          {
            eyebrow: "Live operator",
            title: "Answering service",
            description: "A person picks up, follows a script, and usually passes a message back to the business.",
          },
          {
            eyebrow: "One-way audio",
            title: "Voice recording",
            description: "A caller hears pre-recorded information or leaves voicemail, but nobody handles the conversation.",
          },
          {
            eyebrow: "Real-time system",
            title: "AI receptionist",
            description: "The caller gets answers, next-step guidance, and often direct booking without waiting for a callback.",
          },
        ]}
        footerCta={{
          title: "Hear an AI receptionist handle a real call",
          description: "Call the live demo line and judge for yourself. No info required.",
          placement: "resource_ai_vs_answering_service_footer",
          primary: {
            href: "/#contact",
            cta: "assessment_request",
            label: CTA_LABELS.assessment,
          },
          secondary: {
            href: "/#demo",
            cta: "ai_receptionist_demo",
            label: CTA_LABELS.aiDemo,
          },
        }}
      >
        <ResourceSection id="answering-service" title="How a traditional answering service works">
          <p>
            A live answering service routes your unanswered calls to a call center, where a human
            operator picks up, often reading from a general script rather than speaking with deep
            knowledge of your specific business. They take a message or basic details and pass them
            along, but usually cannot check your real-time calendar or book an appointment on the
            spot.
          </p>
          <p>
            Pricing is typically per-minute or per-call, so cost scales directly with call volume,
            and coverage is limited to whatever hours the service staffs.
          </p>
        </ResourceSection>

        <ResourceSection id="ai-receptionist" title="How an AI receptionist works">
          <p>
            An AI receptionist is configured around a specific business&apos;s hours, services,
            pricing, and the questions its customers actually ask. When a call comes in that would
            otherwise go unanswered, it talks through what the caller needs, checks real-time
            availability, and books the appointment straight onto the calendar, or takes a detailed
            message if it cannot.
          </p>
          <p>
            The business is notified right away with a summary of the call. It runs 24/7 alongside
            the business&apos;s existing phone number and staff, not as a replacement for either.
          </p>
        </ResourceSection>

        <ResourceSection id="voice-recording" title="What about a voice recording or voicemail menu?">
          <p>
            A voice recording is a different category from a live answering service. It can tell
            callers your hours, route them to a department, or ask them to leave a voicemail, but
            it is still one-way. It cannot answer follow-up questions, adapt to what the caller
            says, or check live availability.
          </p>
          <p>
            If the goal is simply to share basic information after hours and capture a name and
            number, a recording can be enough. If the goal is to rescue ready-to-book callers in
            the moment, it usually falls short because the caller still has to wait for someone to
            call back.
          </p>
        </ResourceSection>

        <ResourceSection id="differences" title="Where they actually differ">
          <ul className="list-disc space-y-3 pl-5 marker:text-gold">
            <li>
              <span className="text-text-primary">Availability:</span> an answering service is
              staffed during set hours, a voice recording only plays what you recorded, and an AI
              receptionist answers instantly, 24/7.
            </li>
            <li>
              <span className="text-text-primary">Conversation quality:</span> a recording cannot
              respond at all, a live operator can respond but often from a script, and an AI
              receptionist can answer common questions based on your configured business details.
            </li>
            <li>
              <span className="text-text-primary">Booking:</span> an AI receptionist can check
              real-time availability and book directly onto a calendar. A live operator typically
              takes a message, and a recording pushes the caller to voicemail or another step.
            </li>
            <li>
              <span className="text-text-primary">Consistency:</span> a live operator&apos;s
              familiarity with your business varies call to call, while a recording and an AI
              receptionist both stay on-message, with only the AI able to handle back-and-forth.
            </li>
            <li>
              <span className="text-text-primary">Cost structure:</span> answering services are
              usually billed per minute or per call, so cost rises with volume. A recording is
              cheaper but limited, while an AI receptionist is typically a flat monthly rate.
            </li>
          </ul>
        </ResourceSection>

        <ResourceSection id="when-each-fits" title="When each option makes sense">
          <p>
            A live answering service can still make sense for businesses that need a human handling
            genuinely complex, non-scriptable conversations, or that have call volume too low to
            justify a dedicated system. A basic recording can work if all you need is an after-hours
            message and voicemail capture.
          </p>
          <p>
            For most local businesses fielding routine calls about booking, hours, pricing, and
            availability, an AI receptionist tends to close the real gap. It answers immediately
            instead of sending callers to a recording, and it books the job instead of only taking
            a message.
          </p>
          <p>
            The most direct way to judge the difference is to hear it handle a real conversation.
            Our own AI receptionist, Ember, has a live interactive demo line you can call before
            deciding anything.
          </p>
        </ResourceSection>
      </ResourceArticleLayout>
    </>
  );
}
