import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Calendar, Mail, MapPin, Linkedin, Twitter, Youtube } from "lucide-react";
import { Lockup } from "../components/brand/Lockup";
import { Grain, SectionLabel } from "../components/shared";
import { BRAND, BRAND_SOFT, INK, navItems } from "../data";

export function Newsletter() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div
          className="rounded-[2rem] p-8 md:p-16 text-white relative overflow-hidden"
          style={{ backgroundColor: INK }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${BRAND}55, transparent 50%), radial-gradient(circle at 0% 100%, ${BRAND}33, transparent 50%)`,
            }}
          />
          <Grain />
          <div className="relative grid md:grid-cols-5 gap-8 md:gap-10 items-center">
            <div className="md:col-span-3">
              <SectionLabel><span className="text-white">Stay close</span></SectionLabel>
              <h3 className="tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                Follow the journey.
              </h3>
              <p className="mt-4 text-white/70 max-w-md">
                FISC 2026 is invitation only — but anyone can follow the
                public dispatch: reflections, recaps and news from the
                global PFM community.
              </p>
            </div>
            <form className="md:col-span-2 flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <div className="flex items-center bg-white rounded-lg p-1.5 pl-4">
                <Mail size={18} className="text-neutral-500 shrink-0" />
                <input
                  type="email"
                  placeholder="Your work email"
                  className="flex-1 min-w-0 bg-transparent px-3 py-2 text-neutral-900 outline-none placeholder:text-neutral-400"
                />
                <button
                  style={{ backgroundColor: BRAND }}
                  className="px-4 md:px-5 py-2.5 rounded-lg text-white hover:opacity-90 transition shrink-0"
                >
                  Follow
                </button>
              </div>
              <p className="text-white/50 text-sm pl-2">Public updates only · Unsubscribe anytime.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ backgroundColor: INK }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 90% 0%, ${BRAND}33 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, ${BRAND}22 0%, transparent 50%)`,
        }}
      />
      <Grain />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 md:pt-24 pb-10">
        {/* Event meta strip */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-white/70 mb-10 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-white/15 bg-white/5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ backgroundColor: BRAND }} />
              <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: BRAND }} />
            </span>
            <span className="tracking-[0.2em] text-white/85 text-xs">FISC · 2026</span>
          </span>
          <span className="inline-flex items-center gap-2"><Calendar size={14} style={{ color: BRAND_SOFT }} /> Jun 29 – Jul 2, 2026</span>
          <span className="hidden md:inline-block w-px h-4 bg-white/15" />
          <span className="inline-flex items-center gap-2"><MapPin size={14} style={{ color: BRAND_SOFT }} /> Hyatt Regency · Port of Spain</span>
        </div>

        {/* Wordmark */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tracking-[-0.04em] text-white mb-14 md:mb-20 leading-[0.9]"
          style={{ fontSize: "clamp(3.5rem, 14vw, 14rem)" }}
        >
          See you in
          <br />
          <span
            className="italic"
            style={{
              background: `linear-gradient(120deg, ${BRAND_SOFT} 0%, ${BRAND} 60%, #c64b00 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Trinidad.
          </span>
        </motion.div>

        {/* CTA cards */}
        <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-14 md:mb-20">
          <Link
            to="/sign-in"
            className="group relative rounded-2xl p-6 md:p-7 flex items-center justify-between overflow-hidden transition-all hover:scale-[1.01]"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #c64b00 100%)` }}
          >
            <div className="relative z-10 text-white">
              <div className="text-white/80 text-xs tracking-[0.25em] uppercase">For delegates</div>
              <div className="mt-2 tracking-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.1 }}>
                Access the portal.
              </div>
            </div>
            <span className="relative z-10 w-12 h-12 rounded-full bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center group-hover:rotate-45 transition-transform">
              <ArrowUpRight size={20} className="text-white" />
            </span>
          </Link>

          <a
            href="mailto:fisc@freebalance.com"
            className="group relative rounded-2xl p-6 md:p-7 flex items-center justify-between border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition"
          >
            <div className="text-white">
              <div className="text-white/60 text-xs tracking-[0.25em] uppercase">For the press & partners</div>
              <div className="mt-2 tracking-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.1 }}>
                Get in touch.
              </div>
            </div>
            <span className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:rotate-45 transition-transform">
              <Mail size={18} className="text-white" />
            </span>
          </a>
        </div>

        {/* Link columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 pb-10 md:pb-14 border-b border-white/10">
          <div className="lg:col-span-5">
            <Lockup variant="light" size="lg" />
            <p className="mt-5 md:mt-6 max-w-md text-white/65" style={{ lineHeight: 1.7 }}>
              The FreeBalance International Steering Committee unites
              governments and partners advancing the digital transformation
              of Public Financial Management.
            </p>
            <div className="flex gap-2 mt-5 md:mt-6">
              {[Linkedin, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 text-white/80 flex items-center justify-center hover:text-white hover:border-transparent transition"
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND)}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "")}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="tracking-[0.25em] text-white/45 mb-4 text-xs">EVENT</div>
            <ul className="space-y-3 text-white/85">
              {navItems.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="group inline-flex items-center gap-1.5 hover:text-white transition">
                    {l.label}
                    <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <div className="tracking-[0.25em] text-white/45 mb-4 text-xs">RESOURCES</div>
            <ul className="space-y-3 text-white/85">
              {["Delegate Guide", "Blog", "Gallery", "Media"].map((l) => (
                <li key={l}>
                  <a href="#" className="group inline-flex items-center gap-1.5 hover:text-white transition">
                    {l}
                    <ArrowUpRight size={13} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <div className="tracking-[0.25em] text-white/45 mb-4 text-xs">CONTACT</div>
            <ul className="space-y-3 text-white/85">
              <li>
                <a href="mailto:fisc@freebalance.com" className="hover:text-white transition inline-flex items-center gap-2">
                  <Mail size={14} className="text-white/50" />
                  fisc@freebalance.com
                </a>
              </li>
              <li className="text-white/65 inline-flex items-start gap-2">
                <MapPin size={14} className="text-white/50 mt-1 shrink-0" />
                <span>
                  FreeBalance Inc.<br />
                  Ottawa · Lisbon · Port of Spain
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom strip */}
        <div className="pt-6 md:pt-8 flex flex-wrap items-center justify-between gap-4 text-white/50 text-sm">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>© 2026 FreeBalance Inc.</span>
            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-white/30" />
            <span>Hosted by the Ministry of Finance, Trinidad and Tobago</span>
          </div>
          <div className="flex flex-wrap gap-5 md:gap-6">
            <a href="#" className="hover:text-white transition">Privacy</a>
            <a href="#" className="hover:text-white transition">Terms</a>
            <a href="#" className="hover:text-white transition">Code of Conduct</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
