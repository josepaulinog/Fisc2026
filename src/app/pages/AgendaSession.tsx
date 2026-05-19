import { Link, Navigate, useParams } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Clock,
  MapPin,
  Mic,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { GradientText, PageHero } from "../components/shared";
import {
  BRAND,
  HERO_AGENDA,
  TAG_COLORS,
  agenda,
  daySlugFor,
} from "../data";

type SessionLocator = {
  dayIdx: number;
  sessionIdx: number;
};

function neighbourOf(loc: SessionLocator, direction: "prev" | "next"): SessionLocator | null {
  const { dayIdx, sessionIdx } = loc;
  if (direction === "prev") {
    if (sessionIdx > 0) return { dayIdx, sessionIdx: sessionIdx - 1 };
    if (dayIdx > 0) {
      const prevDay = agenda[dayIdx - 1];
      return { dayIdx: dayIdx - 1, sessionIdx: prevDay.sessions.length - 1 };
    }
    return null;
  }
  const day = agenda[dayIdx];
  if (sessionIdx < day.sessions.length - 1) return { dayIdx, sessionIdx: sessionIdx + 1 };
  if (dayIdx < agenda.length - 1) return { dayIdx: dayIdx + 1, sessionIdx: 0 };
  return null;
}

function pathOf(loc: SessionLocator): string {
  return `/agenda/${daySlugFor(agenda[loc.dayIdx])}/${loc.sessionIdx}`;
}

