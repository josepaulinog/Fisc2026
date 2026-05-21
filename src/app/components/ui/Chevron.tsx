import type { CSSProperties } from "react";

/**
 * Chevron — flat 2:1 "V" stroke (wider than tall), drawn as a single
 * polyline from top-left → bottom-center → top-right. Replaces Lucide's
 * `ChevronDown` site-wide so the chevron reads as a precise editorial
 * accent rather than the slightly heavier Lucide geometry.
 *
 * `size` controls the SVG width; height is half (preserves the 12×6
 * source ratio). Stroke inherits `currentColor`. `overflow="visible"`
 * prevents stroke clipping at larger scales.
 */
export function Chevron({
  size = 12,
  strokeWidth = 1.25,
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
      height={size / 2}
      viewBox="0 0 12 6"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      overflow="visible"
      aria-hidden="true"
      className={className}
      style={style}
    >
      <path d="M 0 0 L 6 6 L 12 0" />
    </svg>
  );
}
