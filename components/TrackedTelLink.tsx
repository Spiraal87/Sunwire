"use client";

import type { ReactNode } from "react";
import { captureEvent } from "@/lib/analytics";

export default function TrackedTelLink({
  href,
  location,
  className,
  children,
}: {
  href: string;
  location: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      onClick={() => captureEvent("tel_link_clicked", { location })}
      className={className}
    >
      {children}
    </a>
  );
}
