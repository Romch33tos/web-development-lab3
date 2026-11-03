import { useSearchParams } from 'react-router';

const FILTERS = [
  { key: 'all', label: 'Все' },
  { key: 'active', label: 'Активные' },
  { key: 'done', label: 'Выполненные' },
];

export function TaskFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const current = searchParams.get('filter') || 'all';

  function setFilter(key) {
    const next = new URLSearchParams(searchParams);
    if (key === 'all') {
      next.delete('filter');
    } else {
      next.set('filter', key);
    }
    setSearchParams(next);
  }

  return (
    <div className="task-filters" role="group" aria-label="Фильтр задач">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={
            current === filter.key
              ? 'task-filters__btn task-filters__btn--active'
              : 'task-filters__btn'
          }
          aria-pressed={current === filter.key}
          onClick={() => setFilter(filter.key)}
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
}
