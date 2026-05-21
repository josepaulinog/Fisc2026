import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { AlertCircle, CheckCircle2, Info, Loader2, X } from "lucide-react";

/**
 * Toast — small status notification surface. Stacks bottom-right on desktop,
 * full-width bottom on mobile. Each toast carries a variant (success / error /
 * info / loading), an optional description, and auto-dismisses after a
 * duration (loading toasts persist until explicitly updated/dismissed).
 *
 * Usage:
 *   const { toast } = useToasts();
 *   toast.success("Profile saved", { description: "Other delegates will see your update." });
 *   const id = toast.loading("Uploading photo…");
 *   toast.update(id, { variant: "success", title: "Photo uploaded" });
 *   toast.dismiss(id);
 */
export type ToastVariant = "success" | "error" | "info" | "loading";

export type ToastInput = {
  title: string;
  description?: string;
  duration?: number;
};

export type Toast = {
  id: string;
  variant: ToastVariant;
  title: string;
  description?: string;
  duration: number;
};

type ToastUpdate = Partial<Pick<Toast, "variant" | "title" | "description" | "duration">>;

type ToastApi = {
  success: (title: string, opts?: Omit<ToastInput, "title">) => string;
  error: (title: string, opts?: Omit<ToastInput, "title">) => string;
  info: (title: string, opts?: Omit<ToastInput, "title">) => string;
  loading: (title: string, opts?: Omit<ToastInput, "title">) => string;
  update: (id: string, patch: ToastUpdate) => void;
  dismiss: (id: string) => void;
  clear: () => void;
};

type ToastContextValue = {
  toasts: Toast[];
  toast: ToastApi;
};

const ToastContext = createContext<ToastContextValue | null>(null);

const DEFAULT_DURATION: Record<ToastVariant, number> = {
  success: 4000,
  error: 6000,
  info: 4000,
  loading: 0, // persists until updated/dismissed
};

let nextId = 0;
const makeId = () => `t_${++nextId}_${Date.now()}`;

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timers = useRef<Map<string, number>>(new Map());

  const dismiss = useCallback((id: string) => {
    const t = timers.current.get(id);
    if (t) {
      window.clearTimeout(t);
      timers.current.delete(id);
    }
    setToasts((prev) => prev.filter((x) => x.id !== id));
  }, []);

  const scheduleDismiss = useCallback(
    (id: string, duration: number) => {
      if (duration <= 0) return;
      const existing = timers.current.get(id);
      if (existing) window.clearTimeout(existing);
      const handle = window.setTimeout(() => dismiss(id), duration);
      timers.current.set(id, handle);
    },
    [dismiss],
  );

  const push = useCallback(
    (variant: ToastVariant, input: ToastInput): string => {
      const id = makeId();
      const duration = input.duration ?? DEFAULT_DURATION[variant];
      setToasts((prev) => [
        ...prev,
        { id, variant, title: input.title, description: input.description, duration },
      ]);
      scheduleDismiss(id, duration);
      return id;
    },
    [scheduleDismiss],
  );

  const update = useCallback(
    (id: string, patch: ToastUpdate) => {
      setToasts((prev) =>
        prev.map((t) => {
          if (t.id !== id) return t;
          const next: Toast = {
            ...t,
            ...patch,
            duration: patch.duration ?? (patch.variant ? DEFAULT_DURATION[patch.variant] : t.duration),
          };
          // Reschedule if the patched variant has a finite duration.
          if (next.duration > 0) {
            scheduleDismiss(id, next.duration);
          }
          return next;
        }),
      );
    },
    [scheduleDismiss],
  );

  const clear = useCallback(() => {
    timers.current.forEach((handle) => window.clearTimeout(handle));
    timers.current.clear();
    setToasts([]);
  }, []);

  useEffect(() => {
    // Cleanup timers if the provider unmounts.
    return () => {
      timers.current.forEach((handle) => window.clearTimeout(handle));
      timers.current.clear();
    };
  }, []);

  const api = useMemo<ToastApi>(
    () => ({
      success: (title, opts) => push("success", { title, ...opts }),
      error: (title, opts) => push("error", { title, ...opts }),
      info: (title, opts) => push("info", { title, ...opts }),
      loading: (title, opts) => push("loading", { title, ...opts }),
      update,
      dismiss,
      clear,
    }),
    [push, update, dismiss, clear],
  );

  return (
    <ToastContext.Provider value={{ toasts, toast: api }}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToasts(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToasts must be used inside a <ToastProvider>");
  }
  return ctx.toast;
}

