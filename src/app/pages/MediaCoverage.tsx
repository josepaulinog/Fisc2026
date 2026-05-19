import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Newspaper, Play, Rss, Share2 } from "lucide-react";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, HERO_MEDIA, mediaItems, type MediaItem } from "../data";

const TYPE_META: Record<MediaItem["type"], { icon: typeof Newspaper; bg: string; fg: string; verb: string }> = {
  Article: { icon: Newspaper, bg: "#fd6b1815", fg: "#fd6b18", verb: "Read full article" },
  Video: { icon: Play, bg: "#dc262615", fg: "#dc2626", verb: "Watch on YouTube" },
  Social: { icon: Share2, bg: "#2563eb15", fg: "#2563eb", verb: "View on LinkedIn" },
};

function MediaCard({ m, i }: { m: MediaItem; i: number }) {
  const meta = TYPE_META[m.type];
  const Icon = meta.icon;
  const dateLabel = new Date(m.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  return (
    <motion.a
      href={m.url}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 6) * 0.05 }}
      className="group relative rounded-2xl border border-neutral-200 bg-white p-6 md:p-7 hover:border-neutral-950 transition-all block"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md text-xs" style={{ backgroundColor: meta.bg, color: meta.fg }}>
          <Icon size={12} />
          {m.type}
        </span>
        <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-neutral-950 group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
      </div>
      <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.125rem", lineHeight: 1.3 }}>{m.title}</div>
      {m.excerpt && (
        <p className="mt-3 text-neutral-600 text-sm" style={{ lineHeight: 1.6 }}>{m.excerpt}</p>
      )}
      <div className="mt-5 flex items-center justify-between border-t border-neutral-100 pt-4">
        <div className="flex items-center gap-3 text-sm">
          <span className="tracking-tight text-neutral-950">{m.source}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-300" />
          <span className="text-neutral-500">{dateLabel}</span>
        </div>
        <span className="inline-flex items-center gap-1 text-sm group-hover:translate-x-0.5 transition" style={{ color: BRAND }}>
          {meta.verb}
          <ExternalLink size={13} />
        </span>
      </div>
    </motion.a>
  );
}

const FILTERS = ["All", "Article", "Video", "Social"] as const;

export default function MediaCoverage() {
  const [type, setType] = useState<(typeof FILTERS)[number]>("All");

  const filtered = useMemo(() => {
    if (type === "All") return mediaItems;
    return mediaItems.filter((m) => m.type === type);
  }, [type]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { All: mediaItems.length };
    for (const t of ["Article", "Video", "Social"] as const) {
      map[t] = mediaItems.filter((m) => m.type === t).length;
    }
    return map;
  }, []);

  return (
    <>
      <PageHero
        label="Media coverage"
        title={<>How the world is <GradientText>writing about FISC.</GradientText></>}
        subtitle="Press articles, broadcast clips and social posts covering the road to Port of Spain and the conference itself."
        image={HERO_MEDIA}
        imageCaption={`${mediaItems.length} items · Updated weekly`}
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
            <div className="flex items-center gap-2 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
              {FILTERS.map((f) => {
                const isActive = type === f;
                return (
                  <button
                    key={f}
                    onClick={() => setType(f)}
                    className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-sm transition ${
                      isActive
                        ? "bg-neutral-950 border-neutral-950 text-white"
                        : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                    }`}
                  >
                    {f}
                    <span className={`text-xs px-1.5 py-0.5 rounded ${isActive ? "bg-white/15 text-white/80" : "bg-neutral-100 text-neutral-500"}`}>
                      {counts[f] ?? 0}
                    </span>
                  </button>
                );
              })}
            </div>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-300 text-neutral-700 hover:border-neutral-950 transition text-sm">
              <Rss size={14} style={{ color: BRAND }} /> Subscribe to the press feed
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {filtered.map((m, i) => (
              <MediaCard key={m.title} m={m} i={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-neutral-500 border border-dashed border-neutral-200 rounded-2xl">
              <Newspaper size={28} className="mx-auto mb-3 text-neutral-300" />
              No coverage of this type yet.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
