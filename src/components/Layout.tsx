import { NavLink, Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
      <header>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            SoundShelf
          </NavLink>

          <NavLink to="/albums/new">Add album</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Layout
