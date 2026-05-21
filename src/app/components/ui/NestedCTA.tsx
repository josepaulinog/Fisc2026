import type { CSSProperties, MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router";
import { BRAND } from "../../data";

/**
 * NestedCTA — the "button-in-button" pattern used across hero CTAs, section
 * links, and the newsletter form. Text label on the left, a trailing icon
 * nested inside its own square well on the right (flush against the inner
 * padding).
 *
 * Hover choreography (the "pro" upgrade — replaces the previous single
 * 4-pixel-translate that read as cheap):
 *   1. Container lifts (`scale-[1.025]`) on a cubic-bezier curve and grows
 *      its drop shadow — gives the button physical weight, like it rises
 *      to meet the cursor.
 *   2. Inner well shifts contrast (variant-specific):
 *        - brand: black/15 → black/30   (icon press deeper into the orange)
 *        - ink:   white/10 → white/[0.18] (well brightens)
 *        - ghost: black/[0.04] → neutral-950 with white icon (dramatic
 *          inversion — the white "ghost" surface punches an ink hole where
 *          the action lives)
 *   3. Icon translates diagonally (1.5px up-right) AND scales up 1.08, so
 *      it visibly "leaps" rather than just shifting. The well's transform
 *      is independent so the two layers don't fight.
 *   4. Active (press) snaps back to `scale-[0.97]`, giving a tactile
 *      click — overrides the hover lift the moment the user commits.
 *
 * Everything runs on the iOS Apple cubic-bezier (`transition-fluid` from
 * theme.css) at 500ms, with `will-change-transform` so the GPU pre-allocates
 * a layer and the first frame doesn't stutter.
 *
 * One of `to` (internal Link), `href` (external anchor), or `onClick`
 * (button) is required.
 *
 * @example
 *   <NestedCTA to="/sign-in" variant="brand" icon={<BracketArrow size={13} />}>
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

type VariantSpec = {
  wrapper: string;
  /** Resting state of the inner icon well. */
  well: string;
  /** Hover state of the inner icon well — colour shift + sometimes icon colour. */
  wellHover: string;
  /** Resting drop shadow. */
  shadow: string;
  /** Hover drop shadow (lift). */
  shadowHover: string;
  style?: CSSProperties;
};

function variantStyles(v: Variant): VariantSpec {
  switch (v) {
    case "brand":
      return {
        wrapper: "text-white",
        well: "bg-black/15",
        wellHover: "group-hover:bg-black/[0.22]",
        shadow: "shadow-[0_3px_10px_-5px_rgba(253,107,24,0.35)]",
        shadowHover: "group-hover:shadow-[0_8px_18px_-8px_rgba(253,107,24,0.42)]",
        style: { backgroundColor: BRAND },
      };
    case "ink":
      return {
        wrapper: "bg-neutral-950 text-white",
        well: "bg-white/10",
        wellHover: "group-hover:bg-white/[0.14]",
        shadow: "shadow-[0_3px_10px_-5px_rgba(0,0,0,0.28)]",
        shadowHover: "group-hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.36)]",
      };
    case "ghost":
      // True ghost — no fill, just a hairline border. Background stays
      // transparent so the surface underneath (cream, white, INK) shows
      // through. Ring darkens on hover; inner well stays subtle so the
      // icon has a home, but it doesn't read as a filled button.
      return {
        wrapper: "bg-transparent text-neutral-950 ring-1 ring-black/15 group-hover:ring-black/35",
        well: "bg-black/[0.05]",
        wellHover: "group-hover:bg-black/[0.1]",
        shadow: "",
        shadowHover: "",
      };
  }
}

export function NestedCTA(props: Props) {
  const variant: Variant = props.variant ?? "brand";
  const { wrapper, well, wellHover, shadow, shadowHover, style } = variantStyles(variant);

  const sharedClasses =
    `group inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-sm transition-fluid will-change-transform ` +
    `hover:scale-[1.012] active:scale-[0.98] ` +
    `${shadow} ${shadowHover} ${wrapper} ${props.className ?? ""}`;

  const inner = (
    <>
      {props.prefixIcon && (
        <span className="opacity-70 shrink-0 transition-fluid group-hover:opacity-100" aria-hidden="true">
          {props.prefixIcon}
        </span>
      )}
      <span className="text-[17px]" style={{ fontWeight: 600, letterSpacing: "-0.005em" }}>
        {props.children}
      </span>
      <span
        className={`w-10 h-10 rounded-sm flex items-center justify-center transition-fluid ${well} ${wellHover}`}
      >
        {/* Icon: small diagonal translate only — no scale. The well's tone
            shift carries the "lit" feeling; the icon just nudges enough to
            feel responsive. */}
        <span className="inline-flex transition-fluid group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]">
          {props.icon}
        </span>
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
