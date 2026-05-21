import { createContext, useContext } from "react";
import { BRAND, BRAND_SOFT, countries } from "../data";
import { CountryFlag } from "./CountryFlag";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Breadcrumbs, type BreadcrumbItem } from "./ui/Breadcrumbs";

/**
 * GradientText — italic brand-orange phrase used to highlight accent word(s)
 * in headings. Has two tones tuned for two backgrounds:
 *
 *   - `dark`  (default) — saturated orange → burnt orange. Reads on white.
 *   - `light`           — peach → primary orange. Reads on the dark INK hero.
 *
 * Components that always render on a dark surface (e.g. PageHero) push the
 * tone via `GradientToneScope` so individual call-sites don't need to know.
 * Anything outside such a scope falls back to the dark tone (white-safe).
 */
type GradientTone = "light" | "dark";

const GradientToneContext = createContext<GradientTone>("dark");

const GRADIENT_BY_TONE: Record<GradientTone, string> = {
  // Dark text on light backgrounds (sections on white / off-white).
  dark: `linear-gradient(120deg, ${BRAND} 0%, #c2410c 100%)`,
  // Lighter text on dark backgrounds (hero bands, dark sections).
  light: `linear-gradient(120deg, ${BRAND_SOFT} 0%, ${BRAND} 100%)`,
};

/** Wraps children in a tone scope. Most callers won't use this directly. */
export function GradientToneScope({
  tone,
  children,
}: {
  tone: GradientTone;
  children: React.ReactNode;
}) {
  return <GradientToneContext.Provider value={tone}>{children}</GradientToneContext.Provider>;
}

export function GradientText({
  children,
  className = "",
  tone,
}: {
  children: React.ReactNode;
  className?: string;
  /** Override the tone for this single instance. */
  tone?: GradientTone;
}) {
  const ctxTone = useContext(GradientToneContext);
  const effectiveTone = tone ?? ctxTone;
  return (
    <span
      className={`font-display italic ${className}`}
      style={{
        background: GRADIENT_BY_TONE[effectiveTone],
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        // Italic glyphs (especially descenders like *p* and *j*) lean left
        // of their advance-width box. Without this padding the gradient
        // stops at the box edge and the overflowing ink renders unfilled,
        // making the letter look clipped. The negative margin counter-shifts
        // so the visible position of the word doesn't move in the line.
        paddingInline: "0.1em",
        marginInline: "-0.1em",
        // Instrument Serif's natural italic sits a touch narrower than
        // Proxima Nova upright at the same point size — pull it up half a
        // baseline so the cap-heights line up against the surrounding text.
        verticalAlign: "-0.02em",
      }}
    >
      {children}
    </span>
  );
}

export function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
      }}
    />
  );
}

/**
 * Eyebrow label — brand-orange dot + uppercase tracked text. No background,
 * no ring: previous pill treatment read as a floating button/badge on clean
 * white sections (e.g. /venue), competing with the heading for attention.
 * This is the editorial-correct form — the dot carries the identity beat,
 * the text carries the categorisation, nothing extra.
 *
 * `tone="dark"` (default) on light surfaces, `tone="light"` for dark heroes.
 */
export function SectionLabel({
  children,
  tone = "dark",
}: {
  children: React.ReactNode;
  tone?: "dark" | "light";
}) {
  const isDark = tone === "dark";
  return (
    <span
      className={`inline-flex items-center gap-2.5 mb-6 text-[10.5px] uppercase tracking-[0.22em] ${
        isDark ? "text-neutral-700" : "text-white/85"
      }`}
      style={{ fontWeight: 500 }}
    >
      <span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: BRAND }}
      />
      {children}
    </span>
  );
}

/**
 * Marquee — countries scroll horizontally on a continuous loop.
 *
 * CSS keyframes drive the animation (defined in theme.css as `marquee-scroll`)
 * because Motion's array-keyframe loops can stutter on tab-focus changes,
 * whereas a pure CSS transform stays buttery and GPU-accelerated.
 *
 * The track contains TWO copies of the countries list and animates from
 * `translateX(0)` to `translateX(-50%)`, so the moment one copy scrolls off
 * the left, its duplicate is exactly in position — no visible seam.
 *
 * Full-bleed band (top + bottom rules only) — sits as its own horizontal
 * stripe between page sections. Edge-fade gradients on left + right keep
 * items from clipping abruptly at the viewport boundary.
 */
export function Marquee() {
  return (
    <div
      className="relative border-y border-white/10 py-7 md:py-8"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      {/* The band itself is full-bleed (matches the hero width) but the
          scrolling track is contained inside max-w-7xl so items align with
          the rest of the page content. Edge fades live inside the contained
          column too, so the dissolve sits exactly at the content gutters.
          Flag + country text bumped one tier to commit to "this is meant to
          be read" — previous size sat halfway between ambient and legible. */}
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-24"
          style={{ background: "linear-gradient(to right, rgba(0,0,0,0.95), rgba(0,0,0,0))" }}
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-24"
          style={{ background: "linear-gradient(to left, rgba(0,0,0,0.95), rgba(0,0,0,0))" }}
        />

        <div className="marquee-track flex gap-14 md:gap-16 whitespace-nowrap w-max">
          {[...countries, ...countries].map((c, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-4 md:gap-5 text-white/85 tracking-[0.18em]"
              style={{ fontSize: "1.0625rem" }}
            >
              <CountryFlag
                country={c}
                className="h-4 md:h-5 w-auto rounded-[2px] shadow-sm shrink-0 ring-1 ring-white/10"
              />
              <span>{c}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PageHero({
  label,
  breadcrumbs,
  title,
  subtitle,
  image,
  imageCaption,
}: {
  label: string;
  /** Optional breadcrumb trail — when present, renders above the headline
   *  in place of the section-label eyebrow. Use for surfaces nested under
   *  a parent route (e.g. Resources → Materials, Speakers → Speaker Detail). */
  breadcrumbs?: BreadcrumbItem[];
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  imageCaption?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24" style={{ backgroundColor: "#0a0a0a" }}>
      {image && (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-45"
          />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background: image
            ? `radial-gradient(ellipse at 85% 0%, ${BRAND}55 0%, transparent 55%), linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 40%, rgba(10,10,10,0.7) 100%)`
            : `radial-gradient(ellipse at 80% 10%, ${BRAND}55 0%, transparent 50%), linear-gradient(180deg, #0a0a0a 0%, transparent 40%, #0a0a0a 100%)`,
        }}
      />
      <Grain />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6">
        {breadcrumbs && breadcrumbs.length > 0 ? (
          <Breadcrumbs tone="light" items={breadcrumbs} className="mb-6" />
        ) : (
          <SectionLabel tone="light">{label}</SectionLabel>
        )}
        <h1
          className="text-white tracking-[-0.03em]"
          // lineHeight is slightly > 1 because the italic <GradientText> spans
          // (now Instrument Serif) have ascenders/descenders that collide with
          // adjacent lines when line-height equals the font size. 1.05 gives
          // them breathing room without making the headline feel airy.
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 1.05 }}
        >
          <GradientToneScope tone="light">{title}</GradientToneScope>
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-white/80" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
            {subtitle}
          </p>
        )}
        {imageCaption && (
          <div className="mt-10 md:mt-16 inline-flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
            {imageCaption}
          </div>
        )}
      </div>
    </section>
  );
}
