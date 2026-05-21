import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";
import { BRAND } from "../../data";

/**
 * NestedCTA — the "button-in-button" pattern used across hero CTAs, section
 * links, and the newsletter form. Text label on the left, a trailing icon
 * nested inside its own square well on the right (flush against the inner
 * padding). On hover the icon translates diagonally; on press the whole
 * button scales down 2%.
 *
 * Replaces five inline duplications: Hero "Delegate portal", The Room
 * "Sign in to see the room", Newsletter "Follow", Header "Delegate sign in",
 * and any future CTA that follows the same shape.
 *
 * One of `to` (internal Link), `href` (external anchor), or `onClick`
 * (button) is required.
 *
 * @example
 *   <NestedCTA to="/sign-in" variant="brand" icon={<ArrowRight size={15} />}>
 *     Delegate portal
 *   </NestedCTA>
 */
type Variant = "brand" | "ink" | "ghost";

type CommonProps = {
  variant?: Variant;
  /** Trailing icon — sits inside its own square well at the right edge. */
  icon: ReactNode;
  /** Optional prefix glyph (e.g. a lock for gated CTAs). */
  prefixIcon?: ReactNode;
  children: ReactNode;
  className?: string;
};

type LinkVariant = CommonProps & { to: string; href?: never; onClick?: never };
type AnchorVariant = CommonProps & { href: string; to?: never; onClick?: never };
type ButtonVariant = CommonProps & {
  onClick: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit";
  to?: never;
  href?: never;
};

type Props = LinkVariant | AnchorVariant | ButtonVariant;

function variantStyles(v: Variant): { wrapper: string; well: string; style?: CSSProperties } {
  switch (v) {
    case "brand":
      return {
        wrapper: "text-white",
        well: "bg-black/15",
        style: { backgroundColor: BRAND },
      };
    case "ink":
      return {
        wrapper: "bg-neutral-950 text-white",
        well: "bg-white/10",
      };
    case "ghost":
      return {
        wrapper: "bg-white text-neutral-950 ring-1 ring-black/10",
        well: "bg-black/[0.03]",
      };
  }
}

export function NestedCTA(props: Props) {
  const variant: Variant = props.variant ?? "brand";
  const { wrapper, well, style } = variantStyles(variant);

  const sharedClasses =
    `group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-sm transition-fluid active:scale-[0.98] ${wrapper} ${props.className ?? ""}`;

  const inner = (
    <>
      {props.prefixIcon && (
        <span className="opacity-70 shrink-0" aria-hidden="true">
          {props.prefixIcon}
        </span>
      )}
      <span className="text-[17px]" style={{ fontWeight: 600, letterSpacing: "-0.005em" }}>
        {props.children}
      </span>
      <span
        className={`w-10 h-10 rounded-sm flex items-center justify-center transition-fluid group-hover:translate-x-1 group-hover:-translate-y-[1px] ${well}`}
      >
        {props.icon}
      </span>
    </>
  );

  if ("to" in props && props.to) {
    return (
      <Link to={props.to} style={style} className={sharedClasses}>
        {inner}
      </Link>
    );
  }
  if ("href" in props && props.href) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer" style={style} className={sharedClasses}>
        {inner}
      </a>
    );
  }
  // Button
  const buttonProps = props as ButtonVariant;
  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      style={style}
      className={sharedClasses}
    >
      {inner}
    </button>
  );
}
