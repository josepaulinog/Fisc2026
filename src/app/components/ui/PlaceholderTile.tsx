import type { ReactNode } from "react";
import { BRAND, BRAND_SOFT } from "../../data";

/**
 * PlaceholderTile — used in place of real photo/video imagery when the
 * content doesn't exist yet (pre-event prototype, captures-coming-soon
 * surfaces). Avoids the anti-pattern of using random Trinidad imagery as
 * "stand-in" thumbnails, which misleads readers into thinking the
 * captured content is already available.
 *
 * Visual identity: warm cream surface, subtle brand-orange radial glow
 * at top-right, light dot-grid pattern at low opacity, a centered glyph
 * (caller-supplied — film camera, photo, etc.), and a tiny "Coming Jul 2026"
 * line. Variant prop chooses dark vs. light tone:
 *
 *   - light → cream surface, dark text. Default. For inline cards.
 *   - dark  → INK surface, light text. For the Videos feature card.
 *
 * Children render *above* the centered glyph — leave it empty for the
 * pure placeholder, or pass overlay chrome (e.g. day chip + duration)
 * that should sit on top.
 */
export function PlaceholderTile({
  variant = "light",
  glyph,
  label = "Coming Jul 2026",
  children,
  className = "",
}: {
  variant?: "light" | "dark";
  glyph?: ReactNode;
  label?: string;
  children?: ReactNode;
  className?: string;
}) {
  const isDark = variant === "dark";
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{
        backgroundColor: isDark ? "#171311" : "#efe9dd",
      }}
    >
      {/* Brand-orange ambient glow at top-right — subtle on the cream
          variant, more pronounced on the dark variant where it carries
          the visual weight of the tile. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? `radial-gradient(circle at 85% 20%, ${BRAND}2e, transparent 50%)`
            : `radial-gradient(circle at 85% 20%, ${BRAND}1c, transparent 55%)`,
        }}
      />

      {/* Dot-grid pattern at low opacity — gives the empty surface a
          tactile feel without competing for attention with the glyph
          or overlay chrome. CSS-generated, no image fetch. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)"
            : "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
          backgroundSize: "16px 16px",
          opacity: 0.7,
        }}
      />

      {/* Centered placeholder glyph. Sized at clamp() so it scales with
          the tile from compact gallery cards (24-28px) to large feature
          surfaces (40-48px). */}
      {glyph && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{
            color: isDark ? BRAND_SOFT : BRAND,
            opacity: isDark ? 0.45 : 0.32,
          }}
        >
          <div
            className="flex flex-col items-center gap-2"
            style={{ transform: "translateY(-0.5em)" }}
          >
            {glyph}
            <span
              className="uppercase"
              style={{
                fontSize: "0.625rem",
                letterSpacing: "0.22em",
                fontWeight: 500,
              }}
            >
              {label}
            </span>
          </div>
        </div>
      )}

      {/* Overlay slot — caller-controlled. Day chip, duration, title,
          etc. render here above the placeholder pattern. */}
      {children}
    </div>
  );
}
