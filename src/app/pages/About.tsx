import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { PageHero, SectionLabel } from "../components/shared";
import { ABOUT_IMG, BRAND, HERO_ABOUT } from "../data";

export default function About() {
  return (
    <>
      <PageHero
        label="About FISC"
        title={<>A global forum for country-led <span className="italic" style={{ color: BRAND }}>public finance reform.</span></>}
        subtitle="FISC is the annual gathering of the FreeBalance customer community — finance ministers, treasurers, budget directors and PFM practitioners from emerging and developing nations."
        image={HERO_ABOUT}
        imageCaption="FISC 2019 · Plenary session"
      />
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="lg:col-span-5"
            >
              <SectionLabel>The community</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                18 editions,<br />one community.
              </h2>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="lg:col-span-7"
            >
              <p className="text-neutral-600" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
                Together, delegates share progress, challenge assumptions and co-create the next
                generation of FreeBalance solutions. FISC has shaped product roadmap decisions
                that today serve over 40 governments worldwide.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 md:mt-20 grid lg:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="lg:col-span-7 relative rounded-3xl overflow-hidden aspect-[16/10] group"
            >
              <ImageWithFallback src={ABOUT_IMG} alt="FISC sessions" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-5 md:bottom-6 left-5 md:left-6 right-5 md:right-6 text-white flex items-end justify-between">
                <div>
                  <div className="tracking-widest text-white/70 text-sm">EST. 2007</div>
                  <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                    18 editions, one community.
                  </div>
                </div>
                <button className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/30 backdrop-blur flex items-center justify-center hover:bg-white hover:text-neutral-950 transition shrink-0">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>

            <div className="lg:col-span-5 grid gap-4 md:gap-6">
              {[
                { t: "Peer Exchange", d: "Country-to-country learning across regions and reform stages.", n: "01" },
                { t: "Product Co-Creation", d: "Shape the FreeBalance Accountability Suite roadmap.", n: "02" },
                { t: "Workshops & Networking", d: "Deep dives on budget, revenue, treasury and payroll.", n: "03" },
              ].map((b, i) => (
                <motion.div
                  key={b.t}
                  initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-6 md:p-7 rounded-2xl border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all"
                >
                  <div className="flex items-start justify-between">
                    <span className="tracking-widest text-neutral-400 group-hover:text-white/50 text-sm">{b.n}</span>
                    <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition" />
                  </div>
                  <div className="mt-3 tracking-tight" style={{ fontSize: "1.375rem" }}>{b.t}</div>
                  <p className="mt-2 text-neutral-600 group-hover:text-white/70">{b.d}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
