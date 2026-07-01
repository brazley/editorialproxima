# Editorial Proxima

**A dark, editorial business design system.** As if the FT and Bloomberg built a serifed, AI-quiet LinkedIn: a near-black canvas, monochrome substance, a single reserved periwinkle, squared geometry, and intelligence present only as a whisper.

This document is the adoption reference. Another engineer should be able to build a coherent product from this file alone — the philosophy, the full token set, and every component with its props, variants, and do/don't guidance.

- **Live style guide:** `npm install && npm run dev` → http://localhost:5173 (a self-documenting, bespoke reference rendered in the system's own aesthetic).
- **Tokens (CSS):** `src/index.css` — Tailwind `@theme` + `--ep-*` mirror.
- **Tokens (typed):** `src/tokens.ts` — machine-readable, mirrors the CSS 1:1.
- **Components:** `src/lib/ep/` — one import path: `import { … } from "./lib/ep"`.

---

## 1. Philosophy

Five ideas hold the whole system together. Every token and component is downstream of these.

1. **Intelligence as a whisper.** A single reserved periwinkle (`accent`, `#5b8def`) marks AI and verified surfaces — and *only* those — at a ~9% glow. It is never decoration. It means something precisely because it is rare. If everything glows, nothing does.
2. **Editorial serif voice.** Source Serif 4 carries display, headlines, and editorial body; Geist does the UI labor; Geist Mono holds every number in tabular alignment. The serif does the emotional work, the sans does the labor, the mono keeps the figures honest.
3. **Squared, not rounded.** Near-right-angled corners — 3px chips, 4px cards, 6px panels — with hairline, low-contrast borders. This is the deliberate move that keeps the system out of generic-AI, soft-rounded territory.
4. **Dark, monochrome substance.** A near-black canvas, grays for the material, warm-neutral accents. Depth comes from **layering surfaces** (canvas → surface → elevated), not from shadow.
5. **Real conventions.** The system encodes how the world actually works: people avatars are round, company avatars are squared; a positive delta is green, a negative one is a warm red; category hues are muted so they read as data, not decoration.

**Design in this order:** the API before the implementation, composition before configuration, accessibility as part of the contract, and weight as a feature.

---

## 2. Token reference

Two access paths to the same decisions. Tailwind `@theme` tokens generate the utility classes the library uses (`bg-surface`, `text-ink-2`, `border-line`, `rounded-card`). The `--ep-*` mirror in `:root` and the typed `src/tokens.ts` expose the same values for hand-written CSS and TS.

### 2.1 Color

| Token | Hex | Intent |
|---|---|---|
| `canvas` | `#0a0a0a` | The page itself. Everything sits on this. |
| `surface` | `#131313` | Primary card & panel fill. |
| `elevated` | `#191919` | Raised chips, inputs, nested fills. |
| `line` | `#1f1f1f` | Default hairline border, low contrast. |
| `line-strong` | `#2b2b2b` | Emphasized hairline — hover, dividers. |
| `ink` | `#fafafa` | Primary text, headlines. |
| `ink-2` | `#a0a0a0` | Secondary text, body-dim. |
| `ink-3` | `#6b6b6b` | Tertiary text, meta, captions. |
| `accent` | `#5b8def` | **Reserved** periwinkle — AI / verified only. **Themeable — see §3.** |
| `accent-strong` | `#4d7cfe` | Pressed / high-emphasis accent. **Themeable.** |
| `accent-ink` | `#b9ccff` | Accent-tinted text on dark. **Themeable.** |
| `accent-glow` | `color-mix(accent 9%)` | The ~9% wash — intelligence as a whisper. Follows the active accent. |
| `sand` | `#dad8cf` | Warm off-white — awards, wordmark warmth. |
| `gain` | `#56b981` | Positive delta (green). |
| `loss` | `#e5715b` | Negative delta (warm red). |

**Category hues** (certification / taxonomy — muted, desaturated so they read as data):

| Token | Hex | Category |
|---|---|---|
| `cat-gold` | `#c6a15b` | MBE — minority-owned |
| `cat-rose` | `#ce7fa6` | WBE — women-owned |
| `cat-blue` | `#6e93c7` | VBE — veteran-owned |
| `cat-violet` | `#9a7fd1` | LGBTBE — LGBTQ+-owned |
| `cat-teal` | `#5fa79c` | DOBE — disability-owned |

For a token spanning all categories at once, use the `spectrum` ramp (`CATEGORY_CONIC` / `CATEGORY_LINEAR` in `Chip.tsx`).

### 2.2 Typography

Three families, three jobs.

