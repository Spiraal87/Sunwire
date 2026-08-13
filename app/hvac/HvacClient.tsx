"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SectionDivider from "@/components/SectionDivider";
import CalculatorTeaser from "@/components/CalculatorTeaser";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import type { FaqEntry } from "@/components/FAQ";
import { captureEvent } from "@/lib/analytics";

// Swap in the real HVAC photo by setting `src` here — everything else
// (sizing, positioning, fallback) already matches the category-grid image
// treatment used elsewhere on the site.
const HVAC_SECTION_IMAGE: { src: string | null; alt: string } = {
  src: "/images/hvac-page.png",
  alt: "HVAC technician servicing a rooftop condenser unit under a warm Phoenix sky",
};

const problemBullets = [
  "A no-cool call comes in at 9pm on a 105° day. Nobody picks up. They call the next name on Google.",
  "Your tech is up on a roof mid-job. The office line rings through to voicemail. Voicemail gets ignored.",
  "Your busiest season is exactly when you have the least bandwidth to answer every call.",
];

const hvacServiceCards = [
  {
    id: "hvac-ai-receptionist",
    icon: "/images/icon-receptionist.svg",
    iconAlt: "AI receptionist icon",
    label: "01 / AI Receptionist",
    heading: "Answers Every Emergency Call",
    body: "Trained specifically on HVAC service calls: no-heat, no-cool, emergency repairs, tune-ups, estimates. When a call comes in after hours, mid-job, or during a summer rush, it gets answered, qualified, and booked straight onto your schedule — not left to ring out.",
    bullets: [
      "Captures the details a real emergency needs: address, system type, what's actually wrong",
      "Books directly onto your calendar or takes a detailed message if it can't",
      "Texts you a summary the moment the call ends, so nothing slips through",
      "Runs alongside your existing number — doesn't replace your team, just makes sure nothing gets missed",
    ],
  },
  {
    id: "hvac-websites",
    icon: "/images/icon-website.svg",
    iconAlt: "Website icon",
    label: "02 / Websites",
    heading: "Built to Convert, Not Just Exist",
    body: "A site that actually shows up when someone searches \"AC repair Phoenix\" or \"no heat emergency\" — and converts that search into a booked call, not a bounce.",
    bullets: [
      "Mobile-first — most emergency searches happen on a phone, mid-crisis",
      "Clear emergency CTA above the fold — tap-to-call, no hunting",
      "Built with the structured data that gets you found on Google and when someone asks ChatGPT or Perplexity for a recommendation",
    ],
  },
];

const hvacFaqs: FaqEntry[] = [
  {
    question: "Does it work with my dispatch or scheduling software?",
    answer:
      "It's built to slot in alongside what you already use, not replace it. Tell me what you're on and I'll confirm exactly how it connects before we build anything.",
  },
  {
    question: "Can it actually triage an emergency vs. a routine call?",
    answer:
      "Yes — it's trained to recognize urgency (no heat, no cool, gas smell, water leak) and flag those as priority, while routine calls (maintenance, estimates, tune-ups) get booked normally.",
  },
  {
    question: "Will my customers know they're not talking to a live person?",
    answer:
      "Some might, some won't — and that's kind of the point. Call the live demo yourself and judge if it's good enough for your business.",
  },
  {
    question: "What happens during a summer rush when call volume spikes?",
    answer:
      "It doesn't get overwhelmed the way a small office team can — every call still gets answered, no matter how many come in at once.",
  },
  {
    question: "Do I need a new phone number?",
    answer: "No. It runs alongside your existing line — you keep the number your customers already know.",
  },
];

