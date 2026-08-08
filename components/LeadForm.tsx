"use client";

import { useState, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Phone } from "lucide-react";
import { captureEvent } from "@/lib/analytics";

const DEMO_PHONE_DISPLAY = "623-303-9061";
const DEMO_PHONE_TEL = "tel:+16233039061";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Starts with the categories/trades already advertised on the site
// (see BusinessCategories.tsx), then rounds out with common local-service verticals.
const BUSINESS_TYPES = [
  "Restaurant / Bar",
  "HVAC",
  "Plumbing",
  "Electrical",
  "Garage Doors",
  "Auto Services / Auto Repair",
  "Salon / Spa",
  "Fitness / Wellness Studio",
  "Retail / Specialty Shop",
  "Dental Practice",
  "Medical Practice",
  "Roofing",
  "Landscaping / Lawn Care",
  "Pest Control",
  "Cleaning Services",
  "Locksmith",
  "Moving Company",
  "Real Estate",
  "Legal Services",
  "Accounting / Bookkeeping",
  "Veterinary / Pet Services",
  "Chiropractic",
  "Contractor / Construction",
  "Pool Services",
  "Handyman",
  "Other",
];

type FormState = {
  firstName: string;
  lastName: string;
  businessType: string;
  email: string;
  callType: string;
  website: string; // honeypot
};

const INITIAL_STATE: FormState = {
  firstName: "",
  lastName: "",
  businessType: "",
  email: "",
  callType: "",
  website: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

const inputClasses =
  "w-full rounded-btn border border-white/15 bg-bg px-3 py-2.5 font-mono text-sm text-text-primary placeholder:text-text-muted-dark transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/40";

export default function LeadForm() {
  const prefersReducedMotion = useReducedMotion();
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleChange =
    (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const validate = (): FieldErrors => {
    const next: FieldErrors = {};
    if (!form.firstName.trim()) next.firstName = "Please enter your first name.";
    if (!form.lastName.trim()) next.lastName = "Please enter your last name.";
    if (!form.businessType.trim()) next.businessType = "Please enter your business type.";
    if (!form.email.trim() || !EMAIL_PATTERN.test(form.email.trim())) {
      next.email = "Please enter a valid email address.";
    }
    return next;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      captureEvent("lead_form_submitted", { businessType: form.businessType });
    } catch {
      setStatus("error");
    }
  };

  const glow = (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute -inset-4 -z-10 rounded-panel blur-2xl"
      style={{
        background:
          "radial-gradient(circle, rgba(230,168,75,0.35) 0%, rgba(211,138,52,0.18) 50%, transparent 75%)",
      }}
    />
  );

  if (status === "success") {
    return (
      <div className="relative">
        {glow}
        <motion.div
          initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.2 : 0.5, ease: "easeOut" }}
          className="rounded-card border-2 border-gold/50 bg-gradient-panel p-6"
        >
          <h3 className="font-display text-xl font-semibold text-text-primary">
            Request received.
          </h3>
          <p className="mt-2 font-body text-sm text-text-muted">
            While you wait, hear Ember - our live demo receptionist - right now.
          </p>
          <a
            href={DEMO_PHONE_TEL}
            onClick={() => captureEvent("tel_link_clicked", { location: "lead_form_success" })}
            className="mt-5 inline-flex items-center gap-2 rounded-btn bg-gradient-accent px-6 py-3 font-display text-sm font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110"
          >
            <Phone size={16} />
            Call the demo: {DEMO_PHONE_DISPLAY}
          </a>
          <p className="mt-4 font-body text-xs text-text-muted-dark">
            We&apos;ll follow up personally within one business day with a demo
            built around your business specifically.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative">
      {glow}
      <form
        onSubmit={handleSubmit}
        noValidate
        className="relative rounded-card border-2 border-gold/50 bg-gradient-panel p-5 sm:p-6"
      >
      <p className="mb-5 font-display text-sm font-semibold uppercase tracking-wide text-gold">
        Tell me about your business
      </p>

      <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="sm:w-1/2">
          <label htmlFor="lead-first-name" className="mb-1.5 block font-body text-sm font-medium text-text-secondary">
            First name <span className="text-gold">*</span>
          </label>
          <input
            id="lead-first-name"
            name="firstName"
            type="text"
            autoComplete="given-name"
            required
            value={form.firstName}
            onChange={handleChange("firstName")}
            className={inputClasses}
          />
          {errors.firstName && <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>}
        </div>

        <div className="sm:w-1/2">
          <label htmlFor="lead-last-name" className="mb-1.5 block font-body text-sm font-medium text-text-secondary">
            Last name <span className="text-gold">*</span>
          </label>
          <input
            id="lead-last-name"
            name="lastName"
            type="text"
            autoComplete="family-name"
            required
            value={form.lastName}
            onChange={handleChange("lastName")}
            className={inputClasses}
          />
          {errors.lastName && <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="lead-business-type" className="mb-1.5 block font-body text-sm font-medium text-text-secondary">
          Business type <span className="text-gold">*</span>
        </label>
        <div className="relative">
          <select
            id="lead-business-type"
            name="businessType"
            required
            value={form.businessType}
            onChange={handleChange("businessType")}
            className={`${inputClasses} appearance-none pr-9 ${
              form.businessType ? "" : "text-text-muted-dark"
            }`}
          >
            <option value="" disabled>
              Select one...
            </option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type} className="text-text-primary">
                {type}
              </option>
            ))}
          </select>
          <ChevronDown
            size={16}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-text-muted-dark"
          />
        </div>
        {errors.businessType && <p className="mt-1 text-xs text-red-400">{errors.businessType}</p>}
      </div>

      <div>
        <label htmlFor="lead-email" className="mb-1.5 block font-body text-sm font-medium text-text-secondary">
          Email <span className="text-gold">*</span>
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={handleChange("email")}
          className={inputClasses}
        />
        {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="lead-call-type" className="mb-1.5 block font-body text-sm font-medium text-text-secondary">
          What kind of calls do you get most?
        </label>
        <textarea
          id="lead-call-type"
          name="callType"
          rows={3}
          value={form.callType}
          onChange={handleChange("callType")}
          className={inputClasses}
        />
      </div>

      {/* Honeypot: hidden off-canvas, not display:none, so simple bots that skip display:none fields still fill it. */}
      <div className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor="lead-website" aria-hidden="true">
          Website
        </label>
        <input
          id="lead-website"
          name="website"
          type="text"
          tabIndex={-1}
          aria-hidden="true"
          autoComplete="off"
          value={form.website}
          onChange={handleChange("website")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="mt-2 rounded-btn bg-gradient-accent px-8 py-4 font-display text-base font-semibold text-bg shadow-forge transition-transform duration-200 hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "Sending..." : "Send it my way"}
      </button>

      {status === "error" && (
        <p className="text-xs text-red-400">
          Something went wrong - call or text me directly at{" "}
          <a
            href="tel:+17194245680"
            onClick={() => captureEvent("tel_link_clicked", { location: "lead_form_error" })}
            className="underline hover:text-gold"
          >
            719-424-5680
          </a>
          .
        </p>
      )}
      </div>
      </form>
    </div>
  );
}
