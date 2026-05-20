import type { CSSProperties } from "react";
import { BRAND } from "../../data";

/**
 * IconMark — the abstract FreeBalance "F" logo, SVG-inlined.
 * Uses `fill="currentColor"` so the parent can recolor it via CSS `color`.
 * Defaults to brand orange.
 */
export function IconMark({
  className = "",
  style,
  title = "FreeBalance",
}: {
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 51.95 61.72"
      xmlns="http://www.w3.org/2000/svg"
      className={`iconmark-svg ${className}`}
      style={{ color: BRAND, ...style }}
      role="img"
      aria-label={title}
    >
      {/* Three shapes assembled top-to-bottom: top bar, middle bar, dot.
          Per-shape classes are used by theme.css to (a) stagger a build-in
          on mount and (b) hop the dot on hover. */}
      <g fill="currentColor">
        <path className="iconmark-piece iconmark-piece-1" d="M0,25.34v-11.26C0,6.08,6.42,0,14.42,0h29.62c.79,0,1.46.34,2.03,1.01l5.29,6.42c.79.9.79,2.14,0,3.04l-5.29,6.42c-.56.9-1.35,1.46-2.48,1.46H12.84c-5.97,0-10.14,3.04-12.84,6.98Z" />
        <path className="iconmark-piece iconmark-piece-2" d="M0,46.85v-13.51c0-6.53,5.63-11.49,12.84-11.49h21.06c1.01,0,1.91.45,2.59,1.24l5.18,6.19c.9,1.01.9,2.25,0,3.27l-5.18,6.19c-.68.79-1.58,1.24-2.59,1.24H12.84c-5.97,0-10.14,2.93-12.84,6.87Z" />
        <circle className="iconmark-piece iconmark-piece-3 iconmark-dot" cx="9.46" cy="53.05" r="8.67" />
      </g>
    </svg>
  );
}

/**
 * Lockup — IconMark + the FreeBalance International Steering Committee
 * wordmark (rendered as HTML text, not SVG) + the "2026 Trinidad and Tobago"
 * tagline. Two variants:
 *   - variant="dark"  → for light backgrounds (default). Text is near-black.
 *   - variant="light" → for dark backgrounds. Text is white.
 *
 * The icon mark itself stays brand orange in both variants.
 */
type LockupProps = {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  className?: string;
  /** Hide the "2026 · Trinidad and Tobago" tagline. */
  hideTagline?: boolean;
};

export function Lockup({
  variant = "dark",
  size = "md",
  className = "",
  hideTagline = false,
}: LockupProps) {
  const sizes = {
    sm: {
      icon: "h-8 md:h-9",
      gap: "gap-2 md:gap-2.5",
      title: "text-xs md:text-[13px] leading-[1.1]",
      tagline: "text-[8px] md:text-[9px] tracking-[0.22em] mt-0.5",
    },
    md: {
      icon: "h-9 md:h-11",
      gap: "gap-2.5 md:gap-3",
      title: "text-[11px] md:text-xs leading-[1.15]",
      tagline: "text-[9px] md:text-[10px] tracking-[0.2em] mt-1",
    },
    lg: {
      icon: "h-12 md:h-14",
      gap: "gap-3 md:gap-4",
      title: "text-sm md:text-base leading-[1.15]",
      tagline: "text-xs md:text-sm tracking-[0.22em] mt-1.5",
    },
  } as const;

  const s = sizes[size];
  const isLight = variant === "light";
  const titleClass = isLight ? "text-white" : "text-neutral-900";
  const taglineMutedClass = isLight ? "text-white/65" : "text-neutral-500";

  return (
    <span className={`inline-flex items-center ${s.gap} ${className}`}>
      <IconMark className={`${s.icon} w-auto shrink-0`} />
      <span className="flex flex-col">
        <span className={`${s.title} ${titleClass} tracking-tight`} style={{ fontWeight: 600 }}>
          FreeBalance International
          <br />
          Steering Committee
        </span>
        {!hideTagline && (
          <span className={`${s.tagline} uppercase`}>
            <span style={{ color: BRAND, fontWeight: 600 }}>2026</span>{" "}
            <span className={taglineMutedClass}>Trinidad and Tobago</span>
          </span>
        )}
      </span>
    </span>
  );
}