// ---------------------------------------------------------------------------
// Viewport — fixed container that renders the toast stack
// ---------------------------------------------------------------------------

function ToastViewport({ toasts, onDismiss }: { toasts: Toast[]; onDismiss: (id: string) => void }) {
  return (
    <div
      role="region"
      aria-label="Notifications"
      className="fixed z-[100] inset-x-4 bottom-4 md:inset-x-auto md:right-6 md:bottom-6 md:left-auto md:top-auto flex flex-col gap-2 pointer-events-none md:max-w-sm md:w-[22rem]"
    >
      <AnimatePresence initial={false}>
        {toasts.map((t) => (
          <ToastItem key={t.id} toast={t} onDismiss={onDismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: (id: string) => void }) {
  const { variant } = toast;
  const v = VARIANT_STYLES[variant];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.96, transition: { duration: 0.18 } }}
      transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
      role={variant === "error" ? "alert" : "status"}
      aria-live={variant === "error" ? "assertive" : "polite"}
      className={`pointer-events-auto relative flex items-start gap-3 rounded-md ring-1 ${v.ring} ${v.bg} backdrop-blur-xl px-3.5 py-3 pr-9`}
      style={{ boxShadow: "0 18px 50px -22px rgba(0,0,0,0.28), 0 4px 12px -6px rgba(0,0,0,0.1)" }}
    >
      <span
        aria-hidden
        className={`w-7 h-7 rounded-sm flex items-center justify-center shrink-0 ${v.iconWell}`}
      >
        {v.Icon === Loader2 ? (
          <v.Icon size={14} strokeWidth={1.75} className="animate-spin" />
        ) : (
          <v.Icon size={14} strokeWidth={1.75} />
        )}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <div className={`tracking-tight text-[0.9375rem] ${v.title}`} style={{ lineHeight: 1.3, fontWeight: 500 }}>
          {toast.title}
        </div>
        {toast.description && (
          <div className={`mt-0.5 text-[0.8125rem] ${v.desc}`} style={{ lineHeight: 1.45 }}>
            {toast.description}
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={() => onDismiss(toast.id)}
        aria-label="Dismiss"
        className={`absolute top-2 right-2 w-6 h-6 rounded-sm flex items-center justify-center transition-fluid ${v.close}`}
      >
        <X size={12} strokeWidth={1.5} />
      </button>
    </motion.div>
  );
}

type VariantStyle = {
  Icon: typeof CheckCircle2;
  bg: string;
  ring: string;
  iconWell: string;
  title: string;
  desc: string;
  close: string;
};

const VARIANT_STYLES: Record<ToastVariant, VariantStyle> = {
  success: {
    Icon: CheckCircle2,
    bg: "bg-white/95",
    ring: "ring-emerald-200/70",
    iconWell: "bg-emerald-50 text-emerald-700",
    title: "text-neutral-950",
    desc: "text-neutral-600",
    close: "text-neutral-400 hover:bg-black/[0.05] hover:text-neutral-700",
  },
  error: {
    Icon: AlertCircle,
    bg: "bg-white/95",
    ring: "ring-red-200/70",
    iconWell: "bg-red-50 text-red-700",
    title: "text-neutral-950",
    desc: "text-neutral-600",
    close: "text-neutral-400 hover:bg-black/[0.05] hover:text-neutral-700",
  },
  info: {
    Icon: Info,
    bg: "bg-white/95",
    ring: "ring-black/[0.06]",
    iconWell: "bg-neutral-100 text-neutral-700",
    title: "text-neutral-950",
    desc: "text-neutral-600",
    close: "text-neutral-400 hover:bg-black/[0.05] hover:text-neutral-700",
  },
  loading: {
    Icon: Loader2,
    bg: "bg-white/95",
    ring: "ring-black/[0.06]",
    iconWell: "bg-neutral-100 text-neutral-700",
    title: "text-neutral-950",
    desc: "text-neutral-500",
    close: "text-neutral-400 hover:bg-black/[0.05] hover:text-neutral-700",
  },
};
