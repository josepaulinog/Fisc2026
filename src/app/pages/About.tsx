import { motion } from "motion/react";
import { ArrowUpRight, Globe, Linkedin, MessagesSquare, Twitter, Zap } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GradientText, PageHero, SectionLabel } from "../components/shared";
import { ABOUT_IMG, BRAND, HERO_ABOUT } from "../data";

const APPROACH = [
  {
    icon: Globe,
    title: "Regional Collaboration",
    desc: "Government finance leaders and PFM practitioners exchange experience across countries, regions, and reform contexts.",
  },
  {
    icon: MessagesSquare,
    title: "Knowledge Exchange",
    desc: "Delegates share lessons on fiscal policy, budget transparency, digital systems, and public sector modernisation.",
  },
  {
    icon: Zap,
    title: "Applied Solutions",
    desc: "FISC turns discussion into practical insight, helping shape better implementation strategies and future FreeBalance solutions.",
  },
];

const BENEFITS = [
  {
    n: "01",
    t: "Peer-to-peer knowledge exchange",
    d: "Country-to-country learning on managing organisational change, overcoming obstacles and leading effective governance.",
  },
  {
    n: "02",
    t: "Good practices in PFM reform",
    d: "Governments share real experiences modernising financial systems, improving transparency and implementing digital solutions.",
  },
  {
    n: "03",
    t: "Global network of PFM leaders",
    d: "Customers connect with government officials, digital transformation experts and FreeBalance leadership in an open, collaborative setting.",
  },
  {
    n: "04",
    t: "Shared success, shared challenges",
    d: "Honest conversations about what's worked, what hasn't, and how to navigate complex reforms — so every delegate leaves with practical insight.",
  },
];

