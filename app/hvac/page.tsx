import type { Metadata } from "next";
import HvacClient from "./HvacClient";

const DESCRIPTION =
  "An AI receptionist and website built for HVAC companies — answers every no-heat, no-cool, and emergency call, day or night, so a missed call never becomes a lost customer.";

export const metadata: Metadata = {
  title: "AI Receptionist & Websites for HVAC Companies",
  description: DESCRIPTION,
  alternates: { canonical: "/hvac" },
  openGraph: {
    title: "AI Receptionist & Websites for HVAC Companies | Sunforge Digital",
    description: DESCRIPTION,
    type: "website",
    url: "/hvac",
  },
};

export default function HvacPage() {
  return <HvacClient />;
}
