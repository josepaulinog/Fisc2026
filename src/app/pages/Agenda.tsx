import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_AGENDA, INK, TAG_COLORS, agenda, daySlugFor } from "../data";

export default function Agenda() {
  const [active, setActive] = useState(1);
  const current = agenda[active];
  const currentSlug = daySlugFor(current);
  return (
    <>
      <PageHero
        label="Programme"
        title={
          <>
            Four days.
            <br />
            One <GradientText>PFM agenda.</GradientText>
          </>
        }
        subtitle="Country-led workshops, presentations and panels — alongside cultural moments across Trinidad and Tobago."
        image={HERO_AGENDA}
        imageCaption="Workshop session · Country breakout"
      />
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: "#f6f4ef" }}>
        <div
          className="absolute top-0 right-0 w-[40rem] h-[40rem] rounded-full opacity-[0.07] blur-3xl -translate-y-1/2 translate-x-1/3"
          style={{ backgroundColor: BRAND }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 md:gap-6 mb-8 md:mb-12">
            <p className="text-neutral-600 max-w-2xl">
              Choose a day to explore the full programme. Click any session for the full briefing —
              time, speakers and context.
            </p>
            <a href="#" className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-neutral-300 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition">
              Download programme
              <Download size={16} />
            </a>
          </div>

          <div className="flex gap-2 mb-6 md:mb-8 overflow-x-auto pb-2 -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
            {agenda.map((d, i) => {
              const isActive = i === active;
              return (
                <button
                  key={d.label}
                  onClick={() => setActive(i)}
                  className={`shrink-0 px-4 md:px-5 py-3 rounded-lg border transition-all text-left ${
                    isActive
                      ? "bg-neutral-950 border-neutral-950 text-white"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                  }`}
                >
                  <div className={`tracking-tight ${isActive ? "text-white" : "text-neutral-950"}`} style={{ fontSize: "1rem" }}>{d.short}</div>
                  <div className={`text-xs mt-0.5 ${isActive ? "text-white/60" : "text-neutral-500"}`}>{d.date}</div>
                </button>
              );
            })}
          </div>

          <motion.div
            key={current.label}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="rounded-2xl overflow-hidden border border-neutral-200 bg-white"
          >
            <div className="relative p-6 md:p-10 text-white overflow-hidden" style={{ background: `linear-gradient(135deg, ${INK} 0%, #1a1a1a 55%, ${BRAND} 130%)` }}>
              <Grain />
              <div className="relative flex flex-wrap items-end justify-between gap-4 md:gap-6">
                <div>
                  <div className="tracking-[0.25em] text-white/60 text-xs">{current.date.toUpperCase()}</div>
                  <div className="mt-3 tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)", lineHeight: 1.05 }}>
                    {current.label}
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70 text-sm">
                  <span className="flex items-center gap-2"><MapPin size={14} /> Port of Spain</span>
                  <span className="w-px h-4 bg-white/20" />
                  <span>{current.sessions.length} sessions</span>
                </div>
              </div>
            </div>

            <div>
              {current.sessions.map((s, i) => (
                <Link
                  to={`/agenda/${currentSlug}/${i}`}
                  key={i}
                  className="group grid grid-cols-12 gap-3 md:gap-8 px-5 md:px-10 py-5 md:py-6 border-t first:border-t-0 border-neutral-100 hover:bg-neutral-50/60 transition"
                >
                  <div className="col-span-12 md:col-span-3">
                    <div className="text-neutral-500 tabular-nums text-sm md:text-base">{s.time}</div>
                    {s.tag && (
                      <span className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-md text-xs" style={{ backgroundColor: `${TAG_COLORS[s.tag]}18`, color: TAG_COLORS[s.tag] }}>
                        {s.tag}
                      </span>
                    )}
                  </div>
                  <div className="col-span-12 md:col-span-9">
                    <div className="flex items-start justify-between gap-3">
                      <div className="tracking-tight text-neutral-950 group-hover:text-neutral-950" style={{ fontSize: "1.125rem", lineHeight: 1.3 }}>
                        {s.title}
                      </div>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-neutral-300 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                      />
                    </div>
                    {s.desc && (
                      <p className="mt-2 text-neutral-600" style={{ lineHeight: 1.6 }}>
                        {/* Row-level synopsis: ~110 chars so delegates can scan a
                            day in one view. Full briefing lives on the detail
                            route (one click away). */}
                        {s.desc.length > 110 ? s.desc.slice(0, 110).trimEnd() + "…" : s.desc}
                      </p>
                    )}
                    {s.speakers && s.speakers.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                        {s.speakers.map((sp) => (
                          <div key={sp.name} className="flex items-center gap-3">
                            {sp.img ? (
                              <ImageWithFallback src={sp.img} alt={sp.name} className="w-9 h-9 rounded-full object-cover bg-neutral-100" />
                            ) : (
                              <div className="w-9 h-9 rounded-full flex items-center justify-center text-white" style={{ backgroundColor: BRAND, fontSize: "0.75rem" }}>FB</div>
                            )}
                            <div>
                              <div className="text-neutral-950" style={{ lineHeight: 1.2 }}>{sp.name}</div>
                              {sp.role && <div className="text-neutral-500 text-sm">{sp.role}</div>}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
