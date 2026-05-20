import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Camera, X } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, HERO_GALLERY, galleryPhotos, type GalleryPhoto } from "../data";

function PhotoTile({ p, i, onOpen }: { p: GalleryPhoto; i: number; onOpen: (p: GalleryPhoto) => void }) {
  const wide = p.span === "wide";
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (i % 8) * 0.04 }}
      onClick={() => onOpen(p)}
      className={`group relative rounded-2xl overflow-hidden bg-neutral-100 text-left ${
        wide ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
      }`}
    >
      <ImageWithFallback
        src={p.src}
        alt={p.caption}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent" />
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <div className="text-white/85 text-sm" style={{ lineHeight: 1.3 }}>{p.caption}</div>
      </div>
    </motion.button>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<GalleryPhoto | null>(null);

  return (
    <>
      <PageHero
        label="Gallery"
        title={
          <>
            FISC 2026 <GradientText>in pictures.</GradientText>
          </>
        }
        subtitle="Plenaries, breakouts, gala dinners and steel-pan evenings — a visual record of four days in Port of Spain."
        image={HERO_GALLERY}
        imageCaption={`${galleryPhotos.length} photos · 2026 edition`}
      />

      <GatedBody>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
            <div className="text-sm text-neutral-500 inline-flex items-center gap-2">
              <Camera size={14} style={{ color: BRAND }} />
              {galleryPhotos.length} {galleryPhotos.length === 1 ? "photo" : "photos"} from FISC 2026
            </div>
            <div className="text-xs tracking-[0.25em] uppercase text-neutral-400">
              Earlier editions coming soon
            </div>
          </div>

          {/* Bento grid: 2 cols on mobile, 4 cols on md+. Wide tiles take 2 cols
              with a landscape aspect; everything else is a uniform 4:5 portrait. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 [grid-auto-flow:dense]">
            {galleryPhotos.map((p, i) => (
              <PhotoTile key={`${p.src}-${i}`} p={p} i={i} onOpen={setOpen} />
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
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            className="fixed inset-0 z-[80] bg-black/85 backdrop-blur flex items-center justify-center p-4 md:p-10"
          >
            <button
              onClick={() => setOpen(null)}
              aria-label="Close"
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
            >
              <X size={18} />
            </button>
            <motion.div
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="relative max-w-5xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <ImageWithFallback
                src={open.src}
                alt={open.caption}
                className="w-full h-auto rounded-2xl object-contain max-h-[80vh]"
              />
              <div className="mt-4 text-white/85">{open.caption}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      </GatedBody>
    </>
  );
}
