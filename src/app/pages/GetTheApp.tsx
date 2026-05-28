import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Bell,
  CheckCircle,
  ChevronDown,
  Monitor,
  Plus,
  Share,
  ShieldCheck,
  Smartphone,
  Sparkles,
  WifiOff,
  Zap,
} from "lucide-react";
import { GradientText, PageHero, SectionLabel } from "../components/shared";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";
import { BRAND, BRAND_SOFT } from "../data";
import { useInstallPrompt, type InstallState } from "../installPrompt";
import hyattTrinidad from "../../imports/hyatt-trinidad.webp";

// Local surface tokens. The PageHero and the global Footer keep the warm
// site-wide INK treatment (handled in shared.tsx / Footer.tsx). Everything in
// between leans light grayscale so brand-orange accents pop and the dark phone
// mockup contrasts cleanly with its surroundings.
const SHOWCASE_BG = "#e7e9ec";
const SHOWCASE_FG = "#0c0c0e";

/**
 * /get-the-app — installable-PWA landing page.
 *
 * Public on purpose (not gated): delegates should be able to install before
 * signing in. The page renders a full multi-platform showcase regardless of
 * the visiting browser so the install path is always discoverable — the
 * "smart" CTA on top resolves to the one-tap prompt when available, and
 * scrolls to the right platform card otherwise.
 */
export default function GetTheApp() {
  const install = useInstallPrompt();

  return (
    <>
      <PageHero
        label="Get the app"
        breadcrumbs={[
          { label: "Resources", to: "/resources" },
          { label: "Get the app" },
        ]}
        title={<>Install the <GradientText>delegate portal.</GradientText></>}
        subtitle="Your schedule, sessions, and delegate guide — saved to your home screen, ready offline, and a tap away during the four days in Port of Spain."
        image={hyattTrinidad}
        imageOverlayStrength={0.78}
        hasSunset
      />

      <HeroShowcase state={install} />
      <PlatformGrid state={install} />
      <FeaturesStrip />
      <Faq />
      <ClosingCTA state={install} />
    </>
  );
}

// ─── Brand glyphs ──────────────────────────────────────────────────────────
// Inline SVGs for Apple / Android / Chrome marks. Lucide's stock "apple" icon
// is the fruit, not the brand — and there's no Android icon at all. These are
// hand-tuned at 24x24 viewBox to sit cleanly inside the same 44-48px square
// wells the lucide icons use elsewhere on the page.

function AppleMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

function AndroidMark({ size = 22 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M18.4395 5.5586c-.675 1.1664-1.352 2.3318-2.0274 3.498-.0366-.0155-.0742-.0286-.1113-.043-1.8249-.6957-3.484-.8-4.42-.787-1.8551.0185-3.3544.4643-4.2597.8203-.084-.1494-1.7526-3.021-2.0215-3.4864a1.1451 1.1451 0 0 0-.1406-.1914c-.3312-.364-.9054-.4859-1.379-.203-.475.282-.7136.9361-.3886 1.5019 1.9466 3.3696-.0966-.2158 1.9473 3.3593.0172.031-.4946.2642-1.3926 1.0177C2.8987 12.176.452 14.772 0 18.9902h24c-.119-1.1108-.3686-2.099-.7461-3.0683-.7438-1.9118-1.8435-3.2928-2.7402-4.1836a12.1048 12.1048 0 0 0-2.1309-1.6875c.6594-1.122 1.312-2.2559 1.9649-3.3848.2077-.3615.1886-.7956-.0079-1.1191a1.1001 1.1001 0 0 0-.8515-.5332c-.5225-.0536-.9392.3128-1.0488.5449zm-.0391 8.461c.3944.5926.324 1.3306-.1563 1.6503-.4799.3197-1.188.0985-1.582-.4941-.3944-.5927-.324-1.3307.1563-1.6504.4727-.315 1.1812-.1086 1.582.4941zM7.207 13.5273c.4803.3197.5506 1.0577.1563 1.6504-.394.5926-1.1038.8138-1.584.4941-.48-.3197-.5503-1.0577-.1563-1.6504.4008-.6021 1.1087-.8106 1.584-.4941z" />
    </svg>
  );
}

// ─── HeroShowcase ──────────────────────────────────────────────────────────
// Sits flush under the PageHero — now on a light cool-gray surface (the only
// dark sections on this page are the PageHero and the global Footer). The
// dark phone mockup pops against the gray; brand accents register as
// deliberate highlights instead of vanishing into another dark band.

