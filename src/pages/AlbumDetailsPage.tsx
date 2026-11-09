import { Link, useNavigate, useParams } from 'react-router-dom'
import AlbumActions from '../components/AlbumActions'
import { useAlbum } from '../hooks/useAlbum'
import { useSaveAlbum } from '../hooks/useSaveAlbum'
import type { AlbumChanges } from '../types/album'

function AlbumDetailsPage() {
  const { albumId } = useParams<{ albumId: string }>()
  const navigate = useNavigate()

  const { album, isLoading, error, refetch } = useAlbum(albumId)
  const {
    updateAlbum,
    deleteAlbum,
    isSaving,
    error: saveError,
  } = useSaveAlbum()

  async function handleUpdate(changes: AlbumChanges) {
    if (!albumId) {
      return
    }

    const updatedAlbum = await updateAlbum(albumId, changes)

    if (updatedAlbum) {
      refetch()
    }
  }

  async function handleDelete() {
    if (!albumId) {
      return
    }

    const wasDeleted = await deleteAlbum(albumId)

    if (wasDeleted) {
      navigate('/')
    }
  }

  if (isLoading) {
    return (
      <section>
        <p>Loading album...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <p role="alert">{error}</p>
        <Link to="/">Back to albums</Link>
      </section>
    )
  }

  if (!album) {
    return (
      <section>
        <p>Album not found.</p>
        <Link to="/">Back to albums</Link>
      </section>
    )
  }

  return (
    <section>
      <Link to="/">Back to albums</Link>

      {album.imageUrl && (
        <img src={album.imageUrl} alt={`Cover artwork for ${album.title}`} />
      )}

      <h1>{album.title}</h1>
      <p>Artist: {album.subtitle}</p>
      <p>Genre: {album.category}</p>
      <p>Status: {album.status}</p>

      {album.rating != null && <p>Rating: {album.rating}/5</p>}

      {album.date && <p>Date completed: {album.date}</p>}

      {album.notes && (
        <>
          <h2>Notes</h2>
          <p>{album.notes}</p>
        </>
      )}

      {album.tags.length > 0 && (
        <>
          <h2>Tags</h2>
          <ul>
            {album.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </>
      )}

      {saveError && <p role="alert">{saveError}</p>}

      <AlbumActions
        key={album.id}
        album={album}
        isSaving={isSaving}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </section>
  )
}

export default AlbumDetailsPage
