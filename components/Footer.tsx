import Link from "next/link";

const exploreLinks = [
  { label: "How we help", href: "/#services" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Hear the demo", href: "/#demo" },
  { label: "FAQ", href: "/#faq" },
  { label: "Get in touch", href: "/#contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
];

export default function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
      <div className="grid grid-cols-1 gap-10 border-t border-line pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center">
            <img src="/images/sunforge_logo_full.svg" alt="Sunforge Digital" className="h-6 w-auto" />
          </Link>
          <p className="mt-4 font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            Christopher Johnson &middot; Phoenix, AZ
          </p>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            Explore
          </p>
          <ul className="mt-4 space-y-2.5">
            {exploreLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-text-muted transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-text-muted">
            Legal
          </p>
          <ul className="mt-4 space-y-2.5">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-body text-sm text-text-muted transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-2 border-t border-line pt-6 font-mono text-xs text-text-muted-dark">
        <span>&copy; 2026 Sunforge Digital</span>
        <span>Phoenix, AZ</span>
      </div>
    </footer>
  );
}
