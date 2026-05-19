import { motion } from "motion/react";
import { BRAND, BRAND_SOFT, countries } from "../data";
import { ImageWithFallback } from "./figma/ImageWithFallback";

/**
 * GradientText — italic, brand-orange gradient phrase used to highlight
 * the accent word(s) in PageHero titles. Centralised so every hero
 * across the site shares the exact same look.
 */
export function GradientText({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={`italic ${className}`}
      style={{
        background: `linear-gradient(120deg, ${BRAND_SOFT}, ${BRAND})`,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
    >
      {children}
    </span>
  );
}

export function Grain() {
  return (
    <div
      className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-overlay"
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
      }}
    />
  );
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 mb-6">
      <span className="w-8 h-px bg-neutral-950" />
      <span className="tracking-[0.25em] text-neutral-950 text-sm">{children}</span>
    </div>
  );
}

export function Marquee() {
  return (
    <div
      className="relative border-y border-white/10 overflow-hidden py-5"
      style={{ backgroundColor: "rgba(0,0,0,0.4)" }}
    >
      <motion.div
        className="flex gap-12 whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {[...countries, ...countries].map((c, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-12 text-white/70 tracking-[0.2em]"
            style={{ fontSize: "1rem" }}
          >
            {c}
            <span style={{ color: BRAND }}>✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function PageHero({
  label,
  title,
  subtitle,
  image,
  imageCaption,
}: {
  label: string;
  title: React.ReactNode;
  subtitle?: string;
  image?: string;
  imageCaption?: string;
}) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24" style={{ backgroundColor: "#0a0a0a" }}>
      {image && (
        <div className="absolute inset-0">
          <ImageWithFallback
            src={image}
            alt=""
            className="w-full h-full object-cover opacity-45"
          />
        </div>
      )}
      <div
        className="absolute inset-0"
        style={{
          background: image
            ? `radial-gradient(ellipse at 85% 0%, ${BRAND}55 0%, transparent 55%), linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.55) 40%, #0a0a0a 100%)`
            : `radial-gradient(ellipse at 80% 10%, ${BRAND}55 0%, transparent 50%), linear-gradient(180deg, #0a0a0a 0%, transparent 40%, #0a0a0a 100%)`,
        }}
      />
      <Grain />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6">
        <div className="inline-flex items-center gap-3 mb-6">
          <span className="w-8 h-px bg-white" />
          <span className="tracking-[0.25em] text-white text-sm">{label}</span>
        </div>
        <h1
          className="text-white tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)", lineHeight: 1 }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="mt-6 max-w-2xl text-white/80" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
            {subtitle}
          </p>
        )}
        {imageCaption && (
          <div className="mt-10 md:mt-16 inline-flex items-center gap-2 text-white/50 text-xs tracking-[0.2em] uppercase">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
            {imageCaption}
          </div>
        )}
      </div>
    </section>
  );
}
