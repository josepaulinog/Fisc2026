/**
 * Design tokens — single source of truth for the typography scale, tracking
 * scale, opacity scales, shadow primitives, and motion timing used across
 * the site. Replaces ~80 instances of inline arbitrary values uncovered in
 * the design-system audit.
 *
 * Consumption pattern:
 *   - Type / tracking / shadows → spread into inline `style={{ ... }}`
 *   - Opacity / motion class names → drop into Tailwind className strings
 *   - Motion easing arrays → pass to Motion's `transition.ease`
 *
 * At WordPress port time these become SCSS variables in the Sage theme.
 */

// ─── Typography scale ────────────────────────────────────────────────────
// Fluid clamps tuned for the editorial register. Each tier is a discrete
// step — never set a font-size in inline JSX without going through one of
// these (or adding a new tier here first).

export const TYPE = {
  /** Once-per-page hero anchor. Used by Home/Hero only. */
  display: "clamp(2.8rem, 8vw, 6rem)",
  /** Inner-page hero (PageHero default). */
  hero: "clamp(2.5rem, 7vw, 6rem)",
  /** Section h2 — the biggest non-hero heading. */
  h1: "clamp(2.45rem, 6vw, 4.5rem)",
  /** Standard section h2. */
  h2: "clamp(2rem, 4vw, 3rem)",
  /** Sub-section h3 / featured card title. */
  h3: "clamp(1.5rem, 3vw, 2.25rem)",
  /** Card title — fixed (not clamped) for predictable list rhythm. */
  cardTitle: "1.5rem",
  /** Larger body / lead paragraph. */
  bodyLg: "1.125rem",
  /** Standard body. */
  body: "1rem",
  /** Body small / dense list item. */
  bodySm: "0.95rem",
  /** Meta / caption — also used for tag chips. */
  meta: "0.875rem",
  /** Micro labels / eyebrow text. */
  micro: "0.625rem",
} as const;

// ─── Letter-spacing scale ────────────────────────────────────────────────

export const TRACKING = {
  /** Massive display headlines. */
  display: "-0.04em",
  /** Hero h1. */
  tightHeading: "-0.03em",
  /** Section h2. */
  tight: "-0.025em",
  /** Light tightening for sub-headings. */
  snug: "-0.02em",
  /** Body paragraph default. */
  normal: "0",
  /** Eyebrow / micro labels — wider opening. */
  wide: "0.18em",
  /** Meta labels. */
  wider: "0.2em",
  /** Eyebrow pills (SectionLabel). */
  widestNarrow: "0.22em",
  /** Strongest separation — uppercase chip labels. */
  widest: "0.25em",
} as const;

// ─── Ring / hairline opacity scale ───────────────────────────────────────
// Ring is the preferred border replacement on light surfaces — sub-pixel
// hairlines that don't compound with hover states. Three tiers cover every
// case we have.

export const RING = {
  /** Hairline — primary card edges. */
  hair: "ring-1 ring-black/[0.05]",
  /** Subtle — slightly more visible separators. */
  thin: "ring-1 ring-black/10",
  /** Bold — emphasised boundaries (rare). */
  bold: "ring-1 ring-black/20",
} as const;

export const RING_DARK = {
  hair: "ring-1 ring-white/10",
  thin: "ring-1 ring-white/15",
  bold: "ring-1 ring-white/25",
} as const;

// ─── Black overlay scale (for tinted backgrounds) ────────────────────────
// Use whisper for double-bezel outer trays, subtle for hover surfaces,
// scrim for image overlays, heavy for modal backdrops. The set is small
// on purpose.

export const BG_OVERLAY = {
  whisper: "bg-black/[0.03]",
  subtle: "bg-black/5",
  scrim: "bg-black/30",
  heavy: "bg-black/70",
} as const;

// ─── Shadow primitives ───────────────────────────────────────────────────

export const SHADOW = {
  /** Soft ambient — floating header, lifted CTAs. */
  ambient: "shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]",
  /** Inset highlight — inner core of double-bezel cards. */
  innerHighlight: "shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]",
} as const;

// ─── Motion ──────────────────────────────────────────────────────────────
// `fluid` is the iOS standard curve (heavy entry, gentle settle). `deep`
// is for scroll-arrival entries — slower, with overshoot resistance.
// Durations in seconds for Motion's transition; CSS utilities use ms.

export const EASE = {
  fluid: [0.32, 0.72, 0, 1] as [number, number, number, number],
  deep: [0.22, 1, 0.36, 1] as [number, number, number, number],
} as const;

export const DURATION = {
  /** Hover state shift. */
  snap: 0.25,
  /** Standard UI motion (default). */
  fluid: 0.5,
  /** Scroll arrival / heavy entry. */
  deep: 0.9,
} as const;

