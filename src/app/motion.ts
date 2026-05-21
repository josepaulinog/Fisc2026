import { useEffect, useRef, useState } from "react";
import { useInView, type Variants } from "motion/react";

/**
 * Shared motion language for the FISC site.
 *
 * Two design principles:
 *   1. ONE curve — the iOS Apple cubic-bezier (0.32, 0.72, 0, 1) drives every
 *      transition. Mass + spring physics without overshoot. Anything else
 *      (linear, ease-in-out) is banned.
 *   2. NARRATIVE order — page sections reveal as a story: eyebrow first
 *      (the label, "here's what this is"), then headline (the claim), then
 *      body (the explanation), then CTA (the action). Stagger encodes the
 *      reading order so the user's eye is pulled through the page rather
 *      than fighting noise.
 */

// ---------------------------------------------------------------------------
// Easing curves
// ---------------------------------------------------------------------------

/** Apple iOS curve — heavy entry, gentle settle, no overshoot. Default. */
export const EASE_FLUID = [0.32, 0.72, 0, 1] as const;

/** Snappier, slightly sharper curve for micro-interactions (hover, press). */
export const EASE_SNAP = [0.22, 1, 0.36, 1] as const;

/** Gentle deceleration for entrance animations — feels luxurious. */
export const EASE_GENTLE = [0.16, 1, 0.3, 1] as const;

// ---------------------------------------------------------------------------
// Reveal variants — drop-in for any single element entering view
// ---------------------------------------------------------------------------

/** Fade up with subtle blur. Default entrance for headlines, cards, images. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_GENTLE },
  },
};

/** Tighter, faster fade-up for inline elements (buttons, chips, links). */
export const fadeUpTight: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: EASE_FLUID },
  },
};

/** Fade-in only (no movement) — for textures, overlays, decorative layers. */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease: EASE_FLUID } },
};

/** Scale-up entrance for photos / image collage tiles. */
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(8px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: EASE_GENTLE },
  },
};

// ---------------------------------------------------------------------------
// Stagger containers — orchestrate children reveal in narrative order
// ---------------------------------------------------------------------------

/** Hero-tier stagger: 80ms between children, 150ms initial delay so the
 *  page settles before the choreography begins. Use for page heroes. */
export const staggerHero: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.15,
      staggerChildren: 0.08,
    },
  },
};

/** Section-tier stagger: tighter timing for lists / cards / chips. */
export const staggerSection: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.06,
    },
  },
};

/** List-tier stagger: very tight, for long rows that shouldn't drag. */
export const staggerList: Variants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.04,
      staggerChildren: 0.045,
    },
  },
};

// ---------------------------------------------------------------------------
// Default viewport for whileInView — fire once when 15% in view.
// Avoids re-firing on scroll-back and waits for a meaningful entry.
// ---------------------------------------------------------------------------

export const REVEAL_VIEWPORT = { once: true, amount: 0.15 } as const;

// ---------------------------------------------------------------------------
// useCountUp — animates a number from 0 → target when the ref enters view.
// Used by the homepage stats and any "live" figure that should feel earned
// rather than precomputed. Honours prefers-reduced-motion by snapping to the
// final value instantly.
// ---------------------------------------------------------------------------

export function useCountUp(target: number, options?: {
  duration?: number;
  delay?: number;
  /** Format the displayed value (e.g. to prepend "+" or pad numerals). */
  format?: (value: number) => string;
}): { value: string; ref: React.RefObject<HTMLSpanElement | null> } {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [value, setValue] = useState<number>(0);
  const { duration = 1.4, delay = 0, format } = options ?? {};

  useEffect(() => {
    if (!inView) return;
    // Reduced motion → snap to target.
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setValue(target);
      return;
    }

    const startMs = performance.now() + delay * 1000;
    const totalMs = duration * 1000;
    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startMs;
      if (elapsed < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(elapsed / totalMs, 1);
      // Match EASE_GENTLE: a smooth out-quint feel.
      const eased = 1 - Math.pow(1 - t, 4);
      setValue(Math.round(target * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration, delay]);

  return {
    value: format ? format(value) : String(value),
    ref,
  };
}
