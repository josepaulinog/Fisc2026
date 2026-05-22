import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, ChevronLeft, ChevronRight, Download, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, HERO_GALLERY, galleryPhotos, type GalleryPhoto } from "../data";
import { Z } from "../tokens";

function PhotoTile({
  p,
  i,
  onOpen,
}: {
  p: GalleryPhoto;
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
      onClick={() => onOpen(i)}
      aria-label={`Open photo ${i + 1}: ${p.caption}`}
      className={`group relative rounded-2xl overflow-hidden bg-neutral-100 text-left ${
        wide ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
      }`}
    >
      <ImageWithFallback
        src={p.src}
        alt={p.caption}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[450ms] ease-[cubic-bezier(0.32,0.72,0,1)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <div className="text-white/85 text-sm" style={{ lineHeight: 1.3 }}>
          {p.caption}
        </div>
      </div>
    </motion.button>
  );
}

/**
 * Slugify a caption for use as a download filename. "Plenary applause" →
 * "plenary-applause". Strips characters that browsers will reject in the
 * download attribute, falls back to "photo" if the caption produces an
 * empty string (e.g. caption was emoji-only).
 */
function slugCaption(caption: string): string {
  const slug = caption
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return slug || "photo";
}

/**
 * Resolve the file extension of a photo URL so the download has a sensible
 * name. Image assets pipe through Vite as fingerprinted URLs (e.g.
 * `/assets/about-DlBoDXaB.png`), and the extension is preserved at the
 * tail. We strip the query string first because some pipelines append one.
 */
function extOf(url: string): string {
  const cleaned = url.split("?")[0];
  const match = cleaned.match(/\.([a-zA-Z0-9]{2,5})$/);
  return match ? match[1].toLowerCase() : "jpg";
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

  // Keyboard navigation: ESC closes, ← / → cycle. Effect only registers
  // while the lightbox is open so non-lightbox keys aren't swallowed.
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
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
              <div className="text-sm text-neutral-500 inline-flex items-center gap-2">
                <Camera size={14} style={{ color: BRAND }} />
                {galleryPhotos.length}{" "}
                {galleryPhotos.length === 1 ? "photo" : "photos"} from FISC 2026
              </div>
              <div className="text-xs tracking-[0.25em] uppercase text-neutral-400">
                Earlier editions coming soon
              </div>
            </div>

            {/* Bento grid: 2 cols on mobile, 4 cols on md+. Wide tiles take 2 cols
                with a landscape aspect; everything else is a uniform 4:5 portrait. */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 [grid-auto-flow:dense]">
              {galleryPhotos.map((p, i) => (
                <PhotoTile
                  key={`${p.src}-${i}`}
                  p={p}
                  i={i}
                  onOpen={setOpenIndex}
                />
              ))}
            </div>

            {galleryPhotos.length === 0 && (
              <div className="text-center py-20 text-neutral-500 border border-dashed border-neutral-200 rounded-2xl">
                <Camera size={28} className="mx-auto mb-3 text-neutral-300" />
                The 2026 gallery will appear here after the event.
              </div>
            )}
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
              {/* Top-right close + download cluster. Sits above the image so
                  it's always reachable, even when the image fills the viewport. */}
              <div className="absolute top-5 right-5 flex items-center gap-2">
                <a
                  href={active.src}
                  download={`fisc-2026-${slugCaption(active.caption)}.${extOf(active.src)}`}
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Download photo: ${active.caption}`}
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
                >
                  <Download size={16} strokeWidth={1.5} />
                </a>
                <button
                  onClick={close}
                  aria-label="Close"
                  className="w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
                >
                  <X size={18} strokeWidth={1.5} />
                </button>
              </div>

              {/* Previous arrow — left side, vertically centered. Disabled
                  visual is rare here because the lightbox wraps around, but
                  if total === 1 we hide the arrows entirely. */}
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

              {/* Image frame — animates between photos so the lightbox feels
                  continuous instead of "modal close → modal open" per click.
                  AnimatePresence mode "wait" guarantees one frame is fully
                  out before the next mounts (no double-image flash). */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={openIndex}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
                  className="relative max-w-5xl w-full"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ImageWithFallback
                    src={active.src}
                    alt={active.caption}
                    className="w-full h-auto rounded-2xl object-contain max-h-[80vh]"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Caption + counter strip below the image. Counter sits to the
                  right so the eye reads caption-first; tabular-nums keeps
                  the digits from jumping as the index changes. */}
              <div className="absolute bottom-5 md:bottom-7 left-5 md:left-10 right-5 md:right-10 flex items-center justify-between gap-4 text-white pointer-events-none">
                <div className="text-white/85 text-sm md:text-base max-w-2xl">
                  {active.caption}
                </div>
                <div className="text-white/55 text-xs tracking-[0.2em] uppercase tabular-nums shrink-0">
                  {openIndex + 1} / {total}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GatedBody>
    </>
  );
}
