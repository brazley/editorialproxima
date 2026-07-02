import { initials } from "./util";

export type AvatarTint = "plain" | "accent" | "sand";
export type AvatarShape = "round" | "square";

export interface AvatarProps {
  /** Full name — drives the initials and the a11y label context. */
  name: string;
  /** Pixel size (width & height). Default 40. */
  size?: number;
  /** Fill/foreground tint. `accent` implies a verified/AI subject. */
  tint?: AvatarTint;
  /**
   * Shape convention: people are `round`, companies are `square`.
   * Squared avatars also switch to the serif for their initials.
   */
  shape?: AvatarShape;
  className?: string;
}

/**
 * Initials avatar — no image dependency, always renders.
 *
 * Encodes the system's real-world convention: people = round (sans),
 * companies = squared (serif). Squared corners use a 5px radius so a
 * small tile still reads as a card, not a chip.
 */
export function Avatar({
  name,
  size = 40,
  tint = "plain",
  shape = "round",
  className,
}: AvatarProps) {
  const bg =
    tint === "accent"
      ? "color-mix(in oklch, var(--color-accent) 20%, var(--color-elevated))"
      : tint === "sand"
        ? "color-mix(in oklch, var(--color-sand) 14%, var(--color-elevated))"
        : "var(--color-elevated)";
  const fg =
    tint === "accent"
      ? "var(--color-accent-ink)"
      : tint === "sand"
        ? "var(--color-sand-ink)"
        : "var(--color-ink-2)";

  return (
    <span
      className={`inline-flex shrink-0 items-center justify-center border border-line font-medium ${className ?? ""}`}
      style={{
        width: size,
        height: size,
        background: bg,
        color: fg,
        fontSize: size * 0.36,
        borderRadius: shape === "round" ? "9999px" : "5px",
        fontFamily: shape === "square" ? "var(--font-serif)" : "var(--font-sans)",
      }}
      aria-hidden
    >
      {initials(name)}
    </span>
  );
}
