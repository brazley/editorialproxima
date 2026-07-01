import type { ReactNode } from "react";
import { cx } from "../util";
import { Image } from "../Image";
import type { AspectRatio } from "../media";

/* ==================================================================== *
   ANF · VISUAL MEDIA roles that build on the Image component.
   Image (see ../Image) · Photo · Figure · Portrait · Logo.
 * ==================================================================== */

/** ANF: Photo — a photograph. Image with a photo-typical 3/2 default. */
export function Photo({
  src,
  alt,
  aspect = "3/2",
  priority,
  className,
}: {
  src: string;
  alt: string;
  aspect?: AspectRatio;
  priority?: boolean;
  className?: string;
}) {
  return <Image src={src} alt={alt} aspect={aspect} priority={priority} className={className} />;
}

/** ANF: Figure — an image with a required editorial caption / credit. */
export function Figure({
  src,
  alt,
  caption,
  credit,
  kicker,
  aspect = "3/2",
  className,
}: {
  src: string;
  alt: string;
  caption: ReactNode;
  credit?: ReactNode;
  kicker?: string;
  aspect?: AspectRatio;
  className?: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      aspect={aspect}
      caption={caption}
      credit={credit}
      kicker={kicker}
      className={className}
    />
  );
}

/** ANF: Portrait — a portrait-orientation image (4/5), for a person. */
export function Portrait({
  src,
  alt,
  caption,
  className,
}: {
  src: string;
  alt: string;
  caption?: ReactNode;
  className?: string;
}) {
  return <Image src={src} alt={alt} aspect="4/5" caption={caption} className={className} />;
}

/** ANF: Logo — a contained brand mark on a surface tile. */
export function Logo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cx("grid place-items-center rounded-card border border-line bg-surface p-5", className)}>
      <img src={src} alt={alt} loading="lazy" decoding="async" className="max-h-14 w-auto object-contain" />
    </div>
  );
}
