import { motion } from "motion/react";
import {
  Calendar,
  Compass,
  Landmark,
  MapPin,
  Plane,
  Sparkles,
  Sun,
  Utensils,
  Waves,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, GradientText, PageHero, SectionLabel } from "../components/shared";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";
import {
  BRAND,
  HERO_VENUE,
  INK,
  VENUE_HOTEL,
  VENUE_IMG_1,
  VENUE_IMG_2,
  VENUE_IMG_3,
  VENUE_NATURE,
  VENUE_STEELPAN,
  VENUE_TOBAGO,
} from "../data";

const quickFacts = [
  { icon: Calendar, label: "Dates", value: "Jun 29 – Jul 2, 2026" },
  { icon: Landmark, label: "Venue", value: "Hyatt Regency" },
  { icon: MapPin, label: "City", value: "Port of Spain" },
  { icon: Plane, label: "Airport", value: "POS · 30 min" },
];

// Order matters: indices 0 and 3 land in the WIDE bento slots. Carnival
// Mas + Tobago are the strongest cultural-anchor + landscape compositions
// in the set, so they anchor each desktop row. The narrow tiles fill the
// remaining slots and the grid-auto-flow:dense layout packs them tightly.
//
// Image discipline: every tile uses a distinct asset (no duplicates), and
// no tile re-shows the Port-of-Spain aerial that's already in the Hotel
// hero above. The cabin photo is reframed as Maracas food-shack culture
// (real local context: Maracas is famous for shark-and-bake stalls)
// because we don't have a dedicated food image in the set.
const experiences = [
  { img: VENUE_STEELPAN, title: "Carnival Mas", subtitle: "Feathers, music, mas", icon: Sparkles },
  { img: VENUE_NATURE, title: "Scarlet Ibis", subtitle: "Caroni Swamp · national bird", icon: Compass },
  { img: VENUE_IMG_3, title: "Maracas Bay", subtitle: "North Coast · 40 min drive", icon: Waves },
  { img: VENUE_TOBAGO, title: "Tobago", subtitle: "Sister island · 25 min flight", icon: Sun },
  { img: VENUE_IMG_1, title: "Beach huts", subtitle: "Maracas Coast · shark-and-bake", icon: Utensils },
  { img: VENUE_IMG_2, title: "Queen's Royal College", subtitle: "Historic architecture, Port of Spain", icon: Landmark },
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
                    className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0"
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
              className="relative rounded-2xl overflow-hidden group w-full min-w-0"
              style={{ aspectRatio: "4 / 3" }}
            >
              <ImageWithFallback src={VENUE_HOTEL} alt="Hyatt Regency Port of Spain" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/15 backdrop-blur border border-white/20 text-white text-xs tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
                OFFICIAL VENUE
              </div>
              <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7 right-5 md:right-7 text-white">
                <div className="text-white/70 text-sm tracking-widest">HYATT REGENCY</div>
                <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}>
                  Port of Spain
                </div>
              </div>
            </motion.div>

            <div className="flex flex-col min-w-0">
              <SectionLabel>The venue</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)", lineHeight: 1.05 }}>
                A waterfront headquarters{" "}
                <em
                  className="italic"
                  style={{ paddingInline: "0.05em", marginInline: "-0.025em" }}
                >
                  for four days.
                </em>
              </h2>
              <p className="mt-5 text-neutral-700" style={{ lineHeight: 1.7 }}>
                All plenary sessions, workshops and the closing reception are
                hosted on a single floor of the Hyatt Regency — overlooking the
                Gulf of Paria and within walking distance of downtown.
              </p>

              {/* Spec list: border-t per row + border-b on the dl itself
                  closes the table at the bottom edge, so the rows read as
                  a fully bounded specification rather than an open
                  bottom-less stack. Mobile stacks key over value; desktop
                  keeps the inline key-left / value-right reading. */}
              <dl className="mt-6 md:mt-7 grid grid-cols-1 border-b border-neutral-100">
                {[
                  { k: "Address", v: "1 Wrightson Road, Port of Spain" },
                  { k: "Rooms", v: "Delegate rate · code in your travel pack" },
                  { k: "Amenities", v: "Spa, pool, harbour-view restaurant" },
                  { k: "Accessibility", v: "Step-free access to every session room" },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 md:gap-6 py-2.5 md:py-3 border-t border-neutral-100">
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
                  href="https://www.google.com/maps/search/?api=1&query=Hyatt+Regency+Trinidad"
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
                Stay a while. <em className="italic" style={{ paddingInline: "0.05em", marginInline: "-0.025em" }}>Trinidad welcomes you.</em>
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
                  className={`relative group rounded-2xl overflow-hidden ${
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

      {/* Closing handoff — Venue page sells the destination, Delegate Guide
          owns the operational arrival pack. This card bridges the two
          without duplicating content. Replaces the previous "Travel
          essentials" + "Arrival/map" sections, both of which now live
          (canonically) on /resources/delegate-guide. */}
      <section className="py-14 md:py-24" style={{ backgroundColor: "#f6f4ef" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div
            className="relative rounded-2xl overflow-hidden text-white"
            style={{ backgroundColor: INK }}
          >
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(circle at 85% 25%, ${BRAND}55, transparent 55%)`,
              }}
            />
            <Grain />
            <div className="relative p-8 md:p-14 grid lg:grid-cols-12 gap-8 md:gap-10 items-end">
              <div className="lg:col-span-7">
                <SectionLabel tone="light">Heading to Trinidad?</SectionLabel>
                <h2
                  className="tracking-[-0.02em] mt-3"
                  style={{
                    fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                    lineHeight: 1.05,
                  }}
                >
                  Your full arrival pack{" "}
                  <em
                    className="italic"
                    style={{ paddingInline: "0.05em", marginInline: "-0.025em" }}
                  >
                    lives in the delegate guide.
                  </em>
                </h2>
                <p
                  className="mt-4 text-white/70 max-w-xl"
                  style={{ lineHeight: 1.65 }}
                >
                  Airport routing, shuttle schedule, climate window, voltage,
                  visa letters and the seven-step pre-arrival checklist — one
                  gated page, kept current by the secretariat.
                </p>
              </div>
              <div className="lg:col-span-5 lg:justify-self-end">
                <NestedCTA
                  to="/resources/delegate-guide"
                  variant="brand"
                  icon={<BracketArrow size={13} strokeWidth={1.75} />}
                >
                  Open the delegate guide
                </NestedCTA>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
