import { useSearchParams } from 'react-router';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'done', label: 'Done' },
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
    <div className="task-filters" role="group" aria-label="Task filters">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          type="button"
          className={
            current === filter.key
              ? 'alert__btn alert__btn--accent'
              : 'alert__btn'
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
