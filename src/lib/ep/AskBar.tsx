import { useState } from "react";
import { motion } from "framer-motion";
import { cx } from "./util";

export interface AskBarProps {
  placeholder?: string;
  /** Keyboard hint shown at the trailing edge (e.g. "⌘K"). */
  kbd?: string;
  /** aria-label for the input. */
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  className?: string;
}

/**
 * AskBar — the AI ask/search input. Quiet at rest: no glow, ink-3 sparkle,
 * hairline border. On focus the sparkle and border warm to accent and a
 * faint glow blooms behind — the "intelligence as a whisper" made
 * interactive. The one input where the reserved periwinkle appears.
 */
export function AskBar({
  placeholder = "Ask or search…",
  kbd = "⌘K",
  label = "Ask or search",
  value,
  onChange,
  onSubmit,
  className,
}: AskBarProps) {
  const [focused, setFocused] = useState(false);
  const [internal, setInternal] = useState("");
  const val = value ?? internal;

  return (
    <div className={cx("relative w-full", className)}>
      <motion.div
        className="glow-field pointer-events-none absolute -inset-x-6 -inset-y-4 opacity-0"
        animate={{ opacity: focused ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit?.(val);
        }}
        className="relative flex items-center gap-2.5 rounded-field border bg-surface px-3.5 py-2 transition-colors"
        style={{ borderColor: focused ? "var(--color-line-strong)" : "var(--color-line)" }}
      >
        <input
          value={val}
          onChange={(e) => {
            setInternal(e.target.value);
            onChange?.(e.target.value);
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          aria-label={label}
          className="w-full bg-transparent text-[13px] text-ink placeholder:text-ink-3"
          style={{ outline: "none", boxShadow: "none" }}
        />
        {kbd && (
          <kbd className="tnum hidden shrink-0 rounded-chip border border-line bg-elevated px-1.5 py-0.5 text-[10px] text-ink-3 sm:inline-block">
            {kbd}
          </kbd>
        )}
      </form>
    </div>
  );
}
