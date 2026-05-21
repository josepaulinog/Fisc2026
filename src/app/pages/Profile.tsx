import { useEffect, useRef, useState } from "react";
import { Navigate } from "react-router";
import { AnimatePresence, motion } from "motion/react";
import {
  AlertCircle,
  Briefcase,
  Building2,
  Camera,
  CheckCircle2,
  Globe,
  Linkedin,
  Mail,
  MapPin,
  Twitter,
  User as UserIcon,
} from "lucide-react";
import { CountryFlag, hasFlagFor } from "../components/CountryFlag";
import { GradientText, PageHero, SectionLabel } from "../components/shared";
import { useAuth } from "../auth";
import { initialsOf, loadProfile, saveProfile, type ProfileData } from "../profile";
import { BRAND, HERO_ATTENDEES, INK, countries } from "../data";

type Errors = Partial<Record<keyof ProfileData, string>>;

export default function Profile() {
  const { user, isAuthed } = useAuth();
  const [profile, setProfileState] = useState<ProfileData | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [saved, setSaved] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  // Load profile when user is known.
  useEffect(() => {
    if (user) setProfileState(loadProfile(user));
  }, [user]);

  useEffect(() => {
    if (!saved) return;
    const t = window.setTimeout(() => setSaved(false), 3500);
    return () => window.clearTimeout(t);
  }, [saved]);

  if (!isAuthed) {
    return <Navigate to="/sign-in?return=/profile" replace />;
  }
  if (!user || !profile) return null;

  const update = <K extends keyof ProfileData>(key: K, value: ProfileData[K]) => {
    setProfileState((p) => (p ? { ...p, [key]: value } : p));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const onPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1024 * 1024) {
      setErrors((p) => ({ ...p, photoUrl: "Photo must be under 1 MB." }));
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === "string" ? reader.result : undefined;
      update("photoUrl", dataUrl);
      setErrors((p) => ({ ...p, photoUrl: undefined }));
    };
    reader.readAsDataURL(file);
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!profile.displayName.trim()) next.displayName = "Display name is required.";
    if (!profile.email.trim()) next.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())) {
      next.email = "Enter a valid email address.";
    }
    if (profile.linkedin && !/^https?:\/\//i.test(profile.linkedin)) {
      next.linkedin = "Include http:// or https:// in the URL.";
    }
    if (profile.twitter && !/^https?:\/\//i.test(profile.twitter)) {
      next.twitter = "Include http:// or https:// in the URL.";
    }
    if (profile.website && !/^https?:\/\//i.test(profile.website)) {
      next.website = "Include http:// or https:// in the URL.";
    }
    return next;
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fieldErrors = validate();
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    saveProfile(user, profile);
    setSaved(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const fieldBorder = (hasError: boolean) =>
    hasError
      ? "border-red-300 focus-within:border-red-500"
      : "border-neutral-200 focus-within:border-neutral-950";

  return (
    <>
      <PageHero
        label="Your delegate profile"
        title={<>Tell other delegates <GradientText>who you are.</GradientText></>}
        subtitle="Share key information about yourself — it appears in the Attendees section so other delegates can recognise you and reach out before, during and after FISC 2026."
        image={HERO_ATTENDEES}
      />

      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5 md:px-6">
          <AnimatePresence>
            {saved && (
              <motion.div
                role="status"
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="mb-6 flex items-start gap-3 p-4 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800"
              >
                <span className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                  <CheckCircle2 size={16} />
                </span>
                <div>
                  <div className="tracking-tight" style={{ fontSize: "0.95rem" }}>
                    Profile updated.
                  </div>
                  <div className="text-emerald-700/80 text-sm mt-0.5">
                    Other delegates will see these details in the Attendees directory.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={onSubmit} noValidate className="space-y-8">
            {/* Photo upload */}
            <div className="rounded-md border border-neutral-200 bg-neutral-50/60 p-6 md:p-8">
              <SectionLabel>Profile photo</SectionLabel>
              <div className="flex items-center gap-5 md:gap-7">
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden bg-white border-4 border-white shadow-sm group"
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
                  <span className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center text-white opacity-0 group-hover:opacity-100">
                    <Camera size={20} />
                  </span>
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
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm border border-neutral-300 text-neutral-700 hover:border-neutral-950 transition text-sm"
                    >
                      <Camera size={14} /> Change photo
                    </button>
                    {profile.photoUrl && (
                      <button
                        type="button"
                        onClick={() => update("photoUrl", undefined)}
                        className="text-sm text-neutral-500 hover:text-neutral-950"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <div className="mt-2 text-xs text-neutral-400">JPG, PNG or WEBP · 1 MB max</div>
                  {errors.photoUrl && (
                    <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
                      <AlertCircle size={12} /> {errors.photoUrl}
                    </div>
                  )}
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={onPhotoChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Identity */}
            <div className="rounded-md border border-neutral-200 p-6 md:p-8">
              <SectionLabel>Identity</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="Display name"
                  icon={UserIcon}
                  value={profile.displayName}
                  onChange={(v) => update("displayName", v)}
                  error={errors.displayName}
                  required
                  fieldBorder={fieldBorder}
                />
                <FormField
                  label="Email address"
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
                  icon={Briefcase}
                  value={profile.position}
                  onChange={(v) => update("position", v)}
                  placeholder="e.g. Director of Public Budget"
                  fieldBorder={fieldBorder}
                  error={errors.position}
                />
                <FormField
                  label="Organisation"
                  icon={Building2}
                  value={profile.organization}
                  onChange={(v) => update("organization", v)}
                  placeholder="e.g. Ministry of Finance"
                  fieldBorder={fieldBorder}
                  error={errors.organization}
                />
                <CountryField
                  value={profile.country}
                  onChange={(v) => update("country", v)}
                  fieldBorder={fieldBorder}
                />
                <FormField
                  label="Website"
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

            {/* Social */}
            <div className="rounded-md border border-neutral-200 p-6 md:p-8">
              <SectionLabel>Where delegates can find you</SectionLabel>
              <div className="grid sm:grid-cols-2 gap-4">
                <FormField
                  label="LinkedIn profile"
                  icon={Linkedin}
                  type="url"
                  value={profile.linkedin}
                  onChange={(v) => update("linkedin", v)}
                  placeholder="https://linkedin.com/in/username"
                  fieldBorder={fieldBorder}
                  error={errors.linkedin}
                />
                <FormField
                  label="X.com profile"
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

            {/* Bio */}
            <div className="rounded-md border border-neutral-200 p-6 md:p-8">
              <SectionLabel>About you</SectionLabel>
              <label className="block">
                <span className="text-sm text-neutral-700">
                  Bio — tell your fellow delegates about your role, experience and interests.
                </span>
                <textarea
                  value={profile.bio}
                  onChange={(e) => update("bio", e.target.value)}
                  rows={5}
                  placeholder="Brief introduction…"
                  className={`mt-2 w-full bg-neutral-50 border rounded-xl px-4 py-3 text-neutral-900 outline-none placeholder:text-neutral-400 transition ${fieldBorder(false)}`}
                />
                <div className="mt-1 text-xs text-neutral-400">
                  Markdown isn't supported. Plain text only.
                </div>
              </label>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="text-sm text-neutral-500">
                Signed in as <span className="text-neutral-900">{user.email}</span>
              </div>
              <button
                type="submit"
                style={{ backgroundColor: INK }}
                className="group inline-flex items-center justify-between gap-3 pl-5 pr-2 py-3 rounded-sm text-white hover:opacity-90 transition"
              >
                Update profile
                <span
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: BRAND }}
                >
                  <CheckCircle2 size={14} />
                </span>
              </button>
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
      <span className="text-sm text-neutral-700">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <div className={`mt-2 flex items-center bg-neutral-50 border rounded-xl px-4 transition ${fieldBorder(!!error)}`}>
        <Icon size={16} className="text-neutral-400 shrink-0" />
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={!!error}
          className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
        />
      </div>
      {error && (
        <div className="mt-1.5 text-sm text-red-600 inline-flex items-center gap-1.5">
          <AlertCircle size={12} /> {error}
        </div>
      )}
    </label>
  );
}

function CountryField({
  value,
  onChange,
  fieldBorder,
}: {
  value: string;
  onChange: (v: string) => void;
  fieldBorder: (hasError: boolean) => string;
}) {
  const showFlag = hasFlagFor(value);
  return (
    <label className="block">
      <span className="text-sm text-neutral-700">Country</span>
      <div className={`mt-2 flex items-center bg-neutral-50 border rounded-xl px-4 transition ${fieldBorder(false)}`}>
        {showFlag ? (
          <CountryFlag
            country={value}
            className="h-4 w-auto rounded-[1px] shadow-sm shrink-0"
          />
        ) : (
          <MapPin size={16} className="text-neutral-400 shrink-0" />
        )}
        <input
          type="text"
          list="profile-country-options"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Start typing…"
          className="flex-1 min-w-0 bg-transparent px-3 py-3 text-neutral-900 outline-none placeholder:text-neutral-400"
        />
      </div>
      <datalist id="profile-country-options">
        {countries.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
    </label>
  );
}
