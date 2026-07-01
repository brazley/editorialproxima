import type { ReactNode } from "react";
import { cx } from "../util";

/* ==================================================================== *
   ANF · TEXT roles
   --------------------------------------------------------------------
   The article's written voice, in Editorial Proxima's grammar: Source
   Serif 4 for the editorial matter (title, headings, intro, body, quotes,
   captions), Geist for attribution lines, Geist Mono nowhere here. Each
   component maps to an Apple News Format text role.
 * ==================================================================== */

/** ANF: Title — the article's headline, the largest serif display. */
export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cx(
        "display text-[34px] font-semibold leading-[1.06] tracking-tight text-ink sm:text-[46px]",
        className,
      )}
    >
      {children}
    </h1>
  );
}

const HEADING_SIZE: Record<number, string> = {
  1: "text-[27px] sm:text-[30px] leading-[1.12]",
  2: "text-[22px] sm:text-[24px] leading-tight",
  3: "text-[19px] leading-snug",
  4: "text-[17px] leading-snug",
  5: "text-[15px] leading-snug",
  6: "text-[13px] uppercase tracking-[0.06em] leading-snug",
};

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

/** ANF: Heading1–6 — one component, `level` picks the scale. */
export function Heading({
  level = 2,
  children,
  className,
}: {
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
}) {
  const Tag = `h${level}` as const;
  return (
    <Tag className={cx("display font-semibold tracking-tight text-ink", HEADING_SIZE[level], className)}>
      {children}
    </Tag>
  );
}

/** ANF: Intro — the standfirst / dek, a larger serif lead. */
export function Intro({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx("max-w-[46rem] text-[17px] leading-relaxed text-ink-2 sm:text-[18px]", className)}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </p>
  );
}

/** ANF: Body — a body paragraph, serif, at a readable measure. */
export function Body({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cx("max-w-[42rem] text-[15px] leading-[1.72] text-ink", className)}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </p>
  );
}

/** ANF: Caption — a small serif caption for media. */
export function Caption({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cx("block text-[12.5px] leading-relaxed text-ink-3", className)}
      style={{ fontFamily: "var(--font-serif)" }}
    >
      {children}
    </span>
  );
}

/* ---- attribution lines (Author / Byline / Illustrator / Photographer) --- */

function CreditLine({
  prefix,
  name,
  className,
}: {
  prefix?: string;
  name: ReactNode;
  className?: string;
}) {
  return (
    <span className={cx("text-[12.5px] text-ink-3", className)}>
      {prefix && <span>{prefix} </span>}
      <span className="text-ink-2">{name}</span>
    </span>
  );
}

/** ANF: Byline — "By {name}". */
export function Byline({ name, className }: { name: ReactNode; className?: string }) {
  return <CreditLine prefix="By" name={name} className={className} />;
}

/** ANF: Author — the author's name, unprefixed (for author blocks). */
export function Author({ name, className }: { name: ReactNode; className?: string }) {
  return <CreditLine name={name} className={className} />;
}

/** ANF: Illustrator — "Illustration by {name}". */
export function Illustrator({ name, className }: { name: ReactNode; className?: string }) {
  return <CreditLine prefix="Illustration by" name={name} className={className} />;
}

/** ANF: Photographer — "Photographs by {name}". */
export function Photographer({ name, className }: { name: ReactNode; className?: string }) {
  return <CreditLine prefix="Photographs by" name={name} className={className} />;
}

/** ANF: Quote — a blockquote with a left accent rule. */
export function Quote({
  children,
  cite,
  className,
}: {
  children: ReactNode;
  cite?: ReactNode;
  className?: string;
}) {
  return (
    <blockquote
      className={cx("border-l-2 pl-4", className)}
      style={{ borderColor: "color-mix(in oklch, var(--color-accent) 55%, transparent)" }}
    >
      <p className="text-[16px] leading-relaxed text-ink-2" style={{ fontFamily: "var(--font-serif)" }}>
        {children}
      </p>
      {cite && <cite className="mt-2 block text-[12.5px] not-italic text-ink-3">— {cite}</cite>}
    </blockquote>
  );
}

/** ANF: PullQuote — a large display pull-quote with an accent mark. */
export function PullQuote({
  children,
  attribution,
  className,
}: {
  children: ReactNode;
  attribution?: ReactNode;
  className?: string;
}) {
  return (
    <figure className={cx("my-2 border-y border-line py-6 text-center", className)}>
      <span
        aria-hidden
        className="display block text-[34px] leading-none"
        style={{ color: "color-mix(in oklch, var(--color-accent) 70%, transparent)" }}
      >
        &ldquo;
      </span>
      <p
        className="display mx-auto mt-2 max-w-2xl text-[22px] font-semibold leading-snug tracking-tight text-ink sm:text-[26px]"
      >
        {children}
      </p>
      {attribution && (
        <figcaption className="mt-3 text-[12.5px] uppercase tracking-[0.1em] text-ink-3">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
