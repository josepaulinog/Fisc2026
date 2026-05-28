// Centralised PWA install handling for the prototype.
//
// The browser only fires `beforeinstallprompt` once per page-load, so the
// listener has to be attached as early as possible — miss it and there's no
// captured event to call .prompt() on later. We attach at module load and
// import this module from main.tsx for the side effect.
//
// `useInstallPrompt()` is the React-facing hook. It subscribes to changes
// in the captured prompt / installed state so the install page re-renders
// when the event fires or the user accepts the install.

import { useState, useSyncExternalStore } from "react";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

let deferred: BeforeInstallPromptEvent | null = null;
let installed = false;
const subscribers = new Set<() => void>();

function notify() {
  subscribers.forEach((cb) => cb());
}

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferred = e as BeforeInstallPromptEvent;
    notify();
  });
  window.addEventListener("appinstalled", () => {
    deferred = null;
    installed = true;
    notify();
  });
}

// Primitive snapshot so React's useSyncExternalStore only re-renders when one
// of the two flags actually changes (object identity would re-render every call).
function getSnapshot() {
  return `${deferred ? "1" : "0"}|${installed ? "1" : "0"}`;
}

function subscribe(cb: () => void) {
  subscribers.add(cb);
  return () => {
    subscribers.delete(cb);
  };
}

export type InstallState = {
  /** beforeinstallprompt was captured — we can show a one-tap Install button. */
  canInstall: boolean;
  /** App is running as an installed PWA, or appinstalled fired this session. */
  isInstalled: boolean;
  /** Currently running standalone (matches `display-mode: standalone`). */
  isStandalone: boolean;
  /** iOS Safari — needs the manual Share → Add to Home Screen flow. */
  isIOS: boolean;
  /** Triggers the captured prompt. Resolves to the user's choice, or null when unavailable. */
  install: () => Promise<"accepted" | "dismissed" | null>;
};

export function useInstallPrompt(): InstallState {
  useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const [media] = useState(() => {
    if (typeof window === "undefined") {
      return { isStandalone: false, isIOS: false };
    }
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (navigator as unknown as { standalone?: boolean }).standalone === true;
    const ua = navigator.userAgent;
    // iPadOS 13+ identifies as MacIntel; catch it via touch points.
    const isIPad =
      navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1;
    const isIOS =
      (/iPad|iPhone|iPod/.test(ua) && !/MSStream/i.test(ua)) || isIPad;
    return { isStandalone, isIOS };
  });

  return {
    canInstall: !!deferred,
    isInstalled: installed || media.isStandalone,
    isStandalone: media.isStandalone,
    isIOS: media.isIOS,
    install: async () => {
      const evt = deferred;
      if (!evt) return null;
      await evt.prompt();
      const choice = await evt.userChoice;
      if (choice.outcome === "accepted") {
        deferred = null;
        installed = true;
        notify();
      }
      return choice.outcome;
    },
  };
}
