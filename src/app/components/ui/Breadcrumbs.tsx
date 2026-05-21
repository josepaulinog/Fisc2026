import { Link } from "react-router";
import { ChevronRight } from "lucide-react";

/**
 * Breadcrumbs — single-row navigation trail showing the user's path. Each
 * item with a `to` is a link; the last item (or any item without `to`) is
 * the current page (renders as text with `aria-current="page"`).
 *
 * Tone variants:
 *   - `dark` (default) — for light surfaces (white / paper sections).
 *   - `light`          — for dark surfaces (PageHero, custom dark heroes).
 *
 * @example
 *   <Breadcrumbs tone="light" items={[
 *     { label: "Agenda", to: "/agenda" },
 *     { label: "Day 1",  to: "/agenda" },
 *     { label: session.title },
 *   ]} />
 */
export type BreadcrumbItem = {
  label: string;
  /** Omit on the current page. The component will render it as text + the
   *  proper aria attributes. */
  to?: string;
};

export function Breadcrumbs({
  items,
  tone = "dark",
  className = "",
}: {
  items: BreadcrumbItem[];
  tone?: "dark" | "light";
  className?: string;
}) {
  const isLight = tone === "light";
  const muted = isLight ? "text-white/65" : "text-neutral-500";
  const mutedHover = isLight ? "hover:text-white" : "hover:text-neutral-950";
  const current = isLight ? "text-white" : "text-neutral-950";
  const chevron = isLight ? "text-white/40" : "text-neutral-300";

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="inline-flex flex-wrap items-center gap-1.5 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          const isLink = !!item.to && !isLast;
          return (
            <li key={i} className="inline-flex items-center gap-1.5 min-w-0">
              {isLink ? (
                <Link
                  to={item.to!}
                  className={`${muted} ${mutedHover} transition-fluid truncate max-w-[14rem]`}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={`${current} truncate max-w-[24rem]`}
                  aria-current={isLast ? "page" : undefined}
                  style={{ fontWeight: 500 }}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <ChevronRight
                  size={13}
                  strokeWidth={1.75}
                  className={`${chevron} shrink-0`}
                  aria-hidden="true"
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
