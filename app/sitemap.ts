import type { MetadataRoute } from "next";
import { execSync } from "node:child_process";

const SITE_URL = "https://sunforgedigital.com";

// Route -> source files whose git history should drive its lastmod date.
// Using each page's own file plus the components it actually renders keeps
// the signal honest: an unrelated commit elsewhere in the repo (a new video
// prototype, a copy tweak on another page) shouldn't bump every route's
// lastmod - only real changes to that route's content should.
const ROUTE_SOURCES: Record<string, string[]> = {
  "": [
    "app/page.tsx",
    "components/Hero.tsx",
    "components/BusinessCategories.tsx",
    "components/Services.tsx",
    "components/HowItWorks.tsx",
    "components/Funnel.tsx",
    "components/ROI.tsx",
    "components/EmberCallWidget.tsx",
    "components/FAQ.tsx",
    "components/Contact.tsx",
    "components/Footer.tsx",
    "components/Nav.tsx",
  ],
  "/about": ["app/about/page.tsx"],
  "/calculator": ["app/calculator/page.tsx", "components/CalculatorWidget.tsx", "lib/calculator.ts"],
  "/hvac": [
    "app/hvac/page.tsx",
    "app/hvac/HvacClient.tsx",
    "components/Hero.tsx",
    "components/Services.tsx",
    "components/CalculatorTeaser.tsx",
    "lib/calculator.ts",
    "components/FAQ.tsx",
    "components/Contact.tsx",
  ],
  "/website": [
    "app/website/page.tsx",
    "app/website/WebsiteClient.tsx",
    "components/Hero.tsx",
    "components/Services.tsx",
    "components/FAQ.tsx",
    "components/Contact.tsx",
  ],
  "/resources": ["app/resources/page.tsx"],
  "/resources/missed-call-cost": ["app/resources/missed-call-cost/page.tsx"],
  "/resources/ai-receptionist-vs-answering-service": [
    "app/resources/ai-receptionist-vs-answering-service/page.tsx",
  ],
  "/resources/website-seo-geo-conversions": [
    "app/resources/website-seo-geo-conversions/page.tsx",
  ],
  "/privacy": ["app/privacy/page.tsx"],
  "/terms": ["app/terms/page.tsx"],
};

function lastCommitDate(files: string[]): Date {
  try {
    const out = execSync(
      `git log -1 --format=%cI -- ${files.map((f) => `"${f}"`).join(" ")}`,
      { cwd: process.cwd(), encoding: "utf8" }
    ).trim();
    return out ? new Date(out) : new Date();
  } catch {
    // No git history available at build time (e.g. a shallow clone or
    // non-git deploy environment) - fall back to the build date rather
    // than failing the build.
    return new Date();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(ROUTE_SOURCES).map(([route, files]) => ({
    url: `${SITE_URL}${route}`,
    lastModified: lastCommitDate(files),
  }));
}