| Family | CSS var | Role |
|---|---|---|
| Source Serif 4 | `--font-serif` | Display, headlines, editorial body. The `.display` and `.kicker` utilities. |
| Geist | `--font-sans` | Body & UI — the default. |
| Geist Mono | `--font-mono` | Tabular numerals — every metric, ID, timestamp. The `.tnum` utility. |

**Type scale** (px, role-named in `tokens.ts`): `micro 10` · `caption 11` · `small 12` · `body 13` · `bodyLg 14` · `base 15` · `lead 17` · `title 19` · `h2 22` · `h1 27` · `display 32` · `hero 48`.

**Weights:** `light 300` · `regular 400` · `medium 500` · `semibold 600` · `bold 700`. UI stays ≤ 600; the serif carries emphasis at 600.

**Tracking:** `display -0.012em` · `tight -0.02em` · `tnum -0.035em` · `kicker 0.06em` · `label 0.1em` · `labelWide 0.14em`.

Utilities: `.display` (serif + display tracking), `.kicker` (serif uppercase eyebrow), `.tnum` (mono tabular numerals).

### 2.3 Radius — squared, never a pill

| Token | px | Use |
|---|---|---|
| `chip` | 3 | Tags, action chips, fact cards. |
| `card` / `field` | 4 | Feed posts, tiles, inputs, buttons. |
| `panel` | 6 | Large containers, rails, mastheads. |
| `round` | 9999 | **Only** people avatars, dots, progress tracks. |

### 2.4 Spacing — 4px base rhythm

`1 → 4px` · `2 → 8` · `3 → 12` · `4 → 16` · `5 → 20` · `6 → 24` · `8 → 32` · `10 → 40`. Named steps map to Tailwind spacing; `space-3` (12px) and `space-5` (20px) do most of the intra-card work.

### 2.5 Border & elevation

- **Border:** `hairline 1px` (default), `accentRule 2px` (the thin accent top-rule on a lead fact/stat). The system is border-led, not shadow-led.
- **Elevation:** elevate by **surface layer**, not shadow.
  - `elevation-0` — flat, the default. Depth from the surface it sits on.
  - `elevation-1` — `0 1px 2px rgba(0,0,0,0.4)` — resting card lift, barely there.
  - `elevation-2` — `0 8px 24px -6px rgba(0,0,0,0.66)` — detached overlays only (menus, dialogs).
  - `elevation-focus` — canvas gap + accent halo (the `:focus-visible` ring).

### 2.6 Motion

| Token | Value | Use |
|---|---|---|
| `duration.fast` | 0.35s | Small state changes. |
| `duration.base` | 0.4s | Default reveal. |
| `duration.slow` | 0.5s | Image fade, larger entrances. |
| `ease.standard` | `[0.22, 1, 0.36, 1]` | Entrance / ease-out — the default. |
| `ease.inOut` | `[0.65, 0, 0.35, 1]` | Reversible state. |
| `stagger` | 0.045s | Per-item feed/list reveal step. |

Motion is brief and confident. Nothing bounces. Feed reveals stagger with `0.06 + i * stagger`.

---

## 3. Theming — a swappable accent

The dark editorial bones — canvas, ink, surfaces, borders, radius, type, and the category hues — are **constant**. A theme changes **only the reserved accent** (the "intelligence whisper"). Because every accent surface is expressed as `var(--color-accent)` / `var(--color-accent-ink)` or a `color-mix()` over `--color-accent`, overriding three tokens recolors everything downstream automatically: the ~9% glow, the `:focus-visible` ring, sparklines, fit/progress bars, badge tints, the AskBar focus state, and every `accent-ink` label. Category hues never move.

**Apply a theme** with a `data-theme` attribute on `<html>`. Blue is the default and needs no attribute:

```html
<html data-theme="coral">  <!-- or "purple" | "olive"; omit / "blue" for default -->
```

```ts
// or imperatively
document.documentElement.setAttribute("data-theme", "olive");
document.documentElement.removeAttribute("data-theme"); // back to blue
```

The four accent sets (each tuned to sit right on the near-black canvas at the same restraint — a mid-light accent, a punchier pressed `strong`, and a light, readable `ink` for text on dark):

| Theme | `accent` | `accent-strong` | `accent-ink` | Character |
|---|---|---|---|---|
| **Blue** (default) | `#5b8def` | `#4d7cfe` | `#b9ccff` | The original periwinkle whisper. |
| **Coral** | `#ee7357` | `#ff6f4d` | `#ffc3b2` | Warm editorial coral, softened off hot so it signals, not shouts. |
| **Purple** | `#a382e6` | `#9168e8` | `#d8c8f8` | A refined violet from the cert-gradient family, nudged brighter. |
| **Olive** | `#9ca05b` | `#adb15e` | `#dadd9f` | A muted, earthy olive-green — low saturation on purpose. |

