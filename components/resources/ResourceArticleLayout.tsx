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
  return <article className="sf-article">
    <header className="sf-article-hero"><Link href="/resources" className="sf-eyebrow">&larr; ALL RESOURCES</Link><h1>{title}</h1><p>{description}</p></header>
    <div className="sf-quick-answer"><span className="sf-eyebrow">QUICK ANSWER</span><p>{quickAnswer}</p></div>
    <div className="sf-article-summary">{summaryCards.map(card=><div key={card.title}><span className="sf-eyebrow">{card.eyebrow}</span><h2>{card.title}</h2><p>{card.description}</p></div>)}</div>
    <div className="sf-reading-grid"><div>
      <details className="sf-mobile-toc"><summary>In this article &middot; {guideItems.length} sections</summary><nav aria-label="Article sections">{guideItems.map(item=><a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav></details>
      {children}
    </div><aside><p className="sf-eyebrow">IN THIS ARTICLE</p><nav aria-label="Article sections">{guideItems.map(item=><a key={item.id} href={`#${item.id}`}>{item.label}</a>)}</nav></aside></div>
    <div className="sf-article-end"><h2>{footerCta.title}</h2><p>{footerCta.description}</p><div>
      <TrackedLink href={footerCta.primary.href} cta={footerCta.primary.cta} placement={footerCta.placement} className="sf-button">{footerCta.primary.label}</TrackedLink>
      <TrackedLink href={footerCta.secondary.href} cta={footerCta.secondary.cta} placement={footerCta.placement} className="sf-text-link">{footerCta.secondary.label} &#8599;</TrackedLink>
    </div></div>
  </article>;
}
