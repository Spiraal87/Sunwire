import type { Metadata } from "next";
import Link from "next/link";

const DESCRIPTION =
  "Straight answers about missed calls, AI phone receptionists, and what they actually cost or save a local business.";

export const metadata: Metadata = {
  title: "Resources",
  description: DESCRIPTION,
  openGraph: {
    title: "Resources | Sunforge Digital",
    description: DESCRIPTION,
    type: "website",
  },
};

const articles = [
  {
    href: "/resources/missed-call-cost",
    title: "How Much Do Missed Calls Actually Cost a Local Business?",
    summary:
      "What a missed call really costs, how to estimate your own number, and why generic industry averages only get you so far.",
  },
  {
    href: "/resources/ai-receptionist-vs-answering-service",
    title: "AI Receptionist vs. Answering Service: What's the Difference?",
    summary:
      "How AI phone receptionists and traditional answering services actually differ, and how to tell which one fits a local business.",
  },
];

export default function ResourcesPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        Resources
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">
        Guides &amp; Resources
      </h1>
      <p className="mt-3 max-w-xl font-body text-sm text-text-secondary">
        Straight answers about missed calls, AI phone receptionists, and what they actually cost
        or save a local business — no guesswork, no inflated claims.
      </p>

      <div className="mt-10 space-y-4">
        {articles.map((article) => (
          <Link
            key={article.href}
            href={article.href}
            className="group block rounded-panel border border-line bg-gradient-panel p-6 shadow-surface transition-colors hover:border-gold/60 sm:p-8"
          >
            <p className="font-display text-lg font-semibold text-text-primary group-hover:text-gold sm:text-xl">
              {article.title}
            </p>
            <p className="mt-2 font-body text-sm text-text-muted">{article.summary}</p>
            <span
              aria-hidden="true"
              className="mt-4 inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.1em] text-gold"
            >
              Read more <span className="transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
