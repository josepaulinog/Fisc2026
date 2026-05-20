import { motion } from "motion/react";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Compass,
  Globe,
  Landmark,
  MapPin,
  Plane,
  Sparkles,
  Sun,
  Utensils,
  Waves,
  Wind,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, PageHero, SectionLabel } from "../components/shared";
import {
  BRAND,
  BRAND_SOFT,
  HERO_VENUE,
  INK,
  VENUE_FOOD,
  VENUE_HOTEL,
  VENUE_IMG_1,
  VENUE_IMG_2,
  VENUE_NATURE,
  VENUE_STEELPAN,
  VENUE_STREET,
} from "../data";

const quickFacts = [
  { icon: Calendar, label: "Dates", value: "Jun 29 – Jul 2, 2026" },
  { icon: Landmark, label: "Venue", value: "Hyatt Regency" },
  { icon: MapPin, label: "City", value: "Port of Spain" },
  { icon: Plane, label: "Airport", value: "POS · 30 min" },
];

const essentials = [
  { icon: Sun, title: "Climate", text: "Tropical, 28–32°C in June. Pack light, breathable layers and an umbrella." },
  { icon: Clock, title: "Time zone", text: "AST · UTC-4. No daylight saving — straightforward for European arrivals." },
  { icon: Globe, title: "Language", text: "English is the official language; Trinidadian Creole is widely spoken." },
  { icon: Compass, title: "Currency", text: "Trinidad & Tobago Dollar (TTD). USD widely accepted at the venue." },
  { icon: Wind, title: "Getting around", text: "Hyatt arranges shuttles between the airport, sessions and cultural evenings." },
  { icon: Sparkles, title: "Visa & invitation", text: "Delegation leads coordinate official invitation letters via the secretariat." },
];

const experiences = [
  { img: VENUE_IMG_1, title: "Maracas Bay", subtitle: "North Coast · 40 min drive", icon: Waves },
  { img: VENUE_STREET, title: "Downtown Port of Spain", subtitle: "Aerial · waterfront capital", icon: Landmark },
  { img: VENUE_FOOD, title: "Doubles & Roti", subtitle: "Street food culture", icon: Utensils },
  { img: VENUE_STEELPAN, title: "Carnival Mas", subtitle: "Feathers, music, mas", icon: Sparkles },
  { img: VENUE_NATURE, title: "Scarlet Ibis", subtitle: "Caroni Swamp · national bird", icon: Compass },
  { img: VENUE_IMG_2, title: "Queen's Royal College", subtitle: "Historic architecture, Port of Spain", icon: Sun },
];

