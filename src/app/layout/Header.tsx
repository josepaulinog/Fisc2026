import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { LogOut, Lock, X } from "lucide-react";
import { Lockup } from "../components/brand/Lockup";
import { BracketArrow } from "../components/ui/BracketArrow";
import { Chevron } from "../components/ui/Chevron";
import { useAuth } from "../auth";
import { firstNameOf, initialsOf, useProfile } from "../profile";
import { BRAND, navItems } from "../data";
import { Z } from "../tokens";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { user, isAuthed, signOut } = useAuth();
  const [profile] = useProfile(user);

  // Scroll-state via Motion's useScroll instead of a raw scroll listener.
  // Motion shares one rAF-batched listener across every useScroll hook on
  // the page, so we don't pay the per-event reflow cost of
  // window.addEventListener('scroll'). The threshold check still flips
  // React state because the header's pill shrink is a layout change
  // (padding-top, glass opacity) — not a transform — so it has to round-trip
  // through render. The win here is the shared, batched, rAF-driven scroll
  // source, not a state-free animation.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 20;
    if (next !== scrolled) setScrolled(next);
  });

  useEffect(() => {
    setOpen(false);
    setMobileExpanded(null);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Fluid Island floating nav — detached from the viewport edges, glass
          surface, hairline ring instead of a solid border, ambient shadow
          replacing the SaaS-template shadow-sm. The pill rounds the corners
          to maximum (rounded-full) so the whole header reads as one floating
          object rather than a stretched bar.

          Scroll-state choreography: pill shrinks (height + top padding) AND
          the glass becomes more opaque (75 → 92) for stronger contrast over
          arbitrary content backgrounds the user has scrolled into. Ambient
          shadow deepens slightly. Ring strengthens. The pill transitions
          from "ethereal floating glass" (top of page) to "definitive command
          surface" (deep scroll) — same object, two states. */}
      <header
        className={`fixed top-0 inset-x-0 ${Z.nav} transition-fluid ${scrolled ? "pt-2 md:pt-3" : "pt-4 md:pt-6"}`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-6 transition-fluid">
          <div
            className={`flex items-center justify-between rounded-md ring-1 transition-fluid px-3 md:px-5 ${
              scrolled
                ? "ring-black/[0.08] bg-white backdrop-blur-2xl h-14 md:h-16"
                : "ring-black/[0.05] bg-white backdrop-blur-2xl h-16 md:h-[68px]"
            }`}
            style={{
              boxShadow: scrolled
                ? "inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 12px 36px -14px rgba(0, 0, 0, 0.16)"
                : "inset 0 1px 0 rgba(255, 255, 255, 0.75), 0 8px 30px -12px rgba(0, 0, 0, 0.1)"
            }}
          >
            <Link to="/" className="flex items-center shrink-0" aria-label="FISC 2026 home">
              <Lockup variant="dark" size="sm" />
            </Link>
            <nav className="hidden lg:flex items-center gap-0.5">
              {navItems.map((n) =>
                n.children && n.children.length > 0 ? (
                  <div key={n.label} className="relative group">
                    {/* Resources-style item with dropdown. Active state keeps
                        the inverted ink pill (clear hierarchy beat) plus an
                        inset highlight + brand-orange leading dot — the dot
                        is the signature accent that ties the active nav item
                        to the rest of the brand system (SectionLabel dot,
                        GradientText, brand glyph in CTAs). Inactive hover
                        replaces aggressive full-invert with a subtle glass
                        darken so non-current items don't impersonate the
                        active treatment. */}
                    <NavLink
                      to={n.to ?? n.children[0].to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1.5 pl-3 pr-3 py-2 rounded-sm transition-fluid font-medium active:scale-[0.98] ${
                          isActive
                            ? "bg-neutral-300 text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                            : "text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.04]"
                        }`
                      }
                    >
                      {() => (
                        <>
                          <span>{n.label}</span>
                          <Chevron
                            size={11}
                            strokeWidth={1.5}
                            className={`opacity-70 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:rotate-180`}
                          />
                        </>
                      )}
                    </NavLink>
                    {/* Premium dropdown panel — replaces the SaaS-template
                        bordered card. Hairline ring + ambient shadow + glass
                        (95% opacity + backdrop-blur) matches the nav pill's
                        visual language. Translates up subtly on enter so the
                        panel "lifts into place" rather than popping. */}
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-1 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-fluid">
                      <div
                        className="bg-white ring-1 ring-black/[0.08] rounded-md overflow-hidden min-w-[19rem]"
                        style={{ boxShadow: "0 30px 70px -18px rgba(0,0,0,0.32), 0 10px 24px -8px rgba(0,0,0,0.16), 0 2px 6px -2px rgba(0,0,0,0.1)" }}
                      >
                        <div className="py-1.5">
                          {n.children.map((c) => (
                            <NavLink
                              key={c.label}
                              to={c.to}
                              className={({ isActive }) =>
                                `group/item flex items-center justify-between gap-3 px-4 py-2.5 transition-fluid ${
                                  isActive
                                    ? "bg-neutral-300 text-neutral-900"
                                    : "text-neutral-700 hover:bg-black/[0.03] hover:text-neutral-950"
                                }`
                              }
                            >
                              {({ isActive }) => (
                                <>
                                  <span className="transition-fluid group-hover/item:translate-x-0.5">
                                    {c.label}
                                  </span>
                                  {c.gated && (
                                    <span className={`inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase transition-fluid ${
                                      isActive ? "text-neutral-500" : "text-neutral-400 group-hover/item:text-neutral-500"
                                    }`}>
                                      <Lock size={10} strokeWidth={1.5} />
                                      Gated
                                    </span>
                                  )}
                                </>
                              )}
                            </NavLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <NavLink
                    key={n.label}
                    to={n.to ?? "#"}
                    className={({ isActive }) =>
                      `inline-flex items-center gap-1.5 pl-3 pr-3 py-2 rounded-sm transition-fluid font-medium active:scale-[0.98] ${
                        isActive
                          ? "bg-neutral-300 text-neutral-900 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                          : "text-neutral-700 hover:text-neutral-950 hover:bg-black/[0.04]"
                      }`
                    }
                  >
                    {n.label}
                  </NavLink>
                )
              )}
            </nav>
            <div className="flex items-center gap-2">
              {isAuthed && user ? (
                <>
                  {/* Mobile (text hidden): symmetric padding (p-1) so the
                      avatar sits centered in the pill. Desktop (text shown):
                      asymmetric padding (pl-1 pr-3) leaves room for the
                      first-name string after the avatar. */}
                  <Link
                    to="/profile"
                    aria-label="Your profile"
                    className="group inline-flex items-center gap-2 p-1 md:pl-1 md:pr-3 md:py-1 rounded-full bg-black/[0.04] ring-1 ring-black/[0.04] hover:bg-black/[0.07] hover:ring-black/[0.08] transition-fluid"
                  >
                    <span
                      className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-xs ring-2 ring-white shadow-[0_2px_6px_-2px_rgba(0,0,0,0.2)]"
                      style={{ backgroundColor: BRAND, fontWeight: 600 }}
                    >
                      {profile?.photoUrl ? (
                        <img src={profile.photoUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        initialsOf(user.name)
                      )}
                    </span>
                    <span className="hidden md:inline text-neutral-800 truncate max-w-[120px]">
                      {firstNameOf(user.name)}
                    </span>
                  </Link>
                  <button
                    onClick={signOut}
                    aria-label="Sign out"
                    className="group hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-black/[0.04] ring-1 ring-black/[0.04] hover:bg-neutral-300 hover:ring-neutral-400 hover:text-neutral-900 text-neutral-700 transition-fluid"
                  >
                    <LogOut size={14} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-black/[0.04] ring-1 ring-black/[0.04] text-neutral-700 text-[0.8125rem]">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    Invitation only
                  </span>
                  <Link
                    to="/sign-in"
                    className="cta-fill group hidden sm:inline-flex items-center gap-0 text-white pl-5 pr-1.5 py-1.5 rounded-sm transition-fluid will-change-transform hover:scale-[1.015] active:scale-[0.98] shadow-[0_3px_10px_-5px_rgba(0,0,0,0.28)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.36)]"
                  >
                    <span className="text-[17px]" style={{ fontWeight: 600 }}>Delegate sign in</span>
                    <span
                      className="w-8 h-8 rounded-sm flex items-center justify-center transition-fluid group-hover:brightness-105"
                    >
                      <span className="inline-flex transition-fluid group-hover:rotate-45">
                        <BracketArrow size={11} strokeWidth={1.75} />
                      </span>
                    </span>
                  </Link>
                </>
              )}
              {/* Hamburger morph — three custom hairlines (h-0.5 = 2px) with
                  perfectly even 5px gaps. Container is 20×16; lines sit at
                  top-0, top-1/2 (centered), bottom-0 in the closed state.
                  When open, the outer lines translate to center and rotate
                  ±45° to form an X; the middle line fades out. Rounded line
                  caps for refined edges. */}
              <button
                className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-neutral-800 rounded-sm hover:bg-black/[0.05] transition-fluid focus-ring"
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
              >
                <span className="relative inline-block w-5 h-4">
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 h-0.5 bg-current rounded-full origin-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-current rounded-full transition-opacity duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    aria-hidden
                    className={`absolute left-0 right-0 h-0.5 bg-current rounded-full origin-center transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                      open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                    }`}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className={`fixed inset-0 ${Z.modalScrim} bg-black/50 backdrop-blur-sm lg:hidden`}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className={`fixed top-0 right-0 bottom-0 ${Z.modal} w-[88%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col`}
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <Lockup variant="dark" size="sm" />
                <button
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-sm hover:bg-neutral-100 text-neutral-700 focus-ring"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-5">
                <NavLink
                  to="/"
                  end
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-sm mb-1 transition ${
                      isActive ? "bg-neutral-300 text-neutral-900" : "text-neutral-800 hover:bg-neutral-100"
                    }`
                  }
                  style={{ fontSize: "1.125rem" }}
                >
                  Home
                </NavLink>
                {navItems.map((n) => {
                  const hasChildren = n.children && n.children.length > 0;
                  const expanded = mobileExpanded === n.label;
                  return (
                    <div key={n.label} className="mb-1">
                      <div className="flex items-stretch gap-1">
                        <NavLink
                          to={n.to ?? n.children?.[0]?.to ?? "#"}
                          className={({ isActive }) =>
                            `flex-1 block px-4 py-3 rounded-sm transition ${
                              isActive ? "bg-neutral-300 text-neutral-900" : "text-neutral-800 hover:bg-neutral-100"
                            }`
                          }
                          style={{ fontSize: "1.125rem" }}
                        >
                          {n.label}
                        </NavLink>
                        {hasChildren && (
                          <button
                            onClick={() => setMobileExpanded(expanded ? null : n.label)}
                            aria-label={expanded ? `Collapse ${n.label}` : `Expand ${n.label}`}
                            className="px-3 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md text-neutral-500 hover:bg-neutral-100 focus-ring"
                          >
                            <Chevron
                              size={16}
                              strokeWidth={1.5}
                              className={`transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      {hasChildren && expanded && (
                        <motion.div
                          initial={{ opacity: 0, gridTemplateRows: "0fr" }}
                          animate={{ opacity: 1, gridTemplateRows: "1fr" }}
                          className="grid mt-1 ml-3 border-l border-neutral-200 pl-3"
                        >
                          <div className="overflow-hidden space-y-0.5">
                          {n.children!.map((c) => (
                            <NavLink
                              key={c.label}
                              to={c.to}
                              className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-2.5 rounded-sm transition ${
                                  isActive
                                    ? "bg-neutral-300 text-neutral-900"
                                    : "text-neutral-700 hover:bg-neutral-100"
                                }`
                              }
                            >
                              <span>{c.label}</span>
                              {c.gated && (
                                <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                                  <Lock size={10} />
                                </span>
                              )}
                            </NavLink>
                          ))}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  );
                })}
              </nav>
              <div className="p-5 border-t border-neutral-100 space-y-3">
                {isAuthed && user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2.5 rounded-sm bg-neutral-100 hover:bg-neutral-200 transition"
                    >
                      <span
                        className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-white ring-2 ring-white"
                        style={{ backgroundColor: BRAND, fontWeight: 600 }}
                      >
                        {profile?.photoUrl ? (
                          <img src={profile.photoUrl} alt="" className="w-full h-full object-cover" />
                        ) : (
                          initialsOf(user.name)
                        )}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className="block tracking-tight text-neutral-950 truncate" style={{ fontSize: "0.95rem" }}>
                          {user.name}
                        </span>
                        <span className="block text-xs text-neutral-500 truncate">View profile</span>
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="cta-fill group w-full min-h-[44px] inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-sm transition focus-ring"
                    >
                      Sign out
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: BRAND }}
                      >
                        <LogOut size={14} />
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-100 text-neutral-700 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      Invitation only
                    </div>
                    <Link
                      to="/sign-in"
                      className="cta-fill group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-sm transition"
                    >
                      Delegate sign in
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: BRAND }}
                      >
                        <BracketArrow size={12} strokeWidth={1.75} />
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
