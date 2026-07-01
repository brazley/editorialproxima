import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { cx } from "./util";
import { ASPECT, MEDIA_RADIUS_CLASS, formatTime, type AspectRatio, type MediaRadius } from "./media";

export type VideoMode = "player" | "ambient";

export interface VideoSource {
  src: string;
  /** MIME type, e.g. "video/webm" or "video/mp4". */
  type?: string;
}

export interface VideoProps {
  /** Single source. Prefer `sources` when you have multiple codecs. */
  src?: string;
  /**
   * Ordered sources — the browser picks the first it can decode. List
   * broadly-supported codecs first (WebM/VP9) with an MP4/H.264 fallback,
   * so both open-source engines and Safari play something.
   */
  sources?: VideoSource[];
  /** Poster still, shown before play (and while the ambient loop loads). */
  poster?: string;
  /**
   * `player` = click-to-play with a custom editorial control bar.
   * `ambient` = muted autoplay loop for backgrounds; respects
   * prefers-reduced-motion (falls back to the static poster).
   */
  mode?: VideoMode;
  aspect?: AspectRatio;
  radius?: MediaRadius;
  loop?: boolean;
  /** Accessible label / caption context. Required for player mode a11y. */
  label?: string;
  /** Editorial caption under the frame (player mode). */
  caption?: ReactNode;
  credit?: ReactNode;
  className?: string;
}

/**
 * Video — a media player in the system aesthetic. Ratio-locked box, poster
 * + skeleton, lazy. Two modes: a click-to-play `player` with a custom
 * control bar (play/pause, mute, scrubber); and an `ambient` muted autoplay
 * loop for backgrounds that honors prefers-reduced-motion.
 *
 * Note: the transport chrome is intentionally monochrome WHITE (not the
 * theme accent) over a scrim, so it stays legible on arbitrary footage.
 * This is the one place in the system that is deliberately not theme-tinted.
 */