function HeroShowcase({ state }: { state: InstallState }) {
  const status = resolveStatus(state);

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: SHOWCASE_BG }}>
      {/* Ambient depth — light radial highlights on a gray surface read as
          architectural lift rather than colour flood. A single restrained
          brand-orange whisper sits behind the phone mockup so the section
          still ties to the page's accent system. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 78% 32%, ${BRAND}12 0%, transparent 50%), radial-gradient(ellipse at 8% 95%, rgba(255,255,255,0.7) 0%, transparent 45%), radial-gradient(ellipse at 95% 95%, rgba(0,0,0,0.04) 0%, transparent 45%)`,
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-5 md:px-6 pt-16 pb-20 md:pb-32 md:pt-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left rail — status + smart CTA */}
          <div className="lg:col-span-7 order-2 lg:order-1">
            <StatusPill tone={status.tone} surface="light">{status.label}</StatusPill>

            <h2
              className="mt-6 tracking-[-0.02em]"
              style={{
                fontSize: "clamp(1.85rem, 3.8vw, 2.85rem)",
                lineHeight: 1.05,
                color: SHOWCASE_FG,
              }}
            >
              {status.headline}
            </h2>
            <p
              className="mt-5 text-neutral-600 max-w-xl"
              style={{ fontSize: "clamp(1rem, 1.1vw, 1.0625rem)", lineHeight: 1.65 }}
            >
              {status.copy}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <SmartInstallCTA state={state} />
              <a
                href="#platforms"
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm ring-1 ring-black/15 text-neutral-700 hover:text-neutral-950 hover:ring-black/30 transition-fluid text-[15px]"
                style={{ fontWeight: 500 }}
              >
                Pick your platform
                <span className="inline-flex transition-fluid group-hover:translate-y-[1px]">
                  <ChevronDown size={14} strokeWidth={1.75} />
                </span>
              </a>
            </div>

            {/* Trust strip — three reasons it's safe to install. */}
            <ul className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-neutral-600 text-sm">
              <TrustItem icon={<ShieldCheck size={14} strokeWidth={1.75} />}>
                No app store · no review
              </TrustItem>
              <TrustItem icon={<Zap size={14} strokeWidth={1.75} />}>
                Installs in seconds
              </TrustItem>
              <TrustItem icon={<Sparkles size={14} strokeWidth={1.75} />}>
                Same login, same data
              </TrustItem>
            </ul>
          </div>

          {/* Right rail — phone mockup */}
          <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
            <PhoneMockup />
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustItem({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <li className="inline-flex items-center gap-2">
      <span
        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
        style={{ backgroundColor: `${BRAND}1c`, color: BRAND }}
      >
        {icon}
      </span>
      <span>{children}</span>
    </li>
  );
}

function StatusPill({
  tone,
  surface = "dark",
  children,
}: {
  tone: "ready" | "ios" | "wait" | "installed";
  surface?: "dark" | "light";
  children: React.ReactNode;
}) {
  // Each state gets a distinct dot colour so the badge is scannable even
  // before reading the label.
  const dot =
    tone === "installed"
      ? "#10b981"
      : tone === "ready"
      ? BRAND
      : tone === "ios"
      ? "#6366f1"
      : "#d97706";
  const pillStyles =
    surface === "light"
      ? "bg-white/70 ring-1 ring-black/[0.08] text-neutral-700 shadow-[0_1px_0_rgba(255,255,255,0.6),0_8px_22px_-14px_rgba(0,0,0,0.18)]"
      : "bg-white/[0.06] ring-1 ring-white/15 backdrop-blur-md text-white/80";
  return (
    <span
      className={`inline-flex items-center gap-2 pl-2.5 pr-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] ${pillStyles}`}
      style={{ fontWeight: 500 }}
    >
      <motion.span
        className="w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: dot }}
        animate={
          tone === "ready" || tone === "installed"
            ? { opacity: [1, 0.4, 1] }
            : undefined
        }
        transition={{ duration: 1.8, repeat: Infinity, ease: [0.32, 0.72, 0, 1] }}
      />
      {children}
    </span>
  );
}

