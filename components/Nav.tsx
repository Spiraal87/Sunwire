"use client";

import { useEffect, useState } from "react";

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
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
          <span
            aria-hidden="true"
            className="inline-block h-2.5 w-2.5 rounded-full bg-gradient-accent"
          />
          Sunwire Digital
        </a>
        <a
          href="#contact"
          className="rounded-btn border border-line px-4 py-2 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-gold hover:text-gold"
        >
          Get in touch
        </a>
      </nav>
    </header>
  );
}
