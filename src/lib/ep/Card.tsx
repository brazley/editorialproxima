import type { HTMLAttributes, ReactNode } from "react";
import { cx } from "./util";

export type SurfaceTone = "surface" | "canvas" | "elevated";

interface SurfaceProps extends HTMLAttributes<HTMLDivElement> {
  /** Fill tone. `canvas` reads as inset/nested within a surface. */
  tone?: SurfaceTone;
  /** Border warms to line-strong on hover — good for interactive cards. */
  interactive?: boolean;
  /** Lay the faint accent glow behind the content (AI/verified context). */
  glow?: boolean;
  children?: ReactNode;
}

const toneClass: Record<SurfaceTone, string> = {
  surface: "bg-surface",
  canvas: "bg-canvas/40",
  elevated: "bg-elevated",
};

/**
 * Card — the primary content container. 4px squared radius, hairline
 * border, surface fill. The building block for feed posts, tiles, and
 * most everything that isn't a full-width rail.
 */
export function Card({
  tone = "surface",
  interactive = false,
  glow = false,
  className,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-card border border-line",
        toneClass[tone],
        interactive && "transition-colors hover:border-line-strong",
        className,
      )}
      {...rest}
    >
      {glow && <div className="glow-field pointer-events-none absolute inset-0" />}
      {glow ? <div className="relative">{children}</div> : children}
    </div>
  );
}

/**
 * Panel — the larger container: sidebar rails, mastheads, full-width
 * sections. Same anatomy as Card but a softer 6px radius for scale.
 */
export function Panel({
  tone = "surface",
  interactive = false,
  glow = false,
  className,
  children,
  ...rest
}: SurfaceProps) {
  return (
    <div
      className={cx(
        "relative overflow-hidden rounded-panel border border-line",
        toneClass[tone],
        interactive && "transition-colors hover:border-line-strong",
        className,
      )}
      {...rest}
    >
      {glow && <div className="glow-field pointer-events-none absolute inset-0" />}
      {glow ? <div className="relative">{children}</div> : children}
    </div>
  );
}
