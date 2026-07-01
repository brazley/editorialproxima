/* ==================================================================== *
   EDITORIAL PROXIMA — component library
   The formalized, prop-driven primitives of the system. One import path.

       import { Button, StatCard, Avatar, Insight } from "./lib/ep";
 * ==================================================================== */

export { cx, initials } from "./util";

export { Avatar } from "./Avatar";
export type { AvatarProps, AvatarTint, AvatarShape } from "./Avatar";

export { Button } from "./Button";
export type { ButtonProps, ButtonVariant, ButtonSize } from "./Button";

export {
  Badge,
  TypePill,
  CertDot,
  CertBadge,
  CATEGORY_HUE,
  CATEGORY_CONIC,
  CATEGORY_LINEAR,
} from "./Chip";
export type {
  BadgeProps,
  TypePillProps,
  PillTone,
  CertDotProps,
  CertBadgeProps,
  CategoryHue,
} from "./Chip";

export { Card, Panel } from "./Card";
export type { SurfaceTone } from "./Card";

export { Sparkline } from "./Sparkline";
export type { SparklineProps } from "./Sparkline";

export { DeltaPill } from "./DeltaPill";
export type { DeltaPillProps, Delta, Direction } from "./DeltaPill";

export { StatCard } from "./StatCard";
export type { StatCardProps } from "./StatCard";

export { Img } from "./Img";
export type { ImgProps } from "./Img";

export { Image } from "./Image";
export type { ImageProps } from "./Image";

export { Video } from "./Video";
export type { VideoProps, VideoMode, VideoSource } from "./Video";

export { ImageCarousel } from "./ImageCarousel";
export type { ImageCarouselProps, CarouselSlide } from "./ImageCarousel";

export { ASPECT, MEDIA_RADIUS_CLASS, formatTime } from "./media";
export type { AspectRatio, MediaRadius } from "./media";

export { Kicker, SectionLabel, SectionHead } from "./SectionHead";
export type { KickerProps, SectionHeadProps } from "./SectionHead";

export { FactCard, Carousel } from "./FactCard";
export type { FactCardProps, CarouselProps } from "./FactCard";

export { Insight } from "./Insight";
export type { InsightProps, InsightVariant } from "./Insight";

export { EngagementRow } from "./EngagementRow";
export type { EngagementRowProps, EngagementCounts } from "./EngagementRow";

export { AskBar } from "./AskBar";
export type { AskBarProps } from "./AskBar";

export { TopBar, NavLink } from "./TopBar";
export type { TopBarProps, NavLinkProps, TopBarBrandProps } from "./TopBar";

// ── Apple News Format (ANF) role components ──────────────────────────
export * from "./anf";
