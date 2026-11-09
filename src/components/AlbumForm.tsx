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
  const [rating, setRating] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [date, setDate] = useState('')
  const [notes, setNotes] = useState('')
  const [tags, setTags] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const parsedTags = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const newAlbum: NewAlbum = {
      title,
      subtitle: artist,
      category: genre,
      status,
      rating: rating === '' ? null : Number(rating),
      imageUrl,
      notes,
      tags: parsedTags,
      date: date === '' ? null : date,
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
          maxLength={100}
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
          maxLength={100}
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
          maxLength={40}
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

      <div>
        <label htmlFor="rating">Rating</label>
        <select
          id="rating"
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

      <div>
        <label htmlFor="image-url">Cover image URL</label>
        <input
          id="image-url"
          type="url"
          value={imageUrl}
          onChange={(event) => setImageUrl(event.target.value)}
          placeholder="https://example.com/cover.jpg"
        />
      </div>

      <div>
        <label htmlFor="date">Date listened</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      <div>
        <label htmlFor="tags">Tags</label>
        <input
          id="tags"
          type="text"
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          aria-describedby="tags-help"
        />
        <small id="tags-help">Separate tags with commas.</small>
      </div>

      <div>
        <label htmlFor="notes">Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          maxLength={2000}
          rows={5}
        />
      </div>

      <button type="submit" disabled={isSaving}>
        {isSaving ? 'Saving...' : 'Add album'}
      </button>
    </form>
  )
}

export default AlbumForm
