import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { themes, THEME_ORDER, DEFAULT_THEME, type ThemeName } from "../tokens";
import { cx } from "../lib/ep";

const STORAGE_KEY = "ep-theme";

/** Apply a theme by setting data-theme on <html>. Blue = no attribute. */
function applyTheme(name: ThemeName) {
  const root = document.documentElement;
  if (name === DEFAULT_THEME) root.removeAttribute("data-theme");
  else root.setAttribute("data-theme", name);
}

function readStored(): ThemeName {
  try {
    const v = localStorage.getItem(STORAGE_KEY) as ThemeName | null;
    if (v && v in themes) return v;
  } catch {
    /* localStorage unavailable — fall through to default */
  }
  return DEFAULT_THEME;
}

/**
 * ThemeSwitcher — four accent swatches in the masthead. Flips the
 * reserved accent live and persists the choice. Each swatch previews its
 * own accent hue; the active one is ringed and checked. This is guide
 * scaffolding, not part of the exported library.
 */
export function ThemeSwitcher() {
  const [theme, setTheme] = useState<ThemeName>(DEFAULT_THEME);

  // Apply the stored theme on mount (before paint where possible).
  useEffect(() => {
    const stored = readStored();
    setTheme(stored);
    applyTheme(stored);
  }, []);

  function choose(name: ThemeName) {
    setTheme(name);
    applyTheme(name);
    try {
      localStorage.setItem(STORAGE_KEY, name);
    } catch {
      /* ignore persistence failure */
    }
  }

  return (
    <div
      className="flex items-center gap-1 rounded-field border border-line bg-surface p-1"
      role="radiogroup"
      aria-label="Accent theme"
    >
      {THEME_ORDER.map((name) => {
        const t = themes[name];
        const active = theme === name;
        return (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={`${t.label} accent`}
            title={`${t.label} — ${t.blurb}`}
            onClick={() => choose(name)}
            className={cx(
              "grid h-6 w-6 place-items-center rounded-chip transition-transform hover:scale-105",
              active ? "ring-1 ring-line-strong" : "opacity-80 hover:opacity-100",
            )}
            style={{ background: t.accent }}
          >
            {active && <Check size={13} strokeWidth={2.8} style={{ color: "#0a0a0a" }} />}
          </button>
        );
      })}
    </div>
  );
}
