import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { cx } from "../util";
import { Img } from "../Img";

/* ==================================================================== *
   ANF · STRUCTURAL roles
   Container, Section, Chapter, Aside, Header, Divider, ArticleLink,
   LinkButton — the scaffolding that arranges an article.
 * ==================================================================== */

/** ANF: Container — the centered article column. */
export function Container({
  children,
  width = "reading",
  className,
}: {
  children: ReactNode;
  /** `reading` ≈ 44rem measure; `wide` for full-bleed regions. */
  width?: "reading" | "wide";
  className?: string;
}) {
  return (
    <div className={cx("mx-auto w-full", width === "reading" ? "max-w-[44rem]" : "max-w-[1220px]", className)}>
      {children}
    </div>
  );
}

/** ANF: Section — a semantic article region with an optional label. */
export function Section({
  label,
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cx("scroll-mt-24", className)}>
      {label && <div className="kicker mb-3">{label}</div>}
      {children}
    </section>
  );
}

/** ANF: Chapter — a chapter break: a numbered serif marker over a rule. */
export function Chapter({
  index,
  title,
  className,
}: {
  index?: number | string;
  title: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx("my-4 border-t border-line-strong pt-6", className)}>
      {index !== undefined && (
        <span
          className="text-[11px] font-semibold uppercase tracking-[0.14em]"
          style={{ color: "var(--color-accent-ink)" }}
        >
          Chapter {index}
        </span>
      )}
      <h2 className="display mt-2 text-[24px] font-semibold leading-tight tracking-tight text-ink sm:text-[28px]">
        {title}
      </h2>
    </div>
  );
}

/** ANF: Aside — an offset sidebar callout, distinct from body flow. */
export function Aside({
  label = "Aside",
  children,
  className,
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <aside
      className={cx("rounded-card border border-line bg-elevated/60 p-4", className)}
      style={{ borderLeftColor: "color-mix(in oklch, var(--color-accent) 40%, transparent)", borderLeftWidth: 2 }}
    >
      <div className="mb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.12em] text-ink-3">{label}</div>
      <div className="text-[13.5px] leading-relaxed text-ink-2">{children}</div>
    </aside>
  );
}

/** ANF: Header — the article masthead: kicker, title, byline, hero slot. */
export function ArticleHeader({
  kicker,
  title,
  byline,
  meta,
  children,
  className,
}: {
  kicker?: string;
  title: ReactNode;
  byline?: ReactNode;
  meta?: ReactNode;
  /** Optional hero media beneath the header text. */
  children?: ReactNode;
  className?: string;
}) {
  return (
    <header className={cx("", className)}>
      {kicker && (
        <div className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.14em] text-ink-3">
          <span className="h-1 w-1 rounded-full" style={{ background: "var(--color-accent)" }} />
          {kicker}
        </div>
      )}
      <h1 className="display mt-3 max-w-3xl text-[32px] font-semibold leading-[1.08] tracking-tight text-ink sm:text-[44px]">
        {title}
      </h1>
      {(byline || meta) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[12.5px] text-ink-3">
          {byline}
          {byline && meta && <span className="text-ink-3/50">·</span>}
          {meta}
        </div>
      )}
      {children && <div className="mt-6">{children}</div>}
    </header>
  );
}

export type DividerVariant = "line" | "accent" | "dots";

/** ANF: Divider — a hairline rule; `accent` and `dots` variants. */
export function Divider({ variant = "line", className }: { variant?: DividerVariant; className?: string }) {
  if (variant === "dots") {
    return (
      <div className={cx("flex items-center justify-center gap-2 py-4", className)} aria-hidden>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1 w-1 rounded-full"
            style={{ background: i === 1 ? "var(--color-accent)" : "var(--color-line-strong)" }}
          />
        ))}
      </div>
    );
  }
  if (variant === "accent") {
    return (
      <hr
        className={cx("my-6 h-px border-0", className)}
        style={{
          background:
            "linear-gradient(to right, transparent, color-mix(in oklch, var(--color-accent) 55%, transparent), transparent)",
        }}
      />
    );
  }
  return <hr className={cx("my-6 h-px border-0 bg-line", className)} />;
}

/** ANF: ArticleLink — a "read next" card linking to another article. */
export function ArticleLink({
  href,
  kicker,
  title,
  source,
  thumb,
  thumbAlt = "",
  className,
}: {
  href: string;
  kicker?: string;
  title: ReactNode;
  source?: string;
  thumb?: string;
  thumbAlt?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cx(
        "group flex items-center gap-4 rounded-card border border-line bg-surface p-3 transition-colors hover:border-line-strong",
        className,
      )}
    >
      {thumb && (
        <Img src={thumb} alt={thumbAlt} ratio="1 / 1" className="w-20 shrink-0 rounded-chip sm:w-24" />
      )}
      <div className="min-w-0 flex-1">
        {kicker && (
          <span className="text-[10.5px] font-semibold uppercase tracking-[0.12em]" style={{ color: "var(--color-accent-ink)" }}>
            {kicker}
          </span>
        )}
        <h3 className="display mt-1 text-[15px] font-semibold leading-snug tracking-tight text-ink transition-colors group-hover:text-white">
          {title}
        </h3>
        {source && <div className="mt-1.5 text-[12px] text-ink-3">{source}</div>}
      </div>
      <ArrowUpRight size={16} className="shrink-0 text-ink-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink-2" />
    </a>
  );
}

export interface LinkButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: "primary" | "secondary" | "accent";
  children: ReactNode;
}

/** ANF: LinkButton — a call-to-action link styled as a button. */
export function LinkButton({ variant = "primary", className, children, ...rest }: LinkButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-field px-3.5 py-2 text-[13.5px] font-medium transition-transform active:scale-[0.99]";
  const variants = {
    primary: "bg-ink text-canvas hover:scale-[1.015]",
    secondary: "border border-line-strong text-ink-2 hover:text-ink",
    accent: "text-canvas hover:scale-[1.015] [background:var(--color-accent-strong)]",
  } as const;
  return (
    <a className={cx(base, variants[variant], className)} {...rest}>
      {children}
      <ArrowRight size={15} />
    </a>
  );
}
