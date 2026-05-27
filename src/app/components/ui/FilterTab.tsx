import type { ReactNode } from "react";

/**
 * FilterTab — single source of truth for the secondary filter "tabs" used on
 * Speakers (org), Materials (topic), Attendees (region) and Media Coverage
 * (type). One primitive so the four rows can never drift apart again.
 *
 * Two-tier tab system:
 *   - FilterTab (this)        → secondary content filters. Selected = flat gray.
 *   - Agenda day tabs         → primary temporal navigation. Selected = brand
 *                               orange. Same shape/motion grammar, higher emphasis.
 *
 * 44px min touch target, the shared `transition-fluid` (Apple cubic-bezier),
 * and an explicit focus-visible ring — identical across every row.
 */
type FilterTabProps = {
  active: boolean;
  onClick: () => void;
  /** Optional trailing count badge (omit for rows without counts, e.g. regions). */
  count?: number;
  children: ReactNode;
};

export function FilterTab({ active, onClick, count, children }: FilterTabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2.5 min-h-[44px] rounded-sm text-sm transition-fluid will-change-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 ${
        active
          ? "bg-neutral-200 text-neutral-900"
          : "bg-white text-neutral-700 hover:ring-black/[0.15] hover:bg-neutral-50"
      }`}
    >
      {children}
      {count !== undefined && (
        <span
          className={`text-xs px-1.5 py-0.5 rounded-sm tabular-nums transition-fluid ${
            active ? "bg-black/[0.06] text-neutral-600" : "bg-neutral-100 text-neutral-500"
          }`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
