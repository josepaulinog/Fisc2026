import { useEffect, useState } from "react";
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

/**
 * OnboardingTour — multi-step welcome modal shown the first time a delegate
 * signs in. Triggered by the `isAuthed` transition (signed-out → signed-in)
 * and persisted per-user so each account sees it once.
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
      body: "You're signed in to FISC 2026. Four days of country-led public finance reform, June 29 – July 2, at the Hyatt Regency in Port of Spain. Here's what's now unlocked.",
    },
    {
      icon: UserCircle2,
      eyebrow: "Step 1",
      title: "Complete your profile",
      body: "Add your role, country and a short bio. Other delegates will see this in the Attendees directory — it's how you get recognised before sessions and matched with peers.",
    },
    {
      icon: Mic,
      eyebrow: "Step 2",
      title: "Explore the programme",
      body: "Twenty-five-plus sessions across four days. Tap any session to see the full briefing, speakers and related downloads.",
    },
    {
      icon: Download,
      eyebrow: "Step 3",
      title: "Grab the takeaways",
      body: "Materials, Trinidad & Tobago delegate guide and the full attendee directory are now available under Resources.",
    },
    {
      icon: Users,
      eyebrow: "Step 4",
      title: "Meet the community",
      body: "Browse delegates from forty-plus countries and reach out before you land in Port of Spain.",
    },
    {
      icon: MapPin,
      eyebrow: "Ready",
      title: "See you in Port of Spain.",
      body: "You can revisit this tour later by clearing your browser storage. Otherwise — enjoy the programme.",
    },
  ];
}

export function OnboardingTour() {
  const { user, isAuthed } = useAuth();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  const steps = stepsFor(user?.name ?? "");
  const storageKey = user ? STORAGE_KEY_PREFIX + user.email.toLowerCase() : null;

  // Trigger when the user transitions to signed-in AND hasn't seen the tour
  // for this account. The per-email key means each new sign-in surfaces it once.
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isAuthed || !storageKey) return;
    if (window.localStorage.getItem(storageKey)) return;
    setStep(0);
    const t = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(t);
  }, [isAuthed, storageKey]);

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

  if (!user) return null;

  const current = steps[step];
  const Icon = current.icon;
  const isLast = step === steps.length - 1;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={dismiss}
          role="dialog"
          aria-modal="true"
          aria-labelledby="onboarding-title"
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 md:p-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-3xl overflow-hidden text-white"
            style={{ backgroundColor: INK }}
          >
            {/* Brand glow */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 100% 0%, ${BRAND}55 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, #00000088 0%, transparent 55%)`,
              }}
            />
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close tour"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/10 border border-white/20 text-white/85 hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
            >
              <X size={16} />
            </button>

            <div className="relative p-8 md:p-10">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center mb-6"
                style={{ backgroundColor: `${BRAND}22`, color: BRAND_SOFT }}
              >
                <Icon size={22} />
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="tracking-[0.25em] text-white/55 text-xs uppercase mb-3">
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
                    className={`h-1.5 rounded-full transition-all ${
                      i === step
                        ? "w-8"
                        : "w-1.5 hover:w-3"
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
                  className="text-sm text-white/65 hover:text-white transition"
                >
                  Skip tour
                </button>
                <div className="flex items-center gap-2">
                  {step > 0 && (
                    <button
                      type="button"
                      onClick={goPrev}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/20 text-white/85 hover:border-white hover:text-white transition text-sm"
                    >
                      Back
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={goNext}
                    style={{ backgroundColor: BRAND }}
                    className="group inline-flex items-center gap-2 pl-4 pr-2 py-2.5 rounded-sm text-white transition hover:opacity-95"
                  >
                    {isLast ? "Get started" : "Next"}
                    <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                      <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