export default function AgendaSession() {
  const { daySlug, sessionIdx: sessionIdxParam } = useParams<{ daySlug: string; sessionIdx: string }>();

  const dayIdx = agenda.findIndex((d) => daySlugFor(d) === daySlug);
  if (dayIdx === -1) return <Navigate to="/agenda" replace />;

  const day = agenda[dayIdx];
  const sessionIdx = Number(sessionIdxParam);
  if (
    !Number.isInteger(sessionIdx) ||
    sessionIdx < 0 ||
    sessionIdx >= day.sessions.length
  ) {
    return <Navigate to="/agenda" replace />;
  }

  const session = day.sessions[sessionIdx];
  const prev = neighbourOf({ dayIdx, sessionIdx }, "prev");
  const next = neighbourOf({ dayIdx, sessionIdx }, "next");

  const tagColor = session.tag ? TAG_COLORS[session.tag] : undefined;

  return (
    <>
      <PageHero
        label={`${day.short} · ${day.date}`}
        title={<GradientText>{session.title}</GradientText>}
        subtitle={session.desc}
        image={HERO_AGENDA}
        imageCaption={`Session ${sessionIdx + 1} of ${day.sessions.length}`}
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-8 md:gap-12">
            {/* Sidebar — schedule + meta */}
            <aside className="lg:col-span-4">
              <div className="rounded-2xl border border-neutral-200 bg-neutral-50/50 p-6 md:p-7 sticky top-28">
                <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">
                  Schedule
                </div>
                <dl className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                      <Clock size={15} />
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.2em] uppercase text-neutral-500">Time</dt>
                      <dd className="mt-1 tracking-tight text-neutral-950 tabular-nums" style={{ fontSize: "1rem" }}>
                        {session.time}
                      </dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                      <Calendar size={15} />
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.2em] uppercase text-neutral-500">Day</dt>
                      <dd className="mt-1 tracking-tight text-neutral-950" style={{ fontSize: "1rem" }}>
                        {day.label}
                      </dd>
                      <div className="text-neutral-500 text-sm mt-0.5">{day.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                      <MapPin size={15} />
                    </div>
                    <div>
                      <dt className="text-xs tracking-[0.2em] uppercase text-neutral-500">Venue</dt>
                      <dd className="mt-1 tracking-tight text-neutral-950" style={{ fontSize: "1rem" }}>
                        Hyatt Regency
                      </dd>
                      <div className="text-neutral-500 text-sm mt-0.5">Port of Spain</div>
                    </div>
                  </div>
                  {session.tag && tagColor && (
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${tagColor}18`, color: tagColor }}>
                        <Mic size={15} />
                      </div>
                      <div>
                        <dt className="text-xs tracking-[0.2em] uppercase text-neutral-500">Format</dt>
                        <dd className="mt-1">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs" style={{ backgroundColor: `${tagColor}18`, color: tagColor }}>
                            {session.tag}
                          </span>
                        </dd>
                      </div>
                    </div>
                  )}
                </dl>

                <Link
                  to="/agenda"
                  className="mt-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 transition"
                >
                  <ArrowLeft size={14} /> All sessions
                </Link>
              </div>
            </aside>

            {/* Main — description + speakers */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="lg:col-span-8"
            >
              {session.desc ? (
                <>
                  <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">
                    About this session
                  </div>
                  <p className="text-neutral-700" style={{ fontSize: "1.125rem", lineHeight: 1.7 }}>
                    {session.desc}
                  </p>
                </>
              ) : (
                <>
                  <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-4">
                    Logistics
                  </div>
                  <p className="text-neutral-600" style={{ fontSize: "1.0625rem", lineHeight: 1.7 }}>
                    A pause in the formal programme. Refreshments and informal conversation in the lobby — secretariat staff are on hand if you need anything.
                  </p>
                </>
              )}

              {session.speakers && session.speakers.length > 0 && (
                <div className="mt-10 md:mt-14">
                  <div className="text-xs tracking-[0.25em] uppercase text-neutral-500 mb-5">
                    Speakers
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3 md:gap-4">
                    {session.speakers.map((sp) => (
                      <div
                        key={sp.name}
                        className="flex items-center gap-4 p-5 rounded-2xl border border-neutral-200 bg-white"
                      >
                        <div className="shrink-0">
                          {sp.img ? (
                            <div className="w-14 h-14 rounded-full overflow-hidden bg-neutral-100">
                              <ImageWithFallback src={sp.img} alt={sp.name} className="w-full h-full object-cover" />
                            </div>
                          ) : (
                            <div
                              className="w-14 h-14 rounded-full flex items-center justify-center text-white tracking-tight"
                              style={{ backgroundColor: BRAND, fontSize: "0.95rem" }}
                            >
                              FB
                            </div>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="tracking-tight text-neutral-950 truncate" style={{ fontSize: "1rem" }}>
                            {sp.name}
                          </div>
                          {sp.role && (
                            <div className="text-neutral-500 text-sm mt-0.5">{sp.role}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Prev / Next session nav */}
              <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 border-t border-neutral-100 pt-8">
                {prev ? (
                  <Link
                    to={pathOf(prev)}
                    className="group p-5 rounded-2xl border border-neutral-200 hover:border-neutral-950 transition"
                  >
                    <div className="flex items-center gap-2 text-xs tracking-[0.25em] uppercase text-neutral-500">
                      <ArrowLeft size={12} /> Previous
                    </div>
                    <div className="mt-2 tracking-tight text-neutral-950 group-hover:text-neutral-950" style={{ fontSize: "1rem", lineHeight: 1.3 }}>
                      {agenda[prev.dayIdx].sessions[prev.sessionIdx].title}
                    </div>
                    <div className="mt-1 text-neutral-500 text-sm">
                      {agenda[prev.dayIdx].short} · {agenda[prev.dayIdx].sessions[prev.sessionIdx].time}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
                {next ? (
                  <Link
                    to={pathOf(next)}
                    className="group p-5 rounded-2xl border border-neutral-200 hover:border-neutral-950 transition md:text-right"
                  >
                    <div className="flex items-center md:justify-end gap-2 text-xs tracking-[0.25em] uppercase text-neutral-500">
                      Next <ArrowRight size={12} />
                    </div>
                    <div className="mt-2 tracking-tight text-neutral-950 group-hover:text-neutral-950" style={{ fontSize: "1rem", lineHeight: 1.3 }}>
                      {agenda[next.dayIdx].sessions[next.sessionIdx].title}
                    </div>
                    <div className="mt-1 text-neutral-500 text-sm">
                      {agenda[next.dayIdx].short} · {agenda[next.dayIdx].sessions[next.sessionIdx].time}
                    </div>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              <Link
                to="/agenda"
                className="mt-8 inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-950 transition"
              >
                Back to full agenda <ArrowUpRight size={14} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
