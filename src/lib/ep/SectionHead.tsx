import type { ReactNode } from "react";
import { cx } from "./util";

export interface KickerProps {
  children: ReactNode;
  /** `accent` tints the eyebrow periwinkle (AI/verified sections). */
  tone?: "plain" | "accent";
  className?: string;
}

/**
 * Kicker — the small tracked eyebrow above a headline. Uppercase, tight,
 * newspaper-flavored. Use the `kicker` utility (serif) via SectionLabel,
 * or this sans variant inline over cards.
 */
export function Kicker({ children, tone = "plain", className }: KickerProps) {
  return (
    <span
      className={cx("text-[10.5px] font-semibold uppercase tracking-[0.12em]", className)}
      style={{ color: tone === "accent" ? "var(--color-accent-ink)" : "var(--color-ink-3)" }}
    >
      {children}
    </span>
  );
}

/** Serif section label — the canonical newspaper kicker (uses .kicker). */
export function SectionLabel({ children, className }: { children: ReactNode; className?: string }) {
  return <h2 className={cx("kicker", className)}>{children}</h2>;
}

export interface SectionHeadProps {
  /** Small serif label above the title. */
  kicker?: string;
  title: string;
  /** Optional supporting line under the title. */
  blurb?: string;
  className?: string;
}

/**
 * SectionHead — the full editorial section opener: serif kicker, a serif
 * display title, and an optional blurb. The standard way to open a major
 * region of a page.
 */
export function SectionHead({ kicker, title, blurb, className }: SectionHeadProps) {
  return (
    <div className={cx("mb-6 max-w-2xl", className)}>
      {kicker && <SectionLabel>{kicker}</SectionLabel>}
      <h2 className="display mt-2 text-[22px] font-semibold leading-tight tracking-tight text-ink sm:text-[26px]">
        {title}
      </h2>
      {blurb && <p className="mt-2.5 text-[14px] leading-relaxed text-ink-2">{blurb}</p>}
    </div>
  );
}
