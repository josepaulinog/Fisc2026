import type { CSSProperties } from "react";

/**
 * Skeletons — pure-CSS loading state library for the FISC site.
 *
 * Two principles:
 *   1. **Composed, not generic.** Rather than a single `<Skeleton w={X} h={Y} />`
 *      primitive used 50 different ways, this file ships skeletons that mirror
 *      the site's actual recurring layouts: `SkeletonPersonCard` for any
 *      avatar + name + role block (Hosts, Speakers, Attendees, Profile),
 *      `SkeletonSessionRow` for the Agenda day list, etc. Less guessing, more
 *      visual continuity with the loaded state.
 *
 *   2. **Roots / Sage / Acorn portable.** Every skeleton is built from Tailwind
 *      classes + a single CSS keyframe (`skeleton-shimmer` in theme.css). No
 *      React state, no Framer Motion, no JS animation. At WP-port time each
 *      skeleton can be reproduced 1:1 as a Blade component without any logic
 *      port — the CSS class does the work.
 *
 * --------------------------------------------------------------------------
 * Blade port template (drop into resources/views/components/skeleton.blade.php):
 * --------------------------------------------------------------------------
 *   @props([
 *     'as' => 'div',
 *     'shape' => 'rect',           // rect | circle | pill
 *     'class' => '',
 *     'dark' => false,
 *   ])
 *   @php
 *     $base = $dark ? 'skeleton-shimmer-dark' : 'skeleton-shimmer';
 *     $radius = match($shape) {
 *       'circle' => 'rounded-full',
 *       'pill'   => 'rounded-sm',
 *       default  => 'rounded-md',
 *     };
 *   @endphp
 *   <{{ $as }} class="{{ $base }} {{ $radius }} {{ $class }}" aria-hidden="true"></{{ $as }}>
 *
 * Then in Sage Blade:
 *   <x-skeleton class="h-6 w-40" />
 *   <x-skeleton shape="circle" class="w-12 h-12" />
 *   <x-skeleton class="aspect-[4/5] w-full" />
 *
 * Composed skeletons (SkeletonPersonCard etc.) become standalone Blade
 * components: resources/views/components/skeleton/person-card.blade.php
 * --------------------------------------------------------------------------
 */

// ---------------------------------------------------------------------------
// Primitives
// ---------------------------------------------------------------------------

type Tone = "light" | "dark";

function shimmerClass(tone: Tone = "light") {
  return tone === "dark" ? "skeleton-shimmer-dark" : "skeleton-shimmer";
}

/** Base skeleton — rectangular block. Pass `className` for sizing + radius. */
export function Skeleton({
  className = "",
  tone = "light",
  style,
}: {
  className?: string;
  tone?: Tone;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={`${shimmerClass(tone)} rounded-md ${className}`}
      style={style}
    />
  );
}

/** Single line of text. `w` is a width class (Tailwind), defaults to full. */
export function SkeletonText({
  w = "w-full",
  size = "md",
  tone = "light",
  className = "",
}: {
  w?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  tone?: Tone;
  className?: string;
}) {
  const heights = {
    xs: "h-3",
    sm: "h-3.5",
    md: "h-4",
    lg: "h-5",
    xl: "h-6",
  } as const;
  return <div aria-hidden="true" className={`${shimmerClass(tone)} rounded-sm ${heights[size]} ${w} ${className}`} />;
}

/** Big headline block — for h1/h2 placeholders. */
export function SkeletonHeading({
  lines = 2,
  tone = "light",
  className = "",
}: {
  lines?: 1 | 2 | 3;
  tone?: Tone;
  className?: string;
}) {
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          aria-hidden="true"
          className={`${shimmerClass(tone)} h-8 md:h-10 rounded-sm`}
          // Last line is shorter so the block reads as a wrapped paragraph
          // headline rather than a perfect rectangle.
          style={{ width: i === lines - 1 ? "65%" : "100%" }}
        />
      ))}
    </div>
  );
}

/** Circular avatar — for profile photos, attendee thumbs. */
export function SkeletonAvatar({
  size = "md",
  tone = "light",
  className = "",
}: {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  tone?: Tone;
  className?: string;
}) {
  const dims = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  } as const;
  return <div aria-hidden="true" className={`${shimmerClass(tone)} rounded-full shrink-0 ${dims[size]} ${className}`} />;
}

