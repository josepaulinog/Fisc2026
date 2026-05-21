/**
 * Auth — UI-only mock for the FISC 2026 prototype.
 *
 * Real authentication lives in WordPress (Ultimate Member or similar) once
 * the prototype is ported. This module exists so the prototype can demonstrate
 * the gated-content flow end-to-end:
 *   - Sign in with one of the demo credentials (admin / delegate).
 *   - Persist the session in localStorage so the user stays signed in across reloads.
 *   - Surface `isAuthed`, `isAdmin`, `signIn`, `signOut` via `useAuth()`.
 *
 * Profile content (position, organisation, bio, photo, links) is owned by the
 * separate `profile` module and keyed by `user.email` — keeps identity (this
 * file) and content (Profile page form) cleanly decoupled, the same split the
 * WP layer will use.
 *
 * Anything more (password hashing, session expiry, role-based access lists)
 * belongs to the WP layer — DO NOT extend this file with production security.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "delegate";

export type User = {
  email: string;
  name: string;
  role: Role;
};

type SignInResult =
  | { ok: true; user: User }
  | { ok: false; error: string };

type AuthContextValue = {
  user: User | null;
  isAuthed: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => SignInResult;
  signOut: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "fisc2026_auth";

type DemoCredential = { password: string } & User;

// Names map onto real entries in the prototype's content (speakers / attendees)
// so signed-in views feel populated, not stubbed.
const DEMO_CREDENTIALS: DemoCredential[] = [
  { email: "admin",    password: "admin123",    name: "Carolyn Bowick",          role: "admin"    },
  { email: "delegate", password: "delegate123", name: "Brendan J. Toner", role: "delegate" },
];

/**
 * Public hint surface for the demo credentials. Exported for completeness;
 * not currently rendered in UI (hidden by design — testers are told the
 * credentials out-of-band).
 */
export const DEMO_LOGINS: { label: string; email: string; password: string; role: Role }[] = [
  { label: "Admin",    email: "admin",    password: "admin123",    role: "admin"    },
  { label: "Delegate", email: "delegate", password: "delegate123", role: "delegate" },
];

function readStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<User>;
    if (!parsed || typeof parsed.email !== "string") return null;
    const role: Role = parsed.role === "admin" || parsed.role === "delegate" ? parsed.role : "delegate";
    const name = typeof parsed.name === "string" ? parsed.name : parsed.email;
    return { email: parsed.email, name, role };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(readStoredUser);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const signIn: AuthContextValue["signIn"] = (email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const match = DEMO_CREDENTIALS.find(
      (c) => c.email === trimmedEmail && c.password === password,
    );
    if (!match) {
      return {
        ok: false,
        error:
          "We couldn't match that email and access code. Check your invitation, or use the 'Lost your code' link below.",
      };
    }
    const { password: _omit, ...userFields } = match;
    setUser(userFields);
    return { ok: true, user: userFields };
  };

  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthed: !!user,
        isAdmin: user?.role === "admin",
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}

/** Quick email-shape check for form validation. Permissive on purpose. */
export function looksLikeEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** Permissive URL check used by Profile form. Accepts http(s) only. */
export function looksLikeUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}