function HvacProblem() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          >
            <h2 className="font-display text-2xl font-semibold sm:text-3xl">
              Where HVAC Companies Actually Lose Customers
            </h2>
            <ul className="mt-6 space-y-4">
              {problemBullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 font-body text-sm text-text-primary sm:text-base">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-coral"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-body text-text-muted">
              Same story, every summer: the businesses that answer first get the job. The ones that
              don&apos;t, don&apos;t.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-panel border border-line bg-panel-2-textured shadow-surface"
          >
            {HVAC_SECTION_IMAGE.src ? (
              <Image
                src={HVAC_SECTION_IMAGE.src}
                alt={HVAC_SECTION_IMAGE.alt}
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted-dark">
                  Image placeholder
                </span>
                <span className="font-display text-sm font-semibold uppercase tracking-[0.1em] text-text-muted">
                  HVAC Service Photo
                </span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HvacCalculatorSection() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="bg-panel-2-textured px-6 py-16 sm:py-24">
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: distance }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
          className="mb-10"
        >
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">
            What&apos;s a Missed Service Call Actually Costing You?
          </h2>
          <p className="mt-3 font-body text-text-muted">
            Here&apos;s what that looks like for a typical single-location HVAC/plumbing/electrical
            shop. Your own numbers are almost certainly different — the full calculator lets you
            plug them in and see your real estimate.
          </p>
        </motion.div>

        <CalculatorTeaser vertical="home" placement="hvac_calculator_teaser" />
      </div>
    </section>
  );
}

function HvacWhyItMatters() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="px-6 py-16 sm:py-24">
      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="mx-auto max-w-3xl"
      >
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">
          Why This Matters More For HVAC Specifically
        </h2>
        <p className="mt-4 font-body text-text-muted">
          Not every missed call is equal. A no-heat call in January or a no-cool call in July
          isn&apos;t someone comparison shopping — it&apos;s someone with a real, immediate problem
          who needs an answer now. Whoever picks up first usually gets the job. That&apos;s what
          makes HVAC one of the strongest fits for an AI receptionist: high urgency, high ticket
          value, and a customer who won&apos;t wait around for a callback.
        </p>
      </motion.div>
    </section>
  );
}

function HvacDemoCta() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="px-6 pb-6 sm:pb-10">
      <motion.div
        initial={{ opacity: 0, y: distance }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
        className="mx-auto max-w-4xl rounded-panel border border-gold/35 bg-[linear-gradient(160deg,#1b1511,#120e0b)] p-6 shadow-surface sm:p-8"
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.15em] text-gold">
              Hear it first
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary sm:text-3xl">
              Want to hear the receptionist handle a real call?
            </h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-text-secondary">
              Go straight to the live Ember demo on the main page and hear how it responds before
              deciding anything.
            </p>
          </div>
          <Link
            href="/#demo"
            onClick={() => captureEvent("demo_call_started", { placement: "hvac_post_hero" })}
            className="inline-flex shrink-0 items-center justify-center self-start whitespace-nowrap rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110 md:self-auto"
          >
            Talk to the AI Receptionist
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default function HvacClient() {
  const [servicesLit, setServicesLit] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <Hero
          eyebrow="Built for HVAC Companies"
          heading={
            <>
              Never Miss a <span className="gradient-text">No-Heat, No-Cool</span> Call Again
            </>
          }
          subhead="Every missed emergency call is a customer who's already dialing the next HVAC company in Phoenix. An AI receptionist trained on your business answers instantly, day or night, so a broken system never becomes a lost customer."
          primaryCta={{
            label: "Talk to the AI Receptionist — Free",
            href: "/#demo",
            cta: "ai_receptionist_demo",
            placement: "hvac_hero",
          }}
          secondaryCta={{
            label: "See What Missed Calls Cost You →",
            href: "/calculator?vertical=home",
            cta: "missed_call_calculator",
            placement: "hvac_hero",
          }}
        />

        <HvacProblem />

        <SectionDivider
          id="services"
          litCount={5}
          tintSide="bottom"
          ringScale={1.4}
          onIgnite={() => setServicesLit(true)}
        />

        <Services
          backlit={servicesLit}
          heading="How We Help"
          eyebrow="Two ways we drive growth"
          cards={hvacServiceCards}
        />

        <HvacCalculatorSection />

        <HvacWhyItMatters />

        <HvacDemoCta />

        <FAQ
          faqs={hvacFaqs}
          heading="Frequently Asked Questions"
          eyebrow="Straight answers"
        />

        <Contact
          heading="Let's Find Where You're Losing Calls"
          body="No pressure. No hard sales pitch. Just a conversation about where your business may be losing customers and how technology can help."
          defaultBusinessType="HVAC"
        />
      </main>
      <Footer />
    </>
  );
}
