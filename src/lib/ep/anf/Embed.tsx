import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Play, Pause, Volume2, VolumeX, ExternalLink, Code2 } from "lucide-react";
import { cx } from "../util";
import { Img } from "../Img";
import { formatTime, MEDIA_RADIUS_CLASS } from "../media";
import type { VideoSource } from "../Video";

/* ==================================================================== *
   ANF · MULTIMEDIA (embeds & audio)
   EmbedWebVideo — a REPRESENTATIVE web-video card (no live third-party
   SDK). Audio / Music — a working audio player in the EP aesthetic.
 * ==================================================================== */

export type WebVideoPlatform = "youtube" | "vimeo";

/**
 * ANF: EmbedWebVideo — a representative YouTube/Vimeo embed rendered as a
 * styled poster card in the EP aesthetic. NOT a live embed / SDK: it shows
 * the platform, title, and a play affordance, and links out. Swap for a
 * real iframe in production if your policy allows third-party embeds.
 */
export function EmbedWebVideo({
  platform,
  poster,
  title,
  channel,
  duration,
  href = "#",
  className,
}: {
  platform: WebVideoPlatform;
  poster: string;
  title: ReactNode;
  channel?: string;
  duration?: string;
  href?: string;
  className?: string;
}) {
  const label = platform === "youtube" ? "YouTube" : "Vimeo";
  return (
    <figure className={cx("m-0", className)}>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={cx("group relative block overflow-hidden border border-line", MEDIA_RADIUS_CLASS.card)}
        style={{ aspectRatio: "16 / 9" }}
        aria-label={`${label}: ${typeof title === "string" ? title : "video"} (opens externally)`}
      >
        <Img src={poster} alt="" ratio="16 / 9" className="h-full" />
        <span className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,10,10,0.7), rgba(10,10,10,0) 55%)" }} aria-hidden />
        {/* accent play affordance — recolors with the theme */}
        <span className="absolute inset-0 grid place-items-center">
          <span
            className="grid h-14 w-14 place-items-center rounded-full border backdrop-blur-md transition-transform group-hover:scale-105"
            style={{
              borderColor: "color-mix(in oklch, var(--color-accent) 50%, transparent)",
              background: "color-mix(in oklch, var(--color-accent) 16%, rgba(10,10,10,0.5))",
            }}
          >
            <Play size={22} style={{ color: "var(--color-accent-ink)", marginLeft: 2 }} />
          </span>
        </span>
        <span className="absolute left-3 top-3 rounded-chip border border-line bg-canvas/70 px-1.5 py-0.5 text-[10.5px] font-medium tracking-wide text-ink-2">
          {label}
        </span>
        {duration && (
          <span className="tnum absolute bottom-3 right-3 rounded-chip bg-canvas/80 px-1.5 py-0.5 text-[10.5px] text-ink-2">
            {duration}
          </span>
        )}
      </a>
      <figcaption className="mt-2.5 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="display text-[14px] font-semibold leading-snug text-ink">{title}</div>
          {channel && <div className="mt-0.5 text-[12px] text-ink-3">{channel}</div>}
        </div>
        <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-[11px] text-ink-3">
          Representative <ExternalLink size={11} />
        </span>
      </figcaption>
    </figure>
  );
}

/* ------------------------------ audio ------------------------------ */

export type AudioVariant = "music" | "audio";

/**
 * ANF: Audio & Music — a working audio player with the EP control bar
 * (play/pause, mute, accent scrubber). `music` shows artwork + track /
 * artist; `audio` is a compact inline bar for a spoken clip.
 */
