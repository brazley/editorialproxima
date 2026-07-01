import {
  Plus,
  BadgeCheck,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Search,
} from "lucide-react";
import {
  Button,
  Badge,
  TypePill,
  CertBadge,
  CertDot,
  Card,
  Panel,
  StatCard,
  Sparkline,
  Avatar,
  FactCard,
  Carousel,
  Kicker,
  SectionLabel,
  SectionHead,
  Insight,
  EngagementRow,
  AskBar,
  TopBar,
  NavLink,
  Img,
} from "../lib/ep";
import { GuideSection, Group, Stage, Usage, Code } from "./parts";
import { MediaShowcase } from "./MediaShowcase";

/* Sample imagery — inline SVG data URIs so the demo never shows a broken
   tile, while still exercising Img's aspect-box + fade-in. */
function gradientTile(a: string, b: string, label: string): string {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400">` +
    `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">` +
    `<stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/>` +
    `</linearGradient></defs>` +
    `<rect width="600" height="400" fill="url(#g)"/>` +
    `<text x="28" y="368" fill="rgba(250,250,250,0.72)" font-family="Georgia,serif" font-size="30" font-style="italic">${label}</text>` +
    `</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

const IMG_A = gradientTile("#1b2740", "#0a0a0a", "Markets");
const IMG_B = gradientTile("#2a2130", "#0a0a0a", "Policy");

export function ComponentSection() {
  return (
    <GuideSection
      id="components"
      kicker="Library"
      title="Components"
      blurb="Every primitive in the system, live and prop-driven. Each is dependency-light, accessible by default, and squared to match the whole. Import any of them from a single path."
    >
      {/* ---- Button ------------------------------------------------- */}
      <Group title="Button" note="four intents · two sizes">
        <Stage center>
          <Button icon={<Plus size={15} strokeWidth={2.4} />}>Post</Button>
          <Button variant="secondary" trailingIcon={<ArrowRight size={15} />}>
            Join as a buyer
          </Button>
          <Button variant="ghost">Dismiss</Button>
          <Button variant="accent" icon={<BadgeCheck size={16} />}>
            Get certified
          </Button>
          <Button size="sm">Express interest</Button>
          <Button size="sm" variant="secondary" trailingIcon={<ArrowUpRight size={14} />}>
            View brief
          </Button>
          <Button disabled>Disabled</Button>
        </Stage>
        <Usage>
          <Code>primary</Code> is the inverted workhorse (near-white on canvas). <Code>accent</Code> is
          the reserved periwinkle CTA — keep it rare so it keeps its meaning. Do: one primary action per
          view. Don't: use <Code>accent</Code> for ordinary buttons.
        </Usage>
      </Group>

      {/* ---- Chips -------------------------------------------------- */}
      <Group title="Chip · Badge · TypePill · Cert" note="the smallest labels — squared, never pills">
        <Stage center>
          <Badge>Cloud</Badge>
          <Badge>Analytics</Badge>
          <TypePill label="RFP" tone="accent" />
          <TypePill label="Award" tone="gold" />
          <TypePill label="Update" />
          <CertBadge hue="gold">MBE</CertBadge>
          <CertBadge hue="rose">WBE</CertBadge>
          <CertBadge hue="spectrum">All categories</CertBadge>
          <span className="inline-flex items-center gap-1.5 text-[12px] text-ink-2">
            <CertDot hue="blue" /> VBE
          </span>
        </Stage>
        <Usage>
          <Code>Badge</Code> = neutral tag. <Code>TypePill</Code> = uppercase classifier (accent / gold
          tones carry meaning). <Code>CertBadge</Code>/<Code>CertDot</Code> carry a muted category hue;{" "}
          <Code>spectrum</Code> spans all categories at once.
        </Usage>
      </Group>

      {/* ---- Avatar ------------------------------------------------- */}
      <Group title="Avatar" note="people = round · companies = squared">
        <Stage center>
          <Avatar name="Carl Okafor" size={44} tint="sand" />
          <Avatar name="Ada Lovelace" size={44} />
          <Avatar name="Meridian Data Group" size={44} shape="square" tint="accent" />
          <Avatar name="Northwind Civic" size={44} shape="square" />
          <Avatar name="Ada Lovelace" size={30} />
          <Avatar name="Meridian" size={30} shape="square" tint="accent" />
        </Stage>
        <Usage>
          The real-world convention, encoded: people are round and set in the sans; companies are squared
          and set in the serif. <Code>tint="accent"</Code> signals a verified/AI subject.
        </Usage>
      </Group>

      {/* ---- StatCard + Sparkline + DeltaPill ----------------------- */}
      <Group title="StatCard · Sparkline · DeltaPill" note="one number that matters">
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3">
          <StatCard
            label="Pipeline value"
            value="$4.82M"
            note="vs. $4.29M last week"
            delta={{ value: 12.4, direction: "up" }}
            chart={<Sparkline data={[3.1, 3.4, 3.3, 3.8, 4.0, 4.2, 4.5, 4.82]} width={54} height={18} />}
          />
          <StatCard
            label="Win rate"
            value="61%"
            note="down from 64%"
            delta={{ value: 3, direction: "down" }}
            invertDelta
            chart={
              <Sparkline
                data={[68, 66, 67, 64, 63, 62, 63, 61]}
                width={54}
                height={18}
                stroke="var(--color-loss)"
              />
            }
          />
          <StatCard
            label="Matches this quarter"
            value="4,120"
            note="AI-scored across 18,400"
            accent
            chart={<Sparkline data={[2.6, 2.9, 3.2, 3.5, 3.7, 3.9, 4.0, 4.12]} width={54} height={18} />}
          />
        </div>
        <Usage>
          Numbers are always mono so columns align. <Code>invertDelta</Code> flips good/bad for
          down-is-good metrics (the arrow still shows the literal move). <Code>accent</Code> marks the
          lead stat with a thin top rule. The <Code>chart</Code> slot keeps the trend renderer swappable.
        </Usage>
      </Group>

      {/* ---- Card / Panel ------------------------------------------ */}
      <Group title="Card · Panel" note="4px card · 6px panel · surface layering">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card interactive className="p-5">
            <SectionLabel>Card</SectionLabel>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
              The primary container — 4px radius, hairline border, surface fill. <Code>interactive</Code>{" "}
              warms the border on hover.
            </p>
          </Card>
          <Panel glow className="p-5">
            <div className="flex items-center gap-2">
              <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-accent)" }} />
              <SectionLabel>Panel · glow</SectionLabel>
            </div>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-2">
              The larger container — 6px radius for scale. <Code>glow</Code> lays the faint accent wash
              behind, for AI/verified contexts like a masthead.
            </p>
          </Panel>
        </div>
      </Group>

      {/* ---- FactCard + Carousel ----------------------------------- */}
      <Group title="FactCard · Carousel" note="the TL;DR fact row">
        <Stage>
          <Carousel>
            <FactCard kicker="Contract" value="$2.4M" accent />
            <FactCard kicker="Term" value="36 mo" />
            <FactCard kicker="Category" value="Data eng." />
            <FactCard kicker="Region" value="Southeast" />
            <FactCard kicker="Close" value="Q3 '26" />
          </Carousel>
        </Stage>
        <Usage>
          A horizontal, snap-scrolling row of compact stat tiles. The lead fact takes{" "}
          <Code>accent</Code> — the one intelligence hint in the row. <Code>Carousel</Code> owns only the
          scroll behavior; drop any tiles inside.
        </Usage>
      </Group>

      {/* ---- SectionHead ------------------------------------------- */}
      <Group title="SectionHead · Kicker · SectionLabel" note="editorial section openers">
        <Stage>
          <SectionHead
            kicker="AI Matchmaking"
            title="Proactive, explainable matches."
            blurb="No search box, no on-request report — the system reads every live mandate against every certified supplier."
          />
          <div className="mt-2 flex items-center gap-4">
            <SectionLabel>Serif kicker</SectionLabel>
            <Kicker tone="accent">Sans kicker · accent</Kicker>
            <Kicker>Sans kicker · plain</Kicker>
          </div>
        </Stage>
      </Group>

      {/* ---- Insight ----------------------------------------------- */}
      <Group title="Insight" note="intelligence as a whisper">
        <Stage>
          <Insight label="Proxima read">
            Direct fit for enterprise data-platform builds; two of your references sit on their panel.
          </Insight>
          <div className="mt-4">
            <Insight variant="callout" label="Proxima read">
              Your diverse spend is tracking 14% ahead of goal — three contracts closed through the
              Exchange this month.
            </Insight>
          </div>
        </Stage>
        <Usage>
          The one place the reserved periwinkle speaks. <Code>inline</Code> footnotes a card;{" "}
          <Code>callout</Code> is a tinted standalone box. Keep them sparse — the glow only means
          something because it's rare.
        </Usage>
      </Group>

      {/* ---- EngagementRow ----------------------------------------- */}
      <Group title="EngagementRow" note="endorse · comment · share">
        <Card className="p-5">
          <div className="flex items-start gap-3">
            <Avatar name="Meridian Data Group" size={40} shape="square" tint="accent" />
            <div className="min-w-0">
              <div className="display text-[14.5px] font-semibold leading-tight text-ink">
                Meridian Data Group
              </div>
              <div className="mt-0.5 text-[12px] text-ink-3">Shared an update · 2h</div>
            </div>
          </div>
          <p className="mt-3 text-[14px] leading-relaxed text-ink" style={{ fontFamily: "var(--font-serif)" }}>
            We closed our first contract sourced entirely through the Exchange this week.
          </p>
          <EngagementRow counts={{ endorse: 128, comment: 24, share: 11 }} />
        </Card>
      </Group>

      {/* ---- AskBar ------------------------------------------------- */}
      <Group title="AskBar" note="the AI ask/search input — focus me">
        <Stage>
          <div className="max-w-md">
            <AskBar placeholder="Ask Proxima or search the exchange…" label="Ask Proxima or search" />
          </div>
        </Stage>
        <Usage>
          Quiet at rest, warm on focus: the sparkle and border shift to accent and a faint glow blooms.
          Controlled (<Code>value</Code>/<Code>onChange</Code>) or uncontrolled.
        </Usage>
      </Group>

      {/* ---- TopBar + NavLink -------------------------------------- */}
      <Group title="TopBar · NavLink" note="the sticky editorial masthead">
        <div className="overflow-hidden rounded-card border border-line">
          <TopBar
            brand={{ initial: "P", wordmark: "Editorial Proxima", short: "EP" }}
            nav={
              <>
                <NavLink href="#" active>
                  The Exchange
                </NavLink>
                <NavLink href="#">Market</NavLink>
                <NavLink href="#">News</NavLink>
                <NavLink href="#">Network</NavLink>
              </>
            }
            center={<AskBar placeholder="Ask Proxima…" />}
            actions={
              <>
                <button
                  className="grid h-9 w-9 place-items-center rounded-field text-ink-3 transition-colors hover:bg-surface hover:text-ink-2"
                  aria-label="Search"
                >
                  <Search size={17} />
                </button>
                <button
                  className="relative grid h-9 w-9 place-items-center rounded-field text-ink-3 transition-colors hover:bg-surface hover:text-ink-2"
                  aria-label="Notifications"
                >
                  <Bell size={17} />
                  <span
                    className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full"
                    style={{ background: "var(--color-accent)" }}
                  />
                </button>
                <Button size="sm" icon={<Plus size={15} strokeWidth={2.4} />} className="hidden sm:inline-flex">
                  Post
                </Button>
                <Avatar name="Carl Okafor" size={34} tint="sand" className="ml-1" />
              </>
            }
          />
          <div className="bg-canvas px-5 py-8 text-center text-[12px] text-ink-3">
            Composed from <Code>brand</Code>, <Code>nav</Code>, <Code>center</Code>, and{" "}
            <Code>actions</Code> slots. Router-agnostic — pass <Code>active</Code> to NavLink yourself.
          </div>
        </div>
      </Group>

      {/* ---- Img --------------------------------------------------- */}
      <Group title="Img" note="aspect-box · skeleton shimmer · fade-in">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <Card>
              <Img src={IMG_A} alt="Markets illustration" ratio="16 / 10" />
            </Card>
            <Usage>16:10 · fades in over a reserved box</Usage>
          </div>
          <div>
            <Card>
              <Img src={IMG_B} alt="Policy illustration" ratio="16 / 10" />
            </Card>
            <Usage>Zero layout shift — ratio reserves space</Usage>
          </div>
          <div>
            <div
              className="relative overflow-hidden rounded-card border border-line bg-elevated"
              style={{ aspectRatio: "16 / 10" }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(100deg, var(--color-elevated) 30%, color-mix(in oklch, var(--color-line-strong) 60%, var(--color-elevated)) 50%, var(--color-elevated) 70%)",
                }}
              />
            </div>
            <Usage>The skeleton state (frozen for reference)</Usage>
          </div>
        </div>
      </Group>

      {/* ---- Media family ------------------------------------------ */}
      <div id="media" className="scroll-mt-24 border-t border-line pt-10">
        <h3 className="display text-[20px] font-semibold tracking-tight text-ink">Media</h3>
        <p className="mt-1.5 max-w-2xl text-[13px] leading-relaxed text-ink-2">
          Image, Video, and ImageCarousel — theme-aware, squared, and restrained. Real stock assets;
          accent affordances recolor with the active theme.
        </p>
        <div className="mt-7">
          <MediaShowcase />
        </div>
      </div>
    </GuideSection>
  );
}
