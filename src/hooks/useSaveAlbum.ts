import { useState } from 'react'
import { getItemUrl, ITEMS_URL } from '../config/api'
import type { Album, AlbumChanges, NewAlbum } from '../types/album'

export function useSaveAlbum() {
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function createAlbum(newAlbum: NewAlbum) {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(ITEMS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAlbum),
      })

      if (!response.ok) {
        const errorData: { message?: string } = await response.json()

        throw new Error(
          errorData.message ?? `Failed to create album (${response.status})`,
        )
      }

      const createdAlbum: Album = await response.json()
      return createdAlbum
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong'

      setError(message)
      return null
    } finally {
      setIsSaving(false)
    }
  }

  async function updateAlbum(id: string, changes: AlbumChanges) {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(getItemUrl(id), {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changes),
      })

      if (!response.ok) {
        const errorData: { message?: string } = await response.json()

        throw new Error(
          errorData.message ?? `Failed to update album (${response.status})`,
        )
      }

      const updatedAlbum: Album = await response.json()
      return updatedAlbum
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong'

      setError(message)
      return null
    } finally {
      setIsSaving(false)
    }
  }

  async function deleteAlbum(id: string) {
    setIsSaving(true)
    setError(null)

    try {
      const response = await fetch(getItemUrl(id), {
        method: 'DELETE',
      })

      if (!response.ok) {
        const errorData: { message?: string } = await response.json()

        throw new Error(
          errorData.message ?? `Failed to delete album (${response.status})`,
        )
      }

      return true
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Something went wrong'

      setError(message)
      return false
    } finally {
      setIsSaving(false)
    }
  }

  return {
    createAlbum,
    updateAlbum,
    deleteAlbum,
    isSaving,
    error,
  }
}
