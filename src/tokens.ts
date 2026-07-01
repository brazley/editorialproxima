/* ==================================================================== *
   EDITORIAL PROXIMA — typed token module
   --------------------------------------------------------------------
   The canonical, machine-readable source of the system's design
   decisions. Mirrors src/index.css 1:1. Import these when you need a
   value in TS/JS (canvas rendering, framer-motion, computed styles)
   rather than a CSS variable or Tailwind utility.

       import { color, motion } from "./tokens";
       <path stroke={color.accent} />

   Every value is intentional. Prefer the semantic name (ink2, accentInk)
   over the raw hex so a future retheme is a one-file change.
 * ==================================================================== */

/** Surfaces, ink, accent, signal, and category hues. */
export const color = {
  /* surfaces — layered by lightness, near-black */
  canvas: "#0a0a0a",
  surface: "#131313",
  elevated: "#191919",
  line: "#1f1f1f",
  lineStrong: "#2b2b2b",

  /* ink — three-level text hierarchy */
  ink: "#fafafa",
  ink2: "#a0a0a0",
  ink3: "#6b6b6b",

  /* accent — RESERVED periwinkle, AI / verified surfaces only */
  accent: "#5b8def",
  accentStrong: "#4d7cfe",
  accentInk: "#b9ccff",

  /* warm neutral + market signal */
  sand: "#dad8cf",
  gain: "#56b981",
  loss: "#e5715b",

  /* category / certification hues — muted so they read as data */
  category: {
    gold: "#c6a15b", // MBE — minority-owned
    rose: "#ce7fa6", // WBE — women-owned
    blue: "#6e93c7", // VBE — veteran-owned
    violet: "#9a7fd1", // LGBTBE — LGBTQ+-owned
    teal: "#5fa79c", // DOBE — disability-owned
  },
} as const;

/**
 * The accent glow, expressed as the exact color-mix used across the
 * system for the "intelligence as a whisper" wash (~9% accent). Follows
 * the active theme, since it is a mix over the live --color-accent.
 */
export const accentGlow = "color-mix(in oklch, var(--color-accent) 9%, transparent)";

/* ==================================================================== *
   THEMES — the reserved accent is the only token group that varies.
   Everything else (canvas, ink, surfaces, borders, radius, type,
   category hues) is constant. Apply a theme with a data-theme attribute
   on <html>; blue is the default. This map mirrors the CSS theme blocks
   in src/index.css 1:1 and is the machine-readable source for the set.
 * ==================================================================== */

/** The three tokens a theme overrides. */
export interface AccentSet {
  /** The reserved accent hue — AI / verified surfaces only. */
  accent: string;
  /** Pressed / high-emphasis accent. */
  accentStrong: string;
  /** Accent-tinted text, readable on the dark canvas. */
  accentInk: string;
}

export type ThemeName = "blue" | "coral" | "purple" | "olive";

export const themes: Record<ThemeName, AccentSet & { label: string; blurb: string }> = {
  blue: {
    label: "Blue",
    blurb: "The default periwinkle — the original intelligence whisper.",
    accent: "#5b8def",
    accentStrong: "#4d7cfe",
    accentInk: "#b9ccff",
  },
  coral: {
    label: "Coral",
    blurb: "Warm editorial coral, softened off hot so it signals, not shouts.",
    accent: "#ee7357",
    accentStrong: "#ff6f4d",
    accentInk: "#ffc3b2",
  },
  purple: {
    label: "Purple",
    blurb: "A refined violet from the cert-gradient family, nudged brighter.",
    accent: "#a382e6",
    accentStrong: "#9168e8",
    accentInk: "#d8c8f8",
  },
  olive: {
    label: "Olive",
    blurb: "A muted, earthy olive-green — low saturation on purpose.",
    accent: "#9ca05b",
    accentStrong: "#adb15e",
    accentInk: "#dadd9f",
  },
};

/** Canonical order for switchers and docs. Blue leads as the default. */
export const THEME_ORDER: ThemeName[] = ["blue", "coral", "purple", "olive"];

