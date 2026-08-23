import type { Metadata } from "next";
import ResourceArticleLayout from "@/components/resources/ResourceArticleLayout";
import ResourceSection from "@/components/resources/ResourceSection";
import { CTA_LABELS } from "@/lib/cta";

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
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <ResourceArticleLayout
        title={TITLE}
        description={DESCRIPTION}
        quickAnswer="A local business website still matters because it does three jobs at once: it helps people find you, helps Google and AI search tools understand what you do, and turns that attention into calls, form fills, and booked work. If the site is thin, outdated, or hard to use, the business usually loses twice: first on visibility, then again on conversion."
        guideItems={[
          { id: "why-website-still-matters", label: "Why a website still matters" },
          { id: "burned-before", label: "What if SEO burned you before?" },
          { id: "referrals", label: "What if referrals already drive business?" },
          { id: "seo-geo", label: "SEO and GEO in plain English" },
          { id: "visibility", label: "What actually helps local visibility" },
          { id: "conversions", label: "Why conversions matter too" },
          { id: "revenue", label: "How this impacts revenue" },
        ]}
        summaryCards={[
          {
            eyebrow: "Visibility",
            title: "Search systems need a source of truth",
            description: "Your website is where Google, AI search, and customers verify what you do and where you do it.",
          },
          {
            eyebrow: "Trust",
            title: "Referred customers still look you up",
            description: "Word of mouth gets attention, but the site often decides whether that attention turns into a call.",
          },
          {
            eyebrow: "Conversion",
            title: "Traffic is not the same as revenue",
            description: "A clear next step, proof, and mobile usability determine whether visitors actually act.",
          },
        ]}
        footerCta={{
          title: "Want help tightening up the visibility-to-conversion gap?",
          description: "We build fast local-business websites designed to be found, trusted, and acted on.",
          placement: "resource_website_seo_geo_footer",
          primary: {
            href: "/#contact",
            cta: "assessment_request",
            label: CTA_LABELS.assessment,
          },
          secondary: {
            href: "/#card-websites",
            cta: "website_services",
            label: CTA_LABELS.websiteSystem,
          },
        }}
      >
        <ResourceSection
          id="why-website-still-matters"
          title="Why a website still matters even with Google Maps and AI answers"
        >
          <p>
            Business owners sometimes assume their Google Business Profile, Instagram page, or a
            directory listing is enough. Those help, but they are borrowed ground. Your website is
            still the one place you fully control: your services, your proof, your photos, your
            FAQs, your calls to action, and the exact next step you want a customer to take.
          </p>
          <p>
            It is also where search systems go to verify who you are. If a business says one thing
            on Google, another thing on Facebook, and a third thing on its own site, that confusion
            works against trust. A clear, current website gives search engines and customers the
            same consistent story.
          </p>
        </ResourceSection>

        <ResourceSection id="burned-before" title="What if you have been burned by agencies or SEO before?">
          <p>
            A lot of owners are skeptical for a reason. They paid for vague monthly SEO work, got
            jargon instead of clarity, and never felt a clear connection between the spend and real
            booked jobs. That frustration is valid.
          </p>
          <p>
            The better framing is not &quot;do SEO because agencies say you should.&quot; It is
            &quot;build a site that makes the business easier to understand, easier to trust, and
            easier to contact.&quot; If that work also improves search visibility, great. But the
            foundation should still be something useful to a real customer landing on the page
            today.
          </p>
        </ResourceSection>

        <ResourceSection id="referrals" title="What if referrals and word of mouth already drive most of your business?">
          <p>
            That usually means the business is doing something right, not that the website does not
            matter. Referred customers still look you up. They still check your hours, service
            area, reviews, photos, and whether the business feels current and credible before they
            call.
          </p>
          <p>
            In that sense, a website does not replace referrals or word of mouth. It strengthens
            them. It helps turn &quot;someone told me to call you&quot; into &quot;I looked them up
            and I feel good about reaching out.&quot; The better the site does that job, the more
            value you get from the reputation you already earned offline.
          </p>
        </ResourceSection>

        <ResourceSection id="seo-geo" title="SEO and GEO, in plain English">
          <p>
            SEO is the work of helping your business show up when people search on Google. GEO is
            the newer shorthand people use for showing up in AI-driven answers and recommendation
            tools. In practice, they overlap much more than people think.
          </p>
          <p>
            Google&apos;s own guidance for generative AI search still points back to the same core
            basics: useful original content, crawlable pages, clear structure, and a good user
            experience. The headline for a business owner is simple: AI search has not replaced
            good SEO. It has made clarity, credibility, and specificity even more important.
          </p>
        </ResourceSection>

        <ResourceSection id="visibility" title="What actually helps local visibility now">
          <p>
            The businesses that tend to win are the ones that make it easy to understand what they
            do, where they do it, and why a customer should trust them. That usually means clear
            service pages, real location information, consistent contact details, strong reviews,
            fast mobile performance, and content that answers the exact questions customers ask
            before they call.
          </p>
          <p>
            For local search specifically, Google says results are mainly driven by relevance,
            distance, and prominence. Your site helps with the relevance and prominence parts: what
            services you offer, what areas you serve, what proof you have, and how clearly the
            business is described across the web.
          </p>
        </ResourceSection>

        <ResourceSection id="conversions" title="Why conversions matter just as much as rankings">
          <p>
            Getting found is only half the job. If the page loads slowly, buries the phone number,
            hides the service area, feels dated, or never clearly asks the visitor to call, book,
            or request a quote, a lot of that traffic quietly leaks away.
          </p>
          <p>
            That matters just as much for warm traffic as cold traffic. A referral, repeat
            customer, or word-of-mouth lead is still evaluating the business when they land on the
            site. If the page confirms trust and makes the next step obvious, the lead gets
            stronger. If it creates doubt, even a warm lead can cool off.
          </p>
          <p>
            Conversion work is the part that turns attention into revenue. For a local business,
            that often means obvious calls to action, proof near the decision point, mobile-first
            layouts, fewer dead ends, and pages built around how customers actually choose: do you
            do this, do you serve my area, can I trust you, and what do I do next?
          </p>
        </ResourceSection>

        <ResourceSection id="revenue" title="How this impacts revenue">
          <p>
            Better visibility without better conversion just means more wasted traffic. Better
            conversion without visibility caps your upside. When both improve together, the effect
            compounds: more qualified people find the business, and more of them actually turn into
            calls, leads, and booked jobs.
          </p>
          <p>
            That is why a website should not be treated like an online brochure. For most local
            businesses, it is part reputation engine, part sales tool, and part source of truth for
            search and AI systems trying to decide whether to recommend you.
          </p>
        </ResourceSection>
      </ResourceArticleLayout>
    </>
  );
}
