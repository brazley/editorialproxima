import { color, accentGlow } from "../tokens";
import { GuideSection, Group } from "./parts";

interface SwatchDef {
  name: string;
  value: string;
  intent: string;
  /** Render on a lighter chip so near-black swatches stay visible. */
  onLight?: boolean;
}

function Swatch({ name, value, intent, onLight }: SwatchDef) {
  return (
    <div className="rounded-card border border-line bg-surface p-3">
      <div
        className="h-14 w-full rounded-chip border border-line"
        style={{ background: value, boxShadow: onLight ? "inset 0 0 0 1px rgba(255,255,255,0.04)" : undefined }}
      />
      <div className="mt-2.5 text-[12.5px] font-medium text-ink">{name}</div>
      <div className="tnum mt-0.5 text-[11px] uppercase text-ink-3">{value}</div>
      <div className="mt-1.5 text-[11.5px] leading-snug text-ink-3">{intent}</div>
    </div>
  );
}

function Ramp({ items }: { items: SwatchDef[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((s) => (
        <Swatch key={s.name} {...s} />
      ))}
    </div>
  );
}

const surfaces: SwatchDef[] = [
  { name: "canvas", value: color.canvas, intent: "The page itself. Everything sits on this.", onLight: true },
  { name: "surface", value: color.surface, intent: "Primary card & panel fill.", onLight: true },
  { name: "elevated", value: color.elevated, intent: "Raised chips, inputs, nested fills.", onLight: true },
  { name: "line", value: color.line, intent: "Default hairline border, low contrast.", onLight: true },
  { name: "line-strong", value: color.lineStrong, intent: "Emphasized hairline — hover, dividers.", onLight: true },
];

const ink: SwatchDef[] = [
  { name: "ink", value: color.ink, intent: "Primary text, headlines." },
  { name: "ink-2", value: color.ink2, intent: "Secondary text, body-dim." },
  { name: "ink-3", value: color.ink3, intent: "Tertiary text, meta, captions." },
];

const accent: SwatchDef[] = [
  { name: "accent", value: color.accent, intent: "The reserved periwinkle. AI / verified only." },
  { name: "accent-strong", value: color.accentStrong, intent: "Pressed / high-emphasis accent." },
  { name: "accent-ink", value: color.accentInk, intent: "Accent-tinted text on dark." },
  { name: "accent-glow", value: accentGlow, intent: "~9% wash — intelligence as a whisper.", onLight: true },
];

const signal: SwatchDef[] = [
  { name: "sand", value: color.sand, intent: "Warm off-white — awards, wordmark warmth." },
  { name: "gain", value: color.gain, intent: "Positive delta." },
  { name: "loss", value: color.loss, intent: "Negative delta." },
];

const category: SwatchDef[] = [
  { name: "cat-gold", value: color.category.gold, intent: "MBE — minority-owned." },
  { name: "cat-rose", value: color.category.rose, intent: "WBE — women-owned." },
  { name: "cat-blue", value: color.category.blue, intent: "VBE — veteran-owned." },
  { name: "cat-violet", value: color.category.violet, intent: "LGBTBE — LGBTQ+-owned." },
  { name: "cat-teal", value: color.category.teal, intent: "DOBE — disability-owned." },
];

export function ColorSection() {
  return (
    <GuideSection
      id="color"
      kicker="Foundations"
      title="Color"
      blurb="A near-black canvas, monochrome substance, and a single reserved periwinkle. The accent is never decoration — it marks intelligence and verification, and only there. Category hues stay muted so they read as data."
    >
      <Group title="Surfaces" note="layered by lightness, not shadow">
        <Ramp items={surfaces} />
      </Group>
      <Group title="Ink" note="three-level text hierarchy">
        <Ramp items={ink} />
      </Group>
      <Group title="Accent" note="RESERVED — AI / verified surfaces only">
        <Ramp items={accent} />
      </Group>
      <Group title="Warm neutral & signal">
        <Ramp items={signal} />
      </Group>
      <Group title="Category hues" note="certification / taxonomy — muted, desaturated">
        <Ramp items={category} />
      </Group>
    </GuideSection>
  );
}
