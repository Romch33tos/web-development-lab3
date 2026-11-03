import { Navigate, Link } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';

export function HomePage() {
  const { state } = useTodos();

  if (state.lists.length > 0) {
    return <Navigate to={`/lists/${state.lists[0].id}`} replace />;
  }

  return (
    <section className="home-page">
      <h2>Добро пожаловать!</h2>
      <p>У вас пока нет списков задач.</p>
      <p>Создайте первый список в боковой панели, чтобы начать.</p>
      <Link to="/" className="home-page__link">Обновить</Link>
    </section>
  );
}
