"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { captureEvent } from "@/lib/analytics";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-line bg-bg/70 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4 sm:px-6 sm:py-5">
        <Link href="/" className="flex items-center">
          <img
            src="/images/sunforge_logo_full.svg"
            alt="Sunforge Digital"
            className="h-8 w-auto sm:h-10 lg:h-12"
          />
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/#contact"
            className="hidden font-mono text-xs uppercase tracking-wider text-text-muted transition-colors hover:text-gold xl:inline-flex"
          >
            Get in touch
          </Link>
          <Link
            href="/calculator"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "missed_call_calculator",
                placement: "navigation",
              })
            }
            className="whitespace-nowrap rounded-btn border border-text-secondary/50 bg-bg/70 px-3 py-2 font-display text-[11px] font-semibold text-text-primary shadow-surface backdrop-blur-md transition-all duration-200 hover:scale-[1.02] hover:border-text-primary hover:bg-panel/80 sm:px-4 sm:py-2.5 sm:text-xs"
          >
            <span className="sm:hidden">Calculator</span>
            <span className="hidden sm:inline">Missed-Call Calculator</span>
          </Link>
          <Link
            href="/#demo"
            onClick={() =>
              captureEvent("cta_clicked", {
                cta: "ai_receptionist_demo",
                placement: "navigation",
              })
            }
            className="whitespace-nowrap rounded-btn bg-gradient-accent px-3 py-2 font-display text-[11px] font-semibold text-bg shadow-forge transition-all duration-200 hover:scale-[1.02] hover:brightness-110 sm:px-4 sm:py-2.5 sm:text-xs"
          >
            <span className="md:hidden">Talk to AI</span>
            <span className="hidden md:inline">Talk to the AI Receptionist</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
