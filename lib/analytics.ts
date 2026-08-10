import type { PostHog, Properties } from "posthog-js";

let initialization: Promise<PostHog | null> | null = null;

export function initializeAnalytics(): Promise<PostHog | null> {
  if (typeof window === "undefined") return Promise.resolve(null);

  const projectToken = process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
  if (!projectToken) return Promise.resolve(null);

  if (!initialization) {
    initialization = import("posthog-js").then(({ default: posthog }) => {
      if (!posthog.__loaded) {
        posthog.init(projectToken, {
          api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? "https://us.i.posthog.com",
          defaults: "2026-05-30",
          capture_pageview: "history_change",
          capture_pageleave: true,
          person_profiles: "identified_only",
          persistence: "localStorage",
          session_recording: {
            maskAllInputs: true,
          },
        });
      }

      if (new URLSearchParams(window.location.search).get("internal") === "1") {
        posthog.register({ is_internal: true });
      }

      return posthog;
    });
  }

  return initialization;
}

export function captureEvent(event: string, properties?: Properties) {
  void initializeAnalytics().then((posthog) => {
    posthog?.capture(event, properties);
  });
}
