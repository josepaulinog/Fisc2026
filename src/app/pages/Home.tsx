import { Link } from "react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, Play, Sun } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, Marquee } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_IMG, INK, stats, navItems } from "../data";

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  return (
    <section className="relative overflow-hidden text-white pt-28 md:pt-32" style={{ backgroundColor: INK }}>
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <ImageWithFallback src={HERO_IMG} alt="Caribbean coast" className="w-full h-full object-cover opacity-50" />
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 80% 10%, ${BRAND}55 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #00000099 0%, transparent 60%), linear-gradient(180deg, ${INK} 0%, transparent 30%, ${INK}cc 100%)`,
        }}
      />
      <Grain />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-12 pb-10 md:pt-24 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          className="flex items-center gap-3 mb-8 md:mb-10"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: BRAND }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: BRAND }} />
            </span>
            <span className="tracking-[0.2em] md:tracking-[0.25em] text-white/90 text-xs md:text-sm">
              FISC · 2026 · TRINIDAD & TOBAGO
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}
          className="text-white tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.75rem, 9vw, 8rem)", lineHeight: 0.95 }}
        >
          Where finance
          <br />
          meets the{" "}
          <span className="relative inline-block">
            <span className="italic" style={{ background: `linear-gradient(120deg, ${BRAND_SOFT} 0%, ${BRAND} 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Caribbean
            </span>
            <Sun className="absolute -top-4 -right-12 hidden md:block" size={48} style={{ color: BRAND }} />
          </span>.
        </motion.h1>

        <div className="mt-10 md:mt-12 grid lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-6"
          >
            <p className="text-white/75 max-w-xl" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.55 }}>
              The FreeBalance International Steering Committee sails to Port of Spain — four
              days of country-led reform, co-creation and conversation under Caribbean skies.
              The 2026 delegate list is closed.
            </p>
            <div className="mt-6 md:mt-8 flex flex-wrap gap-3">
              <button style={{ backgroundColor: BRAND }} className="group inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-4 rounded-lg text-white hover:scale-[1.02] transition-all">
                Delegate portal
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="inline-flex items-center gap-2 px-6 md:px-7 py-3 md:py-4 rounded-lg border border-white/30 text-white hover:bg-white/10 transition backdrop-blur">
                <Play size={16} fill="currentColor" /> Watch FISC 2025
              </button>
            </div>
            <div className="mt-5 md:mt-6 inline-flex items-center gap-2 text-white/60 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
              Invitation only · Hosted by FreeBalance & the Government of Trinidad and Tobago
            </div>
          </motion.div>
        </div>
      </div>
      <Marquee />
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-5 md:px-6 grid grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="py-8 md:py-10 px-3 md:px-4 border-l first:border-l-0 [&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l border-neutral-100 flex items-center gap-3 md:gap-4"
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
              <s.icon size={18} />
            </div>
            <div>
              <div className="tracking-tight text-neutral-950" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)", lineHeight: 1 }}>{s.value}</div>
              <div className="text-neutral-500 text-sm md:text-base mt-1">{s.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Teasers() {
  const items = navItems.map((n, i) => ({
    ...n,
    desc: [
      "Why FISC matters and who is in the room.",
      "Four days, country-led PFM workshops and panels.",
      "The voices shaping public finance reform.",
      "Port of Spain, Hyatt Regency — and the islands.",
      "Delegate guide, recordings, slides, photos.",
    ][i],
  }));
  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.label}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
            >
              <Link
                to={it.to}
                className="group block p-7 rounded-2xl border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all h-full"
              >
                <div className="flex items-start justify-between">
                  <span className="tracking-widest text-neutral-400 group-hover:text-white/50 text-sm">0{i + 1}</span>
                  <ArrowUpRight size={18} className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition" />
                </div>
                <div className="mt-3 tracking-tight" style={{ fontSize: "1.375rem" }}>{it.label}</div>
                <p className="mt-2 text-neutral-600 group-hover:text-white/70">{it.desc}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <StatsBar />
      <Teasers />
    </>
  );
}
