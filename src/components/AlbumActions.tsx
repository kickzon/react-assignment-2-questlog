import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Album, AlbumChanges, AlbumStatus } from '../types/album'

interface AlbumActionsProps {
  album: Album
  isSaving: boolean
  onUpdate: (changes: AlbumChanges) => Promise<void>
  onDelete: () => Promise<void>
}

function AlbumActions({
  album,
  isSaving,
  onUpdate,
  onDelete,
}: AlbumActionsProps) {
  const [status, setStatus] = useState<AlbumStatus>(album.status)
  const [rating, setRating] = useState(
    album.rating === null ? '' : String(album.rating),
  )

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    await onUpdate({
      status,
      rating: rating === '' ? null : Number(rating),
    })
  }

  async function handleDelete() {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${album.title}"?`,
    )

    if (shouldDelete) {
      await onDelete()
    }
  }

  return (
    <section>
      <h2>Edit album</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="edit-status">Status</label>
          <select
            id="edit-status"
            value={status}
            onChange={(event) =>
              setStatus(event.target.value as AlbumStatus)
            }
          >
            <option value="Want to listen">Want to listen</option>
            <option value="Listening">Listening</option>
            <option value="Listened">Listened</option>
            <option value="Dropped">Dropped</option>
          </select>
        </div>

        <div>
          <label htmlFor="edit-rating">Rating</label>
          <select
            id="edit-rating"
            value={rating}
            onChange={(event) => setRating(event.target.value)}
          >
            <option value="">Not rated</option>
            <option value="1">1/5</option>
            <option value="2">2/5</option>
            <option value="3">3/5</option>
            <option value="4">4/5</option>
            <option value="5">5/5</option>
          </select>
        </div>

        <button type="submit" disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save changes'}
        </button>
      </form>

      <button type="button" onClick={handleDelete} disabled={isSaving}>
        Delete album
      </button>
    </section>
  )
}

export default AlbumActions
