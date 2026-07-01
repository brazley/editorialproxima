import {
  Title,
  Heading,
  Intro,
  Body,
  Caption,
  Byline,
  Author,
  Illustrator,
  Photographer,
  Quote,
  PullQuote,
  Section as AnfSection,
  Chapter,
  Aside,
  ArticleHeader,
  Divider,
  ArticleLink,
  LinkButton,
  Photo,
  Figure,
  Portrait,
  Logo,
  Gallery,
  Mosaic,
  EmbedWebVideo,
  AudioPlayer,
  HtmlEmbed,
  Tweet,
  Instagram,
  FacebookPost,
  DataTable,
  HTMLTable,
  BannerAdvertisement,
  MediumRectangleAdvertisement,
  ReplicaAdvertisement,
  MapCard,
  Place,
  ARViewer,
} from "../lib/ep";
import { GuideSection, Group, Stage, Usage, Code } from "./parts";

const u = (id: string, w = 900) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const A = {
  office: u("1497215728101-856f4ea42174"),
  team: u("1522071820081-009f0129c71c"),
  analytics: u("1460925895917-afdab827c52f"),
  desk: u("1504384308090-c894fdcc538d"),
  charts: u("1454165804606-c3d57bc86b40"),
  building: u("1486406146926-c627a92ad1ab"),
  bloom: u("1490750967868-88aa4486c946"),
  ridge: u("1470071459604-3b5ec3a7fe05"),
  forest: u("1500534623283-312aade485b7"),
  pines: u("1441974231531-c6227db76b6e"),
  portrait: u("1544005313-94ddf0286df2", 600),
  watch: u("1523275335684-37898b6baf30", 700),
};
const THUMB = u("1454165804606-c3d57bc86b40", 400);

// A contained brand mark (base64 SVG) for the Logo role — no network dep.
const LOGO_SRC =
  "data:image/svg+xml;base64," +
  btoa(
    `<svg xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48">` +
      `<text x="0" y="34" fill="#fafafa" font-family="Georgia,serif" font-size="30" font-weight="600" letter-spacing="-0.5">Proxima</text>` +
      `<rect x="150" y="8" width="30" height="30" rx="5" fill="none" stroke="#5b8def" stroke-width="2" opacity="0"/></svg>`,
  );

const AUDIO_SOURCES = [
  { src: "/media/audio.ogg", type: "audio/ogg" },
  { src: "/media/audio.mp3", type: "audio/mpeg" },
];

/** A small "ANF role" tag shown above an example. */
function Role({ children }: { children: string }) {
  return (
    <span className="mb-2 inline-block rounded-chip border border-line px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.08em] text-ink-3">
      ANF · {children}
    </span>
  );
}

