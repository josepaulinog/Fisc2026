import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  ArrowRight,
  Briefcase,
  Building2,
  Camera,
  Check,
  Loader2,
  Globe,
  Linkedin,
  Mail,
  PlayCircle,
  RotateCcw,
  Trash2,
  Twitter,
  User as UserIcon,
} from "lucide-react";
import { SectionLabel } from "../components/shared";
import { CountryDropdown } from "../components/ui/CountryDropdown";
import { BracketArrow } from "../components/ui/BracketArrow";
import { SkeletonHero, SkeletonPill, SkeletonText } from "../components/ui/Skeletons";
import { useToasts } from "../components/ui/Toast";
import { useOnboardingTour } from "../components/OnboardingTour";
import { useAuth } from "../auth";
import { initialsOf, loadProfile, saveProfile, type ProfileData } from "../profile";
import { BRAND, INK, countries } from "../data";

type Errors = Partial<Record<keyof ProfileData, string>>;
type SaveStatus = "idle" | "saving" | "saved";
type UploadStatus =
  | { kind: "idle" }
  | { kind: "uploading"; fileName: string; progress: number }
  | { kind: "success"; fileName: string }
  | { kind: "error"; message: string };

const MAX_PHOTO_BYTES = 1024 * 1024; // 1 MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export default function Profile() {
  const { user, isAuthed } = useAuth();
  const toast = useToasts();
  const tour = useOnboardingTour();

  const [profile, setProfileState] = useState<ProfileData | null>(null);
  const [baseline, setBaseline] = useState<ProfileData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>({ kind: "idle" });
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadToastId = useRef<string | null>(null);
  const uploadProgressTimer = useRef<number | null>(null);

  // Load profile when user is known. `baseline` captures the saved state so
  // we can detect "dirty" fields and offer a discard-changes affordance.
  useEffect(() => {
    if (!user) return;
    const data = loadProfile(user);
    setProfileState(data);
    setBaseline(data);
  }, [user]);

  // Save-status reset (Update → Updated → Update).
  useEffect(() => {
    if (saveStatus !== "saved") return;
    const t = window.setTimeout(() => setSaveStatus("idle"), 2200);
    return () => window.clearTimeout(t);
  }, [saveStatus]);

  // Cleanup any pending fake upload progress timer on unmount.
  useEffect(() => {
    return () => {
      if (uploadProgressTimer.current) {
        window.clearInterval(uploadProgressTimer.current);
        uploadProgressTimer.current = null;
      }
    };
  }, []);

  const isDirty = useMemo(() => {
    if (!profile || !baseline) return false;
    return JSON.stringify(profile) !== JSON.stringify(baseline);
  }, [profile, baseline]);

  const update = useCallback(<K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfileState((p) => (p ? { ...p, [key]: value } : p));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  }, []);

  // -------------------------------------------------------------------------
  // Photo upload — fake-progress wrapper around FileReader. In production
  // (WordPress port) this becomes a real multipart POST to wp-json/wp/v2/media
  // with the upload toast tied to the XHR progress event.
  // -------------------------------------------------------------------------
  const onPhotoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    // Reset the input so the same file can be re-picked after a remove.
    e.target.value = "";
    if (!file) return;
    void uploadPhoto(file);
  };

  const onPhotoDrop = (e: React.DragEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    void uploadPhoto(file);
  };

  const uploadPhoto = async (file: File) => {
    // Type check.
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadStatus({ kind: "error", message: "Use JPG, PNG or WEBP." });
      setErrors((p) => ({ ...p, photoUrl: "Use JPG, PNG or WEBP." }));
      toast.error("That file type isn't supported", {
        description: "Pick a JPG, PNG, or WEBP image.",
      });
      return;
    }
    // Size check.
    if (file.size > MAX_PHOTO_BYTES) {
      const message = `Photo must be under ${Math.round(MAX_PHOTO_BYTES / 1024 / 1024)} MB.`;
      setUploadStatus({ kind: "error", message });
      setErrors((p) => ({ ...p, photoUrl: message }));
      toast.error("Photo too large", { description: message });
      return;
    }

    setErrors((p) => ({ ...p, photoUrl: undefined }));
    setUploadStatus({ kind: "uploading", fileName: file.name, progress: 0 });

    // Show a single loading toast that we'll later update on success/error.
    uploadToastId.current = toast.loading("Uploading photo…", {
      description: `${file.name} · ${formatBytes(file.size)}`,
    });

    // Fake progress over ~700ms so the user sees the loading state. The
    // actual FileReader call is near-instant; in the WP port this becomes
    // real XHR upload progress.
    if (uploadProgressTimer.current) window.clearInterval(uploadProgressTimer.current);
    uploadProgressTimer.current = window.setInterval(() => {
      setUploadStatus((cur) => {
        if (cur.kind !== "uploading") return cur;
        const next = Math.min(cur.progress + 12, 92);
        return { ...cur, progress: next };
      });
    }, 80);

    try {
      const dataUrl = await readFileAsDataURL(file);
      await sleep(600); // smooth out the fake progress bar
      if (uploadProgressTimer.current) {
        window.clearInterval(uploadProgressTimer.current);
        uploadProgressTimer.current = null;
      }
      update("photoUrl", dataUrl);
      setUploadStatus({ kind: "success", fileName: file.name });
      if (uploadToastId.current) {
        toast.update(uploadToastId.current, {
          variant: "success",
          title: "Photo uploaded",
          description: "Save your profile to publish the new photo.",
        });
        uploadToastId.current = null;
      }
      // Drop the "success" pill after a moment so the chrome doesn't linger.
      window.setTimeout(() => {
        setUploadStatus((cur) => (cur.kind === "success" ? { kind: "idle" } : cur));
      }, 2400);
    } catch {
      if (uploadProgressTimer.current) {
        window.clearInterval(uploadProgressTimer.current);
        uploadProgressTimer.current = null;
      }
      setUploadStatus({ kind: "error", message: "Couldn't read that file." });
      if (uploadToastId.current) {
        toast.update(uploadToastId.current, {
          variant: "error",
          title: "Upload failed",
          description: "Try saving it again, or pick a different file.",
        });
        uploadToastId.current = null;
      }
    }
  };

  const removePhoto = () => {
    update("photoUrl", undefined);
    setUploadStatus({ kind: "idle" });
    toast.info("Photo removed", { description: "Save your profile to publish the change." });
  };

  // -------------------------------------------------------------------------
  // Validation + save
  // -------------------------------------------------------------------------
  const validate = (data: ProfileData): Errors => {
    const next: Errors = {};
    if (!data.displayName.trim()) next.displayName = "Display name is required.";
    if (!data.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (data.linkedin && !/^https?:\/\//i.test(data.linkedin)) {
      next.linkedin = "Include http:// or https:// in the URL.";
    }
    if (data.twitter && !/^https?:\/\//i.test(data.twitter)) {
      next.twitter = "Include http:// or https:// in the URL.";
    }
    if (data.website && !/^https?:\/\//i.test(data.website)) {
      next.website = "Include http:// or https:// in the URL.";
    }
    return next;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!profile || !user) return;
    // No-op submit feedback — previously the button was just `disabled` when
    // clean, which left users tapping a dead control. Now the button is
    // always live and we explain *why* nothing happened.
    if (!isDirty) {
      toast.info("Nothing to update", {
        description: "Edit a field, change your photo, or pick a different country first.",
      });
      return;
    }
    const fieldErrors = validate(profile);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      toast.error("Some fields need attention", {
        description: "The highlighted fields are missing or need fixing.",
      });
      // Focus first invalid field for fast correction.
      const firstKey = Object.keys(fieldErrors)[0];
      const el = document.querySelector<HTMLElement>(`[data-field="${firstKey}"]`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.focus({ preventScroll: true });
      return;
    }
    setErrors({});
    setSaveStatus("saving");
    try {
      // Tiny artificial latency so the loading state is perceivable.
      await sleep(450);
      saveProfile(user, profile);
      setBaseline(profile);
      setSaveStatus("saved");
      toast.success("Profile updated", {
        description: "Other delegates will see these details in the Attendees directory.",
      });
    } catch {
      setSaveStatus("idle");
      toast.error("Save didn't go through", { description: "Try again in a moment." });
    }
  };

  const onDiscard = () => {
    if (!baseline) return;
    setProfileState(baseline);
    setErrors({});
    setUploadStatus({ kind: "idle" });
    toast.info("Changes discarded");
  };

  if (!isAuthed) {
    return <Navigate to="/sign-in?return=/profile" replace />;
  }
  // Loading state — `user` resolves from AuthContext, `profile` from localStorage
  // via loadProfile() inside the mount useEffect. On hot loads this is sub-50ms;
  // on cold loads (first visit / new tab) it can be a few hundred ms. Render
  // a skeleton mirror of the loaded form instead of a blank screen so the page
  // dimensions don't pop when content arrives.
  if (!user || !profile) return <ProfileSkeleton />;

  const fieldBorder = (hasError: boolean) =>
    hasError
      ? "ring-1 ring-red-500 focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2"
      : "ring-1 ring-black/[0.08] focus-within:ring-2 focus-within:ring-neutral-950 focus-within:ring-offset-2";

  return (
    <>
      {/* Utility header — Profile is a settings page; an editorial PageHero
          on top of a form tells the delegate "you're reading" when they're
          "doing data entry". Replaced with a thin breadcrumb + tight H1
          band that yields the screen back to the form below. */}
      <section className="pt-28 md:pt-32 pb-8 md:pb-10 bg-white border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-5 md:px-6">
          <div className="text-[10.5px] tracking-[0.25em] uppercase text-neutral-500 mb-3 inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: BRAND }} />
            Your delegate profile
          </div>
          <h1
            className="tracking-[-0.02em] text-neutral-950"
            style={{ fontSize: "clamp(1.625rem, 3vw, 2.25rem)", lineHeight: 1.1 }}
          >
            Tell other delegates who you are.
          </h1>
          <p className="mt-3 text-neutral-700 max-w-2xl" style={{ fontSize: "1rem", lineHeight: 1.55 }}>
            Share key information about yourself — it appears in the Attendees
            section so other delegates can recognise you and reach out before,
            during and after FISC 2026.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-6">
          <form onSubmit={onSubmit} noValidate className="space-y-6 md:space-y-8">
            {/* ---------------------------------------------------------------
                Profile photo
                --------------------------------------------------------------- */}
            <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-5 md:p-8">
              <SectionLabel>Profile photo</SectionLabel>
              <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={onPhotoDrop}
                  aria-label="Change profile photo"
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white ring-1 ring-black/[0.06] shadow-[0_8px_24px_-12px_rgba(0,0,0,0.18)] group shrink-0"
                >
                  {profile.photoUrl ? (
                    <img
                      src={profile.photoUrl}
                      alt={profile.displayName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center text-white"
                      style={{ backgroundColor: BRAND, fontSize: "1.5rem", fontWeight: 600 }}
                    >
                      {initialsOf(profile.displayName)}
                    </div>
                  )}
                  {/* Upload progress overlay — visible while we read the file. */}
                  <AnimatePresence>
                    {uploadStatus.kind === "uploading" && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-neutral-950/55 backdrop-blur-sm flex flex-col items-center justify-center text-white gap-1.5"
                      >
                        <Loader2 size={18} strokeWidth={1.75} className="animate-spin" />
                        <span className="tabular-nums text-[11px] tracking-[0.18em]">
                          {Math.round(uploadStatus.progress)}%
                        </span>
                      </motion.div>
                    )}
                    {uploadStatus.kind === "success" && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        className="absolute inset-0 bg-emerald-600/35 backdrop-blur-sm flex items-center justify-center text-white"
                      >
                        <Check size={26} strokeWidth={2} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Hover hint — only when idle. */}
                  {uploadStatus.kind === "idle" && (
                    <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                      <Camera size={20} strokeWidth={1.5} />
                    </span>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <div className="tracking-tight text-neutral-950" style={{ fontSize: "1rem" }}>
                    {profile.displayName || "Your name"}
                  </div>
                  <div className="text-neutral-500 text-sm mt-0.5">
                    {profile.position || "Add your position below"}
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-neutral-300 text-neutral-700 hover:border-neutral-950 transition-fluid text-sm"
                    >
                      <Camera size={14} strokeWidth={1.5} /> Change photo
                    </button>
                    {profile.photoUrl && (
                      <button
                        type="button"
                        onClick={removePhoto}
                        className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-red-600 transition-fluid"
                      >
                        <Trash2 size={13} strokeWidth={1.5} /> Remove
                      </button>
                    )}
                  </div>
                  {/* Upload status strip — replaces the static helper text on
                      upload events. Falls back to the "JPG, PNG …" hint when
                      idle. */}
                  <div className="mt-2 min-h-[18px]">
                    <AnimatePresence mode="wait">
                      {uploadStatus.kind === "uploading" && (
                        <motion.div
                          key="up"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-2 text-[12.5px] text-neutral-700"
                        >
                          <Loader2 size={12} strokeWidth={1.75} className="animate-spin text-neutral-500" />
                          <span className="truncate">Uploading {uploadStatus.fileName}…</span>
                          <span className="tabular-nums text-neutral-400">
                            {Math.round(uploadStatus.progress)}%
                          </span>
                        </motion.div>
                      )}
                      {uploadStatus.kind === "success" && (
                        <motion.div
                          key="ok"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-2 text-[12.5px] text-emerald-700"
                        >
                          <Check size={12} strokeWidth={1.75} />
                          <span className="truncate">{uploadStatus.fileName} ready · save to publish</span>
                        </motion.div>
                      )}
                      {uploadStatus.kind === "error" && (
                        <motion.div
                          key="err"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          className="flex items-center gap-2 text-[12.5px] text-red-600"
                        >
                          <AlertCircle size={12} strokeWidth={1.75} />
                          <span className="truncate">{uploadStatus.message}</span>
                        </motion.div>
                      )}
                      {uploadStatus.kind === "idle" && !errors.photoUrl && (
                        <motion.div
                          key="hint"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="text-xs text-neutral-400"
                        >
                          JPG, PNG or WEBP · 1 MB max · drop on avatar to upload
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  {errors.photoUrl && uploadStatus.kind !== "error" && (
                    <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
                      <AlertCircle size={12} strokeWidth={1.5} /> {errors.photoUrl}
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={onPhotoSelect}
                  className="hidden"
                />
              </div>
            </div>

            {/* ---------------------------------------------------------------
                Identity
                --------------------------------------------------------------- */}
            <div className="rounded-md border border-neutral-200 p-5 md:p-8">
              <SectionLabel>Identity</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="Display name"
                  name="displayName"
                  icon={UserIcon}
                  value={profile.displayName}
                  onChange={(v) => update("displayName", v)}
                  error={errors.displayName}
                  required
                  fieldBorder={fieldBorder}
                />
                <FormField
                  label="Email address"
                  name="email"
                  icon={Mail}
                  type="email"
                  value={profile.email}
                  onChange={(v) => update("email", v)}
                  error={errors.email}
                  required
                  fieldBorder={fieldBorder}
                />
                <FormField
                  label="Position"
                  name="position"
                  icon={Briefcase}
                  value={profile.position}
                  onChange={(v) => update("position", v)}
                  placeholder="e.g. Director of Public Budget"
                  fieldBorder={fieldBorder}
                  error={errors.position}
                />
                <FormField
                  label="Organisation"
                  name="organization"
                  icon={Building2}
                  value={profile.organization}
                  onChange={(v) => update("organization", v)}
                  placeholder="e.g. Ministry of Finance"
                  fieldBorder={fieldBorder}
                  error={errors.organization}
                />
                <CountryDropdown
                  value={profile.country}
                  onChange={(v) => update("country", v)}
                  options={countries}
                  fieldBorder={fieldBorder}
                  error={errors.country}
                />
                <FormField
                  label="Website"
                  name="website"
                  icon={Globe}
                  type="url"
                  value={profile.website}
                  onChange={(v) => update("website", v)}
                  placeholder="https://example.com"
                  fieldBorder={fieldBorder}
                  error={errors.website}
                />
              </div>
            </div>

            {/* ---------------------------------------------------------------
                Social
                --------------------------------------------------------------- */}
            <div className="rounded-md border border-neutral-200 p-5 md:p-8">
              <SectionLabel>Where delegates can find you</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="LinkedIn"
                  name="linkedin"
                  icon={Linkedin}
                  type="url"
                  value={profile.linkedin}
                  onChange={(v) => update("linkedin", v)}
                  placeholder="https://linkedin.com/in/username"
                  fieldBorder={fieldBorder}
                  error={errors.linkedin}
                />
                <FormField
                  label="X"
                  name="twitter"
                  icon={Twitter}
                  type="url"
                  value={profile.twitter}
                  onChange={(v) => update("twitter", v)}
                  placeholder="https://x.com/username"
                  fieldBorder={fieldBorder}
                  error={errors.twitter}
                />
              </div>
            </div>

            {/* ---------------------------------------------------------------
                Bio
                --------------------------------------------------------------- */}
            <div className="rounded-md border border-neutral-200 p-5 md:p-8">
              <SectionLabel>About you</SectionLabel>
              <label className="block">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm text-neutral-700">
                    Bio — tell your fellow delegates about your role, experience and interests.
                  </span>
                  <span className="text-[11px] tabular-nums text-neutral-400">
                    {profile.bio.length}/600
                  </span>
                </div>
                <textarea
                  value={profile.bio}
                  onChange={(e) => update("bio", e.target.value.slice(0, 600))}
                  rows={5}
                  placeholder="Brief introduction…"
                  className={`mt-2 w-full bg-neutral-50 rounded-sm px-4 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 transition-fluid resize-y text-[0.9375rem] md:text-base ${fieldBorder(false)}`}
                  style={{ lineHeight: 1.55 }}
                />
                <div className="mt-1 text-xs text-neutral-400">
                  Markdown isn't supported. Plain text only.
                </div>
              </label>
            </div>

            {/* ---------------------------------------------------------------
                Footer — save / discard / replay tour
                --------------------------------------------------------------- */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="text-sm text-neutral-500 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>
                  Signed in as <span className="text-neutral-900">{user.email}</span>
                </span>
                {isDirty && (
                  <span className="inline-flex items-center gap-1.5 text-amber-700 text-[12.5px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Unsaved changes
                  </span>
                )}
                {/* Replay tour — re-opens the onboarding modal. The auto-show
                    flag in localStorage isn't touched here; replay() just
                    re-opens the same component. */}
                <button
                  type="button"
                  onClick={() => {
                    tour.replay();
                    toast.info("Replaying tour", {
                      description: "Use ← / → or the dots to navigate steps.",
                      duration: 3000,
                    });
                  }}
                  className="inline-flex items-center gap-1.5 text-[12.5px] text-neutral-500 hover:text-neutral-950 transition-fluid"
                >
                  <PlayCircle size={13} strokeWidth={1.5} />
                  Replay welcome tour
                </button>
              </div>
              <div className="flex items-center gap-3">
                {isDirty && saveStatus !== "saving" && (
                  <button
                    type="button"
                    onClick={onDiscard}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-sm text-sm text-neutral-700 hover:text-neutral-950 transition-fluid"
                  >
                    <RotateCcw size={13} strokeWidth={1.5} /> Discard
                  </button>
                )}
                <button
                  type="submit"
                  disabled={saveStatus === "saving"}
                  aria-disabled={saveStatus === "saving" || !isDirty}
                  style={{ backgroundColor: saveStatus === "saved" ? "#15803d" : INK }}
                  className={`group inline-flex items-center justify-between gap-3 pl-5 pr-2 py-3 rounded-sm text-white transition-fluid will-change-transform disabled:cursor-not-allowed hover:scale-[1.012] active:scale-[0.98] shadow-[0_3px_10px_-5px_rgba(0,0,0,0.28)] hover:shadow-[0_8px_20px_-8px_rgba(0,0,0,0.36)] ${
                    !isDirty && saveStatus === "idle" ? "opacity-70" : ""
                  }`}
                >
                  <span className="text-[15px]" style={{ fontWeight: 500 }}>
                    {saveStatus === "saving"
                      ? "Saving…"
                      : saveStatus === "saved"
                        ? "Profile updated"
                        : "Update profile"}
                  </span>
                  <span
                    className="w-8 h-8 rounded-sm flex items-center justify-center transition-fluid group-hover:brightness-105"
                    style={{ backgroundColor: saveStatus === "saved" ? "rgba(255,255,255,0.18)" : BRAND }}
                  >
                    {saveStatus === "saving" ? (
                      <Loader2 size={14} strokeWidth={1.75} className="animate-spin" />
                    ) : saveStatus === "saved" ? (
                      <Check size={14} strokeWidth={1.75} />
                    ) : (
                      <span className="inline-flex transition-fluid group-hover:translate-x-[1.5px] group-hover:-translate-y-[1.5px]">
                        <BracketArrow size={12} strokeWidth={1.75} />
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}

// ---------------------------------------------------------------------------
// Field primitives
// ---------------------------------------------------------------------------

type FieldIcon = typeof UserIcon;

function FormField({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  required,
  fieldBorder,
}: {
  label: string;
  name: string;
  icon: FieldIcon;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  fieldBorder: (hasError: boolean) => string;
}) {
  return (
    <label className="block">
      <span className="text-sm text-neutral-700" style={{ fontWeight: 500 }}>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className={`mt-2 flex items-center bg-neutral-50 rounded-sm px-4 transition-fluid ${fieldBorder(!!error)}`}>
        <Icon size={16} strokeWidth={1.5} className="text-neutral-400 shrink-0" />
        <input
          type={type}
          data-field={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-err` : undefined}
          className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 text-[16px]"
        />
      </div>
      {error && (
        <div id={`${name}-err`} className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
          <AlertCircle size={12} strokeWidth={1.5} /> {error}
        </div>
      )}
    </label>
  );
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------

function sleep(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

function readFileAsDataURL(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") resolve(reader.result);
      else reject(new Error("Unexpected reader result type"));
    };
    reader.onerror = () => reject(reader.error ?? new Error("Read failed"));
    reader.readAsDataURL(file);
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

// ---------------------------------------------------------------------------
// ProfileSkeleton — mirror of the loaded form layout, rendered while
// `user` / `profile` are still resolving. Dimensions match the real form
// so there's no layout pop when content arrives. Pure CSS animation via
// the `skeleton-shimmer` class (see theme.css) — no JS dependency, ports
// 1:1 to Sage Blade at WP-port time.
// ---------------------------------------------------------------------------

function ProfileSkeleton() {
  return (
    <>
      {/* Hero — INK background mirrors PageHero; SkeletonHero from the
          library handles the eyebrow + heading + subtitle skeleton blocks
          in the dark tone variant. */}
      <section
        className="relative overflow-hidden pt-24 pb-14 md:pt-36 md:pb-24"
        style={{ backgroundColor: INK }}
      >
        <div className="relative max-w-7xl mx-auto px-5 md:px-6">
          <SkeletonHero tone="dark" />
        </div>
      </section>

      {/* Form layout — 4 cards stacked + footer, exact spacing of the
          loaded form (`space-y-6 md:space-y-8`, `max-w-4xl`, etc). */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-6 space-y-6 md:space-y-8">
          {/* Profile photo card */}
          <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-5 md:p-8">
            <SkeletonPill w="w-32" className="mb-6" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-7">
              <div
                aria-hidden="true"
                className="skeleton-shimmer w-24 h-24 md:w-28 md:h-28 rounded-full shrink-0 ring-1 ring-black/[0.06]"
              />
              <div className="flex-1 min-w-0 space-y-2.5">
                <SkeletonText w="w-40" size="lg" />
                <SkeletonText w="w-32" size="sm" />
                <div className="pt-1">
                  <SkeletonPill w="w-32" />
                </div>
              </div>
            </div>
          </div>

          {/* Identity card — 6 fields in a 2-col grid (Display name, Email,
              Position, Organisation, Country, Website) */}
          <SkeletonFieldsCard label="w-20" fieldCount={6} cols="sm:grid-cols-2" />

          {/* Where delegates can find you — 2 fields (LinkedIn, X.com) */}
          <SkeletonFieldsCard label="w-44" fieldCount={2} cols="sm:grid-cols-2" />

          {/* About you — single textarea */}
          <div className="rounded-md border border-neutral-200 p-5 md:p-8">
            <SkeletonPill w="w-20" className="mb-6" />
            <SkeletonText w="w-80" size="sm" className="mb-3" />
            <div aria-hidden="true" className="skeleton-shimmer h-32 rounded-sm" />
          </div>

          {/* Footer — signed-in label + Update profile button */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <SkeletonText w="w-56" size="sm" />
            <div aria-hidden="true" className="skeleton-shimmer h-12 w-44 rounded-sm" />
          </div>
        </div>
      </section>
    </>
  );
}

/** A single field-grid card (eyebrow + N labelled inputs). Used by the
 *  Identity and Where-to-find-you sections. */
function SkeletonFieldsCard({
  label,
  fieldCount,
  cols,
}: {
  label: string;
  fieldCount: number;
  cols: string;
}) {
  return (
    <div className="rounded-md border border-neutral-200 p-5 md:p-8">
      <SkeletonPill w={label} className="mb-6" />
      <div className={`grid ${cols} gap-4`}>
        {Array.from({ length: fieldCount }).map((_, i) => (
          <div key={i} className="space-y-2">
            <SkeletonText w="w-24" size="sm" />
            <div aria-hidden="true" className="skeleton-shimmer h-12 rounded-sm" />
          </div>
        ))}
      </div>
    </div>
  );
}
