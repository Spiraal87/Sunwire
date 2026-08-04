import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Sunforge Digital",
  description: "How Sunforge Digital handles information collected through this website and the AI demo line.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">Legal</p>
        <h1 className="mt-4 font-display text-3xl font-semibold sm:text-4xl">Privacy Policy</h1>
        <p className="mt-2 font-mono text-xs text-text-muted-dark">Effective July 2026</p>

        <div className="mt-10 space-y-8 font-body text-text-muted">
          <p>
            Sunforge Digital (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) operates this
            website. This page explains what information is collected when
            you visit, and how it&apos;s used.
          </p>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Information we collect
            </h2>
            <p className="mt-3">
              This website doesn&apos;t use forms that collect or store
              personal information. When you reach out by email or phone,
              anything you choose to share — your name, business, or contact
              details — goes directly to us and isn&apos;t stored on this
              website or by any third-party service connected to it.
            </p>
            <p className="mt-3">
              We don&apos;t currently use analytics, tracking pixels, or
              advertising cookies on this site. If that changes in the
              future, this policy will be updated to reflect it.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              How we use contact information
            </h2>
            <p className="mt-3">
              If you contact us by email or phone, we use what you share
              solely to respond to your inquiry and, if you choose to move
              forward, to provide our services. We don&apos;t sell, rent, or
              share your contact information with third parties.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              The AI phone demo
            </h2>
            <p className="mt-3">
              Calling the demo number connects you to an AI-powered phone
              system operated on our behalf by a third-party voice platform.
              That call may be recorded or transcribed to power the
              conversation and to notify us of what was discussed — such as
              your name, business type, and what you&apos;re interested in.
              We use that information only to follow up with you and improve
              the demo experience, not for any other purpose.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Third-party services
            </h2>
            <p className="mt-3">
              This site is hosted on Vercel. Like most hosting providers,
              Vercel may log basic technical information — such as IP address
              and request timing — for security and performance purposes. We
              don&apos;t have access to this data beyond standard hosting
              logs.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Children&apos;s privacy
            </h2>
            <p className="mt-3">
              This site isn&apos;t directed at children, and we don&apos;t
              knowingly collect information from anyone under 13.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Changes to this policy
            </h2>
            <p className="mt-3">
              We may update this policy from time to time. Changes will be
              posted on this page.
            </p>
          </section>

          <section>
            <h2 className="font-display text-lg font-semibold text-text-primary">
              Contact us
            </h2>
            <p className="mt-3">
              Questions about this policy? Reach out at{" "}
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
