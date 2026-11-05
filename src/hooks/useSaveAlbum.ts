import { useState } from 'react'
import { ITEMS_URL } from '../config/api'
import type { Album, NewAlbum } from '../types/album'

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

  return { createAlbum, isSaving, error }
}
