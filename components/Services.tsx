"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { captureEvent } from "@/lib/analytics";

type Card = {
  id: string;
  icon: string;
  iconAlt: string;
  label: string;
  heading: string;
  body: string;
  bullets: string[];
  ctaHref?: string;
  ctaLabel?: string;
};

const cards: Card[] = [
  {
    id: "card-ai-receptionists",
    icon: "/images/icon-receptionist.svg",
    iconAlt: "AI receptionist icon",
    label: "01 / AI Receptionists",
    ctaHref: "/calculator",
    ctaLabel: "See what missed calls could be costing you",
    heading: "A line that never goes unanswered",
    body: "Never lose another customer because nobody answered the phone. Our AI receptionists answer after hours, during rushes, and whenever your team can't get to the phone.",
    bullets: [
      "Works alongside your existing phone number",
      "Available 24/7",
      "Hundreds of voices to choose from, in multiple languages",
    ],
  },
  {
    id: "card-websites",
    icon: "/images/icon-website.svg",
    iconAlt: "Website icon",
    label: "02 / Websites",
    heading: "A website that works as hard as you do",
    body: "Your website should do more than exist — it should earn trust and turn visitors into customers. We build fast, modern sites designed around how people actually choose local businesses.",
    bullets: [
      "Mobile-first and lightning fast",
      "Easy to update as your business grows",
      "Built to be found — by Google, and by the AI tools people are increasingly asking for recommendations",
    ],
  },
];

export default function Services({ backlit = false }: { backlit?: boolean }) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="bg-panel-2-textured px-6 pb-16 pt-6 sm:pt-10 sm:pb-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">How we help</h2>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            Two ways we drive growth
          </span>
        </div>

        <div
          className={`grid grid-cols-1 overflow-hidden rounded-panel border transition-colors transition-shadow duration-1000 ease-out md:grid-cols-2 ${
            backlit ? "border-gold/25 shadow-glow" : "border-line shadow-surface"
          }`}
        >
          {cards.map((card, i) => (
          <motion.div
            key={card.label}
            id={card.id}
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            whileHover={prefersReducedMotion ? undefined : { y: -4 }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
            className={`group relative scroll-mt-24 bg-gradient-panel p-8 transition-shadow duration-300 hover:shadow-forge sm:p-10 ${
              i === 0 ? "border-b border-line md:border-b-0 md:border-r" : ""
            }`}
          >
            <img src={card.icon} alt={card.iconAlt} width={80} height={80} className="h-12 w-12 sm:h-14 sm:w-14" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-text-secondary">
              {card.label}
            </p>
            <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">
              {card.heading}
            </h3>
            <p className="mt-4 font-body text-text-muted">{card.body}</p>
            <ul className="mt-6 space-y-3">
              {card.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 font-body text-sm text-text-primary">
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-coral transition-transform duration-300 group-hover:scale-125"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
            {card.ctaHref && (
              <Link
                href={card.ctaHref}
                onClick={() =>
                  captureEvent("cta_clicked", {
                    cta: "missed_call_calculator",
                    placement: "services",
                  })
                }
                className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-gold transition-colors hover:text-highlight"
              >
                {card.ctaLabel} <span aria-hidden="true">→</span>
              </Link>
            )}
          </motion.div>
        ))}
        </div>
      </div>
    </section>
  );
}
