import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Lock, Mail, Search, Twitter, Users } from "lucide-react";
import { CountryFlag } from "../components/CountryFlag";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GatedBody } from "../components/GatedBody";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, BRAND_SOFT, HERO_ATTENDEES, attendees, type AttendeeEntry } from "../data";

function initialsOf(name: string) {
  return name
    .split(" ")
    .filter((p) => /[A-Za-z]/.test(p[0] ?? ""))
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

function AttendeeCard({ a, i }: { a: AttendeeEntry; i: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (i % 8) * 0.04 }}
      className="group relative rounded-md bg-white p-5 ring-1 ring-black/[0.05] shadow-[0_8px_24px_-16px_rgba(0,0,0,0.1)] hover:ring-neutral-300 hover:shadow-[0_16px_40px_-20px_rgba(0,0,0,0.18)] transition-fluid"
    >
      {/* Lead badge — bolder treatment. Was bg-orange/15 + brand-orange
          text (too quiet for a status that signals "speaks for their
          country"); now solid brand orange + white text reads as
          intentional authority. */}
      {a.delegationLead && (
        <span
          className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-sm text-[10px] tracking-[0.2em] uppercase text-white"
          style={{ backgroundColor: BRAND, fontWeight: 500 }}
        >
          Lead
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          {a.img ? (
            <div className="w-16 h-16 rounded-sm overflow-hidden bg-neutral-100 ring-1 ring-black/[0.05]">
              <ImageWithFallback src={a.img} alt={a.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            // Softened placeholder — matches the Home host + delegate card
            // treatment. Warm cream + muted ink initials reads as a deliberate
            // "portrait pending" state rather than a loud brand chip.
            <div
              className="w-16 h-16 rounded-sm flex items-center justify-center tracking-tight ring-1 ring-black/[0.05]"
              style={{ backgroundColor: "#f4efe6", color: "#737373", fontSize: "0.95rem", fontWeight: 500 }}
            >
              {initialsOf(a.name)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="tracking-tight text-neutral-950 truncate" style={{ fontSize: "1rem" }}>
            {a.salutation ? `${a.salutation} ` : ""}
            {a.name}
          </div>
          <div className="text-neutral-700 text-sm leading-snug mt-0.5">
            {a.role}
          </div>
          <div className="mt-1.5 inline-flex items-center gap-1.5 text-xs tracking-widest uppercase text-neutral-400">
            <CountryFlag country={a.country} className="h-2.5 w-auto rounded-[1px] shadow-sm shrink-0" />
            {a.country}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {a.email && (
          <a href={a.email} aria-label="Email" className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-500 hover:text-white flex items-center justify-center transition" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
            <Mail size={13} />
          </a>
        )}
        {a.linkedin && (
          <a href={a.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-500 hover:text-white flex items-center justify-center transition" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
            <Linkedin size={13} />
          </a>
        )}
        {a.twitter && (
          <a href={a.twitter} target="_blank" rel="noreferrer" aria-label="X" className="w-8 h-8 rounded-full border border-neutral-200 text-neutral-500 hover:text-white flex items-center justify-center transition" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
            <Twitter size={13} />
          </a>
        )}
        <span className="ml-auto text-xs text-neutral-400 truncate">
          {a.org}
        </span>
      </div>
    </motion.div>
  );
}

const REGION_MAP: Record<string, "Africa" | "Americas" | "Caribbean" | "Asia-Pacific"> = {
  Ghana: "Africa", "Sierra Leone": "Africa", Liberia: "Africa", Seychelles: "Africa", "South Sudan": "Africa",
  Honduras: "Americas", Guyana: "Americas", Suriname: "Americas",
  "Trinidad & Tobago": "Caribbean", Barbados: "Caribbean", Jamaica: "Caribbean", Antigua: "Caribbean", "St. Lucia": "Caribbean",
  "Timor-Leste": "Asia-Pacific", Mongolia: "Asia-Pacific", Laos: "Asia-Pacific", "Sri Lanka": "Asia-Pacific", Tuvalu: "Asia-Pacific", Afghanistan: "Asia-Pacific", Kosovo: "Asia-Pacific",
};

const REGIONS = ["All", "Africa", "Americas", "Caribbean", "Asia-Pacific"] as const;

export default function Attendees() {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<(typeof REGIONS)[number]>("All");

  const filtered = useMemo(() => {
    return attendees.filter((a) => {
      const matchQ =
        !query ||
        `${a.name} ${a.role} ${a.org} ${a.country}`.toLowerCase().includes(query.toLowerCase());
      const matchR = region === "All" || REGION_MAP[a.country] === region;
      return matchQ && matchR;
    });
  }, [query, region]);

  const countByCountry = useMemo(() => {
    const map: Record<string, number> = {};
    for (const a of attendees) map[a.country] = (map[a.country] ?? 0) + 1;
    return map;
  }, []);

  return (
    <>
      <PageHero
        label="Delegate community"
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Delegate community" },
        ]}
        title={<>Delegate <GradientText>community.</GradientText></>}
        subtitle="FISC 2026 brings together finance ministers, treasurers and reformers from 10+ countries. Sign in to see the full list — or scroll on for a preview of the delegation."
        image={HERO_ATTENDEES}
      />

      <GatedBody>
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-10 mb-8 md:mb-12">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-200 bg-neutral-50 text-neutral-700 text-xs tracking-[0.2em]">
                <Lock size={12} style={{ color: BRAND }} />
                INVITATION ONLY · PREVIEW
              </div>
              <h2 className="mt-4 tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}>
                {attendees.length} delegates confirmed,{" "}
                <span style={{ color: BRAND }}>{Object.keys(countByCountry).length} countries</span>.
              </h2>
              <p className="mt-3 text-neutral-700 max-w-2xl" style={{ lineHeight: 1.65 }}>
                Delegation leads coordinate logistics for each country. Reach out via the secretariat
                if you need to reroute correspondence to a specific delegate.
              </p>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-3 justify-end">
              <label className="flex items-center gap-2 bg-neutral-50 border border-neutral-200 rounded-lg px-4 py-2.5 focus-within:border-neutral-950 transition">
                <Search size={16} className="text-neutral-400 shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, role, country"
                  className="flex-1 min-w-0 bg-transparent outline-none text-neutral-900 placeholder:text-neutral-400 text-sm"
                />
              </label>
              <div className="flex items-center gap-2 overflow-x-auto overscroll-x-contain touch-pan-x snap-x snap-proximity -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide [scroll-padding-inline:1.25rem]">
                {REGIONS.map((r) => {
                  const isActive = region === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`snap-start shrink-0 px-3.5 py-2 rounded-sm border text-sm transition ${
                        isActive
                          ? "bg-neutral-900 border-neutral-900 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.07),0_3px_10px_-4px_rgba(0,0,0,0.18)]"
                          : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400"
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
            {filtered.map((a, i) => (
              <AttendeeCard key={`${a.name}-${a.country}`} a={a} i={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 md:py-20 border border-dashed border-neutral-200 rounded-md">
              <Users size={26} strokeWidth={1.5} className="mx-auto mb-4 text-neutral-300" />
              <div className="tracking-tight text-neutral-950" style={{ fontSize: "1.0625rem", fontWeight: 500 }}>
                No delegates match
              </div>
              <p className="mt-2 text-neutral-700 max-w-sm mx-auto" style={{ fontSize: "0.9375rem", lineHeight: 1.55 }}>
                Try a broader search, or switch the region back to All. Delegates are added daily as confirmations come in.
              </p>
              <button
                type="button"
                onClick={() => {
                  setQuery("");
                  setRegion("All");
                }}
                className="mt-5 inline-flex items-center gap-1.5 text-[13px] text-neutral-950 underline underline-offset-4 decoration-1 hover:no-underline transition"
                style={{ fontWeight: 500 }}
              >
                Clear filters
              </button>
            </div>
          )}

          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {Object.entries(countByCountry)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([country, n]) => (
                <div key={country} className="rounded-md border border-neutral-200 bg-white p-4 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <CountryFlag
                      country={country}
                      className="h-6 w-auto rounded-sm shadow-sm shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-neutral-500 text-xs tracking-widest uppercase">Delegation</div>
                      <div className="mt-1 tracking-tight text-neutral-950 truncate" style={{ fontSize: "1rem" }}>
                        {country}
                      </div>
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center tracking-tight shrink-0" style={{ backgroundColor: BRAND_SOFT, color: "#7a3000" }}>
                    {n}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      </GatedBody>
    </>
  );
}
