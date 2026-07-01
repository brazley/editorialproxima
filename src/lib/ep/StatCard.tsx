import type { ReactNode } from "react";
import { cx } from "./util";
import { DeltaPill, type Delta } from "./DeltaPill";

export interface StatCardProps {
  /** Metric label — the quiet caption above the number. */
  label: string;
  /** The number itself. Rendered in mono tabular numerals. */
  value: ReactNode;
  /** Optional sub-note under the value (context, comparison). */
  note?: string;
  /** Optional delta pill, top-right. */
  delta?: Delta;
  /** Flip delta good/bad mapping (down-is-good metrics). */
  invertDelta?: boolean;
  /**
   * Trailing visual slot — typically a <Sparkline/>. Kept as a slot so
   * the card doesn't hard-depend on how the trend is drawn.
   */
  chart?: ReactNode;
  /** Mark the lead stat: adds a thin accent rule at the top edge. */
  accent?: boolean;
  className?: string;
}

/**
 * StatCard — one number that matters, with optional delta and trend.
 * The workhorse of dashboards and stat bands. Numbers are always mono
 * so columns of them align; the chart slot keeps the trend renderer
 * swappable.
 */
export function StatCard({
  label,
  value,
  note,
  delta,
  invertDelta = false,
  chart,
  accent = false,
  className,
}: StatCardProps) {
  return (
    <div
      className={cx(
        "group relative flex flex-col justify-between overflow-hidden rounded-card border bg-canvas/40 p-3.5 transition-colors hover:border-line-strong",
        className,
      )}
      style={
        accent
          ? { borderColor: "color-mix(in oklch, var(--color-accent) 28%, transparent)" }
          : { borderColor: "var(--color-line)" }
      }
    >
      {accent && (
        <span
          className="absolute inset-x-0 top-0 h-[2px]"
          style={{ background: "color-mix(in oklch, var(--color-accent) 60%, transparent)" }}
        />
      )}

      <div className="flex items-start justify-between gap-2">
        <span className="text-[11.5px] leading-tight text-ink-3">{label}</span>
        {delta && <DeltaPill delta={delta} invertColor={invertDelta} />}
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div className="min-w-0">
          <div className="tnum text-[22px] font-medium leading-none text-ink">{value}</div>
          {note && <div className="mt-1.5 truncate text-[10.5px] leading-tight text-ink-3">{note}</div>}
        </div>
        {chart && (
          <div className="shrink-0 opacity-70 transition-opacity group-hover:opacity-100">{chart}</div>
        )}
      </div>
    </div>
  );
}
