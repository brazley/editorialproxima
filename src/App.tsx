import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { TopBar, NavLink, Badge } from "./lib/ep";
import { ThemeSwitcher } from "./guide/ThemeSwitcher";
import { ModeToggle } from "./guide/ModeToggle";
import { ColorSection } from "./guide/ColorSection";
import { TypeSection } from "./guide/TypeSection";
import { ScaleSection } from "./guide/ScaleSection";
import { ComponentSection } from "./guide/ComponentSection";
import { ANFSection } from "./guide/ANFSection";

const SECTIONS = [
  { id: "color", label: "Color" },
  { id: "type", label: "Type" },
  { id: "scales", label: "Scales" },
  { id: "components", label: "Components" },
  { id: "media", label: "Media" },
  { id: "anf", label: "Apple News" },
];

const PRINCIPLES = [
  {
    n: "01",
    title: "Intelligence as a whisper",
    body: "A single reserved periwinkle marks AI and verified surfaces — at a ~9% glow, never as decoration. It means something because it is rare.",
  },
  {
    n: "02",
    title: "Editorial serif voice",
    body: "Source Serif 4 carries display and headlines; Geist does the UI labor; Geist Mono holds every number in tabular alignment.",
  },
  {
    n: "03",
    title: "Squared, not rounded",
    body: "Near-right-angled corners — 3px chips, 4px cards, 6px panels — and hairline, low-contrast borders keep the system out of generic-AI territory.",
  },
  {
    n: "04",
    title: "Dark, monochrome substance",
    body: "A near-black canvas, grays for the material, warm-neutral accents. Depth comes from layering surfaces, not from shadow.",
  },
];

function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div className="glow-field pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-[1220px] px-5 pb-14 pt-16 sm:px-8 sm:pt-24">
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.16em] text-ink-3">
          <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-accent)" }} />
          A design system
          <span className="text-ink-3/60">·</span>
          <span className="normal-case tracking-normal">v1.0</span>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="display mt-5 max-w-4xl text-[42px] font-semibold leading-[1.04] tracking-tight text-ink sm:text-[64px]"
        >
          Editorial Proxima.
          <span className="text-ink-3"> A dark, editorial business system.</span>
        </motion.h1>

        <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-2 sm:text-[16px]">
          As if the FT and Bloomberg built a serifed, AI-quiet LinkedIn. Near-black canvas, monochrome
          substance, a single reserved periwinkle, squared geometry, and intelligence present only as a
          whisper. This page is the system rendered in its own aesthetic — every token and component,
          live.
        </p>

        <p className="mt-4 max-w-2xl text-[13px] leading-relaxed text-ink-3">
          The reserved accent is themeable — flip between the four accent themes with the swatches in the
          header and watch every surface, glow, focus ring, and metric recolor. The dark editorial bones
          never move; only the whisper changes color.
        </p>

        <div className="mt-7 flex flex-wrap items-center gap-2">
          <Badge>Source Serif 4</Badge>
          <Badge>Geist</Badge>
          <Badge>Geist Mono</Badge>
          <Badge>Tailwind v4</Badge>
          <Badge>framer-motion</Badge>
          <Badge>TypeScript</Badge>
        </div>

        {/* Principles */}
        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-card border border-line bg-surface p-5"
            >
              <span className="tnum text-[12px] text-ink-3">{p.n}</span>
              <h3 className="display mt-2 text-[16px] font-semibold leading-snug tracking-tight text-ink">
                {p.title}
              </h3>
              <p className="mt-2 text-[12.5px] leading-relaxed text-ink-3">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      <TopBar
        brand={{ initial: "P", wordmark: "Editorial Proxima", short: "EP" }}
        nav={
          <>
            {SECTIONS.map((s) => (
              <NavLink key={s.id} href={`#${s.id}`}>
                {s.label}
              </NavLink>
            ))}
          </>
        }
        actions={
          <>
            <ModeToggle />
            <ThemeSwitcher />
            <a
              href="#components"
              className="ml-1.5 hidden items-center gap-1.5 rounded-field bg-ink px-3 py-2 text-[13px] font-medium text-canvas transition-transform hover:scale-[1.015] active:scale-[0.99] sm:inline-flex"
            >
              Components
              <ArrowUpRight size={15} />
            </a>
          </>
        }
      />

      <main className="relative z-10">
        <Hero />
        <div className="mx-auto max-w-[1220px] space-y-14 px-5 pb-24 sm:px-8">
          <ColorSection />
          <TypeSection />
          <ScaleSection />
          <ComponentSection />
          <ANFSection />
        </div>

        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-[1220px] flex-col items-center gap-1 px-5 py-14 text-center sm:px-8">
            <span className="display text-[15px] font-semibold text-ink">Editorial Proxima</span>
            <span className="text-[12px] text-ink-3">
              A dark, editorial business design system · v1.0 · run locally with{" "}
              <code className="tnum text-ink-2">npm run dev</code>
            </span>
          </div>
        </footer>
      </main>
    </div>
  );
}
