import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Landmark,
  MapPin,
  Play,
  Sun,
  Timer,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CountryFlag } from "../components/CountryFlag";
import { Grain, GradientText, Marquee, SectionLabel } from "../components/shared";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BezelCard } from "../components/ui/BezelCard";
import { BracketArrow } from "../components/ui/BracketArrow";
import {
  REVEAL_VIEWPORT,
  fadeUp,
  fadeUpTight,
  scaleIn,
  staggerList,
  staggerSection,
  useCountUp,
} from "../motion";
import { TYPE, TRACKING, chipTone, CHIP_HUE } from "../tokens";
import { useAuth } from "../auth";
import { useChecklist } from "../checklist";
import { firstNameOf } from "../profile";
import {
  BRAND,
  COLLAGE_1,
  COLLAGE_2,
  COLLAGE_3,
  EVENT_START,
  HERO_IMG,
  INK,
  attendees,
  countries,
  delegateGuide,
  formatDeadline,
  type DeadlineTone,
} from "../data";

// ---------------------------------------------------------------------------
// Hero — unchanged from the previous build. Strongest moment on the site;
// the design-review pass explicitly said keep it intact.
// ---------------------------------------------------------------------------

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden text-white pt-28 md:pt-32" style={{ backgroundColor: INK }}>
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {/* object-right on mobile, object-center on md+ — the landscape video
            gets cropped on narrow viewports; right-aligning keeps the palms
            on the right side of the frame visible instead of cropping them
            out. Centred composition is preserved on tablet+ where the full
            width has room to breathe. */}
        {prefersReducedMotion ? (
          <ImageWithFallback src={HERO_IMG} alt="Caribbean coast" className="w-full h-full object-cover object-right md:object-center opacity-50" />
        ) : (
          <video
            src="/rocky.mp4"
            poster={HERO_IMG}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover object-right md:object-center opacity-50"
          />
        )}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 80% 10%, ${BRAND}38 0%, transparent 50%), radial-gradient(ellipse at 20% 40%, #ff8e421a 0%, transparent 40%), radial-gradient(ellipse at 0% 100%, #000000a6 0%, transparent 60%), linear-gradient(180deg, ${INK} 0%, transparent 30%, ${INK}cc 100%)`,
        }}
      />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 40%, transparent 80%)'
        }}
      />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-0 pb-9 md:pt-6 md:pb-13">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-6 md:mb-8"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/20 bg-white/5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: BRAND }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: BRAND }} />
            </span>
            <span className="tracking-[0.2em] md:tracking-[0.25em] text-white/90 text-xs md:text-xs">
              FISC · 2026 · TRINIDAD & TOBAGO
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="text-white"
          style={{ fontSize: TYPE.display, lineHeight: 0.95, letterSpacing: TRACKING.tightHeading }}
        >
          Where finance
          <br />
          meets the{" "}
          <span className="relative inline-block">
            <GradientText tone="light">Caribbean</GradientText>
            <Sun className="sun-rotate absolute -top-4 -right-12 hidden md:block" size={48} style={{ color: BRAND }} />
          </span>.
        </motion.h1>

        <div className="mt-6 md:mt-6 grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <p className="text-white/78" style={{ fontSize: "clamp(1.1rem, 2.1vw, 1.125rem)", lineHeight: 1.55 }}>
              The FreeBalance International Steering Committee comes to Port of Spain for
              four days of country-led reform, cooperation, and public financial
              management exchange.
            </p>
            {/* Hero CTA — single intentional moment. The "Watch FISC 2025"
                button used to live here, but the hero footage was already
                FISC 2025 content; doubling up made the page look retrospective.
                The recap link now lives in the What's New rail below. */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <NestedCTA
                to="/sign-in"
                variant="brand"
                icon={<BracketArrow size={13} strokeWidth={1.75} />}
              >
                Delegate portal
              </NestedCTA>
            </div>
          </motion.div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

// ---------------------------------------------------------------------------
// Countdown + Action queue — the personal heartbeat. Replaces the previous
// StatsBar slot. Answers two delegate questions in one band: "when am I
// going?" (the ticking clock) and "what do I owe before I get there?" (the
// pre-arrival queue, lifted from delegateGuide.checklist).
// ---------------------------------------------------------------------------

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

function CountdownAndActions() {
  const { user, isAuthed } = useAuth();
  const { checked, toggle } = useChecklist(user);
  // Tick once per second. The interval is cleaned up on unmount; on a route
  // change the homepage unmounts and the ticker stops with it.
  const [now, setNow] = useState<number>(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Scroll-linked parallax for the About + collage row. Each tile drifts
  // at a different speed as the user scrolls the section through the
  // viewport, giving the composition Z-depth. Reduced-motion users get
  // static tiles.
  const aboutRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress: aboutProgress } = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  });
  const tileTopLeftY = useTransform(aboutProgress, [0, 1], prefersReducedMotion ? [0, 0] : [40, -40]);
  const tileBottomLeftY = useTransform(aboutProgress, [0, 1], prefersReducedMotion ? [0, 0] : [20, -20]);
  const tileRightY = useTransform(aboutProgress, [0, 1], prefersReducedMotion ? [0, 0] : [60, -60]);

  // Stats row counters — animate from 0 → target when each numeral enters
  // the viewport. Staggered durations (1.2s / 1.4s / 1.8s) make the larger
  // numbers feel earned: the 300+ delegates ticker keeps spinning slightly
  // after the 18 editions has settled, so the eye lands on Editions first
  // and the bigger numbers reward continued attention. The "+" suffix is
  // baked into the format function so it appears only after the count
  // finishes, mirroring the existing useCountUp pattern in TheRoom.
  const editionsCount = useCountUp(18, { duration: 1.2 });
  const countriesCount = useCountUp(10, { duration: 1.4, format: (v) => `${v}+` });
  const homeDelegatesCount = useCountUp(20, { duration: 1.6, format: (v) => `${v}+` });

  const diff = Math.max(0, EVENT_START.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  // First five pre-arrival actions, ordered by deadline upstream in data.ts.
  // Signed-in delegates can tick them off; state is persisted per-user via
  // useChecklist and shared with the full checklist on /delegate-guide.
  const actions = delegateGuide.checklist.slice(0, 3);
  const totalActions = delegateGuide.checklist.length;
  const completedCount = isAuthed ? checked.size : 0;

  // Live deadline label per action — computed against the same `now` that
  // drives the countdown above, so the whole section pulses on one heartbeat.
  // Wrapped in `new Date(now)` because formatDeadline takes a Date object.
  const nowDate = new Date(now);
  const deadlineToneClasses: Record<DeadlineTone, string> = {
    overdue: "bg-red-50 text-red-700",
    soon: "bg-orange-50 text-orange-700",
    future: "bg-neutral-100 text-neutral-700",
  };

  const firstName = user ? firstNameOf(user.name) : null;

  // Compute the next milestone once so both the inline card and the sticky
  // bar pull from the same source.
  const nextMilestone = (() => {
    const found = delegateGuide.checklist.find(
      (c) => new Date(c.dueDate).getTime() > nowDate.getTime(),
    );
    if (!found) return null;
    return { item: found, deadline: formatDeadline(found.dueDate, nowDate) };
  })();

  return (
    <section
      className="py-16 md:py-24 relative"
      style={{ backgroundColor: "#ededed" }}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* About + photo collage — editorial intro row that grounds the
            countdown below. Left column: brand framing copy with a small
            "More about FISC" link. Right column: blocky 3-photo collage
            (1 tall + 2 stacked squares) anchoring the abstract concept
            in real Trinidad imagery. */}
        <motion.div
          ref={aboutRef}
          variants={staggerSection}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          className="grid lg:grid-cols-12 gap-10 md:gap-12 items-center"
        >
          {/* Text column — children stagger via own staggerSection: eyebrow
              first, then headline, then body, then link. Each piece arrives
              with its own fade-up after the parent orchestration cascades. */}
          <motion.div
            variants={staggerSection}
            className="lg:col-span-6 flex flex-col"
          >
            <motion.div variants={fadeUpTight}>
              <SectionLabel>About FISC</SectionLabel>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="tracking-[-0.025em] text-neutral-950"
              style={{ fontSize: TYPE.h2, lineHeight: 1.05, letterSpacing: TRACKING.snug }}
            >
              A platform for <br></br><em className="font-display italic">collaborative </em>engagement.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="mt-5 md:mt-6 text-neutral-700 max-w-md"
              style={{ fontSize: "1.0625rem", lineHeight: 1.6 }}
            >
              FISC is the annual gathering of the FreeBalance customer community — finance ministers, treasurers, budget directors and PFM practitioners from emerging and developing nations.
            </motion.p>

            {/* Editorial stats row — no card chrome, just typography. Brand-
                orange numerals + uppercase tracking-wide labels. Sized to
                stay short enough that the "More about FISC" CTA below
                remains in the same viewport, even with the parent grid's
                items-center vertical alignment against the collage. */}
            <motion.div
              variants={fadeUp}
              className="mt-6 md:mt-8 flex flex-wrap items-baseline gap-x-7 sm:gap-x-9 md:gap-x-12 gap-y-3"
            >
              {[
                { ref: editionsCount.ref, value: editionsCount.value, l: "Editions" },
                { ref: countriesCount.ref, value: countriesCount.value, l: "Countries" },
                { ref: homeDelegatesCount.ref, value: homeDelegatesCount.value, l: "Delegates" },
              ].map((s) => (
                <div key={s.l} className="flex flex-col group cursor-default relative pb-2 min-w-[90px]">
                  <span
                    ref={s.ref}
                    className="tabular-nums tracking-tight transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:-translate-y-1 block"
                    style={{
                      color: BRAND,
                      fontSize: "clamp(1.875rem, 3.5vw, 2.625rem)",
                      lineHeight: 1,
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="mt-1.5 text-neutral-500 uppercase transition-colors duration-300 group-hover:text-neutral-800"
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.22em", fontWeight: 500 }}
                  >
                    {s.l}
                  </span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:w-[40px]" style={{ backgroundColor: BRAND }} />
                </div>
              ))}
            </motion.div>

            <motion.div variants={fadeUpTight} className="mt-6 md:mt-8 w-fit">
              <NestedCTA
                to="/about"
                variant="ghost"
                icon={<BracketArrow size={13} strokeWidth={1.75} />}
              >
                More about FISC
              </NestedCTA>
            </motion.div>
          </motion.div>

          <div className="lg:col-span-6">
            {/* 3-photo blocky collage — matches the reference layout:
                Left column: medium tile (top, 4:5 aspect) + small square
                  (bottom). Bottom-left is roughly half the height of top-left
                  so the eye doesn't read it as equal weight.
                Right column: tall hero tile (3:5 aspect — very vertical) with
                  a `mt-[6%]` offset so it sits below the top edge of the
                  left column AND extends below the bottom-left tile. This
                  asymmetric overhang is the key visual move from the
                  reference — the right tile "floats" past the left grid.
                Independent flex/grid columns let each tile own its aspect
                ratio without being squeezed by a shared grid track. */}
            <motion.div
              variants={staggerList}
              initial="hidden"
              whileInView="show"
              viewport={REVEAL_VIEWPORT}
              className="grid grid-cols-[5fr_6fr] gap-4 md:gap-5 items-start"
            >
              {/* Left column — 2 stacked tiles with parallax drift */}
              <div className="flex flex-col gap-4 md:gap-5">
                <motion.div
                  variants={scaleIn}
                  style={{ y: tileTopLeftY }}
                  className="group aspect-[4/5] relative overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/[0.08] shadow-sm hover:shadow-xl hover:shadow-black/[0.08] transition-[box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <ImageWithFallback
                    src={COLLAGE_1}
                    alt="FISC 2026 — Trinidad and Tobago"
                    className="absolute inset-0 w-full h-full object-cover transition-fluid group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  style={{ y: tileBottomLeftY }}
                  className="group aspect-square relative overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/[0.08] shadow-sm hover:shadow-xl hover:shadow-black/[0.08] transition-[box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <ImageWithFallback
                    src={COLLAGE_3}
                    alt="Tobago"
                    className="absolute inset-0 w-full h-full object-cover transition-fluid group-hover:scale-[1.03]"
                  />
                  <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                </motion.div>
              </div>

              <motion.div
                variants={scaleIn}
                style={{ y: tileRightY }}
                className="group aspect-[3/5] relative overflow-hidden rounded-xl bg-neutral-100 ring-1 ring-black/[0.08] shadow-sm hover:shadow-xl hover:shadow-black/[0.08] transition-[box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] mt-[6%]"
              >
                <motion.div
                  className="absolute inset-0"
                  animate={prefersReducedMotion ? undefined : { scale: [1, 1.06, 1] }}
                  transition={{ duration: 24, ease: "easeInOut", repeat: Infinity, repeatType: "loop" }}
                >
                  <ImageWithFallback
                    src={COLLAGE_2}
                    alt="The FISC delegation"
                    className="absolute inset-0 w-full h-full object-cover object-[center_30%] transition-fluid group-hover:scale-[1.03]"
                  />
                </motion.div>
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                <span
                  className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-white/85 backdrop-blur text-[10px] tracking-[0.18em] uppercase text-neutral-700 z-10"
                  style={{ fontWeight: 500 }}
                >
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND }} />
                  The delegation
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Hidden by user request — countdown + pre-arrival queue row is
            preserved inline (not deleted) so it can be re-enabled instantly
            by flipping `false` → `true` below. All hooks and state above
            still run; only the JSX render is short-circuited. */}
        {false && (
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Countdown — sticks to the top of the viewport (below the floating
              header pill) on lg+ so it stays in view while the user scrolls
              the action queue on the right. Below lg the layout stacks
              vertically and sticky is a no-op. `self-start` already implied
              by the parent `items-start`. */}
          <div className="lg:col-span-7 lg:sticky lg:top-[100px]">
              {/* Eyebrow with live pulse — the green dot's pulse animation
                  signals "this number is ticking right now", not a static
                  computed-at-build-time figure. */}
              <div className="inline-flex items-center gap-2.5 mb-6">
                <span className="relative inline-flex items-center justify-center w-1.5 h-1.5">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-70 animate-ping"
                    style={{ backgroundColor: BRAND }}
                  />
                  <span
                    className="relative inline-flex w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: BRAND }}
                  />
                </span>
                <span
                  className="text-[10.5px] uppercase tracking-[0.22em] text-neutral-700"
                  style={{ fontWeight: 500 }}
                >
                  {firstName ? `Hi, ${firstName} · Live countdown` : "The countdown · Live"}
                </span>
              </div>

              <h2
                className="tracking-[-0.025em] text-neutral-950"
                style={{ fontSize: TYPE.h1, lineHeight: 0.98, letterSpacing: TRACKING.tight }}
              >
                {isAuthed ? "Trinidad in" : "FISC opens in"}{" "}
                <span className="tabular-nums" style={{ color: BRAND }}>{days}</span>{" "}
                <em
                  className="font-display italic text-neutral-500"
                  style={{ fontSize: "0.48em", fontWeight: 400, verticalAlign: "0.18em" }}
                >
                  days
                </em>
              </h2>

              {/* HH · MM · SS ticker. The seconds cell gets a soft brand-orange
                  pulse on every tick so the user feels the heartbeat. */}
              <div
                className="mt-7 inline-grid grid-cols-3 gap-x-6 md:gap-x-10 text-neutral-950 tabular-nums"
                aria-live="off"
                aria-label="Time remaining"
              >
                {[
                  { v: pad2(hrs), l: "Hours" },
                  { v: pad2(mins), l: "Minutes" },
                  { v: pad2(secs), l: "Seconds", isLive: true },
                ].map((t, i) => (
                  <div
                    key={t.l}
                    className={`flex flex-col items-start ${i > 0 ? "pl-6 md:pl-10 border-l border-neutral-200" : ""}`}
                  >
                    {t.isLive ? (
                      <motion.span
                        key={t.v}
                        initial={{ color: BRAND }}
                        animate={{ color: "#0a0a0a" }}
                        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                        className="tracking-tight tabular-nums"
                        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1, letterSpacing: TRACKING.tight }}
                      >
                        {t.v}
                      </motion.span>
                    ) : (
                      <span
                        className="tracking-tight tabular-nums"
                        style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1, letterSpacing: TRACKING.tight }}
                      >
                        {t.v}
                      </span>
                    )}
                    <span
                      className="mt-2 text-neutral-500 uppercase"
                      style={{ fontSize: "0.6875rem", letterSpacing: TRACKING.widestNarrow, fontWeight: 500 }}
                    >
                      {t.l}
                    </span>
                  </div>
                ))}
              </div>

              {/* Fact strip — replaces the long descriptive paragraph. Three
                  glanceable facts (date · venue · duration) read faster and
                  carry the same information density. */}
              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-neutral-700">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={14} strokeWidth={1.5} className="text-neutral-500" />
                  <span style={{ fontWeight: 500 }}>Jun 29 – Jul 2, 2026</span>
                </span>
                <span className="w-px h-3.5 bg-neutral-300" />
                <span className="inline-flex items-center gap-2">
                  <Landmark size={14} strokeWidth={1.5} className="text-neutral-500" />
                  <span>Hyatt Regency, Port of Spain</span>
                </span>
                <span className="w-px h-3.5 bg-neutral-300" />
                <span className="inline-flex items-center gap-2">
                  <Timer size={14} strokeWidth={1.5} className="text-neutral-500" />
                  <span>4 days, no intermission</span>
                </span>
              </div>

              {/* Next milestone — promoted from inline pill to a card-style
                  link. Hover lift + arrow translate makes the action discoverable;
                  brand-orange dot accents the eyebrow and ties to the live
                  pulse above. */}
              {nextMilestone && (
                <Link
                  to={isAuthed ? "/delegate-guide" : "/sign-in?return=/delegate-guide"}
                  className="group mt-7 inline-flex items-center gap-4 pl-4 pr-3 py-3 rounded-sm bg-white ring-1 ring-black/[0.06] shadow-[0_4px_14px_-8px_rgba(0,0,0,0.08)] transition-fluid hover:ring-black/[0.12] hover:shadow-[0_10px_28px_-12px_rgba(0,0,0,0.15)]"
                >
                  <span className="inline-flex items-center gap-2 shrink-0">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: BRAND }}
                    />
                    <span
                      className="tracking-[0.2em] uppercase text-neutral-500 text-[10.5px]"
                      style={{ fontWeight: 500 }}
                    >
                      Your next deadline
                    </span>
                  </span>
                  <span className="text-neutral-300 hidden sm:inline">|</span>
                  <span className="text-neutral-950 tracking-tight text-[0.95rem]" style={{ fontWeight: 500 }}>
                    {nextMilestone.item.shortLabel}
                  </span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-sm text-[11px] tabular-nums ${
                      deadlineToneClasses[nextMilestone.deadline.tone]
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {nextMilestone.deadline.label}
                  </span>
                  <span className="w-7 h-7 rounded-sm bg-neutral-100 flex items-center justify-center transition-fluid group-hover:bg-neutral-950 group-hover:text-white ml-1">
                    <BracketArrow size={11} strokeWidth={1.75} className="transition-fluid group-hover:translate-x-0.5 group-hover:-translate-y-[1px]" />
                  </span>
                </Link>
              )}
            </div>

          {/* Action queue — double-bezel nested shell + inner core. The 6px
              radius differential between outer (2rem) and inner (calc) reads
              as a glass plate sitting in a brushed tray. */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            >
              <BezelCard>
              <div className="p-7 md:p-9 border-b border-neutral-100">
                <div className="flex items-center justify-between gap-4">
                  <div className="tracking-[0.25em] uppercase text-neutral-500 text-xs" style={{ fontWeight: 500 }}>
                    Before you arrive
                  </div>
                  {isAuthed && (
                    <span className="text-xs tabular-nums text-neutral-500 shrink-0">
                      <span className="text-neutral-950" style={{ fontWeight: 600 }}>{completedCount}</span> of {totalActions} done
                    </span>
                  )}
                </div>
                <div className="mt-4 tracking-tight text-neutral-950" style={{ fontSize: TYPE.cardTitle, lineHeight: 1.15, letterSpacing: TRACKING.snug }}>
                  Your pre-arrival queue.
                </div>
              </div>
              <ul className="divide-y divide-neutral-100">
                {actions.map((a, i) => {
                  const d = formatDeadline(a.dueDate, nowDate);
                  const isChecked = isAuthed && checked.has(i);
                  // Shared visual content — wrapped in a <button> when the
                  // user is signed in (clickable to toggle) and a plain <div>
                  // when signed out (read-only teaser, sign-in CTA below).
                  // Padding bumped a tier so each item reads as its own
                  // breath of advice, not a dense list row.
                  const itemContent = (
                    <>
                      <span
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition mt-0.5 ${
                          isChecked
                            ? "text-white"
                            : "border border-neutral-300 text-neutral-400 text-sm tabular-nums"
                        }`}
                        style={isChecked ? { backgroundColor: BRAND } : undefined}
                      >
                        {isChecked ? <Check size={16} strokeWidth={2.5} /> : i + 1}
                      </span>
                      <div className="flex-1 min-w-0 text-left">
                        <div
                          className={`tracking-tight transition ${
                            isChecked ? "line-through text-neutral-400" : "text-neutral-950"
                          }`}
                          style={{ fontSize: TYPE.body, lineHeight: 1.4, fontWeight: 500 }}
                        >
                          {a.task}
                        </div>
                        {!isChecked && (
                          <div className={`mt-2.5 inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs ${deadlineToneClasses[d.tone]}`} style={{ fontWeight: 500 }}>
                            <Calendar size={11} /> {d.label}
                          </div>
                        )}
                      </div>
                    </>
                  );
                  return isAuthed ? (
                    <li key={i}>
                      <button
                        type="button"
                        onClick={() => toggle(i)}
                        aria-pressed={isChecked}
                        className="w-full px-6 py-5 md:p-7 flex items-start gap-5 hover:bg-neutral-50 transition"
                      >
                        {itemContent}
                      </button>
                    </li>
                  ) : (
                    <li key={i} className="px-6 py-4 md:px-7 flex items-start gap-5">
                      {itemContent}
                    </li>
                  );
                })}
              </ul>
              <div className="p-6 md:p-7 border-t border-neutral-100">
                <Link
                  to={isAuthed ? "/delegate-guide" : "/sign-in?return=/delegate-guide"}
                  className="group inline-flex items-center gap-2 text-neutral-950 transition-fluid hover:gap-3"
                  style={{ fontSize: TYPE.body, fontWeight: 500 }}
                >
                  {isAuthed ? "Open delegate guide" : "Sign in to check items off"}
                  <BracketArrow size={13} strokeWidth={1.75} className="transition-fluid group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              </BezelCard>
            </motion.div>
          </div>
        </div>
        )}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// The Room — belonging moment. Most-underused data on the site (the gated
// attendees list) becomes a public teaser here. Two states:
//   - Signed out: flag mosaic with country names. Faces stay gated.
//   - Signed in: face grid of confirmed delegates (sample of 12).
// Privacy boundary: the Attendees page is gated; this section honours that
// gate by never showing delegate faces or names to logged-out visitors.
// ---------------------------------------------------------------------------

function TheRoom() {
  const { isAuthed } = useAuth();
  // (The signed-out flag mosaic was removed — it duplicated the hero marquee.)
  // Exclude the Trinidad delegation leads here — they already get the full
  // protocol-grade "Hosted by" treatment above, and repeating them as small
  // avatar tiles makes the duplication read as a layout bug (truncated
  // "Davendra..." / "Kamla Per..." on mobile in particular). The "And the
  // delegation" eyebrow implies "the visitors beyond the hosts" — match it.
  const visibleDelegates = attendees
    .filter((a) => !(a.country === "Trinidad & Tobago" && a.delegationLead))
    .slice(0, 12);
  // CountUp on the "300+ confirmed" stat — animates from 0 → 300 when the
  // stat enters the viewport. Makes the number feel earned rather than
  // hardcoded. Format prepends "+" once the count completes.
  const delegatesCount = useCountUp(20, { duration: 1.4, format: (v) => `${v}+` });
  // Host country delegation — public officials (PM + Minister of Finance)
  // already advertised on /speakers as keynotes, so showing them here doesn't
  // break the gate on the /attendees directory. The `&& a.img` clause is
  // defensive: an entry without a portrait would render as an initials block
  // that fights the brand-orange restraint of the section, so skip it.
  const hosts = attendees.filter(
    (a) => a.country === "Trinidad & Tobago" && a.delegationLead && a.img,
  );

  return (
    <section className="py-14 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Header */}
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-end mb-10 md:mb-12">
          <div className="lg:col-span-6">
            <SectionLabel>The 2026 delegation</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: TYPE.h2, lineHeight: 1.05, letterSpacing: TRACKING.snug }}>
              Ten countries.<br></br> <em className="font-display italic">One conversation.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <p className="text-neutral-700 max-w-md" style={{ lineHeight: 1.65 }}>
              The Government of Trinidad &amp; Tobago hosts FISC 2026, welcoming
              delegates from across the FreeBalance customer community.
            </p>
          </div>
        </div>

        {/* Hosted by — public officials, shown in both auth states.
            Vertical official-portrait card: large aspect-[5/6] photo on top,
            architectural info area below with role above and full name in
            display size. Single-surface card (no double-bezel) for a
            cleaner, more official feel — these are heads of state and
            cabinet ministers; the card should read as protocol-grade. */}
        {hosts.length > 0 && (
          <>
            <div className="mb-6 text-xs tracking-[0.25em] uppercase text-neutral-500" style={{ fontWeight: 500 }}>
              Hosted by
            </div>
            <motion.div
              variants={staggerSection}
              initial="hidden"
              whileInView="show"
              viewport={REVEAL_VIEWPORT}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-14 md:mb-16"
            >
              {hosts.map((h) => (
                <motion.article
                  key={h.name}
                  variants={fadeUp}
                  className="group relative overflow-hidden rounded-md bg-white ring-1 ring-black/[0.05] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.18)] transition-fluid hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.22)]"
                >
                  {/* Stacked on mobile (photo on top, info below), horizontal
                      on md+ (40/60 split via 2fr/3fr columns). The horizontal
                      mobile layout left the text column at ~162px — too
                      narrow for "MINISTER OF FINANCE" on one line, and the
                      subtitle wrapped to three lines. Stacking gives both
                      the photo and the metadata full card width on mobile
                      while preserving the protocol-grade press-portrait feel
                      at desktop reading distance. */}
                  <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr]">
                    <div className="relative aspect-[5/4] md:aspect-[4/5] bg-neutral-100 overflow-hidden">
                      {h.img ? (
                        <ImageWithFallback
                          src={h.img}
                          alt={h.name}
                          className="absolute inset-0 w-full h-full object-cover transition-fluid group-hover:scale-[1.03]"
                        />
                      ) : (
                        // Softened placeholder — warm cream surface + muted
                        // ink initials. The previous solid BRAND-orange fill
                        // read as a loud product chip and broke the
                        // protocol-grade feel of the host cards.
                        <div
                          className="absolute inset-0 flex items-center justify-center tracking-tight"
                          style={{ backgroundColor: "#f4efe6", color: "#737373", fontSize: "2.5rem", fontWeight: 500 }}
                        >
                          {h.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                        </div>
                      )}
                    </div>

                    <div className="px-6 py-6 md:px-8 md:py-8 flex flex-col justify-start">
                      <div
                        className="text-neutral-500 uppercase"
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: TRACKING.widestNarrow,
                          fontWeight: 600,
                        }}
                      >
                        {h.role}
                      </div>
                      <h3
                        className="mt-2.5 text-neutral-950 tracking-tight"
                        style={{
                          fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
                          lineHeight: 1.05,
                          letterSpacing: TRACKING.tight,
                          fontWeight: 500,
                        }}
                      >
                        {h.name}
                      </h3>
                      {h.subtitle && (
                        <p
                          className="mt-3 text-neutral-500"
                          style={{ fontSize: "0.875rem", lineHeight: 1.5 }}
                        >
                          {h.subtitle}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </>
        )}

        {/* Visiting delegations — signed-in delegates only. The signed-out
            flag mosaic was removed; it duplicated the hero country marquee. */}
        {isAuthed && (
          <>
            <div className="mb-5 text-xs tracking-[0.25em] uppercase text-neutral-500">
              And the delegation
            </div>
          <motion.div
            variants={staggerList}
            initial="hidden"
            whileInView="show"
            viewport={REVEAL_VIEWPORT}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4"
          >
            {visibleDelegates.map((a, i) => (
              <motion.div
                key={`${a.name}-${i}`}
                variants={fadeUpTight}
                className="text-center"
              >
                <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-100">
                  {a.img ? (
                    <ImageWithFallback
                      src={a.img}
                      alt={a.name}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    // Softened placeholder — matches the host-card treatment.
                    // Warm cream + muted ink initials reads as a deliberate
                    // "portrait pending" state rather than a loud brand chip.
                    <div
                      className="absolute inset-0 flex items-center justify-center tracking-tight"
                      style={{ backgroundColor: "#f4efe6", color: "#737373", fontSize: "1.5rem", fontWeight: 500 }}
                    >
                      {a.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                    </div>
                  )}
                  <CountryFlag
                    country={a.country}
                    className="absolute bottom-1.5 right-1.5 h-3 md:h-3.5 w-auto rounded-[2px] shadow-sm ring-1 ring-black/10"
                  />
                </div>
                <div className="mt-2 tracking-tight text-neutral-950 truncate text-sm">{a.name}</div>
                <div className="text-neutral-500 text-xs truncate">{a.country}</div>
              </motion.div>
            ))}
          </motion.div>
          </>
        )}

        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-neutral-700 text-sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
            {isAuthed
              ? "Updated daily by the secretariat"
              : (
                <>
                  <span ref={delegatesCount.ref} className="tabular-nums" style={{ fontWeight: 600, color: "#0a0a0a" }}>
                    {delegatesCount.value}
                  </span>
                  <span className="ml-1">confirmed · sign in for the full list</span>
                </>
              )}
          </div>
          <NestedCTA
            to={isAuthed ? "/attendees" : "/sign-in?return=/attendees"}
            variant="gray"
            icon={<BracketArrow size={12} strokeWidth={1.75} />}
          >
            {isAuthed ? "See the full delegation" : "Sign in for the full delegation"}
          </NestedCTA>
        </div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// What's new — site updates rail. Editorial commitment from the secretariat:
// programme changes, host announcements, materials drops. Hardcoded for the
// prototype; at WordPress port time this becomes a custom post type with a
// weekly update cadence. If that editorial commitment isn't there, this
// section should be deleted rather than left to go stale.
// ---------------------------------------------------------------------------

type SiteUpdate = {
  date: string;
  category: "Programme" | "Logistics" | "Host country" | "Materials" | "Recap";
  title: string;
  excerpt: string;
  to: string;
};

const SITE_UPDATES: SiteUpdate[] = [
  {
    date: "May 18, 2026",
    category: "Programme",
    title: "Day 3 AI panel confirmed",
    excerpt: "Doug Hadden joined by two finance ministers. The session card is live on the Day 3 agenda.",
    to: "/agenda",
  },
  {
    date: "May 12, 2026",
    category: "Logistics",
    title: "Hotel booking window now open",
    // Public copy intentionally omits the FISC26 code — it's contractual
    // with Hyatt and shouldn't be discoverable outside the gated surfaces.
    excerpt: "Sign in for the delegate booking code at the Hyatt Regency; reservations close Jun 1.",
    to: "/delegate-guide",
  },
  {
    date: "May 5, 2026",
    category: "Host country",
    title: "Prime Minister confirmed as host",
    excerpt: "The Hon. Kamla Persad-Bissessar confirmed for the opening remarks alongside Minister Tancoo.",
    to: "/speakers/kamla-persad-bissessar",
  },
  {
    date: "Apr 28, 2026",
    category: "Materials",
    title: "New FISC takeaways added",
    excerpt: "Workshop slides and one-pagers from the latest secretariat sessions are in the library.",
    to: "/materials",
  },
  {
    // Dated to keep the weekly cadence the section's intro promises:
    // Apr 22 sits 6 days behind the Apr 28 Materials entry, holding the
    // ~weekly tempo all the way back. Earlier April was a 4-week gap and
    // made the "posts here weekly" line feel like marketing fiction.
    date: "Apr 22, 2026",
    category: "Recap",
    title: "FISC 2025 highlights now available",
    excerpt: "Twelve minutes of last year's gathering in Dili — opening remarks, workshop floors, and the closing roadmap vote.",
    to: "/videos",
  },
];

// Category chips now sourced from chipTone(hue) — single OKLCH function
// locks lightness and chroma so the five chips read as a coordinated family
// regardless of hue. Previous hex+alpha15 approach gave wildly different
// perceptual lightness across saturated source hues.
const CATEGORY_TONES: Record<SiteUpdate["category"], { bg: string; fg: string }> = {
  Programme: chipTone(CHIP_HUE.programme),
  Logistics: chipTone(CHIP_HUE.logistics),
  "Host country": chipTone(CHIP_HUE.hostCountry),
  Materials: chipTone(CHIP_HUE.assessments),
  Recap: chipTone(CHIP_HUE.recap),
};

function WhatsNew() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#ededed" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-end mb-10 md:mb-14">
          <div className="lg:col-span-6">
            <SectionLabel>Latest updates</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: TYPE.h2, lineHeight: 1.05, letterSpacing: TRACKING.snug }}>
              What's <em className="font-display italic">new.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <p className="text-neutral-700 max-w-md" style={{ lineHeight: 1.65 }}>
              The secretariat posts here weekly with programme changes, host
              announcements and material drops. Bookmark if you're checking
              between visits.
            </p>
          </div>
        </div>

        <motion.div
          variants={staggerList}
          initial="hidden"
          whileInView="show"
          viewport={REVEAL_VIEWPORT}
          className="space-y-3 md:space-y-4"
        >
          {SITE_UPDATES.map((u) => {
            const tone = CATEGORY_TONES[u.category];
            return (
              <motion.div key={u.title} variants={fadeUpTight}>
                <Link
                  to={u.to}
                  className="group block rounded-xl p-1.5 bg-black/[0.02] hover:bg-black/[0.04] ring-1 ring-black/[0.04] hover:ring-black/[0.08] hover:-translate-y-0.5 shadow-sm hover:shadow-md transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                >
                  <div className="rounded-lg overflow-hidden bg-white border border-black/[0.03] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9)] p-5 md:p-6 group-hover:bg-[#fbfaf8]/40 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]">
                    <div className="grid md:grid-cols-12 gap-3 md:gap-6 items-start md:items-center">
                      <div className="md:col-span-3 flex items-center gap-3">
                        <div className="text-xs tracking-[0.2em] uppercase text-neutral-500 shrink-0 tabular-nums">
                          {u.date}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[10px] tracking-wider uppercase font-semibold border"
                          style={{
                            backgroundColor: tone.bg,
                            color: tone.fg,
                            borderColor: `${tone.fg}20`,
                          }}
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse"
                            style={{ backgroundColor: tone.fg }}
                          />
                          {u.category}
                        </span>
                      </div>
                      <div className="md:col-span-6 min-w-0">
                        <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", lineHeight: 1.3, fontWeight: 500 }}>
                          {u.title}
                        </div>
                        <p className="mt-1 text-neutral-700 text-[15px]" style={{ lineHeight: 1.55 }}>
                          {u.excerpt}
                        </p>
                      </div>
                      <div className="md:col-span-1 md:justify-self-end">
                        {u.category === "Recap" ? (
                          <span
                            className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-110"
                            style={{ backgroundColor: BRAND }}
                          >
                            <Play size={13} fill="currentColor" className="translate-x-[1px]" />
                          </span>
                        ) : (
                          <ArrowUpRight
                            size={18}
                            className="text-neutral-400 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Page composition — four sections, each answering a single delegate
// question. Newsletter + Footer come from the Root layout.
// ---------------------------------------------------------------------------

export default function Home() {
  return (
    <>
      <Hero />
      <CountdownAndActions />
      <TheRoom />
      <WhatsNew />
    </>
  );
}
