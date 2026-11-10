import { useNavigate } from "react-router-dom";
import AlbumForm from "../components/AlbumForm";
import { useSaveAlbum } from "../hooks/useSaveAlbum";
import type { NewAlbum } from "../types/album";

function NewAlbumPage() {
  const navigate = useNavigate();
  const { createAlbum, isSaving, error } = useSaveAlbum();

  async function handleSubmit(album: NewAlbum) {
    const createdAlbum = await createAlbum(album);

    if (createdAlbum) {
      navigate(`/albums/${createdAlbum.id}`);
    }
  }

  return (
    <section className="form-page">
      <header className="page-heading">
        <p className="eyebrow">Grow your collection</p>
        <h1>Add an album</h1>
        <p className="page-introduction">
          Save an album and keep track of your listening experience.
        </p>
      </header>

      {error && (
        <p className="status-message error-message" role="alert">
          {error}
        </p>
      )}

      <AlbumForm onSubmit={handleSubmit} isSaving={isSaving} />
    </section>
  );
}

export default NewAlbumPage;
