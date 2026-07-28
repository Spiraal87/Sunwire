"use client";

import { motion, useReducedMotion } from "framer-motion";

const cards = [
  {
    label: "01 / Websites",
    heading: "A site that matches your reputation",
    body: "Most local businesses have better reviews than their website shows. We design and build a site around the story you've already earned.",
    bullets: [
      "Built and shown to you before anything is signed",
      "Mobile-first, fast, and easy for customers to find on Google",
      "Menus, hours, and booking info that actually stay current",
    ],
  },
  {
    label: "02 / AI Phone Systems",
    heading: "A line that never goes unanswered",
    body: "We build and manage an AI-powered phone system that picks up when you can't — answering questions, taking messages, and getting the right person a callback.",
    bullets: [
      "Doesn't replace your number or your team",
      "Built around your hours, your services, your answers",
      "You hear it working before you decide anything",
    ],
  },
];

export default function Services() {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;

  return (
    <section className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">What we build</h2>
        <span className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
          Two products, one relationship
        </span>
      </div>

      <div className="grid grid-cols-1 overflow-hidden rounded-panel border border-line md:grid-cols-2">
        {cards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: distance }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
            className={`bg-panel p-8 sm:p-10 ${
              i === 0 ? "border-b border-line md:border-b-0 md:border-r" : ""
            }`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-gold">
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
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-coral"
                  />
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
