import type { AlbumFilter } from "../types/album";
import { ListMusic } from "lucide-react";
import StatusIcon from "./StatusIcon";

interface StatusFilterProps {
  selectedStatus: AlbumFilter;
  onStatusChange: (status: AlbumFilter) => void;
}

const statuses: AlbumFilter[] = [
  "All",
  "Want to listen",
  "Listening",
  "Listened",
  "Dropped",
];

function StatusFilter({ selectedStatus, onStatusChange }: StatusFilterProps) {
  return (
    <nav className="filter-nav" aria-label="Filter albums by status">
      <ul className="filter-list">
        {statuses.map((status) => (
          <li key={status}>
            <button
              className="filter-button"
              type="button"
              aria-pressed={selectedStatus === status}
              onClick={() => onStatusChange(status)}
            >
              {status === "All" ? (
                <ListMusic
                  className="status-icon"
                  size={16}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              ) : (
                <StatusIcon status={status} />
              )}
              {status}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default StatusFilter;
