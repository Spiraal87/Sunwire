# Sunforge Digital — Handoff Guide

## 1. Tech Stack & Setup

### Framework & Runtime
- **Framework**: Next.js 14.2.35 (App Router)
- **Language**: TypeScript 5
- **Runtime**: Node.js (use `npm run dev` for local development, `npm run build` && `npm start` for production-like testing)
- **Package Manager**: npm (see `package-lock.json`)

### Install & Build Commands
```bash
# Install dependencies
npm install

# Development server (runs on http://localhost:3000)
npm run dev

# Build for production
npm build

# Start production server
npm start

# Lint code
npm run lint
```

### Key Dependencies
- **Animations**: Framer Motion 11.11.17 (used extensively for motion, transitions, and visual effects)
- **UI Components**: Lucide React 1.28.0 (icons)
- **Analytics**: PostHog JS 1.413.2 (event tracking & session recording)
- **Email**: Resend 6.24.0 (transactional email for lead forms)
- **Google APIs**: googleapis 178.0.0 (Google Sheets API integration for lead capture)
- **Styling**: Tailwind CSS 3.4.15 + PostCSS with autoprefixer
- **Fonts**: Google Fonts (Space Grotesk, Manrope, IBM Plex Mono)

### Build Configuration
- `next.config.mjs`: Redirects `/fb` to main site with UTM tracking
- `tailwind.config.ts`: Custom theme with Sunforge branding
- `tsconfig.json`: Strict TypeScript with path aliases (`@/` points to root)
- `postcss.config.js`: Standard Next.js PostCSS pipeline

---

## 2. Project Structure & Component Locations

### Homepage Components
**File**: `app/page.tsx`
- Entry point for the website
- Composes the full homepage flow
- State management for section animations

**Key sections**:
1. **Navigation**: `components/Nav.tsx`
   - Global navigation bar, logo, theme toggle

2. **Hero Section**: `components/Hero.tsx`
   - Landing hero with framer-motion animations
   - Gradient text ("calls and online")
   - CTA buttons to demo and assessment
   - Respects `useReducedMotion()` for accessibility

3. **Industry/Business Categories**: `components/BusinessCategories.tsx`
   - Displays industry cards (restaurant, home services, retail, spa, etc.)
   - Currently used on homepage; planned enhancement: make these interactive

4. **Services Section**: `components/Services.tsx`
   - Three core offerings: AI Receptionist, Website Design, Website + AI System
   - Animated cards that light up on scroll (`backlit` prop)

5. **System Comparison**: `components/SystemComparison.tsx`
   - Comparison table: Sunforge vs traditional answering services vs DIY
   - Animated section divider (`SectionDivider.tsx`)

6. **Operations Spotlight**: `components/OperationsSpotlight.tsx`
   - Featured content section (problem/solution framing)

7. **Contact Form**: `components/Contact.tsx`
   - Lead capture form (name, business type, call type)
   - Calls `POST /api/lead` on submit
   - Includes honeypot field for spam protection

8. **FAQ**: `components/FAQ.tsx`
   - Accordion-style Q&A
   - Uses `FaqItem.tsx` for individual items

9. **Footer**: `components/Footer.tsx`
   - Copyright, links, contact info

### Page Routes

| Path | Component | Purpose |
|------|-----------|---------|
| `/` | `app/page.tsx` | Homepage |
| `/calculator` | `app/calculator/page.tsx` | Missed call revenue calculator (standalone) |
| `/receptionist` | `app/receptionist/page.tsx` | AI receptionist service page |
| `/hvac` | `app/hvac/page.tsx` | Industry-specific landing (home services) |
| `/website` | `app/website/page.tsx` | Website design service page |
| `/about` | `app/about/page.tsx` | About page |
| `/terms` | `app/terms/page.tsx` | Terms of service |
| `/privacy` | `app/privacy/page.tsx` | Privacy policy |
| `/resources` | `app/resources/page.tsx` + layout | Blog/resource hub |
| `/resources/...` | Various | Individual resource articles |

### Client-Side Pages
Three specialized "Client" components use Vapi integration for voice demos:
- `app/receptionist/ReceptionistClient.tsx`: AI receptionist demo
- `app/hvac/HvacClient.tsx`: HVAC-specific demo
- `app/website/WebsiteClient.tsx`: Website/AI combo demo