export default function About() {
  return (
    <>
      <PageHero
        label="About FISC"
        title={<>A global forum for <br></br><GradientText>public finance reform.</GradientText></>}
        subtitle="FISC is the annual gathering of the FreeBalance customer community — finance ministers, treasurers, budget directors and PFM practitioners from emerging and developing nations."
        image={HERO_ABOUT}
        hasGrid={true}
        hasSunset={true}
      />

      {/* OUR APPROACH — 3 pillars */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center justify-center mb-6">
              <SectionLabel>Our approach</SectionLabel>
            </div>
            <h2
              className="tracking-[-0.02em] text-neutral-950 max-w-2xl mx-auto"
              style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}
            >
              A platform for collaborative engagement.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {APPROACH.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="group block rounded-xl p-1.5 bg-black/[0.02] hover:bg-black/[0.04] ring-1 ring-black/[0.04] hover:ring-black/[0.08] hover:-translate-y-0.5 shadow-sm hover:shadow-md active:scale-[0.98] transition-fluid"
              >
                <div className="h-full rounded-lg bg-white ring-1 ring-black/[0.03] shadow-[inset_0_1.5px_0_rgba(255,255,255,0.9)] p-5 md:p-7 group-hover:bg-[#fbfaf8]/40 transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col items-start">
                  <div
                    className="w-11 h-11 md:w-12 md:h-12 rounded-sm flex items-center justify-center mb-4 md:mb-5 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:scale-105"
                    style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                  >
                    <p.icon size={20} strokeWidth={1.5} />
                  </div>
                  <div className="tracking-tight text-neutral-950 text-[1.125rem] md:text-[1.25rem] font-medium" style={{ lineHeight: 1.2 }}>
                    {p.title}
                  </div>
                  <p
                    className="mt-2.5 md:mt-3 text-neutral-700 text-[0.9375rem] md:text-base"
                    style={{ lineHeight: 1.6 }}
                  >
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 18 EDITIONS — heritage moment */}
      <section className="py-14 md:py-28" style={{ backgroundColor: "#ededed" }}>
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
              <p className="text-neutral-700" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
                Together, delegates share progress, challenge assumptions and co-create the next
                generation of FreeBalance solutions. FISC has shaped product roadmap decisions
                that now reach governments across more than 40 countries.
              </p>

              {/* Editorial pull-quotes replace the feature-bullet list — heritage
                  sections read warmer with attributed voices than capability
                  checkboxes. Three short quotes, attributed by role + country
                  (deliberately not real names — this is a prototype). */}
              <div className="mt-8 grid gap-5">
                {[
                  {
                    q: "FISC is the only room where my counterparts and the engineers building the system are in the same conversation.",
                    a: "Director of Budget",
                    c: "Sierra Leone",
                  },
                  {
                    q: "We came to listen. We left with a four-year reform timeline that's now national policy.",
                    a: "Permanent Secretary, Finance",
                    c: "Saint Lucia",
                  },
                  {
                    q: "Eighteen years of these gatherings means trust. You don't get that on a webinar.",
                    a: "Senior Advisor, PFM Reform",
                    c: "Mongolia",
                  },
                ].map((pq) => (
                  <figure
                    key={pq.q}
                    className="group/quote relative pl-4 md:pl-6 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:translate-x-1"
                  >
                    <span
                      aria-hidden
                      className="absolute left-0 top-0 bottom-0 w-px transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/quote:w-0.5 md:group-hover/quote:w-[3px]"
                      style={{ backgroundColor: BRAND }}
                    />
                    <blockquote
                      className="text-neutral-800 text-[1rem] md:text-[1.0625rem] transition-colors duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/quote:text-neutral-950"
                      style={{ lineHeight: 1.55 }}
                    >
                      <span className="font-display italic">"</span>
                      {pq.q}
                      <span className="font-display italic">"</span>
                    </blockquote>
                    <figcaption className="mt-1.5 md:mt-2 text-neutral-500 text-[0.8125rem] md:text-sm tracking-wide">
                      {pq.a} · <span className="text-neutral-700">{pq.c}</span>
                    </figcaption>
                  </figure>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
            className="mt-12 md:mt-16 relative rounded-xl overflow-hidden aspect-square md:aspect-[21/9] group ring-1 ring-black/[0.08] shadow-sm hover:shadow-xl hover:shadow-black/[0.08] transition-[box-shadow] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            <ImageWithFallback
              src={ABOUT_IMG}
              alt="The FISC delegation"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full transition-all duration-1000 ease-[cubic-bezier(0.32,0.72,0,1)] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
            <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7 right-5 md:right-7 text-white flex items-end justify-between gap-4 z-20">
              <div>
                <div className="tracking-widest text-white/70 text-sm">EST. 2007 · DILI 2025</div>
                <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1.25rem, 3vw, 1.75rem)" }}>
                  The delegation, last year.
                </div>
              </div>
              <button className="group/btn w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/10 border border-white/30 backdrop-blur flex items-center justify-center hover:bg-white hover:text-neutral-950 active:scale-[0.95] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] shrink-0">
                <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* KEY BENEFITS — 2x2 grid */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 mb-12 md:mb-16">
            <div className="lg:col-span-5">
              <SectionLabel>Key benefits</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                Why delegates keep coming back.
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-neutral-700" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                FISC brings together customers at every stage of their PFM modernisation journey.
                Some have used FreeBalance solutions for over twenty-five years; others are just
                beginning. Either way, you leave Port of Spain with peer relationships and a clearer
                route forward.
              </p>
            </div>
          </div>

          {/* Editorial 2-col grid — borderless rows separated by hairlines.
              Reads differently from the bordered/hover-invert "Our approach"
              cards above, which is the design point. The big tabular numeral
              sits left of each title; the body breathes alongside. */}
          <div className="grid sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-0">
            {BENEFITS.map((b, i) => (
              <motion.div
                key={b.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 2) * 0.1, duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                className="group py-6 md:py-8 border-t border-neutral-200 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#fbfaf8]/60 hover:-mx-4 hover:px-4 rounded-xl"
              >
                <div className="flex items-baseline gap-4 md:gap-5">
                  <span
                    className="tabular-nums tracking-tight text-neutral-300 shrink-0 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:text-[#fd6b18] group-hover:-translate-y-1 inline-block will-change-transform"
                    style={{ fontSize: "clamp(1.625rem, 2.5vw, 2rem)", lineHeight: 1, fontWeight: 300 }}
                  >
                    {b.n}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="tracking-tight text-neutral-950 text-[1.0625rem] md:text-[1.1875rem]" style={{ lineHeight: 1.25, fontWeight: 500 }}>
                      {b.t}
                    </div>
                    <p className="mt-2 text-neutral-700 max-w-[55ch]" style={{ fontSize: "1rem", lineHeight: 1.6 }}>
                      {b.d}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONNECT WITH US */}
      <section className="py-20 md:py-24 bg-white border-t border-neutral-100">
        <div className="max-w-3xl mx-auto px-5 md:px-6 text-center">
          <div className="inline-flex items-center justify-center mb-6">
            <SectionLabel>Stay connected</SectionLabel>
          </div>
          <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
            Follow the conversation.
          </h2>
          <p className="mt-4 text-neutral-700 max-w-md mx-auto" style={{ lineHeight: 1.65 }}>
            Public updates from FISC 2026 — reflections, recaps and news from the global PFM community.
          </p>

          <div className="mt-8 flex items-center justify-center gap-2">
            {[
              { Icon: Twitter, label: "X", href: "#" },
              { Icon: Linkedin, label: "LinkedIn", href: "#" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 rounded-full ring-1 ring-black/[0.08] text-neutral-700 hover:text-white hover:bg-[#fd6b18] hover:ring-[#fd6b18] flex items-center justify-center active:scale-[0.98] transition-fluid"
              >
                <Icon size={18} strokeWidth={1.5} />
              </a>
            ))}
          </div>

          <div
            className="mt-6 inline-flex items-center gap-2.5 px-4.5 py-2.5 rounded-full text-white shadow-sm ring-1 ring-black/[0.04] transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] hover:shadow-md cursor-default"
            style={{ backgroundColor: BRAND, paddingLeft: "1.125rem", paddingRight: "1.125rem", paddingTop: "0.5rem", paddingBottom: "0.5rem" }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span className="tracking-[0.18em] uppercase text-[11px]" style={{ fontWeight: 600 }}>
              #FISC2026
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
