import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowUpRight, Lock } from "lucide-react";
import { GradientText, PageHero } from "../components/shared";
import { BRAND, HERO_RESOURCES, INK, resources } from "../data";

export default function Resources() {
  return (
    <>
      <PageHero
        label="Resources"
        title={
          <>
            The full archive,
            <br />
            in one place.
          </>
        }
        subtitle="Registered delegates can access every session, slide, photo and recording — and keep the conversation going long after Port of Spain."
        image={HERO_RESOURCES}
      />
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-6">
          <div className="grid lg:grid-cols-12 gap-10 md:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-neutral-700 max-w-md" style={{ lineHeight: 1.7 }}>
                Sign in with the credentials sent to your invited email to view
                the protected resources below.
              </p>
              <Link
                to="/sign-in"
                style={{ backgroundColor: INK }}
                className="mt-6 md:mt-8 group inline-flex items-center gap-2 text-white pl-6 pr-2 py-2 rounded-sm hover:opacity-90 transition"
              >
                Delegate sign in
                <span className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND }}>
                  <ArrowUpRight size={14} className="group-hover:rotate-45 transition-transform" />
                </span>
              </Link>
            </div>
            <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3">
              {resources.map((r, i) => (
                <motion.div
                  key={r.label}
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                >
                  <Link
                    to={r.to}
                    className="group block p-5 md:p-6 rounded-2xl border border-neutral-200 hover:border-neutral-950 hover:bg-neutral-950 hover:text-white transition-all overflow-hidden bg-white h-full"
                  >
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${BRAND}15`, color: BRAND }}>
                        <r.icon size={20} />
                      </div>
                      <div className="flex items-center gap-2">
                        {r.gated && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-500 group-hover:bg-white/10 group-hover:text-white/78 text-xs">
                            <Lock size={11} /> Gated
                          </span>
                        )}
                        <ArrowUpRight size={18} className="text-neutral-400 group-hover:text-white group-hover:-translate-y-1 group-hover:translate-x-1 transition-all" />
                      </div>
                    </div>
                    <div className="mt-5 tracking-tight text-neutral-950 group-hover:text-white" style={{ fontSize: "1.125rem" }}>{r.label}</div>
                    <p className="mt-2 text-neutral-700 group-hover:text-white/78 text-sm" style={{ lineHeight: 1.55 }}>{r.desc}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
