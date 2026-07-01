import type { ReactNode } from "react";
import { cx } from "../util";

/* ==================================================================== *
   ANF · TABULAR
   DataTable — a typed, aligned editorial table (mono numerals, hairline
   rows, striping). HTMLTable — a lighter headers+rows table for arbitrary
   HTML-table content.
 * ==================================================================== */

export interface DataColumn<Row> {
  key: keyof Row & string;
  header: ReactNode;
  /** Right-align + mono for numeric columns. */
  numeric?: boolean;
  render?: (row: Row) => ReactNode;
}

export interface DataTableProps<Row> {
  columns: DataColumn<Row>[];
  rows: Row[];
  caption?: ReactNode;
  /** Zebra-stripe alternate rows. Default true. */
  striped?: boolean;
  className?: string;
}

/** ANF: DataTable — a structured, aligned data table. */
export function DataTable<Row extends Record<string, unknown>>({
  columns,
  rows,
  caption,
  striped = true,
  className,
}: DataTableProps<Row>) {
  return (
    <figure className={cx("m-0 overflow-hidden rounded-card border border-line", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong bg-elevated/60">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  className={cx(
                    "px-3.5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-3",
                    c.numeric && "text-right",
                  )}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className={cx("border-b border-line last:border-b-0", striped && i % 2 === 1 && "bg-canvas/40")}
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={cx(
                      "px-3.5 py-2.5 text-[13px] text-ink",
                      c.numeric ? "tnum text-right text-ink" : "text-ink-2",
                    )}
                  >
                    {c.render ? c.render(row) : (row[c.key] as ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="border-t border-line px-3.5 py-2 text-[11.5px] text-ink-3" style={{ fontFamily: "var(--font-serif)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

export interface HTMLTableProps {
  headers: ReactNode[];
  rows: ReactNode[][];
  caption?: ReactNode;
  className?: string;
}

/** ANF: HTMLTable — a simple headers + rows table for HTML-table content. */
export function HTMLTable({ headers, rows, caption, className }: HTMLTableProps) {
  return (
    <figure className={cx("m-0 overflow-hidden rounded-card border border-line", className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-line-strong">
              {headers.map((h, i) => (
                <th key={i} scope="col" className="px-3.5 py-2.5 text-[12px] font-semibold text-ink">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className="border-b border-line last:border-b-0">
                {r.map((cell, j) => (
                  <td key={j} className="px-3.5 py-2.5 text-[13px] text-ink-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {caption && (
        <figcaption className="border-t border-line px-3.5 py-2 text-[11.5px] text-ink-3" style={{ fontFamily: "var(--font-serif)" }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
