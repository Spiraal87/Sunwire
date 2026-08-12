"use client";

import type { ReactNode, SyntheticEvent } from "react";
import { captureEvent } from "@/lib/analytics";

export default function FaqItem({
  question,
  children,
}: {
  question: string;
  children: ReactNode;
}) {
  const handleToggle = (e: SyntheticEvent<HTMLDetailsElement>) => {
    if (e.currentTarget.open) {
      captureEvent("faq_expanded", { question });
    }
  };

  return (
    <details
      onToggle={handleToggle}
      className="group rounded-panel border border-line bg-gradient-panel px-6 py-5 shadow-surface"
    >
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-text-primary sm:text-lg">
        {question}
        <span aria-hidden="true" className="relative h-4 w-4 shrink-0 text-text-secondary">
          <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform duration-200 group-open:rotate-90" />
        </span>
      </summary>
      {children}
    </details>
  );
}
