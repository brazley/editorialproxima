import { GuideSection, Group, Code } from "./parts";

function Specimen({
  sample,
  meta,
  className,
  style,
}: {
  sample: string;
  meta: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className="border-b border-line py-4 last:border-b-0">
      <div className={className} style={style}>
        {sample}
      </div>
      <div className="mt-2 text-[11.5px] text-ink-3">{meta}</div>
    </div>
  );
}

export function TypeSection() {
  return (
    <GuideSection
      id="type"
      kicker="Foundations"
      title="Typography"
      blurb="Three families, three jobs. Source Serif 4 is the editorial voice; Geist carries body and UI; Geist Mono holds every number in tabular alignment. The serif does the emotional work, the sans does the labor, the mono keeps the figures honest."
    >
      <Group title="Source Serif 4" note="display · headlines · editorial body — the .display utility">
        <div className="rounded-card border border-line bg-canvas/40 px-6 py-2">
          <Specimen
            sample="Here's what moved."
            meta="display · 32px / 600 · page header (h1)"
            className="display font-semibold text-ink"
            style={{ fontSize: 32, letterSpacing: "-0.012em", lineHeight: 1.12 }}
          />
          <Specimen
            sample="One credential. Every category."
            meta="display · 22px / 600 · section title (h2)"
            className="display font-semibold text-ink"
            style={{ fontSize: 22, letterSpacing: "-0.02em" }}
          />
          <Specimen
            sample="Certification that comes to you — not a directory you dig through."
            meta="serif · 14.5px / 400 · editorial body (update posts)"
            className="text-ink-2"
            style={{ fontFamily: "var(--font-serif)", fontSize: 14.5, lineHeight: 1.6 }}
          />
        </div>
      </Group>

      <Group title="Geist" note="body & UI — the default family">
        <div className="rounded-card border border-line bg-canvas/40 px-6 py-2">
          <Specimen
            sample="Ranked matches, explained — pushed to both sides of the network."
            meta="sans · 15px / 500 · lead / card title"
            className="font-medium text-ink"
            style={{ fontSize: 15 }}
          />
          <Specimen
            sample="A certified-business network for every small and local business."
            meta="sans · 13.5px / 400 · body copy"
            className="text-ink-2"
            style={{ fontSize: 13.5, lineHeight: 1.6 }}
          />
          <Specimen
            sample="Posted an opportunity · warm intros prioritized"
            meta="sans · 12px / 400 · meta / caption (ink-3)"
            className="text-ink-3"
            style={{ fontSize: 12 }}
          />
        </div>
      </Group>

      <Group title="Geist Mono" note="tabular numerals — the .tnum utility · every metric">
        <div className="rounded-card border border-line bg-canvas/40 px-6 py-2">
          <Specimen
            sample="$4.82M   +12.4%   18,400   9 days"
            meta="tnum · 22px / 500 · headline metrics"
            className="tnum font-medium text-ink"
            style={{ fontSize: 22 }}
          />
          <Specimen
            sample="ID · ABE-MBE-0187      Valid → 2027"
            meta="tnum · 11px / 400 · IDs, credential lines"
            className="tnum text-ink-3"
            style={{ fontSize: 11 }}
          />
        </div>
      </Group>

      <Group title="Kicker" note="the newspaper eyebrow — small serif, uppercase, tracked">
        <div className="rounded-card border border-line bg-canvas/40 px-6 py-6">
          <span className="kicker">The Exchange</span>
          <p className="mt-3 text-[12px] text-ink-3">
            The <Code>.kicker</Code> utility: Source Serif 4, 12px, 600, uppercase, <Code>0.06em</Code>{" "}
            tracking, ink-3. Opens sections without competing with the display headline beneath it.
          </p>
        </div>
      </Group>
    </GuideSection>
  );
}
