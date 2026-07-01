import { cx } from "../util";

/* ==================================================================== *
   ANF · ADVERTISING (clearly-labeled placeholder slots)
   BannerAdvertisement · MediumRectangleAdvertisement ·
   ReplicaAdvertisement. These are placeholders at standard IAB sizes,
   plainly marked "Advertisement" — not real ad tech.
 * ==================================================================== */

function AdLabel({ children }: { children: string }) {
  return (
    <span className="text-[9.5px] font-semibold uppercase tracking-[0.18em] text-ink-3">{children}</span>
  );
}

/** A dashed placeholder slot at a fixed IAB size. */
function AdSlot({ w, h, size, className }: { w: number; h: number; size: string; className?: string }) {
  return (
    <div className={cx("mx-auto flex max-w-full flex-col items-center", className)}>
      <AdLabel>Advertisement</AdLabel>
      <div
        className="mt-1.5 grid max-w-full place-items-center rounded-card border border-dashed border-line-strong bg-elevated/40"
        style={{ width: w, height: h, maxWidth: "100%" }}
      >
        <span className="tnum text-[11px] text-ink-3">
          {size} · {w}×{h}
        </span>
      </div>
    </div>
  );
}

/** ANF: BannerAdvertisement — a leaderboard slot (728×90). */
export function BannerAdvertisement({ className }: { className?: string }) {
  return <AdSlot w={728} h={90} size="Leaderboard" className={className} />;
}

/** ANF: MediumRectangleAdvertisement — the 300×250 medium rectangle. */
export function MediumRectangleAdvertisement({ className }: { className?: string }) {
  return <AdSlot w={300} h={250} size="Medium Rectangle" className={className} />;
}

/**
 * ANF: ReplicaAdvertisement — a native "replica" ad: styled like editorial
 * content but plainly marked Advertisement / Sponsored.
 */
export function ReplicaAdvertisement({
  advertiser = "Sponsor",
  headline,
  body,
  cta = "Learn more",
  className,
}: {
  advertiser?: string;
  headline: string;
  body?: string;
  cta?: string;
  className?: string;
}) {
  return (
    <aside
      className={cx("rounded-card border p-4", className)}
      style={{ borderColor: "var(--color-line-strong)" }}
    >
      <div className="flex items-center justify-between">
        <AdLabel>Advertisement</AdLabel>
        <span className="rounded-chip border border-line bg-elevated px-1.5 py-0.5 text-[10px] text-ink-3">
          Sponsored · {advertiser}
        </span>
      </div>
      <h3 className="display mt-2 text-[16px] font-semibold leading-snug tracking-tight text-ink">{headline}</h3>
      {body && <p className="mt-1.5 text-[13px] leading-relaxed text-ink-2">{body}</p>}
      <button
        type="button"
        className="mt-3 inline-flex items-center gap-1.5 rounded-field border border-line-strong px-2.5 py-1.5 text-[12.5px] font-medium text-ink-2 transition-colors hover:text-ink"
      >
        {cta}
      </button>
    </aside>
  );
}
