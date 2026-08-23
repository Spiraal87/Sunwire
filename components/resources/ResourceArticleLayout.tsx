import type { ReactNode } from "react";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

type GuideItem = {
  id: string;
  label: string;
};

type SummaryCard = {
  eyebrow: string;
  title: string;
  description: string;
};

type FooterAction = {
  href: string;
  label: string;
  cta: string;
};

type FooterCta = {
  title: string;
  description: string;
  placement: string;
  primary: FooterAction;
  secondary: FooterAction;
};

type ResourceArticleLayoutProps = {
  title: string;
  description: string;
  quickAnswer: string;
  guideItems: GuideItem[];
  summaryCards: SummaryCard[];
  footerCta: FooterCta;
  children: ReactNode;
};

export default function ResourceArticleLayout({
  title,
  description,
  quickAnswer,
  guideItems,
  summaryCards,
  footerCta,
  children,
}: ResourceArticleLayoutProps) {
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,rgba(230,168,75,0.16),transparent_68%)]" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <div className="relative overflow-hidden rounded-panel border border-gold/20 bg-[linear-gradient(165deg,rgba(27,21,17,0.96),rgba(14,11,9,0.98))] p-6 shadow-surface sm:p-8 lg:p-10">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(230,168,75,0.75),transparent)]" />
          <img
            src="/images/icon-resources.svg"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-6 h-10 w-10 opacity-60 sm:right-8 sm:top-8 sm:h-12 sm:w-12"
          />

          <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
            <Link href="/resources" className="transition-colors hover:text-gold">
              Resources
            </Link>
          </p>
          <h1 className="mt-4 max-w-3xl pr-16 font-display text-3xl font-semibold leading-tight sm:pr-20 sm:text-4xl lg:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl font-body text-base leading-7 text-text-secondary">
            {description}
          </p>

          <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.95fr)]">
            <div className="rounded-panel border border-gold/40 bg-gold/5 p-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
                Quick answer
              </p>
              <p className="mt-3 font-body text-base leading-8 text-text-primary">{quickAnswer}</p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {summaryCards.map((card) => (
                <div
                  key={card.title}
                  className="rounded-card border border-line bg-black/20 p-4 backdrop-blur-sm"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/80">
                    {card.eyebrow}
                  </p>
                  <p className="mt-2 font-display text-base font-semibold text-text-primary">
                    {card.title}
                  </p>
                  <p className="mt-2 font-body text-sm leading-6 text-text-muted">
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:items-start">
          <div className="space-y-6">
            <details className="sticky top-20 z-30 rounded-panel border border-line bg-[linear-gradient(180deg,rgba(22,22,22,0.96),rgba(12,12,12,0.98))] shadow-surface lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-gold/85">
                    In this article
                  </p>
                  <p className="mt-1 font-display text-sm font-semibold text-text-primary">
                    Jump to section
                  </p>
                </div>
                <span className="font-body text-xs text-text-muted">{guideItems.length} links</span>
              </summary>
              <nav className="border-t border-line px-3 pb-3 pt-2" aria-label="Article sections">
                {guideItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-card px-3 py-3 font-body text-sm text-text-secondary transition-colors hover:bg-gold/5 hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </details>

            {children}
          </div>

          <aside className="hidden lg:sticky lg:top-24 lg:block">
            <div className="rounded-panel border border-line bg-[linear-gradient(180deg,rgba(22,22,22,0.92),rgba(12,12,12,0.98))] p-5 shadow-surface">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-gold/85">
                In this article
              </p>
              <nav className="mt-4 space-y-2" aria-label="Article sections">
                {guideItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block rounded-card border border-transparent px-3 py-2 font-body text-sm text-text-secondary transition-colors hover:border-gold/30 hover:bg-gold/5 hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>

        <div className="mt-12 rounded-panel border border-line bg-gradient-panel p-6 shadow-surface sm:p-8">
          <p className="font-display text-lg font-semibold text-text-primary">{footerCta.title}</p>
          <p className="mt-2 max-w-2xl font-body text-sm leading-6 text-text-muted">
            {footerCta.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <TrackedLink
              href={footerCta.primary.href}
              cta={footerCta.primary.cta}
              placement={footerCta.placement}
              className="rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
            >
              {footerCta.primary.label}
            </TrackedLink>
            <TrackedLink
              href={footerCta.secondary.href}
              cta={footerCta.secondary.cta}
              placement={footerCta.placement}
              className="rounded-btn border border-line px-6 py-3.5 font-display text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
            >
              {footerCta.secondary.label}
            </TrackedLink>
          </div>
        </div>
      </div>
    </div>
  );
}
