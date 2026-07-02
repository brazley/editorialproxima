import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { DEFAULT_MODE, type Mode } from "../tokens";
import { cx } from "../lib/ep";

const STORAGE_KEY = "ep-mode";

/** Apply a mode by setting data-mode on <html>. Dark = no attribute. */
function applyMode(mode: Mode) {
  const root = document.documentElement;
  if (mode === DEFAULT_MODE) root.removeAttribute("data-mode");
  else root.setAttribute("data-mode", mode);
}

function readStored(): Mode {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as Mode | null;
    if (v === "light" || v === "dark") return v;
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return DEFAULT_MODE;
}

/**
 * ModeToggle — flips the base palette between dark (default) and light
 * (book paper). Independent of the accent theme, so any mode × theme
 * composes. Persists to localStorage; guide scaffolding, not library.
 */
export function ModeToggle() {
  const [mode, setMode] = useState<Mode>(DEFAULT_MODE);

  useEffect(() => {
    const stored = readStored();
    setMode(stored);
    applyMode(stored);
  }, []);

  function toggle() {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyMode(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore persistence failure */
    }
  }

  const isDark = mode === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode (book paper)" : "Dark mode"}
      className={cx(
        "grid h-8 w-8 place-items-center rounded-field border border-line bg-surface text-ink-2",
        "transition-colors hover:border-line-strong hover:text-ink",
      )}
    >
      {isDark ? <Moon size={15} /> : <Sun size={15} />}
    </button>
  );
}
