import { useParams } from 'react-router';

export function ListPage({ listId }) {
  const params = useParams();
  const id = listId || params.listId;

  return (
    <section className="list-page">
      <h2>Список задач {id}</h2>
      <p>Страница в разработке.</p>
    </section>
  );
}
