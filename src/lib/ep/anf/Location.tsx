import type { ReactNode } from "react";
import { MapPin, Navigation } from "lucide-react";
import { cx } from "../util";
import { MEDIA_RADIUS_CLASS } from "../media";

/* ==================================================================== *
   ANF · LOCATION (representative)
   Map — a styled map card with an accent pin (no live tile provider).
   Place — a location caption (pin + name + address).
 * ==================================================================== */

/**
 * ANF: Map — a representative map card. Renders a stylized dark graticule
 * with an accent location pin rather than a live tile map (no provider /
 * API key). Swap the inner surface for a real map in production.
 */
export function MapCard({
  place,
  coords,
  caption,
  className,
}: {
  place: string;
  coords?: string;
  caption?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cx("m-0", className)}>
      <div
        className={cx("relative overflow-hidden border border-line bg-surface", MEDIA_RADIUS_CLASS.card)}
        style={{ aspectRatio: "16 / 9" }}
        role="img"
        aria-label={`Map: ${place}`}
      >
        {/* graticule */}
        <svg className="absolute inset-0 h-full w-full" aria-hidden>
          <defs>
            <pattern id="ep-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M40 0H0V40" fill="none" stroke="var(--color-line)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ep-grid)" />
          {/* a couple of "roads" */}
          <path d="M0 70 L120 70 L180 130 L360 130" fill="none" stroke="var(--color-line-strong)" strokeWidth="3" />
          <path d="M240 0 L240 90 L300 150 L300 300" fill="none" stroke="var(--color-line-strong)" strokeWidth="3" />
        </svg>
        {/* accent pin + glow — recolors with the theme */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span
            className="absolute -inset-6 rounded-full"
            style={{ background: "var(--ep-accent-glow)" }}
            aria-hidden
          />
          <MapPin size={30} style={{ color: "var(--color-accent)" }} fill="color-mix(in oklch, var(--color-accent) 30%, transparent)" />
        </div>
        {coords && (
          <span className="tnum absolute bottom-2.5 right-2.5 rounded-chip border border-line bg-canvas/75 px-1.5 py-0.5 text-[10.5px] text-ink-3">
            {coords}
          </span>
        )}
        <span className="absolute left-2.5 top-2.5 rounded-chip border border-line bg-canvas/75 px-1.5 py-0.5 text-[10px] text-ink-3">
          Map · representative
        </span>
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-[12.5px] leading-relaxed text-ink-3" style={{ fontFamily: "var(--font-serif)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/** ANF: Place — a location caption: pin + name + address. */
export function Place({
  name,
  address,
  className,
}: {
  name: ReactNode;
  address?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("flex items-start gap-2.5 rounded-card border border-line bg-surface px-3.5 py-3", className)}>
      <Navigation size={15} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
      <div className="min-w-0">
        <div className="text-[13.5px] font-medium text-ink">{name}</div>
        {address && <div className="mt-0.5 text-[12px] text-ink-3">{address}</div>}
      </div>
    </div>
  );
}
