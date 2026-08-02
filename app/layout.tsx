import type { Metadata } from "next";
import { Space_Grotesk, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

const SITE_URL = "https://sunforgedigital.com";
const SITE_NAME = "Sunforge Digital";
const SITE_DESCRIPTION =
  "Websites and AI phone receptionists that help local businesses in Phoenix, Arizona capture more customers, book more jobs, and stop losing revenue to missed calls.";
const OG_IMAGE = "/images/hero-image3.png";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Sunforge Digital | Capture More Customers, Miss Fewer Calls",
    template: "%s | Sunforge Digital",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "AI receptionist",
    "AI phone answering service",
    "missed call revenue calculator",
    "local business website design",
    "Phoenix Arizona web design",
    "AI answering service for small business",
  ],
  authors: [{ name: "Christopher Johnson" }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: SITE_NAME,
    title: "Sunforge Digital | Capture More Customers, Miss Fewer Calls",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: 1492,
        height: 1054,
        alt: "Sunforge Digital — concentric forged rings around a glowing molten core",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sunforge Digital | Capture More Customers, Miss Fewer Calls",
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  url: SITE_URL,
  image: `${SITE_URL}/images/sunforge_logo_full.svg`,
  logo: `${SITE_URL}/images/sunforge_logo_full.svg`,
  description: SITE_DESCRIPTION,
  telephone: "+17194245680",
  email: "cdjohnsonzero@gmail.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "AdministrativeArea",
    name: "Phoenix metropolitan area, Arizona",
  },
  founder: {
    "@type": "Person",
    name: "Christopher Johnson",
  },
  makesOffer: [
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "AI Phone Receptionist",
        description:
          "A conversational AI voice system that answers calls a business would otherwise miss, captures caller info, checks availability, and books appointments — running alongside the business's existing phone number and staff.",
      },
    },
    {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Website Design & Development",
        description:
          "Fast, modern, mobile-first websites built around the reputation a local business has already earned in person.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${manrope.variable} ${ibmPlexMono.variable}`}>
      <body className="font-body bg-bg text-text-primary antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
