import { useEffect, useState } from "react";
import type { User } from "./auth";

/**
 * Per-user checklist persistence — the pre-arrival to-do list lives in two
 * places (the homepage CountdownAndActions queue + the dedicated /delegate-
 * guide page) and both need to see the same completion state. localStorage
 * keyed by the user's email mirrors the auth/profile pattern so a delegate's
 * progress survives a refresh and rebuilds after they sign back in.
 *
 * At WordPress port time this becomes ACF user-meta managed by Ultimate
 * Member; the shape (a Set of completed indices) maps 1:1 to a repeater
 * field on the delegate's profile.
 */
const STORAGE_KEY_PREFIX = "fisc2026_checklist_";

function storageKey(user: User): string {
  return STORAGE_KEY_PREFIX + user.email;
}

function loadChecked(user: User): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = window.localStorage.getItem(storageKey(user));
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as number[];
    return new Set(arr);
  } catch {
    return new Set();
  }
}

function saveChecked(user: User, checked: Set<number>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(user), JSON.stringify([...checked]));
}

/**
 * React hook — returns the user's current completion state plus a toggle.
 * For signed-out users the hook returns an empty Set and a no-op toggle,
 * so call-sites can render the same UI shape without conditionally
 * skipping the hook (rules of hooks).
 */
export function useChecklist(user: User | null): {
  checked: Set<number>;
  toggle: (index: number) => void;
  reset: () => void;
} {
  const [checked, setChecked] = useState<Set<number>>(() =>
    user ? loadChecked(user) : new Set(),
  );

  // Re-load from storage when the user changes (sign-in / sign-out / swap).
  useEffect(() => {
    setChecked(user ? loadChecked(user) : new Set());
  }, [user]);

  const toggle = (index: number) => {
    if (!user) return;
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      saveChecked(user, next);
      return next;
    });
  };

  const reset = () => {
    if (!user) return;
    setChecked(new Set());
    saveChecked(user, new Set());
  };

  return { checked, toggle, reset };
}
