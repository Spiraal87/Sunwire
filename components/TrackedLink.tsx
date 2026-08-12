"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { captureEvent } from "@/lib/analytics";

export default function TrackedLink({
  href,
  cta,
  placement,
  className,
  children,
}: {
  href: string;
  cta: string;
  placement: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      onClick={() => captureEvent("cta_clicked", { cta, placement })}
      className={className}
    >
      {children}
    </Link>
  );
}
