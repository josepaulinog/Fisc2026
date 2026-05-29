import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, ExternalLink, Newspaper, Play, Rss, Share2 } from "lucide-react";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, HERO_MEDIA, mediaItems, type MediaItem } from "../data";
import { FilterTab } from "../components/ui/FilterTab";

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
      className="group relative rounded-md ring-1 ring-black/[0.08] bg-white p-6 md:p-7 hover:ring-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] hover:shadow-[0_12px_40px_-20px_rgba(0,0,0,0.18)] transition-fluid block"
    >
      <div className="flex items-center justify-between mb-5">
        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm text-xs" style={{ backgroundColor: meta.bg, color: meta.fg }}>
          <Icon size={12} />
          {m.type}
        </span>
        <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-neutral-950 group-hover:rotate-45 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" />
      </div>
      <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.125rem", lineHeight: 1.3 }}>{m.title}</div>
      {m.excerpt && (
        <p className="mt-3 text-neutral-700 text-sm" style={{ lineHeight: 1.6 }}>{m.excerpt}</p>
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
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Media coverage" },
        ]}
        title={<>Media <GradientText>coverage.</GradientText></>}
        subtitle="Press articles, broadcast clips and social posts covering the road to Port of Spain and the conference itself."
        image={HERO_MEDIA}
        imageOverlayStrength={0.5}
      />

      <GatedBody>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 md:mb-12">
            <div className="flex items-center gap-2 overflow-x-auto md:overflow-visible overscroll-x-contain touch-pan-x snap-x snap-proximity -mx-5 px-5 md:mx-0 md:px-0 py-1.5 scrollbar-hide [scroll-padding-inline:1.25rem]">
              {FILTERS.map((f) => {
                const isActive = type === f;
                return (
                  <FilterTab key={f} active={isActive} onClick={() => setType(f)} count={counts[f] ?? 0}>
                    {f}
                  </FilterTab>
                );
              })}
            </div>
            <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-sm ring-1 ring-black/[0.08] text-neutral-700 hover:ring-neutral-950 focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus:outline-none active:scale-[0.98] transition-fluid text-sm">
              <Rss size={14} style={{ color: BRAND }} /> Subscribe to the press feed
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {filtered.map((m, i) => (
              <MediaCard key={m.title} m={m} i={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 md:py-20 border border-dashed border-neutral-200 rounded-md">
              <Newspaper size={26} strokeWidth={1.5} className="mx-auto mb-4 text-neutral-300" />
              <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                Nothing here yet
              </div>
              <p className="mt-2 text-neutral-700 max-w-sm mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>
                We add articles, clips and social posts as they go live — check back as the conference approaches.
              </p>
              <button
                type="button"
                onClick={() => setType("All")}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-neutral-950 underline underline-offset-4 decoration-1 hover:no-underline transition"
                style={{ fontWeight: 500 }}
              >
                Show all coverage
              </button>
            </div>
          )}
        </div>
      </section>
      </GatedBody>
    </>
  );
}
