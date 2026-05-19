import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { BRAND, FB_LOGO, INK, navItems } from "../data";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}
      >
        <div className={`mx-auto max-w-7xl px-4 transition-all duration-500 ${scrolled ? "max-w-6xl" : ""}`}>
          <div
            className={`flex items-center justify-between rounded-2xl border transition-all duration-500 px-3 md:px-4 ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl border-neutral-200 shadow-sm h-14 md:h-16"
                : "bg-white backdrop-blur-xl border-neutral-200 shadow-sm h-16 md:h-18 py-2"
            }`}
          >
            <Link to="/" className="flex items-center shrink-0">
              <ImageWithFallback src={FB_LOGO} alt="FISC 2026" className="h-9 md:h-11 w-auto" />
            </Link>
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((n) => (
                <NavLink
                  key={n.label}
                  to={n.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? "bg-neutral-950 text-white"
                        : "text-neutral-700 hover:bg-neutral-950 hover:text-white"
                    }`
                  }
                >
                  {n.label}
                </NavLink>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <span className="hidden md:inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                Invitation only
              </span>
              <Link
                to="/sign-in"
                style={{ backgroundColor: INK }}
                className="group hidden sm:inline-flex items-center gap-2 text-white pl-5 pr-2 py-2 rounded-lg hover:opacity-90 transition"
              >
                Delegate sign in
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: BRAND }}
                >
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </span>
              </Link>
              <button
                className="lg:hidden p-2 text-neutral-700 rounded-lg hover:bg-neutral-100"
                onClick={() => setOpen(true)}
                aria-label="Open menu"
              >
                <Menu size={22} />
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
                <ImageWithFallback src={FB_LOGO} alt="FISC 2026" className="h-9 w-auto" />
                <button
                  className="p-2 rounded-lg hover:bg-neutral-100 text-neutral-700"
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
                    `block px-4 py-3 rounded-xl mb-1 transition ${
                      isActive ? "bg-neutral-950 text-white" : "text-neutral-800 hover:bg-neutral-100"
                    }`
                  }
                  style={{ fontSize: "1.125rem" }}
                >
                  Home
                </NavLink>
                {navItems.map((n) => (
                  <NavLink
                    key={n.label}
                    to={n.to}
                    className={({ isActive }) =>
                      `block px-4 py-3 rounded-xl mb-1 transition ${
                        isActive ? "bg-neutral-950 text-white" : "text-neutral-800 hover:bg-neutral-100"
                      }`
                    }
                    style={{ fontSize: "1.125rem" }}
                  >
                    {n.label}
                  </NavLink>
                ))}
              </nav>
              <div className="p-5 border-t border-neutral-100 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-neutral-100 text-neutral-600 text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                  Invitation only
                </div>
                <Link
                  to="/sign-in"
                  style={{ backgroundColor: INK }}
                  className="group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-xl hover:opacity-90 transition"
                >
                  Delegate sign in
                  <span
                    className="w-8 h-8 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: BRAND }}
                  >
                    <ArrowUpRight size={14} />
                  </span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
