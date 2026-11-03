import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <h2>Page not found</h2>
      <p>This address does not exist.</p>
      <Link to="/">Go to Home Page</Link>
    </section>
  );
}
