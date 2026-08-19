"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { captureEvent } from "@/lib/analytics";

const mobileSectionLinks = [
  {
    href: "/#services",
    label: "Systems",
    cta: "systems",
  },
  {
    href: "/#how-it-works",
    label: "How it works",
    cta: "how_it_works",
  },
  {
    href: "/#demo",
    label: "AI demo",
    cta: "ai_demo",
  },
  {
    href: "/#faq",
    label: "FAQ",
    cta: "faq",
  },
  {
    href: "/#contact",
    label: "Assessment",
    cta: "assessment_request",
  },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled ? "border-line bg-bg/70 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <img
            src="/images/sunforge_logo_full.svg"
            alt="Sunforge Digital"
            className="h-10 w-auto sm:h-11 lg:h-12"
          />
        </Link>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-text-primary transition-colors hover:border-gold hover:text-gold md:hidden"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls="site-navigation-menu"
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        <div className="hidden items-center gap-1 sm:gap-2 lg:gap-3 md:flex">
          <Link
            href="/about"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "about_page",
                placement: "navigation",
              })
            }
            className="whitespace-nowrap px-1 py-2 font-display text-[10px] font-semibold text-text-secondary transition-colors duration-200 hover:text-gold sm:px-2 sm:text-xs"
          >
            About
          </Link>
          <Link
            href="/calculator"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "missed_call_calculator",
                placement: "navigation",
              })
            }
            className="whitespace-nowrap px-1 py-2 font-display text-[10px] font-semibold text-text-secondary transition-colors duration-200 hover:text-gold sm:px-2 sm:text-xs"
          >
            <span className="min-[360px]:hidden">Calc</span>
            <span className="hidden min-[360px]:inline md:hidden">Calculator</span>
            <span className="hidden md:inline">Missed-Call Calculator</span>
          </Link>
          <Link
            href="/resources"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "resources",
                placement: "navigation",
              })
            }
            className="whitespace-nowrap px-1 py-2 font-display text-[10px] font-semibold text-text-secondary transition-colors duration-200 hover:text-gold sm:px-2 sm:text-xs"
          >
            Resources
          </Link>
          <Link
            href="/#demo"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "ai_receptionist_demo",
                placement: "navigation",
              })
            }
            className="group inline-flex items-center gap-1 whitespace-nowrap px-1 py-2 font-display text-[10px] font-semibold text-text-primary transition-colors duration-200 hover:text-gold sm:px-2 sm:text-xs"
          >
            <span className="sm:hidden">Demo</span>
            <span className="hidden sm:inline">Try the AI Demo</span>
            <span
              aria-hidden="true"
              className="text-gold transition-transform duration-200 group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </Link>
          <Link
            href="/#contact"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "assessment_request",
                placement: "navigation",
              })
            }
            className="whitespace-nowrap rounded-btn bg-gradient-accent px-2 py-2 font-display text-[10px] font-semibold text-bg shadow-forge transition-all duration-200 hover:scale-[1.02] hover:brightness-110 sm:px-4 sm:py-2.5 sm:text-xs"
          >
            <span className="md:hidden">Assessment</span>
            <span className="hidden md:inline">Book a 15-Minute Assessment</span>
          </Link>
        </div>
      </nav>

      {menuOpen && (
        <div
          id="site-navigation-menu"
          className="border-t border-line bg-bg/95 px-4 py-4 backdrop-blur-md md:hidden"
        >
          <div className="mx-auto flex max-w-6xl flex-col gap-2">
            <Link
              href="/about"
              onClick={() => {
                captureEvent("cta_clicked", {
                  cta: "about_page",
                  placement: "navigation_mobile",
                });
                closeMenu();
              }}
              className="rounded-2xl px-4 py-3 font-display text-sm font-semibold text-text-primary transition-colors hover:text-gold"
            >
              About
            </Link>
            <Link
              href="/calculator"
              onClick={() => {
                captureEvent("cta_clicked", {
                  cta: "missed_call_calculator",
                  placement: "navigation_mobile",
                });
                closeMenu();
              }}
              className="rounded-2xl px-4 py-3 font-display text-sm font-semibold text-text-primary transition-colors hover:text-gold"
            >
              Missed-Call Calculator
            </Link>
            <Link
              href="/resources"
              onClick={() => {
                captureEvent("cta_clicked", {
                  cta: "resources",
                  placement: "navigation_mobile",
                });
                closeMenu();
              }}
              className="rounded-2xl px-4 py-3 font-display text-sm font-semibold text-text-primary transition-colors hover:text-gold"
            >
              Resources
            </Link>

            <div className="mt-2 border-t border-line pt-4">
              <p className="px-4 font-mono text-[10px] uppercase tracking-[0.15em] text-text-muted">
                On this page
              </p>
              <div className="mt-2 flex flex-col gap-1">
                {mobileSectionLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => {
                      captureEvent("cta_clicked", {
                        cta: link.cta,
                        placement: "navigation_mobile_section",
                      });
                      closeMenu();
                    }}
                    className="rounded-2xl px-4 py-3 font-body text-sm text-text-muted transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/#contact"
              onClick={() => {
                captureEvent("cta_clicked", {
                  cta: "assessment_request",
                  placement: "navigation_mobile",
                });
                closeMenu();
              }}
              className="mt-3 inline-flex items-center justify-center rounded-btn bg-gradient-accent px-4 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-all duration-200 hover:brightness-110"
            >
              Book a 15-Minute Assessment
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
