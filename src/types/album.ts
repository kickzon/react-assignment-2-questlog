export type AlbumStatus =
  | 'Want to listen'
  | 'Listening'
  | 'Listened'
  | 'Dropped'

export type AlbumFilter = AlbumStatus | 'All'

export interface Album {
  id: string
  title: string
  subtitle: string
  category: string
  status: AlbumStatus
  rating: number | null
  imageUrl: string
  notes: string
  tags: string[]
  date: string | null
  createdAt: string
  updatedAt: string
}

export type NewAlbum = Omit<Album, 'id' | 'createdAt' | 'updatedAt'>

export type AlbumChanges = Partial<NewAlbum>
