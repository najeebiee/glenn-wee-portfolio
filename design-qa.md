# Theme Selector Design QA

- Source visual truth: `C:\Users\najx\AppData\Local\Temp\codex-clipboard-8ae830c0-48ff-4b2a-a189-acb33b3404ec.png`
- Desktop selector: `C:\Users\najx\AppData\Local\Temp\glenn-theme-selector-wee.png`
- Corrected Cobalt: `C:\Users\najx\AppData\Local\Temp\glenn-theme-cobalt-corrected.png`
- Corrected Full Dark: `C:\Users\najx\AppData\Local\Temp\glenn-theme-full-dark-corrected.png`
- Mobile selector: `C:\Users\najx\AppData\Local\Temp\glenn-theme-mobile-wee.png`
- Viewports: 1280 x 720 desktop and 390 x 844 mobile

## Comparison evidence

The selector now follows the reference’s W–E–E presentation without visible theme names. Accessible radio names remain Paper, Cobalt, and Full Dark. Desktop uses the compact popover beside the separate wordmark chevron; mobile places the same three controls below the consultation CTA.

## Theme findings

- Paper preserves the original white surfaces, black structural panels, and editorial contrast.
- Cobalt matches the supplied blue-fill reference with white surfaces, cobalt text and borders, solid cobalt featured panels, and white panel text.
- Full Dark uses near-black page and surface layers with charcoal featured panels. Existing dark panels remain dark instead of becoming cream.
- Full Dark uses warm-white interaction states throughout; nav, logo, active links, borders, and button hovers do not introduce blue.
- Photography, typography, section geometry, and animations remain unchanged.
- No actionable P0, P1, or P2 visual findings remain.

## Interaction and accessibility

- Selected options have a visible accent border and expose checked state through the radio semantics.
- Desktop supports Escape and outside-click dismissal.
- Theme preference persists across reloads and is applied before first paint.
- Supported browsers use a 1250ms radial reveal from the selected control.
- Unsupported browsers use an 800ms crossfade.
- Reduced-motion users receive an immediate theme switch without decorative motion.
- Tablet and mobile menus remain scrollable with the selector reachable below the WhatsApp CTA.

## Verification

- TypeScript, ESLint, Tailwind token generation, production build, desktop browser checks, and mobile browser checks passed.
- The existing raw navbar `<img>` warning remains unrelated to the theme work.

final result: passed
