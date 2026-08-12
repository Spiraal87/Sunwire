import type { Metadata } from "next";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";

const TITLE = "Why Your Website Still Matters: SEO, GEO, and Conversions for Local Businesses";
const DESCRIPTION =
  "A plain-English breakdown of why a local business website still matters, how SEO and AI-search visibility overlap, and how better conversion paths turn traffic into real revenue.";
const PUBLISHED = "2026-08-12";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: `${TITLE} | Sunforge Digital`,
    description: DESCRIPTION,
    type: "article",
  },
};

const articleJsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: TITLE,
  description: DESCRIPTION,
  datePublished: PUBLISHED,
  dateModified: PUBLISHED,
  author: { "@type": "Person", name: "Christopher Johnson" },
  publisher: { "@type": "Organization", name: "Sunforge Digital" },
  mainEntityOfPage:
    "https://sunforgedigital.com/resources/website-seo-geo-conversions",
};

export default function WebsiteSeoGeoConversionsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        <Link href="/resources" className="hover:text-gold">
          Resources
        </Link>
      </p>
      <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">{TITLE}</h1>

      <div className="mt-8 rounded-panel border border-gold/40 bg-gold/5 p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-gold">
          Quick answer
        </p>
        <p className="mt-3 font-body text-base leading-relaxed text-text-primary">
          A local business website still matters because it does three jobs at once: it helps
          people find you, helps Google and AI search tools understand what you do, and turns
          that attention into calls, form fills, and booked work. If the site is thin, outdated,
          or hard to use, the business usually loses twice: first on visibility, then again on
          conversion.
        </p>
      </div>

      <div className="mt-10 space-y-8 font-body text-text-muted">
        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Why a website still matters even with Google Maps and AI answers
          </h2>
          <p className="mt-3">
            Business owners sometimes assume their Google Business Profile, Instagram page, or a
            directory listing is enough. Those help, but they&apos;re borrowed ground. Your website
            is still the one place you fully control: your services, your proof, your photos,
            your FAQs, your calls to action, and the exact next step you want a customer to take.
          </p>
          <p className="mt-3">
            It&apos;s also where search systems go to verify who you are. If a business says one thing
            on Google, another thing on Facebook, and a third thing on its own site, that
            confusion works against trust. A clear, current website gives search engines and
            customers the same consistent story.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            What if you have been burned by agencies or SEO before?
          </h2>
          <p className="mt-3">
            A lot of owners are skeptical for a reason. They paid for vague monthly SEO work,
            got jargon instead of clarity, and never felt a clear connection between the spend and
            real booked jobs. That frustration is valid.
          </p>
          <p className="mt-3">
            The better framing is not "do SEO because agencies say you should." It is "build a
            site that makes the business easier to understand, easier to trust, and easier to
            contact." If that work also improves search visibility, great. But the foundation
            should still be something useful to a real customer landing on the page today.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            What if referrals and word of mouth already drive most of your business?
          </h2>
          <p className="mt-3">
            That usually means the business is doing something right, not that the website does
            not matter. Referred customers still look you up. They still check your hours, service
            area, reviews, photos, and whether the business feels current and credible before they
            call.
          </p>
          <p className="mt-3">
            In that sense, a website does not replace referrals or word of mouth. It strengthens
            them. It helps turn "someone told me to call you" into "I looked them up and I feel
            good about reaching out." The better the site does that job, the more value you get
            from the reputation you already earned offline.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            SEO and GEO, in plain English
          </h2>
          <p className="mt-3">
            SEO is the work of helping your business show up when people search on Google. GEO is
            the newer shorthand people use for showing up in AI-driven answers and recommendation
            tools. In practice, they overlap much more than people think.
          </p>
          <p className="mt-3">
            Google&apos;s own guidance for generative AI search still points back to the same core
            basics: useful original content, crawlable pages, clear structure, and a good user
            experience. The headline for a business owner is simple: AI search hasn&apos;t replaced
            good SEO. It has made clarity, credibility, and specificity even more important.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            What actually helps local visibility now
          </h2>
          <p className="mt-3">
            The businesses that tend to win are the ones that make it easy to understand what they
            do, where they do it, and why a customer should trust them. That usually means clear
            service pages, real location information, consistent contact details, strong reviews,
            fast mobile performance, and content that answers the exact questions customers ask
            before they call.
          </p>
          <p className="mt-3">
            For local search specifically, Google says results are mainly driven by relevance,
            distance, and prominence. Your site helps with the relevance and prominence parts:
            what services you offer, what areas you serve, what proof you have, and how clearly
            the business is described across the web.
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            Why conversions matter just as much as rankings
          </h2>
          <p className="mt-3">
            Getting found is only half the job. If the page loads slowly, buries the phone number,
            hides the service area, feels dated, or never clearly asks the visitor to call, book,
            or request a quote, a lot of that traffic quietly leaks away.
          </p>
          <p className="mt-3">
            That matters just as much for warm traffic as cold traffic. A referral, repeat
            customer, or word-of-mouth lead is still evaluating the business when they land on the
            site. If the page confirms trust and makes the next step obvious, the lead gets
            stronger. If it creates doubt, even a warm lead can cool off.
          </p>
          <p className="mt-3">
            Conversion work is the part that turns attention into revenue. For a local business,
            that often means obvious calls to action, proof near the decision point, mobile-first
            layouts, fewer dead ends, and pages built around how customers actually choose:
            &quot;Do you do this?&quot;, &quot;Do you serve my area?&quot;, &quot;Can I trust you?&quot;,
            and &quot;What do I do next?&quot;
          </p>
        </section>

        <section>
          <h2 className="font-display text-lg font-semibold text-text-primary">
            How this impacts revenue
          </h2>
          <p className="mt-3">
            Better visibility without better conversion just means more wasted traffic. Better
            conversion without visibility caps your upside. When both improve together, the effect
            compounds: more qualified people find the business, and more of them actually turn into
            calls, leads, and booked jobs.
          </p>
          <p className="mt-3">
            That&apos;s why a website shouldn&apos;t be treated like an online brochure. For most local
            businesses, it&apos;s part reputation engine, part sales tool, and part source of truth for
            search and AI systems trying to decide whether to recommend you.
          </p>
        </section>
      </div>

      <div className="mt-12 rounded-panel border border-line bg-gradient-panel p-6 sm:p-8">
        <p className="font-display text-lg font-semibold text-text-primary">
          Want help tightening up the visibility-to-conversion gap?
        </p>
        <p className="mt-2 font-body text-sm text-text-muted">
          We build fast local-business websites designed to be found, trusted, and acted on.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <TrackedLink
            href="/#contact"
            cta="website_contact"
            placement="resource_website_seo_geo_footer"
            className="rounded-btn bg-gradient-accent px-6 py-3.5 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            Talk about your website
          </TrackedLink>
          <TrackedLink
            href="/#card-websites"
            cta="website_services"
            placement="resource_website_seo_geo_footer"
            className="rounded-btn border border-line px-6 py-3.5 font-display text-sm font-semibold text-text-primary transition-colors hover:border-gold hover:text-gold"
          >
            See the website service
          </TrackedLink>
        </div>
      </div>
    </div>
  );
}
