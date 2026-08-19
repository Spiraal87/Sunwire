import type { Metadata } from "next";
import WebsiteClient from "./WebsiteClient";

const DESCRIPTION =
  "Custom websites for local businesses, built to convert visitors into booked calls — with local search foundations and an optional on-site chatbot for lead capture.";

export const metadata: Metadata = {
  title: "Websites & Chatbots for Local Businesses",
  description: DESCRIPTION,
  alternates: { canonical: "/website" },
  openGraph: {
    title: "Websites & Chatbots for Local Businesses | Sunforge Digital",
    description: DESCRIPTION,
    type: "website",
    url: "/website",
  },
};

export default function WebsitePage() {
  return <WebsiteClient />;
}