### Key UI Components
- **CalculatorWidget.tsx**: Missad call ROI calculator (interactive, stores state)
- **CalculatorTeaser.tsx**: Embedded calculator preview (shows on home or vertical pages)
- **LeadForm.tsx**: Reusable lead capture form
- **Hero.tsx**: Flexible hero section with customizable headings/CTAs
- **Services.tsx, SystemComparison.tsx**: Content sections with animations
- **EnergyLine.tsx**: Decorative animated energy/glow effect
- **GlowBorder.tsx**: Animated border effect used in cards
- **SignalGraphic.tsx**: Animated signal waves
- **SectionDivider.tsx**: Animated divider between sections (with "lit" state)
- **ThemeToggle.tsx**: Light/dark mode switcher
- **Analytics.tsx**: PostHog initialization (client-side)
- **ContactForm.tsx**, **EMBerocallWidget.tsx**: Specialized forms/widgets
- **Footer.tsx**, **Nav.tsx**: Layout components

---

## 3. Brand Assets & Media

### Logos
- `public/images/sunforge_logo_full.svg`: Full logo (horizontal)
- `public/images/sunforge_icon_only.svg`: Icon-only version

### Videos (Locally Stored)
- `public/images/hero-video.mp4`: Homepage hero background video
- `public/images/receptionist_video.mp4`: AI receptionist demo video
- `public/images/website-hero.mp4`: Website service page hero video

### Industry Icons & Images
- `public/images/[industry].png`: Industry category images (dental, gym, spa, restaurant-bars, retail-specialty, home-service)
- `public/images/icon-*.svg`: Feature icons (receptionist, website, revenue, time-saved, support, resources, chatbot)
- `public/images/hero-image3.png`: Main hero background image

### Scene/Context Images
- `public/images/contact-office-scene.png`: Contact form background
- `public/images/operations-assessment-scene.png`: Operations section
- `public/images/website-lost-customer.png`: Website section
- `public/images/website-problem-phone.png`: Website section
- `public/images/funnel-before-after.png`: ROI/funnel visualization

### Other Assets
- `public/images/demo-qr.png`: QR code linking to demo
- `public/images/ember-persona.png`: AI receptionist "Ember" character
- `public/images/sunforge-scroller.png`: Branded visual element
- `public/images/energy-beam-core.png`: Decorative graphic

### External Media
- Vapi integration hosts voice demo (served via API routes, not local)
- Google Sheets stores lead submissions (external)

---

## 4. Animations & UI Libraries

### Framer Motion Usage
Framer Motion powers nearly all interactive animations:
- **Page transitions** and hero animations in `Hero.tsx`, `Services.tsx`, `SystemComparison.tsx`
- **Scroll-triggered animations** via framer-motion variants
- **Reduced motion support**: Code checks `useReducedMotion()` before animating
- **AnimatePresence**: Used in `CalculatorWidget.tsx` for tab/section transitions

### Tailwind CSS + Custom CSS
- `app/globals.css`: Global styles including CSS variables (theme colors, fonts)
- Custom theme in `tailwind.config.ts`: Sunforge brand colors (gold accents, dark backgrounds, gradients)
- `postcss.config.js`: Handles Tailwind + autoprefixer pipeline

### Decorative Elements
- `GlowBorder.tsx`: Animated glowing border on cards
- `SignalGraphic.tsx`: Animated signal waves
- `EnergyLine.tsx`: Decorative energy effect running down the page
- `SectionDivider.tsx`: Animated ring-based divider between sections

---

## 5. Integrations & External Services

