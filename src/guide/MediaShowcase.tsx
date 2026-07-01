import { Image, Video, ImageCarousel } from "../lib/ep";
import { Group, Stage, Usage, Code } from "./parts";

/* Curated, license-friendly stock — every URL pre-verified 200.
   Images via Unsplash's on-the-fly transform; video via MDN's CC0 sample. */
const u = (id: string, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const IMG = {
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
};

// Vendored CC0 sample (MDN cc0-videos/flower) served same-origin from
// public/media — same-origin means reliable range requests and no host
// flakiness. WebM/VP9 first (broadly decodable, incl. headless Chromium),
// MP4/H.264 as a Safari-friendly fallback. Swap for your own clip.
const VIDEO_SOURCES = [
  { src: "/media/flower.webm", type: "video/webm" },
  { src: "/media/flower.mp4", type: "video/mp4" },
];

/**
 * The media family, live. Rendered at the foot of the Components section.
 */
export function MediaShowcase() {
  return (
    <>
      {/* ---- Image ------------------------------------------------- */}
      <Group title="Image" note="ratio-locked · skeleton + fade · editorial caption">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <Image src={IMG.office} alt="An open-plan workspace" aspect="3/2" />
          <Image
            src={IMG.analytics}
            alt="An analytics dashboard on a laptop"
            aspect="3/2"
            kicker="Markets"
            caption="Live pipeline held above four million through the quarter."
            credit="Photo · Unsplash"
          />
          <Image src={IMG.building} alt="A civic building facade" aspect="3/2" fit="cover" />
        </div>
        <div className="mt-5">
          <div className="mb-2 text-[11.5px] text-ink-3">Configurable aspect — zero layout shift</div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <Image src={IMG.team} alt="A team meeting" aspect="1/1" kicker="1 / 1" />
            <Image src={IMG.desk} alt="A working desk" aspect="4/5" kicker="4 / 5" />
            <Image src={IMG.charts} alt="Printed charts" aspect="4/3" kicker="4 / 3" />
            <Image src={IMG.office} alt="A workspace" aspect="16/9" kicker="16 / 9" />
          </div>
        </div>
        <Usage>
          A ratio-locked <Code>figure</Code> with a skeleton-and-fade media box and an optional editorial
          caption (serif) + credit (mono). Lazy by default; pass <Code>priority</Code> for a hero.
          Aspect: <Code>16/9 · 3/2 · 4/3 · 1/1 · 4/5</Code>.
        </Usage>
      </Group>

      {/* ---- Video ------------------------------------------------- */}
      <Group title="Video" note="click-to-play player · ambient loop · neutral white controls">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.5fr_1fr]">
          <Video
            sources={VIDEO_SOURCES}
            poster={IMG.bloom}
            mode="player"
            aspect="16/9"
            label="A flower blooming in time-lapse"
            caption="Click to play — the transport controls are neutral white, so they read cleanly over any footage."
            credit="Video · MDN CC0"
          />
          <Video
            sources={VIDEO_SOURCES}
            poster={IMG.forest}
            mode="ambient"
            aspect="4/3"
            caption="Ambient — muted autoplay loop; honors reduced-motion."
          />
        </div>
        <Usage>
          <Code>mode="player"</Code> gives a custom control bar with neutral white transport chrome
          (play/pause, mute, white scrubber) over a scrim — legible on any footage — keyboard-operable
          (<Code>space</Code>/<Code>k</Code>, <Code>m</Code>, arrows).{" "}
          <Code>mode="ambient"</Code> is a muted autoplay loop for backgrounds that falls back to the
          static poster under <Code>prefers-reduced-motion</Code>.
        </Usage>
      </Group>

      {/* ---- ImageCarousel ---------------------------------------- */}
      <Group title="ImageCarousel" note="swipeable gallery · accent arrows & dots · keyboard nav">
        <Stage>
          <div className="mx-auto max-w-2xl">
            <ImageCarousel
              aspect="16/9"
              label="Editorial photo gallery"
              slides={[
                { src: IMG.ridge, alt: "A mountain ridge at dusk", caption: "The network, at altitude." },
                { src: IMG.pines, alt: "A stand of pines", caption: "Certified suppliers, coast to coast." },
                { src: IMG.building, alt: "A civic building", caption: "Institutions doing the buying." },
                { src: IMG.team, alt: "A team at work", caption: "Warm intros, prioritized." },
              ]}
            />
          </div>
        </Stage>
        <Usage>
          Distinct from the data <Code>Carousel</Code>: aspect-consistent full-bleed slides with
          scroll-snap, hover arrows, dot indicators, and keyboard nav (focus it, then arrow keys). The
          active dot and arrows use the theme accent; slides are lazy with optional per-slide captions.
        </Usage>
      </Group>
    </>
  );
}
