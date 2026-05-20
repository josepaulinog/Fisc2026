import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer, Newsletter } from "./Footer";
import { OnboardingTour } from "../components/OnboardingTour";

// Routes that render the Newsletter section above the Footer.
// Auth pages (/sign-in) bypass Root entirely; the 404 catch-all stays inside Root
// but is intentionally omitted here so the newsletter doesn't appear under it.
const NEWSLETTER_ROUTES = new Set([
  "/",
  "/about",
  "/agenda",
  "/speakers",
  "/venue",
  "/resources",
  "/attendees",
  "/materials",
  "/delegate-guide",
  "/gallery",
  "/videos",
  "/media-coverage",
  "/profile",
]);

export function Root() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  // Exact match for top-level routes; prefix match for nested content routes
  // (/agenda/:day/:idx, /speakers/:slug) so detail pages also keep the newsletter.
  const showNewsletter =
    NEWSLETTER_ROUTES.has(pathname) ||
    pathname.startsWith("/agenda/") ||
    pathname.startsWith("/speakers/");

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
      {showNewsletter && <Newsletter />}
      <Footer />
      <OnboardingTour />
    </div>
  );
}
