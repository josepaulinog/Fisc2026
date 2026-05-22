import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Clock, Film, Play } from "lucide-react";
import { GatedBody } from "../components/GatedBody";
import { Grain, GradientText, PageHero, SectionLabel } from "../components/shared";
import { PlaceholderTile } from "../components/ui/PlaceholderTile";
import { VideoPlayer } from "../components/ui/VideoPlayer";
import { BRAND, BRAND_SOFT, HERO_VIDEOS, videos, type VideoEntry } from "../data";

function PlayBadge({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const dim = size === "lg" ? "w-20 h-20" : size === "md" ? "w-14 h-14" : "w-11 h-11";
  return (
    <span
      className={`${dim} rounded-full flex items-center justify-center shadow-lg backdrop-blur transition group-hover:scale-110`}
      style={{ backgroundColor: BRAND, color: "#fff" }}
    >
      <Play size={size === "lg" ? 26 : size === "md" ? 18 : 14} fill="currentColor" />
    </span>
  );
}

function FeatureCard({ v, onPlay }: { v: VideoEntry; onPlay: (v: VideoEntry) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(v)}
      aria-label={`Play "${v.title}"`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative rounded-3xl overflow-hidden block aspect-[16/9] md:aspect-[2/1] w-full text-left"
    >
      <PlaceholderTile
        variant="dark"
        glyph={<Film size={42} strokeWidth={1.25} />}
        label="Capture · Jul 2026"
      />
      <Grain />
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8 text-white">
        <div className="flex items-start justify-between">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur border border-white/15 text-white/85 text-xs tracking-[0.2em]">
            FEATURED · {v.day?.toUpperCase()}
          </span>
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/30 border border-white/15 text-white/85 text-xs">
            <Clock size={12} /> {v.duration}
          </span>
        </div>
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-xl">
            <h3 className="tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
              {v.title}
            </h3>
            {v.description && (
              <p className="mt-3 text-white/75 max-w-md" style={{ lineHeight: 1.6 }}>{v.description}</p>
            )}
          </div>
          <PlayBadge size="lg" />
        </div>
      </div>
    </motion.button>
  );
}

function VideoCard({ v, i, onPlay }: { v: VideoEntry; i: number; onPlay: (v: VideoEntry) => void }) {
  return (
    <motion.button
      type="button"
      onClick={() => onPlay(v)}
      aria-label={`Play "${v.title}"`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 4) * 0.06 }}
      className="group rounded-2xl border border-neutral-200 bg-white overflow-hidden hover:border-neutral-950 transition-all block w-full text-left"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <PlaceholderTile
          variant="light"
          glyph={<Film size={26} strokeWidth={1.25} />}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayBadge size="md" />
        </div>
        <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-black/60 text-white/90 text-xs">
          <Clock size={11} /> {v.duration}
        </span>
        {v.day && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] tracking-[0.2em] uppercase" style={{ backgroundColor: `${BRAND}cc`, color: "#fff" }}>
            {v.day}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}>
          {v.title}
        </div>
        {v.description && (
          <p className="mt-2 text-neutral-700 text-sm" style={{ lineHeight: 1.55 }}>{v.description}</p>
        )}
      </div>
    </motion.button>
  );
}

export default function Videos() {
  const [active, setActive] = useState<VideoEntry | null>(null);
  const featured = videos[0];
  const rest = videos.slice(1);
  const totalMinutes = videos.reduce((sum, v) => {
    const [m, s] = v.duration.split(":").map(Number);
    return sum + (m ?? 0) + (s ?? 0) / 60;
  }, 0);

  return (
    <>
      <PageHero
        label="Videos"
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Videos" },
        ]}
        title={<>Watch the week.<br /><GradientText>On your time.</GradientText></>}
        subtitle="Daily highlight reels and short features from FISC 2026 — captured live in Port of Spain."
        image={HERO_VIDEOS}
        imageOverlayStrength={0.5}
      />

      <GatedBody>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6 space-y-10 md:space-y-12">
          {featured && <FeatureCard v={featured} onPlay={setActive} />}

          <div>
            <div className="flex items-center gap-4 mb-6">
              <SectionLabel>Daily highlights</SectionLabel>
              <span className="flex-1 h-px bg-neutral-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
              {rest.map((v, i) => (
                <VideoCard key={v.title} v={v} i={i} onPlay={setActive} />
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-3 md:gap-4">
            {[
              { k: "Videos", v: videos.length.toString(), sub: "Daily reels + features" },
              { k: "Runtime", v: `${Math.round(totalMinutes)} min`, sub: "Across all clips" },
              { k: "Languages", v: "EN · PT · ES", sub: "Captioned" },
            ].map((s, i) => (
              <motion.div
                key={s.k}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="rounded-md border border-neutral-200 bg-white p-5 flex items-center gap-4"
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND_SOFT}33`, color: BRAND }}>
                  <Film size={18} />
                </div>
                <div>
                  <div className="text-neutral-500 text-xs tracking-widest uppercase">{s.k}</div>
                  <div className="mt-1 tracking-tight text-neutral-950" style={{ fontSize: "1.25rem" }}>{s.v}</div>
                  <div className="text-neutral-500 text-sm mt-0.5">{s.sub}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </GatedBody>

      <AnimatePresence>
        {active && <VideoPlayer video={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
