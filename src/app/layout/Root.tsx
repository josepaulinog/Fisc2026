import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { MotionConfig } from "motion/react";
import { Header } from "./Header";
import { Footer, Newsletter } from "./Footer";
import { OnboardingTour } from "../components/OnboardingTour";
import { useDocumentTitle } from "../motion";

// Newsletter renders ONLY on Home. Previously it appeared above the footer
// on 13 routes, which gave the impression of the same "Follow the journey"
// card stamping itself onto every page — the design review correctly read
// this as a single piece of content shown five times. Home is the only
// surface where the newsletter is a natural conversion moment; everywhere
// else it's noise above the footer.
const NEWSLETTER_ROUTES = new Set(["/"]);

// Default document title leading per route. The hook appends " · FISC 2026"
// automatically; "/" returns null to fall back to the full default title
// "FISC 2026 · Trinidad & Tobago" (the homepage doesn't need a redundant
// leading label). Detail routes (agenda/:slug/:idx, speakers/:slug) call
// useDocumentTitle themselves inside the page to derive the title from the
// session or speaker data, overriding this default after the route resolves.
function defaultTitleFor(pathname: string): string | null {
  if (pathname === "/") return null;
  if (pathname === "/about") return "About FISC";
  if (pathname === "/agenda") return "Agenda";
  if (pathname.startsWith("/agenda/")) return "Agenda"; // overridden by AgendaSession
  if (pathname === "/speakers") return "Speakers";
  if (pathname.startsWith("/speakers/")) return "Speakers"; // overridden by SpeakerDetail
  if (pathname === "/venue") return "Venue";
  if (pathname === "/resources") return "Resources";
  if (pathname === "/attendees") return "Delegate community";
  if (pathname === "/materials") return "Materials";
  if (pathname === "/delegate-guide") return "Delegate guide";
  if (pathname === "/gallery") return "Gallery";
  if (pathname === "/videos") return "Videos";
  if (pathname === "/media-coverage") return "Media coverage";
  if (pathname === "/get-the-app") return "Get the app";
  if (pathname === "/profile") return "Your profile";
  if (pathname === "/sign-in") return "Sign in";
  return "Lost in transit"; // 404 catch-all
}

export function Root() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // Per-route document title. Detail pages (agenda/speakers) call
  // useDocumentTitle themselves with the resolved entity name, which
  // overrides this default once the route component mounts.
  useDocumentTitle(defaultTitleFor(pathname));

  const showNewsletter = NEWSLETTER_ROUTES.has(pathname);
  // Closing band ("See you in Trinidad." wordmark + 2 big CTA cards) is a
  // once-per-session moment. Only Home gets the full footer; everywhere
  // else gets the compact variant (link columns + meta + bottom only).
  const footerVariant = pathname === "/" ? "full" : "compact";

  return (
    /* OnboardingTour is now a context provider — wrapping the whole layout
       so any page (Profile, etc.) can call `useOnboardingTour().replay()`
       to re-open the tour after dismissal. The auto-open-on-first-sign-in
       behavior is unchanged. */
    <OnboardingTour>
      <MotionConfig reducedMotion="user">
        <div className="min-h-[100dvh] bg-white text-neutral-900 overflow-x-clip">
          <Header />
          <main>
            <Outlet />
          </main>
          {showNewsletter && <Newsletter />}
          <Footer variant={footerVariant} />
        </div>
      </MotionConfig>
    </OnboardingTour>
  );
}
