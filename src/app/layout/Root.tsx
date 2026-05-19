import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import { Header } from "./Header";
import { Footer, Newsletter } from "./Footer";

export function Root() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Header />
      <main>
        <Outlet />
      </main>
      <Newsletter />
      <Footer />
    </div>
  );
}
