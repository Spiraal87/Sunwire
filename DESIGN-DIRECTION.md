# Sunforge — Stage 1 design direction

## Visual foundation for the whole site

The forge is a digital core: molten amber, machined concentric rings, and circuit traces. It is the shared visual reference for the service interfaces and their connecting lines.

- Type: retain Space Grotesk, Manrope, and IBM Plex Mono. Display headlines use tight tracking, deliberate line breaks, and warm ivory. Amber emphasizes one idea, rather than every heading. Mono is reserved for small labels.
- Color: charcoal #0c0d0f, ivory #f3f0e8, amber #eab362, and neutral gray secondary text. The core owns the strongest light source.
- Surfaces: bevels and machined metal in the hero; dark phone glass, thin edges, and one translucent notification layer in service sections. Avoid repeated glowing card grids.
- Composition: broad page margins, asymmetrical two-column desktop layouts, larger headlines, and generous vertical rhythm. Tablet and mobile stack content so text does not compete with the scene.
- Depth: actual extruded ring geometry and a procedural sphere in WebGL; CSS perspective for readable service interfaces. Content never depends on the canvas loading.
- Motion: short entrance offsets, slow opposing ring rotation, gentle desktop pointer response, and a short connection pulse. Explicit pause control, reduced-motion poster, and visibility-aware rendering.

## Coordinated continuation after approval

Stage 2: preserve receptionist, website, and HVAC hero videos inside this larger typographic composition. Use the same edge, metal, and interface treatments below each video. Receptionist uses phone + handoff, website uses browser + mobile preview, HVAC uses a service request + team notification. About and resources use a quieter editorial version with restrained photography and generous reading widths. Keep routes, content, and metadata.

Stage 3: connect the call/website journey, existing industry selection, assessment choices, and calculator defaults. The current code already includes an industry dialog, website mockup, problem selection, non-PII assessment persistence, recommendations, and calculator math. Extend these instead of replacing them. In particular, preserve custom calculator values when industry changes; existing chooseIndustry currently overwrites value and needs refinement in Stage 3. Calculator outcomes remain estimated revenue opportunities, never profit, guaranteed returns, or a sum of overlapping phone/website opportunities.

Audio: no local approved call recordings or synchronized transcript assets were found. Before building real playback, supply approved Ember recordings (MP3/WAV), permission to publish them, a verbatim transcript with cue timestamps, and the corresponding sample summary. The Stage 1 phone is explicitly illustrative text, not audio playback.

Assessment: carry selections forward, preserve validation and spam protection, retain real server integration, and do not store contact names, email addresses, or free text in browser storage. New Stage 1 copy uses “Request an assessment” and “Appointment requested”; legacy wording will be reconciled in the later approved flow work.

## Stage boundary

Only Stage 1 is implemented. Lower homepage functionality and all service pages are retained. No live leads, calls, or appointments were triggered. No production deployment was made. Stage 2 and Stage 3 await visual approval.
