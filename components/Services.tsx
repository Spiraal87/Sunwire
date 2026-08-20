"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { captureEvent } from "@/lib/analytics";

type Stat = {
  value: string;
  label: string;
};

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
  stats?: Stat[];
  statsCaveat?: string;
};

// Animates the trailing number in a stat value (e.g. "76%" or "67–80%") from
// 0 up to its target once scrolled into view, once. Any prefix ("67–") or
// suffix ("%") around that number is left untouched.
function AnimatedStatValue({ value }: { value: string }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const match = value.match(/^(.*?)(\d+)(\D*)$/);
  const [display, setDisplay] = useState(
    match && !prefersReducedMotion ? `${match[1]}0${match[3]}` : value
  );

  useEffect(() => {
    if (!match || prefersReducedMotion || !isInView) return;
    const [, prefix, digits, suffix] = match;
    const target = parseInt(digits, 10);
    const duration = 1200;
    const start = performance.now();
    let raf: number;

    function tick(now: number) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(`${prefix}${Math.round(target * eased)}${suffix}`);
      if (progress < 1) raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInView, prefersReducedMotion]);

  return <span ref={ref}>{display}</span>;
}

const defaultCards: Card[] = [
  {
    id: "card-front-desk-system",
    icon: "/images/icon-receptionist.svg",
    iconAlt: "AI receptionist icon",
    label: "01 / Front Desk System",
    ctaHref: "/#contact",
    ctaLabel: "Book a 15-minute assessment",
    heading: "For businesses losing opportunities when calls go unanswered",
    body: "A practical call-handling system for missed calls, overflow calls, and busy stretches when your team cannot always get to the phone in time.",
    stats: [
      { value: "67–80%", label: "of callers who reach voicemail hang up without leaving a message" },
    ],
    statsCaveat: "Industry-cited estimate, not verified for your business.",
    bullets: [
      "AI receptionist configured around your business",
      "Coverage for missed, overflow, and after-hours calls",
      "Caller detail capture and appointment request handling",
      "Call summaries and handoff so your team stays in the loop",
    ],
  },
  {
    id: "card-website-conversion-system",
    icon: "/images/icon-website.svg",
    iconAlt: "Website icon",
    label: "02 / Website + Conversion System",
    ctaHref: "/website",
    ctaLabel: "See the website system",
    heading: "For businesses that need a stronger online first impression",
    body: "A custom site built to help people understand what you do, trust the business faster, and take the next step without hunting for it.",
    stats: [
      { value: "76%", label: "of people who search for something nearby on their phone visit a business within a day" },
    ],
    statsCaveat: "Source: Google local search research (Think with Google).",
    bullets: [
      "Custom website design and build",
      "Mobile-first pages with clearer service messaging",
      "Conversion paths that make calling or reaching out easier",
      "Optional on-site chatbot for lead capture",
      "Local search foundations and updates as the business evolves",
    ],
  },
];

export default function Services({
  backlit = false,
  heading = "Start with the system you need most",
  eyebrow = "Current packaged offers",
  cards = defaultCards,
}: {
  backlit?: boolean;
  heading?: string;
  eyebrow?: string;
  cards?: Card[];
}) {
  const prefersReducedMotion = useReducedMotion();
  const distance = prefersReducedMotion ? 0 : 20;
  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>({});
  const panelClassName = backlit ? "forge-lit-panel-strong" : "border-line shadow-surface";

  function toggleCard(id: string) {
    setExpandedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="bg-panel-2-textured px-6 pb-16 pt-6 sm:pb-24 sm:pt-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-display text-2xl font-semibold sm:text-3xl">{heading}</h2>
          <span className="font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
            {eyebrow}
          </span>
        </div>

        <div
          className={`grid grid-cols-1 overflow-hidden rounded-panel border transition-colors transition-shadow duration-1000 ease-out md:grid-cols-2 ${panelClassName}`}
        >
          {cards.map((card, i) => {
            const isExpanded = expandedCards[card.id] ?? false;
            const mobileBullets = isExpanded ? card.bullets : card.bullets.slice(0, 2);
            const hasExtraBullets = card.bullets.length > 2;

            const isLastMobile = i === cards.length - 1;
            const isLastCol = i % 2 === 1 || i === cards.length - 1;
            const isLastRow = Math.floor(i / 2) === Math.floor((cards.length - 1) / 2);
            const borderClasses = [
              !isLastMobile && "border-b border-line/80",
              "md:border-b-0",
              !isLastCol && "md:border-r md:border-line/80",
              !isLastRow && "md:border-b md:border-line/80",
            ]
              .filter(Boolean)
              .join(" ");

            return (
              <motion.div
                key={card.label}
                id={card.id}
                initial={{ opacity: 0, y: distance }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                whileHover={prefersReducedMotion ? undefined : { y: -4 }}
                transition={{ duration: prefersReducedMotion ? 0.2 : 0.6, ease: "easeOut" }}
                className={`group relative scroll-mt-24 bg-gradient-panel p-8 transition-shadow duration-300 hover:shadow-forge sm:p-10 ${borderClasses}`}
              >
                <img
                  src={card.icon}
                  alt={card.iconAlt}
                  width={80}
                  height={80}
                  className="h-12 w-12 sm:h-14 sm:w-14"
                />
                <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-[color:var(--steel-blue)]">
                  {card.label}
                </p>
                <h3 className="mt-4 font-display text-xl font-semibold sm:text-2xl">
                  {card.heading}
                </h3>
                <p className="mt-4 font-body text-text-muted">{card.body}</p>

                {card.stats && card.stats.length > 0 && (
                  <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4 border-y border-line/60 py-6">
                    {card.stats.map((stat) => (
                      <div key={stat.label}>
                        <p className="font-display text-5xl font-bold leading-none text-gold sm:text-6xl">
                          <AnimatedStatValue value={stat.value} />
                        </p>
                        <p className="mt-2 max-w-[18rem] font-body text-sm text-text-muted">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                    {card.statsCaveat && (
                      <p className="w-full font-body text-[11px] italic text-text-muted-dark">
                        {card.statsCaveat}
                      </p>
                    )}
                  </div>
                )}

                <ul className="mt-6 space-y-3 md:hidden">
                  {mobileBullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 font-body text-sm text-text-primary">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-text-muted-dark transition-colors duration-300 group-hover:border-gold/70"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 hidden space-y-3 md:block">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-3 font-body text-sm text-text-primary">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 h-2 w-2 shrink-0 rounded-full border border-text-muted-dark transition-colors duration-300 group-hover:border-gold/70"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {hasExtraBullets && (
                  <button
                    type="button"
                    onClick={() => toggleCard(card.id)}
                    className="mt-5 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-gold md:hidden"
                    aria-expanded={isExpanded}
                  >
                    {isExpanded ? "Show less" : "See details"}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}
                    />
                  </button>
                )}

                {card.ctaHref && (
                  <Link
                    href={card.ctaHref}
                    onClick={() =>
                      captureEvent("cta_clicked", {
                        cta: card.id,
                        placement: "services",
                      })
                    }
                    className="mt-6 inline-flex items-center gap-1.5 font-mono text-sm text-gold transition-colors hover:text-highlight"
                  >
                    {card.ctaLabel} <span aria-hidden="true">&rarr;</span>
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        <p className="mt-6 font-body text-sm text-text-muted-dark">
          These are the most common starting points. Additional systems can be layered in as the
          business grows.
        </p>
      </div>
    </section>
  );
}