The typed set lives in `src/tokens.ts` as `themes` (a `Record<ThemeName, …>`), with `THEME_ORDER` and `DEFAULT_THEME`; the CSS override blocks live in `src/index.css` under `:root[data-theme="…"]`. The two mirror each other 1:1. The live style guide's header switcher flips all four and persists the choice to `localStorage` (`ep-theme`).

> **Discipline holds across themes.** Whatever the hue, the accent stays reserved for AI/verified surfaces at a low glow. A theme changes the color of the whisper — never its volume.

---

## 4. Component index

All exported from `src/lib/ep`. Every component is dependency-light (framer-motion + lucide-react only), squared, and accessible by default.

### Button
One action, four intents, two sizes.
- **Props:** `variant` (`primary` | `secondary` | `ghost` | `accent`), `size` (`sm` | `md`), `icon`, `trailingIcon`, plus native button attrs.
- **Do:** one primary action per view; use `accent` only for AI/verified CTAs. **Don't:** use `accent` for ordinary buttons — it dilutes the periwinkle's meaning.

### Badge · TypePill · CertDot · CertBadge  (`Chip.tsx`)
The smallest labels — squared, never pills.
- **Badge** — neutral metadata tag. Props: `children`.
- **TypePill** — uppercase classifier. Props: `label`, `tone` (`plain` | `accent` | `gold`). `accent` = AI/verified type, `gold` = award.
- **CertDot** — the quietest taxonomy mark. Props: `hue` (a `CategoryHue` or `spectrum`), `size`.
- **CertBadge** — dot + short label chip. Props: `hue`, `children`.
- **Do:** keep category hues muted. **Don't:** use a pill radius — these stay squared at 3px.

### Avatar
- **Props:** `name`, `size` (default 40), `tint` (`plain` | `accent` | `sand`), `shape` (`round` | `square`).
- **Convention:** people = `round` (sans initials); companies = `square` (serif initials). `tint="accent"` signals a verified/AI subject. **Don't:** round a company or square a person.

### StatCard · Sparkline · DeltaPill
One number that matters.
- **StatCard** — Props: `label`, `value`, `note`, `delta`, `invertDelta`, `chart` (slot, usually a `Sparkline`), `accent`. Numbers render mono so columns align. `accent` adds a thin accent top-rule (lead stat). `invertDelta` flips good/bad for down-is-good metrics.
- **Sparkline** — Props: `data`, `width`, `height`, `stroke`. Bare area+line; no axes. Stable `useId` gradient.
- **DeltaPill** — Props: `delta` (`{ value, direction }`), `invertColor`. Green gain, warm-red loss, calm flat. The arrow always shows the literal move; `invertColor` only swaps good/bad.

### Card · Panel
- **Card** — the primary container, 4px radius. Props: `tone` (`surface` | `canvas` | `elevated`), `interactive` (hover border warms), `glow` (lay the accent wash behind).
- **Panel** — the larger container, 6px radius, for rails and mastheads. Same props as Card.
- **Do:** use `glow` only in AI/verified contexts. **Don't:** stack shadows — elevate by tone.

### FactCard · Carousel
- **FactCard** — a compact TL;DR stat tile. Props: `kicker`, `value`, `accent` (lead fact: accent border + top-rule + accent-ink value). Not self-animated by design, so below-fold tiles are never left invisible.
- **Carousel** — horizontal, snap-scrolling, no visible scrollbar. Props: `children`. Owns only scroll behavior — drop any tiles inside.

### Kicker · SectionLabel · SectionHead
- **Kicker** — inline sans eyebrow. Props: `children`, `tone` (`plain` | `accent`).
- **SectionLabel** — the canonical serif newspaper kicker (`.kicker`).
- **SectionHead** — full editorial opener. Props: `kicker`, `title`, `blurb`.

### Insight
The "intelligence as a whisper" callout — the one place the reserved periwinkle speaks.
- **Props:** `label` (voice attribution, default `"AI read"`), `variant` (`inline` | `callout`), `children`.
- **Do:** keep these sparse. **Don't:** stack multiple callouts — the glow only means something because it's rare.

### EngagementRow
- **Props:** `counts` (`{ endorse, comment, share }`), `onEndorse`, `onComment`, `onShare`. Labels hide on narrow widths; counts stay mono so they don't jitter.

