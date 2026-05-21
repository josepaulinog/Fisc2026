import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Lock,
  Mail,
  X,
} from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Lockup } from "../components/brand/Lockup";
import { GradientText, Grain } from "../components/shared";
import { BRAND, HERO_SIGNIN, INK } from "../data";
import { looksLikeEmail, useAuth } from "../auth";

type SignInErrors = {
  email?: string;
  code?: string;
  form?: string;
};

type LostErrors = {
  email?: string;
};

export default function SignIn() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get("return") || "/";
  const { isAuthed, signIn } = useAuth();

  // Sign-in form state
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [errors, setErrors] = useState<SignInErrors>({});
  const [submitting, setSubmitting] = useState(false);

  // Lost-code modal state
  const [lostOpen, setLostOpen] = useState(false);
  const [lostSent, setLostSent] = useState(false);
  const [lostEmail, setLostEmail] = useState("");
  const [lostErrors, setLostErrors] = useState<LostErrors>({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, []);

  // If already signed in, bounce them to the return URL.
  useEffect(() => {
    if (isAuthed) navigate(returnTo, { replace: true });
  }, [isAuthed, navigate, returnTo]);

  // Esc + scroll lock for the modal.
  useEffect(() => {
    if (!lostOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLostOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [lostOpen]);

  const closeLostModal = () => {
    setLostOpen(false);
    window.setTimeout(() => {
      setLostSent(false);
      setLostErrors({});
      setLostEmail("");
    }, 250);
  };

  const validateSignIn = (): SignInErrors => {
    const next: SignInErrors = {};
    if (!email.trim()) {
      next.email = "Email is required.";
    }
    if (!code.trim()) {
      next.code = "Access code is required.";
    } else if (code.length < 4) {
      next.code = "Access code is too short.";
    }
    return next;
  };

  const handleSignIn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validateSignIn();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    setSubmitting(true);
    // Tiny delay so the loading state is visible — feels less abrupt.
    window.setTimeout(() => {
      const result = signIn(email, code);
      if (result.ok) {
        navigate(returnTo, { replace: true });
      } else {
        setErrors({ form: result.error });
        setSubmitting(false);
      }
    }, 350);
  };

  const handleLostSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const next: LostErrors = {};
    if (!lostEmail.trim()) {
      next.email = "Email is required.";
    } else if (!looksLikeEmail(lostEmail)) {
      next.email = "Enter a valid email address.";
    }
    if (Object.keys(next).length > 0) {
      setLostErrors(next);
      return;
    }
    setLostErrors({});
    setLostSent(true);
  };

  const fieldBorder = (hasError: boolean) =>
    hasError
      ? "border-red-300 focus-within:border-red-500"
      : "border-neutral-200 focus-within:border-neutral-950";

  return (
    <section
      className="relative min-h-screen flex items-stretch overflow-hidden"
      style={{ backgroundColor: INK }}
    >
      <ImageWithFallback
        src={HERO_SIGNIN}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${INK}d9 0%, ${INK}99 45%, ${INK}cc 100%)`,
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 100% 0%, ${BRAND}44 0%, transparent 50%), radial-gradient(ellipse at 0% 100%, #00000066 0%, transparent 55%)`,
        }}
      />
      <Grain />

      <div className="relative w-full grid lg:grid-cols-2">
        {/* LEFT — welcome copy on top of the section bg */}
        <div className="hidden lg:flex flex-col justify-between p-12 text-white">
          <Link to="/" aria-label="FISC 2026 home">
            <Lockup variant="light" size="md" />
          </Link>

          <div>
            <div className="tracking-[0.25em] text-white/60 text-xs mb-4">
              FISC · 2026 · TRINIDAD & TOBAGO
            </div>
            <h1 className="tracking-[-0.03em]" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", lineHeight: 1 }}>
              Welcome,<br />
              <GradientText tone="light">delegate.</GradientText>
            </h1>
            <p className="mt-6 max-w-md text-white/80" style={{ fontSize: "1.125rem", lineHeight: 1.6 }}>
              Sign in to access the programme, your personalised schedule,
              session materials and travel details.
            </p>
          </div>

          <div className="text-white/60 text-sm">
            Invitation only · Hosted by FreeBalance & the Government of Trinidad and Tobago
          </div>
        </div>

        {/* RIGHT — form panel */}
        <div className="relative flex items-center justify-center p-6 md:p-12 bg-white lg:rounded-l-[2.5rem]">
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <div className="lg:hidden mb-8">
              <Lockup variant="dark" size="sm" />
            </div>
            <div className="tracking-[0.25em] text-neutral-500 text-xs">DELEGATE PORTAL</div>
            <h2 className="mt-3 tracking-[-0.02em] text-neutral-950" style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)", lineHeight: 1.05 }}>
              Sign in to your invitation.
            </h2>
            <p className="mt-3 text-neutral-600">
              Use the email address your invitation was sent to, plus the
              access code from the confirmation message.
            </p>

            <form className="mt-8 space-y-4" onSubmit={handleSignIn} noValidate>
              {errors.form && (
                <div
                  role="alert"
                  className="flex items-start gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-sm text-red-800"
                >
                  <AlertCircle size={16} className="shrink-0 mt-0.5" />
                  <span>{errors.form}</span>
                </div>
              )}

              <label className="block">
                <span className="text-sm text-neutral-700">Invited email</span>
                <div
                  className={`mt-2 flex items-center bg-neutral-50 border rounded-xl px-4 transition ${fieldBorder(!!errors.email)}`}
                >
                  <Mail size={18} className="text-neutral-400 shrink-0" />
                  <input
                    type="text"
                    autoComplete="username"
                    placeholder="you@ministry.gov"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                      if (errors.form) setErrors((p) => ({ ...p, form: undefined }));
                    }}
                    aria-invalid={!!errors.email}
                    className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
                  />
                </div>
                {errors.email && (
                  <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
                    <AlertCircle size={12} /> {errors.email}
                  </div>
                )}
              </label>

              <label className="block">
                <span className="text-sm text-neutral-700">Access code</span>
                <div
                  className={`mt-2 flex items-center bg-neutral-50 border rounded-xl px-4 transition ${fieldBorder(!!errors.code)}`}
                >
                  <Lock size={18} className="text-neutral-400 shrink-0" />
                  <input
                    type="password"
                    autoComplete="current-password"
                    placeholder="Access code"
                    value={code}
                    onChange={(e) => {
                      setCode(e.target.value);
                      if (errors.code) setErrors((p) => ({ ...p, code: undefined }));
                      if (errors.form) setErrors((p) => ({ ...p, form: undefined }));
                    }}
                    aria-invalid={!!errors.code}
                    className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 tracking-[0.3em]"
                  />
                </div>
                {errors.code && (
                  <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
                    <AlertCircle size={12} /> {errors.code}
                  </div>
                )}
              </label>

              <label className="flex items-center gap-2 text-sm text-neutral-600">
                <input type="checkbox" className="accent-neutral-950 w-4 h-4" />
                Keep me signed in on this device
              </label>

              <button
                type="submit"
                disabled={submitting}
                style={{ backgroundColor: INK }}
                className="group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-sm hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed transition"
              >
                {submitting ? "Signing in…" : "Sign in"}
                <span className="w-9 h-9 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND }}>
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </button>
            </form>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-sm">
              <button
                type="button"
                onClick={() => setLostOpen(true)}
                className="text-neutral-600 hover:text-neutral-950"
              >
                Lost your access code?
              </button>
              <Link to="/" className="text-neutral-500 hover:text-neutral-950">← Back to home</Link>
            </div>

            <div className="mt-10 p-4 rounded-md bg-neutral-50 border border-neutral-200 text-sm text-neutral-600">
              FISC 2026 is invitation only. If you believe you should have
              access, contact your country's delegation lead or{" "}
              <a href="mailto:fisc@freebalance.com" className="text-neutral-950 underline">fisc@freebalance.com</a>.
            </div>
          </motion.div>
        </div>
      </div>

      {/* "Lost your access code?" recovery modal */}
      <AnimatePresence>
        {lostOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeLostModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="lost-code-title"
            className="fixed inset-0 z-[90] bg-black/70 backdrop-blur flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-black/40 overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-100">
                <span className="text-[10px] tracking-[0.25em] uppercase text-neutral-500">
                  Recovery
                </span>
                <button
                  type="button"
                  onClick={closeLostModal}
                  aria-label="Close"
                  className="w-8 h-8 rounded-full text-neutral-500 hover:bg-neutral-100 hover:text-neutral-950 flex items-center justify-center transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="p-6 md:p-8">
                {!lostSent ? (
                  <>
                    <h3
                      id="lost-code-title"
                      className="tracking-[-0.02em] text-neutral-950"
                      style={{ fontSize: "1.5rem", lineHeight: 1.1 }}
                    >
                      Lost your access code?
                    </h3>
                    <p className="mt-3 text-neutral-600 text-sm" style={{ lineHeight: 1.6 }}>
                      Enter the invited email and we'll send a fresh six-digit code within a few minutes.
                    </p>

                    <form className="mt-6 space-y-4" onSubmit={handleLostSubmit} noValidate>
                      <label className="block">
                        <span className="text-sm text-neutral-700">Invited email</span>
                        <div
                          className={`mt-2 flex items-center bg-neutral-50 border rounded-xl px-4 transition ${fieldBorder(!!lostErrors.email)}`}
                        >
                          <Mail size={18} className="text-neutral-400 shrink-0" />
                          <input
                            type="email"
                            autoComplete="email"
                            autoFocus
                            placeholder="you@ministry.gov"
                            value={lostEmail}
                            onChange={(e) => {
                              setLostEmail(e.target.value);
                              if (lostErrors.email) setLostErrors({});
                            }}
                            aria-invalid={!!lostErrors.email}
                            className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
                          />
                        </div>
                        {lostErrors.email && (
                          <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
                            <AlertCircle size={12} /> {lostErrors.email}
                          </div>
                        )}
                      </label>

                      <button
                        type="submit"
                        style={{ backgroundColor: INK }}
                        className="group w-full inline-flex items-center justify-between text-white pl-5 pr-2 py-3 rounded-sm hover:opacity-90 transition"
                      >
                        Resend access code
                        <span
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: BRAND }}
                        >
                          <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </button>
                    </form>

                    <p className="mt-6 text-sm text-neutral-500" style={{ lineHeight: 1.55 }}>
                      Still can't access? Contact your country's delegation lead or{" "}
                      <a href="mailto:fisc@freebalance.com" className="text-neutral-950 underline">
                        fisc@freebalance.com
                      </a>
                      .
                    </p>
                  </>
                ) : (
                  <div>
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                      style={{ backgroundColor: `${BRAND}18`, color: BRAND }}
                    >
                      <CheckCircle2 size={22} />
                    </div>
                    <h3
                      id="lost-code-title"
                      className="tracking-[-0.02em] text-neutral-950"
                      style={{ fontSize: "1.5rem", lineHeight: 1.1 }}
                    >
                      Check your inbox.
                    </h3>
                    <p className="mt-3 text-neutral-600 text-sm" style={{ lineHeight: 1.6 }}>
                      If your email matches an invited delegate, a fresh six-digit code is on its way. Codes typically arrive within a few minutes.
                    </p>
                    <button
                      type="button"
                      onClick={closeLostModal}
                      className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-sm border border-neutral-300 text-neutral-800 hover:border-neutral-950 transition"
                    >
                      Back to sign in
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
