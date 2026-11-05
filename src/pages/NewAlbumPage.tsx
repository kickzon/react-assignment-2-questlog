import { useNavigate } from 'react-router-dom'
import AlbumForm from '../components/AlbumForm'
import { useSaveAlbum } from '../hooks/useSaveAlbum'
import type { NewAlbum } from '../types/album'

function NewAlbumPage() {
  const navigate = useNavigate()
  const { createAlbum, isSaving, error } = useSaveAlbum()

  async function handleSubmit(album: NewAlbum) {
    const createdAlbum = await createAlbum(album)

    if (createdAlbum) {
      navigate(`/albums/${createdAlbum.id}`)
    }
  }

  return (
    <section>
      <h1>Add an album</h1>

      {error && <p role="alert">{error}</p>}

      <AlbumForm onSubmit={handleSubmit} isSaving={isSaving} />
    </section>
  )
}

export default NewAlbumPage
