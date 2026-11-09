import { useEffect, useState } from "react";
import { getItemUrl } from "../config/api";
import type { Album } from "../types/album";

export function useAlbum(id: string | undefined) {
  const [album, setAlbum] = useState<Album | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!id) {
      return;
    }

    const albumId = id;

    const controller = new AbortController();

    async function fetchAlbum() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(getItemUrl(albumId), {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch album (${response.status})`);
        }

        const data: Album = await response.json();
        setAlbum(data);
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        const message =
          error instanceof Error ? error.message : "Something went wrong";

        setError(message);
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    fetchAlbum();

    return () => {
      controller.abort();
    };
  }, [id, refreshKey]);

  function refetch() {
    setRefreshKey((currentKey) => currentKey + 1);
  }

  return {
    album: id ? album : null,
    isLoading: id ? isLoading : false,
    error: id ? error : "Missing album id",
    refetch,
  };
}
