import type { ReactNode } from "react";
import { cx } from "./util";

export interface FactCardProps {
  /** Small uppercase label — what the number is. */
  kicker: string;
  /** The value. Rendered mono; kept short (a stat, not a sentence). */
  value: ReactNode;
  /**
   * Mark the lead fact: an accent-tinted border, a thin top rule, and
   * accent-ink value. The one intelligence hint in a row of facts.
   */
  accent?: boolean;
  className?: string;
}

/**
 * FactCard — a compact "TL;DR" stat tile, sized to sit in a horizontal
 * Carousel. Deliberately not self-animated so below-fold tiles are never
 * left invisible; let a parent handle entrance.
 */
export function FactCard({ kicker, value, accent = false, className }: FactCardProps) {
  return (
    <div
      className={cx(
        "relative flex min-w-[128px] snap-start flex-col justify-between rounded-chip border bg-canvas/50 p-3",
        className,
      )}
      style={{
        borderColor: accent
          ? "color-mix(in oklch, var(--color-accent) 30%, transparent)"
          : "var(--color-line)",
      }}
    >
      {accent && (
        <span
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{
            background: "color-mix(in oklch, var(--color-accent) 65%, transparent)",
            borderRadius: "3px 3px 0 0",
          }}
        />
      )}
      <span className="text-[10px] font-medium uppercase tracking-[0.1em] text-ink-3">{kicker}</span>
      <span
        className="tnum mt-3 text-[15px] font-medium leading-none"
        style={{ color: accent ? "var(--color-accent-ink)" : "var(--color-ink)" }}
      >
        {value}
      </span>
    </div>
  );
}

export interface CarouselProps {
  children: ReactNode;
  className?: string;
}

/**
 * Carousel — a horizontal, snap-scrolling row with no visible scrollbar.
 * The generic container behind fact rows and card rails. Bring your own
 * items (FactCard, Card, …); it only owns the scroll behavior.
 */
export function Carousel({ children, className }: CarouselProps) {
  return (
    <div className={cx("-mx-1", className)}>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-2 overflow-x-auto px-1 pb-1">
        {children}
      </div>
    </div>
  );
}
