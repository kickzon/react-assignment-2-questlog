import { Link } from 'react-router-dom'
import type { Album } from '../types/album'

interface AlbumCardProps {
  album: Album
}

function AlbumCard({ album }: AlbumCardProps) {
  return (
    <article className="album-card">
      {album.imageUrl ? (
        <img
          className="album-cover"
          src={album.imageUrl}
          alt={`Cover artwork for ${album.title}`}
        />
      ) : (
        <div className="album-cover album-cover-placeholder" aria-hidden="true">
          ♪
        </div>
      )}

      <div className="album-card-content">
        <div className="album-card-heading">
          <span className="status-badge">{album.status}</span>

          {album.rating != null && (
            <span className="album-rating">{album.rating}/5</span>
          )}
        </div>

        <h2>
          <Link className="album-card-link" to={`/albums/${album.id}`}>
            {album.title}
          </Link>
        </h2>

        <p className="album-artist">{album.subtitle}</p>
        <p className="album-genre">{album.category}</p>
      </div>
    </article>
  )
}

export default AlbumCard
