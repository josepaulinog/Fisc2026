import { useEffect, useRef, useState } from "react";
import { BRAND } from "../data";

/**
 * PwaPrompts — two small, fixed-position system banners for the PWA:
 *   1. "New version available" + Reload — shown when an updated service worker
 *      has installed and is waiting. Clicking Reload tells the waiting worker
 *      to activate (SKIP_WAITING) and reloads once it takes control.
 *   2. Offline indicator — shown when the browser goes offline; the cached
 *      app shell keeps working, so this just lets the delegate know.
 *
 * Service-worker registration lives here (production only) so update detection
 * is wired up race-free in the same place the worker is registered. In dev
 * (no SW) and while online, the component renders nothing.
 */
export function PwaPrompts() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offline, setOffline] = useState(
    typeof navigator !== "undefined" && navigator.onLine === false
  );
  const regRef = useRef<ServiceWorkerRegistration | null>(null);
  const refreshingRef = useRef(false);

  // Online / offline status.
  useEffect(() => {
    const goOnline = () => setOffline(false);
    const goOffline = () => setOffline(true);
    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // Register the service worker + watch for updates (production only).
  useEffect(() => {
    if (!import.meta.env.PROD || !("serviceWorker" in navigator)) return;

    const onControllerChange = () => {
      // Only reload when the user accepted the update — not on the first
      // install's initial clients.claim().
      if (refreshingRef.current) window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange);

    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        regRef.current = reg;
        // A worker installed + is waiting before this mounted.
        if (reg.waiting && navigator.serviceWorker.controller) setNeedRefresh(true);
        reg.addEventListener("updatefound", () => {
          const installing = reg.installing;
          if (!installing) return;
          installing.addEventListener("statechange", () => {
            if (installing.state === "installed" && navigator.serviceWorker.controller) {
              setNeedRefresh(true);
            }
          });
        });
      })
      .catch(() => {});

    return () => {
      navigator.serviceWorker.removeEventListener("controllerchange", onControllerChange);
    };
  }, []);

  const reload = () => {
    const waiting = regRef.current?.waiting;
    if (waiting) {
      refreshingRef.current = true;
      waiting.postMessage({ type: "SKIP_WAITING" });
    } else {
      window.location.reload();
    }
  };

  if (!offline && !needRefresh) return null;

  return (
    <div className="fixed inset-x-0 bottom-4 z-[100] flex flex-col items-center gap-2 px-4 pointer-events-none">
      {offline && (
        <div className="pointer-events-auto inline-flex items-center gap-2.5 rounded-full bg-neutral-950/90 backdrop-blur text-white/90 pl-3.5 pr-4 py-2 text-sm ring-1 ring-white/10 shadow-lg">
          <span className="inline-flex rounded-full h-2 w-2 shrink-0" style={{ backgroundColor: BRAND }} aria-hidden="true" />
          You&rsquo;re offline — showing saved content.
        </div>
      )}
      {needRefresh && (
        <div className="pointer-events-auto inline-flex items-center gap-3 rounded-full bg-neutral-950 text-white pl-5 pr-2 py-2 ring-1 ring-white/10 shadow-xl">
          <span className="text-sm">A new version is available.</span>
          <button
            type="button"
            onClick={reload}
            className="cta-fill rounded-full px-4 py-1.5 text-sm text-white transition active:scale-[0.98]"
            style={{ fontWeight: 600 }}
          >
            Reload
          </button>
        </div>
      )}
    </div>
  );
}
