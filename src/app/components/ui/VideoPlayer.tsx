import { useEffect } from "react";
import { motion } from "motion/react";
import { Calendar, Clock, Download, Film, X } from "lucide-react";
import { BRAND, type VideoEntry } from "../../data";
import { Z } from "../../tokens";

/**
 * VideoPlayer — fullscreen modal player that picks a renderer from the
 * URL. YouTube → iframe embed with autoplay. Direct video URL (.mp4/.webm)
 * → native <video controls>. Placeholder (#) → polished "available after
 * the event" state with the thumbnail blurred behind, day chip, duration,
 * and a calendar add-to-calendar fallback action.
 *
 * Keyboard: ESC closes. Clicking the backdrop closes; clicking the player
 * frame does not (stopPropagation).
 */
function getYouTubeId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /(?:youtube\.com\/watch\?v=)([\w-]{11})/,
    /(?:youtu\.be\/)([\w-]{11})/,
    /(?:youtube\.com\/embed\/)([\w-]{11})/,
  ];
  for (const p of patterns) {
    const match = url.match(p);
    if (match) return match[1];
  }
  return null;
}

function isDirectVideo(url: string): boolean {
  return /\.(mp4|webm|mov|m4v)(\?|$)/i.test(url);
}

export function VideoPlayer({
  video,
  onClose,
}: {
  video: VideoEntry;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const ytId = getYouTubeId(video.url);
  const isPlaceholder = !video.url || video.url === "#";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className={`fixed inset-0 ${Z.modal} bg-black/90 backdrop-blur flex items-center justify-center p-4 md:p-10`}
      role="dialog"
      aria-modal="true"
      aria-label={`Video: ${video.title}`}
    >
      <button
        onClick={onClose}
        aria-label="Close video"
        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white hover:text-neutral-950 flex items-center justify-center transition"
      >
        <X size={18} strokeWidth={1.5} />
      </button>

      <motion.div
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        className="relative w-full max-w-5xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Player frame — 16:9 aspect, black backing so letterboxing reads
            cleanly for non-16:9 sources. */}
        <div className="relative aspect-video bg-black rounded-2xl overflow-hidden ring-1 ring-white/10">
          {ytId ? (
            <iframe
              src={`https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0&modestbranding=1`}
              title={video.title}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : isPlaceholder ? (
            <PlaceholderState video={video} />
          ) : isDirectVideo(video.url) ? (
            <video
              src={video.url}
              poster={video.thumb}
              controls
              autoPlay
              className="absolute inset-0 w-full h-full object-contain bg-black"
            >
              Your browser does not support embedded video.
            </video>
          ) : (
            // Unknown URL scheme — render as iframe and hope for the best.
            // Real production builds should rely on YouTube/direct-video URLs;
            // this branch is a graceful fallback rather than a primary path.
            <iframe
              src={video.url}
              title={video.title}
              className="absolute inset-0 w-full h-full border-0"
              allowFullScreen
            />
          )}
        </div>

        {/* Metadata bar — title, day chip, duration, description. Sits below
            the player so it doesn't compete with the video for attention. */}
        <div className="mt-5 md:mt-6 text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] uppercase text-white/70">
            {video.day && (
              <span
                className="inline-flex items-center px-2.5 py-1 rounded-sm"
                style={{ backgroundColor: `${BRAND}cc`, color: "#fff" }}
              >
                {video.day}
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <Clock size={11} strokeWidth={1.5} /> {video.duration}
            </span>
          </div>
          <h3
            className="mt-3 tracking-[-0.02em]"
            style={{
              fontSize: "clamp(1.25rem, 2.2vw, 1.75rem)",
              lineHeight: 1.15,
            }}
          >
            {video.title}
          </h3>
          {video.description && (
            <p
              className="mt-2 text-white/65 max-w-3xl"
              style={{ lineHeight: 1.6 }}
            >
              {video.description}
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function PlaceholderState({ video }: { video: VideoEntry }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Blurred poster behind so the slot doesn't read as empty. */}
      <img
        src={video.thumb}
        alt=""
        className="absolute inset-0 w-full h-full object-cover opacity-25 scale-110 blur-md"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
      <div className="relative text-center px-6 max-w-md">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
          style={{ backgroundColor: `${BRAND}22`, color: BRAND }}
        >
          <Film size={22} strokeWidth={1.5} />
        </div>
        <div
          className="mt-5 text-white tracking-tight"
          style={{ fontSize: "1.25rem", lineHeight: 1.25 }}
        >
          Available after the event
        </div>
        <p className="mt-2 text-white/65 text-sm" style={{ lineHeight: 1.55 }}>
          The video for this session will go live here once FISC 2026 wraps —
          June 29 to July 2 in Port of Spain.
        </p>
        <a
          href="data:text/calendar;charset=utf-8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0ASUMMARY:FISC%202026%20Trinidad%20%26%20Tobago%0ADTSTART:20260629T130000Z%0ADTEND:20260702T230000Z%0ALOCATION:Hyatt%20Regency%2C%201%20Wrightson%20Road%2C%20Port%20of%20Spain%0AEND:VEVENT%0AEND:VCALENDAR"
          download="fisc-2026.ics"
          className="group mt-5 inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white/10 border border-white/20 text-white text-sm hover:bg-white hover:text-neutral-950 transition"
        >
          <Calendar size={14} strokeWidth={1.5} />
          Add the event to my calendar
          <Download
            size={12}
            strokeWidth={1.5}
            className="opacity-60 group-hover:opacity-100 transition"
          />
        </a>
      </div>
    </div>
  );
}
