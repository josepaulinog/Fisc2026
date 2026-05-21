import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  AlertCircle,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  Youtube,
} from "lucide-react";
import { Lockup } from "../components/brand/Lockup";
import { BracketArrow } from "../components/ui/BracketArrow";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain, SectionLabel } from "../components/shared";
import { looksLikeEmail } from "../auth";
import { BRAND, BRAND_SOFT, HERO_IMG, INK, NEWSLETTER_IMG, navItems } from "../data";
import { TYPE } from "../tokens";

export function Newsletter() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = value.trim();
    if (!trimmed) {
      setError("Enter your email to follow along.");
      return;
    }
    if (!looksLikeEmail(trimmed)) {
      setError("That doesn't look like an email address.");
      return;
    }
    // Stub: real flow posts to the FreeBalance newsletter endpoint at WP-port time.
    setError(null);
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        {/* Newsletter Doppelrand — outer hairline tray + inner dark panel.
            The 6px inner radius differential reads like a glass display set
            into a brushed metal bezel. */}
        <div className="rounded-md p-1.5 bg-black/[0.03] ring-1 ring-black/[0.05]">
        <div
          className="rounded-sm text-white relative overflow-hidden"
          style={{ backgroundColor: INK }}
        >
          {/* Brand radials — INK-dominant with brand as a corner whisper. */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at 100% 0%, ${BRAND}2e, transparent 38%), radial-gradient(circle at 0% 100%, ${BRAND}1a, transparent 38%)`,
            }}
          />
          <Grain />
          {/* 7-col composition: image (2) · copy (3) · form (2). The image
              column is hidden below md so the mobile card stays the lean
              text + stacked form. On md+ the image fades into the INK panel
              via a left→right gradient so there's no hard seam between
              photo and panel background. */}
          <div className="relative grid md:grid-cols-7 items-stretch">
            <div className="hidden md:block md:col-span-2 relative min-h-[260px]">
              <ImageWithFallback
                src={NEWSLETTER_IMG}
                alt="FISC delegates"
                className="absolute inset-0 w-full h-full object-cover opacity-80"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(to right, ${INK}33 0%, ${INK}66 55%, ${INK} 100%)`,
                }}
              />
              {/* Brand-orange whisper bleeding off the top-left corner of the
                  photo — ties the image into the panel's radial accent. */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at 10% 0%, ${BRAND}33, transparent 45%)`,
                }}
              />
            </div>

            <div className="md:col-span-5 p-8 md:p-12 grid md:grid-cols-5 gap-8 md:gap-10 items-center">
              <div className="md:col-span-3">
                <SectionLabel tone="light">Stay close</SectionLabel>
                <h3 className="tracking-[-0.02em]" style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)", lineHeight: 1.05 }}>
                  Follow the <em className="font-display italic" style={{ paddingInline: "0.05em", marginInline: "-0.025em" }}>journey.</em>
                </h3>
                <p className="mt-4 text-white/70 max-w-md">
                  FISC 2026 is invitation only — but anyone can follow the
                  public dispatch: reflections, recaps and news from the
                  global PFM community.
                </p>
              </div>

              <div className="md:col-span-2">
                {submitted ? (
                  <div
                    role="status"
                    className="flex items-start gap-3 p-4 rounded-sm bg-white/10 ring-1 ring-white/20 text-white backdrop-blur"
                  >
                    <span
                      className="w-8 h-8 rounded-sm flex items-center justify-center shrink-0"
                      style={{ backgroundColor: `${BRAND}33`, color: "#fff" }}
                    >
                      <CheckCircle2 size={16} strokeWidth={1.5} />
                    </span>
                    <div>
                      <div className="tracking-tight" style={{ fontSize: "0.95rem" }}>
                        You're on the list.
                      </div>
                      <div className="text-white/70 text-sm mt-0.5">
                        Public dispatches will arrive in your inbox.
                      </div>
                    </div>
                  </div>
                ) : (
                  // Mobile: stacked layout (input row → full-width button with
                  // "Follow" text + arrow for explicit affordance).
                  // Sm+: inline composite with overflow-hidden on the pill so
                  // the brand-orange button stretches edge-to-edge of the
                  // white container — no padding gap, no height mismatch.
                  // Desktop button is icon-only (cleaner, removes the chunk),
                  // text is restored on mobile where the stacked button
                  // would otherwise feel ambiguous.
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                    <div
                      className={`flex flex-col sm:flex-row sm:items-stretch bg-white rounded-sm overflow-hidden border transition-fluid ${
                        error ? "border-red-400" : "border-transparent"
                      }`}
                    >
                      <div className="flex items-center pl-4 sm:pl-5 sm:flex-1">
                        <Mail size={15} strokeWidth={1.75} className="text-neutral-500 shrink-0" />
                        <input
                          type="email"
                          aria-label="Your work email"
                          aria-invalid={!!error}
                          placeholder="Your work email"
                          value={value}
                          onChange={(e) => {
                            setValue(e.target.value);
                            if (error) setError(null);
                          }}
                          className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 text-[15px]"
                        />
                      </div>
                      <button
                        type="submit"
                        aria-label="Follow"
                        style={{ backgroundColor: BRAND }}
                        className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:py-0 sm:px-5 text-white transition-fluid will-change-transform active:scale-[0.98] hover:brightness-105 shrink-0"
                      >
                        <span className="sm:hidden" style={{ fontSize: TYPE.body, fontWeight: 500 }}>Follow</span>
                        <span className="inline-flex transition-fluid group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]">
                          <BracketArrow
                            size={14}
                            strokeWidth={1.75}
                          />
                        </span>
                      </button>
                    </div>
                    {error ? (
                      <p className="text-red-200 text-sm pl-2 inline-flex items-center gap-1.5">
                        <AlertCircle size={12} strokeWidth={1.5} /> {error}
                      </p>
                    ) : (
                      <p className="text-white/50 text-sm pl-2">Public updates only · Unsubscribe anytime.</p>
                    )}
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}

type FooterProps = {
  /**
   * Render the giant "See you in Trinidad." wordmark + the two big CTA cards
   * (delegate portal + press contact). These are the closing-moment elements
   * and only belong on the Home page — a 224px headline can only land once
   * per session, and the two big cards repeat affordances that the rest of
   * the site already exposes via the nav. Everywhere else, just the meta
   * strip + link columns + bottom attribution render.
   */
  variant?: "full" | "compact";
};

export function Footer({ variant = "compact" }: FooterProps = {}) {
  const showClosingBand = variant === "full";
  return (
    <footer className="relative overflow-hidden text-white" style={{ backgroundColor: INK }}>
      {/* Top-right Trinidad background — anchors the closing wordmark in
          the actual destination. Only rendered with the closing band, since
          on inner pages there's no giant headline for it to back up. */}
      {showClosingBand && (
        <div className="absolute top-0 right-0 w-full md:w-3/4 h-[55%] pointer-events-none">
          <ImageWithFallback
            src={HERO_IMG}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.22]"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, ${INK} 0%, ${INK}d9 25%, transparent 70%)`,
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to bottom, transparent 35%, ${INK}99 75%, ${INK} 100%)`,
            }}
          />
        </div>
      )}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 90% 0%, ${BRAND}33 0%, transparent 55%), radial-gradient(ellipse at 0% 100%, ${BRAND}22 0%, transparent 50%)`,
        }}
      />
      <Grain />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-12 md:pt-24 pb-10">
        {/* Event meta strip */}
        <div className="flex flex-wrap items-center gap-2.5 md:gap-4 text-[0.8125rem] md:text-sm text-white/70 mb-8 md:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-white/15 bg-white/5">
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

        {/* Closing band (wordmark + 2 CTA cards) — Home only. The 224px
            headline is a once-per-session moment; the CTA cards repeat
            affordances already in the nav. Hidden on inner pages so the
            footer reads as a clean nav/contact band, not a third hero. */}
        {showClosingBand && (
          <>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="tracking-[-0.04em] text-white mb-10 md:mb-20 leading-[1] md:leading-[0.95]"
          style={{ fontSize: "clamp(3.25rem, 14vw, 14rem)" }}
        >
          See you in
          <br />
          <span
            className="italic"
            style={{
              background: `linear-gradient(120deg, ${BRAND_SOFT} 0%, ${BRAND} 60%, #c64b00 100%)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              paddingInline: "0.05em",
              marginInline: "-0.05em",
            }}
          >
            Trinidad.
          </span>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-3 md:gap-4 mb-14 md:mb-20">
          <Link
            to="/sign-in"
            className="group relative rounded-lg p-6 md:p-7 flex items-center justify-between overflow-hidden transition-all hover:scale-[1.01]"
            style={{ background: `linear-gradient(135deg, ${BRAND} 0%, #c64b00 100%)` }}
          >
            <div className="relative z-10 text-white">
              <div className="text-white/80 text-xs tracking-[0.25em] uppercase">For delegates</div>
              <div className="mt-2 tracking-tight" style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", lineHeight: 1.1 }}>
                Access the portal.
              </div>
            </div>
            <span className="relative z-10 w-12 h-12 rounded-full bg-white/15 border border-white/25 backdrop-blur flex items-center justify-center group-hover:rotate-45 transition-transform">
              <BracketArrow size={16} strokeWidth={1.75} className="text-white" />
            </span>
          </Link>

          <a
            href="mailto:fisc@freebalance.com"
            className="group relative rounded-md p-6 md:p-7 flex items-center justify-between border border-white/15 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 transition"
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
          </>
        )}

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
