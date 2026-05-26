import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import { Download, Mic, Minus, Plus } from "lucide-react";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_AGENDA, TAG_HUES, agenda, daySlugFor } from "../data";
import { chipTone, chipAccent } from "../tokens";
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

export default function Agenda() {
  const [active, setActive] = useState(1);
  const [expandedKey, setExpandedKey] = useState<string | null>(null);
  const current = agenda[active];
  const currentSlug = daySlugFor(current);

  const selectDay = (i: number) => {
    setActive(i);
    setExpandedKey(null);
  };

  // Scroll-position-aware edge fades for the day tab rail. atStart drops the
  // left fade; atEnd drops the right fade. Without this, scrolling to Day 4
  // (last tab) made the active tab look "cut off" by the right-edge mask
  // even though there was nothing more to scroll to. Listener is rAF-throttled
  // implicitly because scroll events fire at 60fps max anyway, but {passive:
  // true} keeps the main thread free to scroll.
  const tabScrollRef = useRef<HTMLDivElement | null>(null);
  const [tabFade, setTabFade] = useState({ atStart: true, atEnd: false });
  useEffect(() => {
    const el = tabScrollRef.current;
    if (!el) return;
    const update = () => {
      // 8px tolerance: the scroll viewport has px-1 (4px) padding so
      // snap-start can land the leftmost tab at scrollLeft≈4 rather
      // than exactly 0. Plus sub-pixel rounding adds another 1–2px.
      // Using a tight threshold (<=1) flipped atStart to false and
      // applied the mid-scroll mask — which fades the leftmost tab's
      // left edge. The 8px buffer absorbs the padding-driven offset.
      const atStart = el.scrollLeft <= 8;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 8;
      setTabFade((prev) =>
        prev.atStart === atStart && prev.atEnd === atEnd
          ? prev
          : { atStart, atEnd },
      );
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Compose a mask-image gradient with the right edges fading based on
  // scroll state. Four states: at-start, mid-scroll, at-end, no-overflow.
  // none / both edges hidden produces a `linear-gradient` with no soft
  // edges (i.e. solid black) which leaves the rail unmasked.
  const tabMask = (() => {
    if (tabFade.atStart && tabFade.atEnd) return "none";
    if (tabFade.atStart)
      return "linear-gradient(to right, black 0%, black 88%, transparent 100%)";
    if (tabFade.atEnd)
      return "linear-gradient(to right, transparent 0%, black 12%, black 100%)";
    return "linear-gradient(to right, transparent 0%, black 12%, black 88%, transparent 100%)";
  })();

  // Day tabs — rendered as a PageHero slot so they live inside the dark
  // hero surface itself. Horizontal scroll with snap on narrow viewports;
  // full row visible on desktop. Negative-margin trick on the outer wrapper
  // lets the scroll track bleed to the screen edge on mobile (so the last
  // tab doesn't appear cut off by container padding) while preserving the
  // max-w-7xl alignment on desktop.
  // Day tabs — now rendered on the light cream surface above the session
  // list (was previously inside the dark PageHero slot). Active tab keeps
  // its solid brand-orange fill; inactive tabs swapped from white-glass on
  // ink to white surface + neutral hairline ring so they read on the cream.
  // On mobile, the row scrolls horizontally with a bleed-to-edge negative
  // margin so the last tab isn't cropped by container padding.
  const tabs = (
    // No more viewport bleed — the rail sits inside the section's normal
    // padding so the WELCOME tab has the same left gutter as the Download
    // CTA below it. The right-edge fade uses mask-image (applied to the
    // scroll viewport itself) rather than an overlay div, because the
    // section's brand-orange radial glow tints the cream background
    // near the right edge — an overlay gradient hardcoded to #ededed
    // looked subtly off against that gradient backdrop.
    <div className="relative flex-1 min-w-0">
      {/* py-2 on the scroll container is load-bearing: overflow-x: auto
          implicitly clips on the Y axis too, which would crop the active
          tab's brand-orange drop shadow. py gives 8px breathing room. */}
      <div
        ref={tabScrollRef}
        className="px-1 py-2 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity scrollbar-hide"
        style={{
          // Mask edges fade based on scroll position (atStart/atEnd). When
          // both ends are at the boundary (no overflow), tabMask is "none"
          // and the rail is unmasked entirely. Vendor-prefixed for older
          // Safari (still ~3% of mobile traffic).
          maskImage: tabMask,
          WebkitMaskImage: tabMask,
        }}
      >
        <div className="flex gap-1.5 md:gap-2.5 min-w-min">
          {agenda.map((d, i) => {
            const isActive = i === active;
            // Strip the trailing ", 2026" on mobile — the year is redundant
            // when the whole event is 2026, and dropping it lets each pill
            // fit comfortably in a 360px viewport.
            const dateShort = d.date.replace(/,\s*\d{4}$/, "");
            return (
              <button
                key={d.label}
                onClick={() => selectDay(i)}
                aria-pressed={isActive}
                className={`snap-start shrink-0 px-3 md:px-5 py-2 md:py-3 rounded-sm text-left transition-fluid will-change-transform active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-[#ededed] ${
                  isActive
                    ? "text-white"
                    : "bg-white text-neutral-900 ring-1 ring-black/[0.07] hover:bg-neutral-50 hover:ring-black/[0.12] hover:shadow-[0_2px_10px_-6px_rgba(0,0,0,0.12)]"
                }`}
                style={
                  isActive
                    ? {
                        backgroundColor: BRAND,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.18), 0 4px 12px -4px rgba(253,107,24,0.35)",
                      }
                    : undefined
                }
              >
                <div
                  className={`uppercase ${isActive ? "text-white/85" : "text-neutral-500"}`}
                  style={{ fontSize: "0.5625rem", letterSpacing: "0.2em", fontWeight: 500 }}
                >
                  {d.short.toUpperCase()}
                </div>
                <div
                  className={`mt-0.5 tabular-nums whitespace-nowrap ${
                    isActive ? "text-white" : "text-neutral-900"
                  }`}
                  style={{
                    fontSize: "clamp(0.75rem, 2.2vw, 0.9375rem)",
                    lineHeight: 1.2,
                    fontWeight: 500,
                  }}
                >
                  <span className="md:hidden">{dateShort}</span>
                  <span className="hidden md:inline">{d.date}</span>
                </div>
              </button>
            );
          })}
        </div>
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
            One <GradientText>PFM agenda.</GradientText>
          </>
        }
        subtitle="Country-led workshops, presentations and panels — alongside cultural moments across Trinidad and Tobago."
        image={HERO_AGENDA}
        hasGrid={true}
        hasSunset={true}
      />

      <section
        className="py-10 md:py-16 pb-32 md:pb-40 relative overflow-hidden"
        style={{ backgroundColor: "rgb(237, 237, 237)" }}
      >

        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          {/* Day header strip — folds the previous "day at a glance" line
              and the "Download programme" CTA into a single row. Brand-orange
              dot eyebrow, day label, date, sessions count, time range; CTA
              on the right. */}
          {/* Tabs + Download row — single strip on md+, stacked on mobile.
              The tabs container is flex-1 and scrolls horizontally; pairing
              it with the CTA on the same row at narrow widths produced an
              overlap (the CTA sat on top of the scrolling tabs because
              flex-wrap doesn't push the second flex-1 sibling to its own
              line). Stacking vertically below md fixes that cleanly. */}
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-6 mb-8 md:mb-10 pb-6 md:pb-7 border-b border-neutral-200/70">
            {tabs}
            <div className="self-start md:self-auto md:shrink-0">
              <NestedCTA
                href="#"
                variant="ghost"
                icon={<Download size={13} strokeWidth={1.75} />}
              >
                Download programme
              </NestedCTA>
            </div>
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
    // Soft rows render flush with the cards' content edge — no dot prefix,
    // no left chrome. The previous dot read as "accidental ornament" per
    // the design review; cleaner is better here. py-4 padding holds the
    // measurable row height (~52px) that anchors the rhythm against the
    // larger session cards above and below.
    return (
      <li className="flex items-center gap-4 md:gap-6 px-5 md:px-7 py-4">
        <div
          className="shrink-0 w-[112px] md:w-[120px] tabular-nums text-neutral-500 whitespace-nowrap"
          style={{ fontSize: "0.875rem", lineHeight: 1.25, fontWeight: 500, letterSpacing: "0.01em" }}
        >
          {fmtTime(session.time)}
        </div>
        <div className="text-neutral-700" style={{ fontSize: "1rem", fontWeight: 500 }}>
          {session.title}
        </div>
      </li>
    );
  }

  const tagHue = session.tag ? TAG_HUES[session.tag] : undefined;
  const tagTone = tagHue !== undefined ? chipTone(tagHue) : undefined;
  const tagAccent = tagHue !== undefined ? chipAccent(tagHue) : undefined;
  const speakerLine = hasSpeakers
    ? session.speakers!.map((sp) => sp.name).join(", ")
    : null;

  return (
    <li
      className="group relative rounded-md bg-white ring-1 ring-black/[0.08] shadow-[0_4px_18px_-12px_rgba(0,0,0,0.1)] transition-fluid hover:-translate-y-0.5 hover:ring-black/[0.15] hover:shadow-[0_10px_28px_-14px_rgba(0,0,0,0.16)] active:scale-[0.98] focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2 overflow-hidden"
    >
      {tagAccent && (
        <span
          className="absolute left-0 top-0 bottom-0 w-[3px] pointer-events-none z-10"
          style={{ backgroundColor: tagAccent }}
        />
      )}
      {/* Expand button — absolute top-right, anchored consistently across
          mobile (stacked layout) and desktop (row layout). Whole card is
          still the hit target; this is the affordance. Darkened from the
          previous neutral-100/700 treatment so it reads as a clear "you
          can expand me" control at desktop reading distance. Card-hover
          deepens the button further. */}
      {hasExpansion && (
        <span
          aria-hidden="true"
          className="absolute top-4 right-4 md:top-5 md:right-5 w-9 h-9 rounded-sm bg-neutral-100 ring-1 ring-black/[0.1] flex items-center justify-center text-neutral-900 transition-fluid pointer-events-none group-hover:bg-neutral-200 group-hover:ring-black/[0.18]"
        >
          {expanded ? (
            <Minus size={15} strokeWidth={2} />
          ) : (
            <Plus size={15} strokeWidth={2} />
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
        className={`focus:outline-none p-5 md:p-7 flex flex-col md:flex-row items-start gap-3 md:gap-6 ${
          hasExpansion ? "cursor-pointer" : ""
        } ${hasExpansion ? "pr-14 md:pr-16" : ""}`}
      >
        {/* Time — stacks above the title on mobile (the fixed 90/120px
            side column was eating most of a 360px viewport). On desktop
            it goes back to a side column for a clean grid alignment. */}
        <div
          className="md:shrink-0 md:w-[120px] tabular-nums text-neutral-900 md:pt-1"
          style={{ fontSize: "0.875rem", lineHeight: 1.3, fontWeight: 600, letterSpacing: "0.01em" }}
        >
          {fmtTime(session.time)}
        </div>

        {/* Body — title + description sizes bumped one tier each so the
            session content sits at parity with the hero scale. Title 1.1875rem
            (was 1.0625rem), body 1rem (was 0.9375rem). Body kept at
            text-neutral-700 from the site-wide darker pale-gray pass. */}
        <div className="flex-1 min-w-0 w-full">
          <h3
            className="tracking-tight text-neutral-950"
            style={{ fontSize: "1.1875rem", lineHeight: 1.3, fontWeight: 600, letterSpacing: "-0.005em" }}
          >
            {session.title}
          </h3>
          {session.desc && (
            <p
              className="mt-2.5 text-neutral-700"
              style={{ fontSize: "1rem", lineHeight: 1.6 }}
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
                    className="group/link mt-4 inline-flex items-center gap-2 text-neutral-950 underline underline-offset-4 decoration-1 transition-fluid hover:gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 rounded-sm"
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