export function AudioPlayer({
  sources,
  src,
  title,
  artist,
  artwork,
  variant = "music",
  className,
}: {
  sources?: VideoSource[];
  src?: string;
  title: ReactNode;
  artist?: ReactNode;
  artwork?: string;
  variant?: AudioVariant;
  className?: string;
}) {
  const ref = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);

  function toggle() {
    const a = ref.current;
    if (!a) return;
    if (a.paused) a.play().catch(() => {});
    else a.pause();
  }
  function toggleMute() {
    const a = ref.current;
    if (!a) return;
    a.muted = !a.muted;
    setMuted(a.muted);
  }
  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const a = ref.current;
    if (!a || !duration) return;
    a.currentTime = (Number(e.target.value) / 100) * duration;
    setCurrent(a.currentTime);
  }
  const progress = duration ? (current / duration) * 100 : 0;

  return (
    <div
      className={cx(
        "flex items-center gap-3.5 rounded-card border border-line bg-surface p-3.5",
        className,
      )}
    >
      {variant === "music" && artwork && (
        <img
          src={artwork}
          alt=""
          loading="lazy"
          className="h-14 w-14 shrink-0 rounded-chip border border-line object-cover"
        />
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause" : "Play"}
        className="grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-transform hover:scale-105"
        style={{
          borderColor: "color-mix(in oklch, var(--color-accent) 45%, transparent)",
          color: "var(--color-accent-ink)",
        }}
      >
        {playing ? <Pause size={17} /> : <Play size={17} style={{ marginLeft: 2 }} />}
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="truncate text-[13px] font-medium text-ink">{title}</div>
            {artist && <div className="truncate text-[11.5px] text-ink-3">{artist}</div>}
          </div>
          <span className="tnum shrink-0 text-[11px] text-ink-3">
            {formatTime(current)} / {formatTime(duration)}
          </span>
        </div>
        <input
          type="range"
          min={0}
          max={100}
          step={0.1}
          value={progress}
          onChange={seek}
          aria-label="Seek"
          className="ep-scrub mt-2 h-1 w-full"
          style={{ background: `linear-gradient(to right, var(--color-accent) ${progress}%, var(--color-line-strong) ${progress}%)` }}
        />
      </div>

      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Unmute" : "Mute"}
        className="shrink-0 text-ink-3 transition-colors hover:text-ink-2"
      >
        {muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
      </button>

      <audio
        ref={ref}
        src={sources && sources.length ? undefined : src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {sources?.map((s) => (
          <source key={s.src} src={s.src} type={s.type} />
        ))}
      </audio>
    </div>
  );
}

/* --------------------------- HTML embed ---------------------------- *
   Not a strict ANF role — the general HTML-embed capability that
   complements HTMLTable. Renders an arbitrary block of HTML, isolated
   in a sandboxed iframe by default.
 * ------------------------------------------------------------------- */

/**
 * HtmlEmbed — embed an arbitrary block of HTML.
 *
 * Default (`isolate`): the HTML is rendered inside a sandboxed iframe via
 * `srcDoc` with `sandbox="allow-scripts"` (no `allow-same-origin`), so the
 * markup, styles, and scripts run in isolation and cannot leak into or read
 * from the host page. The frame auto-sizes to its content; pass `height` as
 * a fallback. Opt-in `isolate={false}` renders TRUSTED HTML inline (scoped
 * container) — only ever pass HTML you control (XSS risk otherwise; note
 * that inline mode does not execute <script> tags).
 */
export function HtmlEmbed({
  html,
  isolate = true,
  title = "Embedded HTML",
  label = "HTML",
  caption,
  height,
  className,
}: {
  html: string;
  isolate?: boolean;
  title?: string;
  label?: string | null;
  caption?: ReactNode;
  height?: number;
  className?: string;
}) {
  const [autoH, setAutoH] = useState<number | undefined>(height);
  const idRef = useRef("epx-" + Math.random().toString(36).slice(2));

  const srcDoc = useMemo(() => {
    if (!isolate) return "";
    const id = idRef.current;
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>:root{color-scheme:dark}html,body{margin:0}body{background:transparent;color:#fafafa;font:14px/1.55 ui-sans-serif,system-ui,sans-serif}a{color:#5b8def}</style></head><body>${html}<script>(function(){function post(){parent.postMessage({__epx:"${id}",h:document.documentElement.scrollHeight},"*");}window.addEventListener("load",post);try{new ResizeObserver(post).observe(document.documentElement);}catch(e){}setTimeout(post,60);})();</script></body></html>`;
  }, [html, isolate]);

  useEffect(() => {
    if (!isolate) return;
    function onMsg(e: MessageEvent) {
      const d = e.data as { __epx?: string; h?: number } | null;
      if (d && d.__epx === idRef.current && typeof d.h === "number") {
        setAutoH(Math.max(40, Math.min(d.h, 2400)));
      }
    }
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [isolate]);

  return (
    <figure className={cx("m-0 overflow-hidden border border-line bg-surface", MEDIA_RADIUS_CLASS.card, className)}>
      {label && (
        <div className="flex items-center gap-2 border-b border-line px-3 py-1.5">
          <Code2 size={12} className="text-ink-3" />
          <span className="text-[10.5px] font-medium uppercase tracking-wide text-ink-3">{label}</span>
          {isolate && <span className="text-[10px] text-ink-3/70">· sandboxed</span>}
        </div>
      )}
      {isolate ? (
        <iframe
          title={title}
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          loading="lazy"
          className="block w-full border-0 bg-transparent"
          style={{ height: autoH ?? 240 }}
        />
      ) : (
        // Inline mode: TRUSTED html only — never pass user-supplied markup here.
        <div className="ep-html-inline p-4 text-ink-2" dangerouslySetInnerHTML={{ __html: html }} />
      )}
      {caption && (
        <figcaption className="border-t border-line px-3 py-2 text-[12px] text-ink-3">{caption}</figcaption>
      )}
    </figure>
  );
}
