import { Link, Navigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Calendar,
  Clock,
  Linkedin,
  Mail,
  MapPin,
  Mic,
  Twitter,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GradientText, Grain, SectionLabel } from "../components/shared";
import { Breadcrumbs } from "../components/ui/Breadcrumbs";
import { chipTone } from "../tokens";
import {
  BRAND,
  BRAND_SOFT,
  INK,
  TAG_HUES,
  agenda,
  daySlugFor,
  speakers,
  type SpeakerEntry,
} from "../data";

type SessionAppearance = {
  dayIdx: number;
  sessionIdx: number;
  day: (typeof agenda)[number];
  session: (typeof agenda)[number]["sessions"][number];
};

function appearancesOf(speaker: SpeakerEntry): SessionAppearance[] {
  const out: SessionAppearance[] = [];
  agenda.forEach((day, dayIdx) => {
    day.sessions.forEach((session, sessionIdx) => {
      if (session.speakers?.some((sp) => sp.name === speaker.name)) {
        out.push({ dayIdx, sessionIdx, day, session });
      }
    });
  });
  return out;
}

export default function SpeakerDetail() {
  const { slug } = useParams<{ slug: string }>();
  const speaker = speakers.find((s) => s.slug === slug);
  if (!speaker) return <Navigate to="/speakers" replace />;

  const appearances = appearancesOf(speaker);
  const otherSpeakers = speakers.filter((s) => s.slug !== speaker.slug).slice(0, 4);

  return (
    <>
      {/* Hero — dark band with speaker portrait */}
      <section
        className="relative overflow-hidden pt-28 md:pt-36 pb-16 md:pb-24"
        style={{ backgroundColor: INK }}
      >
        <div className="absolute inset-0">
          <ImageWithFallback
            src={speaker.img}
            alt=""
            className="w-full h-full object-cover opacity-[0.12] blur-md"
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse at 85% 0%, ${BRAND}55 0%, transparent 55%), linear-gradient(180deg, rgba(10,10,10,0.85) 0%, rgba(10,10,10,0.6) 40%, ${INK} 100%)`,
          }}
        />
        <Grain />

        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          <Breadcrumbs
            tone="light"
            className="mb-6"
            items={[
              { label: "Speakers", to: "/speakers" },
              { label: speaker.name },
            ]}
          />


          <div className="grid lg:grid-cols-12 gap-8 md:gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-4 relative rounded-3xl overflow-hidden aspect-[4/5]"
            >
              <ImageWithFallback
                src={speaker.img}
                alt={speaker.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: `linear-gradient(180deg, transparent 60%, ${INK}cc 100%)` }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="lg:col-span-8 text-white"
            >
              <div className="text-xs tracking-[0.25em] uppercase text-white/65 mb-4">
                {speaker.org}{speaker.featured ? " · Keynote" : ""}
              </div>
              <h1
                className="tracking-[-0.03em]"
                style={{ fontSize: "clamp(2.25rem, 6vw, 5rem)", lineHeight: 1 }}
              >
                <GradientText tone="light">{speaker.name}</GradientText>
              </h1>
              <p
                className="mt-5 max-w-2xl"
                style={{ fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)", lineHeight: 1.55, color: "#fff" }}
              >
                {speaker.role}
              </p>

              <div className="mt-7 flex items-center gap-2">
                {speaker.email && (
                  <a
                    href={speaker.email}
                    aria-label="Email"
                    className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-transparent flex items-center justify-center transition"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                  >
                    <Mail size={15} />
                  </a>
                )}
                {speaker.linkedin && (
                  <a
                    href={speaker.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-transparent flex items-center justify-center transition"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                  >
                    <Linkedin size={15} />
                  </a>
                )}
                {speaker.twitter && (
                  <a
                    href={speaker.twitter}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="X / Twitter"
                    className="w-10 h-10 rounded-full border border-white/20 text-white/80 hover:text-white hover:border-transparent flex items-center justify-center transition"
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                  >
                    <Twitter size={15} />
                  </a>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bio + Sessions */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16">
            {/* Bio */}
            <div className="lg:col-span-7">
              <SectionLabel>About</SectionLabel>
              {speaker.bio ? (
                <p className="text-neutral-700" style={{ fontSize: "1.125rem", lineHeight: 1.75 }}>
                  {speaker.bio}
                </p>
              ) : (
                <p className="text-neutral-500" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                  Biography to follow.
                </p>
              )}
            </div>

            {/* Sessions sidebar */}
            <aside className="lg:col-span-5">
              <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-6 md:p-7 sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <Mic size={14} style={{ color: BRAND }} />
                  <span className="text-xs tracking-[0.25em] uppercase text-neutral-500">
                    Programme appearances
                  </span>
                </div>
                {appearances.length > 0 ? (
                  <div className="space-y-2">
                    {appearances.map((a) => {
                      const tagTone = a.session.tag ? chipTone(TAG_HUES[a.session.tag]) : undefined;
                      return (
                        <Link
                          key={`${a.dayIdx}-${a.sessionIdx}`}
                          to={`/agenda/${daySlugFor(a.day)}/${a.sessionIdx}`}
                          className="group block p-4 rounded-md bg-white border border-neutral-200 hover:border-neutral-950 transition"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                              {a.day.short}
                            </span>
                            {a.session.tag && tagTone && (
                              <span
                                className="inline-flex items-center px-2 py-0.5 rounded-sm text-[10px]"
                                style={{ backgroundColor: tagTone.bg, color: tagTone.fg }}
                              >
                                {a.session.tag}
                              </span>
                            )}
                          </div>
                          <div
                            className="tracking-tight text-neutral-950 group-hover:text-neutral-950"
                            style={{ fontSize: "0.95rem", lineHeight: 1.3 }}
                          >
                            {a.session.title}
                          </div>
                          <div className="mt-2 flex items-center justify-between text-xs text-neutral-500">
                            <span className="inline-flex items-center gap-1 tabular-nums">
                              <Clock size={11} /> {a.session.time}
                            </span>
                            <ArrowUpRight
                              size={14}
                              className="text-neutral-400 group-hover:text-neutral-950 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition"
                            />
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-neutral-500">Appearances to be announced.</p>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Other speakers */}
      {otherSpeakers.length > 0 && (
        <section className="py-12 md:py-20" style={{ backgroundColor: "#f6f4ef" }}>
          <div className="max-w-7xl mx-auto px-5 md:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8 md:mb-10">
              <div>
                <SectionLabel>More from FISC 2026</SectionLabel>
                <h2
                  className="tracking-[-0.02em] text-neutral-950"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.05 }}
                >
                  Other <em className="italic">presenters.</em>
                </h2>
              </div>
              <Link
                to="/speakers"
                className="group inline-flex items-center gap-2 px-5 py-3 rounded-sm border border-neutral-300 bg-white hover:bg-neutral-950 hover:text-white hover:border-neutral-950 transition"
              >
                All presenters
                <ArrowUpRight size={16} className="group-hover:rotate-45 transition-transform" />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4">
              {otherSpeakers.map((s) => (
                <Link
                  key={s.slug}
                  to={`/speakers/${s.slug}`}
                  className="group rounded-2xl overflow-hidden bg-white border border-neutral-200 hover:border-neutral-950 transition"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-neutral-100">
                    <ImageWithFallback
                      src={s.img}
                      alt={s.name}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                    />
                  </div>
                  <div className="p-4">
                    <div className="tracking-tight text-neutral-950 truncate" style={{ fontSize: "0.95rem" }}>
                      {s.name}
                    </div>
                    <div className="text-neutral-500 text-xs mt-0.5 truncate">{s.role}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing CTA — quick link back to agenda */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <Link
            to="/agenda"
            className="group block rounded-3xl overflow-hidden p-8 md:p-10 text-white relative"
            style={{ backgroundColor: INK }}
          >
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ background: `radial-gradient(ellipse at 85% 0%, ${BRAND}44, transparent 55%)` }}
            />
            <div className="relative flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="text-xs tracking-[0.25em] text-white/60 mb-3 inline-flex items-center gap-2">
                  <Calendar size={12} style={{ color: BRAND_SOFT }} /> JUNE 29 – JULY 2, 2026
                </div>
                <div
                  className="tracking-[-0.02em]"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", lineHeight: 1.1 }}
                >
                  See the full FISC 2026 programme.
                </div>
                <div className="mt-3 inline-flex items-center gap-2 text-white/70 text-sm">
                  <MapPin size={14} style={{ color: BRAND_SOFT }} /> Hyatt Regency · Port of Spain
                </div>
              </div>
              <span
                className="w-12 h-12 rounded-full flex items-center justify-center group-hover:rotate-45 transition-transform"
                style={{ backgroundColor: BRAND }}
              >
                <ArrowUpRight size={18} />
              </span>
            </div>
          </Link>
        </div>
      </section>
    </>
  );
}
