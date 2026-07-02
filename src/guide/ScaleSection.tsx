import { useState } from "react";
import { motion } from "framer-motion";
import { radius, space, elevation, motion as motionTokens } from "../tokens";
import { GuideSection, Group, Code } from "./parts";

/* ---- radius ------------------------------------------------------- */

const radiusItems: { name: string; value: number; use: string }[] = [
  { name: "chip", value: radius.chip, use: "tags, action chips, fact cards" },
  { name: "card", value: radius.card, use: "feed posts, tiles, inputs, buttons" },
  { name: "panel", value: radius.panel, use: "large containers, rails, mastheads" },
  { name: "round", value: radius.round, use: "people avatars, dots, tracks ONLY" },
];

function RadiusScale() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {radiusItems.map((r) => (
        <div key={r.name} className="rounded-card border border-line bg-surface p-3">
          <div
            className="mx-auto h-16 w-16 border border-line-strong bg-elevated"
            style={{ borderRadius: r.value === radius.round ? "9999px" : r.value }}
          />
          <div className="mt-3 text-center text-[12.5px] font-medium text-ink">{r.name}</div>
          <div className="tnum mt-0.5 text-center text-[11px] text-ink-3">
            {r.value === radius.round ? "9999" : `${r.value}px`}
          </div>
          <div className="mt-1.5 text-center text-[11px] leading-snug text-ink-3">{r.use}</div>
        </div>
      ))}
    </div>
  );
}

/* ---- spacing ------------------------------------------------------ */

function SpacingScale() {
  const steps: [string, number][] = [
    ["1", space[1]],
    ["2", space[2]],
    ["3", space[3]],
    ["4", space[4]],
    ["5", space[5]],
    ["6", space[6]],
    ["8", space[8]],
    ["10", space[10]],
  ];
  return (
    <div className="space-y-2">
      {steps.map(([name, px]) => (
        <div key={name} className="flex items-center gap-4">
          <span className="tnum w-8 shrink-0 text-[12px] text-ink-3">{name}</span>
          <span className="h-3.5 rounded-chip" style={{ width: px, background: "var(--color-accent)" }} />
          <span className="tnum text-[11px] text-ink-3">{px}px</span>
        </div>
      ))}
      <p className="pt-2 text-[12px] text-ink-3">
        A 4px base rhythm. Named steps map to Tailwind spacing; <Code>space-3</Code> (12px) and{" "}
        <Code>space-5</Code> (20px) do most of the work inside cards.
      </p>
    </div>
  );
}

/* ---- elevation ---------------------------------------------------- */

function ElevationScale() {
  const items: { name: string; shadow: string; note: string }[] = [
    { name: "0", shadow: elevation[0], note: "flat — depth from the surface layer" },
    { name: "1", shadow: elevation[1], note: "resting card lift, barely there" },
    { name: "2", shadow: elevation[2], note: "detached overlay — menus, dialogs" },
  ];
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {items.map((e) => (
          <div key={e.name} className="rounded-card border border-line bg-surface p-6">
            <div
              className="grid h-20 place-items-center rounded-card border border-line bg-surface"
              style={{ boxShadow: e.shadow }}
            >
              <span className="tnum text-[13px] text-ink-2">elevation-{e.name}</span>
            </div>
            <div className="mt-3 text-[11.5px] leading-snug text-ink-3">{e.note}</div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-ink-3">
        This system elevates by <span className="text-ink-2">surface layer</span> — canvas → surface →
        elevated — not by shadow. Shadows are reserved for genuinely detached overlays; most of the UI
        lives at elevation-0.
      </p>
    </>
  );
}

/* ---- motion ------------------------------------------------------- */

function MotionScale() {
  const [key, setKey] = useState(0);
  return (
    <div>
      <div className="mb-4 flex flex-wrap gap-4 text-[12px] text-ink-3">
        <span>
          <Code>fast</Code> {motionTokens.duration.fast}s
        </span>
        <span>
          <Code>base</Code> {motionTokens.duration.base}s
        </span>
        <span>
          <Code>slow</Code> {motionTokens.duration.slow}s
        </span>
        <span>
          stagger <Code>{motionTokens.stagger}s</Code>
        </span>
      </div>
      <div className="rounded-card border border-line bg-surface p-6">
        <div className="flex flex-wrap gap-2.5">
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.div
              key={`${key}-${i}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.06 + i * motionTokens.stagger,
                duration: motionTokens.duration.base,
                ease: motionTokens.ease.standard,
              }}
              className="grid h-16 w-16 place-items-center rounded-card border border-line bg-surface"
            >
              <span className="tnum text-[11px] text-ink-3">{i}</span>
            </motion.div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setKey((k) => k + 1)}
          className="mt-5 rounded-field border border-line-strong px-3 py-1.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:text-ink"
        >
          Replay reveal
        </button>
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-ink-3">
        Reveals use <Code>ease.standard</Code> ({motionTokens.ease.standard.join(", ")}) — a soft
        ease-out — with a small per-item stagger. Motion is brief and confident; nothing bounces.
      </p>
    </div>
  );
}

export function ScaleSection() {
  return (
    <GuideSection
      id="scales"
      kicker="Foundations"
      title="Radius, spacing, elevation & motion"
      blurb="The structural grammar. Squared corners keep the system out of generic-AI territory; a 4px rhythm keeps spacing honest; surface layering does the work shadows usually do; motion stays brief."
    >
      <Group title="Radius" note="squared — never a pill">
        <RadiusScale />
      </Group>
      <Group title="Spacing" note="4px base rhythm">
        <SpacingScale />
      </Group>
      <Group title="Elevation" note="layer first, shadow last">
        <ElevationScale />
      </Group>
      <Group title="Motion" note="framer-motion durations & easings">
        <MotionScale />
      </Group>
    </GuideSection>
  );
}
