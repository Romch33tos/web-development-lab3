export function TaskSearch({ value, onChange, resultCount }) {
  return (
    <div className="task-search">
      <label className="visually-hidden" htmlFor="task-search-input">
        Поиск по названию задачи
      </label>
      <input
        id="task-search-input"
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Поиск..."
      />
      <p className="visually-hidden" aria-live="polite">
        Найдено задач: {resultCount}
      </p>
    </div>
  );
}
