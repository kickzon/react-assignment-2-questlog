import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AlbumDetailsPage from './pages/AlbumDetailsPage'
import AlbumListPage from './pages/AlbumListPage'
import NewAlbumPage from './pages/NewAlbumPage'
import NotFoundPage from './pages/NotFoundPage'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<AlbumListPage />} />
        <Route path="albums/new" element={<NewAlbumPage />} />
        <Route path="albums/:albumId" element={<AlbumDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
