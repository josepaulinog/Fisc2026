import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer, Newsletter } from "./Footer";
import { OnboardingTour } from "../components/OnboardingTour";

// Newsletter renders ONLY on Home. Previously it appeared above the footer
// on 13 routes, which gave the impression of the same "Follow the journey"
// card stamping itself onto every page — the design review correctly read
// this as a single piece of content shown five times. Home is the only
// surface where the newsletter is a natural conversion moment; everywhere
// else it's noise above the footer.
const NEWSLETTER_ROUTES = new Set(["/"]);

export function Root() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

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
      {/* overflow-x-clip (not -hidden) — `overflow-x: hidden` implicitly
          creates a scroll container that breaks any `position: sticky`
          descendant (the sticky element sticks inside the hidden container,
          which scrolls with the page, so it never actually pins). `clip`
          gives the same horizontal-overflow protection without becoming a
          scroll context, so the Countdown column on the homepage can stick
          to the viewport as the user scrolls past it. */}
      <div className="min-h-[100dvh] bg-white text-neutral-900 overflow-x-clip">
        <Header />
        <main>
          <Outlet />
        </main>
        {showNewsletter && <Newsletter />}
        <Footer variant={footerVariant} />
      </div>
    </OnboardingTour>
  );
}
