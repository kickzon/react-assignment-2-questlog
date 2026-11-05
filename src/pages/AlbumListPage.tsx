import AlbumCard from '../components/AlbumCard'
import { useAlbums } from '../hooks/useAlbums'

function AlbumListPage() {
  const { albums, isLoading, error } = useAlbums()

  if (isLoading) {
    return (
      <section>
        <h1>My albums</h1>
        <p>Loading albums...</p>
      </section>
    )
  }

  if (error) {
    return (
      <section>
        <h1>My albums</h1>
        <p role="alert">{error}</p>
      </section>
    )
  }

  return (
    <section>
      <h1>My albums</h1>

      {albums.length === 0 ? (
        <p>Your album shelf is empty.</p>
      ) : (
        <div>
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      )}
    </section>
  )
}

export default AlbumListPage
