import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Sunforge Digital",
  description: "The terms that apply to using the Sunforge Digital website and AI demo line.",
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">Legal</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 font-mono text-xs text-text-muted-dark">Effective July 2026</p>

        <div className="mt-10 space-y-8 font-body text-text-muted">
          <p>
            Welcome to Sunforge Digital&apos;s website. By using this site,
            you agree to the following terms.
          </p>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Use of this site
            </h2>
            <p className="mt-3">
              This website is provided for informational purposes to help
              you learn about Sunforge Digital&apos;s services — website
              design and AI phone receptionist systems for local businesses.
              You&apos;re welcome to browse, contact us, and try the demo
              line.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              No guarantee of results
            </h2>
            <p className="mt-3">
              Any examples, illustrations, or figures shown on this site
              (including in the &quot;Small Improvements. Big Results.&quot;
              section) are for illustrative purposes only and aren&apos;t
              guarantees of specific outcomes. Actual results vary by
              business.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Intellectual property
            </h2>
            <p className="mt-3">
              The content, design, and branding on this site — including
              text, graphics, and the Sunforge Digital name and logo — belong
              to Sunforge Digital and may not be copied or reused without
              permission.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              The AI demo line
            </h2>
            <p className="mt-3">
              The demo phone number connects to an AI-powered system for
              demonstration purposes. Standard carrier call rates may apply
              depending on your phone plan. Please don&apos;t use the demo
              line for harassment, spam, or any unlawful purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              No professional advice
            </h2>
            <p className="mt-3">
              Nothing on this site constitutes legal, financial, or business
              advice. Decisions about your business should be made based on
              your own judgment or with the help of a qualified
              professional.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Limitation of liability
            </h2>
            <p className="mt-3">
              This site and its content are provided &quot;as is.&quot;
              Sunforge Digital isn&apos;t liable for any damages arising
              from your use of this site or the demo line, to the fullest
              extent permitted by law.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Changes to these terms
            </h2>
            <p className="mt-3">
              We may update these terms from time to time. Continued use of
              the site after changes means you accept the updated terms.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Contact us
            </h2>
            <p className="mt-3">
              Questions? Reach out at{" "}
              <a href="mailto:cdjohnsonzero@gmail.com" className="text-text-primary underline hover:text-gold">
                cdjohnsonzero@gmail.com
              </a>{" "}
              or{" "}
              <a href="tel:+17194245680" className="text-text-primary underline hover:text-gold">
                719-424-5680
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
