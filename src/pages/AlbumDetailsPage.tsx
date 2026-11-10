import { Link, useNavigate, useParams } from "react-router-dom";
import AlbumActions from "../components/AlbumActions";
import { useAlbum } from "../hooks/useAlbum";
import { useSaveAlbum } from "../hooks/useSaveAlbum";
import type { AlbumChanges } from "../types/album";

function AlbumDetailsPage() {
  const { albumId } = useParams<{ albumId: string }>();
  const navigate = useNavigate();

  const { album, isLoading, error, refetch } = useAlbum(albumId);
  const {
    updateAlbum,
    deleteAlbum,
    isSaving,
    error: saveError,
  } = useSaveAlbum();

  async function handleUpdate(changes: AlbumChanges) {
    if (!albumId) {
      return;
    }

    const updatedAlbum = await updateAlbum(albumId, changes);

    if (updatedAlbum) {
      refetch();
    }
  }

  async function handleDelete() {
    if (!albumId) {
      return;
    }

    const wasDeleted = await deleteAlbum(albumId);

    if (wasDeleted) {
      navigate("/");
    }
  }

  if (isLoading) {
    return <p className="status-message">Loading album...</p>;
  }

  if (error) {
    return (
      <section className="details-page">
        <p className="status-message error-message" role="alert">
          {error}
        </p>
        <Link className="back-link" to="/">
          Back to albums
        </Link>
      </section>
    );
  }

  if (!album) {
    return (
      <section className="details-page">
        <div className="empty-state">
          <h1>Album not found</h1>
          <p>The requested album could not be found.</p>
        </div>
        <Link className="back-link" to="/">
          Back to albums
        </Link>
      </section>
    );
  }

  return (
    <section className="details-page">
      <Link className="back-link" to="/">
        ← Back to albums
      </Link>

      <div className="details-layout">
        {album.imageUrl ? (
          <img
            className="details-cover"
            src={album.imageUrl}
            alt={`Cover artwork for ${album.title}`}
          />
        ) : (
          <div
            className="details-cover details-cover-placeholder"
            aria-hidden="true"
          >
            ♪
          </div>
        )}

        <div className="details-content">
          <span className="status-badge">{album.status}</span>
          <h1>{album.title}</h1>
          <p className="details-artist">{album.subtitle}</p>

          <dl className="album-metadata">
            <div>
              <dt>Genre</dt>
              <dd>{album.category}</dd>
            </div>

            {album.rating != null && (
              <div>
                <dt>Rating</dt>
                <dd>{album.rating}/5</dd>
              </div>
            )}

            {album.date && (
              <div>
                <dt>Date listened</dt>
                <dd>{album.date}</dd>
              </div>
            )}
          </dl>

          {album.notes && (
            <div className="details-section">
              <h2>Notes</h2>
              <p>{album.notes}</p>
            </div>
          )}

          {album.tags.length > 0 && (
            <div className="details-section">
              <h2>Tags</h2>
              <ul className="tag-list">
                {album.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {saveError && (
        <p className="status-message error-message" role="alert">
          {saveError}
        </p>
      )}

      <AlbumActions
        key={album.id}
        album={album}
        isSaving={isSaving}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </section>
  );
}

export default AlbumDetailsPage;
