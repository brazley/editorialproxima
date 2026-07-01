import { useId } from "react";

export interface SparklineProps {
  /** Raw series; normalized internally to fit the box. */
  data: number[];
  width?: number;
  height?: number;
  /** Stroke color — pass loss/gain to color a trend. Default accent. */
  stroke?: string;
}

/**
 * Bare inline sparkline — a normalized area+line drawn from a series.
 * No axes, no labels: a texture of a trend, sized to sit inside a
 * StatCard. Uses a stable useId so the gradient never collides.
 */
export function Sparkline({
  data,
  width = 88,
  height = 28,
  stroke = "var(--color-accent)",
}: SparklineProps) {
  const uid = useId();
  const min = Math.min(...data);
  const max = Math.max(...data);
  const span = max - min || 1;
  const step = width / (data.length - 1);
  const pts = data.map((d, i) => {
    const x = i * step;
    const y = height - ((d - min) / span) * (height - 4) - 2;
    return [x, y] as const;
  });
  const line = pts
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`)
    .join(" ");
  const area = `${line} L${width},${height} L0,${height} Z`;
  const gid = `sg-${uid}`;

  return (
    <svg width={width} height={height} className="overflow-visible" aria-hidden>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path
        d={line}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r="1.8" fill={stroke} />
    </svg>
  );
}
