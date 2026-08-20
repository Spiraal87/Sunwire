"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SectionDivider from "@/components/SectionDivider";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import type { FaqEntry } from "@/components/FAQ";
import { getVerticalAssessmentLabel } from "@/lib/cta";

const problemBullets = [
  "Someone finds the site on their phone, and it's slow, dated, or hard to read — so they back out and call a competitor instead.",
  "There's no clear next step. No obvious way to call, book, or ask a question, so interest just fizzles.",
  "The site doesn't show up when someone nearby actually searches for the service.",
];

const websiteServiceCards = [
  {
    id: "website-design-build",
    icon: "/images/icon-website.svg",
    iconAlt: "Website icon",
    label: "01 / Design & Build",
    heading: "A Site Built Around the Reputation You've Already Earned",
    body: "A custom site built to help people understand what you do, trust the business faster, and take the next step without hunting for it.",
    bullets: [
      "Custom design and build, not a template swap",
      "Mobile-first pages with clearer service messaging",
      "Conversion paths that make calling or reaching out easier",
    ],
  },
  {
    id: "website-chatbot",
    icon: "/images/icon-chatbot.svg",
    iconAlt: "Chatbot icon",
    label: "02 / Chatbot & Lead Capture",
    heading: "Catches the Visitors Who Won't Pick Up the Phone",
    body: "An on-site chatbot that answers common questions, captures visitor details, and either books an appointment or hands your team a clear summary — for the visitors who'd rather type than call.",
    bullets: [
      "Answers FAQs about services, pricing, and hours automatically",
      "Captures name, contact info, and what they need before they leave",
      "A separate system from the phone receptionist, built for site visitors specifically",
    ],
  },
  {
    id: "website-seo",
    icon: "/images/icon-revenue.svg",
    iconAlt: "Local search icon",
    label: "03 / Local SEO & Conversion",
    heading: "Built to Get Found, Not Just Exist",
    body: "Local search foundations and structured data so the site actually shows up when someone nearby is looking.",
    bullets: [
      "Local search foundations built in from the start",
      "Structured data that helps AI search tools describe your business accurately",
      "Page speed and mobile performance built in, not bolted on",
    ],
  },
  {
    id: "website-support",
    icon: "/images/icon-support.svg",
    iconAlt: "Support icon",
    label: "04 / Ongoing Support & Hosting",
    heading: "Stays Working After It Launches",
    body: "Hosting, uptime, and a person to call when hours, services, or offerings change — the site doesn't go stale the month after it goes live.",
    bullets: [
      "Hosting and uptime handled for you",
      "Updates as hours, services, or offerings change",
      "A direct line to a person, not a support ticket queue",
    ],
  },
];

const websiteFaqs: FaqEntry[] = [
  {
    question: "How long does a new website take?",
    answer:
      "It starts with a short conversation about your business — what you offer, who your customers are, and what they need to see. From there, a working site gets designed and built around that. You see it live, click through it, and ask for changes before anything is signed or launched.",
  },
  {
    question: "Does this replace my current site?",
    answer:
      "Yes — the new site replaces what's live now once you've approved it. Nothing goes live without you seeing and approving it first.",
  },
  {
    question: "Who owns the site and the domain?",
    answer: "You do. It's built for your business, not licensed to you.",
  },
  {
    question: "Does the chatbot replace the AI receptionist?",
    answer:
      "No — they're separate systems. The AI receptionist answers phone calls; the chatbot answers on-site visitors who'd rather type than call. Many businesses run both, but they're not the same product and can be added independently.",
  },
  {
    question: "How soon will local SEO show results?",
    answer:
      "Local search takes time to build, typically weeks to a few months depending on competition in your area. The foundations — structured data, clear service pages, fast load times — get built in from day one so that progress compounds instead of starting from zero later.",
  },
];

function WebsiteProblem() {
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
              Where Websites Actually Lose Customers
            </h2>
            <ul className="mt-6 space-y-4">
              {problemBullets.map((bullet) => (
                <li
                  key={bullet}
                  className="flex items-start gap-3 font-body text-sm text-text-primary sm:text-base"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-coral"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-body text-text-muted">
              A site that looks fine isn&apos;t the same as a site that converts. The goal is the
              second one.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut", delay: 0.1 }}
            className="relative aspect-[4/3] overflow-hidden rounded-panel border border-line bg-panel-2-textured shadow-surface"
          >
            <Image
              src="/images/website-problem-phone.png"
              alt="A visitor holding a phone, waiting on a slow-loading, generic-looking website"
              fill
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function WebsiteClient() {
  const [servicesLit, setServicesLit] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <Hero
          eyebrow="Built for Local Business Websites"
          heading={
            <>
              A Website That Turns Visitors Into{" "}
              <span className="gradient-text">Booked Calls</span>
            </>
          }
          subhead="A custom site built to help people trust your business faster and take the next step — with local search foundations and an on-site chatbot to catch the visitors who won't pick up the phone."
          primaryCta={{
            label: getVerticalAssessmentLabel("Website"),
            href: "#contact",
            cta: "assessment_request",
            placement: "website_hero",
          }}
          secondaryCta={{
            label: "See what's included",
            href: "#services",
            cta: "website_services_scroll",
            placement: "website_hero",
          }}
        />

        <WebsiteProblem />

        <SectionDivider
          id="services"
          litCount={1}
          tintSide="bottom"
          ringScale={1.4}
          onIgnite={() => setServicesLit(true)}
        />

        <Services
          backlit={servicesLit}
          heading="What's Included"
          eyebrow="Three parts, one system"
          cards={websiteServiceCards}
        />

        <Contact
          heading={getVerticalAssessmentLabel("Website")}
          body="No pressure. No hard sales pitch. Just a conversation about where your website may be losing visitors and what a rebuild would actually look like."
        />

        <FAQ faqs={websiteFaqs} heading="Frequently Asked Questions" eyebrow="Straight answers" />
      </main>
      <Footer />
    </>
  );
}