### AskBar
The AI ask/search input. Quiet at rest, warm on focus (sparkle + border shift to accent, faint glow blooms).
- **Props:** `placeholder`, `kbd`, `label`, `value`, `onChange`, `onSubmit`. Controlled or uncontrolled.

### TopBar · NavLink
- **TopBar** — the sticky editorial masthead, translucent with backdrop blur. Slots: `brand` (`{ initial, wordmark, short }`), `nav`, `center` (usually an AskBar), `actions`.
- **NavLink** — router-agnostic nav item. Props: `active` (pass it yourself), plus native anchor attrs. Inactive at ink-3, active at ink.

### Img
The low-level aspect-ratio-locked image with skeleton shimmer + fade-in. `Image` composes it; reach for `Img` when you need the bare media box.
- **Props:** `src`, `alt`, `ratio` (e.g. `"3 / 2"`), `ratioClassName` (responsive Tailwind aspect classes; overrides `ratio`), `fit` (`cover` | `contain`), `sizes`, `priority`. The ratio box reserves space (zero layout shift); a faint skeleton sits behind until the image paints. **Always pass a real `alt`.**

---

## 4a. Media family

Three theme-aware media components. All share the media grammar in `media.ts`: named `AspectRatio` (`16/9 · 3/2 · 4/3 · 1/1 · 4/5`) and `MediaRadius` (`none · chip · card · panel`). Accent affordances (play button, scrubber, carousel arrows/dots) use the reserved accent, so they recolor with the active theme.

### Image
The editorial image — a `<figure>` wrapping the ratio-locked, skeleton-and-fade media box with an optional caption / credit / kicker.
- **Props:** `src`, `alt`, `aspect` (default `3/2`), `fit` (`cover` | `contain`), `radius` (default `card`), `caption` (serif, ink-3), `credit` (mono, dimmer), `kicker` (uppercase micro-label), `priority` (eager; lazy by default), `sizes`.
- **Do:** pass a real `alt`; use `priority` only for a hero. **Don't:** omit `aspect` if you care about layout stability.

