import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Clock, MapPin, X } from "lucide-react";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero, SectionLabel } from "../components/shared";
import { PlaceholderTile } from "../components/ui/PlaceholderTile";
import {
  BRAND,
  HERO_GALLERY,
  galleryDays,
  galleryPhotos,
  type GalleryPhoto,
} from "../data";
import { Z } from "../tokens";

function PhotoTile({
  p,
  flatIndex,
  i,
  onOpen,
}: {
  p: GalleryPhoto;
  /** Position in the flat (cross-day) gallery — drives the lightbox cursor. */
  flatIndex: number;
  /** Position within the current day's grid — drives the stagger only. */
  i: number;
  onOpen: (i: number) => void;
}) {
  const wide = p.span === "wide";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
      onClick={() => onOpen(flatIndex)}
      aria-label={`Open ${p.caption} — ${p.date}, ${p.time}`}
      className={`group relative rounded-2xl overflow-hidden text-left transition-fluid hover:shadow-[0_18px_40px_-22px_rgba(0,0,0,0.18)] ${
        wide ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
      }`}
    >
      <PlaceholderTile
        variant="light"
        glyph={<Camera size={wide ? 30 : 22} strokeWidth={1.25} />}
        label="Photo · capture pending"
      />

      {/* Top-left day chip — small editorial tag so day-grouping survives
          even if a tile gets shared/embedded out of its section context. */}
      <span
        className="absolute top-3 left-3 px-2 py-0.5 rounded-sm text-[10px] tracking-[0.2em] uppercase"
        style={{ backgroundColor: `${BRAND}cc`, color: "#fff" }}
      >
        {p.day}
      </span>
      <span className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-sm bg-black/55 text-white/90 text-[10px] tabular-nums">
        <Clock size={10} strokeWidth={1.5} /> {p.time}
      </span>

      {/* Bottom slab — caption + location. The transparent-to-cream
          gradient at the bottom lets the placeholder pattern show through
          without competing with the metadata. */}
      <div
        className="absolute bottom-0 left-0 right-0 pt-8 pb-3 px-3 text-neutral-950"
        style={{
          background:
            "linear-gradient(to top, rgba(239,233,221,0.95) 30%, rgba(239,233,221,0) 100%)",
        }}
      >
        <div className="text-[0.9375rem] tracking-tight" style={{ lineHeight: 1.25 }}>
          {p.caption}
        </div>
        <div className="mt-1 text-[11px] text-neutral-600 inline-flex items-center gap-1 truncate max-w-full">
          <MapPin size={10} strokeWidth={1.5} />
          <span className="truncate">{p.location}</span>
        </div>
      </div>
    </motion.button>
  );
}

