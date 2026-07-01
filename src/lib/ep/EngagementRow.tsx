import { ThumbsUp, MessageSquare, Share2, type LucideIcon } from "lucide-react";

export interface EngagementCounts {
  endorse: number;
  comment: number;
  share: number;
}

export interface EngagementRowProps {
  counts: EngagementCounts;
  onEndorse?: () => void;
  onComment?: () => void;
  onShare?: () => void;
}

const ACTIONS: { key: keyof EngagementCounts; icon: LucideIcon; label: string }[] = [
  { key: "endorse", icon: ThumbsUp, label: "Endorse" },
  { key: "comment", icon: MessageSquare, label: "Comment" },
  { key: "share", icon: Share2, label: "Share" },
];

/**
 * EngagementRow — the endorse / comment / share action bar that closes a
 * feed post. Sits above a hairline top border; labels hide on narrow
 * widths, counts stay in mono so they don't jitter.
 */
export function EngagementRow({ counts, onEndorse, onComment, onShare }: EngagementRowProps) {
  const handlers: Record<keyof EngagementCounts, (() => void) | undefined> = {
    endorse: onEndorse,
    comment: onComment,
    share: onShare,
  };
  return (
    <div className="mt-4 flex items-center gap-1 border-t border-line pt-3">
      {ACTIONS.map(({ key, icon: Icon, label }) => (
        <button
          key={key}
          type="button"
          onClick={handlers[key]}
          className="group inline-flex items-center gap-1.5 rounded-field px-2.5 py-1.5 text-[12.5px] font-medium text-ink-3 transition-colors hover:bg-elevated hover:text-ink-2"
        >
          <Icon size={14} className="transition-colors group-hover:text-ink-2" />
          <span className="hidden sm:inline">{label}</span>
          <span className="tnum text-ink-3">{counts[key]}</span>
        </button>
      ))}
    </div>
  );
}