export function ANFSection() {
  return (
    <GuideSection
      id="anf"
      kicker="Library"
      title="Apple News Format"
      blurb="Editorial Proxima covers every Apple News Format component role — the vocabulary to render any Apple News article, in this system's dark editorial aesthetic. Each example is labeled with the ANF role it satisfies."
    >
      {/* ============================ TEXT ============================ */}
      <Group title="Text" note="Title · Heading1–6 · Intro · Body · Caption · Author/Byline/Illustrator/Photographer · Quote · PullQuote">
        <Stage>
          <Role>Title</Role>
          <Title>Certification that comes to you, not a directory you dig through.</Title>

          <div className="mt-6">
            <Role>Heading1–6</Role>
            <div className="space-y-2">
              <Heading level={1}>Heading level 1</Heading>
              <Heading level={2}>Heading level 2</Heading>
              <Heading level={3}>Heading level 3</Heading>
              <Heading level={4}>Heading level 4</Heading>
              <Heading level={5}>Heading level 5</Heading>
              <Heading level={6}>Heading level 6</Heading>
            </div>
          </div>

          <div className="mt-6">
            <Role>Intro</Role>
            <Intro>
              A certified-business network for every small and local business — registry-grade
              certification, AI-native matchmaking, and live opportunity flow from the Exchange.
            </Intro>
          </div>

          <div className="mt-6">
            <Role>Body</Role>
            <Body>
              Where the incumbent certifies minority-owned firms only, the Market recognizes all five
              diverse categories — verified once and honored everywhere. The credential is portable, the
              status is live, and buyers see a green check the moment they meet you. No re-verification,
              no expired-cert surprises, no directory to dig through.
            </Body>
          </div>

          <div className="mt-6">
            <Role>Caption</Role>
            <Caption>The Exchange floor during the Q3 certification drive. Photographs are illustrative.</Caption>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            <div>
              <Role>Byline</Role>
              <div><Byline name="Carl Okafor" /></div>
            </div>
            <div>
              <Role>Author</Role>
              <div><Author name="Meridian Editorial" /></div>
            </div>
            <div>
              <Role>Illustrator</Role>
              <div><Illustrator name="A. Rivera" /></div>
            </div>
            <div>
              <Role>Photographer</Role>
              <div><Photographer name="J. Adebayo" /></div>
            </div>
          </div>

          <div className="mt-6">
            <Role>Quote</Role>
            <Quote cite="Procurement lead, Fortune 100 buyer">
              We stopped searching a directory and started getting a ranked shortlist the day a mandate
              went live.
            </Quote>
          </div>

          <div className="mt-6">
            <Role>PullQuote</Role>
            <PullQuote attribution="The Market — certification, reimagined">
              Verified once. Honored everywhere.
            </PullQuote>
          </div>
        </Stage>
        <Usage>
          Editorial matter is serif (Source Serif 4); attribution lines are quiet sans.{" "}
          <Code>Heading</Code> takes a <Code>level</Code> 1–6 rather than shipping six components. Body
          sits at a ~42rem measure for readability.
        </Usage>
      </Group>

      {/* ========================= STRUCTURAL ======================== */}
      <Group title="Structural" note="Container · Section · Chapter · Aside · Header · Divider · ArticleLink · LinkButton">
        <Stage>
          <Role>Header</Role>
          <ArticleHeader
            kicker="The Market · Certified Business Network"
            title="One credential. Every category."
            byline={<Byline name="Carl Okafor" />}
            meta={<span>8 min read · Jul 2026</span>}
          />

          <div className="mt-8">
            <Role>Chapter</Role>
            <Chapter index={2} title="How the matchmaking actually works" />
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div>
              <Role>Aside</Role>
              <Aside label="By the numbers">
                18,400 certified businesses, 2,300 buyer members, and $1.8B in contract value flowed over
                the trailing twelve months.
              </Aside>
            </div>
            <div>
              <Role>Section</Role>
              <AnfSection label="Methodology">
                <Body>
                  Every profile is verified, capability-tagged, and scored against what a buyer actually
                  purchases.
                </Body>
              </AnfSection>
            </div>
          </div>

          <div className="mt-8">
            <Role>Divider</Role>
            <div className="space-y-1">
              <Divider variant="line" />
              <Divider variant="accent" />
              <Divider variant="dots" />
            </div>
          </div>

          <div className="mt-6">
            <Role>ArticleLink</Role>
            <ArticleLink
              href="#anf"
              kicker="Read next"
              title="Inside the portable verified credential"
              source="The Market · 6 min"
              thumb={THUMB}
              thumbAlt="Printed charts"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Role>LinkButton</Role>
            <LinkButton href="#anf">Get certified</LinkButton>
            <LinkButton href="#anf" variant="secondary">
              Join as a buyer
            </LinkButton>
            <LinkButton href="#anf" variant="accent">
              Request a demo
            </LinkButton>
          </div>

          <div className="mt-6">
            <Role>Container</Role>
            <p className="text-[12px] text-ink-3">
              <Code>Container</Code> centers article content at a reading measure (~44rem) or{" "}
              <Code>wide</Code> for full-bleed regions — this whole section sits inside one.
            </p>
          </div>
        </Stage>
      </Group>

      {/* ======================= VISUAL MEDIA ======================== */}
      <Group title="Visual media" note="Image · Photo · Figure · Portrait · Logo — built on the Image component">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Role>Photo</Role>
            <Photo src={A.office} alt="An open-plan workspace" />
          </div>
          <div>
            <Role>Figure</Role>
            <Figure
              src={A.analytics}
              alt="Analytics on a laptop"
              kicker="Exhibit A"
              caption="Pipeline held above four million through Q3."
              credit="Photo · Unsplash"
            />
          </div>
          <div>
            <Role>Portrait</Role>
            <Portrait src={A.portrait} alt="A person" caption="Carl Okafor, Partnerships" />
          </div>
          <div>
            <Role>Logo</Role>
            <Logo src={LOGO_SRC} alt="Proxima wordmark" />
          </div>
        </div>
        <Usage>
          The ANF <Code>Image</Code> role is the Media section's <Code>Image</Code>. <Code>Figure</Code>{" "}
          = image + required caption; <Code>Portrait</Code> = 4/5 person crop; <Code>Logo</Code> = a
          contained mark on a surface tile.
        </Usage>
      </Group>

      {/* ======================== COLLECTIONS ======================== */}
      <Group title="Collections" note="Gallery (built on ImageCarousel) · Mosaic (tiled grid)">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <Role>Gallery</Role>
            <Gallery
              aspect="4/3"
              label="Editorial gallery"
              slides={[
                { src: A.ridge, alt: "A ridge at dusk", caption: "At altitude." },
                { src: A.pines, alt: "Pines", caption: "Coast to coast." },
                { src: A.forest, alt: "Forest", caption: "Certified, everywhere." },
              ]}
            />
          </div>
          <div>
            <Role>Mosaic</Role>
            <Mosaic
              images={[
                { src: A.building, alt: "A civic building", caption: "The institutions" },
                { src: A.team, alt: "A team" },
                { src: A.desk, alt: "A desk" },
                { src: A.charts, alt: "Charts" },
                { src: A.office, alt: "An office" },
              ]}
            />
          </div>
        </div>
        <Usage>
          <Code>Gallery</Code> is the swipeable carousel (one image at a time). <Code>Mosaic</Code> shows
          every tile at once with a 2×2 lead — the tiled multi-image grid.
        </Usage>
      </Group>

      {/* ========================= MULTIMEDIA ======================== */}
      <Group title="Multimedia" note="Video · EmbedWebVideo (representative) · Audio · Music">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Role>EmbedWebVideo</Role>
            <EmbedWebVideo
              platform="youtube"
              poster={A.bloom}
              title="How the matchmaking actually works"
              channel="The Market · 4:12"
              duration="4:12"
            />
          </div>
          <div className="space-y-4">
            <div>
              <Role>Music</Role>
              <AudioPlayer
                variant="music"
                sources={AUDIO_SOURCES}
                artwork={A.forest}
                title="Ambient Loop"
                artist="Editorial Proxima · sample CC0"
              />
            </div>
            <div>
              <Role>Audio</Role>
              <AudioPlayer variant="audio" sources={AUDIO_SOURCES} title="Field recording — sample clip" />
            </div>
          </div>
        </div>
        <Usage>
          The ANF <Code>Video</Code> role is the Media section's <Code>Video</Code>.{" "}
          <Code>EmbedWebVideo</Code> is a representative YouTube/Vimeo card (not a live SDK).{" "}
          <Code>Audio</Code>/<Code>Music</Code> share one player with the EP accent control bar.
        </Usage>
      </Group>

      {/* ========================= HTML EMBED ======================== */}
      <Group title="HTML embed" note="HtmlEmbed — arbitrary HTML in a sandboxed iframe (complements HTMLTable)">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div>
            <Role>HtmlEmbed · sandboxed</Role>
            <HtmlEmbed
              title="Sample embedded HTML"
              caption="Rendered in an isolated iframe (sandbox: allow-scripts)."
              html={`<div style="font-family:ui-sans-serif,system-ui;padding:18px;border:1px solid #262626;border-radius:6px;background:#141414">
  <div style="font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#6b6b6b">Embedded widget</div>
  <div style="margin-top:8px;font-size:20px;font-weight:600;color:#fafafa">Arbitrary HTML, isolated</div>
  <p style="margin:8px 0 0;font-size:13px;line-height:1.5;color:#a0a0a0">This block's markup, styles, and scripts run in their own sandbox — nothing leaks into the page.</p>
  <div style="margin-top:14px;display:flex;gap:8px">
    <span style="font:600 12px ui-monospace;color:#5b8def;border:1px solid #2c3d6b;background:#12182b;border-radius:3px;padding:3px 8px">srcDoc</span>
    <span style="font:600 12px ui-monospace;color:#fafafa;border:1px solid #333;border-radius:3px;padding:3px 8px">sandbox</span>
  </div>
</div>`}
            />
          </div>
          <div className="self-start">
            <Role>HtmlEmbed · inline (trusted)</Role>
            <HtmlEmbed
              isolate={false}
              label="HTML · inline"
              caption="Inline mode — trusted markup only."
              html={`<div style="font-family:inherit"><strong style="color:#fafafa">Inline snippet</strong> — scoped into the page for <em>trusted</em> HTML you control. No &lt;script&gt; execution.</div>`}
            />
          </div>
        </div>
        <Usage>
          <Code>HtmlEmbed</Code> renders an arbitrary HTML block. Default is a{" "}
          <Code>sandbox</Code>ed iframe (isolated styles/scripts, auto-sized);{" "}
          <Code>isolate={"{false}"}</Code> renders trusted HTML inline. Never pass user-supplied markup to inline mode.
        </Usage>
      </Group>

      {/* =========================== SOCIAL ========================== */}
      <Group title="Social" note="Tweet · Instagram · FacebookPost — representative embed chrome">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div>
            <Role>Tweet</Role>
            <Tweet author="The Market" handle="@themarket" timestamp="9:02 AM · Jul 1, 2026">
              Verified once, honored everywhere. The portable credential is live for all five diverse
              categories today.
            </Tweet>
          </div>
          <div>
            <Role>Instagram</Role>
            <Instagram
              author="The Market"
              handle="themarket"
              image={A.pines}
              imageAlt="Pines"
              caption="Certified suppliers, coast to coast. 🌲"
            />
          </div>
          <div>
            <Role>FacebookPost</Role>
            <FacebookPost author="The Market" timestamp="Yesterday at 4:15 PM" image={A.building} imageAlt="A civic building">
              2,300 buyer members now source through the Exchange.
            </FacebookPost>
          </div>
        </div>
        <Usage>
          Representative chrome in the EP aesthetic with sample content — <strong>not</strong> live
          third-party SDK embeds. Each card is plainly tagged “representative.”
        </Usage>
      </Group>

      {/* =========================== TABULAR ========================= */}
      <Group title="Tabular" note="DataTable · HTMLTable — editorial tables with mono numerals">
        <div className="space-y-6">
          <div>
            <Role>DataTable</Role>
            <DataTable
              caption="Certified suppliers, ranked. Figures illustrative."
              columns={[
                { key: "name", header: "Supplier" },
                { key: "region", header: "Region" },
                { key: "fit", header: "Fit", numeric: true },
                { key: "value", header: "Contract value", numeric: true },
              ]}
              rows={[
                { name: "Meridian Data Group", region: "Atlanta, GA", fit: "98%", value: "$2.4M" },
                { name: "Northwind Civic", region: "Denver, CO", fit: "94%", value: "$1.1M" },
                { name: "Harbor Analytics", region: "Boston, MA", fit: "91%", value: "$860K" },
              ]}
            />
          </div>
          <div>
            <Role>HTMLTable</Role>
            <HTMLTable
              headers={["Category", "Code", "Recognized"]}
              rows={[
                ["Minority-owned", "MBE", "Yes"],
                ["Women-owned", "WBE", "Yes"],
                ["Veteran-owned", "VBE", "Yes"],
              ]}
              caption="All five diverse categories, one credential."
            />
          </div>
        </div>
        <Usage>
          <Code>DataTable</Code> is typed with per-column alignment (numeric columns run mono + right).{" "}
          <Code>HTMLTable</Code> takes plain headers + rows for arbitrary HTML-table content.
        </Usage>
      </Group>

      {/* ========================= ADVERTISING ======================= */}
      <Group title="Advertising" note="BannerAdvertisement · MediumRectangleAdvertisement · ReplicaAdvertisement">
        <Stage>
          <Role>BannerAdvertisement</Role>
          <BannerAdvertisement />
          <div className="mt-6 grid grid-cols-1 items-start gap-6 sm:grid-cols-[auto_1fr]">
            <div>
              <Role>MediumRectangleAdvertisement</Role>
              <MediumRectangleAdvertisement />
            </div>
            <div>
              <Role>ReplicaAdvertisement</Role>
              <ReplicaAdvertisement
                advertiser="Northwind"
                headline="Procurement that finds you."
                body="Join 2,300 buyers sourcing certified suppliers through the Exchange."
                cta="Learn more"
              />
            </div>
          </div>
        </Stage>
        <Usage>
          Clearly-labeled placeholder slots at standard IAB sizes — <strong>not</strong> real ad tech.
          Every slot is marked “Advertisement”; the replica adds a “Sponsored” tag.
        </Usage>
      </Group>

      {/* ========================== LOCATION ========================= */}
      <Group title="Location" note="Map · Place — representative">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Role>Map</Role>
            <MapCard
              place="Atlanta, GA"
              coords="33.7490° N, 84.3880° W"
              caption="Meridian Data Group's headquarters, downtown Atlanta."
            />
          </div>
          <div className="space-y-3">
            <Role>Place</Role>
            <Place name="Meridian Data Group" address="191 Peachtree St NE, Atlanta, GA" />
            <Place name="The Exchange · HQ" address="Two Coral Plaza, New York, NY" />
          </div>
        </div>
        <Usage>
          <Code>Map</Code> is a representative styled map card with an accent pin (no live tile
          provider). <Code>Place</Code> is a location caption. Swap in a real map in production.
        </Usage>
      </Group>

      {/* ========================= IMMERSIVE ========================= */}
      <Group title="Immersive" note="ARKit — representative 3D / AR affordance">
        <Stage>
          <div className="mx-auto max-w-md">
            <Role>ARKit</Role>
            <ARViewer poster={A.watch} posterAlt="A product to view in 3D" title="Certified · 3D badge" />
          </div>
        </Stage>
        <Usage>
          A tasteful representative AR/3D card — poster, a “3D” badge, and an accent “View in AR / 3D”
          affordance. <strong>Not</strong> a working AR pipeline; wire to <Code>&lt;model-viewer&gt;</Code>{" "}
          or AR Quick Look (<Code>.usdz</Code>) in production.
        </Usage>
      </Group>
    </GuideSection>
  );
}
