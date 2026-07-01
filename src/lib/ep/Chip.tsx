import type { ReactNode } from "react";
import { color } from "../../tokens";
import { cx } from "./util";

/* ------------------------------------------------------------------ *
   The chip family: the smallest labels in the system. All share the
   squared 3px radius and hairline border. Grouped here because they are
   variations on one idea — a tiny, bordered, non-pill token.
 * ------------------------------------------------------------------ */

export interface BadgeProps {
  children: ReactNode;
  className?: string;
}

/** Neutral tag — a plain metadata token. Squared, never a pill. */
export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-chip border border-line bg-elevated px-2 py-0.5 text-[11px] font-medium text-ink-2",
        className,
      )}
    >
      {children}
    </span>
  );
}

export type PillTone = "plain" | "accent" | "gold";

export interface TypePillProps {
  label: string;
  /** `accent` = AI/verified type, `gold` = award/recognition, else plain. */
  tone?: PillTone;
  className?: string;
}

/** Uppercase category / type pill — the tracked, all-caps classifier. */
export function TypePill({ label, tone = "plain", className }: TypePillProps) {
  const fg =
    tone === "accent" ? "var(--color-accent-ink)" : tone === "gold" ? "var(--color-sand)" : "var(--color-ink-3)";
  const borderColor =
    tone === "accent"
      ? "color-mix(in oklch, var(--color-accent) 34%, transparent)"
      : tone === "gold"
        ? "color-mix(in oklch, var(--color-sand) 30%, transparent)"
        : "var(--color-line-strong)";
  return (
    <span
      className={cx(
        "inline-flex items-center rounded-chip border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-[0.08em]",
        className,
      )}
      style={{ color: fg, borderColor }}
    >
      {label}
    </span>
  );
}

/* ---- Certification / category tokens ------------------------------ */

/** The five category hues, keyed. Extend this map to add taxonomies. */
export const CATEGORY_HUE = {
  gold: color.category.gold,
  rose: color.category.rose,
  blue: color.category.blue,
  violet: color.category.violet,
  teal: color.category.teal,
} as const;

export type CategoryHue = keyof typeof CATEGORY_HUE;

/** The prismatic ramp — used when a token spans all categories at once. */
export const CATEGORY_CONIC =
  "conic-gradient(from 210deg, #CE7FA6, #C6A15B, #5FA79C, #6E93C7, #9A7FD1, #CE7FA6)";
export const CATEGORY_LINEAR =
  "linear-gradient(90deg, #CE7FA6, #C6A15B, #5FA79C, #6E93C7, #9A7FD1)";

export interface CertDotProps {
  /** A category hue key, or `spectrum` for the all-categories ramp. */
  hue: CategoryHue | "spectrum";
  size?: number;
  className?: string;
}

/** A single category signal dot — the quietest possible taxonomy mark. */
export function CertDot({ hue, size = 7, className }: CertDotProps) {
  return (
    <span
      className={cx("inline-block shrink-0 rounded-full", className)}
      style={{
        width: size,
        height: size,
        background: hue === "spectrum" ? CATEGORY_CONIC : CATEGORY_HUE[hue],
      }}
      aria-hidden
    />
  );
}

export interface CertBadgeProps {
  hue: CategoryHue | "spectrum";
  /** Short label, e.g. an accreditation code. */
  children: ReactNode;
  className?: string;
}

/** Certification badge — a dot + short label, bordered chip. */
export function CertBadge({ hue, children, className }: CertBadgeProps) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-chip border border-line bg-elevated px-2 py-0.5 text-[10.5px] font-medium text-ink-2",
        className,
      )}
    >
      <CertDot hue={hue} />
      {children}
    </span>
  );
}
