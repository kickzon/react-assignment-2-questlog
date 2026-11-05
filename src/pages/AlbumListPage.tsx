import AlbumCard from '../components/AlbumCard'
import StatusFilter from '../components/StatusFilter'
import { useAlbums } from '../hooks/useAlbums'
import { useLocalStorage } from '../hooks/useLocalStorage'
import type { AlbumFilter } from '../types/album'

function AlbumListPage() {
  const [selectedStatus, setSelectedStatus] =
    useLocalStorage<AlbumFilter>('soundshelf-status-filter', 'All')

  const apiStatus = selectedStatus === 'All' ? undefined : selectedStatus
  const { albums, isLoading, error } = useAlbums(apiStatus)

  return (
    <section>
      <h1>My albums</h1>

      <StatusFilter
        selectedStatus={selectedStatus}
        onStatusChange={setSelectedStatus}
      />

      {isLoading ? (
        <p>Loading albums...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : albums.length === 0 ? (
        <p>No albums found for this status.</p>
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
