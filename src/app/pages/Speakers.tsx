import { useMemo, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Linkedin, Mail, Search, Twitter } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_SPEAKERS, INK, speakers } from "../data";

type Speaker = (typeof speakers)[number];

function Socials({ s, dark = false }: { s: Speaker; dark?: boolean }) {
  const base = dark
    ? "border-white/20 text-white/78"
    : "border-neutral-200 text-neutral-500";
  return (
    <div className="flex items-center gap-2">
      {s.email && (
        <a
          href={s.email}
          aria-label="Email"
          className={`w-9 h-9 rounded-full border ${base} flex items-center justify-center hover:text-white transition`}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          <Mail size={15} />
        </a>
      )}
      {s.linkedin && (
        <a
          href={s.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className={`w-9 h-9 rounded-full border ${base} flex items-center justify-center hover:text-white transition`}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          <Linkedin size={15} />
        </a>
      )}
      {s.twitter && (
        <a
          href={s.twitter}
          target="_blank"
          rel="noreferrer"
          aria-label="Twitter"
          className={`w-9 h-9 rounded-full border ${base} flex items-center justify-center hover:text-white transition`}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
        >
          <Twitter size={15} />
        </a>
      )}
    </div>
  );
}

function FeaturedCard({ s, accent = false }: { s: Speaker; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <Link
        to={`/speakers/${s.slug}`}
        className={`relative block group rounded-3xl overflow-hidden border ${
          accent ? "border-transparent" : "border-neutral-200"
        } bg-neutral-950 text-white aspect-[4/5] md:aspect-[4/5]`}
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
              ? `linear-gradient(180deg, transparent 30%, ${INK}cc 70%, ${INK} 100%), radial-gradient(ellipse at 80% 10%, ${BRAND}66 0%, transparent 50%)`
              : `linear-gradient(180deg, transparent 35%, ${INK}cc 75%, ${INK} 100%)`,
          }}
        />
        <Grain />
        <div className="absolute top-5 left-5 right-5 flex items-start justify-between">
          <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-white/10 backdrop-blur border border-white/15 text-white/80 text-xs tracking-[0.2em]">
            KEYNOTE
          </span>
          <span
            className="w-10 h-10 rounded-full flex items-center justify-center backdrop-blur border border-white/20 group-hover:rotate-45 transition-transform"
            style={{ backgroundColor: accent ? BRAND : "rgba(255,255,255,0.1)" }}
          >
            <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-7">
          <div className="text-xs tracking-[0.25em] text-white/60">{s.org.toUpperCase()}</div>
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.06 }}
    >
      <Link
        to={`/speakers/${s.slug}`}
        className="group block rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all"
      >
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-neutral-100 ring-2 ring-white shadow-sm">
              <ImageWithFallback src={s.img} alt={s.name} className="w-full h-full object-cover" />
            </div>
            <span
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-white group-hover:border-neutral-950 transition"
              style={{ backgroundColor: BRAND }}
            />
          </div>
          <div className="min-w-0 flex-1">
            <div className="tracking-tight text-neutral-950 group-hover:text-white truncate" style={{ fontSize: "1.0625rem" }}>
              {s.name}
            </div>
            <div className="text-neutral-500 group-hover:text-white/78 text-sm truncate">{s.role}</div>
            <div className="text-neutral-400 group-hover:text-white/65 text-xs tracking-widest uppercase mt-0.5 truncate">{s.org}</div>
          </div>
          <ArrowUpRight
            size={16}
            className="text-neutral-400 group-hover:text-white opacity-0 group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition shrink-0"
          />
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
        label="Featured Presenters"
        title={
          <>
            Voices shaping
            <br />
            <GradientText>public finance.</GradientText>
          </>
        }
        subtitle="A global lineup of finance ministers, FreeBalance leaders and public sector innovators driving the next chapter of Public Financial Management."
        image={HERO_SPEAKERS}
        imageCaption="On stage at FISC"
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
            <div className="flex items-center gap-2 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
              {filters.map((f) => {
                const isActive = filter === f;
                const count =
                  f === "All"
                    ? speakers.length
                    : f === "FreeBalance"
                      ? speakers.filter((s) => s.org === "FreeBalance").length
                      : speakers.filter((s) => s.org !== "FreeBalance").length;
                return (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border transition ${
                      isActive
                        ? "bg-neutral-950 border-neutral-950 text-white"
                        : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {f}
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded ${
                        isActive ? "bg-white/15 text-white/80" : "bg-neutral-100 text-neutral-500"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>

            <label className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2 md:w-72 focus-within:border-neutral-950 transition">
              <Search size={16} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search presenters"
                className="flex-1 min-w-0 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 text-sm"
              />
            </label>
          </div>

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
                <span className="tracking-[0.25em] text-neutral-500 text-xs">MORE PRESENTERS</span>
                <span className="flex-1 h-px bg-neutral-200" />
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {rest.map((s, i) => (
                  <MiniCard key={s.name} s={s} i={i} />
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-neutral-500">
              No presenters match your search.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
