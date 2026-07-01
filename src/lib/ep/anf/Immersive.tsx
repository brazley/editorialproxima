import type { ReactNode } from "react";
import { Box, Rotate3d } from "lucide-react";
import { cx } from "../util";
import { Img } from "../Img";
import { MEDIA_RADIUS_CLASS } from "../media";

/* ==================================================================== *
   ANF · IMMERSIVE (representative)
   ARKit — a poster + "View in AR / 3D" affordance. This is a tasteful
   representative component, NOT a working AR pipeline.
 * ==================================================================== */

/**
 * ANF: ARKit — a representative AR/3D object card: a poster still with a
 * corner "3D" badge and an accent "View in AR / 3D" affordance. It does
 * not load a real AR experience; wire it to a `<model-viewer>` or an
 * AR Quick Look `.usdz` in production.
 */
export function ARViewer({
  poster,
  posterAlt = "",
  title,
  className,
  onView,
}: {
  poster: string;
  posterAlt?: string;
  title?: ReactNode;
  className?: string;
  onView?: () => void;
}) {
  return (
    <figure className={cx("m-0", className)}>
      <div
        className={cx("relative overflow-hidden border border-line bg-elevated", MEDIA_RADIUS_CLASS.card)}
        style={{ aspectRatio: "4 / 3" }}
      >
        <Img src={poster} alt={posterAlt} ratio="4 / 3" className="h-full" />
        <span
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(10,10,10,0.72), rgba(10,10,10,0) 60%)" }}
          aria-hidden
        />
        {/* 3D badge */}
        <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-chip border border-line bg-canvas/70 px-1.5 py-0.5 text-[10.5px] font-medium text-ink-2">
          <Box size={11} /> 3D · representative
        </span>
        {/* rotating hint glyph */}
        <span className="absolute right-3 top-3 text-ink-2/70">
          <Rotate3d size={18} />
        </span>
        {/* accent affordance */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 p-3.5">
          {title && <span className="display min-w-0 truncate text-[14px] font-semibold text-ink">{title}</span>}
          <button
            type="button"
            onClick={onView}
            className="ml-auto inline-flex shrink-0 items-center gap-1.5 rounded-field px-3 py-1.5 text-[12.5px] font-medium text-canvas transition-transform hover:scale-[1.015] active:scale-[0.99]"
            style={{ background: "var(--color-accent-strong)" }}
          >
            <Box size={14} />
            View in AR / 3D
          </button>
        </div>
      </div>
    </figure>
  );
}
