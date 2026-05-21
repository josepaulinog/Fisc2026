import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Download, FileText, Lock, Search } from "lucide-react";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_MATERIALS, INK, materials, type MaterialEntry } from "../data";

const TOPIC_TONES: Record<MaterialEntry["topic"], { bg: string; fg: string }> = {
  PFM: { bg: "#fd6b1815", fg: "#fd6b18" },
  AI: { bg: "#2563eb15", fg: "#2563eb" },
  Performance: { bg: "#16a34a15", fg: "#16a34a" },
  Assessments: { bg: "#a855f715", fg: "#a855f7" },
  Product: { bg: "#0a0a0a15", fg: "#0a0a0a" },
  Reform: { bg: "#c2410c15", fg: "#c2410c" },
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
      className="group relative rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-950 transition-all"
    >
      <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: "#f5f5f4" }}>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 80% 20%, ${tone.fg}22 0%, transparent 55%), linear-gradient(180deg, #ffffff 0%, #f5f5f4 100%)`,
          }}
        />
        <div className="absolute inset-x-6 top-6 bottom-12 rounded-md bg-white border border-neutral-200 shadow-sm p-5 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <FileText size={14} style={{ color: tone.fg }} />
            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-400">FISC Takeaways</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-1.5 w-3/4 rounded-full bg-neutral-200" />
            <div className="h-1.5 w-2/3 rounded-full bg-neutral-200" />
            <div className="h-1.5 w-1/2 rounded-full bg-neutral-200" />
          </div>
          <div className="flex-1" />
          <div className="space-y-1.5">
            <div className="h-1 w-full rounded-full bg-neutral-100" />
            <div className="h-1 w-full rounded-full bg-neutral-100" />
            <div className="h-1 w-5/6 rounded-full bg-neutral-100" />
            <div className="h-1 w-4/5 rounded-full bg-neutral-100" />
          </div>
          <div className="h-12 rounded-md mt-2" style={{ background: `linear-gradient(135deg, ${tone.fg}33, ${tone.fg}11)` }} />
        </div>
        <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: tone.bg, color: tone.fg }}>
          {m.topic}
        </span>
      </div>

      <div className="p-5 md:p-6">
        <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}>
          {m.title}
        </div>
        <p className="mt-2 text-neutral-600 text-sm" style={{ lineHeight: 1.55 }}>
          {m.summary}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs tracking-widest text-neutral-400 uppercase">
            {m.pages ? `${m.pages} pages` : "PDF"}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition" style={{ backgroundColor: INK, color: "#fff" }}>
            Download <Download size={14} />
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
        imageCaption={`${materials.length} takeaways · 2026 edition`}
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
