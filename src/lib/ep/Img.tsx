import { useState } from "react";
import { cx } from "./util";

export interface ImgProps {
  src: string;
  alt: string;
  /** CSS aspect-ratio string, e.g. "3 / 2". Ignored if ratioClassName set. */
  ratio?: string;
  /** Responsive Tailwind aspect classes; overrides the `ratio` style. */
  ratioClassName?: string;
  className?: string;
  sizes?: string;
  /** Eager-load above-the-fold images. */
  priority?: boolean;
  /** object-fit for the image within its box. Default cover. */
  fit?: "cover" | "contain";
}

/**
 * Aspect-ratio-locked image with a skeleton shimmer and fade-in.
 *
 * The ratio box reserves space (zero layout shift); a faint animated
 * skeleton sits behind until the image paints, then the image fades in
 * over it — so a slow or missing tile never flashes a raw gray hole.
 */
export function Img({
  src,
  alt,
  ratio = "3 / 2",
  ratioClassName,
  className,
  sizes,
  priority = false,
  fit = "cover",
}: ImgProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cx("relative overflow-hidden bg-elevated", ratioClassName, className)}
      style={ratioClassName ? undefined : { aspectRatio: ratio }}
    >
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(100deg, var(--color-elevated) 30%, color-mix(in oklch, var(--color-line-strong) 60%, var(--color-elevated)) 50%, var(--color-elevated) 70%)",
          opacity: loaded ? 0 : 1,
          transition: "opacity 0.5s ease",
        }}
        aria-hidden
      />
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        className={cx(
          "absolute inset-0 h-full w-full transition-[opacity,transform] duration-500 ease-out",
          fit === "contain" ? "object-contain" : "object-cover",
        )}
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}
