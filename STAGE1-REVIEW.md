# Stage 1 preview

Open http://127.0.0.1:3100 for the prototype and http://127.0.0.1:3100/review/original for the previous homepage. The persistent comparison link switches between them. A screenshot gallery is at /review.

This directory is an isolated working copy, including the user's existing uncommitted work at the start of the task. Production credentials, deployment configuration, and the separate video project were not copied. The original app files and media remain intact. The only parent configuration change excludes `stage1-preview` from the parent's TypeScript compilation so the nested copy cannot break the original build.

To restart the preview from this directory:

```powershell
node node_modules/next/dist/bin/next start -p 3100 -H 127.0.0.1
```

For development, replace `start` with `dev`. Stop the running server before `npm run build` so development and build processes do not share `.next` concurrently.

## What changed

- New homepage hero with stronger hierarchy, a separate text/scene composition, and request-oriented CTAs.
- A lazy-loaded Three.js scene with extruded segmented metal rings, fine procedural machining, a cellular molten sphere, restrained amber lighting, and circuitry. Existing Framer Motion remains in the retained sections; no React 3D wrapper or postprocessing dependency was added.
- A deliberate amber connection leads into a layered phone conversation and a team notification. The summary works with touch and keyboard and accurately says no appointment is booked.
- Scope-specific CSS refines the new homepage typography, spacing, navigation, and surfaces. Shared original heroes and media remain available.
- Fixed an existing animated statistic hydration mismatch in the preview by keeping server and first-client text identical.

## Review and limits

The build and type checks pass, including the parent project's type check after excluding the preview. The existing assessment/calculator checks pass. Browser review covers desktop and mobile screenshots, widths 320/375/390/768/1024/1440, summary controls, keyboard controls, mobile/tablet navigation, reduced motion, data saver, and missing/lost WebGL. Touch emulation confirms the mobile sample panels do not overlap. Instrumented GPU draw checks verify rendering stops on pause, offscreen, and hidden-tab events and resumes on reentry. Browser checks block external traffic and non-GET requests.

No runtime page errors remain in the reviewed flow. Development mode still reports the retained Framer Motion deprecation and a reduced-motion initial-style warning in legacy SectionDivider; the new forge does not use that component. The production review has no page errors.

The renderer caps pixel ratio at 1.5 desktop / 1 mobile and targets 30fps. These are implementation limits, not a claim of 30fps on all devices. Testing uses local Chrome, including emulated viewports; physical iOS/Android and Safari have not been measured. WebGL is optional: reduced-motion/data-saver/low-core devices use the original poster; unavailable or lost WebGL uses the original muted video, with the poster retained if playback fails. Three.js is loaded separately from readable hero content, but adds a nontrivial optional download. The original videos and large images remain unchanged and remain media payload considerations.

The dedicated frontend-design skill could not be installed through the supported installer because Python is missing. No coding was delegated to subagents.

See DESIGN-DIRECTION.md for the coordinated design plan and the precise Stage 2/3 boundary. The text phone example is illustrative. Real Ember recordings were not supplied and no voice sample was fabricated.
