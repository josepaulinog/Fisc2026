import type { CSSProperties } from "react";

/**
 * BracketArrow — diagonal up-right arrow drawn as a corner bracket (⌐) at
 * the head instead of a triangular tip. Sharper, more architectural read
 * than Lucide's `ArrowUpRight`; used as the primary CTA arrow site-wide.
 *
 * The SVG is two strokes:
 *   - `M14 0 L0.875 13.125`  → diagonal shaft, top-right corner → bottom-left
 *   - `M0 0 L14 0 L14 14`    → L-bracket forming the arrow "head" at top-right
 *
 * Inherits `currentColor` for stroke, so the icon picks up text color from
 * the surrounding context. `overflow="visible"` keeps the stroke from being
 * clipped when the SVG is scaled.
 *
 * The component accepts `className` so callers can preserve the existing
 * magnetic-translate hover animations (`group-hover:translate-x-0.5`, etc.)
 * exactly as they were when using ArrowUpRight from lucide-react.
 */
export function BracketArrow({
  size = 14,
  strokeWidth = 2,
  className,
  style,
}: {
  size?: number;
  strokeWidth?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      overflow="visible"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M14 0 L0.875 13.125 M0 0 L14 0 L14 14" />
    </svg>
  );
}
