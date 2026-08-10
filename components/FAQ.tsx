"use client";

import type { SyntheticEvent } from "react";
import { captureEvent } from "@/lib/analytics";

const faqs = [
  {
    question: "Does the AI receptionist replace my phone number or my staff?",
    answer:
      "No. It runs quietly alongside your existing number and team — it's a voice AI answering as your business, not a replacement for either. It's built to pick up when a call would otherwise go unanswered: after hours, during a rush, or when every line is busy.",
  },
  {
    question: "How does the AI receptionist actually work?",
    answer:
      "It's configured around your hours, services, pricing, and the questions your customers actually ask. When a call comes in that would otherwise go unanswered, it talks through what the caller needs, checks real-time availability, and books the appointment straight onto your calendar — or takes a detailed message if it can't. You're notified right away with a summary of the call.",
  },
  {
    question: "Does it work with my existing calendar or CRM?",
    answer:
      "Yes — it's built to slot in alongside what you already use, not replace it. No new software for your team to learn, no rip-and-replace. Every setup is a little different, so tell me what you're on and I'll confirm exactly how it connects before we build anything.",
  },
  {
    question: "Will it sound robotic?",
    answer:
      "You don't have to take our word for it — call the interactive demo line yourself and hear how it handles a real conversation before deciding anything. The voice itself is customizable too: you can choose from hundreds of different receptionist voices, in multiple languages, to match how you want your business to sound.",
  },
  {
    question: "Do I need to switch phone providers or get a new number?",
    answer:
      "No — it's built to work alongside your existing phone number, not replace your phone system.",
  },
  {
    question: "What does the website process look like?",
    answer:
      "It starts with a short conversation about your business — what you offer, who your customers are, and what they need to see. From there, a working site gets designed and built around the reputation you've already earned in person. You see it live, click through it, and ask for changes before anything is signed or launched. Once you're happy, it goes live, and updates to hours, menus, or services get handled as your business changes.",
  },
  {
    question: "How accurate is the missed-call revenue calculator?",
    answer:
      "The default numbers are reasonable starting points pulled from commonly cited industry figures, not verified facts about your specific business — several trace back to a single dated study, or to companies that sell phone-answering products and have a direct interest in the number being large. The only real number is the one built from your own actual call volume and average ticket, which is exactly what the sliders are for. It exists to start a conversation, not to hand you a defensible number.",
  },
  {
    question: "Do you guarantee results?",
    answer:
      "No. Any examples or figures shown on this site — including in the \"Small Improvements. Big Results.\" section — are illustrative only, not guarantees of specific outcomes. Actual results vary by business.",
  },
  {
    question: "Where are you based, and who do you work with?",
    answer:
      "Sunforge Digital is run by Christopher Johnson, a Phoenix-based developer, and focuses on local businesses across the Valley.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

function handleToggle(question: string) {
  return (e: SyntheticEvent<HTMLDetailsElement>) => {
    if (e.currentTarget.open) {
      captureEvent("faq_expanded", { question });
    }
  };
}

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-16 sm:scroll-mt-24 sm:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Frequently Asked Questions
        </h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Straight answers
        </span>
      </div>

      <div className="space-y-3">
        {faqs.map((faq) => (
          <details
            key={faq.question}
            onToggle={handleToggle(faq.question)}
            className="group rounded-panel border border-line bg-gradient-panel px-6 py-5 shadow-surface"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-text-primary sm:text-lg">
              {faq.question}
              <span
                aria-hidden="true"
                className="relative h-4 w-4 shrink-0 text-text-secondary"
              >
                <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
              </span>
            </summary>
            <p className="mt-3 font-body text-sm text-text-muted">{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
