import { useState } from 'react'
import type { FormEvent } from 'react'
import type { AlbumStatus, NewAlbum } from '../types/album'

interface AlbumFormProps {
  onSubmit: (album: NewAlbum) => Promise<void>
  isSaving: boolean
}

function AlbumForm({ onSubmit, isSaving }: AlbumFormProps) {
  const [title, setTitle] = useState('')
  const [artist, setArtist] = useState('')
  const [genre, setGenre] = useState('')
  const [status, setStatus] = useState<AlbumStatus>('Want to listen')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const newAlbum: NewAlbum = {
      title,
      subtitle: artist,
      category: genre,
      status,
      rating: null,
      imageUrl: '',
      notes: '',
      tags: [],
      date: null,
    }

    await onSubmit(newAlbum)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Album title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="artist">Artist</label>
        <input
          id="artist"
          type="text"
          value={artist}
          onChange={(event) => setArtist(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="genre">Genre</label>
        <input
          id="genre"
          type="text"
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status</label>
        <select
          id="status"
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

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Add album'}
      </button>
    </form>
  )
}

export default AlbumForm
