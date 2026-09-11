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
export type CallCoverage = "busy" | "after-hours" | "both";
export type Assessment = { callCoverage: CallCoverage | ""; industry: IndustryId | ""; pain: Pain | ""; websiteState: WebsiteState | ""; value: number; extraCustomers: number; step: number };
export const emptyAssessment: Assessment = { callCoverage: "", industry: "", pain: "", websiteState: "", value: 120, extraCustomers: 3, step: 0 };
const KEY = "sunforge-assessment-v1";
const EVENT = "sunforge-assessment-changed";
let cache: Assessment = emptyAssessment;
let initialized = false;
let storageAvailable = true;

function sanitize(value: unknown): Assessment {
  const raw = value && typeof value === "object" ? value as Record<string, unknown> : {};
  const number = (key: keyof Assessment, min: number, max: number) => typeof raw[key] === "number" && Number.isFinite(raw[key]) ? Math.min(max, Math.max(min, raw[key] as number)) : emptyAssessment[key] as number;
  return {
    callCoverage: ["busy", "after-hours", "both"].includes(raw.callCoverage as string) ? raw.callCoverage as CallCoverage : "",
    industry: [...industries.map(i => i.id), "other"].includes(raw.industry as IndustryId) ? raw.industry as IndustryId : "",
    pain: ["calls", "website", "both"].includes(raw.pain as string) ? raw.pain as Pain : "",
    websiteState: ["working", "weak", "none"].includes(raw.websiteState as string) ? raw.websiteState as WebsiteState : "",
    value: number("value", 0, 1000000), extraCustomers: number("extraCustomers", 1, 100), step: Math.floor(number("step", 0, 2)),
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
  return { ...serviceRecommendation(profile), plan: profile.pain === "calls" ? (profile.callCoverage ? callPlans[profile.callCoverage] : null) : profile.pain && profile.websiteState ? startingPlans[profile.pain][profile.websiteState] : null };
}

type StartingPlan = { title: string; why: string; actions: [string, string, string] };
export const coverageLabels = { busy: "During business hours", "after-hours": "After hours", both: "Business hours and after hours" };
const callPlans: Record<CallCoverage, StartingPlan> = {
  busy: { title: "Cover calls while your team is busy.", why: "Keep your team focused while an AI receptionist handles calls they cannot pick up.", actions: ["Identify when to send unanswered or overflow calls to the receptionist.", "Define answers to common questions and the caller details to collect.", "Route requests to your team and test the follow-up process."] },
  "after-hours": { title: "Give after-hours callers a clear next step.", why: "Capture inquiries when your business is closed so your team can follow up when they return.", actions: ["Set your closed hours and after-hours call routing.", "Define the information to collect and what callers should expect next.", "Deliver requests to your team for follow-up on the next business day."] },
  both: { title: "Cover missed calls throughout the day and night.", why: "Use an AI receptionist for busy periods and after-hours inquiries, with a handoff that fits your team.", actions: ["Set overflow and after-hours routing for your business number.", "Define caller questions, request details, and handoff rules.", "Test both coverage windows and how your team receives requests."] },
};
const startingPlans: Record<Exclude<Pain, "calls">, Record<WebsiteState, StartingPlan>> = {
  website: {
    working: { title: "Improve the weak spots in a site that already gets inquiries.", why: "You are getting some results but still losing people. Start with a focused review to find friction before deciding on a redesign.", actions: ["Walk through the mobile journey from landing page to inquiry.", "Check service clarity, calls to action, and form completion.", "Prioritize targeted changes and measure completed inquiries."] },
    weak: { title: "Rework the path from visitor to inquiry.", why: "An existing site gives you a foundation. The priority is finding and fixing what makes visitors hesitate or leave.", actions: ["Review your key pages for confusing content and mobile usability issues.", "Simplify the service message and make the next action easy to find.", "Improve the inquiry or booking flow and track completed requests."] },
    none: { title: "Build your first clear path from discovery to contact.", why: "Without a website, referrals and social visitors lack one place to understand your services and take the next step.", actions: ["Define the services, service area, and customer questions your site must cover.", "Build a mobile-friendly site with trust signals and one clear inquiry path.", "Connect your contact form and phone links, then test the full customer journey."] },
  },
  both: {
    working: { title: "Keep what converts. Fix the handoff and missed calls.", why: "Your website generates interest, but the journey still breaks down. Focus on the contact experience and phone coverage together.", actions: ["Review how website visitors become calls, bookings, or form submissions.", "Add AI coverage for calls your team cannot answer.", "Tighten the website contact flow and route every request for follow-up."] },
    weak: { title: "Repair the website and call response as one customer journey.", why: "Both entry points need attention. Improving them together gives visitors a clear next step and callers a way to leave a complete request.", actions: ["Map where visitors drop off and when calls are missed.", "Rework the website inquiry path alongside AI call coverage.", "Connect both channels to a shared handoff and test end to end."] },
    none: { title: "Build the website and phone coverage together.", why: "You need an online starting point and a reliable way to handle the calls it generates.", actions: ["Define your services and the details needed for a useful customer request.", "Build a first website and configure AI coverage for unanswered calls.", "Route form submissions and caller details to your team for follow-up."] },
  },
};

function serviceRecommendation(profile: Assessment) {
  const calls = profile.pain === "calls" || profile.pain === "both";
  const website = profile.pain === "website" || profile.pain === "both";
  if (calls && website) return { id: "both", label: "Website + AI System", href: "/website", reason: "Capture interest online and answer the call that comes next." };
  if (website) return { id: "website", label: "Website Design", href: "/website", reason: "Start with a clearer, easier path from visitor to inquiry." };
  return { id: "receptionist", label: "AI Receptionist", href: "/receptionist", reason: "Start by answering the opportunities already reaching your phone." };
}

