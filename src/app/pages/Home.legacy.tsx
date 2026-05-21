import { Link } from "react-router";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Plane,
  Play,
  Sun,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, Marquee, SectionLabel } from "../components/shared";
import {
  BRAND,
  BRAND_SOFT,
  HERO_IMG,
  INK,
  TAG_COLORS,
  VENUE_HOTEL,
  agenda,
  daySlugFor,
  navItems,
  speakers,
  stats,
} from "../data";

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 150]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0.3]);
  // Reduced-motion users get the static hero image instead of the autoplaying
  // video. Both share the same dim treatment (opacity-50) so the overlay
  // gradients land identically on either source.
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative overflow-hidden text-white pt-28 md:pt-32" style={{ backgroundColor: INK }}>
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        {prefersReducedMotion ? (
          <ImageWithFallback src={HERO_IMG} alt="Caribbean coast" className="w-full h-full object-cover opacity-50" />
        ) : (
          // Native <video> for the hero loop. hero-video.mp4 lives in /public
          // so Vite serves it directly (range-requestable, not bundled into the
          // JS chunk). The native element gives us instant first-frame paint
          // from `poster`, browser-native autoplay-on-mute, and no boot chrome
          // to mask — unlike the YouTube iframe it replaces.
          //   - muted + autoPlay + playsInline satisfy every browser's
          //     autoplay policy (iOS Safari especially)
          //   - loop keeps it cycling indefinitely
          //   - preload="auto" tells the browser this is above-the-fold and
          //     worth fetching eagerly
          //   - poster paints HERO_IMG instantly while bytes arrive, so the
          //     hero is never empty
          //   - opacity-50 dims the source to match the design's near-black
          //     canvas treatment; pointer-events:none keeps CTAs clickable
          <video
            src="/hero-video.mp4"
            poster={HERO_IMG}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full object-cover opacity-50"
          />
        )}
      </motion.div>
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 80% 10%, ${BRAND}55 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #00000099 0%, transparent 60%), linear-gradient(180deg, ${INK} 0%, transparent 30%, ${INK}cc 100%)`,
        }}
      />
      <Grain />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-12 pb-8 md:pt-24 md:pb-12">
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
          Where public finance
          <br />
          meets the{" "}
          <span className="relative inline-block">
            <GradientText tone="light">Caribbean</GradientText>
            <Sun className="sun-rotate absolute -top-4 -right-12 hidden md:block" size={48} style={{ color: BRAND }} />
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
  // Thin one-line ticker: four columns on desktop, 2×2 on mobile. Number and
  // label share a baseline so the row reads as a single horizontal beat,
  // matching the mono cadence of the country marquee directly above. The
  // brand-orange "+" is split off the value at render time so only the plus
  // gets coloured — the digits stay near-ink. Replaces the earlier centred-
  // billboard pattern, which read as a loading state at full viewport width.
  return (
    <section className="bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => {
            const hasPlus = s.value.endsWith("+");
            const numPart = hasPlus ? s.value.slice(0, -1) : s.value;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={
                  // Border logic: every cell has a left border, except the
                  // first overall. On mobile the 3rd cell starts a new row
                  // so its left border drops and a top border picks up the
                  // separation; the 4th gets a top border too. Desktop
                  // reverses both (the 3rd cell needs its left border back).
                  "py-10 md:py-14 px-4 md:px-6 flex items-baseline gap-3 md:gap-5 " +
                  "border-l first:border-l-0 " +
                  "[&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l " +
                  "[&:nth-child(3)]:border-t md:[&:nth-child(3)]:border-t-0 " +
                  "[&:nth-child(4)]:border-t md:[&:nth-child(4)]:border-t-0 " +
                  "border-neutral-100"
                }
              >
                <span
                  className="tracking-tight text-neutral-950 tabular-nums"
                  style={{
                    fontSize: "clamp(2.25rem, 4.4vw, 3.25rem)",
                    lineHeight: 1,
                    letterSpacing: "-0.025em",
                    fontWeight: 500,
                  }}
                >
                  {numPart}
                  {hasPlus && <span style={{ color: BRAND }}>+</span>}
                </span>
                <span className="text-neutral-500 text-xs md:text-sm tracking-[0.22em] uppercase">
                  {s.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 3 keynote speakers (filtered by featured flag on the speaker entries)
function FeaturedSpeakers() {
  const featured = speakers.filter((s) => s.featured);
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#f6f4ef" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <SectionLabel>Featured speakers</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
              Voices shaping <em className="italic">the programme.</em>
            </h2>
          </div>
          <Link
            to="/speakers"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition"
          >
            All presenters
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {featured.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to="/speakers"
                className="relative block rounded-3xl overflow-hidden aspect-[4/5] group"
              >
                <ImageWithFallback
                  src={s.img}
                  alt={s.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, transparent 35%, ${INK}cc 75%, ${INK} 100%)`,
                  }}
                />
                <div className="absolute top-5 right-5">
                  <span
                    className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur border border-white/25 text-white group-hover:rotate-45 transition-transform"
                  >
                    <ArrowUpRight size={16} />
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <div className="tracking-[0.25em] text-white/60 text-xs uppercase">{s.org}</div>
                  <h3
                    className="mt-2 tracking-[-0.02em]"
                    style={{ fontSize: "clamp(1.25rem, 2vw, 1.5rem)", lineHeight: 1.1 }}
                  >
                    {s.name}
                  </h3>
                  <p className="mt-1" style={{ color: BRAND_SOFT }}>{s.role}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Marquee picks across the four days. Indices reference agenda[][].
const SESSION_HIGHLIGHTS: { dayIdx: number; sessionIdx: number }[] = [
  { dayIdx: 1, sessionIdx: 2 }, // Implement PFM for National Strategies (Manuel)
  { dayIdx: 2, sessionIdx: 1 }, // What's New: FreeBalance Accountability Suite (Aldo)
  { dayIdx: 3, sessionIdx: 3 }, // Artificial Intelligence in Public Finance (Doug)
  { dayIdx: 4, sessionIdx: 1 }, // PFM Resilience (Carolyn)
];

function Highlights() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10 md:mb-14">
          <div>
            <SectionLabel>Programme highlights</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
              Four days, <em className="italic">built around you.</em>
            </h2>
          </div>
          <Link
            to="/agenda"
            className="group inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-300 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition"
          >
            Full agenda
            <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
          </Link>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 md:gap-5">
          {SESSION_HIGHLIGHTS.map(({ dayIdx, sessionIdx }, i) => {
            const day = agenda[dayIdx];
            const session = day.sessions[sessionIdx];
            const tagColor = session.tag ? TAG_COLORS[session.tag] : undefined;
            return (
              <motion.div
                key={`${dayIdx}-${sessionIdx}`}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.08 }}
              >
                <Link
                  to={`/agenda/${daySlugFor(day)}/${sessionIdx}`}
                  className="group h-full block p-6 md:p-7 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-xs tracking-[0.2em] uppercase text-neutral-500 group-hover:text-white/60">
                        {day.short}
                      </span>
                      {session.tag && tagColor && (
                        <span
                          className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs"
                          style={{ backgroundColor: `${tagColor}18`, color: tagColor }}
                        >
                          {session.tag}
                        </span>
                      )}
                    </div>
                    <ArrowUpRight
                      size={16}
                      className="text-neutral-400 group-hover:text-white group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition shrink-0"
                    />
                  </div>
                  <h3 className="mt-4 tracking-tight" style={{ fontSize: "1.25rem", lineHeight: 1.25 }}>
                    {session.title}
                  </h3>
                  {session.desc && (
                    <p className="mt-3 text-neutral-700 group-hover:text-white/78 text-sm" style={{ lineHeight: 1.6 }}>
                      {session.desc.length > 150 ? session.desc.slice(0, 150) + "…" : session.desc}
                    </p>
                  )}
                  <div className="mt-5 flex items-center gap-2 text-sm text-neutral-500 group-hover:text-white/65">
                    <Clock size={14} />
                    <span className="tabular-nums">{session.time}</span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Destination() {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: "#f6f4ef" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 md:gap-14 items-center">
          <div className="lg:col-span-5">
            <SectionLabel>The destination</SectionLabel>
            <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)", lineHeight: 1.05 }}>
              Port of Spain <em className="italic">awaits.</em>
            </h2>
            <p className="mt-5 text-neutral-700" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
              FISC 2026 is hosted on the Hyatt Regency's waterfront floor — air-conditioned
              plenaries by day, Caribbean rhythm by night. The Government of Trinidad and Tobago
              joins as official host.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { icon: Calendar, k: "Dates", v: "Jun 29 – Jul 2" },
                { icon: MapPin, k: "Venue", v: "Hyatt Regency" },
                { icon: Plane, k: "Airport", v: "POS · 30 min" },
              ].map((f) => (
                <div key={f.k} className="p-4 rounded-xl bg-white border border-neutral-200">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                    style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                  >
                    <f.icon size={15} />
                  </div>
                  <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">{f.k}</div>
                  <div
                    className="mt-1 tracking-tight text-neutral-950"
                    style={{ fontSize: "0.95rem", lineHeight: 1.2 }}
                  >
                    {f.v}
                  </div>
                </div>
              ))}
            </div>

            <Link
              to="/venue"
              style={{ backgroundColor: INK }}
              className="mt-8 group inline-flex items-center gap-2 text-white pl-5 pr-2 py-3 rounded-lg hover:opacity-90 transition"
            >
              Explore the venue
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ backgroundColor: BRAND }}
              >
                <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
              </span>
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[4/5] md:aspect-[4/3] group"
          >
            <ImageWithFallback
              src={VENUE_HOTEL}
              alt="Hyatt Regency, Port of Spain"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(180deg, transparent 40%, ${INK}66 80%, ${INK}88 100%), radial-gradient(ellipse at 90% 10%, ${BRAND}33 0%, transparent 55%)`,
              }}
            />
            <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/15 backdrop-blur border border-white/20 text-white text-xs tracking-[0.2em]">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
              HYATT REGENCY
            </div>
            <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7 right-5 md:right-7 text-white">
              <div className="text-white/70 text-xs tracking-widest">1 WRIGHTSON ROAD</div>
              <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.1 }}>
                On the harbour.
              </div>
            </div>
          </motion.div>
        </div>
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
                to={it.to ?? "/"}
                className="group block p-7 rounded-2xl border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all h-full"
              >
                <div className="flex items-start justify-between">
                  <span className="tracking-widest text-neutral-400 group-hover:text-white/65 text-sm">0{i + 1}</span>
                  <ArrowUpRight size={18} className="opacity-60 group-hover:opacity-100 group-hover:-translate-y-1 group-hover:translate-x-1 transition" />
                </div>
                <div className="mt-3 tracking-tight" style={{ fontSize: "1.375rem" }}>{it.label}</div>
                <p className="mt-2 text-neutral-700 group-hover:text-white/78">{it.desc}</p>
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
      <FeaturedSpeakers />
      <Highlights />
      <Destination />
      <Teasers />
    </>
  );
}