/** The default theme applied when no data-theme attribute is set. */
export const DEFAULT_THEME: ThemeName = "blue";

/** The three type families and the job each one does. */
export const font = {
  /** Body & UI. Warm-neutral grotesque; the workhorse. */
  sans: '"Geist", ui-sans-serif, system-ui, sans-serif',
  /** Display, headlines, editorial body. The system's voice. */
  serif: '"Source Serif 4", ui-serif, Georgia, serif',
  /** Tabular numerals — every metric, ID, and timestamp. */
  mono: '"Geist Mono", ui-monospace, "SF Mono", monospace',
} as const;

/**
 * Type scale (px). Editorial, not modular-perfect — display sizes are
 * generous, UI sizes sit tight around 11–15px. Names map to role.
 */
export const fontSize = {
  micro: 10, // kbd, ID lines, dot labels
  caption: 11, // meta, sub-labels
  small: 12, // secondary UI text
  body: 13, // default UI / control text
  bodyLg: 14, // primary body copy
  base: 15, // card titles
  lead: 17, // sub-heads
  title: 19, // card headlines
  h2: 22, // section titles
  h1: 27, // page headers
  display: 32, // brief / hero display
  hero: 48, // marketing hero
} as const;

/** Weights actually used. The serif carries emphasis at 600; UI stays ≤ 600. */
export const fontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

/** Letter-spacing by role. Display tightens; kickers/labels open up. */
export const tracking = {
  display: "-0.012em", // serif display
  tight: "-0.02em", // tight UI headings
  tnum: "-0.035em", // mono numerals
  normal: "0em",
  kicker: "0.06em", // serif kicker
  label: "0.1em", // uppercase micro-labels
  labelWide: "0.14em", // brief eyebrow
} as const;

/** Squared radius scale — deliberately near-right-angled, never a pill. */
export const radius = {
  chip: 3, // tags, action chips, fact cards
  card: 4, // feed posts, metric tiles, inputs, buttons
  field: 4, // inputs, buttons (alias of card, kept for intent)
  panel: 6, // large containers, sidebar rails
  round: 9999, // people avatars, dots, progress tracks ONLY
} as const;

/** 4px-base spacing rhythm. */
export const space = {
  0.5: 2,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  16: 64,
} as const;

/** Hairline border widths. This system is border-led, not shadow-led. */
export const border = {
  hairline: 1,
  accentRule: 2, // the thin accent rule on a lead fact / accented stat
} as const;

/**
 * Elevation. Editorial Proxima elevates primarily by SURFACE LAYER
 * (canvas → surface → elevated), not shadow. Shadows are reserved for
 * genuinely detached overlays.
 */
export const elevation = {
  /** flat — the default. Depth comes from the surface it sits on. */
  0: "none",
  /** resting card lift, barely there. */
  1: "0 1px 2px rgba(0,0,0,0.4)",
  /** detached overlay — menus, popovers, dialogs. */
  2: "0 8px 24px -6px rgba(0,0,0,0.66)",
  /** focus ring — canvas gap + accent halo. */
  focus:
    "0 0 0 2px #0a0a0a, 0 0 0 3px color-mix(in oklch, #5b8def 60%, transparent)",
} as const;

/** Motion — durations (seconds) and easings used with framer-motion. */
export const motion = {
  duration: {
    fast: 0.35,
    base: 0.4,
    slow: 0.5,
  },
  ease: {
    /** entrance / ease-out — the default for reveals. */
    standard: [0.22, 1, 0.36, 1] as const,
    /** symmetric in-out — for reversible state. */
    inOut: [0.65, 0, 0.35, 1] as const,
  },
  /** per-item stagger step for feed / list reveals. */
  stagger: 0.045,
} as const;

/** The full token set, one object, for tooling and the style guide. */
export const tokens = {
  color,
  accentGlow,
  themes,
  font,
  fontSize,
  fontWeight,
  tracking,
  radius,
  space,
  border,
  elevation,
  motion,
} as const;

export type Tokens = typeof tokens;
