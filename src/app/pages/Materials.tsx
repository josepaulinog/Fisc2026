import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Download, Lock, Search } from "lucide-react";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
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
      className="group relative rounded-md border border-neutral-200 bg-white overflow-hidden hover:border-neutral-950 hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.18)] transition-all"
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
          <span className="text-[10.5px] tracking-[0.22em] uppercase text-neutral-400 mt-1.5">
            FISC Takeaways
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
        title={<>Every deck. <GradientText>Every one-pager.</GradientText></>}
        subtitle="FISC Takeaways translate four days of conversation into reform-ready briefs. Browse the full archive — gated to registered delegates."
        image={HERO_MATERIALS}
      />

      <GatedBody>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8 md:mb-12">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700 text-xs tracking-[0.2em]">
                <Lock size={12} style={{ color: BRAND }} />
                INVITATION ONLY
              </div>
              <h2 className="mt-4 tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}>
                Browse by topic, pull what you need.
              </h2>
            </div>
            <label className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 md:w-80 focus-within:border-neutral-950 transition">
              <Search size={16} className="text-neutral-400 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search takeaways"
                className="flex-1 min-w-0 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 text-sm"
              />
            </label>
          </div>

          <div className="flex items-center gap-2 mb-8 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide [scroll-padding-inline:1.25rem]">
            {TOPICS.map((t) => {
              const isActive = topic === t;
              const count = t === "All" ? materials.length : materials.filter((m) => m.topic === t).length;
              return (
                <button
                  key={t}
                  onClick={() => setTopic(t)}
                  className={`snap-start shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-sm border text-sm transition ${
                    isActive
                      ? "bg-neutral-900 border-neutral-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_3px_10px_-4px_rgba(0,0,0,0.18)]"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  {t}
                  <span className={`text-xs px-1.5 py-0.5 rounded ${isActive ? "bg-white/15 text-white/80" : "bg-neutral-100 text-neutral-500"}`}>
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
            <div className="text-center py-20 text-neutral-500 border border-dashed border-neutral-200 rounded-2xl">
              <FileText size={28} className="mx-auto mb-3 text-neutral-300" />
              No takeaways match your search.
            </div>
          )}

          <div className="mt-12 md:mt-16 rounded-3xl overflow-hidden relative" style={{ backgroundColor: INK }}>
            <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 85% 10%, ${BRAND}44, transparent 55%)` }} />
            <div className="relative grid md:grid-cols-12 gap-6 md:gap-10 items-center p-8 md:p-12 text-white">
              <div className="md:col-span-8">
                <div className="text-xs tracking-[0.25em] text-white/60">BULK DOWNLOAD</div>
                <div className="mt-3 tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}>
                  All <span style={{ color: BRAND_SOFT }}>{materials.length}</span> takeaways in a single archive.
                </div>
                <p className="mt-3 text-white/70 max-w-xl" style={{ lineHeight: 1.65 }}>
                  Includes all FISC 2026 one-pagers and the index. Approx 32 MB.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <a href="#" className="inline-flex items-center gap-3 pl-5 pr-2 py-3 rounded-sm text-white hover:opacity-95 transition" style={{ backgroundColor: BRAND }}>
                  Download .zip
                  <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center">
                    <Download size={16} />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </GatedBody>
    </>
  );
}
