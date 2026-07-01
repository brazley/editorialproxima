import type { ReactNode } from "react";
import { Heart, MessageCircle, Repeat2, Bookmark } from "lucide-react";
import { cx } from "../util";
import { Avatar } from "../Avatar";
import { Img } from "../Img";

/* ==================================================================== *
   ANF · SOCIAL (representative embed chrome)
   Tweet · Instagram · FacebookPost — styled cards mimicking each
   platform's chrome in the EP aesthetic, with sample content. These are
   REPRESENTATIVE, not live third-party SDK embeds.
 * ==================================================================== */

function PlatformTag({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-chip border border-line bg-elevated px-1.5 py-0.5 text-[10px] font-medium tracking-wide text-ink-3">
      {label} · representative
    </span>
  );
}

function Stat({ icon: Icon, value }: { icon: typeof Heart; value: string }) {
  return (
    <span className="inline-flex items-center gap-1 text-[12px] text-ink-3">
      <Icon size={13} />
      <span className="tnum">{value}</span>
    </span>
  );
}

/** ANF: Tweet — a representative X/Twitter post card. */
export function Tweet({
  author,
  handle,
  timestamp,
  children,
  likes = "1.2K",
  reposts = "340",
  replies = "56",
  className,
}: {
  author: string;
  handle: string;
  timestamp?: string;
  children: ReactNode;
  likes?: string;
  reposts?: string;
  replies?: string;
  className?: string;
}) {
  return (
    <article className={cx("rounded-card border border-line bg-surface p-4", className)}>
      <div className="flex items-start gap-3">
        <Avatar name={author} size={40} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-[13.5px] font-semibold text-ink">{author}</div>
              <div className="truncate text-[12px] text-ink-3">{handle}</div>
            </div>
            <span className="display shrink-0 text-[18px] leading-none text-ink-2" aria-hidden>𝕏</span>
          </div>
        </div>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-ink">{children}</p>
      {timestamp && <div className="mt-2 text-[12px] text-ink-3">{timestamp}</div>}
      <div className="mt-3 flex items-center gap-5 border-t border-line pt-3">
        <Stat icon={MessageCircle} value={replies} />
        <Stat icon={Repeat2} value={reposts} />
        <Stat icon={Heart} value={likes} />
        <span className="ml-auto"><PlatformTag label="X" /></span>
      </div>
    </article>
  );
}

/** ANF: Instagram — a representative Instagram post card. */
export function Instagram({
  author,
  handle,
  image,
  imageAlt = "",
  caption,
  likes = "8,204",
  className,
}: {
  author: string;
  handle?: string;
  image: string;
  imageAlt?: string;
  caption?: ReactNode;
  likes?: string;
  className?: string;
}) {
  return (
    <article className={cx("overflow-hidden rounded-card border border-line bg-surface", className)}>
      <div className="flex items-center gap-2.5 p-3">
        <Avatar name={author} size={30} tint="sand" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[12.5px] font-semibold text-ink">{handle ?? author}</div>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-3">Instagram</span>
      </div>
      <Img src={image} alt={imageAlt} ratio="1 / 1" />
      <div className="p-3">
        <div className="flex items-center gap-4">
          <Stat icon={Heart} value={likes} />
          <Stat icon={MessageCircle} value="112" />
          <Bookmark size={14} className="ml-auto text-ink-3" />
        </div>
        {caption && (
          <p className="mt-2 text-[13px] leading-relaxed text-ink">
            <span className="font-semibold">{handle ?? author}</span> {caption}
          </p>
        )}
        <div className="mt-2.5"><PlatformTag label="Instagram" /></div>
      </div>
    </article>
  );
}

/** ANF: FacebookPost — a representative Facebook post card. */
export function FacebookPost({
  author,
  timestamp,
  children,
  image,
  imageAlt = "",
  likes = "2.4K",
  comments = "318",
  className,
}: {
  author: string;
  timestamp?: string;
  children?: ReactNode;
  image?: string;
  imageAlt?: string;
  likes?: string;
  comments?: string;
  className?: string;
}) {
  return (
    <article className={cx("overflow-hidden rounded-card border border-line bg-surface", className)}>
      <div className="flex items-center gap-2.5 p-3.5">
        <Avatar name={author} size={38} shape="square" tint="accent" />
        <div className="min-w-0 flex-1">
          <div className="truncate text-[13px] font-semibold text-ink">{author}</div>
          {timestamp && <div className="text-[11.5px] text-ink-3">{timestamp}</div>}
        </div>
        <span className="display shrink-0 text-[17px] font-bold leading-none text-ink-2" aria-hidden>f</span>
      </div>
      {children && <p className="px-3.5 pb-3 text-[13.5px] leading-relaxed text-ink">{children}</p>}
      {image && <Img src={image} alt={imageAlt} ratio="16 / 9" />}
      <div className="flex items-center gap-5 p-3.5">
        <Stat icon={Heart} value={likes} />
        <Stat icon={MessageCircle} value={comments} />
        <span className="ml-auto"><PlatformTag label="Facebook" /></span>
      </div>
    </article>
  );
}