export default function Gallery() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total = galleryPhotos.length;

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i + 1) % total)),
    [total],
  );
  const prev = useCallback(
    () => setOpenIndex((i) => (i === null ? null : (i - 1 + total) % total)),
    [total],
  );

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex, close, next, prev]);

  const active = openIndex !== null ? galleryPhotos[openIndex] : null;

  // Precompute the starting flat index per day group so PhotoTile knows the
  // correct lightbox cursor even when rendered inside a day section.
  let cursor = 0;
  const daysWithCursors = galleryDays.map((g) => {
    const start = cursor;
    cursor += g.photos.length;
    return { ...g, start };
  });

  return (
    <>
      <PageHero
        label="Gallery"
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Gallery" },
        ]}
        title={
          <>
            FISC 2026 <GradientText>in pictures.</GradientText>
          </>
        }
        subtitle="Plenaries, breakouts, gala dinners and steel-pan evenings — a visual record of four days in Port of Spain."
        image={HERO_GALLERY}
      />

      <GatedBody>
        <section className="py-12 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            {/* Status strip — sets the honest expectation: this is the planned
                visual record, not captured photography. */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10 md:mb-14 pb-6 md:pb-7 border-b border-neutral-200">
              <div className="text-sm text-neutral-500 inline-flex items-center gap-2">
                <Camera size={14} style={{ color: BRAND }} />
                {total} photos planned across {galleryDays.length} days · capture begins Jun 29, 2026
              </div>
              <div className="text-xs tracking-[0.25em] uppercase text-neutral-400">
                Files upload after the event
              </div>
            </div>

            {/* Per-day sections — each opens with a day header (label · date
                · weekday) and a short intro line, then the placeholder bento
                grid. Bento mirrors the prior shape so the post-event layout
                stays stable when real imagery lands. */}
            <div className="space-y-14 md:space-y-20">
              {daysWithCursors.map((group) => (
                <section key={group.day} aria-labelledby={`gallery-${group.day}`}>
                  <div className="flex flex-wrap items-end justify-between gap-4 mb-6 md:mb-8">
                    <div>
                      <SectionLabel>
                        {group.day} · {group.weekday}
                      </SectionLabel>
                      <h2
                        id={`gallery-${group.day}`}
                        className="tracking-[-0.02em] text-neutral-950"
                        style={{
                          fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                          lineHeight: 1.05,
                        }}
                      >
                        {group.date}
                      </h2>
                      <p
                        className="mt-2 text-neutral-700 max-w-2xl"
                        style={{ lineHeight: 1.65 }}
                      >
                        {group.intro}
                      </p>
                    </div>
                    <div className="text-xs tracking-[0.2em] uppercase text-neutral-400 tabular-nums">
                      {group.photos.length}{" "}
                      {group.photos.length === 1 ? "frame" : "frames"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 [grid-auto-flow:dense]">
                    {group.photos.map((p, i) => (
                      <PhotoTile
                        key={`${group.day}-${i}`}
                        p={p}
                        flatIndex={group.start + i}
                        i={i}
                        onOpen={setOpenIndex}
                      />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <AnimatePresence>
          {active && openIndex !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={close}
              className={`fixed inset-0 ${Z.modal} bg-black/90 backdrop-blur flex items-center justify-center p-4 md:p-10`}
              role="dialog"
              aria-modal="true"
              aria-label={`Photo ${openIndex + 1} of ${total}: ${active.caption}`}
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              {total > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                  aria-label="Previous photo"
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
                >
                  <ChevronLeft size={20} strokeWidth={1.5} />
                </button>
              )}
              {total > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                  aria-label="Next photo"
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
                >
                  <ChevronRight size={20} strokeWidth={1.5} />
                </button>
              )}

              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  className="relative w-full max-w-3xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Lightbox placeholder card — same PlaceholderTile pattern
                      as the grid, scaled up. The download button is omitted
                      pre-event (nothing real to download); after the event,
                      this branch swaps in <img> + the download anchor. */}
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden ring-1 ring-white/10">
                    <PlaceholderTile
                      variant="dark"
                      glyph={<Camera size={48} strokeWidth={1.25} />}
                      label="Photo · capture pending"
                    />
                  </div>

                  <div className="mt-5 md:mt-6 text-white">
                    <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/70">
                      <span
                        className="inline-flex items-center px-2.5 py-1 rounded-sm"
                        style={{ backgroundColor: `${BRAND}cc`, color: "#fff" }}
                      >
                        {active.day}
                      </span>
                      <span>{active.date}</span>
                      <span className="inline-flex items-center gap-1.5">
                        <Clock size={11} strokeWidth={1.5} /> {active.time}
                      </span>
                    </div>
                    <h3
                      className="mt-3 tracking-[-0.02em]"
                      style={{
                        fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
                        lineHeight: 1.15,
                      }}
                    >
                      {active.caption}
                    </h3>
                    <div className="mt-2 inline-flex items-center gap-1.5 text-white/65 text-sm">
                      <MapPin size={13} strokeWidth={1.5} /> {active.location}
                    </div>
                    {active.credit && (
                      <div className="mt-1 text-white/50 text-xs tracking-[0.15em] uppercase">
                        {active.credit}
                      </div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-5 md:bottom-7 right-5 md:right-10 text-white/55 text-xs tracking-[0.2em] uppercase tabular-nums pointer-events-none">
                {openIndex + 1} / {total}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GatedBody>
    </>
  );
}
