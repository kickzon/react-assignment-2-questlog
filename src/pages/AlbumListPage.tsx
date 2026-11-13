import AlbumCard from "../components/AlbumCard";
import StatusFilter from "../components/StatusFilter";
import { useAlbums } from "../hooks/useAlbums";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { AlbumFilter } from "../types/album";
import { Headphones } from "lucide-react";

function AlbumListPage() {
  const [selectedStatus, setSelectedStatus] = useLocalStorage<AlbumFilter>(
    "soundshelf-status-filter",
    "All",
  );

  const apiStatus = selectedStatus === "All" ? undefined : selectedStatus;
  const { albums, isLoading, error } = useAlbums(apiStatus);

  return (
    <section className="albums-page">
      <header className="page-heading album-page-heading">
        <div className="album-page-heading-content">
          <p className="eyebrow">Your personal listening log</p>
          <h1>My albums</h1>
          <p className="page-introduction">
            Save albums, track your listening progress and remember your
            favourites.
          </p>
        </div>

        <div className="hero-icon" aria-hidden="true">
          <Headphones size={96} strokeWidth={1.5} />
        </div>
      </header>

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {isLoading ? (
        <p className="status-message">Loading albums...</p>
      ) : error ? (
        <p className="status-message error-message" role="alert">
          {error}
        </p>
      ) : albums.length === 0 ? (
        <div className="empty-state">
          <h2>No albums found</h2>
          <p>Try another status or add a new album to your shelf.</p>
        </div>
      ) : (
        <div className="album-grid">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </section>
  );
}

export default AlbumListPage;
