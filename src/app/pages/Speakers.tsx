import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { Search } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, PageHero, SectionLabel } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_SPEAKERS, INK, speakers } from "../data";
import { FilterTab } from "../components/ui/FilterTab";
import { BracketArrow } from "../components/ui/BracketArrow";

type Speaker = (typeof speakers)[number];

function FeaturedCard({ s, accent = false }: { s: Speaker; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/speakers/${s.slug}`}
        /* Mobile aspect compressed from 4/5 (portrait) to 16/11 (landscape).
           Three stacked 4/5 portraits at 375px viewport width consume ~1410px
           of scroll just for keynotes — almost two screens. The landscape
           crop centers the face, keeps the keynote chip + caption legible,
           and brings the total featured-row height to under one screen on
           mobile. Desktop keeps the portrait crop. */
        className={`relative block group rounded-md overflow-hidden ring-1 ring-black/[0.08] shadow-[0_4px_18px_-12px_rgba(0,0,0,0.12)] bg-neutral-950 text-white aspect-[16/11] sm:aspect-[16/12] md:aspect-[4/5] transition-fluid hover:-translate-y-0.5 hover:ring-black/[0.15] hover:shadow-[0_12px_32px_-12px_rgba(0,0,0,0.22)] active:scale-[0.99] focus-ring`}
      >
        <ImageWithFallback
          src={s.img}
          alt={s.name}
          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000"
        />
        <div
          className="absolute inset-0"
          style={{
            background: accent
              ? `linear-gradient(180deg, transparent 30%, ${INK}cc 70%, ${INK} 100%), radial-gradient(ellipse at 80% 10%, ${BRAND}40 0%, transparent 50%)`
              : `linear-gradient(180deg, transparent 35%, ${INK}cc 75%, ${INK} 100%)`,
          }}
        />
        <Grain />
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-black/45 backdrop-blur-sm ring-1 ring-white/15 text-white text-xs tracking-[0.2em]" style={{ fontWeight: 500 }}>
            KEYNOTE
          </span>
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur ring-1 ring-white/20"
            style={{ backgroundColor: accent ? BRAND : "rgba(255,255,255,0.1)" }}
          >
            <BracketArrow size={14} strokeWidth={1.5} className="text-white transition-transform group-hover:rotate-45" />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
          <div className="text-xs tracking-[0.16em] md:tracking-[0.25em] text-white/60">{s.org.toUpperCase()}</div>
          <h3
            className="mt-2 tracking-[-0.02em]"
            style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.05 }}
          >
            {s.name}
          </h3>
          <p className="mt-1.5" style={{ color: BRAND_SOFT }}>
            {s.role}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

function MiniCard({ s, i }: { s: Speaker; i: number }) {
  // Single-surface architectural card matching the homepage Host pattern:
  // square rectangular portrait on the left, role-eyebrow + name + org on
  // the right. Hairline ring + ambient shadow replace the heavy 1px border;
  // hover lifts the shadow rather than inverting the whole card so the
  // photo stays the focal point.
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.06 }}
    >
      <Link
        to={`/speakers/${s.slug}`}
        className="group block overflow-hidden rounded-md bg-white ring-1 ring-black/[0.05] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.12)] transition-fluid hover:-translate-y-0.5 hover:ring-black/15 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] active:scale-[0.99] focus-ring"
      >
        <div className="grid grid-cols-[88px_1fr] md:grid-cols-[104px_1fr]">
          {/* Square rectangular portrait — replaces the circular avatar that
              flattened executive faces. Country/role dot moved into the
              info column as a brand-orange divider above the role. */}
          <div className="relative aspect-square bg-neutral-100 overflow-hidden">
            <ImageWithFallback
              src={s.img}
              alt={s.name}
              className="absolute inset-0 w-full h-full object-cover transition-fluid group-hover:scale-[1.04]"
            />
          </div>
          <div className="px-4 py-3 md:px-5 md:py-4 flex flex-col justify-center min-w-0">
            <div
              className="text-neutral-500 uppercase truncate"
              style={{ fontSize: "0.625rem", letterSpacing: "0.2em", fontWeight: 600 }}
            >
              {s.org}
            </div>
            <div
              className="mt-1 text-neutral-950 tracking-tight truncate"
              style={{ fontSize: "1.0625rem", lineHeight: 1.15, letterSpacing: "-0.01em", fontWeight: 500 }}
            >
              {s.name}
            </div>
            <div className="mt-0.5 text-neutral-500 text-sm truncate">{s.role}</div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Speakers() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"All" | "FreeBalance" | "Government">("All");

  const filters = ["All", "FreeBalance", "Government"] as const;

  const filtered = useMemo(() => {
    return speakers.filter((s) => {
      const matchQ =
        !query ||
        `${s.name} ${s.role} ${s.org}`.toLowerCase().includes(query.toLowerCase());
      const matchF =
        filter === "All" ||
        (filter === "FreeBalance" && s.org === "FreeBalance") ||
        (filter === "Government" && s.org !== "FreeBalance");
      return matchQ && matchF;
    });
  }, [query, filter]);

  const featured = filtered.slice(0, 3);
  const rest = filtered.slice(3);

  return (
    <>
      <PageHero
        label="Featured presenters"
        title={
          <>
            Voices shaping
            <br />
            <GradientText>public finance.</GradientText>
          </>
        }
        subtitle="A global lineup of finance ministers, FreeBalance leaders, and public sector innovators shaping the next chapter of Public Financial Management."
        image={HERO_SPEAKERS}
        hasGrid={true}
        hasSunset={true}
      />

      <section className="pt-10 md:pt-16 pb-14 md:pb-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          {/* Filter + search toolbar hidden per request — flip `false` to `true` to restore */}
          {false && (
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
            <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible overscroll-x-contain touch-pan-x snap-x snap-proximity -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide [scroll-padding-inline:1.25rem] py-1.5">
              {filters.map((f) => {
                const isActive = filter === f;
                const count =
                  f === "All"
                    ? speakers.length
                    : f === "FreeBalance"
                      ? speakers.filter((s) => s.org === "FreeBalance").length
                      : speakers.filter((s) => s.org !== "FreeBalance").length;
                return (
                  <FilterTab key={f} active={isActive} onClick={() => setFilter(f)} count={count}>
                    {f}
                  </FilterTab>
                );
              })}
            </div>

            <label className="flex items-center gap-2 bg-white ring-1 ring-black/[0.08] rounded-sm px-4 py-2.5 min-h-[44px] md:w-72 focus-within:outline-none focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2 transition-fluid">
              <Search size={16} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search presenters"
                className="flex-1 min-w-0 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 text-sm"
              />
            </label>
          </div>
          )}

          {featured.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10 md:mb-12">
              {featured.map((s, i) => (
                <FeaturedCard key={s.name} s={s} accent={i === 0} />
              ))}
            </div>
          )}

          {rest.length > 0 && (
            <>
              <div className="flex items-center gap-4 mb-6">
                <SectionLabel>More presenters</SectionLabel>
                <span className="flex-1 h-px bg-neutral-200 -translate-y-[10px]" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {rest.map((s, i) => (
                  <MiniCard key={s.name} s={s} i={i} />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-16 md:py-20 border border-dashed border-neutral-200 rounded-md">
              <Search size={26} strokeWidth={1.5} className="mx-auto mb-4 text-neutral-300" />
              <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                No presenters match
              </div>
              <p className="mt-2 text-neutral-700 max-w-sm mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>
                Try a broader search term, or switch the role filter back to All.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setFilter("All");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-neutral-950 underline underline-offset-4 decoration-1 hover:no-underline transition"
                style={{ fontWeight: 500 }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
