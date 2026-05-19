import { useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Grain } from "../components/shared";
import { BRAND, FB_LOGO, INK } from "../data";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");

  return (
    <section className="relative min-h-screen flex items-stretch pt-20 md:pt-24" style={{ backgroundColor: INK }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 90% 0%, ${BRAND}55 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #00000099 0%, transparent 60%)` }} />
      <Grain />

      <div className="relative w-full grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-12 text-white">
          <Link to="/">
            <ImageWithFallback src={FB_LOGO} alt="FISC 2026" className="h-12 w-auto bg-white rounded-xl p-2" />
          </Link>
          <div>
            <div className="tracking-[0.25em] text-white/60 text-xs mb-4">FISC · 2026 · TRINIDAD & TOBAGO</div>
            <h1 className="tracking-[-0.03em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
              Welcome,<br />
              <span className="italic" style={{ color: BRAND }}>delegate.</span>
            </h1>
            <p className="mt-6 max-w-md text-white/70" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
              Sign in to access the programme, your personalised schedule,
              session materials and travel details.
            </p>
          </div>
          <div className="text-white/50 text-sm">
            Invitation only · Hosted by FreeBalance & the Government of Trinidad and Tobago
          </div>
        </div>

        <div className="relative flex items-center justify-center p-6 md:p-12 bg-white lg:rounded-l-[2.5rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="lg:hidden mb-8">
              <ImageWithFallback src={FB_LOGO} alt="FISC 2026" className="h-10 w-auto" />
            </div>
            <div className="tracking-[0.25em] text-neutral-500 text-xs">DELEGATE PORTAL</div>
            <h2 className="mt-3 tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.05 }}>
              Sign in to your invitation.
            </h2>
            <p className="mt-3 text-neutral-600">
              Use the email address your invitation was sent to, plus the
              access code from the confirmation message.
            </p>

            <form className="mt-8 space-y-4" onSubmit={(e) => e.preventDefault()}>
              <label className="block">
                <span className="text-sm text-neutral-700">Invited email</span>
                <div className="mt-2 flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 focus-within:border-neutral-950 transition">
                  <Mail size={18} className="text-neutral-400 shrink-0" />
                  <input
                    type="email"
                    autoComplete="email"
                    placeholder="you@ministry.gov"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
              </label>

              <label className="block">
                <span className="text-sm text-neutral-700">Access code</span>
                <div className="mt-2 flex items-center bg-neutral-50 border border-neutral-200 rounded-xl px-4 focus-within:border-neutral-950 transition">
                  <Lock size={18} className="text-neutral-400 shrink-0" />
                  <input
                    type="password"
                    autoComplete="one-time-code"
                    placeholder="6-digit code"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 tracking-[0.3em]"
                  />
                </div>
              </label>

              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="checkbox" className="accent-neutral-950 w-4 h-4" />
                Keep me signed in on this device
              </label>

              <button
                type="submit"
                style={{ backgroundColor: INK }}
                className="group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-xl hover:opacity-90 transition"
              >
                Sign in
                <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND }}>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
              <a href="#" className="text-neutral-600 hover:text-neutral-950">Lost your access code?</a>
              <Link to="/" className="text-neutral-500 hover:text-neutral-950">← Back to home</Link>
            </div>

            <div className="mt-10 p-4 rounded-xl bg-neutral-50 border border-neutral-200 text-sm text-neutral-600">
              FISC 2026 is invitation only. If you believe you should have
              access, contact your country's delegation lead or{" "}
              <a href="mailto:fisc@freebalance.com" className="text-neutral-950 underline">fisc@freebalance.com</a>.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
