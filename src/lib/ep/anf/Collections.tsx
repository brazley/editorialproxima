import { cx } from "../util";
import { Img } from "../Img";
import { ImageCarousel, type ImageCarouselProps } from "../ImageCarousel";
import { ASPECT, MEDIA_RADIUS_CLASS, type AspectRatio } from "../media";

/* ==================================================================== *
   ANF · COLLECTIONS
   Gallery (built on ImageCarousel) · Mosaic (tiled multi-image grid).
 * ==================================================================== */

/** ANF: Gallery — a swipeable photo gallery. Wraps ImageCarousel. */
export function Gallery(props: ImageCarouselProps) {
  return <ImageCarousel {...props} />;
}

export interface MosaicImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface MosaicProps {
  images: MosaicImage[];
  /** Tile aspect for the non-lead tiles. Default 1/1. */
  aspect?: AspectRatio;
  /** Let the first image span a 2×2 lead tile. Default true. */
  feature?: boolean;
  className?: string;
}

/**
 * ANF: Mosaic — a tiled, gap-consistent image grid. The lead image can
 * span a 2×2 feature tile; the rest fill a responsive grid. Distinct from
 * Gallery: all tiles are visible at once, no scrolling.
 */
export function Mosaic({ images, aspect = "1/1", feature = true, className }: MosaicProps) {
  return (
    <div className={cx("grid grid-cols-2 gap-2.5 sm:grid-cols-4", className)}>
      {images.map((img, i) => {
        const lead = feature && i === 0;
        return (
          <figure
            key={img.src}
            className={cx(
              "relative m-0 overflow-hidden",
              MEDIA_RADIUS_CLASS.card,
              lead && "col-span-2 row-span-2",
            )}
          >
            <Img
              src={img.src}
              alt={img.alt}
              ratio={lead ? "1 / 1" : ASPECT[aspect]}
              priority={i === 0}
              className={cx("h-full border border-line", MEDIA_RADIUS_CLASS.card)}
            />
            {img.caption && (
              <>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                  style={{ background: "linear-gradient(to top, rgba(10,10,10,0.8), rgba(10,10,10,0))" }}
                  aria-hidden
                />
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-3 text-[12px] leading-snug text-ink"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {img.caption}
                </figcaption>
              </>
            )}
          </figure>
        );
      })}
    </div>
  );
}