export default function Venue() {
  return (
    <>
      <PageHero
        label="The Destination"
        title={
          <>
            Port of Spain.
            <br />
            <GradientText>Twin islands.</GradientText>{" "}
            One rhythm.
          </>
        }
        subtitle="Trinidad and Tobago hosts FISC 2026 in the heart of the Caribbean — blending serious dialogue with the warmth, music and cuisine of two unforgettable islands."
        image={HERO_VENUE}
        imageCaption="Caribbean coast · Trinidad"
      />

      {/* Quick facts bar */}
      <section className="relative -mt-10 md:-mt-14 z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="rounded-2xl bg-white border border-neutral-200 shadow-xl shadow-black/5 grid grid-cols-2 md:grid-cols-4 overflow-hidden">
            {quickFacts.map((f, i) => (
              <motion.div
                key={f.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="px-5 md:px-6 py-5 md:py-6 flex items-center gap-3 md:gap-4 border-t md:border-t-0 md:border-l first:border-l-0 [&:nth-child(2)]:border-l md:[&:nth-child(2)]:border-l [&:nth-child(3)]:border-l-0 md:[&:nth-child(3)]:border-l border-neutral-100"
              >
                <div
                  className="w-10 h-10 md:w-11 md:h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                >
                  <f.icon size={18} />
                </div>
                <div className="min-w-0">
                  <div className="text-xs tracking-[0.2em] text-neutral-500 uppercase">{f.label}</div>
                  <div className="tracking-tight text-neutral-950 truncate" style={{ fontSize: "1rem" }}>{f.value}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel hero */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl overflow-hidden group w-full min-w-0"
              style={{ aspectRatio: "4 / 3" }}
            >
              <ImageWithFallback src={VENUE_HOTEL} alt="Hyatt Regency Port of Spain" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/15 backdrop-blur border border-white/20 text-white text-xs tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
                OFFICIAL VENUE
              </div>
              <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7 right-5 md:right-7 text-white flex items-end justify-between gap-4">
                <div>
                  <div className="text-white/70 text-sm tracking-widest">HYATT REGENCY</div>
                  <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}>
                    Port of Spain
                  </div>
                </div>
                <button className="w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/30 backdrop-blur flex items-center justify-center hover:bg-white hover:text-neutral-950 transition shrink-0">
                  <ArrowUpRight size={18} />
                </button>
              </div>
            </motion.div>

            <div className="flex flex-col min-w-0">
              <SectionLabel>The Venue</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.05 }}>
                A waterfront <span style={{ color: BRAND }}>headquarters</span> for four days.
              </h2>
              <p className="mt-5 text-neutral-600" style={{ lineHeight: 1.7 }}>
                All plenary sessions, workshops and the closing reception are
                hosted on a single floor of the Hyatt Regency — overlooking the
                Gulf of Paria and within walking distance of downtown.
              </p>

              <dl className="mt-7 grid grid-cols-1 gap-3">
                {[
                  { k: "Address", v: "1 Wrightson Road, Port of Spain" },
                  { k: "Rooms", v: "Negotiated delegate rate · code FISC26" },
                  { k: "Amenities", v: "Spa, pool, harbour-view restaurant" },
                  { k: "Accessibility", v: "Step-free access to all session rooms" },
                ].map((row) => (
                  <div key={row.k} className="flex items-start justify-between gap-6 py-3 border-t border-neutral-100">
                    <dt className="text-neutral-500 text-sm tracking-widest uppercase">{row.k}</dt>
                    <dd className="text-neutral-950 text-right">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-neutral-950 text-white hover:opacity-90 transition">
                  Book delegate rate <ArrowUpRight size={16} />
                </button>
                <button className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-neutral-300 text-neutral-800 hover:border-neutral-950 transition">
                  View on map <MapPin size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Around the islands — bento */}
      <section className="py-16 md:py-24" style={{ backgroundColor: "#f6f4ef" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12">
            <div>
              <SectionLabel>Around the islands</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                Stay a while. <em className="italic">Trinidad invites it.</em>
              </h2>
            </div>
            <p className="max-w-md text-neutral-600">
              Curated experiences arranged by the secretariat — from rainforest
              hikes to legendary doubles stands, all within easy reach of the venue.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 [grid-auto-flow:dense]">
            {experiences.map((e, i) => {
              const wide = i === 0 || i === 3;
              return (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.06 }}
                  className={`relative group rounded-2xl overflow-hidden aspect-[4/5] ${
                    wide ? "md:col-span-2 md:aspect-[16/10]" : ""
                  } ${i === 5 ? "col-span-2 md:col-span-2 aspect-[16/10]" : ""}`}
                >
                  <ImageWithFallback src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white">
                    <e.icon size={15} />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="text-white/70 text-xs tracking-[0.2em] uppercase">{e.subtitle}</div>
                    <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1rem, 2vw, 1.25rem)", lineHeight: 1.15 }}>
                      {e.title}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Travel essentials */}
      <section className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: INK }}>
        <Grain />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: BRAND }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-14">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="w-8 h-px bg-white" />
                <span className="tracking-[0.25em] text-white text-sm">Travel essentials</span>
              </div>
              <h2 className="tracking-[-0.02em] text-white" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                Everything you need <br className="hidden md:block" />before you land.
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pt-10 text-white/70" style={{ lineHeight: 1.7 }}>
              Each delegate receives a detailed travel pack from the secretariat
              two weeks before arrival, including ground transport, room
              assignments and a personalised programme.
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {essentials.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.07 }}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-white/20 transition-all p-5 md:p-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: `${BRAND}22`, color: BRAND_SOFT }}
                >
                  <e.icon size={18} />
                </div>
                <div className="tracking-tight text-white" style={{ fontSize: "1.125rem" }}>{e.title}</div>
                <p className="mt-2 text-white/65" style={{ lineHeight: 1.6 }}>{e.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Arrival / map */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="rounded-3xl overflow-hidden border border-neutral-200 grid md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-[420px]">
              <ImageWithFallback src={VENUE_STREET} alt="Map" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 text-neutral-900 text-xs tracking-[0.2em]">
                <MapPin size={14} style={{ color: BRAND }} /> 10.6488° N · 61.5179° W
              </div>
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="text-white/70 text-xs tracking-[0.2em] uppercase">Hyatt Regency</div>
                <div className="mt-1 tracking-tight" style={{ fontSize: "1.5rem" }}>1 Wrightson Road</div>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <SectionLabel>Arrival</SectionLabel>
                <h3 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}>
                  Land at <span style={{ color: BRAND }}>POS</span>. Shuttle to the venue.
                </h3>
                <p className="mt-4 text-neutral-600" style={{ lineHeight: 1.7 }}>
                  Piarco International Airport (POS) is the main gateway, with
                  daily connections from Miami, New York, London, Toronto,
                  Panama City and across the Caribbean.
                </p>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-neutral-100">
                {[
                  { k: "Airport", v: "POS" },
                  { k: "To venue", v: "~30 min" },
                  { k: "Shuttle", v: "Included" },
                ].map((s) => (
                  <div key={s.k}>
                    <div className="text-xs text-neutral-500 tracking-[0.2em] uppercase">{s.k}</div>
                    <div className="mt-1 tracking-tight text-neutral-950" style={{ fontSize: "1.125rem" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
