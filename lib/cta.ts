export const CTA_LABELS = {
  assessment: "Book a 15-Minute Assessment",
  aiDemo: "Try the AI Demo",
  calculator: "Try the Calculator",
  websiteSystem: "See the Website System",
} as const;

export function getVerticalAssessmentLabel(vertical: string) {
  return `Book a 15-Minute ${vertical} Assessment`;
}
