import type { ReactNode } from "react";
import { Link, useLocation } from "react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { useAuth } from "../auth";
import { BRAND, INK } from "../data";

/**
 * GatedBody — paywall wrapper for invitation-only page bodies.
 *
 * Place it AROUND the body sections of a gated page (typically below the
 * PageHero) so the hero still renders for unauthed visitors but the content
 * is replaced with a sign-in prompt:
 *
 *   <PageHero ... />
 *   <GatedBody>
 *     {body sections}
 *   </GatedBody>
 *
 * The sign-in link carries a `?return=` param so the user lands back on this
 * page after successful sign-in.
 */
export function GatedBody({ children }: { children: ReactNode }) {
  const { isAuthed } = useAuth();
  const location = useLocation();
  if (isAuthed) return <>{children}</>;

  const returnTo = encodeURIComponent(location.pathname);

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-5 md:px-6 text-center">
        <div
          className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6"
          style={{ backgroundColor: `${BRAND}15`, color: BRAND }}
        >
          <Lock size={24} />
        </div>
        <div className="tracking-[0.25em] text-neutral-500 text-xs uppercase mb-4">
          Invitation only
        </div>
        <h2
          className="tracking-[-0.02em] text-neutral-950"
          style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", lineHeight: 1.05 }}
        >
          This area is for registered delegates.
        </h2>
        <p className="mt-4 text-neutral-600 max-w-md mx-auto" style={{ lineHeight: 1.65 }}>
          Sign in with the credentials sent to your invited email to access this content.
        </p>

        <Link
          to={`/sign-in?return=${returnTo}`}
          style={{ backgroundColor: INK }}
          className="mt-8 group inline-flex items-center gap-2 text-white pl-6 pr-2 py-3 rounded-sm hover:opacity-90 transition"
        >
          Delegate sign in
          <span
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: BRAND }}
          >
            <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
          </span>
        </Link>

      </div>
    </section>
  );
}