export function Video({
  src,
  sources,
  poster,
  mode = "player",
  aspect = "16/9",
  radius = "card",
  loop = mode === "ambient",
  label = "Video",
  caption,
  credit,
  className,
}: VideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(mode === "ambient");
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [reduced, setReduced] = useState(false);
  const ambient = mode === "ambient";

  // Honor prefers-reduced-motion for the ambient loop.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener?.("change", apply);
    return () => mq.removeEventListener?.("change", apply);
  }, []);

  // Ambient: autoplay unless reduced-motion; then pause on the poster.
  useEffect(() => {
    const v = ref.current;
    if (!v || !ambient) return;
    if (reduced) {
      v.pause();
    } else {
      v.play().catch(() => {
        /* autoplay may be blocked; poster remains — acceptable for ambient */
      });
    }
  }, [ambient, reduced]);

  function togglePlay() {
    const v = ref.current;
    if (!v) return;
    if (v.paused) v.play().catch(() => {});
    else v.pause();
  }

  function toggleMute() {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (ambient) return;
    const v = ref.current;
    if (!v) return;
    if (e.key === " " || e.key === "k") {
      e.preventDefault();
      togglePlay();
    } else if (e.key === "m") {
      e.preventDefault();
      toggleMute();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      v.currentTime = Math.min(v.duration || 0, v.currentTime + 5);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      v.currentTime = Math.max(0, v.currentTime - 5);
    }
  }

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const v = ref.current;
    if (!v || !duration) return;
    const t = (Number(e.target.value) / 100) * duration;
    v.currentTime = t;
    setCurrent(t);
  }

  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <figure className={cx("m-0", className)}>
      <div
        className={cx(
          "group relative overflow-hidden border border-line bg-elevated",
          MEDIA_RADIUS_CLASS[radius],
        )}
        style={{ aspectRatio: ASPECT[aspect] }}
        role={ambient ? "presentation" : "group"}
        aria-label={ambient ? undefined : label}
        aria-hidden={ambient ? true : undefined}
        tabIndex={ambient ? -1 : 0}
        onKeyDown={onKeyDown}
      >
        {/* skeleton — clears once metadata is known */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, var(--color-elevated) 30%, color-mix(in oklch, var(--color-line-strong) 60%, var(--color-elevated)) 50%, var(--color-elevated) 70%)",
            opacity: ready ? 0 : 1,
            transition: "opacity 0.5s ease",
          }}
          aria-hidden
        />

        <video
          ref={ref}
          src={sources && sources.length ? undefined : src}
          poster={poster}
          muted={ambient ? true : muted}
          loop={loop}
          playsInline
          preload={ambient ? "auto" : "metadata"}
          autoPlay={ambient && !reduced}
          tabIndex={-1}
          aria-label={ambient ? undefined : label}
          className="absolute inset-0 h-full w-full object-cover transition-opacity duration-500"
          style={{ opacity: ready ? 1 : 0 }}
          onLoadedMetadata={(e) => {
            setReady(true);
            setDuration(e.currentTarget.duration || 0);
          }}
          onLoadedData={() => setReady(true)}
          onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onClick={ambient ? undefined : togglePlay}
        >
          {sources?.map((s) => (
            <source key={s.src} src={s.src} type={s.type} />
          ))}
        </video>

        {!ambient && (
          <>
            {/* center play affordance — shown while paused */}
            {!playing && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play video"
                className="absolute inset-0 grid place-items-center"
              >
                <span
                  className="grid h-14 w-14 place-items-center rounded-full border backdrop-blur-md transition-transform hover:scale-105"
                  style={{
                    borderColor: "rgba(255,255,255,0.5)",
                    background: "rgba(10,10,10,0.42)",
                  }}
                >
                  <Play size={22} style={{ color: "#ffffff", marginLeft: 2 }} />
                </span>
              </button>
            )}

            {/* control bar — reveals on hover/focus, or stays while playing */}
            <div
              className={cx(
                "absolute inset-x-0 bottom-0 flex items-center gap-3 px-3.5 py-2.5 transition-opacity duration-200",
                playing ? "opacity-0 group-hover:opacity-100 focus-within:opacity-100" : "opacity-100",
              )}
              style={{
                background: "linear-gradient(to top, rgba(10,10,10,0.9), rgba(10,10,10,0) )",
              }}
            >
              {/* transport chrome is intentionally monochrome WHITE (not the
                  theme accent) so it reads cleanly over arbitrary footage. */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={playing ? "Pause" : "Play"}
                className="shrink-0 text-white/90 transition-colors hover:text-white"
              >
                {playing ? <Pause size={16} /> : <Play size={16} />}
              </button>

              <span className="tnum shrink-0 text-[11px] text-white/90">{formatTime(current)}</span>

              <input
                type="range"
                min={0}
                max={100}
                step={0.1}
                value={progress}
                onChange={seek}
                aria-label="Seek"
                className="ep-scrub ep-scrub-white h-1 min-w-0 flex-1"
                style={{
                  background: `linear-gradient(to right, rgba(255,255,255,0.92) ${progress}%, rgba(255,255,255,0.28) ${progress}%)`,
                }}
              />

              <span className="tnum shrink-0 text-[11px] text-white/55">{formatTime(duration)}</span>

              <button
                type="button"
                onClick={toggleMute}
                aria-label={muted ? "Unmute" : "Mute"}
                className="shrink-0 text-white/80 transition-colors hover:text-white"
              >
                {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>
            </div>
          </>
        )}

        {/* ambient + reduced-motion: a quiet marker that motion is paused */}
        {ambient && reduced && (
          <span className="absolute bottom-2 right-2.5 rounded-chip border border-line bg-canvas/70 px-1.5 py-0.5 text-[10px] text-ink-3">
            motion paused
          </span>
        )}
      </div>

      {(caption || credit) && (
        <figcaption className="mt-2.5">
          {caption && (
            <span
              className="block text-[12.5px] leading-relaxed text-ink-3"
              style={{ fontFamily: "var(--font-serif)" }}
            >
              {caption}
            </span>
          )}
          {credit && <span className="tnum mt-0.5 block text-[10.5px] text-ink-3/80">{credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
