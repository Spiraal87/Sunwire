export type VerticalKey = "restaurant" | "home" | "club" | "other";

export type VerticalDefaults = {
  calls: number;
  miss: number;
  value: number;
  cap: number;
  hintCalls: string;
  hintMiss: string;
  hintValue: string;
  hintCap: string;
};

export const defaults: Record<VerticalKey, VerticalDefaults> = {
  restaurant: {
    calls: 300,
    miss: 33,
    value: 65,
    cap: 55,
    hintCalls: "Typical full-service restaurant/bar",
    hintMiss: "Washington Hospitality Assoc. benchmark",
    hintValue: "Blended order + reservation value",
    hintCap:
      "Peak-hour tables/kitchen throughput is fixed, but off-peak nights and to-go orders usually have real room.",
  },
  home: {
    calls: 250,
    miss: 28,
    value: 210,
    cap: 70,
    hintCalls: "Typical single-location HVAC/plumbing/electrical shop",
    hintMiss: "Home-services industry benchmark",
    hintValue: "Blended service call + repair value",
    hintCap:
      "Most missed calls become a future scheduled job, not an instant one — capacity is more flexible than same-day capacity suggests.",
  },
  club: {
    calls: 60,
    miss: 27,
    value: 500,
    cap: 35,
    hintCalls: "VIP / private-event inquiry calls only",
    hintMiss: "Rough placeholder — no vertical-specific study exists",
    hintValue: "Conservative VIP table minimum, secondary market",
    hintCap:
      "VIP tables are genuinely fixed inventory on busy nights — recoverable share is usually smaller than other verticals.",
  },
  other: {
    calls: 200,
    miss: 30,
    value: 120,
    cap: 50,
    hintCalls: "General small-business estimate",
    hintMiss: "General SMB benchmark",
    hintValue: "General estimate — adjust to your own average sale",
    hintCap: "Depends heavily on the business — adjust to how often you're actually turning away work.",
  },
};

export const verticalLabels: Record<VerticalKey, string> = {
  restaurant: "Restaurant / Bar",
  home: "Home Services",
  club: "Bar / Nightlife",
  other: "Other / Retail",
};

export function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

export function fmtRange(low: number, high: number) {
  return `${fmt(low)}–${fmt(high)}`;
}

// Not every recoverable call converts into a paying customer even once the
// business has the capacity to take it — some are comparison shopping, some
// don't follow through regardless. The capacity input already discounts for
// supply (can they serve it); this floor discounts for demand (would the
// caller actually convert). Flat across all business types for now.
export const CONVERSION_RATE_FLOOR = 0.3;

export type LeakInputs = {
  calls: number;
  missPct: number;
  value: number;
  capacityPct: number;
  locations?: number;
};

export type LeakEstimate = {
  missedCalls: number;
  recoverable: number;
  monthly: number;
  annual: number;
  monthlyLow: number;
  annualLow: number;
};

export function computeLeak({ calls, missPct, value, capacityPct, locations = 1 }: LeakInputs): LeakEstimate {
  const missedCalls = calls * (missPct / 100) * locations;
  const recoverable = missedCalls * (capacityPct / 100);
  const monthly = recoverable * value;
  const annual = monthly * 12;
  const monthlyLow = monthly * CONVERSION_RATE_FLOOR;
  const annualLow = annual * CONVERSION_RATE_FLOOR;
  return { missedCalls, recoverable, monthly, annual, monthlyLow, annualLow };
}

export function computeDefaultLeak(vertical: VerticalKey, locations = 1): LeakEstimate {
  const d = defaults[vertical];
  return computeLeak({ calls: d.calls, missPct: d.miss, value: d.value, capacityPct: d.cap, locations });
}
