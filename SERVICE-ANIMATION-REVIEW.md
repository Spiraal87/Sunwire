# Service animation polish

Local preview: http://localhost:3100

Added selectable, four-step animated demonstrations to the service sections on `/`, `/receptionist`, and `/website`. The homepage switches between phone and website scenarios. Phone visuals include a ring pulse, voice bars, and an example handoff. Website visuals transition between browser and mobile layouts and show an example inquiry. All examples are labeled illustrative and send no requests.

Playback advances every 3.8 seconds while the section is visible. Pause/play controls are available; selecting a step pauses playback for reading. Hidden tabs do not advance. Reduced-motion visitors get manual steps without animation or autoplay. Existing service details and destination links remain, with open layouts replacing the heavy service card containers. Large homepage statistics were removed from these cards so the service demonstration leads.

Implementation: `components/ServiceStory.tsx`, `app/service-story.css`, and the optional `story` prop in `components/Services.tsx`. Only the three approved pages enable it. No dependencies added. Existing assessment, comparison table, live-call demo, calculator, and backend behavior are unchanged. This is a focused visual pass, not completion of all Phase 3 work.

Validation: production build and TypeScript checks passed. `node scripts/check-service-story.cjs` checks switching, timed progression, pause, manual selection, reduced motion, browser errors, and horizontal bounds at 1440, 390, and 320px. Captures and results are saved in `review/service-story`. Chrome emulation is used; physical devices and Safari remain untested. The existing `/review` gallery documents Phase 2; view these new animations directly on the live pages.

The production preview is served from `stage1-preview` on port 3100. Stop the server before rebuilding. The original parent project has not been edited by this pass.

Follow-up: Receptionist and website service details now share four compact native disclosures with short summaries. Full feature lists expand on demand using mouse, touch, or keyboard; all existing card IDs remain.

Homepage follow-up: StartingPoints.tsx replaces the old comparison table and boxed operations photo only on the active homepage. Three service links lead to receptionist, website, and the existing contact section. The wider photo layout uses the original image. Historical components remain available to the original review page. Responsive styles are in service-story.css.

Industry walkthrough pass: BusinessCategories now uses IndustryWalkthrough.tsx for cumulative customer/Ember conversations and structured example requests for all six industries. Manual steps and replay support reduced motion without autoplay. Existing chooseIndustry persistence carries the selection into AssessmentFlow. Cards are wider and lighter; the live demo link now consistently points to /receptionist#demo. No audio, live calls, appointments, or submissions are generated.
