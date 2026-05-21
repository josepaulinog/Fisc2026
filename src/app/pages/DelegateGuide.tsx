import { useState } from "react";
import { motion } from "motion/react";
import { useAuth } from "../auth";
import { useChecklist } from "../checklist";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  CloudSun,
  Coins,
  Globe,
  Languages,
  Lock,
  MapPin,
  Phone,
  Plane,
  Plug,
  Plus,
  Users,
} from "lucide-react";
import { CountryFlag } from "../components/CountryFlag";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GatedBody } from "../components/GatedBody";
import { Grain, GradientText, PageHero, SectionLabel } from "../components/shared";
import {
  BRAND,
  BRAND_SOFT,
  HERO_GUIDE,
  INK,
  VENUE_STREET,
  delegateGuide,
  formatDeadline,
} from "../data";
import portOfSpainMap2 from "../../imports/port-of-spain-map-2.png";

export default function DelegateGuide() {
  // Checklist state lives in localStorage keyed by user.email — shared with
  // the homepage's CountdownAndActions queue so ticking an item here is
  // reflected there next page-load (and vice versa). GatedBody wraps this
  // page so user is guaranteed non-null at render time.
  const { user } = useAuth();
  const { checked, toggle } = useChecklist(user);
  const [openEssential, setOpenEssential] = useState<string | null>(delegateGuide.essentials[0]?.category ?? null);

  return (
    <>
      <PageHero
        label={`${delegateGuide.edition} · Delegate Guide`}
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Delegate Guide" },
        ]}
        title={<>{delegateGuide.countryName}<br /><GradientText>from gate to gate.</GradientText></>}
        subtitle={delegateGuide.intro}
        image={HERO_GUIDE}
      />

      <GatedBody>
      <section className="bg-white pt-6 md:pt-10">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex items-center gap-3 px-4 py-3 rounded-2xl border border-neutral-200 bg-neutral-50">
            <Lock size={14} style={{ color: BRAND }} />
            <span className="text-sm text-neutral-700">
              Invitation only — the personalised travel pack lands in your inbox two weeks before arrival.
            </span>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-10 items-start">
            <div className="lg:col-span-5">
              <SectionLabel>About {delegateGuide.countryName}</SectionLabel>
              <div className="flex items-center gap-3 mb-2">
                <CountryFlag
                  country={delegateGuide.countryName}
                  className="h-6 md:h-7 w-auto rounded-sm shadow-sm shrink-0"
                />
                <span className="text-xs tracking-[0.22em] uppercase text-neutral-500">
                  {delegateGuide.countryName}
                </span>
              </div>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
                Land smoothly. Arrive ready.
              </h2>
              <p className="mt-4 text-neutral-700" style={{ lineHeight: 1.7 }}>
                Trinidad and Tobago sit at the southernmost edge of the Caribbean — close to South America, but rhythmically and culturally a world of their own. Port of Spain hosts FISC 2026 in the heart of the capital's waterfront.
              </p>

              <dl className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: Building2, k: "Capital", v: delegateGuide.keyFacts.capital },
                  { icon: Languages, k: "Languages", v: delegateGuide.keyFacts.languages.join(" · ") },
                  { icon: Coins, k: "Currency", v: delegateGuide.keyFacts.currency },
                  { icon: Clock, k: "Time zone", v: delegateGuide.keyFacts.timezone },
                  { icon: Plug, k: "Voltage", v: delegateGuide.keyFacts.voltage },
                  { icon: Users, k: "Population", v: delegateGuide.keyFacts.population },
                ].map((row) => (
                  <div key={row.k} className="flex items-start gap-3 rounded-md border border-neutral-200 bg-white p-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                      <row.icon size={15} />
                    </div>
                    <div className="min-w-0">
                      <dt className="text-xs tracking-[0.2em] uppercase text-neutral-500">{row.k}</dt>
                      <dd className="mt-1 text-neutral-950" style={{ fontSize: "0.95rem", lineHeight: 1.3 }}>{row.v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-7 relative rounded-3xl overflow-hidden"
              style={{ aspectRatio: "4 / 3" }}
            >
              <ImageWithFallback src={portOfSpainMap2} alt="Map of Port of Spain marking the Hyatt Regency venue location" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/15 backdrop-blur border border-white/20 text-white text-xs tracking-[0.2em]">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
                10.6488° N · 61.5179° W
              </div>
              <div className="absolute bottom-5 md:bottom-7 left-5 md:left-7 right-5 md:right-7 text-white">
                <div className="text-white/70 text-xs tracking-widest">HYATT REGENCY</div>
                <div className="mt-1 tracking-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}>
                  1 Wrightson Road, Port of Spain
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16" style={{ backgroundColor: "#f6f4ef" }}>
        <div className="max-w-7xl mx-auto px-5 md:px-6 grid md:grid-cols-2 gap-4 md:gap-6">
          <div className="relative rounded-3xl overflow-hidden text-white" style={{ backgroundColor: INK }}>
            <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 80% 10%, ${BRAND}55, transparent 55%)` }} />
            <Grain />
            <div className="relative p-7 md:p-9">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 bg-white/5 text-xs tracking-[0.2em]">
                <Plane size={12} style={{ color: BRAND_SOFT }} /> ARRIVAL
              </div>
              <h3 className="mt-4 tracking-[-0.02em]" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.05 }}>
                {delegateGuide.flight.airport} <span style={{ color: BRAND_SOFT }}>({delegateGuide.flight.code})</span>
              </h3>
              <p className="mt-3 text-white/70" style={{ lineHeight: 1.65 }}>
                {delegateGuide.flight.transit}. Shuttles run between the airport, the venue and cultural evenings.
              </p>
              <div className="mt-6">
                <div className="text-white/55 text-xs tracking-[0.2em] uppercase mb-3">Major routes</div>
                <div className="flex flex-wrap gap-2">
                  {delegateGuide.flight.majorRoutes.map((r) => (
                    <span key={r} className="px-3 py-1.5 rounded-md border border-white/15 bg-white/[0.04] text-sm">
                      {r}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-white">
            <div className="p-7 md:p-9">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md text-xs tracking-[0.2em]" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                <CloudSun size={12} /> WEATHER
              </div>
              <h3 className="mt-4 tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.5rem, 2.5vw, 2rem)", lineHeight: 1.05 }}>
                {delegateGuide.weather.tempC}
              </h3>
              <div className="mt-2 text-neutral-500 text-sm tracking-widest uppercase">{delegateGuide.weather.season}</div>
              <p className="mt-4 text-neutral-700" style={{ lineHeight: 1.65 }}>{delegateGuide.weather.notes}</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-md border border-neutral-200 p-4">
                  <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">Range</div>
                  <div className="mt-1 tracking-tight text-neutral-950">{delegateGuide.weather.tempC}</div>
                </div>
                <div className="rounded-md border border-neutral-200 p-4">
                  <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">Humidity</div>
                  <div className="mt-1 tracking-tight text-neutral-950">{delegateGuide.weather.humidity}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
            <div>
              <SectionLabel>Pre-arrival checklist</SectionLabel>
              <h2 className="tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
                Seven steps, <em className="italic">ten weeks out.</em>
              </h2>
            </div>
            <div className="text-sm text-neutral-500 tabular-nums">{checked.size} of {delegateGuide.checklist.length} done</div>
          </div>
          <div className="grid gap-3">
            {delegateGuide.checklist.map((c, i) => {
              const done = checked.has(i);
              return (
                <button
                  key={i}
                  onClick={() => toggle(i)}
                  className={`group w-full flex items-center gap-4 px-5 py-4 rounded-sm border transition text-left ${
                    done ? "bg-neutral-950 border-neutral-950 text-white" : "bg-white border-neutral-200 hover:border-neutral-400"
                  }`}
                >
                  <span className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition ${done ? "bg-white text-neutral-950" : "border border-neutral-300 bg-white"}`}>
                    {done ? <CheckCircle2 size={18} /> : <span className="text-neutral-300 text-xs">{i + 1}</span>}
                  </span>
                  <span className="flex-1 min-w-0">
                    <span className={`block tracking-tight ${done ? "line-through text-white/70" : "text-neutral-950"}`} style={{ fontSize: "1rem" }}>
                      {c.task}
                    </span>
                    {c.detail && (
                      <span className={`block text-sm mt-0.5 ${done ? "text-white/55" : "text-neutral-500"}`}>{c.detail}</span>
                    )}
                  </span>
                  <span className={`shrink-0 inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs tracking-widest uppercase ${done ? "bg-white/10 text-white/78" : "bg-neutral-100 text-neutral-700"}`}>
                    <Calendar size={12} /> {formatDeadline(c.dueDate).label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 relative overflow-hidden" style={{ backgroundColor: INK }}>
        <Grain />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full blur-3xl opacity-25" style={{ backgroundColor: BRAND }} />
        <div className="relative max-w-7xl mx-auto px-5 md:px-6 grid lg:grid-cols-12 gap-8 md:gap-12">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-8 h-px bg-white" />
              <span className="tracking-[0.25em] text-white text-sm">Essentials</span>
            </div>
            <h2 className="tracking-[-0.02em] text-white" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}>
              Know before<br />
              <em className="italic">you go.</em>
            </h2>
            <p className="mt-5 text-white/78 max-w-md" style={{ lineHeight: 1.7 }}>
              Open any topic for the details. Country-specific notes arrive in your personalised pack two weeks before the conference.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-2">
            {delegateGuide.essentials.map((g) => {
              const open = openEssential === g.category;
              return (
                <div key={g.category} className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur overflow-hidden">
                  <button onClick={() => setOpenEssential(open ? null : g.category)} className="w-full px-5 md:px-6 py-4 flex items-center justify-between gap-4 text-left text-white">
                    <span className="tracking-tight" style={{ fontSize: "1.0625rem" }}>{g.category}</span>
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center transition ${open ? "rotate-45 bg-white text-neutral-950" : "border border-white/20 text-white/80"}`}>
                      <Plus size={16} />
                    </span>
                  </button>
                  {open && (
                    <motion.div
                      initial={{ opacity: 0, gridTemplateRows: "0fr" }}
                      animate={{ opacity: 1, gridTemplateRows: "1fr" }}
                      transition={{ duration: 0.2 }}
                      className="grid"
                    >
                      <ul className="overflow-hidden px-5 md:px-6 pb-5 space-y-2 text-white/75" style={{ lineHeight: 1.65 }}>
                        {g.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full mt-2.5 shrink-0" style={{ backgroundColor: BRAND }} />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="rounded-3xl overflow-hidden border border-neutral-200 grid md:grid-cols-5">
            <div className="relative min-h-[260px] md:col-span-3 md:min-h-[400px]">
              <ImageWithFallback src={VENUE_STREET} alt="Downtown Port of Spain near the venue" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-transparent" />
              <div className="absolute top-5 left-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/90 text-neutral-900 text-xs tracking-[0.2em]">
                <MapPin size={14} style={{ color: BRAND }} /> 10.6488° N · 61.5179° W
              </div>
            </div>
            <div className="md:col-span-2 p-7 md:p-9 flex flex-col gap-5">
              <SectionLabel>Emergency</SectionLabel>
              <div className="space-y-3">
                {delegateGuide.emergency.map((e) => (
                  <div key={e.service} className="flex items-center justify-between gap-4 py-3 border-t border-neutral-100 first:border-t-0">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                        <Phone size={15} />
                      </div>
                      <div>
                        <div className="text-xs tracking-[0.2em] uppercase text-neutral-500">{e.service}</div>
                      </div>
                    </div>
                    <div className="tracking-tight text-neutral-950 tabular-nums" style={{ fontSize: "1.0625rem" }}>{e.number}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-neutral-50 border border-neutral-200 text-neutral-700 text-sm">
                <Globe size={14} style={{ color: BRAND }} />
                Country code: +1 868
              </div>
            </div>
          </div>
        </div>
      </section>
      </GatedBody>
    </>
  );
}
