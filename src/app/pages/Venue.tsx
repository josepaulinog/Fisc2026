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
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";
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
        label="The destination"
        title={
          <>
            Port of Spain.
            <br />
            <GradientText>Twin islands.</GradientText>{" "}
            One rhythm.
          </>
        }
        subtitle="Trinidad and Tobago hosts FISC 2026 in the heart of the Caribbean — blending serious dialogue with the warmth, music and cuisine of two distinct islands."
        image={HERO_VENUE}
      />

      {/* Quick facts bar — Doppelrand (Double-Bezel) architecture for the
          most prominent fact surface on the page. Outer tray carries a
          subtle warm-tinted background + hairline ring + 6px padding;
          inner core has its own white surface + inset top highlight
          (reads as a glass plate set into a brushed frame). Mathematically
          calculated radius differential: outer rounded-md (8px), inner
          rounded-sm (6px) — concentric curves with the 1.5px padding gap. */}
      <section className="relative -mt-8 md:-mt-14 z-10">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div
            className="rounded-md p-1.5 bg-black/[0.03] ring-1 ring-black/[0.06]"
            style={{ boxShadow: "0 18px 50px -24px rgba(0,0,0,0.18)" }}
          >
            <div
              className="rounded-sm bg-white grid grid-cols-2 md:grid-cols-4 overflow-hidden divide-x divide-y md:divide-y-0 divide-neutral-100"
              style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.8)" }}
            >
              {quickFacts.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="px-4 md:px-6 py-4 md:py-6 flex items-center gap-3 md:gap-4 min-w-0"
                >
                  <div
                    className="w-10 h-10 md:w-11 md:h-11 rounded-sm flex items-center justify-center shrink-0"
                    style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
                  >
                    <f.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[10.5px] md:text-xs tracking-[0.18em] md:tracking-[0.2em] text-neutral-500 uppercase">{f.label}</div>
                    <div className="tracking-tight text-neutral-950 truncate text-[0.9375rem] md:text-base">{f.value}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hotel hero */}
      <section className="py-14 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-md overflow-hidden group w-full min-w-0"
              style={{ aspectRatio: "4 / 3" }}
            >
              <ImageWithFallback src={VENUE_HOTEL} alt="Hyatt Regency Port of Spain" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/15 backdrop-blur border border-white/20 text-white text-xs tracking-[0.2em]">
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
                <button className="group/btn w-11 h-11 md:w-12 md:h-12 rounded-full bg-white/15 border border-white/30 backdrop-blur flex items-center justify-center hover:bg-white hover:text-neutral-950 transition shrink-0">
                  <ArrowUpRight size={18} strokeWidth={1.5} className="transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </button>
              </div>
            </motion.div>

            <div className="flex flex-col min-w-0">
              <SectionLabel>The venue</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.05 }}>
                A waterfront <GradientText>headquarters</GradientText> for four days.
              </h2>
              <p className="mt-5 text-neutral-700" style={{ lineHeight: 1.7 }}>
                All plenary sessions, workshops and the closing reception are
                hosted on a single floor of the Hyatt Regency — overlooking the
                Gulf of Paria and within walking distance of downtown.
              </p>

              {/* Mobile: stack key/value vertically so the value gets full
                  width and doesn't truncate. Desktop: keep the inline
                  key-on-left / value-on-right layout. */}
              <dl className="mt-6 md:mt-7 grid grid-cols-1 gap-2 md:gap-3">
                {[
                  { k: "Address", v: "1 Wrightson Road, Port of Spain" },
                  { k: "Rooms", v: "Negotiated delegate rate · code via delegate pack" },
                  { k: "Amenities", v: "Spa, pool, harbour-view restaurant" },
                  { k: "Accessibility", v: "Step-free access to all session rooms" },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-6 py-2.5 md:py-3 border-t border-neutral-100">
                    <dt className="text-neutral-500 text-[10.5px] md:text-sm tracking-[0.18em] md:tracking-widest uppercase">{row.k}</dt>
                    <dd className="text-neutral-950 md:text-right text-[0.9375rem] md:text-base">{row.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-6 flex flex-wrap gap-3">
                <NestedCTA
                  href="#"
                  variant="ink"
                  icon={<BracketArrow size={13} strokeWidth={1.75} />}
                >
                  Book delegate rate
                </NestedCTA>
                <NestedCTA
                  href="#map"
                  variant="ghost"
                  icon={<MapPin size={15} strokeWidth={1.5} />}
                >
                  View on map
                </NestedCTA>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Around the islands — bento */}
      <section className="py-14 md:py-28" style={{ backgroundColor: "#f6f4ef" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-12">
            <div>
              <SectionLabel>Around the islands</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                Stay a while. <GradientText>Trinidad welcomes you.</GradientText>
              </h2>
            </div>
            <p className="max-w-md text-neutral-700">
              Curated experiences arranged by the secretariat — from rainforest
              hikes to legendary doubles stands, all within easy reach of the venue.
            </p>
          </div>

          {/* Bento heights are uniform by construction. Aspect-ratio is
              set on the GRID (8/15 mobile · 8/5 desktop) instead of on
              individual tiles, and [grid-auto-rows:1fr] divides that
              computed height evenly across rows. Result: every row is the
              same height, narrow tiles (1 col) render at 4/5 portrait,
              wide tiles spanning 2 cols render at 8/5 landscape — and they
              line up to the pixel within a row, because the row height is
              one source of truth instead of two competing aspect ratios. */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 aspect-[8/15] md:aspect-[8/5] [grid-auto-rows:1fr] [grid-auto-flow:dense]">
            {experiences.map((e, i) => {
              const wide = i === 0 || i === 3;
              return (
                <motion.div
                  key={e.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 4) * 0.06 }}
                  className={`relative group rounded-md overflow-hidden ${
                    wide ? "md:col-span-2" : ""
                  }`}
                >
                  <ImageWithFallback src={e.img} alt={e.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                  <div className="absolute top-3 left-3 w-8 h-8 md:w-9 md:h-9 rounded-full bg-white/15 backdrop-blur border border-white/20 flex items-center justify-center text-white">
                    <e.icon size={14} strokeWidth={1.5} />
                  </div>
                  <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 text-white">
                    <div className="text-white/70 text-[10px] md:text-xs tracking-[0.18em] md:tracking-[0.2em] uppercase truncate">{e.subtitle}</div>
                    <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(0.9375rem, 2vw, 1.25rem)", lineHeight: 1.15 }}>
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
      <section className="py-14 md:py-28 relative overflow-hidden" style={{ backgroundColor: INK }}>
        <Grain />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full blur-3xl opacity-25"
          style={{ backgroundColor: BRAND }}
        />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 mb-10 md:mb-14">
            <div className="lg:col-span-6">
              <SectionLabel tone="light">Travel essentials</SectionLabel>
              <h2 className="tracking-[-0.02em] text-white/95" style={{ fontSize: "clamp(1.875rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                Everything you need <br className="hidden md:block" /><GradientText tone="light">before you land.</GradientText>
              </h2>
            </div>
            <div className="lg:col-span-6 lg:pt-10 text-white/70" style={{ lineHeight: 1.7 }}>
              Each delegate receives a detailed travel pack from the secretariat
              two weeks before arrival, including ground transport, room
              assignments and a personalised programme.
            </div>
          </div>

          {/* Doppelrand essentials cards — outer hairline tray + inner darker
              core with inset top highlight. Reads as a glass plate set into
              a frame on the INK background. Hover deepens the inner core +
              strengthens the outer ring (instead of swapping a flat bg). */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {essentials.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 3) * 0.07 }}
                className="group rounded-md p-1 bg-white/[0.03] ring-1 ring-white/[0.08] hover:ring-white/[0.16] transition-all"
              >
                <div
                  className="rounded-sm bg-white/[0.04] group-hover:bg-white/[0.07] transition-colors p-5 md:p-6"
                  style={{ boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)" }}
                >
                  <div
                    className="w-11 h-11 rounded-sm flex items-center justify-center mb-5"
                    style={{ backgroundColor: `${BRAND}22`, color: BRAND_SOFT }}
                  >
                    <e.icon size={18} strokeWidth={1.5} />
                  </div>
                  <div className="tracking-tight text-white" style={{ fontSize: "1.125rem" }}>{e.title}</div>
                  <p className="mt-2 text-white/65" style={{ lineHeight: 1.6 }}>{e.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Arrival / map */}
      <section id="map" className="py-14 md:py-28 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="rounded-md overflow-hidden border border-neutral-200 grid md:grid-cols-2">
            <div className="relative min-h-[280px] md:min-h-[420px]">
              <ImageWithFallback src={VENUE_STREET} alt="Map" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/90 text-neutral-900 text-xs tracking-[0.2em]">
                <MapPin size={14} strokeWidth={1.5} style={{ color: BRAND }} /> 10.6488° N · 61.5179° W
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
                <p className="mt-4 text-neutral-700" style={{ lineHeight: 1.7 }}>
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
              {/* Actionable endpoint — the page used to dead-end with stats. */}
              <div className="mt-6 flex flex-wrap gap-3">
                <NestedCTA
                  href="https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Trinidad"
                  variant="ink"
                  icon={<BracketArrow size={13} strokeWidth={1.75} />}
                >
                  Open in Maps
                </NestedCTA>
                <NestedCTA
                  href="data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:FISC%202026%20Trinidad%20%26%20Tobago%0ADTSTART:20260629T130000Z%0ADTEND:20260702T230000Z%0ALOCATION:Hyatt%20Regency%2C%201%20Wrightson%20Road%2C%20Port%20of%20Spain%0AEND:VEVENT%0AEND:VCALENDAR"
                  variant="ghost"
                  icon={<Calendar size={15} strokeWidth={1.5} />}
                >
                  Add to calendar
                </NestedCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
