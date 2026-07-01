import type { ReactNode } from "react";
import { SectionLabel } from "../lib/ep";
import { cx } from "../lib/ep";

/* ------------------------------------------------------------------ *
   Shared building blocks for the style guide itself. These are NOT part
   of the exported library — they are the scaffolding that documents it.
 * ------------------------------------------------------------------ */

/** A top-level guide section: anchored, with a serif header and blurb. */
export function GuideSection({
  id,
  kicker,
  title,
  blurb,
  children,
}: {
  id: string;
  kicker: string;
  title: string;
  blurb?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-line pt-14">
      <SectionLabel>{kicker}</SectionLabel>
      <h2 className="display mt-2 text-[26px] font-semibold leading-tight tracking-tight text-ink sm:text-[30px]">
        {title}
      </h2>
      {blurb && <p className="mt-2.5 max-w-2xl text-[14px] leading-relaxed text-ink-2">{blurb}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

/** A labeled sub-group inside a section. */
export function Group({
  title,
  note,
  children,
  className,
}: {
  title: string;
  note?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("mb-10", className)}>
      <div className="mb-4 flex items-baseline gap-2.5">
        <h3 className="text-[13px] font-semibold text-ink">{title}</h3>
        {note && <span className="text-[12px] text-ink-3">{note}</span>}
      </div>
      {children}
    </div>
  );
}

/** A framed live example — the component sits on a canvas-toned stage. */
export function Stage({
  children,
  className,
  center = false,
}: {
  children: ReactNode;
  className?: string;
  center?: boolean;
}) {
  return (
    <div
      className={cx(
        "rounded-card border border-line bg-canvas/40 p-6",
        center && "flex flex-wrap items-center gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
}

/** Monospace usage caption under an example. */
export function Usage({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 text-[12px] leading-relaxed text-ink-3">
      {children}
    </p>
  );
}

/** Inline mono code token. */
export function Code({ children }: { children: ReactNode }) {
  return (
    <code className="tnum rounded-chip border border-line bg-elevated px-1.5 py-0.5 text-[11.5px] text-ink-2">
      {children}
    </code>
  );
}
