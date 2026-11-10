import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <section className="not-found-page">
      <p className="error-code">404</p>
      <h1>Page not found</h1>
      <p>
        The page you were looking for does not exist or may have been moved.
      </p>
      <Link className="primary-link" to="/">
        Return to albums
      </Link>
    </section>
  )
}

export default NotFoundPage
