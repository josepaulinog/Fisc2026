import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Download, Mic, Minus, Plus } from "lucide-react";
import { PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_AGENDA, INK, TAG_HUES, agenda, daySlugFor } from "../data";
import { chipTone } from "../tokens";
import type { Session } from "../data";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";

// 12h-with-AM/PM → 24h zero-padded "08:45 – 09:30". Conference data is
// authored in 12h for readability; display normalises to 24h so each row's
// time column has a consistent character width.
function to24(t: string): string {
  const m = t.match(/^(\d+):(\d+)\s*(AM|PM)$/i);
  if (!m) return t;
  let h = parseInt(m[1], 10);
  const min = m[2];
  const isPM = m[3].toUpperCase() === "PM";
  if (h === 12) h = isPM ? 12 : 0;
  else if (isPM) h += 12;
  return `${String(h).padStart(2, "0")}:${min}`;
}
function fmtTime(time: string): string {
  return time.split(" – ").map(to24).join(" – ");
}
function fmtTimeShort(time: string): string {
  // First time only, for day header range.
  return to24(time.split(" – ")[0] ?? time);
}

export default function Agenda() {
  const [active, setActive] = useState(1);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const current = agenda[active];
  const currentSlug = daySlugFor(current);

  // Day header strip: first time → last time of the day. Used in the meta
  // line above the session list ("08:45 → 22:00").
  const dayStats = useMemo(() => {
    const sessions = current.sessions;
    const first = sessions[0]?.time ?? "—";
    const last = sessions[sessions.length - 1]?.time ?? "—";
    const lastEnd = last.split(" – ")[1] ?? last;
    return {
      firstStart: fmtTimeShort(first),
      lastEnd: to24(lastEnd),
      count: sessions.length,
    };
  }, [current]);

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

      {/* Dark day-tabs band — sits flush against the hero so the day picker
          reads as part of the hero's dark surface, not as a separate widget
          on the cream content area below. Horizontal scroll on narrow
          viewports, full row visible on desktop. Active tab fills brand
          orange; inactive tabs sit on a low-opacity glass surface with a
          hairline ring. */}
      <section
        className="relative pt-3 md:pt-4 pb-7 md:pb-10"
        style={{ backgroundColor: INK }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex gap-2 md:gap-3 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity scrollbar-hide pb-1">
            {agenda.map((d, i) => {
              const isActive = i === active;
              return (
                <button
                  key={d.label}
                  onClick={() => selectDay(i)}
                  aria-pressed={isActive}
                  className={`snap-start shrink-0 px-4 md:px-5 py-2.5 md:py-3 rounded-sm text-left transition-fluid will-change-transform ${
                    isActive
                      ? "shadow-[0_8px_24px_-10px_rgba(253,107,24,0.55)]"
                      : "ring-1 ring-white/10 hover:ring-white/25 hover:bg-white/[0.06]"
                  }`}
                  style={
                    isActive
                      ? {
                          backgroundColor: BRAND,
                          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 8px 24px -10px rgba(253,107,24,0.55)",
                        }
                      : { backgroundColor: "rgba(255,255,255,0.04)" }
                  }
                >
                  <div
                    className={`uppercase ${isActive ? "text-white/85" : "text-white/55"}`}
                    style={{ fontSize: "0.6875rem", letterSpacing: "0.22em", fontWeight: 500 }}
                  >
                    {d.short.toUpperCase()}
                  </div>
                  <div
                    className={`mt-0.5 tabular-nums ${isActive ? "text-white" : "text-white/85"}`}
                    style={{ fontSize: "0.9375rem", lineHeight: 1.2, fontWeight: 400 }}
                  >
                    {d.date}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section
        className="py-10 md:py-16 relative overflow-hidden"
        style={{ backgroundColor: "#f6f4ef" }}
      >
        <div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-[0.07] blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{ backgroundColor: BRAND }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          {/* Day header strip — folds the previous "day at a glance" line
              and the "Download programme" CTA into a single row. Brand-orange
              dot eyebrow, day label, date, sessions count, time range; CTA
              on the right. */}
          <div className="flex flex-wrap items-start md:items-center justify-between gap-4 md:gap-6 mb-6 md:mb-8 pb-5 md:pb-6 border-b border-neutral-200/70">
            <div className="flex flex-wrap items-center gap-x-4 md:gap-x-6 gap-y-2 text-[0.8125rem] md:text-sm">
              <span className="inline-flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: BRAND }}
                />
                <span
                  className="text-neutral-950 uppercase"
                  style={{ fontSize: "0.6875rem", letterSpacing: "0.22em", fontWeight: 600 }}
                >
                  {current.short.toUpperCase()}
                </span>
              </span>
              <span className="text-neutral-700 tabular-nums">{current.date}</span>
              <span className="text-neutral-300 hidden sm:inline">·</span>
              <span className="text-neutral-700 hidden sm:inline">
                {dayStats.count} {dayStats.count === 1 ? "session" : "sessions"}
              </span>
              <span className="text-neutral-300 hidden sm:inline">·</span>
              <span className="text-neutral-700 hidden sm:inline tabular-nums">
                {dayStats.firstStart} → {dayStats.lastEnd}
              </span>
            </div>
            <NestedCTA
              href="#"
              variant="ink"
              icon={<Download size={13} strokeWidth={1.75} />}
            >
              Download programme
            </NestedCTA>
          </div>

          {/* Sessions */}
          <motion.ul
            key={current.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="space-y-2.5 md:space-y-3"
          >
            {current.sessions.map((s, i) => {
              const key = `${current.label}-${i}`;
              const isExpanded = expandedKey === key;
              const hasSpeakers = !!(s.speakers && s.speakers.length > 0);
              const hasExpansion =
                hasSpeakers || !!s.briefing || (!!s.takeaways && s.takeaways.length > 0);
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
          </motion.ul>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Session row.
//   - Soft moment (Break, Lunch, Group Photo, etc.): no tag, no speakers,
//     no briefing → renders as a flat muted row with just time + title. Not
//     clickable, no card chrome, no expand button.
//   - Programme session: white card with time column on the left + title /
//     description / tag chip / speaker line in the centre + expand button
//     on the right. The entire card is the hit target (per the design
//     review's "the + is a hint, not the hit target" feedback). Expanded
//     state reveals the briefing text + a link to the canonical detail
//     route via the same grid-template-rows 0fr → 1fr GPU-clean motion the
//     rest of the site uses.
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
    return (
      <li className="flex items-center gap-5 md:gap-8 px-5 md:px-7 py-3 md:py-3.5">
        <div
          className="shrink-0 w-[100px] md:w-[130px] tabular-nums text-neutral-400"
          style={{ fontSize: "0.875rem", lineHeight: 1.25, fontWeight: 500 }}
        >
          {fmtTime(session.time)}
        </div>
        <div className="text-neutral-500" style={{ fontSize: "0.9375rem" }}>
          {session.title}
        </div>
      </li>
    );
  }

  const tagTone = session.tag ? chipTone(TAG_HUES[session.tag]) : undefined;
  const speakerLine = hasSpeakers
    ? session.speakers!.map((sp) => sp.name).join(", ")
    : null;

  return (
    <li className="rounded-md bg-white ring-1 ring-black/[0.05] shadow-[0_4px_18px_-12px_rgba(0,0,0,0.1)] transition-fluid hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.16)] overflow-hidden">
      <div
        role={hasExpansion ? "button" : undefined}
        tabIndex={hasExpansion ? 0 : undefined}
        aria-expanded={hasExpansion ? expanded : undefined}
        onClick={hasExpansion ? onToggle : undefined}
        onKeyDown={
          hasExpansion
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onToggle();
                }
              }
            : undefined
        }
        className={`p-5 md:p-7 flex items-start gap-4 md:gap-6 ${
          hasExpansion ? "cursor-pointer" : ""
        }`}
      >
        {/* Time column */}
        <div
          className="shrink-0 w-[90px] md:w-[120px] tabular-nums text-neutral-900 pt-0.5"
          style={{ fontSize: "0.875rem", lineHeight: 1.3, fontWeight: 600 }}
        >
          {fmtTime(session.time)}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0">
          <h3
            className="tracking-tight text-neutral-950"
            style={{ fontSize: "1.0625rem", lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.005em" }}
          >
            {session.title}
          </h3>
          {session.desc && (
            <p
              className="mt-2 text-neutral-700"
              style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}
            >
              {session.desc.length > 200
                ? session.desc.slice(0, 200).trimEnd() + "…"
                : session.desc}
            </p>
          )}

          {session.tag && tagTone && (
            <div className="mt-3">
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-sm uppercase"
                style={{
                  backgroundColor: tagTone.bg,
                  color: tagTone.fg,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  fontWeight: 500,
                }}
              >
                {session.tag}
              </span>
            </div>
          )}

          {speakerLine && (
            <div className="mt-3 flex items-center gap-2 text-neutral-500" style={{ fontSize: "0.875rem" }}>
              <Mic size={12} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
              <span className="truncate">{speakerLine}</span>
            </div>
          )}

          {/* Expanded panel — briefing text + link to canonical detail
              route. grid-template-rows: 0fr → 1fr is GPU-clean. */}
          <AnimatePresence initial={false}>
            {expanded && hasExpansion && (
              <motion.div
                initial={{ opacity: 0, gridTemplateRows: "0fr" }}
                animate={{ opacity: 1, gridTemplateRows: "1fr" }}
                exit={{ opacity: 0, gridTemplateRows: "0fr" }}
                transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                className="grid"
              >
                <div className="overflow-hidden mt-5 pt-5 border-t border-neutral-100">
                  {session.briefing ? (
                    <p
                      className="text-neutral-700"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.65 }}
                    >
                      {session.briefing}
                    </p>
                  ) : (
                    <p
                      className="text-neutral-700"
                      style={{ fontSize: "0.9375rem", lineHeight: 1.65 }}
                    >
                      {session.desc}{" "}
                      <span className="text-neutral-500">
                        A full briefing including takeaways, references and
                        related materials is available on the session page.
                      </span>
                    </p>
                  )}
                  <Link
                    to={detailPath}
                    onClick={(e) => e.stopPropagation()}
                    className="group/link mt-4 inline-flex items-center gap-2 text-neutral-950 underline underline-offset-4 decoration-1 transition-fluid hover:gap-3"
                    style={{ fontSize: "0.9375rem", fontWeight: 500 }}
                  >
                    Open the full briefing
                    <BracketArrow
                      size={11}
                      strokeWidth={1.75}
                      className="transition-fluid group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 no-underline"
                    />
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Expand button — visual affordance only; the whole card is the
            hit target. Stays at the top-right of the card, lined up with
            the time column. */}
        {hasExpansion && (
          <span
            aria-hidden="true"
            className="shrink-0 mt-0.5 w-9 h-9 rounded-sm bg-neutral-100 group-hover:bg-neutral-200 flex items-center justify-center text-neutral-500 transition-fluid"
          >
            {expanded ? (
              <Minus size={14} strokeWidth={1.75} />
            ) : (
              <Plus size={14} strokeWidth={1.75} />
            )}
          </span>
        )}
      </div>
    </li>
  );
}

// Suppress unused-import warning for BRAND_SOFT (kept for future use).
void BRAND_SOFT;
