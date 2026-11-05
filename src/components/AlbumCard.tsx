import { Link } from 'react-router-dom'
import type { Album } from '../types/album'

interface AlbumCardProps {
  album: Album
}

function AlbumCard({ album }: AlbumCardProps) {
  return (
    <article>
      {album.imageUrl && (
        <img src={album.imageUrl} alt={`Cover artwork for ${album.title}`} />
      )}

      <div>
        <h2>
          <Link to={`/albums/${album.id}`}>{album.title}</Link>
        </h2>

        <p>{album.subtitle}</p>
        <p>Status: {album.status}</p>

        {album.rating != null && <p>Rating: {album.rating}/5</p>}
      </div>
    </article>
  )
}

export default AlbumCard
