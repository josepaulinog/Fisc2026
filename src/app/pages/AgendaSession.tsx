import { Link, Navigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  Clock,
  Download,
  FileText,
  MapPin,
  Mic,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHero, SectionLabel } from "../components/shared";
import { chipTone } from "../tokens";
import {
  BRAND,
  BRAND_SOFT,
  HERO_AGENDA,
  INK,
  TAG_HUES,
  agenda,
  daySlugFor,
  materials,
  speakers,
  type MaterialEntry,
} from "../data";

type SessionLocator = { dayIdx: number; sessionIdx: number };

/**
 * Splits a session title so the trailing 1-2 words render in the brand
 * GradientText accent (Instrument Serif italic, brand orange). Matches the
 * editorial italicised-tail pattern used on About, Speakers, Venue and other
 * heroes — but adapted to dynamic session titles:
 *   - 1 word         → italicise the whole word (the title IS the accent)
 * Renders session titles as plain typography. Previous behaviour wrapped
 * the trailing word(s) in <GradientText> — but on a 40+ session agenda the
 * italic accent on every title stopped reading as editorial punctuation
 * and started reading as a tic. Reserved for true marquee moments (Home
 * hero, About hero, etc.) elsewhere on the site. */
function styledSessionTitle(title: string): React.ReactNode {
  return title;
}

/**
 * Jump to the first session of the previous or next day. Day-level navigation
 * is more useful at the bottom of a session brief than session-level (the agenda
 * list is one click away if you want to browse adjacent sessions).
 */
function neighbourDayOf(loc: SessionLocator, direction: "prev" | "next"): SessionLocator | null {
  const { dayIdx } = loc;
  if (direction === "prev") {
    if (dayIdx > 0) return { dayIdx: dayIdx - 1, sessionIdx: 0 };
    return null;
  }
  if (dayIdx < agenda.length - 1) return { dayIdx: dayIdx + 1, sessionIdx: 0 };
  return null;
}

function pathOf(loc: SessionLocator): string {
  return `/agenda/${daySlugFor(agenda[loc.dayIdx])}/${loc.sessionIdx}`;
}

// Topic-coloured pill matching the Materials page treatment.
const TOPIC_TONES: Record<MaterialEntry["topic"], { bg: string; fg: string }> = {
  PFM: { bg: "#fd6b1815", fg: "#fd6b18" },
  AI: { bg: "#2563eb15", fg: "#2563eb" },
  Performance: { bg: "#16a34a15", fg: "#16a34a" },
  Assessments: { bg: "#a855f715", fg: "#a855f7" },
  Product: { bg: "#0a0a0a15", fg: "#0a0a0a" },
  Reform: { bg: "#c2410c15", fg: "#c2410c" },
};

