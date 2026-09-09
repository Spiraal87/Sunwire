# Phase 2 handoff

Preview: http://127.0.0.1:3100

Before/after gallery: http://127.0.0.1:3100/review

The directory remains `stage1-preview` so the existing local startup command continues to work. Phase 1 was approved in the conversation. Its source snapshot is `review/phase1-approved-source.zip`; its screenshot gallery is `/review/phase1`. The parent app files remain untouched by Phase 2.

## Completed

- Receptionist, website, and HVAC pages now use the approved charcoal/amber typography, edge treatments, and larger video composition. Each keeps its original video source and file. Video playback pauses offscreen or in a hidden tab and has an explicit pause/play control. Reduced-motion and data-saving visitors see a static poster. Receptionist and website posters were captured directly from their existing video frames.
- Receptionist and HVAC get a dimensional phone conversation and team handoff. HVAC has service-specific copy. These are labeled illustrative examples and use “Appointment requested.” The existing summary interaction is reused; a richer interactive HVAC scenario is still Phase 3.
- Website has layered desktop and mobile design examples using the existing fictional Desert & Pine business and supplied HVAC artwork. The existing browsable demo remains underneath. The static showcase points visitors to that working demo.
- Supporting service sections have larger typography, quieter surfaces, more breathing room, and thin dividers replacing the repeated animated ring dividers. Existing services, FAQs, forms, calculator, and demo functionality remain.
- About has an open brand-story composition, the original core artwork, and the existing founder/location information. No invented founder photograph.
- The resources index uses numbered editorial rows. All three resource articles share an open reading layout with quick answers, summaries, a desktop contents sidebar, and a mobile contents disclosure. Article content, section IDs, metadata, and URLs remain.
- The homepage expands at wide desktop sizes, with larger display type and forge while keeping paragraph line lengths controlled. The typography/scene design at ordinary desktop and mobile sizes remains the approved Phase 1 direction.
- Fixed reduced-motion hydration errors in retained motion components by matching server and initial-client markup before applying the browser preference. No form or calculation logic changed.

## Validation

Browser review covers eight service/editorial routes at desktop and mobile sizes, plus heading/logo bounds at 320, 768, 1024, and 2541px. Checked video playback, pause/resume, offscreen pause, reduced-motion rendering, and mobile article anchor navigation. All eight original titles, descriptions, H1 content, and hero video sources match the before snapshot. External traffic and non-GET requests were blocked during interaction checks. Screenshots and JSON reports are in `review/phase2-after`.

Run `node scripts/review-phase2.cjs after` for route screenshots and core browser checks. `node scripts/check-phase2-details.cjs` checks layout bounds, video behavior, and article navigation. The latter also regenerates posters from the preserved videos. `node scripts/test-assessment.cjs` covers the existing assessment persistence and calculator logic.

Restart the production preview after a successful build:

```powershell
cd "C:\Users\Chris\OneDrive\桌面\Sunwire Digital\stage1-preview"
node node_modules/next/dist/bin/next start -p 3100 -H 127.0.0.1
```

Stop the running local server before rebuilding, since development and production use the same `.next` folder.

## Limits and next boundary

Physical mobile hardware and Safari have not been tested; browser screenshots use local Chrome. The original large video files remain unchanged. The existing live-call widget is preserved, but no real calls or submissions were made. Actual approved Ember recordings and timed transcripts remain missing and are needed for Phase 3 audio work. No deployment was performed.

Phase 3 is not implemented: expanded customer journeys, connected personalization, richer website/HVAC interactions, real audio/transcripts, and calculator/assessment refinements await the next approved phase.
