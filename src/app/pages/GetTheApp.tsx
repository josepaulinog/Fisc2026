import { useState } from "react";
import { motion } from "motion/react";
import {
  Bell,
  CheckCircle,
  Plus,
  Share,
  Smartphone,
  WifiOff,
} from "lucide-react";
import { PageHero, SectionLabel } from "../components/shared";
import { NestedCTA } from "../components/ui/NestedCTA";
import { BracketArrow } from "../components/ui/BracketArrow";
import { BRAND, BRAND_SOFT, INK } from "../data";
import { useInstallPrompt, type InstallState } from "../installPrompt";

/**
 * /get-the-app — installable-PWA landing page.
 *
 * Public on purpose (not gated): delegates should be able to install before
 * signing in. The install panel auto-detects what the browser supports and
 * renders the right state — installed, one-tap install, iOS Safari walkthrough,
 * or a fallback for desktop browsers that don't expose beforeinstallprompt.
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
        title={<>Install the delegate portal.</>}
        subtitle="Your schedule, sessions, and delegate guide — saved to your home screen, ready offline, and a tap away during the four days in Port of Spain."
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <InstallPanel state={install} />
        </div>
      </section>

      <FeaturesStrip />
      <Faq />
    </>
  );
}

function InstallPanel({ state }: { state: InstallState }) {
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<"accepted" | "dismissed" | null>(null);

  // 1. Already installed (or running standalone) — confirmation state.
  if (state.isInstalled) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl ring-1 ring-emerald-200/70 bg-emerald-50/60 p-7 md:p-10 flex flex-col md:flex-row md:items-center gap-5"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-700 shrink-0">
          <CheckCircle size={26} strokeWidth={1.75} />
        </div>
        <div>
          <h2
            className="tracking-[-0.02em] text-neutral-950"
            style={{ fontSize: "clamp(1.375rem, 2.5vw, 1.75rem)", lineHeight: 1.1 }}
          >
            You&rsquo;re all set.
          </h2>
          <p className="mt-2 text-neutral-700" style={{ lineHeight: 1.6 }}>
            The delegate portal is installed on this device. Launch it from your home
            screen any time — it&rsquo;ll keep working when the venue Wi-Fi doesn&rsquo;t.
          </p>
        </div>
      </motion.div>
    );
  }

  // 2. iOS Safari — beforeinstallprompt isn't supported. Walk them through Share → Add to Home Screen.
  if (state.isIOS) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="rounded-2xl bg-neutral-50 ring-1 ring-black/[0.06] p-7 md:p-10"
      >
        <SectionLabel>Install on iPhone or iPad</SectionLabel>
        <h2
          className="tracking-[-0.02em] text-neutral-950 max-w-2xl"
          style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}
        >
          Two taps in Safari.
        </h2>
        <p
          className="mt-3 text-neutral-700 max-w-2xl"
          style={{ lineHeight: 1.65 }}
        >
          Apple doesn&rsquo;t expose a one-tap install on iOS, but the portal still adds
          to your home screen through Safari&rsquo;s share menu.
        </p>
        <ol className="mt-7 grid gap-4 sm:grid-cols-2 max-w-3xl">
          <Step
            n={1}
            icon={<Share size={22} strokeWidth={1.5} />}
            title="Tap the Share button"
            body={<>At the bottom of Safari on iPhone, or top-right on iPad — the square with the upward arrow.</>}
          />
          <Step
            n={2}
            icon={<Plus size={22} strokeWidth={1.5} />}
            title={'"Add to Home Screen"'}
            body={<>Scroll the share sheet until you see it. Tap <strong>Add</strong> — the portal lands on your home screen as a regular app icon.</>}
          />
        </ol>
        <p className="mt-6 text-neutral-500 text-sm">
          Make sure you&rsquo;re using Safari (not Chrome or Firefox) on iOS — only Safari
          can add to the home screen.
        </p>
      </motion.div>
    );
  }

  // 3. Chromium / Android Chrome with a captured prompt — one-tap install.
  if (state.canInstall) {
    const trigger = async () => {
      setBusy(true);
      const choice = await state.install();
      setOutcome(choice);
      setBusy(false);
    };
    return (
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-2xl overflow-hidden text-white p-8 md:p-12"
        style={{ backgroundColor: INK }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 85% 15%, ${BRAND}30, transparent 55%)` }}
          aria-hidden="true"
        />
        <div className="relative grid md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <SectionLabel tone="light">One tap to install</SectionLabel>
            <h2
              className="tracking-[-0.02em]"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}
            >
              Add the portal to this device.
            </h2>
            <p className="mt-3 text-white/75 max-w-md" style={{ lineHeight: 1.6 }}>
              Your browser supports direct install — tap the button and the portal
              lands on your home screen or app drawer.
            </p>
          </div>
          <div className="md:col-span-5 md:justify-self-end">
            <NestedCTA
              onClick={trigger}
              variant="brand"
              icon={<BracketArrow size={13} strokeWidth={1.75} />}
              className={busy ? "opacity-70 pointer-events-none" : ""}
            >
              {busy ? "Installing…" : outcome === "dismissed" ? "Try again" : "Install the app"}
            </NestedCTA>
          </div>
        </div>
        {outcome === "dismissed" && (
          <p className="relative mt-5 text-sm text-white/60">
            You dismissed the prompt. Tap &ldquo;Try again&rdquo; if you change your
            mind — or install later from your browser&rsquo;s menu.
          </p>
        )}
      </motion.div>
    );
  }

  // 4. Fallback — desktop Firefox/Safari, or the install event hasn't fired yet.
  // Be honest about it instead of showing a button that doesn't do anything.
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-2xl bg-neutral-50 ring-1 ring-black/[0.06] p-7 md:p-10"
    >
      <SectionLabel>Install from your phone</SectionLabel>
      <h2
        className="tracking-[-0.02em] text-neutral-950 max-w-2xl"
        style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", lineHeight: 1.1 }}
      >
        Open this page on your device.
      </h2>
      <p
        className="mt-3 text-neutral-700 max-w-2xl"
        style={{ lineHeight: 1.65 }}
      >
        The portal installs best from a mobile browser. Open this page in{" "}
        <strong>Chrome on Android</strong> or <strong>Safari on iPhone</strong>, then
        look for &ldquo;Install app&rdquo; or &ldquo;Add to Home Screen&rdquo; in the
        browser menu.
      </p>
      <p className="mt-4 text-neutral-500 text-sm">
        On desktop Chrome or Edge, an install icon appears at the right edge of the
        address bar — that works too.
      </p>
    </motion.div>
  );
}

function Step({
  n,
  icon,
  title,
  body,
}: {
  n: number;
  icon: React.ReactNode;
  title: React.ReactNode;
  body: React.ReactNode;
}) {
  return (
    <li className="rounded-md bg-white ring-1 ring-black/[0.06] p-5 md:p-6 flex gap-4">
      <div className="shrink-0 w-10 h-10 rounded-md flex items-center justify-center text-neutral-700 bg-neutral-100">
        {icon}
      </div>
      <div>
        <div
          className="text-[10.5px] tracking-[0.22em] uppercase text-neutral-500"
          style={{ fontWeight: 500 }}
        >
          Step {n}
        </div>
        <h3
          className="mt-1 tracking-tight text-neutral-950"
          style={{ fontSize: "1.0625rem", lineHeight: 1.3 }}
        >
          {title}
        </h3>
        <p
          className="mt-1.5 text-neutral-700 text-sm"
          style={{ lineHeight: 1.55 }}
        >
          {body}
        </p>
      </div>
    </li>
  );
}

function FeaturesStrip() {
  const items = [
    {
      icon: <WifiOff size={20} strokeWidth={1.5} />,
      title: "Reads when Wi-Fi doesn’t",
      body: "Your schedule, sessions and the delegate guide stay readable when the venue Wi-Fi gets crowded — the app saves pages you’ve visited.",
    },
    {
      icon: <Smartphone size={20} strokeWidth={1.5} />,
      title: "Opens like an app",
      body: "Launches from your home screen with no browser chrome — full-bleed, faster, and dedicated to the conference for the four days.",
    },
    {
      icon: <Bell size={20} strokeWidth={1.5} />,
      title: "Push for room changes",
      body: "Opt in once and the portal can ping you for last-minute room changes, speaker swaps, and post-session materials drops.",
    },
  ];
  return (
    <section className="py-12 md:py-20" style={{ backgroundColor: "#ededed" }}>
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10 items-end mb-10 md:mb-14">
          <div className="lg:col-span-5">
            <SectionLabel>What you get</SectionLabel>
            <h2
              className="tracking-[-0.02em] text-neutral-950"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}
            >
              Three reasons to install.
            </h2>
          </div>
          <div
            className="lg:col-span-7 text-neutral-700"
            style={{ lineHeight: 1.65 }}
          >
            <p>
              Installing makes the portal feel less like a website and more like a tool
              for the week. Same content, better at hand.
            </p>
          </div>
        </div>
        <div className="grid sm:grid-cols-3 gap-4 md:gap-5">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="rounded-md bg-white ring-1 ring-black/[0.06] p-6"
            >
              <div
                className="w-11 h-11 rounded-sm flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${BRAND_SOFT}33`, color: BRAND }}
              >
                {it.icon}
              </div>
              <h3
                className="mt-4 tracking-tight text-neutral-950"
                style={{ fontSize: "1.125rem", lineHeight: 1.3 }}
              >
                {it.title}
              </h3>
              <p
                className="mt-2 text-neutral-700 text-sm"
                style={{ lineHeight: 1.6 }}
              >
                {it.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const items: { q: string; a: React.ReactNode }[] = [
    {
      q: "How much storage does it use?",
      a: "A few megabytes. The portal caches text and small images on demand — not the full media library.",
    },
    {
      q: "Can I remove it?",
      a: "Yes. Long-press the icon on your home screen and tap Remove (mobile), or right-click and Uninstall (desktop Chrome/Edge).",
    },
    {
      q: "Does it work without internet?",
      a: "Pages you’ve already visited stay readable. New content — like a fresh agenda update — needs a connection.",
    },
    {
      q: "Does it collect more data than the website?",
      a: "No. It’s the same portal in a leaner wrapper — same login, same data, no extra tracking.",
    },
  ];
  return (
    <section className="py-14 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <SectionLabel>Common questions</SectionLabel>
            <h2
              className="tracking-[-0.02em] text-neutral-950"
              style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}
            >
              Quick answers.
            </h2>
          </div>
          <div className="lg:col-span-7">
            <dl className="divide-y divide-black/[0.06]">
              {items.map((it) => (
                <div key={it.q} className="py-5 first:pt-0 last:pb-0">
                  <dt
                    className="tracking-tight text-neutral-950"
                    style={{ fontSize: "1.0625rem", lineHeight: 1.35, fontWeight: 500 }}
                  >
                    {it.q}
                  </dt>
                  <dd
                    className="mt-2 text-neutral-700"
                    style={{ lineHeight: 1.65 }}
                  >
                    {it.a}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
