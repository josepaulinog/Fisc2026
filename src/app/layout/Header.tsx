import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, ChevronDown, LogOut, Lock, Menu, X } from "lucide-react";
import { Lockup } from "../components/brand/Lockup";
import { useAuth } from "../auth";
import { firstNameOf, initialsOf, useProfile } from "../profile";
import { BRAND, INK, navItems } from "../data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const location = useLocation();
  const { user, isAuthed, signOut } = useAuth();
  const [profile] = useProfile(user);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          object rather than a stretched bar. */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-fluid ${scrolled ? "pt-2 md:pt-3" : "pt-4 md:pt-6"}`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-6 transition-fluid">
          <div
            className={`flex items-center justify-between rounded-sm ring-1 ring-black/[0.05] bg-white/75 backdrop-blur-2xl transition-fluid px-3 md:px-4 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)] ${
              scrolled ? "h-14 md:h-16" : "h-16 md:h-[68px]"
            }`}
          >
            <Link to="/" className="flex items-center shrink-0" aria-label="FISC 2026 home">
              <Lockup variant="dark" size="sm" />
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((n) =>
                n.children && n.children.length > 0 ? (
                  <div key={n.label} className="relative group">
                    <NavLink
                      to={n.to ?? n.children[0].to}
                      className={({ isActive }) =>
                        `inline-flex items-center gap-1.5 px-4 py-2 rounded-sm transition-colors ${
                          isActive
                            ? "bg-neutral-950 text-white"
                            : "text-neutral-700 group-hover:bg-neutral-950 group-hover:text-white"
                        }`
                      }
                    >
                      {n.label}
                      <ChevronDown size={14} className="opacity-70 group-hover:rotate-180 transition-transform" />
                    </NavLink>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      <div className="bg-white border border-neutral-200 rounded-lg shadow-xl overflow-hidden min-w-[16rem]">
                        {n.to && (
                          <NavLink
                            to={n.to}
                            end
                            className={({ isActive }) =>
                              `block px-4 py-3 border-b border-neutral-100 ${
                                isActive
                                  ? "bg-neutral-50 text-neutral-950"
                                  : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                              }`
                            }
                          >
                            <div className="flex items-center justify-between">
                              <span className="tracking-tight" style={{ fontSize: "0.95rem" }}>
                                {n.label} hub
                              </span>
                              <span className="text-xs text-neutral-400">Overview</span>
                            </div>
                          </NavLink>
                        )}
                        <div className="py-1.5">
                          {n.children.map((c) => (
                            <NavLink
                              key={c.label}
                              to={c.to}
                              className={({ isActive }) =>
                                `flex items-center justify-between gap-3 px-4 py-2.5 transition ${
                                  isActive
                                    ? "bg-neutral-950 text-white"
                                    : "text-neutral-700 hover:bg-neutral-50 hover:text-neutral-950"
                                }`
                              }
                            >
                              <span>{c.label}</span>
                              {c.gated && (
                                <span className="inline-flex items-center gap-1 text-[10px] tracking-[0.15em] uppercase text-neutral-400">
                                  <Lock size={10} />
                                  Gated
                                </span>
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
                      `px-4 py-2 rounded-sm transition-colors ${
                        isActive
                          ? "bg-neutral-950 text-white"
                          : "text-neutral-700 hover:bg-neutral-950 hover:text-white"
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
                  <Link
                    to="/profile"
                    aria-label="Your profile"
                    className="group inline-flex items-center gap-2 pl-1 pr-3 py-1 rounded-full bg-neutral-100 hover:bg-neutral-200 transition"
                  >
                    <span
                      className="w-7 h-7 rounded-full overflow-hidden flex items-center justify-center text-white text-xs ring-2 ring-white"
                      style={{ backgroundColor: BRAND, fontWeight: 600 }}
                    >
                      {profile?.photoUrl ? (
                        <img src={profile.photoUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        initialsOf(user.name)
                      )}
                    </span>
                    <span className="hidden md:inline text-sm text-neutral-800 truncate max-w-[120px]">
                      {firstNameOf(user.name)}
                    </span>
                  </Link>
                  <button
                    onClick={signOut}
                    aria-label="Sign out"
                    className="group hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-950 hover:text-white text-neutral-700 transition"
                  >
                    <LogOut size={14} />
                  </button>
                </>
              ) : (
                <>
                  <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-100 text-neutral-600 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    Invitation only
                  </span>
                  <Link
                    to="/sign-in"
                    style={{ backgroundColor: INK }}
                    className="group hidden sm:inline-flex items-center gap-2.5 text-white pl-5 pr-1.5 py-1.5 rounded-sm transition-fluid active:scale-[0.98]"
                  >
                    <span className="text-sm" style={{ fontWeight: 500 }}>Delegate sign in</span>
                    <span
                      className="w-8 h-8 rounded-sm flex items-center justify-center transition-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]"
                      style={{ backgroundColor: BRAND }}
                    >
                      <ArrowUpRight size={13} strokeWidth={1.75} />
                    </span>
                  </Link>
                </>
              )}
              <button
                className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-neutral-800 rounded-sm hover:bg-black/5 transition-fluid"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={20} strokeWidth={1.75} />
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
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[88%] max-w-sm bg-white shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between p-5 border-b border-neutral-100">
                <Lockup variant="dark" size="sm" />
                <button
                  className="p-2 rounded-sm hover:bg-neutral-100 text-neutral-700"
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
                      isActive ? "bg-neutral-950 text-white" : "text-neutral-800 hover:bg-neutral-100"
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
                              isActive ? "bg-neutral-950 text-white" : "text-neutral-800 hover:bg-neutral-100"
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
                            className="px-3 rounded-md text-neutral-500 hover:bg-neutral-100"
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform ${expanded ? "rotate-180" : ""}`}
                            />
                          </button>
                        )}
                      </div>
                      {hasChildren && expanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-1 ml-3 border-l border-neutral-200 pl-3 space-y-0.5 overflow-hidden"
                        >
                          {n.children!.map((c) => (
                            <NavLink
                              key={c.label}
                              to={c.to}
                              className={({ isActive }) =>
                                `flex items-center justify-between px-3 py-2.5 rounded-sm transition ${
                                  isActive
                                    ? "bg-neutral-950 text-white"
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
                        className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center text-white text-sm ring-2 ring-white"
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
                      style={{ backgroundColor: INK }}
                      className="group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-sm hover:opacity-90 transition"
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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded bg-neutral-100 text-neutral-600 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                      Invitation only
                    </div>
                    <Link
                      to="/sign-in"
                      style={{ backgroundColor: INK }}
                      className="group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-sm hover:opacity-90 transition"
                    >
                      Delegate sign in
                      <span
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: BRAND }}
                      >
                        <ArrowUpRight size={14} />
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