### PostHog Analytics
**Purpose**: Visitor tracking, event capture, session recording (with masked inputs)
**Env vars**: 
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` (public, safe to expose)
- `NEXT_PUBLIC_POSTHOG_HOST` (defaults to US PostHog)

**How it works**:
- Client-side: `lib/analytics.ts` initializes PostHog on first use
- `captureEvent(eventName, properties)` sends custom events
- Session recording enabled with input masking (honeypot, form fields hidden)
- Used throughout (`TrackedLink.tsx`, `TrackedTelLink.tsx`, specific page CTAs)

**Preview safely**: PostHog silently no-ops if token is not set; set both env vars to null/empty string to disable.

---

### Resend Email API
**Purpose**: Send lead form submissions to owner email
**Env var**: `RESEND_API_KEY` (server-only, never expose to client)

**How it works**:
- `app/api/lead/route.ts` receives POST with form data
- Validates required fields (firstName, lastName, businessType, email)
- Includes honeypot field (`website` field; if filled, silently succeeds without sending)
- Sends email via Resend to `cdjohnsonzero@gmail.com`
- Email subject: `New lead: [businessType]`
- Reply-to: submitter's email

**Preview safely**: If `RESEND_API_KEY` is missing, the endpoint logs a warning and succeeds anyway (graceful degradation).

---

### Vapi Voice AI Integration
**Purpose**: Voice demo of AI receptionist (call answering system)
**Env var**: `VAPI_API_KEY` (server-only)

**How it works**:
- Vapi is a third-party voice AI platform (external hosted service)
- Client components (`ReceptionistClient.tsx`, `HvacClient.tsx`, `WebsiteClient.tsx`) embed Vapi widgets
- Users can call or click to trigger a demo call with the AI receptionist
- Three demo flows:
  1. **Receptionist**: Generic AI answering service demo
  2. **HVAC**: Industry-specific demo for home services
  3. **Website**: Combined website + AI booking demo
- Webhook routes for Vapi callbacks:
  - `POST /api/vapi/book-call`: Appointment booking confirmation (logs only, stub for future reminders)
  - `POST /api/vapi/capture-lead`: Lead capture callback
  - `POST /api/vapi/call-ended`: Call end notification
  - `POST /api/vapi/reengagement-scan`: Reengagement tracking

**Preview safely**: Vapi widgets gracefully degrade if API key is not set; demo buttons may not function but page renders normally.

---

### Google Sheets API (OAuth)
**Purpose**: Store lead submissions and form responses in a Google Sheet
**Env vars** (server-only):
- `GOOGLE_OAUTH_CLIENT_ID` (from OAuth credentials JSON)
- `GOOGLE_OAUTH_CLIENT_SECRET` (from OAuth credentials JSON)
- `GOOGLE_REFRESH_TOKEN` (generated via token refresh flow)
- `GOOGLE_SHEET_ID` (target spreadsheet ID)

**How it works**:
- `lib/sheets.ts` manages Google Sheets integration
- `appendRow(sheetId, values)` appends a row to the "Leads" sheet
- OAuth 2.0 flow uses refresh token to keep access persistent
- Used by `app/api/lead-intake/route.ts` to log form submissions

**To regenerate refresh token**:
- Run `node get-refresh-token.js` locally (if script exists in project root)
- Follow OAuth prompt to authenticate with the Google account that owns the sheet
- Update `GOOGLE_REFRESH_TOKEN` in `.env.local`

**Preview safely**: If Google credentials are not set, the endpoint logs an error and fails gracefully (form still accepts submission locally).

---

### Analytics & Event Tracking
**PostHog event names used** (tracked for CTAs, form interactions, demo engagement):
- `assessment_request`: User clicked "request assessment" CTA
- `ai_receptionist_demo`: User clicked demo button
- `api_website_design_demo`: Website demo initiated
- `industry_category_clicked`: User selected industry card
- `call_logged`: Call initiated through Vapi

---

## 6. How to Preview Safely (No Production Changes)

### Development Mode
```bash
npm run dev
```
- Runs on `http://localhost:3000`
- All API routes run locally
- **Resend email**: Disabled by default if `RESEND_API_KEY` is not set
- **PostHog**: Tracks events locally if `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set (can disable by unsetting)
- **Google Sheets**: Fails gracefully if credentials are not set
- **Vapi demo**: Requires valid API key to function; gracefully degrades otherwise

### Safe Preview Strategy
1. Leave all `.env.local` variables unset or use the `.env.example` placeholders
2. Start the dev server: `npm run dev`
3. Navigate to pages and test interactive features (calculator, forms, animations)
4. Forms will accept input but not send anywhere
5. Voice demos will not initiate without Vapi API key

### What Won't Work Without Credentials
- Email notifications (lead form submissions won't send emails)
- Google Sheets logging (lead-intake won't write to the sheet)
- Voice AI demos (Vapi widgets won't be callable)
- Analytics event tracking (PostHog won't capture events)

All of these degrade gracefully; the pages render normally and accept input without credentials set.

---

## 7. Key Implementation Files by Feature

### Missed Call Revenue Calculator
- **Standalone page**: `app/calculator/page.tsx`
- **Widget (reusable)**: `components/CalculatorWidget.tsx`
- **Business defaults & logic**: `lib/calculator.ts`
- **Features**:
  - Tab-based vertical selection (Restaurant, Home Services, Bar/Nightlife, Other)
  - Three sections: Call Volume, Job Value, Time Available
  - Real-time revenue leak calculation
  - Source estimation tool
  - Sticky call-to-action bar
  - Full-page version with Nav/Footer or embeddable widget

### Lead Capture / Contact Form
- **Homepage form**: `components/Contact.tsx`
- **Form input**: `components/LeadForm.tsx`
- **API endpoint**: `app/api/lead/route.ts`
- **Google Sheets logging**: `app/api/lead-intake/route.ts`
- **Features**:
  - Name, business type, call type, email fields
  - Honeypot spam protection
  - Resend email delivery
  - Google Sheets row append
  - Event tracking (PostHog)

### Assessment / Vertical Landing Pages
- **HVAC (Home Services)**: `app/hvac/page.tsx` + `HvacClient.tsx`
- **General Receptionist**: `app/receptionist/page.tsx` + `ReceptionistClient.tsx`
- **Website Service**: `app/website/page.tsx` + `WebsiteClient.tsx`
- **Features**:
  - Industry-specific messaging
  - Embedded Vapi voice demo
  - Lead form
  - ROI section
  - FAQ

### Voice Demo Integration
- **Vapi widget endpoints**: `app/api/vapi/*`
  - `book-call`: Booking confirmation
  - `capture-lead`: Lead data callback
  - `call-ended`: Call completion
  - `reengagement-scan`: Follow-up tracking
- **Client components**:
  - `EmberCallWidget.tsx`: Reusable Vapi widget wrapper
  - `ReceptionistClient.tsx`, `HvacClient.tsx`, `WebsiteClient.tsx`: Page-specific implementations

### Analytics & Event Tracking
- **Client-side tracking**: `lib/analytics.ts`
- **CTA tracking**: `components/TrackedLink.tsx`, `components/TrackedTelLink.tsx`
- **Event names**: `lib/cta.ts` (centralized CTA labels and event mappings)

---

## 8. Planned Improvements (Not Yet Implemented)

The following features are planned but not yet built:

1. **Animated Forge Hero**
   - Interactive forge visualization (molten metal, hammer animation)
   - Sample call sequence playback overlay
   - Clearer visual storytelling of the "Sunforge" concept

2. **Interactive Industry Cards**
   - Click-to-open modal or slide-out panel for each industry
   - Industry-specific problem/solution demo
   - Direct booking link within each card

3. **Browsable Website Demo**
   - Live preview of a sample Sunforge website (desktop & mobile view)
   - Show how the AI receptionist integrates with a real site
   - Click-through interactive mockup

4. **Problem Selector & Service Recommendation**
   - Guided question flow to identify business pain points
   - Recommend starting with AI receptionist, website, or both
   - Smart filtering to next steps

5. **Assessment Flow with State Persistence**
   - Multi-step form that remembers visitor selections
   - Save progress via `localStorage` or URL state
   - Provide personalized recommendations based on answers
   - Show ROI specific to their business profile

---

## 9. Known Limitations & Build Notes

### Build & Deployment
- **Vercel**: Project is configured for Vercel (`.vercelignore` excludes `sunforge-video-ad` directory from builds)
- **sunforge-video-ad**: Separate Remotion video project (not part of this handoff; tracked in parent `.vercelignore`)
- **Video hosting**: Current videos (hero-video.mp4, etc.) are served locally; for production deployment, consider CDN hosting for large files

### Performance Considerations
- Framer Motion animations can be heavy on low-end devices; `useReducedMotion()` handles user preferences
- Video autoplay may not work on mobile; consider `muted` + `autoplay` attributes
- Google Sheets API: Refresh token may expire; monitor error logs and regenerate as needed

### Browser Support
- Modern browsers only (ES2020+, CSS Grid/Flexbox)
- No IE11 support
- Mobile-first responsive design via Tailwind

### Environment Variable Checklist
For a production build, ensure:
- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is set (analytics)
- `NEXT_PUBLIC_POSTHOG_HOST` is set (defaults to US)
- `RESEND_API_KEY` is set (email delivery)
- `VAPI_API_KEY` is set (voice demos)
- `GOOGLE_OAUTH_CLIENT_ID`, `GOOGLE_OAUTH_CLIENT_SECRET`, `GOOGLE_REFRESH_TOKEN`, `GOOGLE_SHEET_ID` are all set (lead logging)

If any are missing, features gracefully degrade.

---

## 10. Troubleshooting & Tips

### "Cannot find module" errors
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` for path alias configuration (`@/` points to project root)

### Build fails with TypeScript errors
- Run `npm run lint` to check for errors
- Ensure `node_modules` is not in `.gitignore` after install (or reinstall if missing)

### Vapi demos not working
- Verify `VAPI_API_KEY` is set in `.env.local`
- Check browser console for Vapi script load errors
- Vapi webhooks expect JSON POST; ensure Content-Type header is set correctly

### Google Sheets not logging leads
- Verify `GOOGLE_REFRESH_TOKEN` is still valid (may expire after ~6 months)
- Check `GOOGLE_SHEET_ID` points to the correct spreadsheet
- "Leads" sheet must exist in the target spreadsheet
- Check server logs for OAuth errors

### PostHog events not showing
- Verify `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` is correct
- Check PostHog dashboard for the project (events may take a few seconds to appear)
- Use browser DevTools to confirm `posthog.capture()` is being called
- If `internal=1` is in the URL, events are marked as internal (hidden by default)

---

## Summary

This is a modern Next.js SaaS marketing site for a local service provider (Sunforge Digital). It combines sleek animations (Framer Motion), interactive tools (calculator, forms), voice AI integration (Vapi), and lead capture (Resend + Google Sheets). The codebase is production-ready, mobile-responsive, and designed for safe local development. Planned improvements focus on deeper interactivity and personalization.

**Next agent goal**: Build the five planned improvements without altering the existing working site. Use the current code and branding as the foundation.
