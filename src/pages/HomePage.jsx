import { Navigate, Link } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function HomePage() {
  const { state } = useTodos();

  if (state.lists.length > 0) {
    return <Navigate to={`/lists/${state.lists[0].id}`} replace />;
  }

  return (
    <section className="home-page">
      <h2>Welcome!</h2>
      <p>You don't have any task lists yet.</p>
      <p>Create your first list in the sidebar to get started.</p>
      <Link to="/" className="home-page__link">Refresh</Link>
    </section>
  );
}
