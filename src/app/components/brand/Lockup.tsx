import type { CSSProperties } from "react";
import { BRAND } from "../../data";

/**
 * IconMark — the FreeBalance "F" logo, SVG-inlined. Multi-tone brand mark
 * (orange body with darker left-edge depth strips); colors are baked in.
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
      viewBox="0 0 52.19 68.78"
      xmlns="http://www.w3.org/2000/svg"
      className={`iconmark-svg ${className}`}
      style={style}
      role="img"
      aria-label={title}
    >
      {/* FreeBalance "F" mark — orange body (top + middle arms + dot) with
          darker left-edge strips for depth. Colors baked in. */}
      <path fill="#eb7233" d="M7.81,68.78c4.31,0,7.8-3.49,7.8-7.8s-3.49-7.8-7.8-7.8S.01,56.67.01,60.98s3.49,7.8,7.8,7.8" />
      <path fill="#ec7333" d="M51.87,9.86L45.07.67c-.31-.42-.8-.67-1.32-.67H7.8C3.49,0,0,3.49,0,7.8v19.85C0,23.33,3.5,21.68,7.82,21.68h35.92c.52,0,1.01-.25,1.32-.67l6.81-9.19c.43-.58.43-1.38,0-1.96" />
      <path fill="#eb7233" d="M38.43,36.09l-6.81-9.19c-.31-.42-.8-.67-1.32-.67H7.8c-4.31,0-7.8,3.49-7.8,7.8v19.89c0-4.32,3.5-6.01,7.82-6.01h22.48c.52,0,1.01-.25,1.32-.67l6.81-9.19c.43-.58.43-1.38,0-1.96" />
      <path fill="#df5b26" d="M7.43,53.2C3.3,53.4.01,56.8.01,60.98s3.29,7.58,7.42,7.78v-15.56Z" />
      <path fill="#df5b26" d="M7.51,26.26C3.34,26.41,0,29.83,0,34.04v19.85C0,49.68,3.34,48.01,7.51,47.93v-21.67Z" />
      <path fill="#df5b26" d="M7.51,0C3.34.16,0,3.58,0,7.79v19.85C0,23.43,3.34,21.76,7.51,21.68V0Z" />
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
      icon: "h-9 md:h-10",
      gap: "gap-2 md:gap-2.5",
      title: "text-xs md:text-[14px] leading-[1.1]",
      tagline: "text-[8px] md:text-[9px] tracking-[0.22em] mt-0.5",
    },
    md: {
      icon: "h-10 md:h-12",
      gap: "gap-2.5 md:gap-3",
      title: "text-[11px] md:text-xs leading-[1.15]",
      tagline: "text-[9px] md:text-[10px] tracking-[0.2em] mt-1",
    },
    lg: {
      icon: "h-13 md:h-15",
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
