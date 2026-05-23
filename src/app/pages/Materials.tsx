import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Download, Lock, Search } from "lucide-react";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";
import { BRAND, BRAND_SOFT, HERO_MATERIALS, INK, materials, type MaterialEntry } from "../data";
import { chipTone, CHIP_HUE } from "../tokens";

// Topic tones via chipTone(hue) — replaces the previous per-topic hex+alpha
// blocks. Same OKLCH-locked lightness/chroma as CATEGORY_TONES on Home and
// TAG_HUES on Agenda, so a card stack of mixed topics reads as a coordinated
// family instead of six wildly different perceptual lightnesses.
const TOPIC_TONES: Record<MaterialEntry["topic"], { bg: string; fg: string }> = {
  PFM: chipTone(CHIP_HUE.pfm),
  AI: chipTone(CHIP_HUE.ai),
  Performance: chipTone(CHIP_HUE.performance),
  Assessments: chipTone(CHIP_HUE.assessments),
  Product: { bg: "oklch(95% 0 0)", fg: "oklch(35% 0 0)" }, // gray neutral
  Reform: chipTone(CHIP_HUE.reform),
};

function MaterialCard({ m, i }: { m: MaterialEntry; i: number }) {
  const tone = TOPIC_TONES[m.topic];
  return (
    <motion.a
      href={m.pdfUrl}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 6) * 0.05 }}
      className="group relative rounded-md ring-1 ring-black/[0.08] bg-white overflow-hidden hover:ring-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus:outline-none hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.18)] active:scale-[0.98] transition-fluid"
    >
      {/* Typographic ticket — the old faux-PDF preview (gradient blobs +
          skeleton lines pretending to be document content) read as
          placeholder slop at scale. This card treats itself as a "ticket
          to the document," not a "preview of the document": topic chip,
          big title, summary, download. Real PDF first-page renders are a
          server-side problem to solve at WP port time. */}
      <div className="p-6 md:p-7 flex flex-col gap-4 min-h-[18rem] md:min-h-[20rem]">
        <div className="flex items-start justify-between gap-3">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-sm text-[11px] tracking-tight"
            style={{ backgroundColor: tone.bg, color: tone.fg, fontWeight: 500 }}
          >
            {m.topic}
          </span>
        </div>
        <div
          className="tracking-tight text-neutral-950 mt-2"
          style={{ fontSize: "clamp(1.0625rem, 2vw, 1.25rem)", lineHeight: 1.2, fontWeight: 500 }}
        >
          {m.title}
        </div>
        <p className="text-neutral-700 text-[0.9375rem]" style={{ lineHeight: 1.55 }}>
          {m.summary}
        </p>
        <div className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between">
          <span className="text-[11px] tracking-[0.22em] text-neutral-500 uppercase tabular-nums">
            {m.pages ? `${m.pages} pages · PDF` : "PDF"}
          </span>
          <span
            className="inline-flex items-center gap-2 text-[13px] text-neutral-950 group-hover:text-neutral-950 transition"
            style={{ fontWeight: 500 }}
          >
            Download
            <span
              className="w-7 h-7 rounded-sm flex items-center justify-center transition-colors"
              style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
            >
              <Download size={13} strokeWidth={1.75} />
            </span>
          </span>
        </div>
      </div>
    </motion.a>
  );
}

const TOPICS = ["All", "PFM", "AI", "Performance", "Assessments", "Product", "Reform"] as const;

export default function Materials() {
  const [query, setQuery] = useState("");
  const [topic, setTopic] = useState<(typeof TOPICS)[number]>("All");

  const filtered = useMemo(() => {
    return materials.filter((m) => {
      const matchQ = !query || `${m.title} ${m.summary}`.toLowerCase().includes(query.toLowerCase());
      const matchT = topic === "All" || m.topic === topic;
      return matchQ && matchT;
    });
  }, [query, topic]);

  return (
    <>
      <PageHero
        label="Materials"
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Materials" },
        ]}
        title={<>Every brief. <GradientText>One archive.</GradientText></>}
        subtitle="Four days of conversation distilled into reform-ready briefs — searchable and downloadable."
        image={HERO_MATERIALS}
        imageOverlayStrength={0.5}
      />

      <GatedBody>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm ring-1 ring-black/[0.08] bg-neutral-50 text-neutral-700 text-xs tracking-[0.2em]">
                <Lock size={12} style={{ color: BRAND }} />
                INVITATION ONLY
              </div>
              <h2 className="mt-4 tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}>
                Browse by topic, pull what you need.
              </h2>
            </div>
            <search>
              <label className="flex items-center gap-2 bg-neutral-50 ring-1 ring-black/[0.08] focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2 rounded-md px-4 py-2.5 md:w-80 transition-fluid">
                <Search size={16} className="text-neutral-400 shrink-0" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search takeaways"
                  className="flex-1 min-w-0 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 text-sm [&::-webkit-search-cancel-button]:hidden"
                />
              </label>
            </search>
          </div>

          <div className="flex items-center gap-2 mb-8 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity -mx-5 px-5 md:mx-0 md:px-0 py-1.5 scrollbar-hide [scroll-padding-inline:1.25rem]">
            {TOPICS.map((t) => {
              const isActive = topic === t;
              const count = t === "All" ? materials.length : materials.filter((m) => m.topic === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-sm text-sm focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] transition-fluid ${
                    isActive
                      ? "bg-neutral-900 ring-1 ring-neutral-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_3px_10px_-4px_rgba(0,0,0,0.18)]"
                      : "bg-white ring-1 ring-black/[0.08] text-neutral-700 hover:ring-neutral-400"
                  }`}
                >
                  {t}
                  <span className={`text-xs px-1.5 py-0.5 rounded-sm ${isActive ? "bg-white/15 text-white/80" : "bg-neutral-100 text-neutral-500"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {filtered.map((m, i) => (
              <MaterialCard key={m.title} m={m} i={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 md:py-20 border border-dashed border-neutral-200 rounded-md">
              <Search size={26} strokeWidth={1.5} className="mx-auto mb-4 text-neutral-300" />
              <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                No takeaways match
              </div>
              <p className="mt-2 text-neutral-700 max-w-sm mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>
                Try a different search, or clear the topic filter.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setTopic("All");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-neutral-950 underline underline-offset-4 decoration-1 hover:no-underline transition"
                style={{ fontWeight: 500 }}
              >
                Show all takeaways
              </button>
            </div>
          )}

          <div className="mt-12 md:mt-16 rounded-2xl overflow-hidden relative" style={{ backgroundColor: INK }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 85% 10%, ${BRAND}44, transparent 55%)` }} />
            <div className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-center p-8 md:p-12 text-white">
              <div className="md:col-span-8">
                <div className="text-xs tracking-[0.25em] text-white/60">THE FULL ARCHIVE</div>
                <div className="mt-3 tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}>
                  All <span style={{ color: BRAND_SOFT }}>{materials.length}</span> briefs in a single archive.
                </div>
                <p className="mt-3 text-white/70 max-w-xl" style={{ lineHeight: 1.65 }}>
                  Includes every 2026 brief and a topic index. Approx 32 MB.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <NestedCTA
                  href="#"
                  variant="brand"
                  icon={<Download size={13} strokeWidth={1.75} />}
                >
                  Download all (.zip · 32 MB)
                </NestedCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
      </GatedBody>
    </>
  );
}