function resolveStatus(state: InstallState) {
  if (state.isInstalled) {
    return {
      tone: "installed" as const,
      label: "Installed on this device",
      headline: "You're all set.",
      copy: "The delegate portal is on this device's home screen. Launch it any time — it'll keep working when the venue Wi-Fi doesn't.",
    };
  }
  if (state.canInstall) {
    return {
      tone: "ready" as const,
      label: "Ready to install",
      headline: "One tap. The portal lives on your home screen.",
      copy: "Your browser supports a direct install. Tap the button and the delegate portal lands on your home screen or app drawer — no app store, no review.",
    };
  }
  if (state.isIOS) {
    return {
      tone: "ios" as const,
      label: "Detected: iPhone or iPad",
      headline: "Two taps in Safari to add it.",
      copy: "Apple doesn't expose a one-tap install on iOS, but Safari's share menu adds the portal to your home screen as a normal app icon. Walkthrough below.",
    };
  }
  return {
    tone: "wait" as const,
    label: "Open on your phone",
    headline: "Installs best from a mobile browser.",
    copy: "On phones the portal becomes a true home-screen app. On desktop Chrome or Edge, the install icon sits at the right edge of the address bar. Pick your platform below.",
  };
}

function SmartInstallCTA({ state }: { state: InstallState }) {
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<"accepted" | "dismissed" | null>(null);

  // Already installed → success card replaces the CTA.
  if (state.isInstalled) {
    return (
      <span
        className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-sm bg-emerald-500/15 ring-1 ring-emerald-400/30 text-emerald-200 text-[15px]"
        style={{ fontWeight: 500 }}
      >
        <CheckCircle size={16} strokeWidth={1.75} />
        Installed
      </span>
    );
  }

  // Can install directly via beforeinstallprompt — wire the prompt.
  if (state.canInstall) {
    const trigger = async () => {
      setBusy(true);
      const choice = await state.install();
      setOutcome(choice);
      setBusy(false);
    };
    return (
      <NestedCTA
        onClick={trigger}
        variant="brand"
        icon={<BracketArrow size={13} strokeWidth={1.75} />}
        className={busy ? "opacity-70 pointer-events-none" : ""}
      >
        {busy ? "Installing…" : outcome === "dismissed" ? "Try again" : "Install now"}
      </NestedCTA>
    );
  }

  // iOS — anchor straight to the Safari walkthrough card.
  if (state.isIOS) {
    return (
      <NestedCTA
        href="#ios"
        variant="brand"
        icon={<BracketArrow size={13} strokeWidth={1.75} />}
      >
        Show me the steps
      </NestedCTA>
    );
  }

  // Fallback — route to the platform grid.
  return (
    <NestedCTA
      href="#platforms"
      variant="brand"
      icon={<BracketArrow size={13} strokeWidth={1.75} />}
    >
      Pick your install path
    </NestedCTA>
  );
}

// ─── PhoneMockup ───────────────────────────────────────────────────────────
// CSS-only phone bezel + faux "FISC home" preview inside. Sits upright, dead
// centre, grounded only by a floor shadow tinted to the surface hue.
// (Earlier iterations had a white "ghost backdrop card" behind the phone, but
// it read as a literal white background plate attached to the device — exactly
// the wrong reading. Removed in favour of the cleaner floating-on-shelf look.)

function PhoneMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="relative will-change-transform"
    >
      {/* Ambient glow — softer, cooler bloom that ties the phone into the
          page's brand-orange accent system without flooding the surface. */}
      <div
        className="absolute -inset-10 pointer-events-none blur-3xl opacity-40"
        style={{
          background: `radial-gradient(circle at 50% 45%, ${BRAND}28 0%, transparent 55%)`,
        }}
        aria-hidden="true"
      />

      {/* Phone shell — outer aluminium ring (Double-Bezel outer shell). Sits
          dead upright. */}
      <div
        className="relative w-[260px] sm:w-[280px] aspect-[9/19.5] rounded-[2.6rem] p-[5px]"
        style={{
          background:
            "linear-gradient(160deg, #2a2a2d 0%, #16161a 45%, #07070a 100%)",
          boxShadow:
            "0 0 0 1px rgba(255,255,255,0.06), 0 30px 70px -20px rgba(0,0,0,0.75), 0 8px 24px -8px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,0.08)",
        }}
      >
        {/* Inner screen — sits in the bezel like a glass plate in a tray.
            Cool neutral charcoal, no warm wash. */}
        <div
          className="relative h-full w-full rounded-[2.3rem] overflow-hidden flex flex-col"
          style={{
            background: "linear-gradient(180deg, #131316 0%, #1a1a1e 60%, #1f1f24 100%)",
          }}
        >
          {/* Dynamic island */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-5 rounded-full bg-black z-10" />

          {/* Status bar */}
          <div className="relative z-10 flex items-center justify-between px-6 pt-3 text-white/80 text-[10px] tracking-tight font-medium">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-2 rounded-[1px] bg-white/80" />
              <div className="w-3 h-2 rounded-[1px] bg-white/80" />
              <div className="w-4 h-2 rounded-[1px] bg-white/80 relative">
                <div className="absolute -right-0.5 top-0.5 w-0.5 h-1 bg-white/80 rounded-r-sm" />
              </div>
            </div>
          </div>

          {/* App content */}
          <div className="relative z-0 flex-1 px-4 pt-7 pb-3 flex flex-col">
            {/* Brand pill */}
            <div className="inline-flex items-center gap-1.5 self-start px-2 py-0.5 rounded-full bg-white/[0.08] ring-1 ring-white/12 text-white/80 text-[7.5px] uppercase tracking-[0.22em]">
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: BRAND }}
              />
              FISC 2026
            </div>

            {/* Greeting */}
            <h4
              className="mt-3 text-white tracking-tight"
              style={{ fontSize: "1.05rem", lineHeight: 1.1, fontWeight: 600 }}
            >
              Day 1 · <span className="text-white/55">Mon Jun 29</span>
            </h4>
            <p
              className="mt-1 text-white/55"
              style={{ fontSize: "8.5px", lineHeight: 1.45 }}
            >
              Three sessions left today
            </p>

            {/* Session previews */}
            <div className="mt-4 flex flex-col gap-2">
              <MiniSession time="10:30" title="Opening Plenary" tag="Plenary" />
              <MiniSession time="14:00" title="PFM in the Caribbean" tag="Panel" featured />
              <MiniSession time="16:30" title="Reform Roundtable" tag="Closed" />
            </div>

            {/* Notification banner — ties to "Push for room changes" feature */}
            <div className="mt-auto mb-2 flex items-center gap-2 px-2 py-1.5 rounded-[6px] bg-white/[0.06] ring-1 ring-white/10">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${BRAND}30`, color: BRAND_SOFT }}
              >
                <Bell size={10} strokeWidth={2} />
              </span>
              <div className="flex-1 min-w-0">
                <div className="text-white/85 text-[8px] tracking-tight" style={{ fontWeight: 500 }}>
                  Room change · 14:00 panel
                </div>
                <div className="text-white/45 text-[7px]">Now in Salon Tobago, 4th floor</div>
              </div>
            </div>

            {/* Bottom dock */}
            <div className="flex items-center justify-around pt-2 border-t border-white/[0.06]">
              <DockGlyph active />
              <DockGlyph />
              <DockGlyph />
              <DockGlyph />
            </div>
          </div>

          {/* Screen glare — diagonal sheen for the "glass" feel */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-25"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 30%, transparent 70%, rgba(255,255,255,0.06) 100%)",
            }}
            aria-hidden="true"
          />
        </div>
      </div>

      {/* Floor shadow — a softly diffused ellipse beneath the phone gives it
          physical grounding, like a device standing on a shelf. Sits behind
          the platform badge in the z-stack. */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
        style={{
          bottom: -28,
          width: "70%",
          height: "32px",
          background:
            "radial-gradient(ellipse at center, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.08) 50%, transparent 75%)",
          filter: "blur(10px)",
        }}
      />

      {/* Floating Apple/Android badge below — reinforces that the same app
          works on both platforms. Styled for the light gray surface. */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="absolute -bottom-5 left-1/2 -translate-x-1/2 inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white ring-1 ring-black/[0.06] text-neutral-800 text-[11px] shadow-[0_8px_22px_-12px_rgba(0,0,0,0.25)]"
        style={{ fontWeight: 500 }}
      >
        <AppleMark size={12} />
        iOS
        <span className="w-px h-2.5 bg-black/15 mx-0.5" />
        <AndroidMark size={12} />
        Android
        <span className="w-px h-2.5 bg-black/15 mx-0.5" />
        <Monitor size={12} strokeWidth={1.75} />
        Desktop
      </motion.div>
    </motion.div>
  );
}

function MiniSession({
  time,
  title,
  tag,
  featured = false,
}: {
  time: string;
  title: string;
  tag: string;
  featured?: boolean;
}) {
  return (
    <div
      className={`flex items-start gap-2 px-2.5 py-2 rounded-[8px] ${
        featured
          ? "ring-1 ring-white/15"
          : "ring-1 ring-white/[0.07]"
      }`}
      style={{
        background: featured
          ? `linear-gradient(135deg, ${BRAND}22 0%, transparent 80%)`
          : "rgba(255,255,255,0.025)",
      }}
    >
      <div className="text-white/65 text-[8.5px] tracking-tight font-medium shrink-0 w-7 pt-0.5">
        {time}
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-white/95 truncate"
          style={{ fontSize: "8.5px", lineHeight: 1.25, fontWeight: 500 }}
        >
          {title}
        </div>
        <div
          className="text-white/45 mt-0.5 inline-block px-1 py-px rounded-[3px] bg-white/[0.06]"
          style={{ fontSize: "6.5px", textTransform: "uppercase", letterSpacing: "0.1em" }}
        >
          {tag}
        </div>
      </div>
    </div>
  );
}

function DockGlyph({ active = false }: { active?: boolean }) {
  return (
    <div
      className="w-7 h-7 rounded-md flex items-center justify-center"
      style={{
        backgroundColor: active ? `${BRAND}33` : "transparent",
      }}
    >
      <div
        className="w-3 h-3 rounded-[3px]"
        style={{ backgroundColor: active ? BRAND : "rgba(255,255,255,0.25)" }}
      />
    </div>
  );
}

// ─── PlatformGrid ──────────────────────────────────────────────────────────
// The "three paths to home screen" — iOS / Android / Desktop. Each card uses
// the Double-Bezel nested architecture (outer cream shell + inner white core)
// with a brand glyph at top, headline, two-step walkthrough, and the right
// card auto-highlights when the visitor's UA matches.

function PlatformGrid({ state }: { state: InstallState }) {
  const cards: PlatformCard[] = [
    {
      id: "ios",
      brand: "Apple",
      icon: <AppleMark size={30} />,
      eyebrow: "iPhone / iPad",
      title: "Safari on iOS",
      desc: "Apple doesn't expose a one-tap install — the share menu does it instead.",
      steps: [
        {
          icon: <Share size={18} strokeWidth={1.5} />,
          title: "Tap the Share button",
          body: "Bottom of Safari on iPhone, top-right on iPad — the square with the upward arrow.",
        },
        {
          icon: <Plus size={18} strokeWidth={1.5} />,
          title: '"Add to Home Screen"',
          body: "Scroll the share sheet until you see it. Tap Add and the portal lands on your home screen.",
        },
      ],
      footnote: "Must be Safari — Chrome and Firefox on iOS can't add to the home screen.",
      isRecommended: state.isIOS,
    },
    {
      id: "android",
      brand: "Android",
      icon: <AndroidMark size={30} />,
      eyebrow: "Android",
      title: "Chrome on Android",
      desc: "The cleanest path — Chrome detects the portal and offers a one-tap install.",
      steps: [
        {
          icon: <Smartphone size={18} strokeWidth={1.5} />,
          title: "Tap Install when prompted",
          body: "Chrome surfaces an Install banner the first time you scroll. Or open the ⋮ menu and pick Install app.",
        },
        {
          icon: <Plus size={18} strokeWidth={1.5} />,
          title: "Confirm Add to Home screen",
          body: "Android adds the icon to your home screen or app drawer, depending on your launcher.",
        },
      ],
      footnote: "Samsung Internet and Edge for Android work the same way through their menus.",
      isRecommended: state.canInstall && !state.isIOS,
    },
    {
      id: "desktop",
      brand: "Desktop",
      icon: <Monitor size={28} strokeWidth={1.5} />,
      eyebrow: "Mac / Windows / Linux",
      title: "Chrome or Edge on desktop",
      desc: "Optional but handy — turns the portal into a windowed app on your dock.",
      steps: [
        {
          icon: <Monitor size={18} strokeWidth={1.5} />,
          title: "Click the install icon",
          body: "Right edge of the address bar — a small monitor-with-arrow glyph appears once the page loads.",
        },
        {
          icon: <CheckCircle size={18} strokeWidth={1.5} />,
          title: "Confirm Install",
          body: "Chrome / Edge launches the portal in its own window and adds a shortcut to your dock or Start menu.",
        },
      ],
      footnote: "Safari on macOS doesn't currently support web app install — use Chrome or Edge.",
      isRecommended: false,
    },
  ];

  return (
    <section id="platforms" className="relative py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12 md:mb-16">
          <div className="lg:col-span-6">
            <SectionLabel>Three paths to home screen</SectionLabel>
            <h2
              className="tracking-[-0.02em] text-neutral-950"
              style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.75rem)", lineHeight: 1.05 }}
            >
              Choose your platform.
            </h2>
          </div>
          <div className="lg:col-span-6 text-neutral-700" style={{ lineHeight: 1.65 }}>
            <p>
              Same portal, three install flows — the right one for the browser you're holding.
              We've highlighted the card that matches this device.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {cards.map((c, i) => (
            <PlatformCardView key={c.id} card={c} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

type PlatformCard = {
  id: string;
  brand: string;
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  desc: string;
  steps: { icon: React.ReactNode; title: string; body: string }[];
  footnote: string;
  isRecommended: boolean;
};

function PlatformCardView({ card, index }: { card: PlatformCard; index: number }) {
  return (
    <motion.div
      id={card.id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-[1.5rem] p-1.5 transition-fluid will-change-transform hover:-translate-y-1 ${
        card.isRecommended
          ? "shadow-[0_24px_60px_-30px_rgba(253,107,24,0.45)]"
          : "shadow-[0_18px_50px_-30px_rgba(0,0,0,0.18)] hover:shadow-[0_28px_60px_-30px_rgba(0,0,0,0.22)]"
      }`}
      style={{
        background: card.isRecommended
          ? `linear-gradient(135deg, ${BRAND}22 0%, ${BRAND}06 50%, rgba(0,0,0,0.025) 100%)`
          : "rgba(0,0,0,0.035)",
      }}
    >
      {/* Recommended badge — floats over the top-right corner of the outer shell */}
      {card.isRecommended && (
        <div
          className="absolute -top-2.5 right-4 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-white text-[10px] uppercase tracking-[0.18em]"
          style={{ backgroundColor: BRAND, fontWeight: 500 }}
        >
          <Sparkles size={10} strokeWidth={2} />
          For this device
        </div>
      )}

      {/* Inner core — mathematically smaller radius for concentric curves */}
      <div
        className="relative rounded-[calc(1.5rem-0.375rem)] bg-white p-7 md:p-8 ring-1 ring-black/[0.05] h-full"
        style={{
          boxShadow: "inset 0 1px 1px rgba(255,255,255,0.6), inset 0 -1px 0 rgba(0,0,0,0.02)",
        }}
      >
        {/* Brand glyph — large polished black well so the Apple and Android
            marks read with the authority they need. White icon over near-black
            charcoal mirrors how each company actually presents its mark. */}
        <div
          className="w-16 h-16 rounded-[18px] flex items-center justify-center text-white transition-fluid group-hover:scale-105"
          style={{
            background:
              "linear-gradient(135deg, #1c1c1f 0%, #0a0a0c 100%)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.4), 0 8px 22px -10px rgba(0,0,0,0.35), 0 1px 0 rgba(255,255,255,0.6)",
          }}
        >
          {card.icon}
        </div>

        {/* Eyebrow */}
        <div
          className="mt-6 text-[10.5px] uppercase tracking-[0.22em] text-neutral-500"
          style={{ fontWeight: 500 }}
        >
          {card.eyebrow}
        </div>

        {/* Title */}
        <h3
          className="mt-1.5 tracking-tight text-neutral-950"
          style={{ fontSize: "1.375rem", lineHeight: 1.2, fontWeight: 500 }}
        >
          {card.title}
        </h3>

        {/* Description */}
        <p
          className="mt-2.5 text-neutral-600 text-[14.5px]"
          style={{ lineHeight: 1.55 }}
        >
          {card.desc}
        </p>

        {/* Step list */}
        <ol className="mt-6 space-y-4 border-t border-black/[0.06] pt-5">
          {card.steps.map((s, i) => (
            <li key={i} className="flex gap-3.5">
              <div className="shrink-0 flex flex-col items-center">
                <div
                  className="w-9 h-9 rounded-[10px] flex items-center justify-center text-neutral-700 transition-fluid group-hover:text-neutral-950"
                  style={{
                    background: "linear-gradient(135deg, #f6f7f9 0%, #eaecef 100%)",
                  }}
                >
                  {s.icon}
                </div>
                {i < card.steps.length - 1 && (
                  <div className="w-px h-4 bg-black/[0.08] mt-1.5" aria-hidden="true" />
                )}
              </div>
              <div className="pt-1 min-w-0">
                <div
                  className="text-[9.5px] uppercase tracking-[0.22em] text-neutral-400"
                  style={{ fontWeight: 500 }}
                >
                  Step {i + 1}
                </div>
                <div
                  className="mt-1 text-neutral-950 tracking-tight"
                  style={{ fontSize: "0.95rem", lineHeight: 1.3, fontWeight: 500 }}
                >
                  {s.title}
                </div>
                <p className="mt-1 text-neutral-600 text-[13.5px]" style={{ lineHeight: 1.5 }}>
                  {s.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        {/* Footnote */}
        <p className="mt-5 pt-4 border-t border-black/[0.05] text-neutral-500 text-[12.5px]" style={{ lineHeight: 1.5 }}>
          {card.footnote}
        </p>
      </div>
    </motion.div>
  );
}

// ─── FeaturesStrip ─────────────────────────────────────────────────────────
// Three reasons to install. Cards lift on hover; the icon well shifts to
// brand orange on lift to add internal kinetic tension.

function FeaturesStrip() {
  const items = [
    {
      icon: <WifiOff size={22} strokeWidth={1.5} />,
      title: "Reads when Wi-Fi doesn't",
      body: "Your schedule, sessions and the delegate guide stay readable when the venue Wi-Fi gets crowded — the app caches pages you've visited.",
    },
    {
      icon: <Smartphone size={22} strokeWidth={1.5} />,
      title: "Opens like an app",
      body: "Launches from your home screen with no browser chrome — full-bleed, faster, and dedicated to the conference for the four days.",
    },
    {
      icon: <Bell size={22} strokeWidth={1.5} />,
      title: "Push for room changes",
      body: "Opt in once and the portal pings you for last-minute room changes, speaker swaps, and post-session materials drops.",
    },
  ];
  return (
    <section
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: "#f3f4f6" }}
    >
      {/* Soft tonal wash — single restrained orange whisper at the top-right
          corner so the band has accent without flooding warm. */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 95% -10%, ${BRAND}08 0%, transparent 38%), radial-gradient(ellipse at 0% 110%, rgba(0,0,0,0.025) 0%, transparent 40%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-12 md:mb-16">
          <div className="lg:col-span-6">
            <SectionLabel>What you get</SectionLabel>
            <h2
              className="tracking-[-0.02em] text-neutral-950"
              style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.75rem)", lineHeight: 1.05 }}
            >
              Three reasons to install.
            </h2>
          </div>
          <div
            className="lg:col-span-6 text-neutral-700"
            style={{ lineHeight: 1.65 }}
          >
            <p>
              Installing makes the portal feel less like a website and more like a tool for the
              week. Same content, faster paths, better at hand.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-5 md:gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-[1.25rem] p-1.5 transition-fluid will-change-transform hover:-translate-y-1"
              style={{ background: "rgba(0,0,0,0.04)" }}
            >
              <div
                className="rounded-[calc(1.25rem-0.375rem)] bg-white p-7 ring-1 ring-black/[0.04] h-full transition-fluid"
                style={{
                  boxShadow:
                    "inset 0 1px 1px rgba(255,255,255,0.7), 0 12px 30px -20px rgba(0,0,0,0.12)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-[12px] flex items-center justify-center transition-fluid group-hover:scale-110"
                  style={{
                    background: `linear-gradient(135deg, ${BRAND}1c 0%, ${BRAND}08 100%)`,
                    color: BRAND,
                  }}
                >
                  {it.icon}
                </div>
                <h3
                  className="mt-5 tracking-tight text-neutral-950"
                  style={{ fontSize: "1.1875rem", lineHeight: 1.3, fontWeight: 500 }}
                >
                  {it.title}
                </h3>
                <p
                  className="mt-2.5 text-neutral-600 text-[14.5px]"
                  style={{ lineHeight: 1.6 }}
                >
                  {it.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Faq ───────────────────────────────────────────────────────────────────
// Expanding accordion — Plus glyph rotates 45° to form an X on open, with a
// smooth height animation via framer's AnimatePresence.

function Faq() {
  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "How much storage does it use?",
      a: "A few megabytes. The portal caches text and small images on demand — not the full media library, and not videos.",
    },
    {
      q: "Can I remove it?",
      a: "Yes. Long-press the icon on your home screen and tap Remove (mobile), or right-click and Uninstall in desktop Chrome / Edge. No leftovers.",
    },
    {
      q: "Does it work without internet?",
      a: "Pages you've already visited stay readable. New content — like a fresh agenda update — needs a connection, then caches automatically.",
    },
    {
      q: "Does it collect more data than the website?",
      a: "No. It's the same portal in a leaner wrapper — same login, same data, no extra tracking. The cache lives on your device, not on our servers.",
    },
    {
      q: "What if my browser doesn't show the install option?",
      a: (
        <>
          Make sure you're on a supported browser — Safari on iOS, Chrome / Edge / Samsung Internet
          on Android, Chrome or Edge on desktop. Firefox doesn't currently expose install for web
          apps. If you're still stuck, the platform cards above walk through each path.
        </>
      ),
    },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <SectionLabel>Common questions</SectionLabel>
            <h2
              className="tracking-[-0.02em] text-neutral-950"
              style={{ fontSize: "clamp(1.875rem, 3.8vw, 2.75rem)", lineHeight: 1.05 }}
            >
              Quick answers.
            </h2>
            <p className="mt-5 text-neutral-600 max-w-md" style={{ lineHeight: 1.65 }}>
              Five of the questions the team gets most often. Anything else, the delegate desk in
              the Hyatt lobby on Day 1 will sort.
            </p>
          </div>
          <div className="lg:col-span-7">
            <ul className="divide-y divide-black/[0.06]">
              {items.map((it, i) => {
                const isOpen = open === i;
                return (
                  <li key={it.q} className="py-1">
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : i)}
                      className="group w-full flex items-start gap-5 py-5 text-left transition-fluid"
                      aria-expanded={isOpen}
                    >
                      <span
                        className="flex-1 tracking-tight text-neutral-950"
                        style={{ fontSize: "1.0625rem", lineHeight: 1.4, fontWeight: 500 }}
                      >
                        {it.q}
                      </span>
                      <span
                        className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-fluid ${
                          isOpen
                            ? "bg-neutral-950 text-white"
                            : "bg-neutral-100 text-neutral-700 group-hover:bg-neutral-200"
                        }`}
                      >
                        <motion.span
                          animate={{ rotate: isOpen ? 45 : 0 }}
                          transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
                          className="inline-flex"
                        >
                          <Plus size={16} strokeWidth={1.75} />
                        </motion.span>
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div
                            className="pb-6 pr-14 text-neutral-700"
                            style={{ lineHeight: 1.7, fontSize: "0.9375rem" }}
                          >
                            {it.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ClosingCTA ────────────────────────────────────────────────────────────
// Final reinforcement band — same light gray as the hero showcase so the page
// has only one dark moment (the PageHero at the top) before handing off to the
// Footer's dark band. The smart CTA appears again so install is reachable
// without scrolling back to the top.

function ClosingCTA({ state }: { state: InstallState }) {
  const status = resolveStatus(state);
  return (
    <section className="relative overflow-hidden py-20 md:py-28" style={{ backgroundColor: SHOWCASE_BG }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 110%, ${BRAND}14 0%, transparent 55%), radial-gradient(ellipse at 50% 0%, rgba(255,255,255,0.6) 0%, transparent 45%)`,
        }}
        aria-hidden="true"
      />
      <div className="relative max-w-5xl mx-auto px-5 md:px-6 text-center">
        <StatusPill tone={status.tone} surface="light">{status.label}</StatusPill>
        <h2
          className="mt-6 tracking-[-0.02em] mx-auto max-w-3xl"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.25rem)",
            lineHeight: 1.02,
            color: SHOWCASE_FG,
          }}
        >
          Ready when you are.
        </h2>
        <p className="mt-5 text-neutral-600 mx-auto max-w-xl" style={{ lineHeight: 1.65 }}>
          Drop the portal on your home screen now and it'll be a tap away for every session in
          Port of Spain.
        </p>
        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <SmartInstallCTA state={state} />
          <a
            href="#platforms"
            className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-sm ring-1 ring-black/15 text-neutral-700 hover:text-neutral-950 hover:ring-black/30 transition-fluid text-[15px]"
            style={{ fontWeight: 500 }}
          >
            See all platforms
            <span className="inline-flex transition-fluid group-hover:translate-x-[1.5px]">
              <BracketArrow size={12} strokeWidth={1.75} />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
