import type { Metadata } from "next";
import ReceptionistClient from "./ReceptionistClient";

const DESCRIPTION =
  "AI receptionist that answers calls, books appointments, and captures caller details — handling missed calls, overflow calls, and after-hours inquiries while your team focuses on the work.";

export const metadata: Metadata = {
  title: "AI Receptionist for Local Businesses",
  description: DESCRIPTION,
  alternates: { canonical: "/receptionist" },
  openGraph: {
    title: "AI Receptionist for Local Businesses | Sunforge Digital",
    description: DESCRIPTION,
    type: "website",
    url: "/receptionist",
  },
};

export default function ReceptionistPage() {
  return <ReceptionistClient />;
}
