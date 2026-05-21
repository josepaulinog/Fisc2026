import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Download, MapPin, Minus, Plus } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GradientText, PageHero, SectionLabel } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_AGENDA, TAG_HUES, agenda, daySlugFor } from "../data";
import { chipTone } from "../tokens";
import type { Session } from "../data";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";

export default function Agenda() {
  const [active, setActive] = useState(1);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const current = agenda[active];
  const currentSlug = daySlugFor(current);

  // Anchor strip — peripheral signal for the active day. First / last time,
  // total sessions, headline tag list. Kept compact below the day tabs.
  const dayStats = useMemo(() => {
    const sessions = current.sessions;
    const first = sessions[0]?.time ?? "—";
    const last = sessions[sessions.length - 1]?.time ?? "—";
    const tags = Array.from(new Set(sessions.map((s) => s.tag).filter(Boolean))) as string[];
    return { first, last, count: sessions.length, tags };
  }, [current]);

  // Switch days resets any open expanded session so the user lands on a fresh
  // collapsed list.
  const selectDay = (i: number) => {
    setActive(i);
    setExpandedKey(null);
  };

  return (
    <>
      <PageHero
        label="Programme"
        title={
          <>
            Four days.
            <br />
            One PFM agenda.
          </>
        }
        subtitle="Country-led workshops, presentations and panels — alongside cultural moments across Trinidad and Tobago."
        image={HERO_AGENDA}
      />
      <section className="py-14 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#f6f4ef" }}>
        <div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-[0.07] blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ backgroundColor: BRAND }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          {/* Lead text + download CTA */}
          <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
            <p className="text-neutral-700 max-w-2xl">
              Choose a day to explore the full programme. Expand any session for
              speakers and quick context — or open it for the full briefing.
            </p>
            <NestedCTA
              href="#"
              variant="ghost"
              icon={<Download size={15} strokeWidth={1.5} />}
            >
              Download programme
            </NestedCTA>
          </div>

          {/* Mobile: horizontal day tabs strip (unchanged). Hidden on lg+. */}
          <div className="lg:hidden flex gap-2 mb-4 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity pb-2 -mx-5 px-5 scrollbar-hide [scroll-padding-inline:1.25rem]">
            {agenda.map((d, i) => {
              const isActive = i === active;
              return (
                <button
                  key={d.label}
                  onClick={() => selectDay(i)}
                  className={`snap-start shrink-0 px-4 py-3 rounded-sm border transition-all text-left ${
                    isActive
                      ? "bg-neutral-900 border-neutral-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_3px_10px_-4px_rgba(0,0,0,0.18)]"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  <div className={`tracking-tight ${isActive ? "text-white" : "text-neutral-950"}`} style={{ fontSize: "1rem" }}>{d.short}</div>
                  <div className={`text-xs mt-0.5 ${isActive ? "text-white/60" : "text-neutral-500"}`}>{d.date}</div>
                </button>
              );
            })}
          </div>

          {/* Day at a glance — peripheral signal strip below the tabs (mobile)
              or above the session list (desktop). Same compact rhythm as
              before. */}
          <motion.div
            key={`stats-${current.label}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="mb-6 md:mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 px-1 text-sm text-neutral-700"
          >
            <span className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
              <span className="text-neutral-500 tracking-[0.18em] uppercase text-[10.5px]" style={{ fontWeight: 500 }}>Day at a glance</span>
            </span>
            <span className="text-neutral-800 tabular-nums">
              {dayStats.first}<span className="text-neutral-400 mx-1.5">→</span>{dayStats.last}
            </span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-800">{dayStats.count} sessions</span>
            {/* Tag chips removed from the day-at-a-glance strip — they
                duplicated the per-session chips below. The peripheral
                signal stays: first/last time + count. */}
          </motion.div>

          {/* Desktop split: vertical day tabs on the left, session list on
              the right. Below lg the left column collapses (the horizontal
              tabs above carry the day selection). */}
          <div className="grid lg:grid-cols-[88px_1fr] gap-4 md:gap-6 items-start">
            {/* Vertical day tabs — desktop only. Each tab is a tall pill with
                the day label rotated 90° (writing-mode: vertical-rl + 180°
                rotation reads bottom-to-top). Active tab is the ink chip
                (matches the rest of the site's active treatment); inactive
                tabs are warm-tinted on the cream background so they don't
                punch holes in the surface. Sticks to the viewport on scroll
                so the day selector is always reachable. */}
            <div className="hidden lg:flex flex-col gap-2 lg:sticky lg:top-[100px]">
              {agenda.map((d, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={d.label}
                    onClick={() => selectDay(i)}
                    aria-pressed={isActive}
                    className={`group relative w-full rounded-sm border transition-fluid will-change-transform py-7 px-2 flex items-center justify-center ${
                      isActive
                        ? "bg-neutral-900 border-neutral-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_3px_10px_-4px_rgba(0,0,0,0.18)]"
                        : "bg-white/60 border-neutral-200 text-neutral-700 hover:bg-white hover:border-neutral-400 hover:text-neutral-950"
                    }`}
                  >
                    <span
                      className="inline-flex flex-col items-center gap-1.5 tracking-wide"
                      style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
                    >
                      <span style={{ fontSize: "0.875rem", fontWeight: 600, letterSpacing: "-0.01em" }}>
                        {d.short}
                      </span>
                      <span className={`text-[10.5px] tracking-[0.18em] uppercase ${isActive ? "text-white/65" : "text-neutral-400"}`} style={{ fontWeight: 500 }}>
                        {d.date.split(",")[0]}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Session list — animated swap on day change. */}
            <motion.div
              key={current.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
              className="rounded-md bg-white ring-1 ring-black/[0.05] overflow-hidden"
            >
              {/* Thin context strip — replaces the previous big gradient
                  header card. The vertical day tab already announces the day,
                  so this is just a meta line. */}
              <div className="px-5 md:px-8 py-3.5 border-b border-neutral-100 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[0.8125rem] text-neutral-500">
                <span className="text-neutral-900 tracking-tight" style={{ fontWeight: 500 }}>
                  {current.label}
                </span>
                <span className="text-neutral-300">·</span>
                <span>{current.date}</span>
                <span className="text-neutral-300 hidden sm:inline">·</span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <MapPin size={12} strokeWidth={1.5} className="text-neutral-400" />
                  Port of Spain
                </span>
                <span className="text-neutral-300 hidden sm:inline">·</span>
                <span className="hidden sm:inline">{current.sessions.length} sessions</span>
              </div>

              {/* Sessions */}
              <ul>
                {current.sessions.map((s, i) => {
                  const key = `${current.label}-${i}`;
                  const isExpanded = expandedKey === key;
                  const hasSpeakers = !!(s.speakers && s.speakers.length > 0);
                  const hasExpansion = hasSpeakers || (!!s.briefing) || (!!s.takeaways && s.takeaways.length > 0);
                  return (
                    <SessionRow
                      key={key}
                      session={s}
                      expanded={isExpanded}
                      hasExpansion={hasExpansion}
                      hasSpeakers={hasSpeakers}
                      onToggle={() => setExpandedKey(isExpanded ? null : key)}
                      detailPath={`/agenda/${currentSlug}/${i}`}
                    />
                  );
                })}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Session row — collapsed state shows time pill + tag + title + description.
// Expanded state reveals speakers + a "View full briefing" link to the
// canonical detail route. Soft moments (no tag, no speakers, no briefing)
// render as compact rows with no expand affordance.
// ---------------------------------------------------------------------------

function SessionRow({
  session,
  expanded,
  hasExpansion,
  hasSpeakers,
  onToggle,
  detailPath,
}: {
  session: Session;
  expanded: boolean;
  hasExpansion: boolean;
  hasSpeakers: boolean;
  onToggle: () => void;
  detailPath: string;
}) {
  const isSoft = !session.tag && !hasSpeakers && !session.briefing;

  if (isSoft) {
    // Soft moment — Break, Lunch, Group Photo, etc. No expand button.
    return (
      <li>
        <Link
          to={detailPath}
          className="group flex items-center gap-3 md:gap-6 px-5 md:px-8 py-3 md:py-3.5 border-t first:border-t-0 border-neutral-100 transition-fluid hover:bg-neutral-50/60"
        >
          <TimePill time={session.time} muted />
          <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
          <span className="tracking-tight text-neutral-700 truncate" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>
            {session.title}
          </span>
        </Link>
      </li>
    );
  }

  return (
    <li className="border-t first:border-t-0 border-neutral-100">
      <div className="px-5 md:px-8 py-5 md:py-6">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            {/* Time pill + tag chip */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-3">
              <TimePill time={session.time} />
              {session.tag && (
                <span
                  className="inline-flex items-center text-[13px] tracking-tight"
                  style={{ color: chipTone(TAG_HUES[session.tag]).fg, fontWeight: 500 }}
                >
                  #{session.tag}
                </span>
              )}
            </div>

            {/* Title */}
            <h3
              className="tracking-tight text-neutral-950"
              style={{ fontSize: "clamp(1.0625rem, 1.5vw, 1.3rem)", lineHeight: 1.25, fontWeight: 600, letterSpacing: "-0.01em" }}
            >
              {session.title}
            </h3>

            {/* Description */}
            {session.desc && (
              <p
                className="mt-2.5 text-neutral-700 text-[0.9375rem] md:text-base"
                style={{ lineHeight: 1.6 }}
              >
                {session.desc.length > 180 ? session.desc.slice(0, 180).trimEnd() + "…" : session.desc}
              </p>
            )}

            {/* Expanded panel — speakers + "view full" link.
                Animates via grid-template-rows 0fr → 1fr (a single GPU-friendly
                track-size change) instead of height: 0 → auto. No layout
                thrash, no per-frame measurement, no JS-driven height
                interpolation. The inner div is overflow-hidden so the row
                track clips content during the transition. */}
            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, gridTemplateRows: "0fr" }}
                  animate={{ opacity: 1, gridTemplateRows: "1fr" }}
                  exit={{ opacity: 0, gridTemplateRows: "0fr" }}
                  transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                  className="grid"
                >
                  <div className="overflow-hidden mt-5 pt-5 border-t border-neutral-100">
                    {hasSpeakers && (
                      <>
                        <SectionLabel>Speakers</SectionLabel>
                        <div className="flex flex-wrap gap-x-5 md:gap-x-6 gap-y-3 -mt-1">
                          {session.speakers!.map((sp) => (
                            <div key={sp.name} className="flex items-center gap-2.5 md:gap-3">
                              {sp.img ? (
                                <ImageWithFallback
                                  src={sp.img}
                                  alt={sp.name}
                                  className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover bg-neutral-100 shrink-0"
                                />
                              ) : (
                                <div
                                  className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-neutral-100 ring-1 ring-neutral-200 shrink-0"
                                  style={{ color: BRAND, fontSize: "0.7rem", letterSpacing: "0.05em", fontWeight: 600 }}
                                >
                                  FB
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="text-neutral-950 truncate text-[0.9375rem] md:text-base" style={{ lineHeight: 1.2, fontWeight: 500 }}>
                                  {sp.name}
                                </div>
                                {sp.role && <div className="text-neutral-500 text-[0.8125rem] md:text-sm truncate">{sp.role}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    <Link
                      to={detailPath}
                      className="group/link mt-5 inline-flex items-center gap-2 text-[0.9375rem] text-neutral-950 transition-fluid hover:gap-3"
                      style={{ fontWeight: 500 }}
                    >
                      View full briefing
                      <BracketArrow
                        size={11}
                        strokeWidth={1.75}
                        className="transition-fluid group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                      />
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Expand button */}
          {hasExpansion && (
            <button
              type="button"
              onClick={onToggle}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse session" : "Expand session"}
              className="shrink-0 mt-1 w-9 h-9 rounded-sm border border-neutral-200 flex items-center justify-center text-neutral-500 hover:border-neutral-950 hover:text-neutral-950 transition-fluid"
            >
              {expanded ? (
                <Minus size={14} strokeWidth={1.75} />
              ) : (
                <Plus size={14} strokeWidth={1.75} />
              )}
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

// ---------------------------------------------------------------------------
// Time pill — soft brand-tinted chip with clock icon. Mirrors the reference
// design's blue-tinted time pill, but pulled into FISC's brand-orange palette
// so it connects to the homepage countdown's "time is brand-orange" mental
// model. Muted variant for soft moments where the time is metadata, not
// emphasis.
// ---------------------------------------------------------------------------

function TimePill({ time, muted = false }: { time: string; muted?: boolean }) {
  if (muted) {
    return (
      <span
        className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-sm text-[0.8125rem] tabular-nums text-neutral-700 bg-neutral-100"
        style={{ fontWeight: 500 }}
      >
        <Clock size={11} strokeWidth={1.75} className="text-neutral-400" />
        {time}
      </span>
    );
  }
  return (
    <span
      className="shrink-0 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-[0.8125rem] md:text-[13px] tabular-nums"
      style={{
        backgroundColor: `${BRAND}12`,
        color: BRAND,
        fontWeight: 500,
      }}
    >
      <Clock size={12} strokeWidth={1.75} />
      {time}
    </span>
  );
}

// Suppress unused-import warning for BRAND_SOFT (retained for future use
// in the vertical day-tab color system).
void BRAND_SOFT;
