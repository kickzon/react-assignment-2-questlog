import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <header className="app-header">
        <nav className="app-nav" aria-label="Main navigation">
          <NavLink className="brand" to="/" end>
            SoundShelf
          </NavLink>

          <div className="nav-links">
            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/"
              end
            >
              Albums
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
              to="/albums/new"
            >
              Add album
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="app-main">
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
