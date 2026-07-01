import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "./util";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "accent";
export type ButtonSize = "sm" | "md";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Optional leading icon (e.g. a lucide element). */
  icon?: ReactNode;
  /** Optional trailing icon — for "View brief →" style actions. */
  trailingIcon?: ReactNode;
  children?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-1.5 rounded-field font-medium " +
  "transition-transform transition-colors disabled:pointer-events-none disabled:opacity-45";

const sizes: Record<ButtonSize, string> = {
  sm: "px-2.5 py-1.5 text-[12.5px]",
  md: "px-3.5 py-2 text-[13.5px]",
};

const variants: Record<ButtonVariant, string> = {
  /** High emphasis: inverted — near-white fill on the dark canvas. */
  primary:
    "bg-ink text-canvas hover:scale-[1.015] active:scale-[0.99]",
  /** Medium: hairline border, ink-2 text that warms to ink on hover. */
  secondary:
    "border border-line-strong text-ink-2 hover:text-ink",
  /** Low: text-only, for tertiary / dismissive actions. */
  ghost:
    "text-ink-3 hover:bg-elevated hover:text-ink-2",
  /** Reserved: the periwinkle CTA — AI / verified actions only. */
  accent:
    "text-canvas hover:scale-[1.015] active:scale-[0.99] [background:var(--color-accent-strong)]",
};

/**
 * Button — four intents, two sizes. `primary` is the inverted workhorse;
 * `accent` is reserved for AI/verified actions and should stay rare so
 * the periwinkle keeps its meaning.
 */
export function Button({
  variant = "primary",
  size = "md",
  icon,
  trailingIcon,
  children,
  className,
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={cx(base, sizes[size], variants[variant], className)} {...rest}>
      {icon}
      {children}
      {trailingIcon}
    </button>
  );
}
