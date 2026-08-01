"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5 sm:py-6">
        <Link href="/" className="flex items-center">
          <img src="/images/sunforge_logo_full.svg" alt="Sunforge Digital" className="h-10 w-auto sm:h-12" />
        </Link>
        <Link
          href="/#contact"
          className="rounded-btn border border-line px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-gold hover:text-gold"
        >
          Get in touch
        </Link>
      </nav>
    </header>
  );
}
