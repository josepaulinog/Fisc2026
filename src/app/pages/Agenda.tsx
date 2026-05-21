import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_AGENDA, INK, TAG_COLORS, agenda, daySlugFor } from "../data";
import { NestedCTA } from "../components/ui/NestedCTA";

export default function Agenda() {
  const [active, setActive] = useState(1);
  const current = agenda[active];
  const currentSlug = daySlugFor(current);

  // Anchor strip — quick stats for the active day so the user has peripheral
  // signal beyond just "here is the list". First / last time, total sessions,
  // headline tag list. Cheap to compute, derived from the same data.
  const dayStats = useMemo(() => {
    const sessions = current.sessions;
    const first = sessions[0]?.time ?? "—";
    const last = sessions[sessions.length - 1]?.time ?? "—";
    const tags = Array.from(new Set(sessions.map((s) => s.tag).filter(Boolean))) as string[];
    return { first, last, count: sessions.length, tags };
  }, [current]);

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
        imageCaption="Workshop session · Country breakout"
      />
      <section className="py-14 md:py-28 relative overflow-hidden" style={{ backgroundColor: "#f6f4ef" }}>
        <div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-[0.07] blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ backgroundColor: BRAND }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
            <p className="text-neutral-600 max-w-2xl">
              Choose a day to explore the full programme. Click any session for the full briefing —
              time, speakers and context.
            </p>
            <NestedCTA
              href="#"
              variant="ghost"
              icon={<Download size={15} strokeWidth={1.5} />}
            >
              Download programme
            </NestedCTA>
          </div>

          <div className="flex gap-2 mb-4 md:mb-5 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide [scroll-padding-inline:1.25rem]">
            {agenda.map((d, i) => {
              const isActive = i === active;
              return (
                <button
                  key={d.label}
                  onClick={() => setActive(i)}
                  className={`snap-start shrink-0 px-4 md:px-5 py-3 rounded-sm border transition-all text-left ${
                    isActive
                      ? "bg-neutral-950 border-neutral-950 text-white"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  <div className={`tracking-tight ${isActive ? "text-white" : "text-neutral-950"}`} style={{ fontSize: "1rem" }}>{d.short}</div>
                  <div className={`text-xs mt-0.5 ${isActive ? "text-white/60" : "text-neutral-500"}`}>{d.date}</div>
                </button>
              );
            })}
          </div>

          {/* Anchor strip — peripheral signal for the active day. Sits between
              the day tabs and the day card so the user gets a "what kind of
              day is this" read before scrolling the full session list. */}
          <motion.div
            key={`stats-${current.label}`}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}
            className="mb-6 md:mb-8 flex flex-wrap items-center gap-x-6 gap-y-3 px-1 text-sm text-neutral-600"
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
            {dayStats.tags.length > 0 && (
              <>
                <span className="text-neutral-300">·</span>
                <span className="flex flex-wrap items-center gap-1.5">
                  {dayStats.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-sm text-[11px]"
                      style={{ backgroundColor: `${TAG_COLORS[tag]}18`, color: TAG_COLORS[tag] }}
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </>
            )}
          </motion.div>

          <motion.div
            key={current.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="rounded-md overflow-hidden border border-neutral-200 bg-white"
          >
            {/* Slimmer + cooler day card header. Previous treatment pushed
                BRAND to 130% which interpolated as burnt-orange across the
                bottom-right ~40% of the band — it dominated the page even
                though the band only labels the day. New gradient pushes BRAND
                to 170% (visible edge ~35% saturation) and the band height
                drops with reduced padding and a smaller headline. */}
            <div className="relative px-5 md:px-10 py-5 md:py-7 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${INK} 0%, #141414 60%, ${BRAND} 170%)` }}>
              <Grain />
              {/* Mobile: location + sessions count drop to a new line below
                  the date / day label so neither group truncates. From md+
                  they sit on the same row, right-aligned. */}
              <div className="relative flex flex-col md:flex-row md:items-end md:justify-between gap-3 md:gap-6">
                <div>
                  <div className="tracking-[0.25em] text-white/55 text-[10.5px]" style={{ fontWeight: 500 }}>{current.date.toUpperCase()}</div>
                  <div className="mt-2 tracking-[-0.02em]" style={{ fontSize: "clamp(1.375rem, 2.4vw, 1.875rem)", lineHeight: 1.05 }}>
                    {current.label}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-[0.8125rem] md:text-sm">
                  <span className="flex items-center gap-1.5" style={{ color: BRAND_SOFT }}>
                    <MapPin size={13} strokeWidth={1.5} /> Port of Spain
                  </span>
                  <span className="w-px h-3.5 bg-white/15" />
                  <span>{current.sessions.length} sessions</span>
                </div>
              </div>
            </div>

            <div>
              {current.sessions.map((s, i) => {
                // Soft moments — transition beats like Break / Lunch / Group
                // Photo / Cultural Tour / Dinner. They have no tag and no
                // speakers attached. Rendered as compact one-line rows so
                // they don't compete visually with the substantive sessions.
                const hasSpeakers = !!(s.speakers && s.speakers.length > 0);
                const isSoft = !s.tag && !hasSpeakers;
                const isMarquee = !!s.tag;

                if (isSoft) {
                  /* Mobile-inlined soft row — soft moments have so little
                     content per row (time + 1-2 word title) that stacking
                     time-above-title on mobile wastes vertical real estate
                     and breaks the dot-bullet metaphor. Render as a single
                     flex row at every breakpoint. */
                  return (
                    <Link
                      to={`/agenda/${currentSlug}/${i}`}
                      key={i}
                      className="group flex items-center gap-3 md:gap-8 px-5 md:px-10 py-3 md:py-3.5 border-t first:border-t-0 border-neutral-100 transition-fluid hover:bg-neutral-50/60"
                    >
                      <div className="shrink-0 w-[5.5rem] md:w-[10.5rem] text-neutral-700 tabular-nums text-[0.8125rem] md:text-[0.95rem]" style={{ fontWeight: 500 }}>
                        {s.time}
                      </div>
                      <span className="w-1 h-1 rounded-full bg-neutral-300 shrink-0" />
                      <span className="tracking-tight text-neutral-600 truncate" style={{ fontSize: "0.9rem", lineHeight: 1.3 }}>
                        {s.title}
                      </span>
                    </Link>
                  );
                }

                return (
                  <Link
                    to={`/agenda/${currentSlug}/${i}`}
                    key={i}
                    className="group relative grid grid-cols-12 gap-x-4 md:gap-8 gap-y-3 md:gap-y-0 px-5 md:px-10 py-5 md:py-6 border-t first:border-t-0 border-neutral-100 transition-fluid hover:bg-neutral-50/60"
                  >
                    {/* Marquee left-rail — tag-colored vertical bar marks
                        sessions that anchor the day's content. Bumped to 4px
                        on mobile (was 3px) so it remains legible at small
                        scales without competing with content. */}
                    {isMarquee && s.tag && (
                      <span
                        aria-hidden
                        className="absolute left-0 top-0 bottom-0 w-1 md:w-[3px] opacity-50 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: TAG_COLORS[s.tag] }}
                      />
                    )}
                    {/* Mobile: time + tag pill share one row (flex). Desktop:
                        time stacks above tag pill in the col-span-3 cell. */}
                    <div className="col-span-12 md:col-span-3 flex md:block items-center gap-3">
                      <div className="text-neutral-900 tabular-nums text-sm md:text-base shrink-0" style={{ fontWeight: 500 }}>
                        {s.time}
                      </div>
                      {s.tag && (
                        <span className="md:mt-2 inline-flex items-center px-2 py-0.5 rounded-sm text-[10.5px] md:text-[11px] shrink-0" style={{ backgroundColor: `${TAG_COLORS[s.tag]}18`, color: TAG_COLORS[s.tag], letterSpacing: "0.04em" }}>
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <div className="col-span-12 md:col-span-9">
                      <div className="flex items-start justify-between gap-3">
                        <div
                          className="tracking-tight text-neutral-950 transition-fluid group-hover:underline group-hover:decoration-neutral-300 group-hover:underline-offset-4"
                          style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
                        >
                          {s.title}
                        </div>
                        <ArrowUpRight
                          size={18}
                          strokeWidth={1.5}
                          className="shrink-0 text-neutral-400 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-fluid"
                        />
                      </div>
                      {s.desc && (
                        <p className="mt-2 text-neutral-600 text-[0.9375rem] md:text-base" style={{ lineHeight: 1.55 }}>
                          {/* Row-level synopsis: ~110 chars so delegates can scan a
                              day in one view. Full briefing lives on the detail
                              route (one click away). */}
                          {s.desc.length > 110 ? s.desc.slice(0, 110).trimEnd() + "…" : s.desc}
                        </p>
                      )}
                      {hasSpeakers && (
                        <div className="mt-3 md:mt-4 flex flex-wrap gap-x-5 md:gap-x-6 gap-y-2.5 md:gap-y-3">
                          {s.speakers!.map((sp) => (
                            <div key={sp.name} className="flex items-center gap-2.5 md:gap-3">
                              {sp.img ? (
                                <ImageWithFallback src={sp.img} alt={sp.name} className="w-8 h-8 md:w-9 md:h-9 rounded-full object-cover bg-neutral-100 shrink-0" />
                              ) : (
                                <div
                                  className="w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center bg-neutral-100 ring-1 ring-neutral-200 shrink-0"
                                  style={{ color: BRAND, fontSize: "0.7rem", letterSpacing: "0.05em", fontWeight: 600 }}
                                >
                                  FB
                                </div>
                              )}
                              <div className="min-w-0">
                                <div className="text-neutral-950 truncate text-[0.9375rem] md:text-base" style={{ lineHeight: 1.2 }}>{sp.name}</div>
                                {sp.role && <div className="text-neutral-500 text-[0.8125rem] md:text-sm truncate">{sp.role}</div>}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
