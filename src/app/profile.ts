import { useEffect, useState } from "react";
import type { User } from "./auth";
import { attendees, speakers } from "./data";

/**
 * Profile — delegate-editable info that drives both the Profile page and
 * the avatar surface in the Header. Persisted to localStorage per user.
 * In the WordPress port this becomes ACF user-meta fields managed by
 * Ultimate Member; the field names line up 1:1.
 */
export type ProfileData = {
  displayName: string;
  email: string;
  position: string;
  organization: string;
  country: string;
  linkedin: string;
  twitter: string;
  website: string;
  bio: string;
  /** Optional photo — stored as a data URL when the user uploads. */
  photoUrl?: string;
};

const STORAGE_KEY_PREFIX = "fisc2026_profile_";

/** Build a starting-point profile by looking the user up in attendees, then speakers. */
function defaultsFor(user: User): ProfileData {
  const attendee = attendees.find((a) => a.name === user.name);
  if (attendee) {
    return {
      displayName: attendee.name,
      email: attendee.email?.replace(/^mailto:/, "") ?? "",
      position: attendee.role,
      organization: attendee.org,
      country: attendee.country,
      linkedin: attendee.linkedin ?? "",
      twitter: attendee.twitter ?? "",
      website: "",
      bio: "",
      photoUrl: attendee.img,
    };
  }
  const speaker = speakers.find((s) => s.name === user.name);
  if (speaker) {
    return {
      displayName: speaker.name,
      email: speaker.email?.replace(/^mailto:/, "") ?? "",
      position: speaker.role,
      organization: speaker.org,
      country: "",
      linkedin: speaker.linkedin ?? "",
      twitter: speaker.twitter ?? "",
      website: "",
      bio: speaker.bio ?? "",
      photoUrl: speaker.img,
    };
  }
  return {
    displayName: user.name,
    email: "",
    position: "",
    organization: "",
    country: "",
    linkedin: "",
    twitter: "",
    website: "",
    bio: "",
  };
}

function storageKey(user: User): string {
  return STORAGE_KEY_PREFIX + user.email;
}

export function loadProfile(user: User): ProfileData {
  const defaults = defaultsFor(user);
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(storageKey(user));
    if (!raw) return defaults;
    const stored = JSON.parse(raw) as Partial<ProfileData>;
    return { ...defaults, ...stored };
  } catch {
    return defaults;
  }
}

export function saveProfile(user: User, data: ProfileData): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(user), JSON.stringify(data));
}

/** React hook — returns the current profile (or null if signed out) and a setter. */
export function useProfile(user: User | null) {
  const [profile, setProfile] = useState<ProfileData | null>(() =>
    user ? loadProfile(user) : null,
  );
  useEffect(() => {
    setProfile(user ? loadProfile(user) : null);
  }, [user]);
  return [profile, setProfile] as const;
}

/** "Brendan J. Toner" → "BT"; "Aldo" → "A". */
export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter((p) => /[A-Za-z]/.test(p[0] ?? ""))
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join("");
}

/** "Brendan J. Toner" → "Brendan". */
export function firstNameOf(name: string): string {
  return name.split(/\s+/)[0] ?? name;
}
