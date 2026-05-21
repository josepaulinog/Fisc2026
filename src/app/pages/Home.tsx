import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Lock,
  Play,
  Sun,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { CountryFlag } from "../components/CountryFlag";
import { Grain, GradientText, Marquee, SectionLabel } from "../components/shared";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BezelCard } from "../components/ui/BezelCard";
import { TYPE, TRACKING } from "../tokens";
import { useAuth } from "../auth";
import { useChecklist } from "../checklist";
import { firstNameOf } from "../profile";
import {
  BRAND,
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
        {prefersReducedMotion ? (
          <ImageWithFallback src={HERO_IMG} alt="Caribbean coast" className="w-full h-full object-cover opacity-50" />
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
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 80% 10%, ${BRAND}55 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #00000099 0%, transparent 60%), linear-gradient(180deg, ${INK} 0%, transparent 30%, ${INK}cc 100%)`,
        }}
      />
      <Grain />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-12 pb-8 md:pt-24 md:pb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded border border-white/20 bg-white/5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: BRAND }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: BRAND }} />
            </span>
            <span className="tracking-[0.2em] md:tracking-[0.25em] text-white/90 text-xs md:text-sm">
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

        <div className="mt-10 md:mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <p className="text-white/78 max-w-xl" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.55 }}>
              The FreeBalance International Steering Committee sails to Port of Spain — four
              days of country-led reform, co-creation and conversation under Caribbean skies.
              The 2026 delegate list is closed.
            </p>
            {/* Hero CTA — single intentional moment. The "Watch FISC 2025"
                button used to live here, but the hero footage was already
                FISC 2025 content; doubling up made the page look retrospective.
                The recap link now lives in the What's New rail below. */}
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <NestedCTA
                to="/sign-in"
                variant="brand"
                icon={<ArrowRight size={15} strokeWidth={1.75} />}
              >
                Delegate portal
              </NestedCTA>
            </div>
            <div className="mt-5 md:mt-6 inline-flex items-center gap-2 text-white/65 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              Invitation only · Hosted by FreeBalance & the Government of Trinidad and Tobago
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

  const diff = Math.max(0, EVENT_START.getTime() - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hrs = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);

  // First five pre-arrival actions, ordered by deadline upstream in data.ts.
  // Signed-in delegates can tick them off; state is persisted per-user via
  // useChecklist and shared with the full checklist on /delegate-guide.
  const actions = delegateGuide.checklist.slice(0, 5);
  const totalActions = delegateGuide.checklist.length;
  const completedCount = isAuthed ? checked.size : 0;

  // Live deadline label per action — computed against the same `now` that
  // drives the countdown above, so the whole section pulses on one heartbeat.
  // Wrapped in `new Date(now)` because formatDeadline takes a Date object.
  const nowDate = new Date(now);
  const deadlineToneClasses: Record<DeadlineTone, string> = {
    overdue: "bg-red-50 text-red-700",
    soon: "bg-orange-50 text-orange-700",
    future: "bg-neutral-100 text-neutral-600",
  };

  const firstName = user ? firstNameOf(user.name) : null;

  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#f6f4ef" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
          {/* Countdown */}
          <div className="lg:col-span-7">
            <SectionLabel>{firstName ? `Hi, ${firstName}` : "The countdown"}</SectionLabel>

            <h2
              className="tracking-[-0.025em] text-neutral-950"
              style={{ fontSize: TYPE.h1, lineHeight: 0.98, letterSpacing: TRACKING.tight }}
            >
              {isAuthed ? "Trinidad in" : "FISC opens in"}{" "}
              <span className="tabular-nums" style={{ color: BRAND }}>{days}</span>{" "}
              <em className="italic text-neutral-500" style={{ fontSize: "0.5em", fontWeight: 400 }}>
                days
              </em>
            </h2>

            {/* HH · MM · SS ticker — restructured as a 3-column grid with the
                label stacked beneath each digit pair, divided by hairline
                rules. Previous inline form fused the digits + abbreviation
                into a single visual blob that didn't read as a structured
                clock. Now each unit is its own cell. */}
            <div
              className="mt-7 inline-grid grid-cols-3 gap-x-6 md:gap-x-10 text-neutral-950 tabular-nums"
              aria-live="off"
              aria-label="Time remaining"
            >
              {[
                { v: pad2(hrs), l: "Hours" },
                { v: pad2(mins), l: "Minutes" },
                { v: pad2(secs), l: "Seconds" },
              ].map((t, i) => (
                <div
                  key={t.l}
                  className={`flex flex-col items-start ${i > 0 ? "pl-6 md:pl-10 border-l border-neutral-200" : ""}`}
                >
                  <span
                    className="tracking-tight tabular-nums"
                    style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: 500, lineHeight: 1, letterSpacing: TRACKING.tight }}
                  >
                    {t.v}
                  </span>
                  <span
                    className="mt-2 text-neutral-500 uppercase"
                    style={{ fontSize: "0.6875rem", letterSpacing: TRACKING.widestNarrow, fontWeight: 500 }}
                  >
                    {t.l}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-8 text-neutral-600 max-w-md" style={{ lineHeight: 1.65 }}>
              Mon Jun 29 — Thu Jul 2, 2026 · Port of Spain. The four-day programme
              kicks off with opening remarks from the host country at the Hyatt
              Regency, then runs without intermission.
            </p>

            {/* Next milestone — ties the column height to the action queue card
                on the right by pulling the first non-overdue checklist item.
                Reads as the natural next thing to do after the date strap. */}
            {(() => {
              const next = delegateGuide.checklist.find(
                (c) => new Date(c.dueDate).getTime() > nowDate.getTime(),
              );
              if (!next) return null;
              const d = formatDeadline(next.dueDate, nowDate);
              return (
                <div className="mt-6 inline-flex items-center gap-3 px-4 py-2.5 rounded border border-neutral-300 bg-white text-sm">
                  <span className="tracking-[0.22em] uppercase text-neutral-500 text-xs">
                    Next milestone
                  </span>
                  <span className="w-px h-3 bg-neutral-300" />
                  <span className="text-neutral-950 tracking-tight">{next.shortLabel}</span>
                  <span className="text-neutral-400">·</span>
                  <span className="text-neutral-600 lowercase">{d.label}</span>
                </div>
              );
            })()}
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
                  <ArrowUpRight size={15} strokeWidth={1.75} className="transition-fluid group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              </div>
              </BezelCard>
            </motion.div>
          </div>
        </div>
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
  // Eight countries — the Marquee strip above already cycles through the
  // full 40+ list, so the Room's purpose is a deliberate scannable read.
  const publicCountries = countries.slice(0, 8);
  const visibleDelegates = attendees.slice(0, 12);
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
            <SectionLabel>The room</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: TYPE.h2, lineHeight: 1.05, letterSpacing: TRACKING.snug }}>
              Who's in <em className="italic">the room.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <p className="text-neutral-600 max-w-md" style={{ lineHeight: 1.65 }}>
              The Government of Trinidad &amp; Tobago hosts FISC 2026, anchored by
              300+ delegates from 40+ countries.
              {!isAuthed && " Sign in to see who's coming and find your counterparts."}
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 mb-14 md:mb-16">
              {hosts.map((h, i) => (
                <motion.article
                  key={h.name}
                  initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
                  whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative overflow-hidden rounded-md bg-white ring-1 ring-black/[0.05] shadow-[0_12px_40px_-20px_rgba(0,0,0,0.18)] transition-fluid hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.22)]"
                >
                  {/* Horizontal layout — photo column (40% via 2fr/3fr split)
                      on the left, info column vertically centred against the
                      photo's height on the right. Reads as executive press
                      portraits, not billboards — tighter vertical footprint
                      while preserving the protocol-grade architectural feel. */}
                  <div className="grid grid-cols-[2fr_3fr]">
                    <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden">
                      {h.img ? (
                        <ImageWithFallback
                          src={h.img}
                          alt={h.name}
                          className="absolute inset-0 w-full h-full object-cover transition-fluid group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center text-white tracking-tight"
                          style={{ backgroundColor: BRAND, fontSize: "2.5rem", fontWeight: 500 }}
                        >
                          {h.name.split(" ").slice(0, 2).map((p) => p[0]).join("")}
                        </div>
                      )}
                      <div className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 px-2 py-1 rounded-sm bg-white/90 backdrop-blur-sm ring-1 ring-black/[0.06]">
                        <CountryFlag
                          country={h.country}
                          className="h-2.5 w-auto rounded-[1px] shadow-sm shrink-0 ring-1 ring-black/[0.05]"
                        />
                        <span className="text-[10px] tracking-wide text-neutral-800" style={{ fontWeight: 500 }}>
                          {h.country}
                        </span>
                      </div>
                    </div>

                    <div className="px-6 py-6 md:px-8 md:py-8 flex flex-col justify-center">
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
            </div>
          </>
        )}

        {/* Visiting delegations — flag mosaic (signed-out) or faces (signed-in) */}
        <div className="mb-5 text-xs tracking-[0.25em] uppercase text-neutral-500">
          {isAuthed ? "And the delegation" : "Joined by"}
        </div>

        {isAuthed ? (
          // Faces — signed-in delegates only. Country flag floats in the
          // corner of each portrait so the eye can scan for region.
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 md:gap-4">
            {visibleDelegates.map((a, i) => (
              <motion.div
                key={`${a.name}-${i}`}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.04 }}
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
                    <div
                      className="absolute inset-0 flex items-center justify-center text-white tracking-tight"
                      style={{ backgroundColor: BRAND, fontSize: "1.5rem", fontWeight: 500 }}
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
          </div>
        ) : (
          // Flag mosaic — no faces, no names. The gate stays intact. Eight
          // flags in a single row on desktop, 4×2 on mobile. Each cell now
          // has roughly 2× the horizontal space it had at 16 flags, so the
          // flag itself scales up (h-10 → h-16) to fill the room and read
          // as a deliberate directory rather than a token strip.
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6">
            {publicCountries.map((c, i) => (
              <motion.div
                key={c}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 8) * 0.04 }}
                className="flex flex-col items-center text-center"
              >
                <CountryFlag
                  country={c}
                  className="h-10 md:h-16 w-auto rounded shadow-sm ring-1 ring-black/5"
                />
                <div className="mt-3 text-neutral-700 text-sm tracking-tight truncate w-full">
                  {c}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 md:mt-10 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex items-center gap-2 text-neutral-600 text-sm">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
            {isAuthed
              ? "Updated daily by the secretariat"
              : <><span className="tabular-nums">300+ confirmed</span> · sign in to see the room</>}
          </div>
          <NestedCTA
            to={isAuthed ? "/attendees" : "/sign-in?return=/attendees"}
            variant="ink"
            prefixIcon={!isAuthed ? <Lock size={13} strokeWidth={1.75} /> : undefined}
            icon={<ArrowUpRight size={14} strokeWidth={1.75} />}
          >
            {isAuthed ? "See the full delegation" : "Sign in to see the room"}
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
    title: "Prime Minister Persad-Bissessar joins as host",
    excerpt: "The Hon. Kamla Persad-Bissessar confirmed for the opening remarks alongside Minister Tancoo.",
    to: "/speakers/kamla-persad-bissessar",
  },
  {
    date: "Apr 28, 2026",
    category: "Materials",
    title: "Four new FISC Takeaways uploaded",
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
    title: "Watch the FISC 2025 highlight reel",
    excerpt: "Twelve minutes of last year's gathering in Dili — opening remarks, workshop floors, and the closing roadmap vote.",
    to: "/videos",
  },
];

const CATEGORY_TONES: Record<SiteUpdate["category"], { bg: string; fg: string }> = {
  Programme: { bg: "#fd6b1815", fg: "#c64b00" },
  Logistics: { bg: "#2563eb15", fg: "#1e40af" },
  "Host country": { bg: "#16a34a15", fg: "#0f6b34" },
  Materials: { bg: "#a855f715", fg: "#6b21a8" },
  Recap: { bg: "#dc262615", fg: "#991b1b" },
};

function WhatsNew() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#f6f4ef" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-end mb-10 md:mb-14">
          <div className="lg:col-span-6">
            <SectionLabel>Latest updates</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: TYPE.h2, lineHeight: 1.05, letterSpacing: TRACKING.snug }}>
              What's <em className="font-display italic">new.</em>
            </h2>
          </div>
          <div className="lg:col-span-6 lg:pb-2">
            <p className="text-neutral-600 max-w-md" style={{ lineHeight: 1.65 }}>
              The secretariat posts here weekly with programme changes, host
              announcements and material drops. Bookmark if you're checking
              between visits.
            </p>
          </div>
        </div>

        <div className="space-y-3 md:space-y-4">
          {SITE_UPDATES.map((u, i) => {
            const tone = CATEGORY_TONES[u.category];
            return (
              <motion.div
                key={u.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 4) * 0.05 }}
              >
                <Link
                  to={u.to}
                  className="group grid md:grid-cols-12 gap-3 md:gap-6 items-start md:items-center rounded-md border border-neutral-200 bg-white p-5 md:p-6 hover:border-neutral-950 transition"
                >
                  <div className="md:col-span-3 flex items-center gap-3">
                    <div className="text-xs tracking-[0.2em] uppercase text-neutral-500 shrink-0 tabular-nums">
                      {u.date}
                    </div>
                  </div>
                  <div className="md:col-span-2">
                    <span
                      className="inline-flex items-center px-2.5 py-1 rounded-sm text-xs whitespace-nowrap"
                      style={{ backgroundColor: tone.bg, color: tone.fg }}
                    >
                      {u.category}
                    </span>
                  </div>
                  <div className="md:col-span-6 min-w-0">
                    <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}>
                      {u.title}
                    </div>
                    <p className="mt-1 text-neutral-600 text-sm" style={{ lineHeight: 1.55 }}>
                      {u.excerpt}
                    </p>
                  </div>
                  <div className="md:col-span-1 md:justify-self-end">
                    {/* Recap rows get a filled play badge so they read as a
                        video CTA, not another news headline. Everything else
                        keeps the consistent arrow-up-right affordance. */}
                    {u.category === "Recap" ? (
                      <span
                        className="inline-flex items-center justify-center w-9 h-9 rounded-full text-white shadow-sm transition group-hover:scale-110"
                        style={{ backgroundColor: BRAND }}
                      >
                        <Play size={13} fill="currentColor" className="translate-x-[1px]" />
                      </span>
                    ) : (
                      <ArrowUpRight
                        size={18}
                        className="text-neutral-400 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                      />
                    )}
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
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
