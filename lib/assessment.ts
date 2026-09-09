"use client";

import { useSyncExternalStore } from "react";

export const industries = [
  { id: "home", name: "Home Services", businessType: "HVAC", image: "home-service.png", value: 210, problem: "The phone rings while your team is on a job.", caller: "My AC stopped cooling. Can someone come out tomorrow?", reply: "I can take your service address and preferred time, then send your team a service request.", outcome: "A clear service request, ready for your dispatcher.", href: "/hvac" },
  { id: "restaurant", name: "Restaurants & Bars", businessType: "Restaurant / Bar", image: "restaurant-bars.png", value: 65, problem: "Reservations get missed in the middle of dinner service.", caller: "Can I reserve a table for six on Friday?", reply: "I can collect your preferred time and party size for the restaurant to confirm.", outcome: "A reservation request without interrupting the floor.", href: "/receptionist" },
  { id: "salon", name: "Salons & Spas", businessType: "Salon / Spa", image: "spa.png", value: 110, problem: "You cannot pick up while you are with a client.", caller: "Do you have a haircut opening this week?", reply: "Which service and day work for you? I can pass your appointment request to the salon.", outcome: "The next appointment opportunity captured while you work.", href: "/receptionist" },
  { id: "fitness", name: "Fitness & Wellness Studios", businessType: "Fitness / Wellness Studio", image: "gym.png", value: 90, problem: "First-time visitors have questions after your last class.", caller: "Is your Saturday class suitable for a beginner?", reply: "I can share the studio’s class information and help request an introductory session.", outcome: "A new member inquiry with the context your team needs.", href: "/receptionist" },
  { id: "retail", name: "Retail & Specialty Shops", businessType: "Retail / Specialty Shop", image: "retail-specialty.png", value: 120, problem: "A customer on the phone competes with a customer in the shop.", caller: "Can you help me with a custom order?", reply: "Tell me what you have in mind. I can send the shop your request and contact preference.", outcome: "A custom-order lead ready for a personal follow-up.", href: "/receptionist" },
  { id: "medical", name: "Dental & Medical Practices", businessType: "Dental Practice", image: "dental.png", value: 150, problem: "New patient scheduling calls arrive while the front desk is busy.", caller: "Are you accepting new patients?", reply: "I can collect an appointment request for the front desk. Please do not share medical details in this demo.", outcome: "An administrative inquiry routed to the practice—not medical advice.", href: "/receptionist" },
] as const;

export type IndustryId = typeof industries[number]["id"] | "other";
export type Pain = "calls" | "website" | "both";
export type WebsiteState = "working" | "weak" | "none";
export type Assessment = { industry: IndustryId | ""; pain: Pain | ""; websiteState: WebsiteState | ""; calls: number; missPct: number; value: number; capacityPct: number; visitors: number; conversionPct: number; step: number };
export const emptyAssessment: Assessment = { industry: "", pain: "", websiteState: "", calls: 200, missPct: 30, value: 120, capacityPct: 50, visitors: 500, conversionPct: 1, step: 0 };
const KEY = "sunforge-assessment-v1";
const EVENT = "sunforge-assessment-changed";
let cache: Assessment = emptyAssessment;
let initialized = false;
let storageAvailable = true;

function sanitize(value: unknown): Assessment {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const number = (key: keyof Assessment, min: number, max: number) => typeof raw[key] === "number" && Number.isFinite(raw[key]) ? Math.min(max, Math.max(min, raw[key] as number)) : emptyAssessment[key] as number;
  return {
    industry: [...industries.map(i => i.id), "other"].includes(raw.industry as IndustryId) ? raw.industry as IndustryId : "",
    pain: ["calls", "website", "both"].includes(raw.pain as string) ? raw.pain as Pain : "",
    websiteState: ["working", "weak", "none"].includes(raw.websiteState as string) ? raw.websiteState as WebsiteState : "",
    calls: number("calls", 0, 100000), missPct: number("missPct", 0, 100), value: number("value", 0, 1000000), capacityPct: number("capacityPct", 0, 100), visitors: number("visitors", 0, 1000000), conversionPct: number("conversionPct", 0, 100), step: Math.floor(number("step", 0, 2)),
  };
}
function read() {
  if (!initialized && typeof window !== "undefined") {
    initialized = true;
    try { const raw = localStorage.getItem(KEY); if (raw) cache = sanitize(JSON.parse(raw)); } catch { storageAvailable = false; }
  }
  return cache;
}
function subscribe(callback: () => void) {
  const sync = (event: StorageEvent) => { if (event.key === KEY || event.key === null) { initialized = false; cache = emptyAssessment; callback(); } };
  window.addEventListener(EVENT, callback);
  window.addEventListener("storage", sync);
  return () => { window.removeEventListener(EVENT, callback); window.removeEventListener("storage", sync); };
}
export function updateAssessment(patch: Partial<Assessment>) {
  cache = sanitize({ ...read(), ...patch });
  try { localStorage.setItem(KEY, JSON.stringify(cache)); storageAvailable = true; } catch { storageAvailable = false; }
  window.dispatchEvent(new Event(EVENT));
}
export function resetAssessment() {
  cache = { ...emptyAssessment }; initialized = true;
  try { localStorage.removeItem(KEY); } catch { storageAvailable = false; }
  window.dispatchEvent(new Event(EVENT));
}
export function useAssessment() {
  const profile = useSyncExternalStore(subscribe, read, () => emptyAssessment);
  return { profile, update: updateAssessment, persistent: storageAvailable };
}
export function chooseIndustry(industry: IndustryId) {
  updateAssessment({ industry, value: industries.find(i => i.id === industry)?.value ?? 120 });
}
export function recommendation(profile: Assessment) {
  const calls = profile.pain === "calls" || profile.pain === "both";
  const website = profile.pain === "website" || profile.pain === "both" || profile.websiteState === "weak" || profile.websiteState === "none";
  if (calls && website) return { id: "both", label: "Website + AI System", href: "/website", reason: "Capture interest online and answer the call that comes next." };
  if (website) return { id: "website", label: "Website Design", href: "/website", reason: "Start with a clearer, easier path from visitor to inquiry." };
  return { id: "receptionist", label: "AI Receptionist", href: "/receptionist", reason: "Start by answering the opportunities already reaching your phone." };
}