/** Image / photo block — defaults to landscape 16:9; pass aspect class to override. */
export function SkeletonImage({
  aspect = "aspect-[16/9]",
  tone = "light",
  className = "",
}: {
  aspect?: string;
  tone?: Tone;
  className?: string;
}) {
  return <div aria-hidden="true" className={`${shimmerClass(tone)} rounded-md w-full ${aspect} ${className}`} />;
}

/** Small pill / chip — for tags, badges, time pills. */
export function SkeletonPill({
  w = "w-20",
  tone = "light",
  className = "",
}: {
  w?: string;
  tone?: Tone;
  className?: string;
}) {
  return <div aria-hidden="true" className={`${shimmerClass(tone)} rounded-sm h-5 ${w} ${className}`} />;
}

// ---------------------------------------------------------------------------
// Composed skeletons — mirror the site's recurring layouts
// ---------------------------------------------------------------------------

/**
 * SkeletonPersonCard — avatar + name + role.
 * Mirrors the layout in Speakers MiniCard, Attendees grid card, Profile
 * header, Hosts cards. One pattern, three places.
 */
export function SkeletonPersonCard({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SkeletonAvatar size="lg" tone={tone} />
      <div className="flex-1 min-w-0 space-y-2">
        <SkeletonText w="w-32" size="md" tone={tone} />
        <SkeletonText w="w-20" size="sm" tone={tone} />
      </div>
    </div>
  );
}

/**
 * SkeletonSessionRow — time pill + tag + title + description.
 * Mirrors the Agenda day list row (collapsed state).
 */
export function SkeletonSessionRow({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div className={`flex items-start gap-4 py-5 ${className}`}>
      <div className="flex-1 min-w-0 space-y-3">
        <div className="flex items-center gap-3">
          <SkeletonPill w="w-24" tone={tone} />
          <SkeletonPill w="w-16" tone={tone} />
        </div>
        <SkeletonText w="w-3/4" size="xl" tone={tone} />
        <div className="space-y-2">
          <SkeletonText w="w-full" size="sm" tone={tone} />
          <SkeletonText w="w-2/3" size="sm" tone={tone} />
        </div>
      </div>
      <div aria-hidden="true" className={`${shimmerClass(tone)} rounded-sm w-9 h-9 shrink-0`} />
    </div>
  );
}

/**
 * SkeletonStat — small label + large number.
 * Mirrors the homepage Countdown digits cell, the marquee stats, the
 * footer event meta numbers.
 */
export function SkeletonStat({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div className={`flex flex-col items-start gap-2 ${className}`}>
      <SkeletonText w="w-12" size="md" tone={tone} className="!h-8" />
      <SkeletonText w="w-16" size="xs" tone={tone} />
    </div>
  );
}

/**
 * SkeletonHero — eyebrow + heading + subtitle + caption.
 * Mirrors any page using PageHero or the Home hero. Useful while the
 * route is hydrating (or while WP query is fetching at port time).
 */
export function SkeletonHero({
  className = "",
  tone = "dark",
}: {
  className?: string;
  tone?: Tone;
}) {
  // Dark tone default — PageHero is always on an INK background.
  return (
    <div className={`space-y-6 ${className}`}>
      <SkeletonPill w="w-32" tone={tone} />
      <SkeletonHeading lines={2} tone={tone} />
      <div className="space-y-2 max-w-2xl pt-2">
        <SkeletonText w="w-full" size="md" tone={tone} />
        <SkeletonText w="w-4/5" size="md" tone={tone} />
      </div>
    </div>
  );
}

/**
 * SkeletonGrid — generic grid of repeated card skeletons. Useful for
 * the Speakers grid, Materials grid, Gallery grid, etc.
 */
export function SkeletonGrid({
  count = 6,
  cols = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  gap = "gap-4 md:gap-5",
  render,
  className = "",
}: {
  count?: number;
  cols?: string;
  gap?: string;
  /** Skeleton component to render per cell. Defaults to SkeletonPersonCard. */
  render?: (i: number) => React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`grid ${cols} ${gap} ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="rounded-md ring-1 ring-black/[0.05] p-4 md:p-5">
          {render ? render(i) : <SkeletonPersonCard />}
        </div>
      ))}
    </div>
  );
}