// ─── Z-index ladder ──────────────────────────────────────────────────────
// Four explicit layers. Arbitrary z-50 / z-[60] / z-[70] / z-[100] sprinkled
// through markup was confusing and the order-by-magnitude was unprincipled.
// Now: sticky nav < modal scrim < modal panel < tour overlay.
//
// Tailwind utility form — drop into className strings:
//   <header className={Z.nav}> · <div className={Z.modalScrim}>
//
// Numeric form (for inline styles where Tailwind can't reach):
//   style={{ zIndex: Z_INDEX.modal }}

export const Z_INDEX = {
  nav: 50,
  modalScrim: 60,
  modal: 70,
  overlay: 100,
} as const;

export const Z = {
  nav: "z-[50]",
  modalScrim: "z-[60]",
  modal: "z-[70]",
  overlay: "z-[100]",
} as const;

// ─── Radius scale ────────────────────────────────────────────────────────
// Four explicit tiers. Tailwind's rounded-sm/md/lg/xl/2xl/3xl/full all
// appeared somewhere in the codebase pre-cleanup; the result was that
// "this is a card" and "this is a media tile" weren't visually
// distinguishable. Now: chips are crisp, cards are mid, media is soft,
// pills are full. Anything outside this set deserves a comment justifying it.

export const RADIUS = {
  /** Chips, tags, time pills, dense list items, inner cores of double-bezels. */
  chip: "rounded-sm",
  /** Cards, containers, content surfaces, outer trays of double-bezels. */
  card: "rounded-md",
  /** Image tiles, photo cards, video posters, hero overlays. */
  media: "rounded-2xl",
  /** Buttons, avatars, status dots, anything circular. */
  pill: "rounded-full",
} as const;

// ─── Surface colors ──────────────────────────────────────────────────────
// Three named neutrals — one ink, two off-whites. The off-whites were being
// reinvented as raw hex (#ededed, #e7e9ec, #f6f4ef) across nine files;
// consolidating to two named tiers keeps section transitions intentional.

export const SURFACE = {
  /** Editorial deep — page footer, sign-in panel, dark sections. */
  ink: "#0a0a0a",
  /** Primary off-white — alternate section background between white pages. */
  paper: "#ededed",
  /** Cooler off-white — used sparingly for tech / product surfaces. */
  fog: "#e7e9ec",
} as const;

// ─── Section padding rhythm ──────────────────────────────────────────────
// Three discrete beats. Adopt one per section; never mix arbitrary values.

export const SECTION_PAD = {
  /** Tight — utility strips, compact lists. */
  sm: "py-12 md:py-16",
  /** Standard — most content sections. */
  md: "py-16 md:py-24",
  /** Generous — anchor / feature sections. */
  lg: "py-20 md:py-32",
} as const;

// ─── Chip color tones (OKLCH) ────────────────────────────────────────────
// Single source of truth for tinted category chips. The old approach
// (`bg: #hex+alpha15, fg: #hex`) gave wildly different perceptual lightness
// across hues — a 15%-alpha orange and a 15%-alpha blue read as completely
// different darknesses even though they're "the same colour at the same
// opacity". OKLCH locks lightness and chroma; only the hue varies, so a
// row of mixed-hue chips reads as a coordinated family.
//
// Hue reference:
//   30   orange (Programme · PFM · Brand)
//   60   yellow-ochre (rarely used)
//   145  green (Host country · Workshop · Performance)
//   215  electric blue (Logistics · AI)
//   285  purple (Assessments · Reform)
//   25   warm orange-red (Recap · Burnt)
//
// (Gray neutral: use { bg: "oklch(95% 0 0)", fg: "oklch(40% 0 0)" } directly
// since chroma 0 ignores the hue entirely.)

export function chipTone(hue: number) {
  return {
    bg: `oklch(95% 0.05 ${hue})`,
    fg: `oklch(40% 0.13 ${hue})`,
  } as const;
}

// chipAccent — brighter, more saturated companion to chipTone, intended
// for left-border slabs, dividers, and other graphic accents where the
// chip's foreground (40% lightness) would read as muddy. Mid-bright
// (60% lightness) with higher chroma (0.2) gives the colour real
// presence against white while staying within the brand's coordinated
// hue family.
export function chipAccent(hue: number) {
  return `oklch(62% 0.2 ${hue})`;
}

export const CHIP_HUE = {
  brand: 30,
  programme: 30,
  pfm: 30,
  workshop: 145,
  performance: 145,
  hostCountry: 145,
  logistics: 215,
  ai: 215,
  assessments: 285,
  reform: 25,
  recap: 25,
  product: 0, // gray neutral — chroma override at the call-site
} as const;
