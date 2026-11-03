import { useMemo, useState } from 'react';
import { Link, Outlet, useParams, useSearchParams } from 'react-router';
import { useTodos } from '../state/TodoContext.jsx';
import { useDebounce } from '../hooks/useDebounce.js';
import { AddTaskForm } from '../components/AddTaskForm.jsx';
import { TaskFilters } from '../components/TaskFilters.jsx';
import { TaskSearch } from '../components/TaskSearch.jsx';
import { TaskList } from '../components/TaskList.jsx';
import { ListHeader } from '../components/ListHeader.jsx';

const FILTERS = {
  all: () => true,
  active: (t) => !t.done,
  done: (t) => t.done,
};

export function ListPage({ listId }) {
  const params = useParams();
  const id = listId || params.listId;
  const { state } = useTodos();
  const [searchParams] = useSearchParams();
  const filter = searchParams.get('filter') || 'all';
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const list = state.lists.find((l) => l.id === id);

  const listTasks = useMemo(
    () => state.tasks.filter((t) => t.listId === id),
    [state.tasks, id]
  );

  const visibleTasks = useMemo(() => {
    const filterFn = FILTERS[filter] ?? FILTERS.all;
    const needle = debouncedQuery.trim().toLowerCase();

    return listTasks
      .filter(filterFn)
      .filter((t) => t.title.toLowerCase().includes(needle));
  }, [listTasks, filter, debouncedQuery]);

  if (!list) {
    return (
      <section className="not-found">
        <h2>Список не найден</h2>
        <p>Возможно, он был удалён.</p>
        <Link to="/">На стартовую страницу</Link>
      </section>
    );
  }

  const isEmptyList = listTasks.length === 0;
  const isSearchEmpty = !isEmptyList && visibleTasks.length === 0 && debouncedQuery.trim() !== '';

  return (
    <section className="list-page">
      <ListHeader list={list} />
      <AddTaskForm listId={id} />
      <div className="list-toolbar">
        <TaskFilters />
        <TaskSearch
          value={query}
          onChange={setQuery}
          resultCount={visibleTasks.length}
        />
      </div>

      {isEmptyList && (
        <div className="empty">
          <span className="empty__line"></span>
          <p className="empty__text">No tasks</p>
          <span className="empty__line"></span>
        </div>
      )}

      {isSearchEmpty && (
        <div className="search-empty">
          <p>По запросу «{debouncedQuery}» ничего не найдено.</p>
          <button type="button" onClick={() => setQuery('')}>
            Сбросить поиск
          </button>
        </div>
      )}

      {!isEmptyList && !isSearchEmpty && <TaskList tasks={visibleTasks} />}

      <Outlet />
    </section>
  );
}
