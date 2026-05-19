import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Linkedin, Lock, Mail, Search, Twitter, Users } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
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
      className="group relative rounded-2xl border border-neutral-200 bg-white p-5 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all"
    >
      {a.delegationLead && (
        <span
          className="absolute top-3 right-3 inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] tracking-[0.2em] uppercase"
          style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
        >
          Lead
        </span>
      )}
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          {a.img ? (
            <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100 ring-2 ring-white shadow-sm">
              <ImageWithFallback src={a.img} alt={a.name} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center text-white tracking-tight"
              style={{ backgroundColor: BRAND, fontSize: "0.95rem" }}
            >
              {initialsOf(a.name)}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="tracking-tight text-neutral-950 group-hover:text-white truncate" style={{ fontSize: "1rem" }}>
            {a.salutation ? `${a.salutation} ` : ""}
            {a.name}
          </div>
          <div className="text-neutral-600 group-hover:text-white/70 text-sm leading-snug mt-0.5">
            {a.role}
          </div>
          <div className="mt-1.5 inline-flex items-center gap-1 text-xs tracking-widest uppercase text-neutral-400 group-hover:text-white/55">
            <span className="w-1 h-1 rounded-full" style={{ backgroundColor: BRAND }} />
            {a.country}
          </div>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-2">
        {a.email && (
          <a href={a.email} aria-label="Email" className="w-8 h-8 rounded-full border border-neutral-200 group-hover:border-white/20 text-neutral-500 group-hover:text-white/70 hover:text-white flex items-center justify-center transition" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
            <Mail size={13} />
          </a>
        )}
        {a.linkedin && (
          <a href={a.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="w-8 h-8 rounded-full border border-neutral-200 group-hover:border-white/20 text-neutral-500 group-hover:text-white/70 hover:text-white flex items-center justify-center transition" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
            <Linkedin size={13} />
          </a>
        )}
        {a.twitter && (
          <a href={a.twitter} target="_blank" rel="noreferrer" aria-label="X" className="w-8 h-8 rounded-full border border-neutral-200 group-hover:border-white/20 text-neutral-500 group-hover:text-white/70 hover:text-white flex items-center justify-center transition" onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)} onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}>
            <Twitter size={13} />
          </a>
        )}
        <span className="ml-auto text-xs text-neutral-400 group-hover:text-white/40 truncate">
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
        title={<>The room behind <GradientText>the work.</GradientText></>}
        subtitle="FISC 2026 brings together finance ministers, treasurers and reformers from 40+ countries. Sign in to see the full list — or scroll on for a preview of the delegation."
        image={HERO_ATTENDEES}
        imageCaption="Audience · FISC plenary"
      />

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
              <p className="mt-3 text-neutral-600 max-w-2xl" style={{ lineHeight: 1.65 }}>
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
              <div className="flex items-center gap-2 overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0 scrollbar-hide">
                {REGIONS.map((r) => {
                  const isActive = region === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setRegion(r)}
                      className={`shrink-0 px-3.5 py-2 rounded-lg border text-sm transition ${
                        isActive
                          ? "bg-neutral-950 border-neutral-950 text-white"
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
            <div className="text-center py-20 text-neutral-500 border border-dashed border-neutral-200 rounded-2xl">
              <Users size={28} className="mx-auto mb-3 text-neutral-300" />
              No delegates match your search.
            </div>
          )}

          <div className="mt-12 md:mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {Object.entries(countByCountry)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 8)
              .map(([country, n]) => (
                <div key={country} className="rounded-2xl border border-neutral-200 bg-white p-4 flex items-center justify-between">
                  <div>
                    <div className="text-neutral-500 text-xs tracking-widest uppercase">Delegation</div>
                    <div className="mt-1 tracking-tight text-neutral-950" style={{ fontSize: "1rem" }}>
                      {country}
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full flex items-center justify-center tracking-tight" style={{ backgroundColor: BRAND_SOFT, color: "#7a3000" }}>
                    {n}
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
