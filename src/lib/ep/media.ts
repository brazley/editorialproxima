/* ------------------------------------------------------------------ *
   Shared media grammar — the named aspect ratios and radius options the
   Image, Video, and ImageCarousel components all speak. Keeping them in
   one place means a slide, a poster, and a player can be locked to the
   same ratio with the same token.
 * ------------------------------------------------------------------ */

/** The supported aspect ratios, keyed by their familiar name. */
export const ASPECT = {
  "16/9": "16 / 9",
  "3/2": "3 / 2",
  "4/3": "4 / 3",
  "1/1": "1 / 1",
  "4/5": "4 / 5",
} as const;

export type AspectRatio = keyof typeof ASPECT;

/** System radius, as a Tailwind class, for media frames. */
export const MEDIA_RADIUS_CLASS = {
  none: "",
  chip: "rounded-chip",
  card: "rounded-card",
  panel: "rounded-panel",
} as const;

export type MediaRadius = keyof typeof MEDIA_RADIUS_CLASS;

/** Format seconds as m:ss for a scrubber readout. */
export function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}
