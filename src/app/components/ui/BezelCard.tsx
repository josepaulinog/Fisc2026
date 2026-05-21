import type { ReactNode } from "react";
import { SHADOW } from "../../tokens";

/**
 * BezelCard — the "Doppelrand" (double-bezel) nested architecture used by
 * premium hardware-feeling cards (Apple Card, Linear sidebars, Vercel
 * dashboard). An outer hairline tray sits a step bigger than an inner core,
 * creating concentric corner radii that read as a glass plate set into a
 * brushed metal frame.
 *
 * Replaces three inline duplications: action queue, host portrait wrappers,
 * Newsletter panel. Future cards that want the same premium feel should
 * compose with this rather than re-implementing the dual-div pattern.
 *
 * @example
 *   <BezelCard>
 *     <div className="p-6">...</div>
 *   </BezelCard>
 *
 *   // Dark surface (e.g. newsletter on white):
 *   <BezelCard tone="dark">
 *     <div className="p-6 text-white" style={{ backgroundColor: INK }}>...</div>
 *   </BezelCard>
 */
type Props = {
  children: ReactNode;
  /** Outer tray treatment. `light` for white-bg surfaces, `dark` for the
   *  inverted variant where the inner core is INK. Default: `light`. */
  tone?: "light" | "dark";
  /** Override the inner-core radius differential. Default keeps a 4px
   *  step between outer (rounded-md / 6px) and inner (rounded-sm / 2px). */
  innerRadius?: "sm" | "md";
  /** Extra classes applied to the outer tray wrapper. */
  className?: string;
  /** Extra classes applied to the inner core div. */
  innerClassName?: string;
};

export function BezelCard({
  children,
  tone = "light",
  innerRadius = "sm",
  className = "",
  innerClassName = "",
}: Props) {
  const trayClasses =
    tone === "light"
      ? "bg-black/[0.03] ring-1 ring-black/[0.05]"
      : "bg-white/[0.04] ring-1 ring-white/10";

  const innerBase =
    tone === "light"
      ? `bg-white border border-black/[0.03] ${SHADOW.innerHighlight}`
      : "";

  const innerRadiusClass = innerRadius === "md" ? "rounded-md" : "rounded-sm";

  return (
    <div className={`rounded-md p-1.5 ${trayClasses} ${className}`}>
      <div className={`${innerRadiusClass} overflow-hidden ${innerBase} ${innerClassName}`}>
        {children}
      </div>
    </div>
  );
}
