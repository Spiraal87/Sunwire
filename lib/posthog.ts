import posthog from "posthog-js";

let initialized = false;

export function getPostHog() {
  if (typeof window === "undefined") return null;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) return null;

  if (!initialized) {
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
      capture_pageview: false,
      person_profiles: "identified_only",
    });
    initialized = true;
  }

  return posthog;
}
