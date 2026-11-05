import { useEffect, useState } from 'react'
import { ITEMS_URL } from '../config/api'
import type { Album, AlbumStatus } from '../types/album'

export function useAlbums(status?: AlbumStatus) {
  const [albums, setAlbums] = useState<Album[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchAlbums() {
      setIsLoading(true)
      setError(null)

      const url = status
        ? `${ITEMS_URL}?status=${encodeURIComponent(status)}`
        : ITEMS_URL

      try {
        const response = await fetch(url, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch albums (${response.status})`)
        }

        const data: Album[] = await response.json()
        setAlbums(data)
      } catch (error) {
        if (controller.signal.aborted) {
          return
        }

        const message =
          error instanceof Error ? error.message : 'Something went wrong'

        setError(message)
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false)
        }
      }
    }

    fetchAlbums()

    return () => {
      controller.abort()
    }
  }, [status])

  return { albums, isLoading, error }
}
