import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cx } from "./util";

export type InsightVariant = "inline" | "callout";

export interface InsightProps {
  /**
   * The lead label — the "voice" attribution, e.g. your product name.
   * Rendered in accent-ink before the body. Defaults to "AI read".
   */
  label?: string;
  children: ReactNode;
  /**
   * `inline` = a bare sparkle + text line, for footnoting a card.
   * `callout` = a tinted, accent-washed box, for a standalone insight.
   */
  variant?: InsightVariant;
  className?: string;
}

/**
 * Insight — the "intelligence as a whisper" callout. The one place the
 * reserved periwinkle speaks: a sparkle glyph, an accent-ink attribution,
 * and quiet body copy. Keep these sparse; the glow only means something
 * because it is rare.
 */
export function Insight({ label = "AI read", children, variant = "inline", className }: InsightProps) {
  if (variant === "callout") {
    return (
      <div
        className={cx(
          "flex items-start gap-2 rounded-card px-3 py-2.5 text-[12.5px] leading-relaxed",
          className,
        )}
        style={{
          background: "color-mix(in oklch, var(--color-accent) 7%, transparent)",
          color: "var(--color-accent-ink)",
        }}
      >
        <Sparkles size={13} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
        <span>
          <span className="font-medium">{label} — </span>
          {children}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cx("flex items-start gap-2 text-[12.5px] leading-relaxed text-ink-3", className)}
    >
      <Sparkles size={13} className="mt-0.5 shrink-0" style={{ color: "var(--color-accent)" }} />
      <span>
        <span className="font-medium" style={{ color: "var(--color-accent-ink)" }}>
          {label} —{" "}
        </span>
        {children}
      </span>
    </div>
  );
}
