import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cx } from "./util";

export interface NavLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  active?: boolean;
  children: ReactNode;
}

/**
 * NavLink — a primary-nav item. Router-agnostic: pass `active` yourself
 * (from whatever routing you use). Inactive links sit at ink-3 and warm
 * to ink-2 on hover; the active link is full ink.
 */
export function NavLink({ active = false, className, children, ...rest }: NavLinkProps) {
  return (
    <a
      className={cx(
        "rounded-field px-3 py-1.5 text-[13px] transition-colors",
        active ? "text-ink" : "text-ink-3 hover:text-ink-2",
        className,
      )}
      aria-current={active ? "page" : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}

export interface TopBarBrandProps {
  /** Single-letter masthead initial, set in the display serif. */
  initial: string;
  /** Full wordmark (shown from md up). */
  wordmark: string;
  /** Short wordmark (shown below md). */
  short?: string;
}

/** Editorial masthead mark — a squared, hairline tile holding a serif initial. */
function Brand({ initial, wordmark, short }: TopBarBrandProps) {
  return (
    <span className="inline-flex items-center gap-3 select-none">
      <span
        className="grid h-8 w-8 shrink-0 place-items-center border border-line-strong bg-elevated"
        style={{ borderRadius: 5 }}
      >
        <span className="display text-[19px] font-semibold leading-none text-ink" style={{ marginTop: -1 }}>
          {initial}
        </span>
      </span>
      <span className="display hidden text-[15px] font-semibold leading-none tracking-tight text-ink md:inline">
        {wordmark}
      </span>
      {short && (
        <span className="display text-[15px] font-semibold leading-none tracking-tight text-ink md:hidden">
          {short}
        </span>
      )}
    </span>
  );
}

export interface TopBarProps {
  brand: TopBarBrandProps;
  /** Primary nav — render NavLinks. Hidden below xl. */
  nav?: ReactNode;
  /** Center slot — typically an <AskBar/>. Hidden below md. */
  center?: ReactNode;
  /** Trailing actions — icon buttons, a Post button, an Avatar. */
  actions?: ReactNode;
  className?: string;
}

/**
 * TopBar — the sticky editorial masthead: brand, primary nav, a centered
 * ask/search slot, and trailing actions. Translucent with a backdrop
 * blur so content scrolls under it, over a single hairline.
 */
export function TopBar({ brand, nav, center, actions, className }: TopBarProps) {
  return (
    <div
      className={cx(
        "sticky top-0 z-30 border-b border-line bg-canvas/85 backdrop-blur-xl",
        className,
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1220px] items-center gap-4 px-5 sm:px-8">
        <Brand {...brand} />
        {nav && (
          <nav className="ml-5 hidden items-center gap-1 xl:flex" aria-label="Primary">
            {nav}
          </nav>
        )}
        {center && <div className="mx-auto hidden w-full max-w-sm md:block">{center}</div>}
        {actions && <div className="ml-auto flex items-center gap-1.5 md:ml-4">{actions}</div>}
      </div>
    </div>
  );
}
