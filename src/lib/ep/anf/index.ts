/* ==================================================================== *
   ANF — Apple News Format component set.
   Editorial Proxima components covering every ANF role. Re-exported
   through the main library barrel, so they share one import path:

       import { Title, Body, Figure, Mosaic, AdSlot } from "./lib/ep";
 * ==================================================================== */

// TEXT
export {
  Title,
  Heading,
  Intro,
  Body,
  Caption,
  Byline,
  Author,
  Illustrator,
  Photographer,
  Quote,
  PullQuote,
} from "./Text";
export type { HeadingLevel } from "./Text";

// STRUCTURAL
export {
  Container,
  Section,
  Chapter,
  Aside,
  ArticleHeader,
  Divider,
  ArticleLink,
  LinkButton,
} from "./Structural";
export type { DividerVariant, LinkButtonProps } from "./Structural";

// VISUAL MEDIA (built on Image)
export { Photo, Figure, Portrait, Logo } from "./Figure";

// COLLECTIONS
export { Gallery, Mosaic } from "./Collections";
export type { MosaicImage, MosaicProps } from "./Collections";

// MULTIMEDIA (embeds & audio)
export { EmbedWebVideo, AudioPlayer, HtmlEmbed } from "./Embed";
export type { WebVideoPlatform, AudioVariant } from "./Embed";

// SOCIAL (representative)
export { Tweet, Instagram, FacebookPost } from "./Social";

// TABULAR
export { DataTable, HTMLTable } from "./Table";
export type { DataColumn, DataTableProps, HTMLTableProps } from "./Table";

// ADVERTISING (labeled placeholders)
export {
  BannerAdvertisement,
  MediumRectangleAdvertisement,
  ReplicaAdvertisement,
} from "./Ad";

// LOCATION (representative)
export { MapCard, Place } from "./Location";

// IMMERSIVE (representative)
export { ARViewer } from "./Immersive";
