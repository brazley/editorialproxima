import type { ReactNode } from "react";
import { cx } from "./util";
import { Img } from "./Img";
import { ASPECT, MEDIA_RADIUS_CLASS, type AspectRatio, type MediaRadius } from "./media";

export interface ImageProps {
  src: string;
  alt: string;
  /** Named aspect ratio — locks the box so there's zero layout shift. */
  aspect?: AspectRatio;
  /** object-fit within the box. Default cover. */
  fit?: "cover" | "contain";
  /** System radius for the frame. Default card. */
  radius?: MediaRadius;
  /** Editorial caption — small, serif, ink-3. */
  caption?: ReactNode;
  /** Credit line — mono, dimmer still (e.g. "Photo · Unsplash"). */
  credit?: ReactNode;
  /** Small uppercase kicker above the caption. */
  kicker?: string;
  /** Eager-load for hero/above-the-fold. Lazy by default. */
  priority?: boolean;
  sizes?: string;
  className?: string;
}

/**
 * Image — the editorial image component. A ratio-locked, skeleton-and-fade
 * media box (via the low-level Img) wrapped in a `<figure>` with an
 * optional caption / credit / kicker set in the system's editorial voice.
 *
 * Lazy by default; pass `priority` for a hero. The caption is serif and
 * quiet; the credit is mono and quieter — a newspaper photo line, not a
 * label. With no caption/credit it renders a bare framed image.
 */
export function Image({
  src,
  alt,
  aspect = "3/2",
  fit = "cover",
  radius = "card",
  caption,
  credit,
  kicker,
  priority = false,
  sizes,
  className,
}: ImageProps) {
  const hasMeta = Boolean(caption || credit || kicker);
  return (
    <figure className={cx("m-0", className)}>
      <Img
        src={src}
        alt={alt}
        ratio={ASPECT[aspect]}
        fit={fit}
        priority={priority}
        sizes={sizes}
        className={cx("border border-line", MEDIA_RADIUS_CLASS[radius])}
      />
      {hasMeta && (
        <figcaption className="mt-2.5">
          {kicker && (
            <span className="mb-1 block text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-3">
              {kicker}
            </span>
          )}
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
