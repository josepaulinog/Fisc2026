import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowRight,
  Calendar,
  Download,
  MapPin,
  Mic,
  UserCircle2,
  Users,
  X,
} from "lucide-react";
import { useAuth } from "../auth";
import { firstNameOf } from "../profile";
import { BRAND, BRAND_SOFT, INK } from "../data";
import { Z } from "../tokens";

/**
 * OnboardingTour — multi-step welcome modal shown the first time a delegate
 * signs in. Triggered by the `isAuthed` transition (signed-out → signed-in)
 * and persisted per-user so each account sees it once.
 *
 * Exposes a context (`useOnboardingTour`) so any component can call
 * `tour.replay()` to re-open it manually — used by the Profile page's
 * "Replay tour" affordance.
 *
 * For the WP port this becomes either a one-time WP user-meta flag or the
 * `dp-intro-tours` plugin (already present on the 2025 site).
 */
const STORAGE_KEY_PREFIX = "fisc2026_onboarded_";

type Step = { icon: typeof Calendar; eyebrow: string; title: string; body: string };

function stepsFor(name: string): Step[] {
  const first = firstNameOf(name) || "delegate";
  return [
    {
      icon: Calendar,
      eyebrow: "Welcome",
      title: `Welcome, ${first}.`,
      body: "You're in. FISC 2026 runs Jun 29 – Jul 2 at the Hyatt Regency, Port of Spain. Here's what your delegate access opens up.",
    },
    {
      icon: UserCircle2,
      eyebrow: "Step 1",
      title: "Complete your profile",
      body: "Add your role, country and a short bio. Other delegates will see you in the Attendees directory — it's how you get recognised before sessions.",
    },
    {
      icon: Mic,
      eyebrow: "Step 2",
      title: "Explore the programme",
      body: "25+ sessions across four days. Open any session for the full briefing, speakers and related downloads.",
    },
    {
      icon: Download,
      eyebrow: "Step 3",
      title: "Grab the takeaways",
      body: "Session decks, one-pagers, the Trinidad & Tobago delegate guide and the attendee directory — all under Resources.",
    },
    {
      icon: Users,
      eyebrow: "Step 4",
      title: "Meet the community",
      body: "Browse delegates from across the FreeBalance customer community and reach out before you land in Port of Spain.",
    },
    {
      icon: MapPin,
      eyebrow: "Ready",
      title: "See you in Port of Spain.",
      body: "You can replay this tour any time from your profile page.",
    },
  ];
}

// ---------------------------------------------------------------------------
// Context — exposes replay() so any page can re-trigger the tour
// ---------------------------------------------------------------------------

type OnboardingTourApi = {
  replay: () => void;
  isOpen: boolean;
};

const OnboardingTourContext = createContext<OnboardingTourApi | null>(null);

export function useOnboardingTour(): OnboardingTourApi {
  const ctx = useContext(OnboardingTourContext);
  if (!ctx) {
    throw new Error("useOnboardingTour must be used inside <OnboardingTour>");
  }
  return ctx;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function OnboardingTour({ children }: { children?: React.ReactNode }) {
  const { user, isAuthed } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const steps = stepsFor(user?.name ?? "");
  const storageKey = user ? STORAGE_KEY_PREFIX + user.email.toLowerCase() : null;

  // Auto-trigger when the user transitions to signed-in AND hasn't seen the
  // tour for this account. Skipped on every subsequent visit.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isAuthed || !storageKey) return;
    if (window.localStorage.getItem(storageKey)) return;
    setStep(0);
    const t = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(t);
  }, [isAuthed, storageKey]);

  // Manual replay — used by useOnboardingTour().replay() from other pages.
  // Resets to step 0 and opens without touching storage; on close we re-mark
  // as seen, so replay doesn't permanently unhide the tour.
  const replay = useCallback(() => {
    setStep(0);
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, step]);

  const dismiss = () => {
    if (typeof window !== "undefined" && storageKey) {
      window.localStorage.setItem(storageKey, "1");
    }
    setOpen(false);
  };

  const goNext = () => {
    if (step === steps.length - 1) dismiss();
    else setStep((s) => s + 1);
  };
  const goPrev = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  const api = useMemo<OnboardingTourApi>(
    () => ({ replay, isOpen: open }),
    [replay, open],
  );

  // The modal only renders when there's a user. The context wrapper still
  // wraps `children` so `useOnboardingTour()` works on the sign-in page (it
  // just no-ops there because `user` is null and replay() opens nothing).
  const current = user ? steps[step] : null;
  const Icon = current?.icon;
  const isLast = step === steps.length - 1;

  return (
    <OnboardingTourContext.Provider value={api}>
      {children}
      <AnimatePresence>
        {open && current && Icon && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
            className={`fixed inset-0 ${Z.overlay} bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6`}
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-lg rounded-md overflow-hidden text-white ring-1 ring-white/10"
              style={{
                backgroundColor: INK,
                boxShadow: "0 30px 80px -24px rgba(0,0,0,0.6), 0 8px 20px -8px rgba(0,0,0,0.3)",
              }}
            >
              {/* Brand glow */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at 100% 0%, ${BRAND}38 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, #00000088 0%, transparent 55%)`,
                }}
              />
              <button
                type="button"
                onClick={dismiss}
                aria-label="Close tour"
                className="absolute top-4 right-4 z-10 w-9 h-9 rounded-sm bg-white/10 ring-1 ring-white/20 text-white/85 hover:bg-white hover:text-neutral-950 flex items-center justify-center transition-fluid"
              >
                <X size={16} strokeWidth={1.5} />
              </button>

              <div className="relative p-7 md:p-10">
                <div
                  className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                  style={{ backgroundColor: `${BRAND}22`, color: BRAND_SOFT }}
                >
                  <Icon size={22} strokeWidth={1.5} />
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="tracking-[0.22em] text-white/55 text-[10.5px] uppercase mb-3" style={{ fontWeight: 500 }}>
                      {current.eyebrow}
                    </div>
                    <h2
                      id="onboarding-title"
                      className="tracking-[-0.02em]"
                      style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}
                    >
                      {current.title}
                    </h2>
                    <p
                      className="mt-3 text-white/75"
                      style={{ fontSize: "1rem", lineHeight: 1.65 }}
                    >
                      {current.body}
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Progress dots */}
                <div className="mt-8 flex items-center gap-1.5">
                  {steps.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setStep(i)}
                      aria-label={`Go to step ${i + 1}`}
                      className={`h-1.5 rounded-full transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                        i === step ? "w-8" : "w-1.5 hover:w-3"
                      }`}
                      style={{
                        backgroundColor: i === step ? BRAND : "rgba(255,255,255,0.22)",
                      }}
                    />
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={dismiss}
                    className="text-sm text-white/65 hover:text-white transition-fluid"
                  >
                    Skip tour
                  </button>
                  <div className="flex items-center gap-2">
                    {step > 0 && (
                      <button
                        type="button"
                        onClick={goPrev}
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/20 text-white/85 hover:border-white hover:text-white transition-fluid text-sm"
                      >
                        Back
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={goNext}
                      style={{ backgroundColor: BRAND }}
                      className="group inline-flex items-center gap-2 pl-4 pr-2 py-2.5 rounded-sm text-white transition-fluid hover:opacity-95 active:scale-[0.98]"
                    >
                      <span style={{ fontWeight: 500 }}>{isLast ? "Get started" : "Next"}</span>
                      <span className="w-7 h-7 rounded-sm bg-white/15 flex items-center justify-center transition-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]">
                        <ArrowRight size={14} strokeWidth={1.5} />
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </OnboardingTourContext.Provider>
  );
}
