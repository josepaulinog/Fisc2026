import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Grain, GradientText } from "../components/shared";
import { BRAND, INK } from "../data";

export default function NotFound() {
  return (
    <section className="relative min-h-screen flex items-center pt-32 pb-16" style={{ backgroundColor: INK }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 80% 10%, ${BRAND}55 0%, transparent 50%)` }} />
      <Grain />
      <div className="relative max-w-7xl mx-auto px-5 md:px-6 text-white">
        <div className="tracking-[0.25em] text-white/60 text-sm">ERROR · 404</div>
        <h1 className="mt-4 tracking-[-0.03em]" style={{ fontSize: "clamp(3rem, 10vw, 9rem)", lineHeight: 0.95 }}>
          Lost in <GradientText>transit.</GradientText>
        </h1>
        <p className="mt-6 max-w-xl text-white/70" style={{ fontSize: "1.125rem" }}>
          The page you were looking for doesn't exist — or it's still on the boat to Port of Spain.
        </p>
        <Link to="/" className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white hover:scale-[1.02] transition" style={{ backgroundColor: BRAND }}>
          Back to home <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
