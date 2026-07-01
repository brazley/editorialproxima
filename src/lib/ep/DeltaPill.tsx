export type Direction = "up" | "down" | "flat";
export interface Delta {
  value: number;
  direction: Direction;
}

export interface DeltaPillProps {
  delta: Delta;
  /**
   * Flip the color mapping for metrics where down is good (e.g. cost,
   * time-to-close). The arrow still follows the literal direction.
   */
  invertColor?: boolean;
}

/**
 * Week-over-week delta — mono numerals, a direction arrow, and a signal
 * color. Green gains, warm-red losses, calm gray for flat. The arrow
 * always shows the literal move; `invertColor` only swaps good/bad.
 */
export function DeltaPill({ delta, invertColor = false }: DeltaPillProps) {
  const isGain = invertColor ? delta.direction === "down" : delta.direction === "up";
  const isLoss = invertColor ? delta.direction === "up" : delta.direction === "down";
  const color = isGain ? "var(--color-gain)" : isLoss ? "var(--color-loss)" : "var(--color-ink-3)";
  const arrow = delta.direction === "up" ? "↑" : delta.direction === "down" ? "↓" : "→";
  return (
    <span className="tnum inline-flex items-center gap-0.5 text-[12px] font-medium" style={{ color }}>
      <span aria-hidden>{arrow}</span>
      {delta.value}
      {delta.direction !== "flat" && "%"}
    </span>
  );
}
