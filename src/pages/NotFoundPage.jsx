import { Link } from 'react-router';

export function NotFoundPage() {
  return (
    <section className="not-found">
      <h2>Страница не найдена</h2>
      <p>Такой адрес не существует.</p>
      <Link to="/">Перейти на стартовую страницу</Link>
    </section>
  );
}
