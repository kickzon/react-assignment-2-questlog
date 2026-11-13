import {
  CircleCheck,
  CircleX,
  Headphones,
  Hourglass,
  type LucideIcon,
} from "lucide-react";
import type { AlbumStatus } from "../types/album";

interface StatusIconProps {
  status: AlbumStatus;
}

const statusIcons = {
  "Want to listen": Hourglass,
  Listening: Headphones,
  Listened: CircleCheck,
  Dropped: CircleX,
} satisfies Record<AlbumStatus, LucideIcon>;

function StatusIcon({ status }: StatusIconProps) {
  const Icon = statusIcons[status];

  return (
    <Icon
      className="status-icon"
      size={16}
      strokeWidth={2}
      aria-hidden="true"
    />
  );
}

export default StatusIcon;