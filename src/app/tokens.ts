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
  display: "clamp(2.75rem, 9vw, 8rem)",
  /** Inner-page hero (PageHero default). */
  hero: "clamp(2.5rem, 7vw, 6rem)",
  /** Section h2 — the biggest non-hero heading. */
  h1: "clamp(2.25rem, 6vw, 4.5rem)",
  /** Standard section h2. */
  h2: "clamp(2rem, 4.5vw, 3.25rem)",
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
