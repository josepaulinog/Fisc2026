import { useMemo, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Download, Mic, Minus, Plus } from "lucide-react";
import { PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_AGENDA, TAG_HUES, agenda, daySlugFor } from "../data";
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

  // Day tabs — rendered as a PageHero slot so they live inside the dark
  // hero surface itself. Horizontal scroll with snap on narrow viewports;
  // full row visible on desktop. Negative-margin trick on the outer wrapper
  // lets the scroll track bleed to the screen edge on mobile (so the last
  // tab doesn't appear cut off by container padding) while preserving the
  // max-w-7xl alignment on desktop.
  const tabs = (
    <div className="-mx-5 md:mx-0 px-5 md:px-0 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity scrollbar-hide">
      <div className="flex gap-2 md:gap-3 pb-1 min-w-min">
        {agenda.map((d, i) => {
          const isActive = i === active;
          return (
            <button
              key={d.label}
              onClick={() => selectDay(i)}
              aria-pressed={isActive}
              className={`snap-start shrink-0 px-3.5 md:px-5 py-2.5 md:py-3 rounded-sm text-left transition-fluid will-change-transform ${
                isActive
                  ? ""
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
                style={{ fontSize: "0.625rem", letterSpacing: "0.22em", fontWeight: 500 }}
              >
                {d.short.toUpperCase()}
              </div>
              <div
                className={`mt-0.5 tabular-nums whitespace-nowrap ${
                  isActive ? "text-white" : "text-white/85"
                }`}
                style={{
                  fontSize: "clamp(0.8125rem, 2.4vw, 0.9375rem)",
                  lineHeight: 1.2,
                  fontWeight: 400,
                }}
              >
                {d.date}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

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
      >
        {tabs}
      </PageHero>

      <section
        className="py-10 md:py-16 pb-32 md:pb-40 relative overflow-hidden"
        style={{ backgroundColor: "#f6f4ef" }}
      >
        <div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-[0.07] blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none"
          style={{ backgroundColor: BRAND }}
        />
        {/* Feather the cream → INK footer transition. A 160px gradient
            strip at the section's bottom fades cream into INK so the
            hard color jump between the last soft row and the dark footer
            disappears. pointer-events-none so it doesn't intercept clicks
            on the last list items above it. */}
        <div
          className="absolute bottom-0 inset-x-0 h-32 md:h-40 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, rgba(246,244,239,0) 0%, rgba(246,244,239,0) 30%, #0a0a0a 100%)",
          }}
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
            className="space-y-1.5 md:space-y-2"
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
    // Soft rows get a small brand-orange dot prefix, matching the page
    // eyebrow style, so they read as "still part of the schedule" rather
    // than as detached text between cards. Slightly more vertical padding
    // (py-4) than before (py-3) gives them measurable presence in the
    // list — the previous treatment dropped to ~50px row height which
    // broke the rhythm against ~160px cards above and below.
    return (
      <li className="flex items-center gap-4 md:gap-8 px-5 md:px-7 py-4 md:py-4">
        <span
          aria-hidden="true"
          className="w-1 h-1 rounded-full bg-neutral-300 shrink-0"
        />
        <div
          className="shrink-0 w-[90px] md:w-[120px] tabular-nums text-neutral-500"
          style={{ fontSize: "0.8125rem", lineHeight: 1.25, fontWeight: 500, letterSpacing: "0.01em" }}
        >
          {fmtTime(session.time)}
        </div>
        <div className="text-neutral-700" style={{ fontSize: "0.9375rem", fontWeight: 500 }}>
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
    <li className="relative rounded-md bg-white ring-1 ring-black/[0.05] shadow-[0_4px_18px_-12px_rgba(0,0,0,0.1)] transition-fluid hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.16)] overflow-hidden">
      {/* Expand button — absolute top-right, anchored consistently across
          mobile (stacked layout) and desktop (row layout). Whole card is
          still the hit target; this is the affordance. Bumped contrast
          from bg-neutral-100 / text-neutral-500 to a ringed neutral-150-ish
          surface with text-neutral-700 — the previous treatment was nearly
          invisible at desktop reading distance. */}
      {hasExpansion && (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 rounded-sm bg-neutral-100 ring-1 ring-black/[0.06] flex items-center justify-center text-neutral-700 transition-fluid pointer-events-none"
        >
          {expanded ? (
            <Minus size={14} strokeWidth={1.75} />
          ) : (
            <Plus size={14} strokeWidth={1.75} />
          )}
        </span>
      )}
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
        className={`p-5 md:p-7 flex flex-col md:flex-row items-start gap-3 md:gap-6 ${
          hasExpansion ? "cursor-pointer" : ""
        } ${hasExpansion ? "pr-14 md:pr-16" : ""}`}
      >
        {/* Time — stacks above the title on mobile (the fixed 90/120px
            side column was eating most of a 360px viewport). On desktop
            it goes back to a side column for a clean grid alignment. */}
        <div
          className="md:shrink-0 md:w-[120px] tabular-nums text-neutral-900 md:pt-0.5"
          style={{ fontSize: "0.8125rem", lineHeight: 1.3, fontWeight: 600, letterSpacing: "0.01em" }}
        >
          {fmtTime(session.time)}
        </div>

        {/* Body */}
        <div className="flex-1 min-w-0 w-full">
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
      </div>
    </li>
  );
}

// Suppress unused-import warning for BRAND_SOFT (kept for future use).
void BRAND_SOFT;
