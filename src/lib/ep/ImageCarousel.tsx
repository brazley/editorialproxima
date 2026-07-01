import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cx } from "./util";
import { Img } from "./Img";
import { ASPECT, MEDIA_RADIUS_CLASS, type AspectRatio, type MediaRadius } from "./media";

export interface CarouselSlide {
  src: string;
  alt: string;
  /** Optional editorial caption overlaid at the foot of the slide. */
  caption?: string;
}

export interface ImageCarouselProps {
  slides: CarouselSlide[];
  aspect?: AspectRatio;
  radius?: MediaRadius;
  /** Show prev/next arrows. Default true. */
  arrows?: boolean;
  /** Show dot index indicators. Default true. */
  dots?: boolean;
  className?: string;
  /** Accessible label for the whole gallery. */
  label?: string;
}

/**
 * ImageCarousel — a horizontal, swipeable photo gallery. Distinct from the
 * data Carousel: this is aspect-consistent full-bleed slides with
 * scroll-snap, prev/next arrows, dot indicators, and keyboard nav. The
 * active dot and the arrow affordances use the reserved accent, so they
 * recolor with the active theme. Images are lazy and fade in.
 */
export function ImageCarousel({
  slides,
  aspect = "16/9",
  radius = "card",
  arrows = true,
  dots = true,
  className,
  label = "Image gallery",
}: ImageCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const count = slides.length;

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    track.scrollTo({ left: clamped * track.clientWidth, behavior: "smooth" });
  }, [count]);

  // Track the active slide from scroll position.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const i = Math.round(track.scrollLeft / track.clientWidth);
        setActive(i);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  }

  return (
    <div
      className={cx("group relative", className)}
      role="group"
      aria-roledescription="carousel"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div
        ref={trackRef}
        className={cx(
          "no-scrollbar flex snap-x snap-mandatory overflow-x-auto",
          MEDIA_RADIUS_CLASS[radius],
        )}
      >
        {slides.map((s, i) => (
          <div
            key={s.src}
            className="relative w-full shrink-0 snap-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${count}`}
          >
            <Img
              src={s.src}
              alt={s.alt}
              ratio={ASPECT[aspect]}
              priority={i === 0}
              className={cx("border border-line", MEDIA_RADIUS_CLASS[radius])}
            />
            {s.caption && (
              <>
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
                  style={{ background: "linear-gradient(to top, rgba(10,10,10,0.85), rgba(10,10,10,0))" }}
                  aria-hidden
                />
                <figcaption
                  className="absolute inset-x-0 bottom-0 p-4 text-[12.5px] leading-snug text-ink"
                  style={{ fontFamily: "var(--font-serif)" }}
                >
                  {s.caption}
                </figcaption>
              </>
            )}
          </div>
        ))}
      </div>

      {arrows && count > 1 && (
        <>
          <CarouselArrow side="left" disabled={active === 0} onClick={() => goTo(active - 1)} />
          <CarouselArrow side="right" disabled={active === count - 1} onClick={() => goTo(active + 1)} />
        </>
      )}

      {dots && count > 1 && (
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {slides.map((_, i) => {
            const on = i === active;
            return (
              <button
                key={i}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                aria-current={on ? "true" : undefined}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{
                  width: on ? 18 : 6,
                  background: on ? "var(--color-accent)" : "var(--color-line-strong)",
                }}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

function CarouselArrow({
  side,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
      className={cx(
        "absolute top-1/2 z-10 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full border backdrop-blur-md transition-all",
        side === "left" ? "left-3" : "right-3",
        "opacity-0 group-hover:opacity-100 focus-visible:opacity-100",
        disabled ? "cursor-not-allowed !opacity-0" : "hover:scale-105",
      )}
      style={{
        borderColor: "color-mix(in oklch, var(--color-accent) 40%, var(--color-line-strong))",
        background: "rgba(10,10,10,0.55)",
        color: "var(--color-accent-ink)",
      }}
    >
      {side === "left" ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
    </button>
  );
}
