"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import SectionDivider from "@/components/SectionDivider";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Funnel from "@/components/Funnel";
import type { FaqEntry } from "@/components/FAQ";
import { getVerticalAssessmentLabel } from "@/lib/cta";
import EmberCallWidget from "@/components/EmberCallWidget";

const receptionistServiceCards = [
  {
    id: "receptionist-setup",
    icon: "/images/icon-receptionist.svg",
    iconAlt: "Receptionist icon",
    label: "01 / Configuration",
    heading: "Built Around How Your Business Actually Works",
    body: "Configured to match your hours, services, pricing, and the specific questions customers ask — trained on what you do, not generic scripts.",
    bullets: [
      "Hours and availability configured to your schedule",
      "Service menu and pricing built from what you actually offer",
      "Trained on the common questions your customers ask",
    ],
  },
  {
    id: "receptionist-answering",
    icon: "/images/icon-receptionist.svg",
    iconAlt: "Receptionist icon",
    label: "02 / Call Handling",
    heading: "Answers Calls That Would Otherwise Be Missed",
    body: "Handles missed calls, overflow, and after-hours inquiries — talking through what the caller needs and booking appointments or taking detailed messages.",
    bullets: [
      "Answers missed calls during busy times or after hours",
      "Understands what the caller needs and checks real availability",
      "Books appointments directly onto your calendar",
    ],
  },
  {
    id: "receptionist-handoff",
    icon: "/images/icon-support.svg",
    iconAlt: "Support icon",
    label: "03 / Handoff & Follow-up",
    heading: "Keeps Your Team in the Loop",
    body: "Summarizes every call and sends it straight to you — call details, what was booked, and whether any follow-up is needed.",
    bullets: [
      "Instant notification with a summary of each call",
      "Appointment details added to your calendar automatically",
      "Message transcripts so you know exactly what was discussed",
    ],
  },
  {
    id: "receptionist-integration",
    icon: "/images/icon-support.svg",
    iconAlt: "Support icon",
    label: "04 / Integration & Support",
    heading: "Works Alongside What You Already Use",
    body: "Connects to your existing calendar, CRM, or booking system — no new software to learn, no rip-and-replace.",
    bullets: [
      "Integrates with Google Calendar, Calendly, or your existing system",
      "Works with your current phone number",
      "Direct support whenever something changes or needs tuning",
    ],
  },
];

const receptionistFaqs: FaqEntry[] = [
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
    question: "Can I combine the receptionist with a website?",
    answer:
      "Yes — many businesses run both. The receptionist answers calls; the website captures visitors who'd rather type than call. They work together to cover both the phone and online channels, so you're not missing opportunities either way.",
  },
];

export default function ReceptionistClient() {
  const [servicesLit, setServicesLit] = useState(false);
  const [funnelLit, setFunnelLit] = useState(false);
  const [emberLit, setEmberLit] = useState(false);

  return (
    <>
      <Nav />
      <main>
        <Hero
          eyebrow="Built for Local Business Phone Calls"
          heading={
            <>
              Stop Losing Customers to{" "}
              <span className="gradient-text">Missed Calls</span>
            </>
          }
          subhead="An AI receptionist that answers calls, books appointments, and captures caller details — handling missed calls, overflow, and after-hours inquiries while your team focuses on the work."
          mobileSubhead="Never miss a call again."
          mobileCompact
          mobileMediaFirst
          videoSrc="/images/receptionist_video.mp4"
          posterSrc="/images/hero-image3.png"
          primaryCta={{
            label: getVerticalAssessmentLabel("Front Desk System"),
            href: "#contact",
            cta: "assessment_request",
            placement: "receptionist_hero",
          }}
          secondaryCta={{
            label: "Try the demo",
            href: "#demo",
            cta: "ai_receptionist_demo",
            placement: "receptionist_hero",
          }}
        />

        <Funnel backlit={funnelLit} />

        <SectionDivider
          id="services"
          litCount={6}
          tintSide="top"
          ringScale={1.6}
          onIgnite={() => setServicesLit(true)}
        />

        <Services
          backlit={servicesLit}
          heading="How It Works"
          eyebrow="Four parts, one system"
          cards={receptionistServiceCards}
        />

        <SectionDivider
          id="demo"
          litCount={6}
          tintSide="top"
          ringScale={1.6}
          onIgnite={() => setEmberLit(true)}
        />

        <EmberCallWidget backlit={emberLit} />

        <Contact
          heading={getVerticalAssessmentLabel("Front Desk System")}
          body="No pressure. No hard sales pitch. Just a conversation about what a missed-call handler would look like for your business."
        />

        <FAQ faqs={receptionistFaqs} heading="Frequently Asked Questions" eyebrow="Straight answers" />
      </main>
      <Footer />
    </>
  );
}