### Video
A media player in the system aesthetic — ratio-box, poster, skeleton, lazy.
- **Props:** `src` or `sources` (`{ src, type }[]` — list WebM/VP9 first, MP4/H.264 fallback), `poster`, `mode` (`player` | `ambient`), `aspect` (default `16/9`), `radius`, `loop`, `label` (a11y; required for `player`), `caption`, `credit`.
- **`player`** — click-to-play with a custom control bar. The transport chrome (play/pause, mute, scrubber, time, playhead) is intentionally **monochrome white** (not the theme accent) over a scrim, so it stays legible on arbitrary footage — the one deliberately non-theme-tinted surface in the system. Keyboard: `space`/`k` play-pause, `m` mute, `←`/`→` seek. The bar reveals on hover/focus while playing and stays visible when paused.
- **`ambient`** — muted autoplay loop for backgrounds; **honors `prefers-reduced-motion`** (falls back to the static poster with a quiet "motion paused" marker).
- **Do:** provide a WebM source for broad engine support (open-source Chromium can't decode H.264). **Don't:** use `player` mode without a `label`.

### ImageCarousel
A swipeable photo gallery — distinct from the data `Carousel`.
- **Props:** `slides` (`{ src, alt, caption? }[]`), `aspect` (default `16/9`), `radius`, `arrows` (default true), `dots` (default true), `label`.
- Aspect-consistent full-bleed slides with scroll-snap, hover prev/next arrows, dot indicators, and keyboard nav (focus the gallery, then `←`/`→`). Active dot + arrows use the theme accent; slides are lazy with optional per-slide captions.

> **Assets in the demo.** The style guide uses pre-verified Unsplash stills and a CC0 sample clip (MDN `flower`) vendored into `public/media/` as both `.webm` and `.mp4`, served same-origin for reliable range requests. Swap for your own assets in a real app.

---

## 5. Adoption

```bash
npm install
npm run dev      # style guide at http://localhost:5173
npm run build    # tsc -b && vite build — 0 TS errors
```

```tsx
import { Button, StatCard, Sparkline, Avatar, Insight } from "./lib/ep";
import { color, motion } from "./tokens";

<StatCard
  label="Pipeline value"
  value="$4.82M"
  delta={{ value: 12.4, direction: "up" }}
  chart={<Sparkline data={[3.1, 3.4, 3.8, 4.0, 4.5, 4.82]} width={54} height={18} />}
/>
```

**Stack:** React 18 · TypeScript (strict) · Tailwind CSS v4 (`@theme`) · Vite 6 · framer-motion 11 · lucide-react. Dark-only by design (`<html class="dark">`, `color-scheme: dark`).

---

## 6. Apple News Format (ANF) coverage

Editorial Proxima covers every Apple News Format component role — the vocabulary to render any Apple News article in this system's aesthetic. All roles are exported from the single `./lib/ep` path and showcased live in the style guide's **Apple News Format** section (`#anf`), each labeled with its role name. Existing EP components are reused, not duplicated.

**Honesty guardrails.** Three role groups are **representative** by design — styled frames/placeholders in the EP aesthetic, not live integrations: social embeds, web-video embeds, ads, and the AR component. They are labeled as such in the UI and below.

| ANF category | ANF role | EP component | Notes |
|---|---|---|---|
| **Text** | Title | `Title` | Serif display headline. |
| | Heading1–6 | `Heading` | One component; `level` 1–6. |
| | Intro | `Intro` | Serif standfirst / dek. |
| | Body | `Body` | Serif body at ~42rem measure. |
| | Caption | `Caption` | Small serif caption. |
| | Author | `Author` | Attribution (unprefixed). |
| | Byline | `Byline` | "By {name}". |
| | Illustrator | `Illustrator` | "Illustration by {name}". |
| | Photographer | `Photographer` | "Photographs by {name}". |
| | Quote | `Quote` | Blockquote w/ accent rule. |
| | PullQuote | `PullQuote` | Large display pull-quote. |
| **Visual media** | Image | `Image` | The media-family Image (reused). |
| | Photo | `Photo` | Image, photo default. |
| | Figure | `Figure` | Image + required caption. |
| | Portrait | `Portrait` | Image, 4/5 person crop. |
| | Logo | `Logo` | Contained mark on a tile. |
| **Collections** | Gallery | `Gallery` | Wraps `ImageCarousel` (reused). |
| | Mosaic | `Mosaic` | Tiled grid, 2×2 lead tile. |
| **Multimedia** | Video | `Video` | The media-family Video (reused). |
| | EmbedWebVideo | `EmbedWebVideo` | **Representative** YT/Vimeo card — not a live SDK. |
| | Audio | `AudioPlayer` | `variant="audio"`; EP accent control bar. |
| | Music | `AudioPlayer` | `variant="music"`; artwork + track/artist. |
| **Location** | Map | `MapCard` | **Representative** styled map + accent pin — no live tiles. |
| | Place | `Place` | Location caption (pin + name + address). |
| **Social** | Tweet | `Tweet` | **Representative** X post card. |
| | Instagram | `Instagram` | **Representative** IG post card. |
| | FacebookPost | `FacebookPost` | **Representative** FB post card. |
| **Tabular** | DataTable | `DataTable` | Typed columns, mono numerals, striping. |
| | HTMLTable | `HTMLTable` | Headers + rows for HTML-table content. |
| **HTML embed** | *(general)* | `HtmlEmbed` | Arbitrary HTML block. Default: sandboxed `srcDoc` iframe (`sandbox="allow-scripts"`, isolated, auto-sized). `isolate={false}` renders **trusted** HTML inline (XSS risk otherwise; no `<script>` execution). Complements `HTMLTable`. |
| **Structural** | Container | `Container` | Reading / wide measure. |
| | Section | `Section` | Labeled article region. |
| | Chapter | `Chapter` | Numbered chapter break. |
| | Aside | `Aside` | Offset callout w/ accent edge. |
| | Header | `ArticleHeader` | Article masthead (distinct from site `TopBar`). |
| | Divider | `Divider` | `line` / `accent` / `dots`. |
| | ArticleLink | `ArticleLink` | "Read next" card. |
| | LinkButton | `LinkButton` | CTA link styled as a button. |
| **Advertising** | BannerAdvertisement | `BannerAdvertisement` | **Placeholder** 728×90, labeled Advertisement. |
| | MediumRectangleAdvertisement | `MediumRectangleAdvertisement` | **Placeholder** 300×250. |
| | ReplicaAdvertisement | `ReplicaAdvertisement` | **Placeholder** native/sponsored card. |
| **Immersive** | ARKit | `ARViewer` | **Representative** 3D/AR poster + "View in AR / 3D" affordance — not a real AR pipeline. |

All ANF components are theme-aware: accent affordances (play buttons, scrubbers, pins, rules, active states) resolve to `var(--color-accent)` and recolor with the active theme. Assets in the demo are pre-verified Unsplash stills plus vendored CC0 clips in `public/media/` (`flower.webm`/`.mp4`, `audio.ogg`/`.mp3`), served same-origin.
