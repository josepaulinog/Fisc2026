import type { CSSProperties } from "react";

/**
 * PdfIcon — document silhouette with a folded corner and the letters
 * "PDF" set inside. Used on CTAs that download a PDF file (Agenda
 * "Download programme", Materials package downloads, etc.) so the file
 * type is communicated visually, not just via the link label.
 *
 * Drawn against a 14×16 viewBox so the document proportions read as
 * portrait — a square box reads as "tile" rather than "page". Letters
 * are rendered with `<text>` so they inherit `currentColor` like the
 * outline, keeping the icon monochrome and themeable.
 */
export function PdfIcon({
  size = 14,
  strokeWidth = 1.4,
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
      height={(size * 16) / 14}
      viewBox="0 0 14 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
      className={className}
      style={style}
    >
      {/* Document outline. The corner fold is a 4×4 triangle at top-right
          so the page silhouette reads as "folded sheet" instantly. */}
      <path d="M2 1 H9 L12.5 4.5 V14.5 H2 Z" />
      <path d="M9 1 V4.5 H12.5" />
      {/* "PDF" letters set inside the document. textAnchor=middle keeps
          the inscription centred regardless of font width quirks. */}
      <text
        x="7.25"
        y="11.5"
        textAnchor="middle"
        fontSize="3.6"
        fontWeight="700"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fill="currentColor"
        stroke="none"
      >
        PDF
      </text>
    </svg>
  );
}