export default function AgendaSession() {
  const { daySlug, sessionIdx: sessionIdxParam } = useParams<{ daySlug: string; sessionIdx: string }>();

  const dayIdx = agenda.findIndex((d) => daySlugFor(d) === daySlug);
  if (dayIdx === -1) return <Navigate to="/agenda" replace />;

  const day = agenda[dayIdx];
  const sessionIdx = Number(sessionIdxParam);
  if (!Number.isInteger(sessionIdx) || sessionIdx < 0 || sessionIdx >= day.sessions.length) {
    return <Navigate to="/agenda" replace />;
  }

  const session = day.sessions[sessionIdx];
  const prev = neighbourDayOf({ dayIdx, sessionIdx }, "prev");
  const next = neighbourDayOf({ dayIdx, sessionIdx }, "next");

  // Enrich speakers: pull slug + org from the speakers directory when names match.
  const enrichedSpeakers = (session.speakers ?? []).map((sp) => {
    const full = speakers.find((s) => s.name === sp.name);
    return { ...sp, slug: full?.slug, org: full?.org };
  });

  // Look up related downloads from the global materials list by exact title match.
  const relatedMaterials: MaterialEntry[] = (session.materials ?? [])
    .map((title) => materials.find((m) => m.title === title))
    .filter((m): m is MaterialEntry => !!m);

  const tagTone = session.tag ? chipTone(TAG_HUES[session.tag]) : undefined;

  return (
    <>
      <PageHero
        label={`${day.short} · ${day.date}`}
        breadcrumbs={[
          { label: "Agenda", to: "/agenda" },
          { label: `${day.label} · ${day.date}`, to: "/agenda" },
          { label: session.title },
        ]}
        title={styledSessionTitle(session.title)}
        subtitle={session.desc}
        image={HERO_AGENDA}
      />

      {/* Key facts strip */}
      <section className="bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-4">
          {[
            { icon: Clock, k: "Time", v: session.time },
            { icon: Calendar, k: "Day", v: `${day.short}`, sub: day.date },
            { icon: MapPin, k: "Venue", v: "Hyatt Regency", sub: "Port of Spain" },
            session.tag && tagTone
              ? { icon: Mic, k: "Format", v: session.tag, tone: tagTone }
              : { icon: Mic, k: "Format", v: "Plenary" },
          ].map((f, i) => (
            <div
              key={i}
              className="py-6 md:py-7 px-4 md:px-5 border-l first:border-l-0 [&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l border-neutral-100 flex items-center gap-3 md:gap-4"
            >
              <div
                className="w-9 h-9 md:w-10 md:h-10 rounded-sm flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: "tone" in f && f.tone ? f.tone.bg : `${BRAND}15`,
                  color: "tone" in f && f.tone ? f.tone.fg : BRAND,
                }}
              >
                <f.icon size={15} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">{f.k}</div>
                <div className="mt-0.5 tracking-tight text-neutral-950 truncate tabular-nums" style={{ fontSize: "0.95rem" }}>
                  {f.v}
                </div>
                {"sub" in f && f.sub && (
                  <div className="text-neutral-500 text-xs mt-0.5 truncate">{f.sub}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About this session — three-layer brief:
            1. Briefing paragraph (if present), falling back to short desc
            2. Takeaways list with checkmark glyphs (if present)
            3. References list (if present) — internal Link / external anchor */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-4">
              <SectionLabel>{session.desc ? "About this session" : "Logistics"}</SectionLabel>
              <h2
                className="tracking-[-0.02em] text-neutral-950"
                style={{ fontSize: "clamp(1.5rem, 2.75vw, 2rem)", lineHeight: 1.1 }}
              >
                What you'll <em className="italic">take away.</em>
              </h2>
            </div>
            <div className="lg:col-span-8">
              <p
                className="text-neutral-700"
                style={{ fontSize: "1.125rem", lineHeight: 1.75 }}
              >
                {session.briefing ??
                  session.desc ??
                  "A pause in the formal programme. Refreshments and informal conversation in the lobby — secretariat staff are on hand if you need anything."}
              </p>

              {/* Takeaways — checkmark list. Each row is a brand-orange tinted
                  check glyph inside a small square, followed by the takeaway
                  copy. Generous spacing so each line reads as advice, not as
                  a dense bullet list. */}
              {session.takeaways && session.takeaways.length > 0 && (
                <div className="mt-8 md:mt-10">
                  <div
                    className="text-neutral-500 uppercase mb-4"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.22em",
                      fontWeight: 600,
                    }}
                  >
                    What you'll leave with
                  </div>
                  <ul className="space-y-3">
                    {session.takeaways.map((t, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="mt-0.5 inline-flex items-center justify-center w-6 h-6 rounded-sm shrink-0"
                          style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                        >
                          <Check size={14} strokeWidth={2.5} />
                        </span>
                        <span
                          className="text-neutral-800"
                          style={{ fontSize: "1rem", lineHeight: 1.55 }}
                        >
                          {t}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* References — link out to related materials, speakers, sessions
                  or external standards. Internal `to` paths use react-router;
                  `external: true` opens in a new tab. */}
              {session.references && session.references.length > 0 && (
                <div className="mt-8 md:mt-10 pt-6 md:pt-7 border-t border-neutral-100">
                  <div
                    className="text-neutral-500 uppercase mb-4"
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.22em",
                      fontWeight: 600,
                    }}
                  >
                    Read more
                  </div>
                  <ul className="space-y-2.5">
                    {session.references.map((r, i) => {
                      const inner = (
                        <span className="group inline-flex items-center gap-2 text-neutral-950 transition-fluid hover:gap-3">
                          <span style={{ fontSize: "1rem", fontWeight: 500 }}>{r.label}</span>
                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.75}
                            className="text-neutral-400 transition-fluid group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      );
                      return (
                        <li key={i}>
                          {r.external ? (
                            <a href={r.to} target="_blank" rel="noreferrer">
                              {inner}
                            </a>
                          ) : (
                            <Link to={r.to}>{inner}</Link>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Speakers */}
      {enrichedSpeakers.length > 0 && (
        <section className="py-12 md:py-20" style={{ backgroundColor: "#f6f4ef" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            <div className="mb-8 md:mb-12">
              <SectionLabel>Speakers</SectionLabel>
              <h2
                className="tracking-[-0.02em] text-neutral-950"
                style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}
              >
                On this <em className="italic">session.</em>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {enrichedSpeakers.map((sp, i) => {
                // Architectural person card matching the homepage Host + the
                // Speakers MiniCard pattern. Square portrait on the left,
                // org-eyebrow + name + role on the right, hairline ring +
                // ambient shadow (instead of the heavy 1px border).
                const cardInner = (
                  <div className="grid grid-cols-[88px_1fr] md:grid-cols-[96px_1fr]">
                    <div className="relative aspect-square bg-neutral-100 overflow-hidden">
                      {sp.img ? (
                        <ImageWithFallback
                          src={sp.img}
                          alt={sp.name}
                          className="absolute inset-0 w-full h-full object-cover transition-fluid group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center text-white tracking-tight"
                          style={{ backgroundColor: BRAND, fontSize: "0.95rem", fontWeight: 500 }}
                        >
                          FB
                        </div>
                      )}
                    </div>
                    <div className="px-4 py-3 md:px-5 md:py-4 flex flex-col justify-center min-w-0">
                      {sp.org && (
                        <div
                          className="text-neutral-500 uppercase truncate"
                          style={{ fontSize: "0.625rem", letterSpacing: "0.2em", fontWeight: 600 }}
                        >
                          {sp.org}
                        </div>
                      )}
                      <div
                        className="mt-1 text-neutral-950 tracking-tight truncate"
                        style={{ fontSize: "1.0625rem", lineHeight: 1.15, letterSpacing: "-0.01em", fontWeight: 500 }}
                      >
                        {sp.name}
                      </div>
                      {sp.role && (
                        <div className="mt-0.5 text-neutral-500 text-sm truncate">{sp.role}</div>
                      )}
                    </div>
                  </div>
                );
                const baseClass =
                  "group block overflow-hidden rounded-md bg-white ring-1 ring-black/[0.05] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.12)] transition-fluid";
                return (
                  <motion.div
                    key={`${sp.name}-${i}`}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.06 }}
                  >
                    {sp.slug ? (
                      <Link
                        to={`/speakers/${sp.slug}`}
                        className={`${baseClass} hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)]`}
                      >
                        {cardInner}
                      </Link>
                    ) : (
                      <div className={baseClass}>{cardInner}</div>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Related materials */}
      {relatedMaterials.length > 0 && (
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
              <div>
                <SectionLabel>Related downloads</SectionLabel>
                <h2
                  className="tracking-[-0.02em] text-neutral-950"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}
                >
                  Take this <em className="italic">home with you.</em>
                </h2>
              </div>
              <Link
                to="/materials"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-neutral-300 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition"
              >
                Full library
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {relatedMaterials.map((m, i) => {
                const tone = TOPIC_TONES[m.topic];
                return (
                  <motion.a
                    key={m.title}
                    href={m.pdfUrl}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 3) * 0.06 }}
                    className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-950 transition-all block"
                  >
                    <div className="p-5 md:p-6">
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs"
                          style={{ backgroundColor: tone.bg, color: tone.fg }}
                        >
                          <FileText size={11} />
                          {m.topic}
                        </span>
                        <span className="text-xs tracking-widest text-neutral-400 uppercase">
                          {m.pages ? `${m.pages} pp` : "PDF"}
                        </span>
                      </div>
                      <div
                        className="tracking-tight text-neutral-950"
                        style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
                      >
                        {m.title}
                      </div>
                      <p className="mt-2 text-neutral-700 text-sm" style={{ lineHeight: 1.55 }}>
                        {m.summary.length > 110 ? m.summary.slice(0, 110) + "…" : m.summary}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
                        <span
                          className="inline-flex items-center gap-1.5 text-sm"
                          style={{ color: BRAND }}
                        >
                          Download <Download size={14} />
                        </span>
                        <ArrowUpRight
                          size={16}
                          className="text-neutral-400 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                        />
                      </div>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Location & map */}
      <section className="py-12 md:py-20" style={{ backgroundColor: "#f6f4ef" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="mb-8 md:mb-10">
            <SectionLabel>Where it happens</SectionLabel>
            <h2
              className="tracking-[-0.02em] text-neutral-950"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}
            >
              Hyatt Regency · <em className="italic">Port of Spain.</em>
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-4 md:gap-5">
            <div className="lg:col-span-8 relative rounded-3xl overflow-hidden border border-neutral-200 bg-white">
              <iframe
                title="Hyatt Regency Port of Spain — interactive map"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-61.530,10.640,-61.505,10.658&layer=mapnik&marker=10.6488,-61.5179"
                className="w-full block"
                style={{ height: "440px", border: 0 }}
                loading="lazy"
              />
            </div>

            <div className="lg:col-span-4 rounded-md overflow-hidden border border-neutral-200 bg-white p-6 md:p-7 flex flex-col">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
              >
                <MapPin size={18} />
              </div>
              <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.125rem", lineHeight: 1.2 }}>
                1 Wrightson Road
              </div>
              <div className="text-neutral-500 text-sm mt-1">Port of Spain, Trinidad &amp; Tobago</div>

              <div className="mt-5 pt-5 border-t border-neutral-100 grid grid-cols-2 gap-3 text-sm">
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">Lat</div>
                  <div className="mt-1 text-neutral-950 tabular-nums">10.6488° N</div>
                </div>
                <div>
                  <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">Long</div>
                  <div className="mt-1 text-neutral-950 tabular-nums">61.5179° W</div>
                </div>
              </div>

              <a
                href="https://www.openstreetmap.org/?mlat=10.6488&mlon=-61.5179#map=16/10.6488/-61.5179"
                target="_blank"
                rel="noreferrer"
                className="mt-6 group inline-flex items-center justify-between gap-2 px-4 py-3 rounded-sm text-white hover:opacity-95 transition"
                style={{ backgroundColor: INK }}
              >
                Open in OpenStreetMap
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: BRAND }}
                >
                  <ArrowUpRight size={13} className="group-hover:rotate-45 transition-transform" />
                </span>
              </a>

              <Link
                to="/venue"
                className="mt-3 inline-flex items-center gap-2 px-4 py-3 rounded-sm border border-neutral-300 text-neutral-800 hover:border-neutral-950 transition text-sm"
              >
                Venue & arrival details
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Day-level navigation — jump to the first session of the previous/next day */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 border-t border-neutral-100 pt-8">
            {prev ? (
              <Link
                to={pathOf(prev)}
                className="group p-5 md:p-6 rounded-md border border-neutral-200 hover:border-neutral-950 transition"
              >
                <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-neutral-500">
                  <ArrowLeft size={12} /> Previous day
                </div>
                <div
                  className="mt-3 tracking-tight text-neutral-950"
                  style={{ fontSize: "1.25rem", lineHeight: 1.2 }}
                >
                  {agenda[prev.dayIdx].label}
                </div>
                <div className="mt-1 text-neutral-500 text-sm">
                  {agenda[prev.dayIdx].date} · {agenda[prev.dayIdx].sessions.length} sessions
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
            {next ? (
              <Link
                to={pathOf(next)}
                className="group p-5 md:p-6 rounded-md border border-neutral-200 hover:border-neutral-950 transition md:text-right"
              >
                <div className="flex items-center md:justify-end gap-2 text-xs tracking-[0.25em] uppercase text-neutral-500">
                  Next day <ArrowRight size={12} />
                </div>
                <div
                  className="mt-3 tracking-tight text-neutral-950"
                  style={{ fontSize: "1.25rem", lineHeight: 1.2 }}
                >
                  {agenda[next.dayIdx].label}
                </div>
                <div className="mt-1 text-neutral-500 text-sm">
                  {agenda[next.dayIdx].date} · {agenda[next.dayIdx].sessions.length} sessions
                </div>
              </Link>
            ) : (
              <div className="hidden md:block" />
            )}
          </div>

          <Link
            to="/agenda"
            className="mt-8 inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-neutral-950 transition"
          >
            <ArrowLeft size={14} /> Back to full agenda
          </Link>
        </div>
      </section>
    </>
  );
}
